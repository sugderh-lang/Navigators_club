/* ==================== СИСТЕМА ЗВУКОВ КЛУБА ==================== */
(function() {
    'use strict';

    const SOUND_KEY = 'club_sound_enabled';

    /* ==================== СОСТОЯНИЕ ==================== */
    let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
    let audioCtx = null;
    let soundBtn = null;
    let currentContext = null; // текущий контекст (для разных страниц)

    /* ==================== ИНИЦИАЛИЗАЦИЯ AUDIO CONTEXT ==================== */
    function getAudioCtx() {
        if (!audioCtx) {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return null;
                audioCtx = new AudioCtx();
            } catch (e) {
                return null;
            }
        }
        // Возобновляем контекст, если он в suspended (для Safari/iOS)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    /* ==================== БАЗОВЫЕ ЗВУКИ ==================== */
    function playTone({ freq = 800, type = 'sine', duration = 0.1, volume = 0.05, freqEnd = null, delay = 0 }) {
        if (!soundEnabled) return;
        const ctx = getAudioCtx();
        if (!ctx) return;

        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (freqEnd) {
            osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
        }

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.05);
    }

    /* ==================== БИБЛИОТЕКА ЗВУКОВ ==================== */
    const Sounds = {
        // Клик по кнопке
        click() {
            playTone({ freq: 900, freqEnd: 500, type: 'sine', duration: 0.08, volume: 0.06 });
        },

        // Наведение на карточку
        hover() {
            playTone({ freq: 1400, type: 'sine', duration: 0.04, volume: 0.025 });
        },

        // Открытие модалки
        open() {
            playTone({ freq: 500, freqEnd: 900, type: 'sine', duration: 0.15, volume: 0.07 });
        },

        // Закрытие модалки
        close() {
            playTone({ freq: 900, freqEnd: 400, type: 'sine', duration: 0.12, volume: 0.06 });
        },

        // Разблокировка достижения (дзынь)
        ding() {
            playTone({ freq: 1200, type: 'sine', duration: 0.6, volume: 0.08 });
            playTone({ freq: 1600, type: 'sine', duration: 0.5, volume: 0.05, delay: 0.08 });
            playTone({ freq: 2000, type: 'sine', duration: 0.4, volume: 0.03, delay: 0.16 });
        },

        // Легендарное достижение (большой дзынь)
        legendary() {
            playTone({ freq: 800, type: 'triangle', duration: 0.8, volume: 0.09 });
            playTone({ freq: 1200, type: 'triangle', duration: 0.7, volume: 0.07, delay: 0.15 });
            playTone({ freq: 1600, type: 'triangle', duration: 0.6, volume: 0.05, delay: 0.3 });
            playTone({ freq: 2000, type: 'triangle', duration: 0.5, volume: 0.04, delay: 0.45 });
        },

        // Успех (покупка, победа)
        success() {
            playTone({ freq: 600, type: 'sine', duration: 0.15, volume: 0.06 });
            playTone({ freq: 800, type: 'sine', duration: 0.15, volume: 0.06, delay: 0.12 });
            playTone({ freq: 1000, type: 'sine', duration: 0.3, volume: 0.07, delay: 0.24 });
        },

        // Ошибка / проигрыш
        error() {
            playTone({ freq: 400, freqEnd: 200, type: 'sawtooth', duration: 0.3, volume: 0.05 });
        },

        // Повышение звания
        rankup() {
            playTone({ freq: 400, type: 'sine', duration: 0.2, volume: 0.07 });
            playTone({ freq: 600, type: 'sine', duration: 0.2, volume: 0.07, delay: 0.15 });
            playTone({ freq: 800, type: 'sine', duration: 0.2, volume: 0.07, delay: 0.3 });
            playTone({ freq: 1200, type: 'triangle', duration: 0.8, volume: 0.09, delay: 0.5 });
        },

        // Вращение колеса рулетки
        spin() {
            playTone({ freq: 300, freqEnd: 800, type: 'sawtooth', duration: 0.5, volume: 0.04 });
        },

        // Переключение вкладок
        tab() {
            playTone({ freq: 700, type: 'sine', duration: 0.06, volume: 0.04 });
        },

        // Покупка в магазине
        purchase() {
            playTone({ freq: 800, type: 'triangle', duration: 0.15, volume: 0.07 });
            playTone({ freq: 1200, type: 'triangle', duration: 0.3, volume: 0.08, delay: 0.15 });
        },

        // Смена темы
        theme() {
            playTone({ freq: 1000, freqEnd: 500, type: 'sine', duration: 0.2, volume: 0.05 });
        },

        // Новое событие в LIVE-ленте
        notify() {
            playTone({ freq: 1400, type: 'sine', duration: 0.1, volume: 0.04 });
            playTone({ freq: 1800, type: 'sine', duration: 0.15, volume: 0.04, delay: 0.08 });
        }
    };

    /* ==================== КНОПКА ЗВУКА ==================== */
    function createSoundButton() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        // Если уже есть — не создаём
        if (headerActions.querySelector('.sound-btn')) {
            soundBtn = headerActions.querySelector('.sound-btn');
            updateButton();
            return;
        }

        soundBtn = document.createElement('button');
        soundBtn.className = 'sound-btn';
        soundBtn.title = 'Звуки: вкл/выкл';
        soundBtn.setAttribute('aria-label', 'Звуки');
        soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
        if (!soundEnabled) soundBtn.classList.add('muted');

        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            soundEnabled = !soundEnabled;
            localStorage.setItem(SOUND_KEY, soundEnabled ? 'true' : 'false');
            updateButton();
            // Воспроизводим подтверждающий звук
            if (soundEnabled) {
                Sounds.ding();
                showIndicator('🔊');
            } else {
                showIndicator('🔇');
            }
        });

        // Вставляем перед Telegram-кнопкой
        const tgBtn = headerActions.querySelector('.btn-tg');
        if (tgBtn) {
            headerActions.insertBefore(soundBtn, tgBtn);
        } else {
            headerActions.appendChild(soundBtn);
        }
    }

    function updateButton() {
        if (!soundBtn) return;
        soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
        soundBtn.classList.toggle('muted', !soundEnabled);
    }

    function showPlayingAnimation() {
        if (!soundBtn) return;
        soundBtn.classList.add('playing');
        setTimeout(() => soundBtn.classList.remove('playing'), 600);
    }

    /* ==================== ИНДИКАТОР ==================== */
    function showIndicator(emoji) {
        let indicator = document.querySelector('.sound-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'sound-indicator';
            document.body.appendChild(indicator);
        }
        indicator.textContent = emoji;
        indicator.classList.remove('show');
        void indicator.offsetWidth; // reflow
        indicator.classList.add('show');
        setTimeout(() => indicator.classList.remove('show'), 1300);
    }

    /* ==================== КЛИК-РИПЛ ==================== */
    function createRipple(x, y) {
        if (!soundEnabled) return;
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    }

    /* ==================== АВТОМАТИЧЕСКИЕ ХУКИ ==================== */
    function attachAutoSounds() {
        // Клик по кнопкам
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button, .btn, .filter-btn, .tab-btn, .tab-nav-btn, a.btn, .game-card, .castle-room, .player-card, .elite-card, .hall-card, .cal-card, .value-card');

            if (target) {
                // Не играем на кнопке звука (свой обработчик)
                if (target.classList.contains('sound-btn')) return;
                Sounds.click();
                showPlayingAnimation();
                createRipple(e.clientX, e.clientY);
            }
        }, { passive: true });

        // Hover на карточках
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('.game-card, .castle-room, .player-card, .elite-card, .hall-card, .value-card, .shop-card, .ach-page-card');
            if (!target) return;
            if (target._hoverPlayed) return;
            target._hoverPlayed = true;
            Sounds.hover();
            setTimeout(() => { target._hoverPlayed = false; }, 300);
        }, { passive: true });

        // Открытие модалок
        const modalObserver = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                if (m.type === 'attributes' && m.attributeName === 'class') {
                    const el = m.target;
                    if (el.classList.contains('active') &&
                        (el.classList.contains('modal') ||
                         el.classList.contains('game-modal') ||
                         el.classList.contains('castle-modal') ||
                         el.classList.contains('buy-modal') ||
                         el.classList.contains('ach-modal') ||
                         el.classList.contains('rankup-modal') ||
                         el.classList.contains('roulette-modal'))) {
                        Sounds.open();
                    }
                }
            });
        });
        modalObserver.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });

        // Смена темы
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => Sounds.theme());
        }

        // Переключение вкладок
        document.querySelectorAll('.filter-btn, .tab-btn, .tab-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => Sounds.tab());
        });
    }

    /* ==================== ПУБЛИЧНЫЙ API ==================== */
    window.ClubSounds = {
        play(name) {
            if (Sounds[name]) Sounds[name]();
        },
        enable() {
            soundEnabled = true;
            localStorage.setItem(SOUND_KEY, 'true');
            updateButton();
        },
        disable() {
            soundEnabled = false;
            localStorage.setItem(SOUND_KEY, 'false');
            updateButton();
        },
        toggle() {
            soundEnabled = !soundEnabled;
            localStorage.setItem(SOUND_KEY, soundEnabled ? 'true' : 'false');
            updateButton();
        },
        isEnabled() {
            return soundEnabled;
        }
    };

    /* ==================== ЗАПУСК ==================== */
    function init() {
        createSoundButton();
        attachAutoSounds();

        // Разблокировка AudioContext при первом взаимодействии
        const unlock = () => {
            getAudioCtx();
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock, { passive: true });
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('keydown', unlock, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();