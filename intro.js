/* ==================== КИНЕМАТОГРАФИЧНЫЙ ВХОД ==================== */
(function() {
    'use strict';

    // Ключ для sessionStorage (показывать 1 раз за сессию)
    const SESSION_KEY = 'club_intro_shown';
    const SOUND_KEY = 'club_intro_sound';
    const DISABLED_KEY = 'club_intro_disabled';

    // Проверяем, надо ли показывать
    function shouldShow() {
        // Если пользователь отключил навсегда
        if (localStorage.getItem(DISABLED_KEY) === 'true') return false;

        // Если уже показывали в этой сессии
        if (sessionStorage.getItem(SESSION_KEY) === 'true') return false;

        // Если prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

        return true;
    }

    // Звук — Web Audio API (без внешних файлов)
    function playSound(type) {
        const soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
        if (!soundEnabled) return;

        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            if (type === 'whoosh') {
                // Кто-то "вууш" при появлении
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(100, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
                osc.type = 'sine';
                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
                gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.6);
            } else if (type === 'ding') {
                // "Дзынь" при вспышке
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 1);
            }
        } catch (e) {
            // Тихий провал — Web Audio может быть недоступен
        }
    }

    // Создание DOM-структуры
    function createIntro() {
        const overlay = document.createElement('div');
        overlay.className = 'intro-overlay';
        overlay.id = 'intro-overlay';

        overlay.innerHTML = `
            <div class="intro-bg"></div>
            <div class="intro-rays"></div>
            <div class="intro-flash"></div>
            <div class="intro-particles" id="intro-particles"></div>
            <div class="intro-content">
                <div class="intro-logo-wrap">
                    <div class="intro-logo-glow"></div>
                    <img src="images/logo.png" alt="Логотип" class="intro-logo" onerror="this.style.display='none'">
                </div>
                <h1 class="intro-title">НАГИБАТОРЫ3000</h1>
                <p class="intro-subtitle">Тиран на Марише</p>
                <div class="intro-loader">
                    <div class="intro-loader-fill"></div>
                </div>
            </div>
            <button class="intro-skip" id="intro-skip">Пропустить →</button>
            <button class="intro-sound-toggle" id="intro-sound" title="Звук">🔊</button>
        `;

        document.body.appendChild(overlay);
        return overlay;
    }

    // Частицы
    function createParticles(container) {
        const count = 40;
        const colors = ['#f9ca24', '#ffd700', '#ffe66d', '#e67e22', '#ffffff'];
        const frag = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'intro-particle';
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const distance = 150 + Math.random() * 300;
            p.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            p.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.color = p.style.background;
            p.style.width = p.style.height = (4 + Math.random() * 6) + 'px';
            p.style.animationDelay = (1.2 + Math.random() * 0.4) + 's';
            frag.appendChild(p);
        }

        container.appendChild(frag);
    }

    // Закрытие
    function closeIntro(overlay, soundToggle) {
        overlay.classList.add('closing');
        sessionStorage.setItem(SESSION_KEY, 'true');

        setTimeout(() => {
            overlay.classList.add('hidden');
            setTimeout(() => overlay.remove(), 800);
        }, 800);

        // Включаем прокрутку страницы
        document.body.style.overflow = '';
    }

    // Запуск
    function init() {
        if (!shouldShow()) return;

        // Блокируем прокрутку пока показывается intro
        document.body.style.overflow = 'hidden';

        const overlay = createIntro();
        const particlesContainer = document.getElementById('intro-particles');
        createParticles(particlesContainer);

        const skipBtn = document.getElementById('intro-skip');
        const soundBtn = document.getElementById('intro-sound');

        // Инициализируем состояние звука
        const soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
        soundBtn.textContent = soundEnabled ? '🔊' : '🔇';

        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const current = localStorage.getItem(SOUND_KEY) !== 'false';
            localStorage.setItem(SOUND_KEY, current ? 'false' : 'true');
            soundBtn.textContent = current ? '🔇' : '🔊';
            if (!current) playSound('ding');
        });

        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeIntro(overlay, soundBtn);
        });

        // Звуки по таймингу
        setTimeout(() => playSound('whoosh'), 400);
        setTimeout(() => playSound('ding'), 1200);

        // Автоматическое закрытие через 3 секунды
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                closeIntro(overlay, soundBtn);
            }
        }, 3200);

        // Закрытие по Escape
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeIntro(overlay, soundBtn);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Запуск после загрузки
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();