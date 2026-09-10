/* ==================== ДАННЫЕ КОМНАТ ==================== */
const CASTLE_ROOMS = [
    {
        id: "training",
        icon: "⚔️",
        name: "Тренировочная",
        desc: "Изучай гайды, тир-листы и стратегии",
        link: "guides.html",
        info: "Здесь ты найдёшь гайды по мегакопилке, разбор карт, тир-лист персонажей и 10 советов для роста кубков.",
        stat: "6 гайдов · 10 советов · FAQ"
    },
    {
        id: "trophy",
        icon: "🏆",
        name: "Галерея трофеев",
        desc: "Достижения и рекорды клуба",
        link: "achievements.html",
        info: "47 достижений в 9 категориях. 4 уровня редкости. Секретные ачивки. Легендарные — со вспышкой.",
        stat: "47 достижений · 4 редкости"
    },
    {
        id: "throne",
        icon: "👑",
        name: "Тронный зал",
        desc: "Главная страница клуба",
        link: "index.html",
        info: "Здесь — рейтинг, элита, статистика, мини-игры, зал славы и всё главное о клубе «нагибаторы3000».",
        stat: "Главная · Рейтинг · Элита"
    },
    {
        id: "chat",
        icon: "💬",
        name: "Чат-комната",
        desc: "Telegram-чат клуба",
        link: "https://t.me/+DL9_0ZsiBn0zZGE6",
        external: true,
        info: "Основное место общения клуба. Правила: уважение, без спама, активность. После входа — напиши свой ник.",
        stat: "Telegram · Элита · Активность"
    },
    {
        id: "barracks",
        icon: "🛡️",
        name: "Казармы",
        desc: "Профили и звания участников",
        link: "profiles.html",
        info: "Профили всех 30 игроков. 5 вкладок: обзор, статистика, достижения, история, награды. Звания от Участника до Президента.",
        stat: "30 профилей · 5 званий"
    },
    {
        id: "arcade",
        icon: "🎮",
        name: "Игровой зал",
        desc: "6 мини-игр клуба",
        link: "minigames.html",
        info: "Ежедневное испытание, угадай бойца, реакция, угадай результат, колесо и викторина. Зарабатывай Тиранские очки!",
        stat: "6 игр · Leaderboard"
    },
    {
        id: "treasury",
        icon: "💰",
        name: "Сокровищница",
        desc: "Магазин наград за Тиранские очки",
        link: "shop.html",
        info: "25 предметов в 6 категориях: рамки, титулы, значки, короны, эффекты, декор. Всё за внутреннюю валюту клуба.",
        stat: "25 наград · 6 категорий"
    },
    {
        id: "scout",
        icon: "📡",
        name: "Разведка",
        desc: "LIVE-лента активности клуба",
        link: "activity.html",
        info: "События в реальном времени: рейтинг, ачивки, повышения, рекорды, мини-игры. Toast-уведомления о новых событиях.",
        stat: "LIVE · 6 категорий"
    },
    {
        id: "vault",
        icon: "🔒",
        name: "Секретный штаб",
        desc: "Только для элиты",
        link: "core.html",
        info: "Закрытая страница для участников Telegram-чата. Пароль: название клуба в игре (одно слово).",
        stat: "Пароль · Только для элиты"
    }
];

/* ==================== СТАТИСТИКА ЗАМКА ==================== */
function renderCastleStats() {
    const el = document.getElementById('castle-stats');
    if (!el) return;

    const totalRooms = CASTLE_ROOMS.length;
    const eliteRooms = CASTLE_ROOMS.filter(r => r.id === 'vault').length;
    const openRooms = totalRooms - eliteRooms;

    // Считаем общее количество "контента"
    const totalAchievements = 47;
    const totalPlayers = (typeof players !== 'undefined') ? players.length : 30;

    el.innerHTML = `
        <div class="castle-stat">
            <span class="castle-stat-icon">🏰</span>
            <span class="castle-stat-value">${totalRooms}</span>
            <span class="castle-stat-label">Комнат</span>
        </div>
        <div class="castle-stat">
            <span class="castle-stat-icon">🔓</span>
            <span class="castle-stat-value">${openRooms}</span>
            <span class="castle-stat-label">Открыто</span>
        </div>
        <div class="castle-stat">
            <span class="castle-stat-icon">👥</span>
            <span class="castle-stat-value">${totalPlayers}</span>
            <span class="castle-stat-label">Жителей</span>
        </div>
        <div class="castle-stat">
            <span class="castle-stat-icon">🏆</span>
            <span class="castle-stat-value">${totalAchievements}</span>
            <span class="castle-stat-label">Достижений</span>
        </div>
    `;
}

