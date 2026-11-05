ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS idempotency_key uuid;
ALTER TABLE public.leads ADD CONSTRAINT leads_idempotency_key_unique UNIQUE (idempotency_key);
ALTER TABLE public.leads ADD CONSTRAINT leads_telefone_digits_check
  CHECK (char_length(regexp_replace(telefone, '\D', '', 'g')) BETWEEN 10 AND 11);

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;

CREATE TABLE IF NOT EXISTS private.webhook_secrets (
  name text PRIMARY KEY,
  secret text NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex'),
  created_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON private.webhook_secrets FROM PUBLIC, anon, authenticated;
INSERT INTO private.webhook_secrets (name) VALUES ('notify_new_lead') ON CONFLICT DO NOTHING;

-- Validação usada pela edge function (somente service_role).
CREATE OR REPLACE FUNCTION public.verify_lead_webhook_secret(_secret text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = private, public
AS $$
  SELECT EXISTS (SELECT 1 FROM private.webhook_secrets WHERE name = 'notify_new_lead' AND secret = _secret)
$$;
REVOKE EXECUTE ON FUNCTION public.verify_lead_webhook_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_lead_webhook_secret(text) TO service_role;

CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = private, public
AS $$
DECLARE
  _secret text;
BEGIN
  SELECT secret INTO _secret FROM private.webhook_secrets WHERE name = 'notify_new_lead';
  BEGIN
    PERFORM net.http_post(
      url := 'https://fcdzidiieifzbqquxfiy.supabase.co/functions/v1/notify-new-lead',
      body := jsonb_build_object('id', NEW.id),
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-webhook-secret', _secret)
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_new_lead failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.notify_new_lead() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_leads_notify ON public.leads;
CREATE TRIGGER trg_leads_notify AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();