-- Tabela de leads do formulário de orçamento
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  modelo_carro TEXT,
  servico TEXT,
  mensagem TEXT,
  origem TEXT DEFAULT 'site',
  status TEXT NOT NULL DEFAULT 'novo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS habilitado
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode INSERIR um lead (formulário público), mas ninguém pode ler sem autenticação de admin
CREATE POLICY "Qualquer um pode criar lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Nenhum acesso de leitura/edição público (admin acessa via dashboard Cloud)
-- Sem políticas SELECT/UPDATE/DELETE = ninguém lê via API pública

-- Índice para ordenar por data
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Função timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();