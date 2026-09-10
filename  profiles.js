/* ==================== ДАННЫЕ ПРОФИЛЕЙ ==================== */
// Расширенные данные профилей. Если игрока нет тут — генерируем автоматически из players.

const playerProfiles = {
    "КЕФУКА": {
        rank: 5,
        level: 87,
        wins: 3421,
        winStreak: 12,
        joinDate: "15.03.2025",
        clubStatus: "Ветеран",
        favoriteModes: ["Гем-граб", "Захват кристаллов", "Награда за поимку"],
        medals: ["🔥", "⚔️", "🎯", "💬"],
        achievements: [
            { icon: "💬", title: "Душа чата", desc: "Активный участник Telegram-чата", rarity: "rare", unlocked: true },
            { icon: "🔥", title: "12 побед подряд", desc: "Лучшая серия клуба", rarity: "epic", unlocked: true },
            { icon: "⚔️", title: "Мерпорт-мастер", desc: "4 победы в мегакопилке за неделю", rarity: "rare", unlocked: true },
            { icon: "👑", title: "Философ клуба", desc: "Цитата вошла в историю", rarity: "legendary", unlocked: true },
            { icon: "🎯", title: "Снайпер", desc: "10 попаданий подряд", rarity: "common", unlocked: false },
            { icon: "💎", title: "Легенда", desc: "100 000 кубков", rarity: "legendary", unlocked: false }
        ],
        history: [
            { date: "10.09.2026", event: "Получил звание <strong>«Душа чата»</strong>" },
            { date: "05.09.2026", event: "Серия <strong>12 побед подряд</strong>" },
            { date: "22.08.2026", event: "Обновил личный рекорд <strong>76 553 кубка</strong>" },
            { date: "15.03.2025", event: "Вступил в клуб" }
        ],
        rewards: ["fire-frame", "gold-title", "chat-badge"]
    },
    "грудь Насти": {
        rank: 1,
        level: 120,
        wins: 5234,
        winStreak: 8,
        joinDate: "01.01.2025",
        clubStatus: "Ветеран",
        favoriteModes: ["Гем-граб", "Броулбол"],
        medals: ["👑", "🏆", "⭐", "💎", "🔥"],
        achievements: [
            { icon: "👑", title: "Топ-1 клуба", desc: "Максимум кубков", rarity: "legendary", unlocked: true },
            { icon: "🏆", title: "100 000+ кубков", desc: "Легендарный результат", rarity: "legendary", unlocked: true },
            { icon: "⭐", title: "Сенсация", desc: "Первый в клубе по всем показателям", rarity: "epic", unlocked: true }
        ],
        history: [
            { date: "01.09.2026", event: "Достиг <strong>119 571 кубка</strong>" },
            { date: "01.01.2025", event: "Вступил в клуб" }
        ],
        rewards: ["legendary-crown", "fire-frame", "elite-badge"]
    },
    "S.T.A.L.K.E.R.": {
        rank: 24,
        level: 75,
        wins: 2103,
        winStreak: 5,
        joinDate: "01.01.2025",
        clubStatus: "Президент",
        favoriteModes: ["Захват кристаллов", "Награда за поимку"],
        medals: ["👑", "🛡️", "⚔️"],
        achievements: [
            { icon: "👑", title: "Президент клуба", desc: "Основатель и лидер", rarity: "legendary", unlocked: true },
            { icon: "🛡️", title: "Хранитель", desc: "Управляет клубом больше года", rarity: "epic", unlocked: true }
        ],
        history: [
            { date: "01.01.2025", event: "Основал клуб <strong>«нагибаторы3000»</strong>" }
        ],
        rewards: ["president-crown", "shield-frame"]
    }
};

