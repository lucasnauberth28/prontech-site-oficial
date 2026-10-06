# Auditoria antes dos ajustes — 04/10/2026

Base: commit cd8e7fb, branch main. Site estático HTML/CSS/JavaScript, sem build, Cloudflare Pages integrado ao GitHub.

## Fontes e tamanhos

- DM Sans: corpo, pesos 400, 450, 500, 550, 600, 650, 700; Inter Tight: títulos e logo, mesmos pesos. Importação externa do Google Fonts.
- Georgia nos itálicos dos exemplos Forma, Brisa, Alma, Forno e Linha.
- Corpo base: 15px. Descrição do hero: 14px desktop, 13px celular. Navegação: 11px. CTA: 12px desktop / 11px celular. Rodapé: 9px / 8px.
- Eyebrows: 10px base, 8px celular; hero: 9px / 7px. Exemplos e mockups têm textos de 5–9px.
- Hero: clamp(62px,6.6vw,108px); celular: clamp(41px,11.25vw,60px). Seções: clamp(47px,5.2vw,83px); CTA: clamp(50px,6vw,100px), com variações nos breakpoints 1600,1100,800,560px.
- Tracking de títulos entre -0.03em e -0.055em; logo -0.06em. Segunda metade de vários títulos em cinza; itálico serifado nos exemplos.

## Variáveis de cor

| Variável | Valor |
|---|---|
| --graphite | #202224 |
| --dark | #181a1c |
| --paper | #eeece6 |
| --white | #f5f3ee |
| --ink | #252727 |
| --muted | #aaaead |
| --accent | #df7048 |
| --line | #ffffff24 |
| --gutter | clamp(24px,4.7vw,88px) |

Há muitos cinzas e detalhes de cobre definidos diretamente fora das variáveis. Textos pequenos claros sobre fundos claros e escuros precisam de revisão de contraste.

## Movimento

- Barra de progresso acompanha scroll.
- Escultura: art-breathe, 14s infinito, e parallax por pointermove (ponteiro fino).
- Status: status-breathe, 3s infinito.
- Hero: entradas de 900ms, atrasos 100–320ms.
- Reveal ao rolar: transições de 750ms.
- Carrossel: troca automática a cada 11s, transição 850ms.
- Destinos: troca automática a cada 7s, barra timer-fill e animação result-enter 550ms.
- Mockup: browser-float, 8s infinito; card: result-float, 6s infinito.
- SVG: animateMotion, 4s infinito.
- prefers-reduced-motion já corta transições, animações e parallax.

## Estrutura

Cabeçalho e menu móvel → hero com escultura e legenda Forma/Função → carrossel de estudos → destinos WhatsApp/formulário/agenda → acordeão do estúdio → CTA → rodapé. Dois modais: estudo e briefing.

Cinco estudos: Forma, Brisa, Alma, Forno e Linha. Contador/legenda incorretamente indicam quatro.

## Desempenho e dados

Três fotos novas em PNG; as demais em WebP. Imagens já possuem width/height e lazy abaixo do hero. Foto da escultura é reutilizada e carregada com prioridade. WhatsApp: 5511967794744. E-mail: nprontech@gmail.com. Robots: noindex,nofollow.

## Direção aprovada para este trabalho

Preservar logo/paleta/progresso/card WhatsApp/aviso conceitual. Criar rotas locais a partir da base atual, conforme esclarecimento do usuário: não há ZIP a importar. Refazer oferta e hierarquia para negócios locais, sem autoplay. Preparar commit local em branch; aguardar aprovação antes de push.
