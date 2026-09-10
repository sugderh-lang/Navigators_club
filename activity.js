/* ==================== КОНФИГУРАЦИЯ ==================== */
const ACTIVITY_KEY = 'club_activity_data';
const MAX_EVENTS = 60;

/* ==================== ТИПЫ СОБЫТИЙ ==================== */
const EVENT_TYPES = {
    rank:     { icon: "🏆", label: "Рейтинг" },
    achievement: { icon: "⭐", label: "Достижение" },
    rankup:   { icon: "👑", label: "Повышение" },
    record:   { icon: "🔥", label: "Рекорд" },
    event:    { icon: "🎉", label: "Событие" },
    minigame: { icon: "🎮", label: "Мини-игра" }
};

/* ==================== ШАБЛОНЫ СОБЫТИЙ ==================== */
function buildTemplates() {
    const nicks = (typeof players !== 'undefined' ? players.map(p => p.nick) : ["КЕФУКА", "грудь Насти", "zero", "Baiker?", "NeOrum"]);
    const achievements = ["Душа чата", "Легенда кубков", "Мерпорт-мастер", "Топ-1 клуба", "Снайпер", "Ядро клуба", "Ветеран клуба", "Мемный генерал"];
    const ranks = ["Участник", "Ветеран", "Элита", "Пане президент", "Президент"];
    const minigames = ["Ежедневное испытание", "Угадай бойца", "Реакция", "Угадай результат", "Колесо", "Викторина"];
    const events = ["Клубный день", "Мегапорт", "Турнир внутри клуба", "Шахматный вечер", "Клубные войны"];

    const rnd = arr => arr[Math.floor(Math.random() * arr.length)];

    return [
        // Рейтинг
        () => ({
            cat: "rank",
            nick: rnd(nicks),
            text: `поднялся на <strong>${2 + Math.floor(Math.random() * 8)} позиций</strong> в рейтинге клуба`
        }),
        () => ({
            cat: "rank",
            nick: rnd(nicks),
            text: `вошёл в <strong>топ-10</strong> по кубкам`
        }),
        () => ({
            cat: "rank",
            nick: rnd(nicks),
            text: `обогнал <strong>${rnd(nicks)}</strong> в рейтинге`
        }),

        // Достижения
        () => ({
            cat: "achievement",
            nick: rnd(nicks),
            text: `разблокировал достижение <span class="highlight-purple">«${rnd(achievements)}»</span>`
        }),
        () => ({
            cat: "achievement",
            nick: rnd(nicks),
            text: `получил <strong>Legendary</strong> достижение`
        }),

        // Повышения
        () => ({
            cat: "rankup",
            nick: rnd(nicks),
            text: `повышен до звания <span class="highlight-pink">${rnd(ranks.slice(1))}</span>`
        }),
        () => ({
            cat: "rankup",
            nick: rnd(nicks),
            text: `получил звание <strong>Ветеран</strong> клуба`
        }),

        // Рекорды
        () => ({
            cat: "record",
            nick: rnd(nicks),
            text: `установил новый рекорд: <strong>${(30000 + Math.floor(Math.random() * 90000)).toLocaleString('ru-RU')} кубков</strong>`
        }),
        () => ({
            cat: "record",
            nick: rnd(nicks),
            text: `серия <span class="highlight-green">${5 + Math.floor(Math.random() * 15)} побед подряд</span>`
        }),
        () => ({
            cat: "record",
            nick: rnd(nicks),
            text: `побил рекорд клуба по <strong>${(3 + Math.floor(Math.random() * 5))} победам в мегакопилке</strong>`
        }),

        // События
        () => ({
            cat: "event",
            nick: rnd(nicks),
            text: `присоединился к <strong>${rnd(events)}</strong>`
        }),
        () => ({
            cat: "event",
            nick: rnd(nicks),
            text: `завершил испытание <strong>${rnd(events)}</strong>`
        }),

        // Мини-игры
        () => ({
            cat: "minigame",
            nick: rnd(nicks),
            text: `побил рекорд в <strong>${rnd(minigames)}</strong> — ${(50 + Math.floor(Math.random() * 250))} очков`
        }),
        () => ({
            cat: "minigame",
            nick: rnd(nicks),
            text: `заработал <span class="highlight-green">${(20 + Math.floor(Math.random() * 200))} Тиранских очков</span> в мини-игре`
        })
    ];
}

