'use strict';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.read-progress');
function syncProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = total > 0 ? Math.max(0, Math.min(100, scrollY / total * 100)) + '%' : '0%';
}
addEventListener('scroll', syncProgress, {passive:true});
addEventListener('resize', syncProgress);
addEventListener('load', syncProgress);
syncProgress();

if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        self.unobserve(entry.target);
      }
    });
  }, {threshold:.10});
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
}
if (reducedMotion) document.querySelector('animateMotion')?.remove();

const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
function closeMenu() {
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Abrir menu');
}
menuToggle.addEventListener('click', () => {
  const opened = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = opened;
  menuToggle.setAttribute('aria-expanded',String(!opened));
  menuToggle.setAttribute('aria-label',opened ? 'Abrir menu' : 'Fechar menu');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const projectInfo = {
  forma:{name:'Forma',description:'Uma landing page de arquitetura com fotografia em primeiro plano, composição editorial e um convite direto para conversar sobre o projeto. A imagem, o nome e o negócio são conceituais.'},
  brisa:{name:'Brisa',description:'Uma página de climatização residencial que traduz o serviço em conforto e cuidado. A oferta conduz ao pedido de orçamento. Nome, negócio e imagem são fictícios; este estudo parte do nosso primeiro recorte comercial em São Paulo.'},
  alma:{name:'Alma',description:'Uma landing page para clínica médica que combina acolhimento, autoridade e um caminho direto para o agendamento. Nome, negócio e imagem são fictícios.'},
  forno:{name:'Forno',description:'Uma página de padaria e restaurante que transforma atmosfera, produto e desejo em pedidos e reservas. Nome, negócio e imagem são fictícios.'},
  linha:{name:'Linha',description:'Uma apresentação para escritório de advocacia que comunica clareza e confiança antes da primeira conversa. Nome, negócio e imagem são fictícios.'}
};
const projectDialog = document.getElementById('project-dialog');
const briefDialog = document.getElementById('brief-dialog');
function openDialog(dialog) {
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}
[projectDialog, briefDialog].forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (!projectDialog.open && !briefDialog.open) document.body.classList.remove('dialog-open');
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
document.querySelectorAll('[data-open-project]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.openProject;
    const info = projectInfo[key];
    const source = document.querySelector('.project-card[data-project="' + key + '"] .project-view');
    document.getElementById('project-dialog-title').textContent = info.name;
    projectDialog.querySelector('.dialog-project-preview').replaceChildren(source.cloneNode(true));
    projectDialog.querySelector('.dialog-project-description').textContent = info.description;
    openDialog(projectDialog);
  });
});
document.querySelectorAll('[data-open-brief]').forEach(button => button.addEventListener('click',() => openDialog(briefDialog)));
document.querySelector('[data-project-to-brief]').addEventListener('click',() => {projectDialog.close();openDialog(briefDialog);});

