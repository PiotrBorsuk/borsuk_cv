mermaid.initialize({ 
    startOnLoad: true, 
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
        primaryColor: '#0f172a',
        primaryTextColor: '#f1f5f9',
        lineColor: '#38bdf8',
        mainBkg: '#0f172a',
        edgeLabelBackground: '#1e293b'
    } 
});

document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-pl]');
    
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    setLanguage(savedLang);
    
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        }
    });
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            setLanguage(lang);
            
            localStorage.setItem('preferredLanguage', lang);
            
            document.documentElement.lang = lang === 'en' ? 'en' : 'pl';
        });
    });
    
    function setLanguage(lang) {
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-lang-${lang}`);
            if (translation) {
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    }
});