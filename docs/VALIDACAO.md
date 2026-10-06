# Validação ProNTech — 05/10/2026

## Escopo

Página principal e cinco rotas em viewports de 390×844 e 1440×1000, no navegador Chromium do computador. Capturas completas e oito recortes por tamanho. A captura exclui a barra de rolagem de 15px: área de conteúdo de 375/1425px.

## Resultados

- Principal e cinco rotas: sem overflow horizontal, texto mínimo 14px, corpo 17/18px e contraste mínimo medido 5,44:1.
- Contraste calculado a partir das cores computadas e dos fundos opacos dos elementos de texto; inspeção visual complementar das capturas.
- Títulos: tracking no máximo -0.02em, uma cor; sem itálico serifado. Nenhum termo landing page no texto visível.
- Todas as imagens carregadas, com dimensões explícitas; abaixo da dobra usa lazy. Fontes locais carregadas.
- Cinco rotas acessíveis. Links de WhatsApp têm o número 5511967794744 e mensagem pronta. Não foi enviada mensagem.
- Menu móvel: abre, fecha e fecha ao escolher Dúvidas. FAQ: quatro respostas abertas e fechadas.
- CTA final e rodapé: alvos de toque ≥48px; CTA final ≥56px.
- Sem animação contínua computada. Entradas de 350ms e barra de progresso; nenhum timer de autoplay.
- Em 390px, transform dos três telefones e do navegador é none.
- prefers-reduced-motion: revisão das regras CSS e do controle JavaScript; o navegador de teste não oferece simulação dessa preferência.
- noindex,nofollow presente em todas as seis páginas.
- Console do navegador: nenhum erro ou aviso no teste final.

## Carregamento inicial

| Condição | FCP | LCP | Load | CLS | Transferido |
|---|---:|---:|---:|---:|---:|
| Celular local | 92ms | 92ms | 76ms | 0 | 283.4KiB |
| Desktop local | 128ms | 128ms | 80ms | 0 | 421.2KiB |
| Celular, rede limitada | 516ms | 516ms | 811ms | 0.0105 | 283.0KiB |

Uma navegação inicial por condição, cache de resposta desativado no servidor local, HTML/CSS/JS comprimidos com gzip. Instrumentação de medição local incluída (~1KiB), ausente no HTML de produção. Load ocorre no evento load; imagens lazy continuam a carregar conforme a navegação.

Rede limitada: 150ms de atraso por requisição e aproximadamente 200KB/s por resposta, em paralelo. Não equivale a uma banda compartilhada de 4G. Sem simulação de CPU móvel, Lighthouse ou medição no Cloudflare; valores locais não são promessa de desempenho público.

## Imagens

Sete conversões/novos WebPs: 14.985.563 → 626.470 bytes, redução de 95,8%. Inclui duas imagens legadas preservadas que não aparecem na página principal. Dimensões e valores exatos em image-sizes.json.

## Estado

Implementação local pronta para revisão. Branch ajustes/oferta-local-mobile. Não enviada ao GitHub, não publicada. Aprovação necessária antes de push.