/* ==================== СЕТКА КОМНАТ ==================== */
function renderCastleGrid() {
    const grid = document.getElementById('castle-grid');
    if (!grid) return;

    // Порядок: training, trophy, throne (центр), chat, barracks, arcade, treasury, scout, vault
    const order = ['training', 'trophy', 'throne', 'chat', 'barracks', 'arcade', 'treasury', 'scout', 'vault'];

    grid.innerHTML = order.map(id => {
        const room = CASTLE_ROOMS.find(r => r.id === id);
        if (!room) return '';

        return `
            <div class="castle-room" data-room="${room.id}" onclick="openRoom('${room.id}')">
                <span class="castle-room-icon">${room.icon}</span>
                <div class="castle-room-name">${room.name}</div>
                <div class="castle-room-desc">${room.desc}</div>
            </div>
        `;
    }).join('');
}

/* ==================== ЛЕГЕНДА ==================== */
function renderLegend() {
    const el = document.getElementById('castle-legend');
    if (!el) return;

    el.innerHTML = CASTLE_ROOMS.map(r => `
        <div class="legend-item">
            <span class="legend-icon">${r.icon}</span>
            <span><strong style="color:var(--gold);">${r.name}</strong> — ${r.desc}</span>
        </div>
    `).join('');
}

/* ==================== МОДАЛКА КОМНАТЫ ==================== */
function openRoom(id) {
    const room = CASTLE_ROOMS.find(r => r.id === id);
    if (!room) return;

    const modal = document.getElementById('castle-modal');
    document.getElementById('castle-modal-icon').textContent = room.icon;
    document.getElementById('castle-modal-name').textContent = room.name;
    document.getElementById('castle-modal-desc').textContent = room.desc;
    document.getElementById('castle-modal-info').innerHTML = `
        <strong>📋 Информация:</strong><br>
        ${room.info}<br><br>
        <strong>📊 Статистика:</strong> ${room.stat}
    `;

    const buttonsEl = document.getElementById('castle-modal-buttons');
    if (room.external) {
        buttonsEl.innerHTML = `
            <a href="${room.link}" target="_blank" class="castle-modal-btn">💬 Открыть Telegram</a>
            <button class="castle-modal-btn secondary" onclick="closeRoom()">Закрыть</button>
        `;
    } else {
        buttonsEl.innerHTML = `
            <a href="${room.link}" class="castle-modal-btn">🚪 Войти →</a>
            <button class="castle-modal-btn secondary" onclick="closeRoom()">Закрыть</button>
        `;
    }

    modal.classList.add('active');
}

function closeRoom() {
    document.getElementById('castle-modal').classList.remove('active');
}

document.getElementById('castle-modal-close')?.addEventListener('click', closeRoom);
document.getElementById('castle-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'castle-modal') closeRoom();
});

/* ==================== АНИМАЦИЯ ПОЯВЛЕНИЯ КОМНАТ ==================== */
function animateRooms() {
    const rooms = document.querySelectorAll('.castle-room');
    rooms.forEach((room, i) => {
        room.style.opacity = '0';
        room.style.transform = 'scale(0.7) translateY(30px)';
        setTimeout(() => {
            room.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            room.style.opacity = '1';
            room.style.transform = '';
        }, 100 + i * 80);
    });
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    renderCastleStats();
    renderCastleGrid();
    renderLegend();

    // Анимация появления комнат при загрузке
    setTimeout(animateRooms, 300);

    // Параллакс-эффект для карты
    const castleWrapper = document.querySelector('.castle-wrapper');
    if (castleWrapper && window.innerWidth >= 1000) {
        castleWrapper.addEventListener('mousemove', (e) => {
            const rect = castleWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rooms = castleWrapper.querySelectorAll('.castle-room');
            rooms.forEach((room, i) => {
                const depth = (i % 3) + 1;
                room.style.transform = `translate(${x * depth * 3}px, ${y * depth * 3}px)`;
            });
        });

        castleWrapper.addEventListener('mouseleave', () => {
            castleWrapper.querySelectorAll('.castle-room').forEach(room => {
                room.style.transform = '';
            });
        });
    }
});

/* ==================== ГЛОБАЛЬНЫЕ ФУНКЦИИ ==================== */
window.openRoom = openRoom;
window.closeRoom = closeRoom;