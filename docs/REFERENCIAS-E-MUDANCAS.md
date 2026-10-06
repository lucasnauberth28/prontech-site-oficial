# ProNTech — revisão para negócios locais

Data: 05/10/2026. Branch: `ajustes/oferta-local-mobile`.

## Referências consultadas

As referências foram abertas e usadas como direção visual. As imagens dos projetos não foram copiadas para o site.

| Referência | Aplicação nesta revisão |
|---|---|
| [Agency / hero](https://dribbble.com/shots/26755718-Agency-Website-Design-3D-Landing-Page-Hero) | Grafite, título grande e apresentação do produto com dispositivos. A escultura foi substituída por três celulares feitos em CSS. |
| [Noir Blade](https://dribbble.com/shots/27687318-Noir-Blade-Modern-Barbershop-Website-UI-UX-Design) | Fotografia de atendimento e direção escura para beleza. |
| [Dentcore](https://dribbble.com/shots/27041190-Dentcore-Dental-Clinic-Website-Solution) | Fundo claro, imagem humana e mensagem de cuidado para saúde. |
| [Pet Shop](https://dribbble.com/shots/27218898-Pet-Shop-Website-Design-E-commerce-Landing-Page-UI-UX-Figma) | Fotografia de animais, tom acolhedor e formas suaves. |
| [AutoRepair](https://dribbble.com/shots/27378806-AutoRepair-Auto-Repair-Shop-Landing-Page) | Mecânico em ação, serviços objetivos e pedido de orçamento. |
| [HVAC](https://dribbble.com/shots/26877360-HVAC-Landing-Page-Design) | Apresentação de serviço local na demonstração de climatização/WhatsApp. |
| [Pricing](https://dribbble.com/shots/27603564-Pricing-section) | Oferta aberta, valor destacado e condições legíveis. |
| [How it works](https://dribbble.com/shots/27645426-How-it-works-section) | Três passos visíveis, com texto curto. |

## Mudanças

- Hero com três celulares que levam às páginas de beleza, saúde e pet. Preço inicial, prazo e contato explícitos.
- Carrossel e cinco estudos antigos removidos da página principal. Grade com cinco segmentos e rotas próprias: `/beleza/`, `/saude/`, `/pet/`, `/auto/`, `/esporte-ensino/`.
- Rotas criadas sobre a base existente, conforme esclarecimento do usuário: não há ZIP a importar. Cabeçalho, rodapé, contatos, tipografia e botão laranja compartilhados.
- Quatro fotografias novas geradas para beleza, pet, oficina e academia. A foto médica existente foi convertida para WebP.
- Títulos em uma cor, sem serifas em itálico; tracking limitado a -0.02em. Corpo 18px no desktop e 17px no celular; texto mínimo 14px.
- Exemplos, oferta, passos e FAQ claros; hero, demonstração, CTA e rodapé em grafite. Variáveis originais de paleta preservadas.
- Oferta aberta com página, texto, WhatsApp e publicação. FAQ separado, com quatro perguntas.
- Demonstração de WhatsApp compacta, com título inteiro. No celular, navegador e conversa ficam empilhados.
- CTA final e contato do rodapé em verde #25D366, texto escuro e área de toque de pelo menos 48px; CTA final acima de 56px.
- Autoplay, timers, parallax e animações contínuas removidos. Entrada de 350ms e barra de progresso preservadas. Sem inclinação até 768px; redução de movimento respeitada no CSS e JavaScript.
- Fontes hospedadas localmente; PNGs convertidos; imagens com dimensões e lazy abaixo da dobra.
- Contatos e `noindex,nofollow` mantidos em todas as páginas.

## Condições comerciais para revisão

- A partir de R$ 300 para o escopo descrito.
- 1 rodada de revisão de texto e imagens, adotada nesta proposta por não haver quantidade definida anteriormente.
- 50% no início e 50% na entrega.
- 24h para a primeira versão após recebimento das informações, fotos e entrada; ajustes e aprovação podem alterar a publicação final. Condição explicada no hero, passos e FAQ.
- Domínio e funções adicionais combinados à parte.

## Publicação

Commit somente local. Não enviar a branch nem alterar `main` antes da aprovação do usuário. O deploy atual do Cloudflare permanece na versão anterior.

## Manutenção local

Site estático, sem etapa de build. `node scripts/preview-server.cjs` abre a prévia em http://127.0.0.1:8765/. Um segundo argumento opcional indica a pasta de capturas para servir em `/revisao/`. `?qa=1` injeta medições apenas no servidor local, sem alterar o HTML publicado.

`scripts/create-examples.cjs` gera as cinco rotas. Ao editar o conteúdo das rotas, atualize também o gerador para evitar sobrescrita em uma geração futura.