function managedAutoplay(element, duration, next, userPaused = () => false, timerBar = null) {
  let visible = false, pointer = false, focus = false, timeout = null;
  function stop() { clearTimeout(timeout);timeout=null;timerBar?.classList.remove('running'); }
  function restart() {
    stop();
    if (reducedMotion || !visible || pointer || focus || userPaused() || document.hidden) return;
    if (timerBar) {void timerBar.offsetWidth;timerBar.classList.add('running');}
    timeout = setTimeout(() => {next();restart();},duration);
  }
  element.addEventListener('pointerenter',() => {pointer=true;stop();});
  element.addEventListener('pointerleave',() => {pointer=false;restart();});
  element.addEventListener('focusin',() => {focus=true;stop();});
  element.addEventListener('focusout',event => {if (!element.contains(event.relatedTarget)) {focus=false;restart();}});
  document.addEventListener('visibilitychange',restart);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {visible=entries[0].isIntersecting;restart();},{threshold:.25}).observe(element);
  } else {visible=true;restart();}
  return {restart,stop};
}
const cards = [...document.querySelectorAll('.project-card')];
const track = document.querySelector('.projects-track');
const carouselCount = document.querySelector('.carousel-count');
const pauseButton = document.querySelector('.carousel-pause');
let projectIndex = 0, carouselPaused = false, carouselDirection = 1;
function positionProjects() {
  const offset = cards[projectIndex].offsetLeft - cards[0].offsetLeft;
  track.style.transform = 'translateX(-' + offset + 'px)';
  cards.forEach((card,index) => {
    card.inert = index !== projectIndex;
    card.setAttribute('aria-hidden',String(index !== projectIndex));
  });
  carouselCount.textContent = String(projectIndex + 1).padStart(2,'0') + ' / 04';
}
function showProject(index) {
  projectIndex = (index + cards.length) % cards.length;
  positionProjects();
  carouselAuto.restart();
}
const carouselAuto = managedAutoplay(document.querySelector('.projects-window'),11000,() => {
  if (projectIndex === cards.length - 1) carouselDirection = -1;
  if (projectIndex === 0) carouselDirection = 1;
  projectIndex += carouselDirection;
  positionProjects();
},() => carouselPaused);
document.querySelector('.carousel-prev').addEventListener('click',() => showProject(projectIndex - 1));
document.querySelector('.carousel-next').addEventListener('click',() => showProject(projectIndex + 1));
pauseButton.addEventListener('click',() => {
  carouselPaused = !carouselPaused;
  pauseButton.setAttribute('aria-pressed',String(carouselPaused));
  pauseButton.setAttribute('aria-label',carouselPaused ? 'Retomar troca automática dos estudos' : 'Pausar troca automática dos estudos');
  pauseButton.firstElementChild.textContent = carouselPaused ? '▷' : 'Ⅱ';
  carouselAuto.restart();
});
addEventListener('resize',positionProjects);
addEventListener('load',positionProjects);
positionProjects();

const flows = {
  whatsapp:{action:'Conversar no WhatsApp',channel:'Uma nova conversa',description:'Uma mensagem inicial sugerida encurta o caminho até a conversa com o seu negócio.',content:'<p class="message-bubble">Olá! Gostaria de um orçamento para meu espaço.</p><span class="result-note">O interesse chega com contexto.</span>'},
  formulario:{action:'Solicitar meu orçamento',channel:'Um pedido com contexto',description:'Um formulário reúne o necessário para você responder sabendo o que o visitante procura.',content:'<div class="lead-row"><span>SERVIÇO DE INTERESSE</span>Instalação residencial</div><div class="lead-row"><span>PRÓXIMO PASSO</span>Responder ao pedido de orçamento</div><span class="result-note">Campos definidos para o seu atendimento.</span>'},
  agenda:{action:'Escolher um horário',channel:'Uma conversa agendada',description:'Sua ferramenta de agendamento pode entrar na página para o visitante escolher um horário disponível.',content:'<p class="agenda-time">10:30<span>Conversa inicial / exemplo de horário</span></p><span class="result-note">Conectado à agenda escolhida para o projeto.</span>'}
};
const destinationTabs = [...document.querySelectorAll('[data-destination]')];
const destinationPanel = document.getElementById('destination-panel');
const flowOrder = Object.keys(flows);
let destinationKey = 'whatsapp';
function setDestination(key, focus = false) {
  const item = flows[key];
  if (!item) return;
  destinationKey = key;
  document.getElementById('demo-action').textContent = item.action;
  document.getElementById('result-channel').textContent = item.channel;
  document.getElementById('result-content').innerHTML = item.content;
  document.getElementById('destination-description').textContent = item.description;
  destinationTabs.forEach(tab => {
    const selected = tab.dataset.destination === key;
    tab.setAttribute('aria-selected',String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) {destinationPanel.setAttribute('aria-labelledby',tab.id);if (focus) tab.focus();}
  });
  if (!reducedMotion) {
    destinationPanel.classList.remove('is-changing');void destinationPanel.offsetWidth;destinationPanel.classList.add('is-changing');
  }
  destinationAuto.restart();
}
const destinationAuto = managedAutoplay(document.querySelector('.destination'),7000,() => setDestination(flowOrder[(flowOrder.indexOf(destinationKey) + 1) % flowOrder.length]),() => false,document.querySelector('.destination-timer>span'));
destinationTabs.forEach((tab,index) => {
  tab.addEventListener('click',() => setDestination(tab.dataset.destination));
  tab.addEventListener('keydown',event => {
    const change = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!change) return;
    event.preventDefault();
    setDestination(destinationTabs[(index + change + destinationTabs.length) % destinationTabs.length].dataset.destination,true);
  });
});

