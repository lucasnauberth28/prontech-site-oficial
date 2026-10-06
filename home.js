'use strict';

// Filtro de segmentos
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card[data-cat]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const cat = button.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let i = 0;
    cards.forEach(card => {
      const show = cat === 'todos' || card.dataset.cat === cat;
      card.hidden = !show;
      card.classList.remove('is-in');
      if (show) {
        void card.offsetWidth;
        card.style.animationDelay = (i++ * 90) + 'ms';
        card.classList.add('is-in');
      }
    });
  });
});

// Lista de serviços: troca a foto ao passar o mouse, focar ou tocar
const services = document.querySelectorAll('.svc');
const serviceImages = document.querySelectorAll('.svc-media img');
function activate(index) {
  services.forEach((s, i) => s.setAttribute('aria-expanded', String(i === index)));
  serviceImages.forEach((img, i) => img.classList.toggle('is-active', i === index));
}
services.forEach((service, index) => {
  ['mouseenter', 'focus', 'click'].forEach(type => service.addEventListener(type, () => activate(index)));
});

// Links de WhatsApp com mensagem pronta
document.querySelectorAll('[data-wa]').forEach(link => {
  const segment = link.dataset.segment;
  const message = segment
    ? `Olá, ProNTech! Tenho um negócio de ${segment} e quero uma página. Podemos conversar sobre a oferta a partir de R$ 450?`
    : 'Olá, ProNTech! Quero uma página para meu negócio a partir de R$ 450, com WhatsApp e entrega em 24h. Podemos conversar?';
  link.href = 'https://wa.me/5511967794744?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
