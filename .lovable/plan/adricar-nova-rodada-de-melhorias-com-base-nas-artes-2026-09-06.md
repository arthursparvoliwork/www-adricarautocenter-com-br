# Adricar — nova rodada de melhorias com base nas artes

As artes enviadas trazem material novo que o site ainda não usa: Rodas e Pneus, Eletromecânica, Diagnóstico com Scanner, Escapamento, a promoção "Fechou, Ganhou!" e as parcerias Webmotors / Car10. O plano abaixo aproveita tudo isso e eleva o acabamento visual.

## 1. Promoção "Fechou, Ganhou!" (topo de conversão)
- Faixa de oferta em destaque logo abaixo do topo: acima de R$ 300 em serviço, alinhamento grátis; aviso de tempo limitado com contador.
- Oferta de jogo de rodas: de R$ 3.700 por R$ 2.900, com botão de WhatsApp já com mensagem pronta.
- A oferta também alimenta o pop-up de saída, substituindo o texto genérico atual.

## 2. Nova seção "Rodas e Pneus"
Bloco dedicado no estilo da arte amarela/preta: mais segurança, mais conforto, maior economia, visual incrível — com foto de rodas, hover luminoso e botão de orçamento.

## 3. Nova seção "Eletromecânica"
Alternador, motor de partida, sensores e módulos, carga e descarga de bateria, computador de bordo — cards escuros com detalhe vermelho, no espírito da arte enviada.

## 4. Diagnóstico com Scanner — reforço
Bloco de tecnologia: leitura de códigos de falha, sensores em tempo real, teste de atuadores, funções especiais, "diagnóstico certo, sem troca de peça desnecessária".

## 5. Parcerias — Webmotors e Car10 + captação de parceiros
- Faixa "Parceria com Webmotors / Car10" ao lado do SENAI.
- Bloco "Estamos em busca de parcerias": quem pode ser parceiro (lojas, borracharias, auto socorro, funilarias, corretoras, frotistas) e formulário/WhatsApp específico de parceria, gravando o contato como lead do tipo "parceria".

## 6. Acabamento visual geral (mesma paleta)
- Molduras em bisel metálico e cantos chanfrados como nas artes, aplicadas a cards de serviço, planos e galeria.
- Selos "Qualidade / Segurança / Performance / Atendimento" com ícones em fila, como no rodapé das artes.
- Faixas em pincelada amarela para frases de efeito ("Seu carro em boas mãos!", "Qualidade e confiança sempre!").
- Faixa de estrelas douradas no topo das seções principais, mais próxima do logo.
- Microinterações: brilho passando nos títulos, elevação suave nos cards, entradas em sequência.

## 7. Serviços — alinhar à arte "SERVIÇOS"
Incluir alinhamento, balanceamento, rodas, pneus e escapamentos na lista principal, cada um com sua própria página de serviço já existente.

## Ponto a confirmar
As artes dizem "15 anos no mercado" e "10 anos de tradição", mas o site fala em 30 anos. Vou manter 30 anos, salvo indicação contrária — me diga qual número é o correto.

## Notas técnicas
- Novos componentes: `WheelsTires`, `Electromechanical`, `ScannerDiagnostics`, `PartnerProgram`, `PromoBanner`; inseridos em `src/pages/Index.tsx`.
- Reaproveitar `Reveal`, `TiltCard`, `LogoAura`, `Magnetic`; nada de cor fixa — apenas tokens do design system em `index.css` / `tailwind.config.ts`.
- Novos estilos utilitários (bisel metálico, pincelada, chanfro) adicionados em `index.css` como classes reutilizáveis.
- Leads de parceria gravados na tabela de leads existente com campo de origem; formulário reaproveita a lógica de `QuoteForm` e o rastreio de conversão de `src/lib/tracking.ts`.
- As artes entram como referência visual; nenhuma delas será embutida como imagem de página, exceto recortes de produto (rodas/pneus) se necessário via Lovable Assets.
