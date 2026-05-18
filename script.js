/**
 * VIGORRE - Script Principal
 * Funcionalidades: Menu Mobile, Scroll Suave, Animações de Entrada e Formulário
 * 
 * Versão: 2.0 - Premium International
 * Última atualização: 2026
 */

// Aguarda o carregamento completo do DOM (HTML) antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('VIGORRE • Sistema carregado com sucesso ✓');
    
    // ========================================
    // 1. HEADER: Efeito de Sombra ao Rolar
    // ========================================
    const header = document.querySelector('.site-header');
    
    // Função para verificar posição do scroll
    function handleHeaderScroll() {
        // Se o usuário rolou mais de 50px, adiciona a classe .scrolled
        // Isso adiciona sombra e muda a transparência do fundo (definido no CSS)
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Adiciona o evento de scroll na janela
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Executa uma vez ao carregar para verificar se a página já iniciou no meio
    handleHeaderScroll();
    
    
    // ========================================
    // 2. MENU MOBILE: Toggle e Navegação
    // ========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        // Alterna a classe 'active' que controla a exibição (display: block no CSS)
        const isMenuOpen = mobileMenu.classList.toggle('active');
        
        // Atualiza atributos de acessibilidade ARIA
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
        
        // Animação dos ícones do botão hamburger (transformando em 'X')
        const spans = mobileToggle.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Adiciona evento de clique no botão toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fecha o menu ao clicar em qualquer link interno
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            
            // Reseta os ícones do hamburger
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Fecha o menu ao clicar fora dele (em áreas vazias)
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                mobileMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
    
    
    // ========================================
    // 3. SCROLL SUAVE PARA ÂNCORAS INTERNAS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            // Obtém o alvo (ex: #home)
            const targetId = this.getAttribute('href');
            
            // Se o link for apenas '#' ou um link externo, não faz o scroll suave
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            // Verifica se o link é para o Instituto Vigorre (que é "Em breve")
            if (this.classList.contains('nav-instituto') || this.closest('.nav-instituto')) {
                event.preventDefault();
                alert('Instituto Vigorre - Em breve!');
                return;
            }
            
            // Previne o comportamento padrão de salto imediato
            event.preventDefault();
            
            // Busca o elemento no DOM
            const targetElement = document.querySelector(targetId);
            
            // Se o elemento existir, faz o scroll suave
            if (targetElement) {
                // Calcula a posição considerando a altura fixa do header (88px)
                const headerHeight = 88; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========================================
    // 4. ANIMAÇÕES DE ENTRADA AO SCROLL
    // ========================================
    // Seleciona todos os elementos que devem animar ao aparecer
    const animatedElements = document.querySelectorAll(
        '.service-card, .sector-card, .pricing-card, .value-card, .app-feature, .contact-item'
    );
    
    // Configuração do Intersection Observer (detecta quando o elemento entra na tela)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Aciona quando 15% do elemento estiver visível
    };
    
    const observerCallback = function(entries, observer) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                // Adiciona um pequeno delay em cascata para um efeito mais bonito
                const delay = index * 100;
                
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
                
                // Força o navegador a reconhecer o estado inicial antes de mudar
                void entry.target.offsetWidth;
                
                // Aplica o estado final (visível)
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Para de observar após animar (economia de performance)
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    animatedElements.forEach(function(element) {
        scrollObserver.observe(element);
    });
    
    
    // ========================================
    // 5. FORMULÁRIO DE CONTATO
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Previne o recarregamento da página
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Feedback visual: Mudando para "Enviando..."
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Coleta os dados (apenas log no console por enquanto)
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };
            
            console.log('Dados capturados:', formData);
            
            // Simula um tempo de resposta de servidor (1.5 segundos)
            setTimeout(function() {
                // Feedback de Sucesso
                submitBtn.innerHTML = '<span class="btn-icon">✓</span> Enviado!';
                submitBtn.style.backgroundColor = '#10B981'; // Verde sucesso
                
                // Mostra o Modal
                if (successModal) {
                    successModal.classList.add('active');
                    successModal.setAttribute('aria-hidden', 'false');
                }
                
                // Limpa o formulário
                contactForm.reset();
                
                // Reseta o botão após 3 segundos
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = ''; 
                }, 3000);
                
            }, 1500);
        });
    }
    
    // Função Global para fechar o Modal
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
        }
    };
    
    // Fecha o modal se clicar fora do conteúdo (no fundo escuro)
    if (successModal) {
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) {
                closeModal();
            }
        });
    }
    
    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            closeModal();
        }
    });
    
}); // Fim do DOMContentLoaded
