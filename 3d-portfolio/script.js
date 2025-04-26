// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // ====== Navigation and Header ======
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close Menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Active link highlighting
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // ====== Scroll to Top Button ======
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====== Animations ======
    // Skill bars animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const width = progress.style.width;
        
        progress.style.width = '0';
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
                progress.style.width = width;
            },
            once: true
        });
    });
    
    // Section elements fade in
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
                element.classList.add('active');
            },
            once: true
        });
    });
    
    // Portfolio items appear animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1
                });
            },
            once: true
        });
    });
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        gsap.set(step, { opacity: 0, x: index % 2 === 0 ? -50 : 50 });
        
        ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(step, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1
                });
            },
            once: true
        });
    });
    
    // ====== Portfolio Filtering ======
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    gsap.to(item, { opacity: 1, y: 0, duration: 0.4, display: 'block' });
                } else {
                    gsap.to(item, { opacity: 0, y: 20, duration: 0.4, display: 'none' });
                }
            });
        });
    });
    
    // ====== Testimonial Slider ======
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide for testimonials
    let testimonialInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    });
    
    // ====== Contact Form ======
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally you would send form data to server here
            // For demo purposes, we'll just show a success message
            
            const formData = new FormData(contactForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Form submitted:', formValues);
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '1rem';
            successMessage.style.padding = '1rem';
            successMessage.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
            successMessage.style.borderRadius = '4px';
            
            contactForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Initialize animations
    function initAnimations() {
        // Hero content animations
        gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
        gsap.from('.hero-content p', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
        gsap.from('.cta-buttons', { opacity: 0, y: 30, duration: 1, delay: 0.6 });
        
        // Add fade-in class to sections
        document.querySelectorAll('section:not(.hero)').forEach(section => {
            section.classList.add('fade-in');
        });
        
        // Add slide-in classes to about section
        const aboutImage = document.querySelector('.about-image');
        const aboutText = document.querySelector('.about-text');
        
        if (aboutImage && aboutText) {
            aboutImage.classList.add('slide-in-left');
            aboutText.classList.add('slide-in-right');
        }
    }
    
    // Initialize animations
    initAnimations();
    
    // Preload animations
    window.addEventListener('load', function() {
        // Add initial active classes
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.classList.add('show');
        });
    });
});