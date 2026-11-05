CREATE OR REPLACE FUNCTION public.verify_lead_webhook_secret(_secret text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'private', 'public', 'extensions'
AS $function$
  SELECT COALESCE((
    SELECT extensions.digest(convert_to(secret, 'UTF8'), 'sha256')
         = extensions.digest(convert_to(COALESCE(_secret, ''), 'UTF8'), 'sha256')
    FROM private.webhook_secrets WHERE name = 'notify_new_lead'
  ), false)
$function$;
REVOKE ALL ON FUNCTION public.verify_lead_webhook_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_lead_webhook_secret(text) TO service_role;