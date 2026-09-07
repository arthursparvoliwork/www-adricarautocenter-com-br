export interface ServiceContent {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  process: string[];
  faq: { q: string; a: string }[];
  ctaWhats: string;
}

export const SERVICES: ServiceContent[] = [
  {
    slug: "freios",
    shortTitle: "Freios",
    title: "Sistema de Freios — Pastilhas, Discos e Sangria",
    metaTitle: "Conserto de Freios no Grajaú SP | Pastilhas e Discos | Adricar",
    metaDescription:
      "Troca de pastilhas, discos e sangria de freio no Grajaú, São Paulo. Diagnóstico grátis, 30 anos de experiência. Parcelamos em 18x. Orçamento via WhatsApp.",
    hero: "Freios novos, viagem segura.",
    intro:
      "Seu freio range, vibra ou demora pra responder? Na Adricar fazemos diagnóstico completo do sistema de freios — pastilhas, discos, tambores, fluido, cilindros e ABS — com peças originais e mão de obra garantida.",
    benefits: [
      { title: "Diagnóstico grátis", desc: "Avaliamos pastilha, disco e fluido sem custo." },
      { title: "Peças com garantia", desc: "Trabalhamos só com marcas homologadas." },
      { title: "Serviço no mesmo dia", desc: "Maioria dos serviços feitos em até 3h." },
      { title: "Parcelamos em 18x", desc: "Cartão Visa, Master, Elo ou Pix à vista." },
    ],
    process: [
      "Inspeção visual e teste de frenagem",
      "Medição da espessura de pastilhas e discos",
      "Verificação do fluido e mangueiras",
      "Troca das peças necessárias e sangria",
      "Teste final com você no carro",
    ],
    faq: [
      {
        q: "Quanto tempo dura uma pastilha de freio?",
        a: "Em média 30 a 50 mil km, mas depende do uso. Trânsito pesado e direção esportiva reduzem a durabilidade.",
      },
      {
        q: "Preciso trocar o disco junto com a pastilha?",
        a: "Nem sempre. Medimos a espessura — se estiver dentro do mínimo do fabricante, só trocamos a pastilha.",
      },
    ],
    ctaWhats: "Olá Adricar! Quero um orçamento de freios pro meu carro.",
  },
  {
    slug: "injecao-eletronica",
    shortTitle: "Injeção Eletrônica",
    title: "Injeção Eletrônica — Scanner, Reset e Reprogramação",
    metaTitle: "Injeção Eletrônica no Grajaú SP | Scanner e ECU | Adricar",
    metaDescription:
      "Diagnóstico com scanner, limpeza de bicos, reset de ECU e reprogramação de injeção eletrônica no Grajaú, SP. Nacionais e importados. Orçamento via WhatsApp.",
    hero: "Carro engasgando? A gente lê o que ele está dizendo.",
    intro:
      "Luz da injeção acesa, marcha lenta irregular, perda de potência? Usamos scanners profissionais multimarcas pra diagnosticar o problema na hora — não trocamos peça por suposição.",
    benefits: [
      { title: "Scanner multimarca", desc: "Atendemos nacionais e importados." },
      { title: "Limpeza de bicos por ultrassom", desc: "Recupera potência e economiza combustível." },
      { title: "Reset e reprogramação", desc: "ECU, módulos e chaveiros." },
      { title: "Orçamento antes de mexer", desc: "Você aprova antes de qualquer reparo." },
    ],
    process: [
      "Conexão do scanner e leitura de códigos",
      "Análise dos sensores em tempo real",
      "Teste de pressão e vazão dos bicos",
      "Limpeza, troca ou reprogramação conforme o caso",
      "Apagar códigos e teste em estrada",
    ],
    faq: [
      {
        q: "A luz da injeção sempre é problema grave?",
        a: "Não. Pode ser desde uma tampa de combustível mal fechada até um sensor com falha. Por isso o diagnóstico é essencial.",
      },
      {
        q: "Vocês atendem carros importados?",
        a: "Sim! Temos scanners pra praticamente todas as marcas — VW, GM, Fiat, Ford, Toyota, Honda, BMW, Audi e mais.",
      },
    ],
    ctaWhats: "Olá Adricar! Minha luz da injeção acendeu, quero um diagnóstico.",
  },
  {
    slug: "suspensao",
    shortTitle: "Suspensão",
    title: "Suspensão — Amortecedores, Molas e Bandejas",
    metaTitle: "Conserto de Suspensão no Grajaú SP | Amortecedores | Adricar",
    metaDescription:
      "Troca de amortecedores, molas, bandejas, pivôs e bieletas no Grajaú, São Paulo. Conforto e segurança garantidos. Parcelamos em 18x.",
    hero: "Conforto de volta, segurança garantida.",
    intro:
      "Carro batendo no buraco, balançando demais nas curvas ou com barulho de bater? Sua suspensão pede atenção. Trocamos amortecedores, molas, batentes, coxins, bandejas, pivôs e bieletas com peças de marcas reconhecidas.",
    benefits: [
      { title: "Avaliação completa", desc: "Verificamos toda a geometria e componentes." },
      { title: "Marcas confiáveis", desc: "Cofap, Monroe, Nakata, TRW e originais." },
      { title: "Alinhamento incluso*", desc: "*Em pacotes de troca de amortecedor traseiro + dianteiro." },
      { title: "Garantia de mão de obra", desc: "90 dias após o serviço." },
    ],
    process: [
      "Teste de estabilidade na rampa",
      "Inspeção visual de molas, coxins e bandejas",
      "Orçamento detalhado por componente",
      "Troca com torque conforme o fabricante",
      "Alinhamento e teste final",
    ],
    faq: [
      {
        q: "Quando trocar o amortecedor?",
        a: "Em média a cada 60 mil km, mas se o carro 'pula' depois do quebra-molas ou inclina demais nas curvas, é hora.",
      },
      {
        q: "Preciso trocar os 4 amortecedores juntos?",
        a: "O ideal é trocar aos pares (dianteiros ou traseiros) pra manter o equilíbrio do carro.",
      },
    ],
    ctaWhats: "Olá Adricar! Quero avaliar a suspensão do meu carro.",
  },
  {
    slug: "alinhamento-balanceamento",
    shortTitle: "Alinhamento e Balanceamento",
    title: "Alinhamento e Balanceamento Computadorizado",
    metaTitle: "Alinhamento e Balanceamento no Grajaú SP | Adricar",
    metaDescription:
      "Alinhamento computadorizado 3D e balanceamento de rodas no Grajaú, São Paulo. Pneus duram mais, direção fica precisa. Atendemos rodas até aro 22.",
    hero: "Pneu durando mais, direção no ponto.",
    intro:
      "Carro puxando pra um lado, volante torto ou pneu gastando irregular? Fazemos alinhamento computadorizado 3D e balanceamento de alta precisão — atendemos rodas de aro 13 a 22.",
    benefits: [
      { title: "Tecnologia 3D", desc: "Equipamento de última geração, precisão milimétrica." },
      { title: "Atende todos os aros", desc: "De aro 13 a 22, low profile e run-flat." },
      { title: "Rápido", desc: "Alinhamento + balanceamento em até 1h." },
      { title: "Pneus duram mais", desc: "Reduz desgaste irregular em até 40%." },
    ],
    process: [
      "Verificação de calibragem e desgaste dos pneus",
      "Medição da geometria com sensores 3D",
      "Ajuste de cambagem, cáster e convergência",
      "Balanceamento dinâmico das 4 rodas",
      "Teste de estrada e conferência",
    ],
    faq: [
      {
        q: "Quando fazer alinhamento?",
        a: "A cada 10 mil km, ou sempre que trocar pneu, suspensão ou pegar buraco forte.",
      },
      {
        q: "Balanceamento é a mesma coisa que alinhamento?",
        a: "Não. Balanceamento equilibra o peso da roda; alinhamento ajusta o ângulo das rodas em relação ao carro. Os dois são complementares.",
      },
    ],
    ctaWhats: "Olá Adricar! Quero agendar alinhamento e balanceamento.",
  },
  {
    slug: "rodas-e-pneus",
    shortTitle: "Rodas e Pneus",
    title: "Rodas e Pneus — Venda, Montagem e Balanceamento",
    metaTitle: "Rodas e Pneus no Grajaú SP | Adricar Centro Automotivo",
    metaDescription:
      "Rodas e pneus no Grajaú, São Paulo: Pirelli, Michelin, Bridgestone, Firestone e Continental. Montagem, balanceamento e alinhamento no mesmo dia. Aro 13 ao 22.",
    hero: "Mais que pneus: mais segurança para você.",
    intro:
      "Vendemos e instalamos rodas e pneus das melhores marcas, do aro 13 ao 22 — inclusive low profile e run-flat. Tudo com montagem correta, balanceamento fino e alinhamento na sequência.",
    benefits: [
      { title: "Marcas de confiança", desc: "Pirelli, Michelin, Bridgestone, Firestone e Continental." },
      { title: "Serviço completo", desc: "Montagem, balanceamento e alinhamento no mesmo atendimento." },
      { title: "Economia real", desc: "Geometria e calibragem certas reduzem consumo e desgaste." },
      { title: "Visual esportivo", desc: "Rodas para uso urbano e esportivo, com acabamento impecável." },
    ],
    process: [
      "Avaliação dos pneus atuais e da medida ideal",
      "Orçamento com opções de marca e faixa de preço",
      "Desmontagem e montagem com equipamento sem risco à roda",
      "Balanceamento dinâmico das 4 rodas",
      "Alinhamento e teste de estrada",
    ],
    faq: [
      {
        q: "Quando devo trocar os pneus?",
        a: "Quando a banda de rodagem chegar a 1,6 mm, houver bolhas, cortes ou o pneu passar de 5 anos de uso.",
      },
      {
        q: "Posso aumentar o aro do meu carro?",
        a: "Sim, desde que a medida do pneu compense a diferença. A gente calcula a equivalência para não afetar suspensão nem velocímetro.",
      },
      {
        q: "Vocês parcelam?",
        a: "Sim, parcelamos em até 18x no cartão. Também aceitamos Pix e débito.",
      },
    ],
    ctaWhats: "Olá Adricar! Quero orçamento de rodas e pneus.",
  },
  {
    slug: "eletromecanica",
    shortTitle: "Eletromecânica",
    title: "Eletromecânica — Elétrica e Eletrônica Automotiva",
    metaTitle: "Eletromecânica e Elétrica Automotiva no Grajaú | Adricar",
    metaDescription:
      "Elétrica e eletrônica automotiva no Grajaú, SP: ABS, Air Bag, rede CAN, módulos, bateria, alternador, ar-condicionado e iluminação. Diagnóstico com scanner.",
    hero: "Elétrica e eletrônica sem achismo.",
    intro:
      "Luz de injeção acesa, carro morrendo, vidro ou trava sem funcionar? Nossa equipe formada pelo SENAI diagnostica com scanner e multímetro antes de trocar qualquer peça.",
    benefits: [
      { title: "Diagnóstico primeiro", desc: "Você paga pelo problema resolvido, não por chute." },
      { title: "Eletrônica embarcada", desc: "ABS, Air Bag, rede CAN e módulos (ECU)." },
      { title: "Equipe certificada", desc: "Profissionais formados pelo SENAI." },
      { title: "Garantia no serviço", desc: "Reparo testado e conferido antes da entrega." },
    ],
    process: [
      "Escuta do relato e teste do sintoma no veículo",
      "Leitura de todos os módulos com scanner",
      "Medição elétrica (multímetro, osciloscópio) do circuito suspeito",
      "Orçamento explicado antes de qualquer reparo",
      "Reparo, apagamento das falhas e reteste",
    ],
    faq: [
      {
        q: "A luz da injeção acendeu, posso rodar assim?",
        a: "Dá para rodar com cuidado, mas não ignore: falhas de sensor aumentam consumo e podem danificar o catalisador. Traga para leitura.",
      },
      {
        q: "Vocês mexem em ABS e Air Bag?",
        a: "Sim. Fazemos diagnóstico e reparo dos módulos de ABS e Air Bag, com scanner específico para cada montadora.",
      },
    ],
    ctaWhats: "Olá Adricar! Preciso de eletromecânica no meu carro.",
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
