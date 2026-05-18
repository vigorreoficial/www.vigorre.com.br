/**
 * VIGORRE - JavaScript Principal
 * Funcionalidades: Menu Mobile, Scroll Suave, Animações, Formulário e Interações
 * 
 * Versão: 2.0 - Premium International
 * Última atualização: 2026
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('VIGORRE • Sistema carregado com sucesso ✓');
    
    // ========================================
    // 1. HEADER: Efeito de Sombra ao Rolar
    // ========================================
    const header = document.querySelector('.site-header');
    
    // Função para verificar posição do scroll
    function handleHeaderScroll() {
        // Se rolou mais de 50px, adiciona sombra e fundo semi-transparente
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Adiciona listener de scroll com throttle para performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleHeaderScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Executa uma vez ao carregar para caso a página já esteja rolada
    handleHeaderScroll();
    
    
    // ========================================
    // 2. MENU MOBILE: Toggle e Navegação
    // ========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        // Alterna a classe 'active' que controla a exibição
        const isMenuOpen = mobileMenu.classList.toggle('active');
        
        // Atualiza atributos de acessibilidade ARIA
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
        
        // Animação dos ícones do botão hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (isMenuOpen) {
            // Transforma em "X" quando aberto
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            // Volta ao normal quando fechado
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
            // Remove a classe active para esconder o menu
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
            // Verifica se o clique foi fora do menu e do botão toggle
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                mobileMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                
                // Reseta os ícones
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
    // Seleciona todos os links que começam com #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            // Previne o comportamento padrão de salto imediato
            event.preventDefault();
            
            // Obtém o ID do elemento alvo
            const targetId = this.getAttribute('href');
            
            // Ignora se for apenas "#"
            if (targetId === '#') return;
            
            // Busca o elemento no DOM
            const targetElement = document.querySelector(targetId);
            
            // Se o elemento existir, faz o scroll suave
            if (targetElement) {
                // Calcula a posição considerando a altura fixa do header
                const headerHeight = 88; // Altura do header em pixels
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                // Executa o scroll com comportamento suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza a URL sem recarregar a página (opcional)
                // history.pushState(null, null, targetId);
            }
        });
    });
    
    
    // ========================================
    // 4. ANIMAÇÕES DE ENTRADA AO SCROLL
    // ========================================
    // Elementos que devem animar ao entrar na viewport
    const animatedElements = document.querySelectorAll(
        '.service-card, .sector-card, .pricing-card, .value-card, .app-feature, .contact-item'
    );
    
    // Configuração do Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Aciona quando 15% do elemento estiver visível
    };
    
    // Callback executado quando elementos entram/saem da viewport
    const observerCallback = function(entries, observer) {
        entries.forEach(function(entry, index) {
            // Só anima quando o elemento entra na viewport
            if (entry.isIntersecting) {
                // Adiciona delay em cascata para efeito escalonado
                const delay = index * 100;
                
                // Aplica estilos de animação via JavaScript
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
                
                // Força reflow para aplicar os estilos iniciais
                void entry.target.offsetWidth;
                
                // Aplica os estilos finais para animar
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Para de observar após animar (performance)
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Cria e configura o observer
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observa cada elemento da lista
    animatedElements.forEach(function(element) {
        scrollObserver.observe(element);
    });
    
    
    // ========================================
    // 5. FORMULÁRIO DE CONTATO COM VALIDAÇÃO
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Previne o envio real do formulário (recarregamento da página)
            event.preventDefault();
            
            // Referências aos elementos do formulário
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const originalBtnStyle = submitBtn.style.cssText;
            
            // Estado de "enviando" - feedback visual para o usuário
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            
            // Coleta os dados do formulário (para uso futuro com backend)
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            console.log('Dados do formulário:', formData);
            
            // Simula tempo de resposta do servidor (1.5 segundos)
            setTimeout(function() {
                // Estado de sucesso
                submitBtn.innerHTML = '<span class="btn-icon">✓</span> Enviado!';
                submitBtn.style.backgroundColor = '#10B981'; // Verde sucesso
                submitBtn.style.borderColor = '#10B981';
                
                // Exibe o modal de confirmação
                if (successModal) {
                    showModal(successModal);
                }
                
                // Limpa todos os campos do formulário
                contactForm.reset();
                
                // Reseta o botão após 3 segundos
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.cssText = originalBtnStyle;
                }, 3000);
                
            }, 1500);
        });
    }
    
    // Função para exibir o modal com animação
    function showModal(modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Foca no botão do modal para acessibilidade
        const modalBtn = modal.querySelector('button');
        if (modalBtn) {
            setTimeout(function() {
                modalBtn.focus();
            }, 300);
        }
    }
    
    // Função para fechar o modal
    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
    
    // Torna a função closeModal global para uso no HTML
    window.closeModal = function() {
        if (successModal) {
            closeModal(successModal);
        }
    };
    
    // Fecha o modal ao clicar no overlay (área escura)
    if (successModal) {
        successModal.addEventListener('click', function(event) {
            // Só fecha se clicar no overlay, não no conteúdo do modal
            if (event.target === successModal) {
                closeModal(successModal);
            }
        });
        
        // Fecha ao pressionar a tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && successModal.classList.contains('active')) {
                closeModal(successModal);
            }
        });
    }
    
    
    // ========================================
    // 6. VALIDAÇÃO EM TEMPO REAL DOS CAMPOS
    // ========================================
    const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];
    
    formInputs.forEach(function(input) {
        // Validação ao perder o foco (blur)
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Remove erro ao começar a digitar
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                clearFieldError(this);
            }
        });
    });
    
    // Função para validar um campo individual
    function validateField(field) {
        // Pula validação se o campo não for obrigatório e estiver vazio
        if (!field.required && !field.value.trim()) {
            return;
        }
        
        // Validação de e-mail
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Por favor, insira um e-mail válido.');
                return;
            }
        }
        
        // Validação de telefone (formato brasileiro)
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                showFieldError(field, 'Formato de telefone inválido.');
                return;
            }
        }
        
        // Validação de campo obrigatório vazio
        if (field.required && !field.value.trim()) {
            showFieldError(field, 'Este campo é obrigatório.');
            return;
        }
        
        // Se passou em todas as validações, remove erro se existir
        clearFieldError(field);
    }
    
    // Função para exibir mensagem de erro no campo
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Cria ou atualiza o elemento de erro
        let errorElement = field.parentNode.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'field-error';
            errorElement.style.color = '#EF4444';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '4px';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    // Função para remover erro do campo
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    
    // ========================================
    // 7. EFEITOS INTERATIVOS ADICIONAIS
    // ========================================
    
    // Efeito de hover nos cards de serviço (elevação suave)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Animação dos botões ao clicar (feedback tátil)
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(function(btn) {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Efeito de digitação no badge do hero (opcional, sutil)
    const heroBadge = document.querySelector('.hero-section .badge');
    if (heroBadge) {
        // Adiciona uma leve pulsação contínua
        heroBadge.style.animation = 'pulse 3s ease-in-out infinite';
    }
    
    
    // ========================================
    // 8. DETECÇÃO DE DISPOSITIVO MOBILE
    // ========================================
    // Função para verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Ajustes específicos para mobile
    if (isMobile()) {
        // Desabilita hover effects que não funcionam bem em touch
        document.body.classList.add('is-mobile');
        
        // Ajusta altura do header dinamicamente
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    }
    
    // Reajusta ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (isMobile()) {
                document.body.classList.add('is-mobile');
                // Fecha menu mobile se estiver aberto
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            } else {
                document.body.classList.remove('is-mobile');
            }
        }, 250);
    });
    
    
    // ========================================
    // 9. LAZY LOADING PARA IMAGENS (Opcional)
    // ========================================
    // Se quiser implementar lazy loading nativo no futuro:
    // Adicione loading="lazy" nas tags <img> do HTML
    
    // Detecção de suporte a Intersection Observer para fallback
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // A imagem já carrega nativamente com loading="lazy"
                    // Este observer é apenas para fallback ou efeitos adicionais
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    
    // ========================================
    // 10. ANALYTICS E TRACKING (Estrutura)
    // ========================================
    // Espaço reservado para integrar Google Analytics, Hotjar, etc.
    
    function trackEvent(category, action, label, value) {
        // Exemplo de função para enviar eventos de analytics
        // Substitua com a implementação real do seu provedor
        console.log('Event tracked:', { category, action, label, value });
        
        // Exemplo para Google Analytics 4:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label,
        //         value: value
        //     });
        // }
    }
    
    // Track de cliques nos botões principais
    const trackedButtons = document.querySelectorAll('.btn-primary, .btn-system, .btn-talent');
    trackedButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            trackEvent('CTA', 'click', this.textContent.trim(), 1);
        });
    });
    
    // Track de envio de formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('Form', 'submit', 'Contact Form', 1);
        });
    }
    
    
    // ========================================
    // 11. FUNÇÕES UTILITÁRIAS GLOBAIS
    // ========================================
    
    // Formata número como moeda brasileira
    window.formatCurrency = function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };
    
    // Formata data para padrão brasileiro
    window.formatDate = function(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };
    
    // Copia texto para a área de transferência
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Texto copiado para a área de transferência');
            }).catch(function(err) {
                console.error('Erro ao copiar:', err);
            });
        } else {
            // Fallback para navegadores antigos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    };
    
    
    // ========================================
    // 12. INICIALIZAÇÃO FINAL
    // ========================================
    
    // Dispara animação inicial dos elementos já visíveis
    setTimeout(function() {
        const visibleElements = document.querySelectorAll('.animate-on-scroll');
        visibleElements.forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Log de conclusão do carregamento
    console.log('VIGORRE • Todas as funcionalidades inicializadas ✓');
    
}); // Fim do DOMContentLoaded


// ============================================
// FUNÇÕES GLOBAIS (fora do DOMContentLoaded)
// ============================================

// Função global para fechar modal (acessível pelo onclick do HTML)
function closeModal(modalElement) {
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    if (modalElement) {
        modalElement.classList.remove('active');
        modalElement.setAttribute('aria-hidden', 'true');
    }
}

// Função para abrir modal (utilitária)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

// Função para scroll até um elemento específico
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = 88;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        return true;
    }
    return false;
}

// Exporta funções para uso global (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        closeModal: closeModal,
        openModal: openModal,
        scrollToElement: scrollToElement
    };
}
