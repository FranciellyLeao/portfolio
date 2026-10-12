const root=document.documentElement;
const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.site-nav');
const navLinks=[...document.querySelectorAll('.site-nav a')];
const revealItems=document.querySelectorAll('.reveal');
const sections=[...document.querySelectorAll('main section[id]')];

document.querySelector('[data-year]').textContent=new Date().getFullYear();
window.addEventListener('pointermove',event=>{root.style.setProperty('--mouse-x',`${event.clientX}px`);root.style.setProperty('--mouse-y',`${event.clientY}px`)},{passive:true});

menuButton?.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!isOpen));nav.classList.toggle('is-open',!isOpen);document.body.classList.toggle('menu-open',!isOpen)});
navLinks.forEach(link=>link.addEventListener('click',()=>{menuButton?.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('menu-open')}));

let previousScroll=0;
window.addEventListener('scroll',()=>{const currentScroll=window.scrollY;header?.classList.toggle('is-hidden',currentScroll>previousScroll&&currentScroll>180&&!nav.classList.contains('is-open'));previousScroll=Math.max(currentScroll,0)},{passive:true});

if('IntersectionObserver'in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');observer.unobserve(entry.target)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  revealItems.forEach(item=>revealObserver.observe(item));
  const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`))})},{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));
}else{revealItems.forEach(item=>item.classList.add('is-visible'))}

document.querySelectorAll('.experience-list details').forEach(item=>{item.addEventListener('toggle',()=>{if(!item.open)return;document.querySelectorAll('.experience-list details[open]').forEach(openItem=>{if(openItem!==item)openItem.removeAttribute('open')})})});
