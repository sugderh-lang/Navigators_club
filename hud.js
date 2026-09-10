/* ============================================================
   HUD.JS — Глобальный игровой интерфейс
   ============================================================ */

(function() {
    'use strict';

    /* ==================== SCROLL PROGRESS BAR ==================== */
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        let raf = null;
        window.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                bar.style.width = percent + '%';
                raf = null;
            });
        }, { passive: true });
    }

    /* ==================== HEADER SCROLL ==================== */
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        let raf = null;
        window.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.pageYOffset > 50);
                raf = null;
            });
        }, { passive: true });
    }

    /* ==================== ANIMATED COUNTERS ==================== */
    function animateCounter(el, target, duration = 2000) {
        const start = performance.now();
        const startValue = 0;
        
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * eased);
            el.textContent = current.toLocaleString('ru-RU');
            
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.classList.add('updating');
                setTimeout(() => el.classList.remove('updating'), 400);
            }
        }
        requestAnimationFrame(tick);
    }

    function initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    if (!isNaN(target) && !el.dataset.animated) {
                        el.dataset.animated = 'true';
                        el.classList.add('counter-animated');
                        animateCounter(el, target);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
    }

    /* ==================== MOUSE-FOLLOW LIGHT ON CARDS ==================== */
    function initCardLight() {
        if (window.innerWidth < 1000) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cards = document.querySelectorAll(
            '.player-card, .elite-card, .hall-card, .guide-card, .shop-card, .badge-card'
        );

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            }, { passive: true });
        });
    }

    /* ==================== MOBILE NAV ==================== */
    function initMobileNav() {
        if (window.innerWidth > 900) return;
        if (document.querySelector('.mobile-nav')) return;

        const current = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

        const items = [
            { icon: '🏠', name: 'Главная', url: 'index.html' },
            { icon: '🏰', name: 'Карта', url: 'castle.html' },
            { icon: '👤', name: 'Игроки', url: 'profiles.html' },
            { icon: '🏆', name: 'Достижения', url: 'achievements.html' },
            { icon: '🎮', name: 'Игры', url: 'minigames.html' }
        ];

        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <div class="mobile-nav-items">
                ${items.map(item => {
                    const isActive = item.url.replace('.html', '') === current ? 'active' : '';
                    return `
                        <a href="${item.url}" class="mobile-nav-item ${isActive}">
                            <span class="mobile-nav-item-icon">${item.icon}</span>
                            <span>${item.name}</span>
                        </a>
                    `;
                }).join('')}
            </div>
        `;
        document.body.appendChild(nav);
    }

    /* ==================== ЗАПУСК ==================== */
    document.addEventListener('DOMContentLoaded', () => {
        initScrollProgress();
        initHeaderScroll();
        initCounters();
        initMobileNav();
        setTimeout(initCardLight, 500);
    });

    /* ==================== ЭКСПОРТ ==================== */
    window.HUD = {
        animateCounter,
        initCounters
    };
})();