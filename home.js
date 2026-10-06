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

// Vitrine de segmentos: destaca um por vez e troca sozinha
(() => {
  const feature = document.getElementById('seg-feature');
  const thumbs = [...document.querySelectorAll('.thumb')];
  if (!feature || !thumbs.length) return;
  const imgs = [...feature.querySelectorAll('.feature-media img')];
  const tag = document.getElementById('seg-tag');
  const name = document.getElementById('seg-name');
  const desc = document.getElementById('seg-desc');
  const DURATION = 5500;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.style.setProperty('--seg-ms', DURATION + 'ms');
  let current = 0, timer = null, paused = false, visible = false;

  function show(i) {
    if (i === current && feature.dataset.ready) return;
    feature.dataset.ready = '1';
    current = i;
    const t = thumbs[i];
    feature.classList.add('is-swapping');
    imgs.forEach((img, k) => img.classList.toggle('is-active', k === i));
    thumbs.forEach((b, k) => { b.classList.toggle('is-active', k === i); b.setAttribute('aria-pressed', String(k === i)); b.classList.remove('is-running'); });
    setTimeout(() => {
      tag.textContent = t.dataset.tag;
      name.textContent = t.dataset.name;
      desc.textContent = t.dataset.desc;
      feature.href = t.dataset.href;
      feature.classList.remove('is-swapping');
    }, 280);
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    const t = thumbs[current];
    if (reduce || paused || !visible) return;
    void t.offsetWidth; t.classList.add('is-running');
    timer = setTimeout(() => show((current + 1) % thumbs.length), DURATION);
  }
  function pause() { paused = true; clearTimeout(timer); thumbs[current].classList.remove('is-running'); }
  function resume() { paused = false; schedule(); }

  thumbs.forEach((b, i) => b.addEventListener('click', () => show(i)));
  const showroom = feature.parentElement;
  showroom.addEventListener('mouseenter', pause);
  showroom.addEventListener('mouseleave', resume);
  showroom.addEventListener('focusin', pause);
  showroom.addEventListener('focusout', resume);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? schedule() : clearTimeout(timer); }, { threshold: 0.35 }).observe(showroom);
  } else { visible = true; schedule(); }
  feature.dataset.ready = '1';
})();