/* ==================== ГЕНЕРАЦИЯ ПРОФИЛЯ ДЛЯ ИГРОКОВ БЕЗ ДАННЫХ ==================== */
function generateProfile(player, rank) {
    // Если есть готовый профиль — используем его
    if (playerProfiles[player.nick]) {
        return { ...playerProfiles[player.nick], ...player };
    }

    // Иначе генерируем на основе доступных данных
    const level = Math.floor(player.trophies / 1000) + 20;
    const wins = Math.floor(player.trophies / 35);
    const winStreak = Math.floor(Math.random() * 10) + 3;
    const status = player.isVeteran ? "Ветеран" : "Участник";
    const joinDate = player.isVeteran ? "15.03.2025" : "01.06.2026";

    return {
        ...player,
        rank: rank,
        level: level,
        wins: wins,
        winStreak: winStreak,
        joinDate: joinDate,
        clubStatus: status,
        favoriteModes: ["Гем-граб", "Захват кристаллов"],
        medals: player.isVeteran ? ["🛡️", "⚔️"] : ["⚔️"],
        achievements: generateAchievements(player),
        history: [
            { date: "01.09.2026", event: `Достиг <strong>${player.trophies.toLocaleString('ru-RU')} кубков</strong>` },
            { date: joinDate, event: "Вступил в клуб" }
        ],
        rewards: player.isVeteran ? ["veteran-frame"] : []
    };
}

/* ==================== ГЕНЕРАЦИЯ АЧИВОК ==================== */
function generateAchievements(player) {
    const ach = [];

    // Достижения по кубкам
    if (player.trophies >= 100000) {
        ach.push({ icon: "👑", title: "Легенда кубков", desc: "100 000+ кубков", rarity: "legendary", unlocked: true });
    } else if (player.trophies >= 75000) {
        ach.push({ icon: "💎", title: "Мастер кубков", desc: "75 000+ кубков", rarity: "epic", unlocked: true });
    } else if (player.trophies >= 50000) {
        ach.push({ icon: "⭐", title: "Опытный", desc: "50 000+ кубков", rarity: "rare", unlocked: true });
    } else {
        ach.push({ icon: "🎯", title: "Растущий", desc: "30 000+ кубков", rarity: "common", unlocked: true });
    }

    // Мегакопилка
    if (player.mk >= 5) {
        ach.push({ icon: "🔥", title: "Мерпорт-мастер", desc: "5 побед в мегакопилке", rarity: "epic", unlocked: true });
    } else if (player.mk >= 3) {
        ach.push({ icon: "⚔️", title: "Активный участник", desc: "3+ победы в мегакопилке", rarity: "rare", unlocked: true });
    } else if (player.mk >= 1) {
        ach.push({ icon: "🎯", title: "Начинающий", desc: "Участвовал в мегакопилке", rarity: "common", unlocked: true });
    }

    // Элита
    if (player.inChat) {
        ach.push({ icon: "💬", title: "Ядро клуба", desc: "В Telegram-чате", rarity: "epic", unlocked: true });
    }

    // Ветеран
    if (player.isVeteran) {
        ach.push({ icon: "🛡️", title: "Ветеран клуба", desc: "Выполнил все требования", rarity: "rare", unlocked: true });
    }

    // Заблокированные (мечты)
    if (player.trophies < 100000) {
        ach.push({ icon: "👑", title: "Легенда кубков", desc: "100 000+ кубков", rarity: "legendary", unlocked: false });
    }
    if (!player.inChat) {
        ach.push({ icon: "💬", title: "Ядро клуба", desc: "Вступить в Telegram-чат", rarity: "epic", unlocked: false });
    }

    return ach;
}

