document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const themeSwitcher = document.querySelector('.theme-switcher i');
    const prismTheme = document.getElementById('prism-theme');

    // -- Intersection Observer for fade-in animations --
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // -- Burger menu functionality --
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // -- Close nav when a link is clicked (for mobile) --
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.querySelector('a').getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                navLinks.forEach(l => l.style.animation = '');
            }
        });
    });

    // -- Theme switcher functionality --
    const darkThemeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    const lightThemeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';

    const setTheme = (theme) => {
        document.body.className = theme + '-mode';
        themeSwitcher.className = 'fas ' + (theme === 'dark' ? 'fa-sun' : 'fa-moon');
        prismTheme.href = theme === 'dark' ? darkThemeUrl : lightThemeUrl;
        localStorage.setItem('theme', theme);
    };

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // -- Initial Load --
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// -- Code Tabs Functionality --
function openCode(evt, codeName) {
    var i, codecontent, tablinks;
    codecontent = document.getElementsByClassName("code-content");
    for (i = 0; i < codecontent.length; i++) {
        codecontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(codeName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Initialize the first tab
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.tab-link')) {
        document.querySelector('.tab-link').click();
    }
});