const briefForm = document.getElementById('brief-form');
const briefResult = document.getElementById('brief-result');
let briefText = '', briefBusiness = '';
briefForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(briefForm);
  briefBusiness = String(data.get('business') || '').trim();
  const offer = String(data.get('offer') || '').trim();
  if (!briefBusiness || !offer) {
    const field = !briefBusiness ? document.getElementById('brief-business') : document.getElementById('brief-offer');
    field.setCustomValidity('Preencha com algumas palavras sobre seu projeto.');field.reportValidity();return;
  }
  const goal = String(data.get('goal'));
  briefText = 'Briefing de landing page — ProNTech\n\nProjeto: ' + briefBusiness + '\nObjetivo: ' + goal + '\n\nOferta:\n' + offer + '\n\nPróximas definições: público, materiais disponíveis, prazo, escopo e canal de atendimento.\n';
  briefResult.querySelector('.brief-result-copy').textContent = briefBusiness + '\n\n' + goal + '\n\n' + offer;
  document.getElementById('brief-whatsapp').href = 'https://wa.me/5511967794744?text=' + encodeURIComponent(briefText);
  document.getElementById('brief-email').href = 'mailto:nprontech@gmail.com?subject=' + encodeURIComponent('Meu projeto de landing page — ' + briefBusiness) + '&body=' + encodeURIComponent(briefText);
  briefForm.hidden = true;briefResult.hidden = false;
  document.getElementById('brief-status').textContent = ''; document.getElementById('brief-copy').textContent = 'Copiar briefing ↗'; document.getElementById('brief-whatsapp').focus();
});
briefForm.querySelectorAll('input,textarea').forEach(field => field.addEventListener('input',() => field.setCustomValidity('')));
document.getElementById('brief-edit').addEventListener('click',() => {
  briefResult.hidden = true;briefForm.hidden = false;document.getElementById('brief-business').focus();
});
document.getElementById('brief-copy').addEventListener('click',async () => {
  if (!briefText) return;
  const button = document.getElementById('brief-copy');
  const status = document.getElementById('brief-status');
  try {
    await navigator.clipboard.writeText(briefText);
    button.textContent = 'Briefing copiado ✓';
    status.textContent = 'Seu resumo foi copiado. Você pode colá-lo em uma mensagem.';
  } catch {
    const content = briefResult.querySelector('.brief-result-copy');
    const range = document.createRange();
    range.selectNodeContents(content);
    const selection = getSelection();
    selection.removeAllRanges();selection.addRange(range);
    status.textContent = 'O texto está selecionado. Use Copiar no seu navegador.';
  }
});
if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
  const hero = document.querySelector('.hero'), artwork = document.querySelector('.hero-art');
  hero.addEventListener('pointermove',event => {
    artwork.style.translate = ((event.clientX / innerWidth - .5) * 8) + 'px ' + ((event.clientY / innerHeight - .5) * 5) + 'px';
  },{passive:true});
  hero.addEventListener('pointerleave',() => {artwork.style.translate='0 0';});
}