/* ==================== ОТОБРАЖЕНИЕ СПИСКА ИГРОКОВ ==================== */
function renderMiniGrid() {
    const grid = document.getElementById('player-mini-grid');
    if (!grid) return;

    const sorted = [...players].sort((a, b) => b.trophies - a.trophies);

    grid.innerHTML = sorted.map((p, i) => {
        const isElite = p.inChat;
        return `
            <div class="player-mini ${isElite ? 'elite-mini' : ''}" data-nick="${p.nick.replace(/"/g, '&quot;')}">
                <span class="player-mini-rank">#${i + 1}</span>
                <div class="player-mini-avatar">${p.nick[0].toUpperCase()}</div>
                <div class="player-mini-nick">${p.nick}</div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.player-mini').forEach(el => {
        el.addEventListener('click', () => {
            grid.querySelectorAll('.player-mini').forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            openFullProfile(el.dataset.nick);
        });
    });
}

/* ==================== ОТКРЫТИЕ ПРОФИЛЯ ==================== */
function openFullProfile(nick) {
    const sorted = [...players].sort((a, b) => b.trophies - a.trophies);
    const rank = sorted.findIndex(p => p.nick === nick) + 1;
    const basePlayer = players.find(p => p.nick === nick);
    if (!basePlayer) return;

    const profile = generateProfile(basePlayer, rank);

    // Показываем wrapper
    const wrapper = document.getElementById('profile-wrapper');
    wrapper.style.display = 'block';
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // HERO-CARD
    renderHeroCard(profile);

    // Вкладки
    renderOverviewTab(profile);
    renderStatsTab(profile);
    renderAchievementsTab(profile);
    renderHistoryTab(profile);
    renderRewardsTab(profile);

    // Активируем первую вкладку
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="overview"]').classList.add('active');
    document.getElementById('tab-overview').classList.add('active');
}

/* ==================== HERO-CARD ==================== */
function renderHeroCard(p) {
    const hero = document.getElementById('profile-hero');
    if (!hero) return;

    const isLegendary = p.trophies >= 100000 || p.clubStatus === 'Президент';
    const titleClass = getTitleClass(p);

    hero.className = `profile-hero ${isLegendary ? 'legendary' : ''}`;
    hero.innerHTML = `
        <div class="hero-card-inner">
            <div class="hero-card-avatar">
                ${p.nick[0].toUpperCase()}
                <div class="avatar-ring"></div>
                <span class="online-dot ${p.inChat ? '' : 'offline'}"></span>
            </div>
            <div class="hero-card-info">
                <h1 class="hero-card-nick">${p.nick}</h1>
                ${p.tgNick ? `<div class="hero-card-tg">Telegram: <strong>${p.tgNick}</strong></div>` : ''}
                <div class="hero-card-title ${titleClass}">${p.clubStatus}</div>
                <div class="hero-card-stats">
                    <div class="hero-card-stat">
                        <span class="hero-card-stat-value">${p.trophies.toLocaleString('ru-RU')}</span>
                        <span class="hero-card-stat-label">🏆 Кубки</span>
                    </div>
                    <div class="hero-card-stat">
                        <span class="hero-card-stat-value">${p.level}</span>
                        <span class="hero-card-stat-label">⭐ Уровень</span>
                    </div>
                    <div class="hero-card-stat">
                        <span class="hero-card-stat-value">${p.wins.toLocaleString('ru-RU')}</span>
                        <span class="hero-card-stat-label">🎯 Победы</span>
                    </div>
                </div>
            </div>
            <div class="hero-card-rank">
                <div class="hero-card-rank-value">#${p.rank}</div>
                <div class="hero-card-rank-label">Место в клубе</div>
            </div>
        </div>
    `;
}

function getTitleClass(p) {
    if (p.clubStatus === 'Президент') return 'title-president';
    if (p.clubStatus === 'Пане президент') return 'title-vice';
    if (p.inChat) return 'title-elite';
    if (p.isVeteran) return 'title-veteran';
    return 'title-member';
}

/* ==================== ВКЛАДКА: ОБЗОР ==================== */
function renderOverviewTab(p) {
    const el = document.getElementById('tab-overview');
    if (!el) return;

    // Прогресс до следующего звания (условно)
    const progress = Math.min(95, Math.round((p.trophies / 120000) * 100));

    el.innerHTML = `
        <div class="overview-grid">
            <div class="overview-panel">
                <h3>📋 Основная информация</h3>
                <ul class="overview-list">
                    <li><span class="ov-label">Никнейм в игре</span><span class="ov-value">${p.nick}</span></li>
                    <li><span class="ov-label">Telegram</span><span class="ov-value">${p.tgNick || '—'}</span></li>
                    <li><span class="ov-label">Звание</span><span class="ov-value">${p.clubStatus}</span></li>
                    <li><span class="ov-label">Место в рейтинге</span><span class="ov-value">#${p.rank}</span></li>
                    <li><span class="ov-label">Уровень игрока</span><span class="ov-value">${p.level}</span></li>
                    <li><span class="ov-label">Дата вступления</span><span class="ov-value">${p.joinDate}</span></li>
                    <li><span class="ov-label">Текущая серия</span><span class="ov-value">🔥 ${p.winStreak}</span></li>
                </ul>
            </div>

            <div class="overview-panel">
                <h3>🎮 Игровые показатели</h3>
                <ul class="overview-list">
                    <li><span class="ov-label">Всего кубков</span><span class="ov-value">${p.trophies.toLocaleString('ru-RU')}</span></li>
                    <li><span class="ov-label">Всего побед</span><span class="ov-value">${p.wins.toLocaleString('ru-RU')}</span></li>
                    <li><span class="ov-label">Мегакопилка</span><span class="ov-value">${p.mk} побед</span></li>
                    <li><span class="ov-label">Любимый боец</span><span class="ov-value">${p.bestBrawler || '—'}</span></li>
                    <li><span class="ov-label">Любимые режимы</span><span class="ov-value">${p.favoriteModes.join(', ')}</span></li>
                </ul>
            </div>

            <div class="overview-panel" style="grid-column: 1 / -1;">
                <h3>📈 Прогресс до следующего звания</h3>
                <div class="overview-progress">
                    <div class="overview-progress-label">
                        <span>Текущее: <strong>${p.clubStatus}</strong></span>
                        <span>${progress}%</span>
                    </div>
                    <div class="stat-bar-track">
                        <div class="stat-bar-fill animate" style="--bar-width: ${progress}%"></div>
                    </div>
                    <p style="margin-top:10px; font-size:0.85rem; color:var(--text-dim);">
                        До следующего звания: ещё <strong style="color:var(--gold)">${Math.max(0, 120000 - p.trophies).toLocaleString('ru-RU')}</strong> кубков
                    </p>
                </div>
            </div>

            <div class="overview-panel" style="grid-column: 1 / -1;">
                <h3>🏅 Медали</h3>
                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    ${p.medals.map(m => `
                        <span style="font-size:2rem; filter: drop-shadow(0 0 15px rgba(249,202,36,0.6));">${m}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/* ==================== ВКЛАДКА: СТАТИСТИКА ==================== */
function renderStatsTab(p) {
    const el = document.getElementById('tab-stats');
    if (!el) return;

    // Генерация статистики
    const avgPerMatch = 35;
    const totalMatches = Math.floor(p.trophies / avgPerMatch);
    const winRate = 60 + Math.floor(Math.random() * 15);

    el.innerHTML = `
        <div class="stats-page-grid">
            <div class="stat-big-card">
                <span class="stat-big-icon">🏆</span>
                <span class="stat-big-value">${p.trophies.toLocaleString('ru-RU')}</span>
                <span class="stat-big-label">Кубки</span>
            </div>
            <div class="stat-big-card">
                <span class="stat-big-icon">🎯</span>
                <span class="stat-big-value">${p.wins.toLocaleString('ru-RU')}</span>
                <span class="stat-big-label">Победы</span>
            </div>
            <div class="stat-big-card">
                <span class="stat-big-icon">⚔️</span>
                <span class="stat-big-value">${totalMatches.toLocaleString('ru-RU')}</span>
                <span class="stat-big-label">Матчей всего</span>
            </div>
            <div class="stat-big-card">
                <span class="stat-big-icon">📊</span>
                <span class="stat-big-value">${winRate}%</span>
                <span class="stat-big-label">Процент побед</span>
            </div>
            <div class="stat-big-card">
                <span class="stat-big-icon">🔥</span>
                <span class="stat-big-value">${p.winStreak}</span>
                <span class="stat-big-label">Серия побед</span>
            </div>
            <div class="stat-big-card">
                <span class="stat-big-icon">⭐</span>
                <span class="stat-big-value">${p.level}</span>
                <span class="stat-big-label">Уровень</span>
            </div>
        </div>

        <div class="stat-bars">
            <h3 style="color:var(--gold); font-family:'Russo One',sans-serif; margin-bottom:20px;">📈 Детальная статистика</h3>
            ${renderStatBar('Кубки', p.trophies, 120000)}
            ${renderStatBar('Победы', p.wins, 6000)}
            ${renderStatBar('Мегакопилка', p.mk, 10)}
            ${renderStatBar('Уровень', p.level, 150)}
            ${renderStatBar('Серия побед', p.winStreak, 20)}
        </div>
    `;

    // Запускаем анимацию после рендера
    setTimeout(() => {
        el.querySelectorAll('.stat-bar-fill').forEach(bar => {
            bar.classList.add('animate');
        });
    }, 100);
}

function renderStatBar(label, current, max) {
    const percent = Math.min(100, Math.round((current / max) * 100));
    return `
        <div class="stat-bar-row">
            <div class="stat-bar-header">
                <span>${label}</span>
                <span>${current.toLocaleString('ru-RU')} / ${max.toLocaleString('ru-RU')}</span>
            </div>
            <div class="stat-bar-track">
                <div class="stat-bar-fill" style="--bar-width: ${percent}%"></div>
            </div>
        </div>
    `;
}

/* ==================== ВКЛАДКА: ДОСТИЖЕНИЯ ==================== */
function renderAchievementsTab(p) {
    const el = document.getElementById('tab-achievements');
    if (!el) return;

    const unlocked = p.achievements.filter(a => a.unlocked).length;
    const total = p.achievements.length;

    el.innerHTML = `
        <div style="margin-bottom:20px; text-align:center;">
            <div style="font-family:'Russo One',sans-serif; font-size:1.1rem; color:var(--gold);">
                Разблокировано: ${unlocked} / ${total}
            </div>
            <div class="stat-bar-track" style="max-width:400px; margin:15px auto 0;">
                <div class="stat-bar-fill" style="--bar-width: ${Math.round((unlocked / total) * 100)}%; width: ${Math.round((unlocked / total) * 100)}%;"></div>
            </div>
        </div>
        <div class="achievements-grid">
            ${p.achievements.map(a => `
                <div class="ach-card ${a.rarity} ${a.unlocked ? '' : 'locked'}">
                    <span class="ach-icon">${a.icon}</span>
                    <div class="ach-title">${a.title}</div>
                    <div class="ach-desc">${a.desc}</div>
                    <span class="ach-rarity rarity-${a.rarity}">${a.rarity.toUpperCase()}</span>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==================== ВКЛАДКА: ИСТОРИЯ ==================== */
function renderHistoryTab(p) {
    const el = document.getElementById('tab-history');
    if (!el) return;

    el.innerHTML = `
        <div class="history-timeline">
            ${p.history.map(h => `
                <div class="history-item">
                    <div class="history-date">${h.date}</div>
                    <div class="history-event">${h.event}</div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==================== ВКЛАДКА: НАГРАДЫ ==================== */
function renderRewardsTab(p) {
    const el = document.getElementById('tab-rewards');
    if (!el) return;

    const allRewards = [
        { id: "fire-frame", icon: "🔥", name: "Огненная рамка", cost: 500 },
        { id: "gold-title", icon: "👑", name: "Золотой титул", cost: 1000 },
        { id: "chat-badge", icon: "💬", name: "Значок чата", cost: 300 },
        { id: "legendary-crown", icon: "🏆", name: "Легендарная корона", cost: 2000 },
        { id: "elite-badge", icon: "💎", name: "Элитный бейдж", cost: 800 },
        { id: "president-crown", icon: "👑", name: "Корона президента", cost: 3000 },
        { id: "shield-frame", icon: "🛡️", name: "Рамка-щит", cost: 700 },
        { id: "veteran-frame", icon: "⚔️", name: "Рамка ветерана", cost: 400 }
    ];

    const owned = p.rewards || [];

    el.innerHTML = `
        <div style="text-align:center; margin-bottom:25px; padding:20px; background:rgba(249,202,36,0.08); border-radius:16px; border:1px solid var(--border);">
            <div style="font-size:0.8rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px;">Тиранские очки</div>
            <div style="font-family:'Russo One',sans-serif; font-size:2rem; color:var(--gold); text-shadow: 0 0 20px rgba(249,202,36,0.5);">
                🪙 ${(p.trophies / 100).toFixed(0)}
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">
                Внутренняя игровая валюта клуба (не реальные деньги)
            </div>
        </div>
        <div class="rewards-grid">
            ${allRewards.map(r => {
                const isOwned = owned.includes(r.id);
                return `
                    <div class="reward-card ${isOwned ? 'owned' : ''}">
                        <span class="reward-icon">${r.icon}</span>
                        <div class="reward-name">${r.name}</div>
                        <div class="reward-cost">${isOwned ? '✅ Получено' : `🪙 ${r.cost}`}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/* ==================== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ==================== */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${tab}`).classList.add('active');

            // Анимация появления баров
            if (tab === 'stats' || tab === 'overview') {
                setTimeout(() => {
                    document.querySelectorAll('.stat-bar-fill').forEach(bar => {
                        bar.classList.add('animate');
                    });
                }, 50);
            }
        });
    });
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Тема
    if (typeof initTheme === 'function') initTheme();

    // Бургер
    if (typeof initBurger === 'function') initBurger();

    // Рендер
    renderMiniGrid();
    initTabs();

    // Автооткрытие первого игрока
    setTimeout(() => {
        const first = document.querySelector('.player-mini');
        if (first) first.click();
    }, 300);
});