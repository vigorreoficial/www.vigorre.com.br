// ========================================
// VIGORRE - SCRIPT.JS
// Interações, animações e funcionalidades
// ========================================

(function() {
    'use strict';

    // ========================================
    // 1. HEADER SCROLL
    // ========================================
    
    const header = document.querySelector('[data-header]');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 16) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ========================================
    // 2. MOBILE MENU
    // ========================================
    
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            toggleBtn.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });

        // Fechar menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // ========================================
    // 3. PORTFOLIO MODALS
    // ========================================
    
    const portfolioCards = document.querySelectorAll('.portfolio-card[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseBtns = document.querySelectorAll('[data-modal-close]');

    // Abrir modal
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar modal - botão close
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar modal - clique no overlay
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar modal - tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if (overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ========================================
    // 4. STATS COUNTER ANIMATION
    // ========================================
    
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isFloat = target % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;
                    
                    if (isFloat) {
                        el.textContent = current.toFixed(1) + 'x';
                    } else {
                        el.textContent = Math.floor(current) + '%';
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isFloat) {
                            el.textContent = target.toFixed(1) + 'x';
                        } else {
                            el.textContent = target + '%';
                        }
                    }
                };
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    };

    const observer = new IntersectionObserver(animateStats, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    statNumbers.forEach(el => observer.observe(el));

    // ========================================
    // 5. FORMULÁRIO DE CONTATO
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name');
            const company = document.getElementById('company');
            const email = document.getElementById('email');
            let isValid = true;
            
            // Reset de erros
            document.querySelectorAll('.form-group .error').forEach(el => el.remove());
            
            // Validar nome
            if (!name.value.trim()) {
                showError(name, 'Nome é obrigatório');
                isValid = false;
            }
            
            // Validar empresa
            if (!company.value.trim()) {
                showError(company, 'Empresa é obrigatória');
                isValid = false;
            }
            
            // Validar email
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'E-mail válido é obrigatório');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Simular envio
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            try {
                // Simular delay de rede
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Sucesso
                if (successModal) {
                    successModal.classList.add('active');
                }
                contactForm.reset();
            } catch (error) {
                alert('Erro ao enviar. Tente novamente.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // Função para mostrar erro
    function showError(input, message) {
        const error = document.createElement('span');
        error.className = 'error';
        error.style.cssText = `
            display: block;
            font-size: 0.7rem;
            color: #EF4444;
            margin-top: 0.25rem;
        `;
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = '#EF4444';
        
        input.addEventListener('input', () => {
            error.remove();
            input.style.borderColor = '';
        }, { once: true });
    }

    // Função para validar email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ========================================
    // 6. SUCESS MODAL
    // ========================================
    
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.remove('active');
        }
    };

    // Fechar modal de sucesso com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });

    // Fechar modal de sucesso ao clicar no overlay
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // ========================================
    // 7. SMOOTH SCROLL (links internos)
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 8. INTERSECTION OBSERVER - ANIMAÇÕES
    // ========================================
    
    // Cards com animação de entrada
    const animateCards = document.querySelectorAll('.portfolio-card, .platform-card, .sector-card, .intel-card, .mvv-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        cardObserver.observe(card);
    });

    // ========================================
    // 9. WHATSAPP FLOATING (aparece após scroll)
    // ========================================
    
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.8)';
        whatsappFloat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        let whatsappVisible = false;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            if (scrollY > 400 && !whatsappVisible) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'scale(1)';
                whatsappVisible = true;
            } else if (scrollY <= 400 && whatsappVisible) {
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.transform = 'scale(0.8)';
                whatsappVisible = false;
            }
        }, { passive: true });
        
        // Mostrar inicialmente se já estiver scrollado
        if (window.pageYOffset > 400) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
            whatsappVisible = true;
        }
    }

    // ========================================
    // 10. DASHBOARD MOCKUP - ANIMAÇÃO DAS BARRAS
    // ========================================
    
    const bars = document.querySelectorAll('.mockup-chart .bar');
    bars.forEach((bar, index) => {
        const height = bar.style.getPropertyValue('--h');
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = height;
        }, 300 + (index * 100));
    });

    // ========================================
    // 11. ACTIVE LINK DETECTION (opcional)
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');
    
    if (sections.length && navLinks.length) {
        const linkMap = {};
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                linkMap[href] = link;
            }
        });
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150) {
                    current = '#' + section.id;
                }
            });
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    if (href === current) {
                        link.style.color = 'var(--color-gold)';
                    } else {
                        link.style.color = '';
                    }
                }
            });
        }, { passive: true });
    }

    // ========================================
    // 12. PREVENT DEFAULT - links vazios
    // ========================================
    
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

    console.log('🚀 Vigorre - Site carregado com sucesso!');
    console.log('📊 Central de Inteligência ativa');
    console.log('💼 Portfólio com 7 frentes de atuação');
    console.log('🏢 Plataformas em desenvolvimento');
    console.log('✨ Visual Ultra Premium ativado');

})();
