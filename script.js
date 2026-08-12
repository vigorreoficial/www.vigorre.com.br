(function() {
    'use strict';

    // ============================================================
    // 1. HEADER SCROLL
    // ============================================================
    const header = document.querySelector('[data-header]');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 16) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ============================================================
    // 2. MOBILE MENU
    // ============================================================
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('open');
            toggleBtn.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });

        document.querySelectorAll('.mobile-nav-list a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // ============================================================
    // 3. STATS COUNTER ANIMATION
    // ============================================================
    const statNumbers = document.querySelectorAll('.authority-number');

    if (statNumbers.length) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
                    const isFloat = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
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
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        statNumbers.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================================
    // 4. CONTACT FORM
    // ============================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validação básica
            const name = document.getElementById('name');
            const company = document.getElementById('company');
            const email = document.getElementById('email');
            let isValid = true;

            // Reset de erros
            document.querySelectorAll('.form-error').forEach(function(el) {
                el.remove();
            });

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

            setTimeout(function() {
                alert('✅ Mensagem enviada com sucesso! Retornaremos em até 2 horas úteis.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    function showError(input, message) {
        const error = document.createElement('span');
        error.className = 'form-error';
        error.style.cssText = 'display:block;font-size:0.7rem;color:#EF4444;margin-top:0.25rem;';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = '#EF4444';

        input.addEventListener('input', function() {
            error.remove();
            input.style.borderColor = '';
        }, { once: true });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ============================================================
    // 5. SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
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

    // ============================================================
    // 6. WHATSAPP TOOLTIP
    // ============================================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(0)';
            }
        });

        whatsappFloat.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(10px)';
            }
        });
    }

    // ============================================================
    // 7. CARDS ANIMATION ON SCROLL
    // ============================================================
    const cards = document.querySelectorAll('.eixo-card, .diferencial-card, .intel-resumo-item');

    if (cards.length) {
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            cardObserver.observe(card);
        });
    }

    console.log('🚀 VIGORRE — Site carregado com sucesso!');
    console.log('🧠 Central de Inteligência ativa');
    console.log('📊 7 eixos estratégicos disponíveis');
    console.log('💼 Máquina de conversão ativada');
})();
