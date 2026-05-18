/**
 * VIGORRE - Script Principal
 * Funcionalidades: Menu Mobile, Scroll Suave, Animações de Entrada e Formulário
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HEADER: Efeito ao Rolar (Shadow)
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MENU MOBILE: Toggle e Fechar ao Clicar
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive);
            mobileMenu.setAttribute('aria-hidden', !isActive);
        });

        // Fecha o menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // 3. SCROLL SUAVE: Para todas as âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Altura do header fixo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ANIMAÇÕES DE ENTRADA (Scroll Reveal)
    // Adiciona classe 'animate-on-scroll' via JS para não poluir o HTML
    const animatedElements = document.querySelectorAll('.service-card, .sector-card, .pricing-card, .value-card, .app-feature');
    
    animatedElements.forEach((el, index) => {
        // Estilo inicial (invisível)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.unobserve(el); // Para de observar após animar
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
    });

    // 5. FORMULÁRIO DE CONTATO
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede recarregamento da página

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Simulação de envio (Loading)
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simula tempo de resposta de servidor (1.5s)
            setTimeout(() => {
                // Sucesso
                submitBtn.textContent = 'Enviado com Sucesso!';
                submitBtn.style.backgroundColor = '#10B981'; // Verde sucesso
                
                // Abre Modal
                if (successModal) {
                    successModal.classList.add('active');
                    successModal.setAttribute('aria-hidden', 'false');
                }

                // Limpa formulário
                contactForm.reset();

                // Reseta botão após 3s
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = ''; // Volta ao original do CSS
                }, 3000);

            }, 1500);
        });
    }

    // 6. MODAL DE SUCESSO
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
        }
    };

    // Fecha modal ao clicar fora dele
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
});
