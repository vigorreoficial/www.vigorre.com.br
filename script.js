/**
 * VIGORRE - JavaScript Principal v4.0
 */
document.addEventListener('DOMContentLoaded',function(){
    console.log('VIGORRE • Sistema inicializado ✓');
    const header=document.querySelector('.site-header');
    function updateHeader(){if(window.scrollY>30)header.classList.add('scrolled');else header.classList.remove('scrolled')}
    window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
    const mobileToggle=document.querySelector('.mobile-toggle'),mobileMenu=document.querySelector('.mobile-menu'),mobileLinks=mobileMenu?mobileMenu.querySelectorAll('a'):[];
    function toggleMobileMenu(){if(!mobileMenu||!mobileToggle)return;const isOpen=mobileMenu.classList.toggle('active');mobileToggle.setAttribute('aria-expanded',isOpen);mobileMenu.setAttribute('aria-hidden',!isOpen)}
    if(mobileToggle){mobileToggle.addEventListener('click',toggleMobileMenu)}
    mobileLinks.forEach(link=>{link.addEventListener('click',()=>{if(mobileMenu&&mobileMenu.classList.contains('active'))toggleMobileMenu()})});
    document.addEventListener('click',(e)=>{if(mobileMenu&&mobileMenu.classList.contains('active')){if(!mobileMenu.contains(e.target)&&!mobileToggle.contains(e.target))toggleMobileMenu()}});
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const href=this.getAttribute('href');if(href==='#'||href==='#!')return;e.preventDefault();const target=document.querySelector(href);if(target){window.scrollTo({top:target.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'})}})});
    const contactForm=document.getElementById('contactForm'),successModal=document.getElementById('successModal');
    if(contactForm){contactForm.addEventListener('submit',function(e){e.preventDefault();const btn=this.querySelector('button[type="submit"]'),orig=btn.innerHTML;btn.innerHTML='⏳ Enviando...';btn.disabled=true;setTimeout(()=>{btn.innerHTML='✅ Enviado!';if(successModal){successModal.classList.add('active');successModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}contactForm.reset();setTimeout(()=>{btn.innerHTML=orig;btn.disabled=false},3000)},1500)})}
    window.closeModal=function(){if(successModal){successModal.classList.remove('active');successModal.setAttribute('aria-hidden','true');document.body.style.overflow=''}};
    if(successModal){successModal.addEventListener('click',(e)=>{if(e.target===successModal)closeModal()});document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&successModal.classList.contains('active'))closeModal()})}
    console.log('✅ Vigorre pronto.');
});
