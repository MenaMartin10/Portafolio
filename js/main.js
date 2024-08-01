document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start' 
            });
        });
    });

    var carouselElement = document.getElementById('carouselExample');
    var dynamicTextContainer = document.getElementById('dynamicText');

    carouselElement.addEventListener('slide.bs.carousel', function(e) {
        var activeItem = e.relatedTarget;
        var activeImg = activeItem.querySelector('img');
        var newText = activeItem.getAttribute('data-text');

        var prevImg = carouselElement.querySelector('.carousel-item.active img');
        if (prevImg) {
            prevImg.classList.remove('blur-in');
            prevImg.classList.add('blur-out');
        }

        dynamicTextContainer.classList.remove('blur-in');
        dynamicTextContainer.classList.add('blur-out');

        dynamicTextContainer.addEventListener('animationend', function handler() {
            dynamicTextContainer.removeEventListener('animationend', handler);
            dynamicTextContainer.innerHTML = newText;
            dynamicTextContainer.classList.remove('blur-out');
        }, { once: true });

        activeImg.addEventListener('animationend', function handler() {
            activeImg.removeEventListener('animationend', handler);
            dynamicTextContainer.classList.add('blur-in');
        }, { once: true });

        activeImg.classList.remove('blur-out');
        void activeImg.offsetWidth;
        activeImg.classList.add('blur-in');
    });

    var activeItem = document.querySelector('#carouselExample .carousel-item.active');
    if (activeItem) {
        var activeImg = activeItem.querySelector('img');
        activeImg.classList.add('blur-in');
        dynamicTextContainer.innerHTML = activeItem.getAttribute('data-text');
        dynamicTextContainer.classList.add('blur-in');
    }

    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const progressBar = bar.querySelector('.progress-bar');
        const value = parseInt(bar.getAttribute('data-value'));
        let width = 0;
        const interval = setInterval(() => {
            if (width >= value) {
                clearInterval(interval);
                if (width == 100) {
                    progressBar.classList.add('completed');
                } else {
                    progressBar.classList.add('incomplete');
                }
            } else {
                width++;
                progressBar.style.width = width + '%';
                progressBar.querySelector('p').textContent = width + '%';
            }
        }, 20);
    });

    const circles = document.querySelectorAll('.circle-container');
    circles.forEach(container => {
        const circle = container.querySelector('.circle');
        const value = parseInt(container.getAttribute('data-value'));
        let percentage = 0;
        const interval = setInterval(() => {
            if (percentage >= value) {
                clearInterval(interval);
                if (percentage == 100) {
                    circle.classList.add('completed');
                } else {
                    circle.classList.add('incomplete');
                }
            } else {
                percentage++;
                circle.style.background = `conic-gradient(${percentage == 100 ? 'rgba(0, 128, 0, 0.9)' : 'rgba(0, 123, 255, 0.9)'} ${percentage * 3.6}deg, var(--secondary-color) 0deg)`;
                circle.setAttribute('data-value', percentage);
            }
        }, 20);
    });

    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const fixedNav = document.getElementById('fixedNav');
    const showNavOnScroll = 200; // 

    window.addEventListener('scroll', function() {
        if (window.scrollY > showNavOnScroll) {
            fixedNav.classList.add('blur-in');
            fixedNav.classList.remove('blur-out');
        } else {
            fixedNav.classList.add('blur-out');
            fixedNav.classList.remove('blur-in');
        }
    });
});