/* ==================== ХРАНИЛИЩЕ ==================== */
function loadActivity() {
    try {
        const saved = localStorage.getItem(ACTIVITY_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveActivity(events) {
    try {
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(events.slice(0, MAX_EVENTS)));
    } catch (e) {}
}

let activityEvents = loadActivity();

/* ==================== СОЗДАНИЕ СОБЫТИЯ ==================== */
function createEvent() {
    const templates = buildTemplates();
    const template = templates[Math.floor(Math.random() * templates.length)];
    const event = template();
    event.id = Date.now() + Math.random();
    event.timestamp = Date.now();
    return event;
}

function createHistoryEvents(count = 20) {
    // Создаём историю "в прошлом"
    const templates = buildTemplates();
    const events = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const event = template();
        event.id = now + i + Math.random();
        // Случайное время за последние 3 дня
        event.timestamp = now - (i * 60 * 60 * 1000) - Math.random() * 3600000;
        events.push(event);
    }
    return events;
}

/* ==================== ИНИЦИАЛИЗАЦИЯ ==================== */
function initActivity() {
    if (!activityEvents.length) {
        activityEvents = createHistoryEvents(25);
        saveActivity(activityEvents);
    }
}

/* ==================== ФОРМАТ ВРЕМЕНИ ==================== */
function formatTime(timestamp) {
    const diff = Date.now() - timestamp;
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (sec < 60) return "только что";
    if (min < 60) return `${min} мин назад`;
    if (hour < 24) return `${hour} ч назад`;
    if (day < 7) return `${day} дн назад`;

    const d = new Date(timestamp);
    return d.toLocaleDateString('ru-RU');
}

function isFresh(timestamp) {
    return Date.now() - timestamp < 5 * 60 * 1000; // меньше 5 минут
}

/* ==================== РЕНДЕР ==================== */
let activeCat = 'all';
let shownCount = 20;

function renderActivity() {
    const timeline = document.getElementById('activity-timeline');
    if (!timeline) return;

    let list = [...activityEvents].sort((a, b) => b.timestamp - a.timestamp);

    if (activeCat !== 'all') {
        list = list.filter(e => e.cat === activeCat);
    }

    if (!list.length) {
        timeline.innerHTML = `
            <div class="activity-empty">
                <span class="activity-empty-icon">📡</span>
                <p>Пока нет событий в этой категории</p>
            </div>
        `;
        return;
    }

    const toShow = list.slice(0, shownCount);

    timeline.innerHTML = toShow.map((e, i) => {
        const type = EVENT_TYPES[e.cat] || EVENT_TYPES.event;
        const fresh = isFresh(e.timestamp);

        return `
            <div class="activity-item ${fresh ? 'fresh' : ''}" data-cat="${e.cat}" style="animation-delay: ${i * 40}ms;">
                <div class="activity-header">
                    <span class="activity-icon">${type.icon}</span>
                    <div class="activity-info">
                        <div class="activity-nick">
                            ${e.nick}
                            ${fresh ? '<span class="activity-new-badge">NEW</span>' : ''}
                        </div>
                        <div class="activity-time">${formatTime(e.timestamp)}</div>
                    </div>
                </div>
                <div class="activity-text">${e.text}</div>
            </div>
        `;
    }).join('');

    // Кнопка "Загрузить ещё"
    if (list.length > shownCount) {
        const btn = document.createElement('button');
        btn.className = 'activity-load-more';
        btn.textContent = `Загрузить ещё (${list.length - shownCount})`;
        btn.addEventListener('click', () => {
            shownCount += 20;
            renderActivity();
        });
        timeline.appendChild(btn);
    }
}

/* ==================== LIVE СТАТИСТИКА ==================== */
function renderLiveStats() {
    const el = document.getElementById('live-stats');
    if (!el) return;

    const last24h = activityEvents.filter(e => Date.now() - e.timestamp < 24 * 60 * 60 * 1000).length;
    const lastHour = activityEvents.filter(e => Date.now() - e.timestamp < 60 * 60 * 1000).length;
    const fresh = activityEvents.filter(e => isFresh(e.timestamp)).length;
    const uniquePlayers = new Set(activityEvents.map(e => e.nick)).size;

    el.innerHTML = `
        <div class="live-stat-card">
            <span class="live-stat-icon">📡</span>
            <span class="live-stat-value">${fresh}</span>
            <span class="live-stat-label">Сейчас активно</span>
        </div>
        <div class="live-stat-card">
            <span class="live-stat-icon">⏱️</span>
            <span class="live-stat-value">${lastHour}</span>
            <span class="live-stat-label">За час</span>
        </div>
        <div class="live-stat-card">
            <span class="live-stat-icon">📅</span>
            <span class="live-stat-value">${last24h}</span>
            <span class="live-stat-label">За 24 часа</span>
        </div>
        <div class="live-stat-card">
            <span class="live-stat-icon">👥</span>
            <span class="live-stat-value">${uniquePlayers}</span>
            <span class="live-stat-label">Участников</span>
        </div>
    `;
}

/* ==================== ФИЛЬТРЫ ==================== */
function initFilters() {
    document.querySelectorAll('#activity-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#activity-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat;
            shownCount = 20;
            renderActivity();
        });
    });
}

