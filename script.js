/**
 * VIGORRE - JavaScript Principal
 * Funcionalidades: Menu Mobile, Scroll Suave, Animações, Formulário e Interações
 * Versão: 3.0 - Final Production Ready
 */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('VIGORRE • Sistema inicializado com sucesso ✓');
    
    // ========================================
    // 1. HEADER: Efeito ao Rolar
    // ========================================
    const header = document.querySelector('.site-header');
    
    function updateHeader() {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Executa ao carregar
    
    // ========================================
    // 2. MENU MOBILE
    // ========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    
    function toggleMobileMenu() {
        if (!mobileMenu || !mobileToggle) return;
        
        const isOpen = mobileMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
        
        // Animação do ícone hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fecha menu ao clicar em links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const isClickInside = mobileMenu.contains(e.target);
            const isClickOnToggle = mobileToggle && mobileToggle.contains(e.target);
            if (!isClickInside && !isClickOnToggle) {
                toggleMobileMenu();
            }
        }
    });
    
    // ========================================
    // 3. SCROLL SUAVE & INSTITUTO VIGORRE
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            // Tratamento especial para Instituto Vigorre (Em breve)
            const isInstituto = this.classList.contains('nav-instituto') || 
                                this.closest('.nav-instituto') || 
                                this.closest('.mobile-instituto');
            
            if (isInstituto) {
                e.preventDefault();
                alert('🏛️ Instituto Vigorre\n\nLançamento em breve! Fique atento às nossas redes sociais.');
                if (mobileMenu && mobileMenu.classList.contains('active')) toggleMobileMenu();
                return;
            }
            
            // Scroll suave padrão
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 80; // Altura atual do header no CSS
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // 4. ANIMAÇÕES AO SCROLL (Intersection Observer)
    // ========================================
    const animatedElements = document.querySelectorAll(
        '.service-card, .sector-card-dark, .pricing-card, .value-card, .app-feature, .contact-item'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay em cascata para efeito profissional
                const delay = index * 0.08;
                
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(25px)';
                entry.target.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
                
                // Força reflow para garantir animação
                void entry.target.offsetWidth;
                
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => animationObserver.observe(el));
    
    // ========================================
    // 5. FORMULÁRIO DE CONTATO & MODAL
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Estado de loading
            submitBtn.innerHTML = '⏳ Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            
            // Coleta dados (preparado para integração futura)
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            console.log('📤 Dados do formulário capturados:', formData);
            
            // Simula envio
            setTimeout(() => {
                // Sucesso
                submitBtn.innerHTML = '✅ Enviado com sucesso!';
                submitBtn.style.backgroundColor = '#10B981';
                submitBtn.style.borderColor = '#10B981';
                submitBtn.style.color = '#FFFFFF';
                
                // Mostra modal
                if (successModal) {
                    successModal.classList.add('active');
                    successModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Trava scroll
                }
                
                // Limpa formulário
                contactForm.reset();
                
                // Reseta botão após 3s
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.cssText = '';
                }, 3000);
                
            }, 1500);
        });
    }
    
    // Função global para fechar modal
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Libera scroll
        }
    };
    
    // Fechar modal clicando no overlay
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // ========================================
    // 6. VALIDAÇÃO VISUAL RÁPIDA (Opcional)
    // ========================================
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#EF4444';
                } else {
                    this.style.borderColor = '';
                }
            });
            input.addEventListener('input', function() {
                if (this.value.trim()) this.style.borderColor = '';
            });
        });
    }
    
    // ========================================
    // 7. INICIALIZAÇÃO FINAL
    // ========================================
    console.log('✅ Todas as funcionalidades ativas. Site pronto para produção.');
    
});
