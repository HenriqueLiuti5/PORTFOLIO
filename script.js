// Funcionalidade de navegação e interações
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    // Função para atualizar navegação ativa baseada no scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Event listeners para os links de navegação (apenas links internos)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se o link começa com #, é um link interno
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Fecha o menu mobile se estiver aberto
                if (window.innerWidth <= 768) {
                    navList.style.display = 'none';
                }
            }
            // Se o link começa com http ou https, deixa o comportamento padrão
        });
    });

    // Garantir que links externos funcionem corretamente
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Não interfere com links externos
            console.log('Link externo clicado:', this.href);
        });
    });

    // Menu mobile toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const currentDisplay = navList.style.display;
            navList.style.display = currentDisplay === 'flex' ? 'none' : 'flex';
        });
    }

    // Listener para scroll para atualizar navegação ativa
    window.addEventListener('scroll', updateActiveNav);

    // Animação de scroll para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.projeto-card, .membro-equipe, .contato-item, .publico-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Adiciona estilos iniciais para animação
    document.querySelectorAll('.projeto-card, .membro-equipe, .contato-item, .publico-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Listener para scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Executa uma vez no carregamento
    animateOnScroll();

    // Formulário de contato
    const contactForm = document.querySelector('.contato-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Efeito de hover nos cards (excluindo links externos)
    document.querySelectorAll('.projeto-card, .membro-equipe').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Prevenir conflitos com links externos nos cards
    document.querySelectorAll('.projeto-card a[href^="http"], .membro-equipe a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o evento se propague para o card
        });
    });

    // Evento específico para o link do projeto EduSync
    const projetoLink = document.querySelector('.projeto-link');
    if (projetoLink) {
        projetoLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://plataforma-academica.vercel.app/', '_blank');
        });
    }

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Responsive menu behavior
    function handleResize() {
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
        } else {
            navList.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Executa uma vez no carregamento

    // Intersection Observer para animações mais suaves
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    document.querySelectorAll('.projeto-card, .membro-equipe, .contato-item, .publico-item, .beneficios-list li').forEach(el => {
        observer.observe(el);
    });
});

// Adiciona efeito de parallax suave no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

