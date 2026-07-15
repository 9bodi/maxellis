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

    // Fermer les dropdowns au changement de langue
    document.querySelectorAll('.dropdown.open').forEach(function(d) {
        d.classList.remove('open');
    });

    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            event_category: 'engagement',
            event_label: lang
        });
    }
}

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', function () {
    // Appliquer la langue sauvegardée
    setLang(currentLang);

    // ── Burger menu ──
    var burger = document.getElementById('burger');
    var navLinks = document.getElementById('navLinks');

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Fermer les dropdowns quand on ferme le menu
            if (!navLinks.classList.contains('active')) {
                document.querySelectorAll('.dropdown.open').forEach(function(d) {
                    d.classList.remove('open');
                });
            }
        });

        // Fermer le menu au clic sur un lien (sauf dropdown toggle)
        document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── Dropdown toggle mobile ──
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth > 768) return;

            e.preventDefault();
            e.stopPropagation();

            var parent = this.closest('.dropdown');
            var isOpen = parent.classList.contains('open');

            // Fermer tous les autres dropdowns
            document.querySelectorAll('.dropdown.open').forEach(function(d) {
                d.classList.remove('open');
            });

            // Toggle celui-ci
            if (!isOpen) {
                parent.classList.add('open');
            }
        });
    });

    // Fermer dropdown si clic ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.open').forEach(function(d) {
                d.classList.remove('open');
            });
        }
    });

    // Reset dropdowns au resize vers desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown.open').forEach(function(d) {
                d.classList.remove('open');
            });
        }
    });

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
