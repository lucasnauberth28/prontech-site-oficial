'use strict';
// Base compartilhada das páginas de exemplo ProNTech
document.documentElement.classList.add('js');

const PRONTECH_WA = '5511967794744';
const segment = document.body.dataset.segment || 'negócio local';

// Todo botão de WhatsApp da página de exemplo leva para a ProNTech
document.querySelectorAll('[data-wa]').forEach(link => {
  const msg = link.dataset.msg ||
    `Olá, ProNTech! Vi o exemplo de ${segment} e quero uma página assim para o meu negócio. Podemos conversar sobre a oferta a partir de R$ 450?`;
  link.href = `https://wa.me/${PRONTECH_WA}?text=` + encodeURIComponent(msg);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

// Seções entram suavemente ao rolar
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealables = document.querySelectorAll('[data-reveal]');
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealables.forEach(el => io.observe(el));
} else {
  revealables.forEach(el => el.classList.add('in'));
}

// Abas genéricas: [data-tabs] > [data-tab="x"] + [data-panel="x"]
document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = group.querySelectorAll('[data-tab]');
  const panels = group.querySelectorAll('[data-panel]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach(p => { p.hidden = p.dataset.panel !== key; if (!p.hidden) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); } });
    group.dispatchEvent(new CustomEvent('tabchange', { detail: key }));
  }));
});

// Menu do celular: [data-menu-toggle] abre [data-menu]
document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
  const menu = document.querySelector('[data-menu]');
  if (!menu) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { btn.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }));
});
