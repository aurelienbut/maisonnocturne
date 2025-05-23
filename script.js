document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
        document.body.classList.add('loaded');
    }, 2500);
    
    // Setup Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') || document.body,
        smooth: true,
        smartphone: { smooth: false },
        tablet: { smooth: false }
    });
    
    // Refresh scroll on page load
    setTimeout(() => {
        scroll.update();
    }, 3000);
    
    // Progress bar
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.progress-bar').style.width = scrolled + '%';
        
        if (winScroll > 50) {
            document.querySelector('.progress-bar').style.opacity = '1';
        } else {
            document.querySelector('.progress-bar').style.opacity = '0';
        }
    });
    
    // Header effect on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBg = document.querySelector('.mobile-menu-bg');
    
    menuButton.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        menuBg.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });
    
    menuBg.addEventListener('click', function() {
        menuButton.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuBg.classList.remove('open');
        document.body.classList.remove('menu-open');
    });
    
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('open');
            mobileMenu.classList.remove('open');
            menuBg.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Enhanced cursor system
    const cursorSmall = document.querySelector('.cursor--small');
    const cursorLarge = document.querySelector('.cursor--large');
    let mouseX = 0;
    let mouseY = 0;
    let largeCursorX = 0;
    let largeCursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorSmall.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Smooth follow for large cursor
    function animateLargeCursor() {
        largeCursorX += (mouseX - largeCursorX) * 0.1;
        largeCursorY += (mouseY - largeCursorY) * 0.1;
        
        cursorLarge.style.transform = `translate(${largeCursorX}px, ${largeCursorY}px)`;
        requestAnimationFrame(animateLargeCursor);
    }
    animateLargeCursor();
    
    // Magnetic effect for interactive elements
    document.querySelectorAll('a, button, .service-card, .package').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorLarge.style.transform += ' scale(1.5)';
            cursorLarge.style.borderColor = 'var(--light-gold)';
            cursorSmall.style.transform += ' scale(0.5)';
            cursorSmall.style.backgroundColor = 'var(--gold)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorLarge.style.transform = cursorLarge.style.transform.replace(' scale(1.5)', '');
            cursorLarge.style.borderColor = 'rgba(var(--gold-rgb), 0.5)';
            cursorSmall.style.transform = cursorSmall.style.transform.replace(' scale(0.5)', '');
            cursorSmall.style.backgroundColor = 'var(--gold)';
        });
    });
    
    // Enhanced constellation
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    
    function setConstellationCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setConstellationCanvasSize();
    window.addEventListener('resize', setConstellationCanvasSize);
    
    const stars = [];
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.8 + 0.2,
            twinkle: Math.random() * 0.02 + 0.01
        });
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            // Update position
            star.x += star.vx;
            star.y += star.vy;
            
            // Wrap around edges
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
            
            // Twinkling effect
            star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${star.opacity})`;
            ctx.fill();
            
            // Connect nearby stars
            for (let j = i + 1; j < stars.length; j++) {
                const dx = star.x - stars[j].x;
                const dy = star.y - stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    const opacity = (1 - distance / 120) * 0.1;
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawStars);
    }
    
    drawStars();
    
    // Generate magical particles
    const magicalContainer = document.getElementById('magicalParticles');
    
    function createMagicalParticle() {
        const particle = document.createElement('div');
        particle.classList.add('magical-particle');
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        magicalContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
    
    // Create particles periodically
    setInterval(createMagicalParticle, 800);
    
    // Scroll animations
    function handleScroll() {
        const scrollElements = document.querySelectorAll('[data-scroll-offset]');
        
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            const offset = element.dataset.scrollOffset || '0%';
            const offsetValue = parseInt(offset) / 100;
            const triggerPoint = windowHeight * (1 - offsetValue);
            
            if (elementTop <= triggerPoint) {
                element.classList.add('reveal');
            }
        });
    }
    
    // Initial check for animations
    handleScroll();
    
    // Listen for scroll
    if (scroll) {
        scroll.on('scroll', handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (scroll && typeof scroll.scrollTo === 'function') {
                    scroll.scrollTo(targetElement, { offset: -80 });
                } else {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll indicator click
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        if (scroll && typeof scroll.scrollTo === 'function') {
            scroll.scrollTo('#about');
        } else {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Parallax effect for moon and moonbeams
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        const moonContainer = document.querySelector('.moon-container');
        const moonbeams = document.querySelector('.moonbeams');
        
        if (moonContainer) {
            moonContainer.style.transform = `translateY(${30 + parallax}px)`;
        }
        
        if (moonbeams) {
            moonbeams.style.transform = `translateY(${parallax * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        }
    });
    
    // Enhanced Mansion interactive effects
    const mansion = document.querySelector('.mansion');
    const windows = document.querySelectorAll('.mansion-window');
    
    // Set delay for windows
    windows.forEach((window, index) => {
        window.style.setProperty('--window-index', index);
    });
    
    // Make mansion interactive with mouse
    if (mansion) { 
        document.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            mansion.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    }
    
    // Enhanced random light flicker effect for windows
    function randomFlicker() {
        if (windows.length > 0) {
            const randomWindow = Math.floor(Math.random() * windows.length);
            const intensity = Math.random() * 0.15 + 0.08;
            
            windows[randomWindow].style.fill = `rgba(${212}, ${175}, ${55}, ${intensity})`;
            windows[randomWindow].style.filter = `drop-shadow(0 0 ${15 + Math.random() * 10}px rgba(${212}, ${175}, ${55}, ${intensity * 2}))`;
            
            setTimeout(() => {
                windows[randomWindow].style.fill = '';
                windows[randomWindow].style.filter = '';
            }, 400 + Math.random() * 600);
            
            setTimeout(randomFlicker, Math.random() * 2000 + 500);
        }
    }
    
    if (windows.length > 0) {
        setTimeout(randomFlicker, 3000);
    }
    
    // GSAP animations for enhanced mansion appearance
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ delay: 2.5 });
        
        tl.from('.mansion-outline', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out'
        })
        .from('.mansion-window', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: {
                each: 0.05,
                from: 'random'
            },
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.mansion-door', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.mansion-light', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.3');
    }

    // --- Début du code pour la hauteur dynamique du Hero sur mobile ---
    function setHeroDynamicHeight() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // Applique cette hauteur dynamique uniquement pour les écrans de petite et moyenne taille
            // où les barres d'outils des navigateurs peuvent perturber le 100vh.
            if (window.innerWidth <= 992) { 
                hero.style.setProperty('--hero-dynamic-height', `${window.innerHeight}px`);
            } else {
                // Pour les écrans plus grands, revenir au comportement par défaut (100vh défini en CSS)
                hero.style.removeProperty('--hero-dynamic-height');
            }
        }
    }

    // Appel initial pour définir la hauteur
    setHeroDynamicHeight();

    // Écoute les événements de redimensionnement de la fenêtre et de changement d'orientation
    // avec un debounce pour optimiser les performances.
    let dynamicHeightResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(dynamicHeightResizeTimer);
        dynamicHeightResizeTimer = setTimeout(setHeroDynamicHeight, 100);
    });
    window.addEventListener('orientationchange', () => {
        clearTimeout(dynamicHeightResizeTimer);
        dynamicHeightResizeTimer = setTimeout(setHeroDynamicHeight, 100);
    });
    // --- Fin du code pour la hauteur dynamique du Hero sur mobile ---

});