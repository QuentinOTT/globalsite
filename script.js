document.addEventListener('DOMContentLoaded', () => {
    // Animation de chargement
    const loadingScreen = document.querySelector('.loading-screen');
    const words = document.querySelectorAll('.word');
    const loadingBar = document.querySelector('.loading-bar');
    const pageTransition = document.querySelector('.page-transition');

    // Timeline de chargement
    const loadingTl = gsap.timeline();

    // Animation des mots
    words.forEach((word, index) => {
        if (index === 0) {
            gsap.set(word, { opacity: 1 });
        }
        if (index < words.length - 1) {
            loadingTl.to(word, {
                opacity: 0,
                duration: 0.5,
                delay: 0.5
            })
            .set(words[index + 1], {
                opacity: 1
            });
        }
    });

    // Animation de la barre de chargement
    loadingTl.to(loadingBar, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    }, 0);

    // Animation de transition
    loadingTl.to(pageTransition, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.5
    })
    .to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingScreen.style.display = 'none';
        }
    })
    .to(pageTransition, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.5
    });

    // Initialisation de Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                scroll.scrollTo(target, {
                    duration: 1.5,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            }
        });
    });

    // Animation des projets au scroll
    scroll.on('scroll', (args) => {
        // Vous pouvez ajouter des animations spécifiques ici
    });

    // Mise à jour de Locomotive Scroll lors du redimensionnement
    window.addEventListener('resize', () => {
        scroll.update();
    });
});
