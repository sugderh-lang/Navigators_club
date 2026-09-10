/* ==================== ТАЙМЕР ДО СОБЫТИЯ ==================== */
(function() {
    'use strict';

    /* ==================== СОБЫТИЯ КЛУБА ==================== */
    // Настраиваемые события. Формат: { name, icon, weekday (0=Вс, 1=Пн...), hour, minute, duration (ч) }
    const EVENTS = [
        {
            name: "Клубный день",
            icon: "🔥",
            desc: "Играем вместе весь вечер",
            weekday: 1, // Понедельник
            hour: 18,
            minute: 0,
            duration: 3
        },
        {
            name: "Мегапорт",
            icon: "🐷",
            desc: "Собираем мегакопилку",
            weekday: 2, // Вторник
            hour: 19,
            minute: 0,
            duration: 3
        },
        {
            name: "Клубные войны",
            icon: "⚔️",
            desc: "Битва за клуб",
            weekday: 4, // Четверг
            hour: 20,
            minute: 0,
            duration: 2
        },
        {
            name: "Мини-игры",
            icon: "🎮",
            desc: "Медведь-шатун и другие",
            weekday: 5, // Пятница
            hour: 20,
            minute: 0,
            duration: 2
        },
        {
            name: "Турнир клуба",
            icon: "🏆",
            desc: "Внутренний турнир",
            weekday: 6, // Суббота
            hour: 18,
            minute: 0,
            duration: 3
        },
        {
            name: "Шахматный вечер",
            icon: "♟️",
            desc: "Играем в шахматы",
            weekday: 0, // Воскресенье
            hour: 19,
            minute: 0,
            duration: 2
        }
    ];

    /* ==================== СОСТОЯНИЕ ==================== */
    let activeEventIndex = 0;
    let tickInterval = null;
    let eventsWithDates = [];

    /* ==================== РАСЧЁТ ДАТ ==================== */
    function getNextDate(weekday, hour, minute) {
        const now = new Date();
        const target = new Date();
        target.setHours(hour, minute, 0, 0);

        // Находим ближайший день недели
        const currentDay = now.getDay();
        let daysAhead = (weekday - currentDay + 7) % 7;

        // Если событие сегодня, но уже прошло — берём на следующей неделе
        if (daysAhead === 0 && now >= target) {
            daysAhead = 7;
        }

        target.setDate(target.getDate() + daysAhead);
        return target;
    }

    function prepareEvents() {
        eventsWithDates = EVENTS.map(e => {
            const date = getNextDate(e.weekday, e.hour, e.minute);
            return { ...e, date };
        });
        // Сортируем по дате
        eventsWithDates.sort((a, b) => a.date - b.date);
    }

    /* ==================== ФОРМАТ ВРЕМЕНИ ==================== */
    function formatDate(date) {
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} в ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    function getDayBadge(target) {
        const now = new Date();
        const diff = target - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (diff <= 0) return { text: 'Идёт сейчас', cls: 'today' };
        if (diff < 1000 * 60 * 60 * 3) return { text: 'Скоро', cls: 'soon' };
        if (days === 0) return { text: 'Сегодня', cls: 'today' };
        if (days === 1) return { text: 'Завтра', cls: 'week' };
        if (days < 7) return { text: `Через ${days} дн`, cls: 'week' };
        return { text: `Через ${Math.ceil(days / 7)} нед`, cls: 'future' };
    }

    /* ==================== РЕНДЕР ==================== */
    function renderTimer() {
        const container = document.getElementById('event-timer-container');
        if (!container) return;

        const event = eventsWithDates[activeEventIndex];
        if (!event) return;

        const isActive = new Date() >= event.date && new Date() < new Date(event.date.getTime() + event.duration * 3600000);

        if (isActive) {
            renderFinished(container, event);
            return;
        }

        container.innerHTML = `
            <div class="event-timer-panel">
                <div class="event-timer-header">
                    <div class="event-timer-badge">
                        <span class="event-timer-pulse"></span>
                        БЛИЖАЙШЕЕ СОБЫТИЕ
                    </div>
                    <h2 class="event-timer-title">
                        <span style="font-size:1.3em;">${event.icon}</span> ${event.name}
                    </h2>
                    <p class="event-timer-subtitle">${event.desc}</p>
                </div>

                <div class="event-timer-digits" id="event-timer-digits">
                    <div class="event-timer-digit">
                        <span class="event-timer-digit-value" id="timer-days">00</span>
                        <span class="event-timer-digit-label">Дней</span>
                    </div>
                    <div class="event-timer-digit">
                        <span class="event-timer-digit-value" id="timer-hours">00</span>
                        <span class="event-timer-digit-label">Часов</span>
                    </div>
                    <div class="event-timer-digit">
                        <span class="event-timer-digit-value" id="timer-minutes">00</span>
                        <span class="event-timer-digit-label">Минут</span>
                    </div>
                    <div class="event-timer-digit">
                        <span class="event-timer-digit-value" id="timer-seconds">00</span>
                        <span class="event-timer-digit-label">Секунд</span>
                    </div>
                </div>

                <div class="event-timer-progress">
                    <div class="event-timer-progress-label">
                        <span>Прогресс до события</span>
                        <span><strong id="timer-percent">0%</strong></span>
                    </div>
                    <div class="event-timer-progress-track">
                        <div class="event-timer-progress-fill" id="timer-progress-fill"></div>
                    </div>
                </div>

                <div class="event-timer-list" id="event-timer-list">
                    ${eventsWithDates.map((e, i) => {
                        const badge = getDayBadge(e.date);
                        return `
                            <div class="event-timer-item ${i === activeEventIndex ? 'active' : ''}" data-index="${i}">
                                <div class="event-timer-item-header">
                                    <span class="event-timer-item-icon">${e.icon}</span>
                                    <span class="event-timer-item-name">${e.name}</span>
                                </div>
                                <div class="event-timer-item-date">${formatDate(e.date)}</div>
                                <span class="event-timer-item-day ${badge.cls}">${badge.text}</span>
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="event-timer-alert" id="event-timer-alert">
                    <span class="event-timer-alert-icon">⏰</span>
                    <span>Событие совсем скоро! Готовься!</span>
                </div>
            </div>
        `;

        // Обработчики клика по событиям
        container.querySelectorAll('.event-timer-item').forEach(item => {
            item.addEventListener('click', () => {
                activeEventIndex = parseInt(item.dataset.index);
                renderTimer();
            });
        });

        startTick();
    }

    function renderFinished(container, event) {
        container.innerHTML = `
            <div class="event-timer-panel">
                <div class="event-timer-finished">
                    <span class="event-timer-finished-icon">${event.icon}</span>
                    <h2 class="event-timer-finished-title">${event.name} идёт!</h2>
                    <p class="event-timer-finished-text">Присоединяйся прямо сейчас</p>
                    <a href="https://t.me/+DL9_0ZsiBn0zZGE6" target="_blank" class="btn btn-gold" style="margin-top:20px;">
                        💬 Зайти в Telegram
                    </a>
                </div>
            </div>
        `;
    }

    /* ==================== ТИК ТАЙМЕРА ==================== */
    function startTick() {
        if (tickInterval) clearInterval(tickInterval);
        updateTick();
        tickInterval = setInterval(updateTick, 1000);
    }

    function updateTick() {
        const event = eventsWithDates[activeEventIndex];
        if (!event) return;

        const now = new Date();
        const diff = event.date - now;

        // Проверка на активность
        if (diff <= 0 && diff > -event.duration * 3600000) {
            renderTimer();
            return;
        }

        if (diff <= 0) {
            // Событие прошло — пересчитываем
            prepareEvents();
            renderTimer();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setDigit('timer-days', days);
        setDigit('timer-hours', hours);
        setDigit('timer-minutes', minutes);
        setDigit('timer-seconds', seconds);

        // Прогресс между "началом недели" и событием
        // Считаем от предыдущего события (или 7 дней назад)
        const weekAgo = new Date(event.date);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const total = event.date - weekAgo;
        const passed = now - weekAgo;
        const percent = Math.min(100, Math.max(0, Math.round((passed / total) * 100)));

        const percentEl = document.getElementById('timer-percent');
        const fillEl = document.getElementById('timer-progress-fill');
        if (percentEl) percentEl.textContent = percent + '%';
        if (fillEl) fillEl.style.width = percent + '%';

        // Показ уведомления если меньше 1 часа
        const alertEl = document.getElementById('event-timer-alert');
        if (alertEl) {
            if (diff < 60 * 60 * 1000 && diff > 0) {
                alertEl.classList.add('show');
            } else {
                alertEl.classList.remove('show');
            }
        }
    }

    function setDigit(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const str = String(value).padStart(2, '0');
        if (el.textContent !== str) {
            el.textContent = str;
            el.classList.remove('flip');
            void el.offsetWidth; // reflow
            el.classList.add('flip');
        }
    }

    /* ==================== АВТООБНОВЛЕНИЕ КАЖДУЮ МИНУТУ ==================== */
    function scheduleRefresh() {
        // Раз в час пересчитываем список событий
        setInterval(() => {
            prepareEvents();
            renderTimer();
        }, 60 * 60 * 1000);
    }

    /* ==================== ЗАПУСК ==================== */
    function init() {
        prepareEvents();
        renderTimer();
        scheduleRefresh();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();