/* ==================== LIVE: ДОБАВЛЕНИЕ НОВЫХ СОБЫТИЙ ==================== */
function startLiveUpdates() {
    // Первое событие через 8 секунд
    setInterval(() => {
        // 60% шанс добавить событие
        if (Math.random() > 0.4) {
            const newEvent = createEvent();
            activityEvents.unshift(newEvent);
            if (activityEvents.length > MAX_EVENTS) {
                activityEvents = activityEvents.slice(0, MAX_EVENTS);
            }
            saveActivity(activityEvents);

            // Если фильтр показывает все — рендерим заново
            if (activeCat === 'all' || activeCat === newEvent.cat) {
                renderActivity();
            }
            renderLiveStats();

            // Тост-уведомление
            showToast(newEvent);
        }
    }, 8000);
}

/* ==================== ТОСТ-УВЕДОМЛЕНИЕ ==================== */
function showToast(event) {
    const type = EVENT_TYPES[event.cat] || EVENT_TYPES.event;

    const toast = document.createElement('div');
    toast.className = 'activity-toast';
    toast.innerHTML = `
        <span style="font-size:1.5rem;">${type.icon}</span>
        <div style="flex:1; min-width:0;">
            <div style="font-weight:800; color:var(--gold); font-size:0.85rem;">${event.nick}</div>
            <div style="font-size:0.78rem; color:var(--text-dim);">${event.text.replace(/<[^>]*>/g, '')}</div>
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--card-solid);
        border: 2px solid var(--gold);
        border-radius: 14px;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 340px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(249, 202, 36, 0.3);
        z-index: 9999;
        animation: toastIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
        transition: all 0.3s;
    `;

    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toastOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    toast.addEventListener('click', () => {
        toast.style.animation = 'toastOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }
    }, 5000);
}

/* ==================== ОБНОВЛЕНИЕ ВРЕМЕНИ ==================== */
function updateTimes() {
    // Обновляем относительное время каждые 30 секунд
    document.querySelectorAll('.activity-item').forEach((el, i) => {
        const timeEl = el.querySelector('.activity-time');
        if (!timeEl) return;
        // Находим соответствующее событие
        const events = activityEvents.sort((a, b) => b.timestamp - a.timestamp);
        if (events[i]) {
            timeEl.textContent = formatTime(events[i].timestamp);
        }
    });
    renderLiveStats();
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    initActivity();
    renderLiveStats();
    renderActivity();
    initFilters();

    // Live-обновления
    startLiveUpdates();
    setInterval(updateTimes, 30000);
});