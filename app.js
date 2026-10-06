'use strict';
const progress = document.querySelector('.read-progress');
let scrollFrame = false;
function syncProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (total > 0 ? Math.min(100, Math.max(0, scrollY / total * 100)) : 0) + '%';
  scrollFrame = false;
}
addEventListener('scroll', () => { if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(syncProgress); } }, {passive:true});
addEventListener('resize', syncProgress);
addEventListener('load', syncProgress);
syncProgress();

const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
if (!motionQuery.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); self.unobserve(entry.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
  motionQuery.addEventListener('change', event => { if (event.matches) { observer.disconnect(); document.documentElement.classList.remove('js-motion'); } });
}

const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}
menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  mobileMenu.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
matchMedia('(min-width:769px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('[data-wa]').forEach(link => {
  const segment = link.dataset.segment;
  const message = segment
    ? `Olá, ProNTech! Vi o exemplo de ${segment} e quero uma página para meu negócio. Podemos conversar sobre a oferta a partir de R$ 450?`
    : 'Olá, ProNTech! Quero uma página para meu negócio a partir de R$ 450, com WhatsApp e entrega em 24h. Podemos conversar?';
  link.href = 'https://wa.me/5511967794744?text=' + encodeURIComponent(message);
});
