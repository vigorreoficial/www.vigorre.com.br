(function() {
    'use strict';

    // HEADER SCROLL
    const header = document.querySelector('[data-header]');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 16) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // MOBILE MENU
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            toggleBtn.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });
        document.querySelectorAll('.mobile-nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                toggleBtn.classList.remove('active');
            });
        });
    }

    // STATS COUNTER
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.3 });
    statNumbers.forEach(el => observer.observe(el));

    // CONTACT FORM
    document.querySelectorAll('#contactForm, #contactForm2').forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;
                setTimeout(() => {
                    alert('✅ Mensagem enviada com sucesso! Retornaremos em até 2 horas úteis.');
                    this.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            });
        }
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    console.log('🚀 Vigorre - Site carregado com sucesso!');
})();
