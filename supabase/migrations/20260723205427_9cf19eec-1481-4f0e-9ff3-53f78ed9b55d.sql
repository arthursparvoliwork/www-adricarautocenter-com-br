
-- 1) Harden has_role: revoke public execute, keep only for postgres/service_role.
-- RLS policies referencing has_role continue to work because they are evaluated
-- by the RLS engine using the definer's privileges via SECURITY DEFINER.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 2) Replace overly permissive WITH CHECK (true) INSERT policies on agendamentos and leads
--    with validated versions that constrain string lengths to reduce spam/abuse.

DROP POLICY IF EXISTS "Qualquer um pode criar agendamento" ON public.agendamentos;
CREATE POLICY "Qualquer um pode criar agendamento"
ON public.agendamentos
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(nome)) BETWEEN 2 AND 100
  AND char_length(btrim(telefone)) BETWEEN 8 AND 20
  AND char_length(servico) BETWEEN 2 AND 100
  AND (modelo_carro IS NULL OR char_length(modelo_carro) <= 100)
  AND (observacoes IS NULL OR char_length(observacoes) <= 1000)
  AND data_agendada > now()
  AND data_agendada < now() + interval '1 year'
);

DROP POLICY IF EXISTS "Qualquer um pode criar lead" ON public.leads;
CREATE POLICY "Qualquer um pode criar lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(nome)) BETWEEN 2 AND 100
  AND char_length(btrim(telefone)) BETWEEN 8 AND 20
  AND (modelo_carro IS NULL OR char_length(modelo_carro) <= 100)
  AND (servico IS NULL OR char_length(servico) <= 100)
  AND (mensagem IS NULL OR char_length(mensagem) <= 2000)
  AND (origem IS NULL OR char_length(origem) <= 50)
);
