/* ============================================================
   MAIN.JS — Max Ellis — JavaScript Global
   ============================================================ */

// ── Langue ──
let currentLang = localStorage.getItem('preferredLanguage') || 'fr';

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;

    if (lang === 'en') {
        document.body.classList.add('lang-en');
    } else {
        document.body.classList.remove('lang-en');
    }

    const btnFR = document.getElementById('btnFR');
    const btnEN = document.getElementById('btnEN');
    if (btnFR) btnFR.classList.toggle('active', lang === 'fr');
    if (btnEN) btnEN.classList.toggle('active', lang === 'en');

    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            event_category: 'engagement',
            event_label: lang
        });
    }
}

// ── Burger menu ──
document.addEventListener('DOMContentLoaded', function () {
    // Appliquer la langue sauvegardée
    setLang(currentLang);

    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Scroll shadow sur nav ──
    window.addEventListener('scroll', function () {
        var nav = document.querySelector('nav');
        if (nav) {
            nav.style.boxShadow = window.scrollY > 50
                ? '0 2px 20px rgba(33,51,36,0.1)'
                : 'none';
        }
    });
});
