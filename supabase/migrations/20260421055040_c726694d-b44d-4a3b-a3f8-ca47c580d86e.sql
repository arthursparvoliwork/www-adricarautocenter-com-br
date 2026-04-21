-- AGENDAMENTOS
CREATE TABLE public.agendamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  modelo_carro TEXT,
  servico TEXT NOT NULL,
  data_agendada TIMESTAMP WITH TIME ZONE NOT NULL,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode criar agendamento"
  ON public.agendamentos FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins leem agendamentos"
  ON public.agendamentos FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins atualizam agendamentos"
  ON public.agendamentos FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins deletam agendamentos"
  ON public.agendamentos FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_agendamentos_updated
  BEFORE UPDATE ON public.agendamentos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_agendamentos_data ON public.agendamentos(data_agendada);
CREATE INDEX idx_agendamentos_status ON public.agendamentos(status);

-- BLOG POSTS
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  imagem_capa TEXT,
  autor TEXT NOT NULL DEFAULT 'Equipe Adricar',
  publicado BOOLEAN NOT NULL DEFAULT false,
  publicado_em TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um l\u00ea posts publicados"
  ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (publicado = true);

CREATE POLICY "Admins leem todos posts"
  ON public.blog_posts FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins criam posts"
  ON public.blog_posts FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins atualizam posts"
  ON public.blog_posts FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins deletam posts"
  ON public.blog_posts FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_blog_posts_updated
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_blog_posts_publicado ON public.blog_posts(publicado, publicado_em DESC);