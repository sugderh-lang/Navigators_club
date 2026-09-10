/* ============================================================
   ACHIEVEMENT-UPGRADE.JS — Inventory стиль достижений
   ============================================================ */

(function() {
    'use strict';

    /* ==================== TOOLTIPS ==================== */
    function addTooltips() {
        const cards = document.querySelectorAll('.ach-page-card');
        
        cards.forEach(card => {
            // Уже добавлен?
            if (card.querySelector('.ach-page-tooltip')) return;
            
            const name = card.querySelector('.ach-page-name')?.textContent || '';
            const desc = card.querySelector('.ach-page-desc')?.textContent || '';
            const unlocked = !card.classList.contains('locked');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'ach-page-tooltip';
            tooltip.innerHTML = `
                <strong style="color:#FFD23F;">${unlocked ? '✓' : '🔒'} ${name}</strong>
                <br><span style="font-size:0.7rem;opacity:0.8;">${desc}</span>
            `;
            
            card.appendChild(tooltip);
        });
    }

    /* ==================== MOUSE-FOLLOW НА МОДАЛКЕ ==================== */
    function initModalLight() {
        const modal = document.querySelector('.ach-modal-content');
        if (!modal) return;

        modal.addEventListener('mousemove', (e) => {
            const rect = modal.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            modal.style.setProperty('--mouse-x', x + '%');
            modal.style.setProperty('--mouse-y', y + '%');
        });
    }

    /* ==================== ЭФФЕКТ РАЗБЛОКИРОВКИ ==================== */
    function enhanceUnlockAnimation() {
        // Перехватываем существующую функцию showUnlockAnimation
        if (typeof window.showUnlockAnimation !== 'function') return;

        const original = window.showUnlockAnimation;

        window.showUnlockAnimation = function(ach) {
            // Вызываем оригинал
            original(ach);

            // Добавляем доп. эффекты
            setTimeout(() => {
                // Тряска экрана при legendary
                if (ach.rarity === 'legendary') {
                    document.body.style.animation = 'legendaryShake 0.5s';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 500);
                }

                // Дополнительные частицы
                const particlesEl = document.getElementById('ach-modal-particles');
                if (particlesEl && ach.rarity === 'legendary') {
                    for (let i = 0; i < 20; i++) {
                        const p = document.createElement('div');
                        p.className = 'ach-modal-particle';
                        p.style.left = Math.random() * 100 + '%';
                        p.style.top = Math.random() * 100 + '%';
                        p.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
                        p.style.setProperty('--ty', (Math.random() - 0.5) * 400 + 'px');
                        p.style.animationDelay = Math.random() * 0.5 + 's';
                        p.style.background = '#FFD23F';
                        particlesEl.appendChild(p);
                    }
                }
            }, 100);
        };
    }

    /* ==================== СТИЛИ ДЛЯ SHAKE ==================== */
    function injectShakeStyle() {
        if (document.getElementById('legendary-shake-style')) return;
        
        const style = document.createElement('style');
        style.id = 'legendary-shake-style';
        style.textContent = `
            @keyframes legendaryShake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-5px); }
                40% { transform: translateX(5px); }
                60% { transform: translateX(-3px); }
                80% { transform: translateX(3px); }
            }
        `;
        document.head.appendChild(style);
    }

    /* ==================== СЧЁТЧИК ПРОГРЕССА ==================== */
    function animateProgressBar() {
        const fill = document.getElementById('ach-progress-fill');
        if (!fill) return;
        
        // Плавное появление
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fill.style.transition = 'width 2s cubic-bezier(0.16, 1, 0.3, 1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(fill);
    }

    /* ==================== ПЕРЕЗАПУСК ПОСЛЕ ФИЛЬТРА ==================== */
    function observeFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(() => {
                    addTooltips();
                }, 100);
            });
        });
    }

    /* ==================== ЗАПУСК ==================== */
    function init() {
        injectShakeStyle();
        setTimeout(addTooltips, 500);
        setTimeout(initModalLight, 500);
        enhanceUnlockAnimation();
        animateProgressBar();
        observeFilters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ==================== ЭКСПОРТ ==================== */
    window.AchievementUpgrade = {
        addTooltips,
        initModalLight
    };
})();