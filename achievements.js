/* ==================== ДАННЫЕ ДОСТИЖЕНИЙ ==================== */
// Категории: trophies, wins, activity, team, rating, events, minigames, rare, secret
// Редкости: common, rare, epic, legendary

const ACHIEVEMENTS = [
    // === ТРОФЕИ ===
    { id: "tr1", cat: "trophies", icon: "🎯", name: "Первые шаги", desc: "Достигни 30 000 кубков", rarity: "common", condition: p => p.trophies >= 30000, progress: p => [p.trophies, 30000] },
    { id: "tr2", cat: "trophies", icon: "⭐", name: "Опытный", desc: "Достигни 50 000 кубков", rarity: "rare", condition: p => p.trophies >= 50000, progress: p => [p.trophies, 50000] },
    { id: "tr3", cat: "trophies", icon: "💎", name: "Мастер кубков", desc: "Достигни 75 000 кубков", rarity: "epic", condition: p => p.trophies >= 75000, progress: p => [p.trophies, 75000] },
    { id: "tr4", cat: "trophies", icon: "👑", name: "Легенда кубков", desc: "Достигни 100 000 кубков", rarity: "legendary", condition: p => p.trophies >= 100000, progress: p => [p.trophies, 100000] },
    { id: "tr5", cat: "trophies", icon: "🏆", name: "Гранд-мастер", desc: "Достигни 119 000 кубков", rarity: "legendary", condition: p => p.trophies >= 119000, progress: p => [p.trophies, 119000] },

    // === ПОБЕДЫ ===
    { id: "win1", cat: "wins", icon: "⚔️", name: "Первая кровь", desc: "Одержи 100 побед", rarity: "common", condition: p => (p.trophies / 35) >= 100, progress: p => [Math.floor(p.trophies / 35), 100] },
    { id: "win2", cat: "wins", icon: "🎯", name: "Воин", desc: "Одержи 1 000 побед", rarity: "rare", condition: p => (p.trophies / 35) >= 1000, progress: p => [Math.floor(p.trophies / 35), 1000] },
    { id: "win3", cat: "wins", icon: "💪", name: "Чемпион", desc: "Одержи 3 000 побед", rarity: "epic", condition: p => (p.trophies / 35) >= 3000, progress: p => [Math.floor(p.trophies / 35), 3000] },
    { id: "win4", cat: "wins", icon: "🔥", name: "Тиран побед", desc: "Одержи 5 000 побед", rarity: "legendary", condition: p => (p.trophies / 35) >= 5000, progress: p => [Math.floor(p.trophies / 35), 5000] },

    // === АКТИВНОСТЬ ===
    { id: "act1", cat: "activity", icon: "💬", name: "Ядро клуба", desc: "Вступи в Telegram-чат", rarity: "epic", condition: p => p.inChat, progress: () => [0, 1] },
    { id: "act2", cat: "activity", icon: "🛡️", name: "Ветеран", desc: "Стань ветераном клуба", rarity: "rare", condition: p => p.isVeteran, progress: () => [0, 1] },
    { id: "act3", cat: "activity", icon: "🎩", name: "Хранитель порядка", desc: "Получи особую роль в чате", rarity: "epic", condition: p => p.role.includes('президент') || p.role.includes('Чат'), progress: () => [0, 1] },
    { id: "act4", cat: "activity", icon: "😈", name: "Мемный генерал", desc: "Прославился мемами в чате", rarity: "rare", condition: p => p.nick === 'Assiverb', progress: () => [0, 1] },

    // === КОМАНДНЫЕ ===
    { id: "team1", cat: "team", icon: "🤝", name: "Тиммейт", desc: "Участвуй в клубных войнах", rarity: "common", condition: p => p.isVeteran || p.inChat, progress: () => [0, 1] },
    { id: "team2", cat: "team", icon: "⚔️", name: "Мерпорт-мастер", desc: "5 побед в мегакопилке", rarity: "epic", condition: p => p.mk >= 5, progress: p => [p.mk, 5] },
    { id: "team3", cat: "team", icon: "🎯", name: "Активный участник", desc: "3+ победы в мегакопилке", rarity: "rare", condition: p => p.mk >= 3, progress: p => [p.mk, 3] },
    { id: "team4", cat: "team", icon: "🔥", name: "Душа команды", desc: "Помог клубу набрать победы", rarity: "rare", condition: p => p.mk >= 4, progress: p => [p.mk, 4] },

    // === РЕЙТИНГ ===
    { id: "rate1", cat: "rating", icon: "🥉", name: "Топ-10 клуба", desc: "Войди в топ-10 по кубкам", rarity: "rare", condition: p => getRank(p.nick) <= 10, progress: p => [11 - Math.min(10, getRank(p.nick)), 10] },
    { id: "rate2", cat: "rating", icon: "🥈", name: "Топ-5 клуба", desc: "Войди в топ-5 по кубкам", rarity: "epic", condition: p => getRank(p.nick) <= 5, progress: p => [6 - Math.min(5, getRank(p.nick)), 5] },
    { id: "rate3", cat: "rating", icon: "🥇", name: "Топ-3 клуба", desc: "Войди в топ-3 по кубкам", rarity: "legendary", condition: p => getRank(p.nick) <= 3, progress: p => [4 - Math.min(3, getRank(p.nick)), 3] },
    { id: "rate4", cat: "rating", icon: "👑", name: "Топ-1 клуба", desc: "Стань лучшим по кубкам", rarity: "legendary", condition: p => getRank(p.nick) === 1, progress: p => [1, 1] },

    // === СОБЫТИЯ ===
    { id: "evt1", cat: "events", icon: "🎉", name: "Клубный день", desc: "Участвуй в клубном дне", rarity: "common", condition: p => p.isVeteran || p.inChat, progress: () => [0, 1] },
    { id: "evt2", cat: "events", icon: "🏆", name: "Турнирный боец", desc: "Участвуй в турнире клуба", rarity: "rare", condition: p => p.isVeteran, progress: () => [0, 1] },
    { id: "evt3", cat: "events", icon: "🎯", name: "Победитель турнира", desc: "Выиграй внутренний турнир", rarity: "legendary", condition: p => p.trophies >= 80000, progress: () => [0, 1] },

    // === МИНИ-ИГРЫ ===
    { id: "mg1", cat: "minigames", icon: "🐻", name: "Медвежатник", desc: "Выживи в «Медведе-шатуне»", rarity: "rare", condition: p => p.inChat, progress: () => [0, 1] },
    { id: "mg2", cat: "minigames", icon: "♟️", name: "Шахматист", desc: "Сыграй в шахматном вечере", rarity: "common", condition: p => p.isVeteran, progress: () => [0, 1] },
    { id: "mg3", cat: "minigames", icon: "🎲", name: "Мастер мини-игр", desc: "Победи во всех мини-играх", rarity: "epic", condition: p => p.trophies >= 60000, progress: () => [0, 1] },

    // === РЕДКИЕ ===
    { id: "rare1", cat: "rare", icon: "🦄", name: "Единорог", desc: "Уникальное достижение", rarity: "legendary", condition: p => p.trophies >= 110000, progress: () => [0, 1] },
    { id: "rare2", cat: "rare", icon: "💎", name: "Бриллиант", desc: "Редчайший игрок клуба", rarity: "epic", condition: p => p.mk >= 5 && p.inChat, progress: () => [0, 1] },
    { id: "rare3", cat: "rare", icon: "⭐", name: "Звезда клуба", desc: "Признание всего клуба", rarity: "epic", condition: p => p.nick === 'КЕФУКА' || p.nick === 'грудь Насти', progress: () => [0, 1] },

    // === СЕКРЕТНЫЕ ===
    { id: "sec1", cat: "secret", icon: "🔒", name: "???", desc: "Секретное достижение", rarity: "legendary", secret: true, condition: p => p.nick === 'КЕФУКА', progress: () => [0, 1] },
    { id: "sec2", cat: "secret", icon: "🔒", name: "???", desc: "Секретное достижение", rarity: "legendary", secret: true, condition: p => p.nick === 'zero', progress: () => [0, 1] },
    { id: "sec3", cat: "secret", icon: "🔒", name: "???", desc: "Секретное достижение", rarity: "epic", secret: true, condition: p => p.nick === 'S.T.A.L.K.E.R.', progress: () => [0, 1] },
    { id: "sec4", cat: "secret", icon: "🔒", name: "???", desc: "Секретное достижение", rarity: "epic", secret: true, condition: p => p.tgNick && p.tgNick.includes('@'), progress: () => [0, 1] },

    // === ДОПОЛНИТЕЛЬНЫЕ ===
    { id: "ext1", cat: "trophies", icon: "🚀", name: "Быстрый рост", desc: "+10 000 кубков за месяц", rarity: "epic", condition: p => p.trophies >= 70000, progress: () => [0, 1] },
    { id: "ext2", cat: "wins", icon: "🎯", name: "Снайпер", desc: "10 побед подряд", rarity: "rare", condition: p => p.trophies >= 40000, progress: () => [0, 1] },
    { id: "ext3", cat: "activity", icon: "💎", name: "Легенда чата", desc: "100+ сообщений в чате", rarity: "rare", condition: p => p.inChat, progress: () => [0, 1] },
    { id: "ext4", cat: "team", icon: "🛡️", name: "Защитник клуба", desc: "Помогал новичкам", rarity: "rare", condition: p => p.isVeteran, progress: () => [0, 1] },
    { id: "ext5", cat: "events", icon: "🎁", name: "Подарок клубу", desc: "Пригласил нового игрока", rarity: "epic", condition: p => p.trophies >= 50000, progress: () => [0, 1] },
    { id: "ext6", cat: "minigames", icon: "🏆", name: "Рекордсмен", desc: "Установил рекорд мини-игры", rarity: "epic", condition: p => p.trophies >= 65000, progress: () => [0, 1] },
    { id: "ext7", cat: "rating", icon: "📈", name: "Ростун", desc: "Поднялся на 10 позиций", rarity: "rare", condition: p => getRank(p.nick) <= 15, progress: () => [0, 1] },
    { id: "ext8", cat: "rare", icon: "🌟", name: "Хранитель традиций", desc: "Соблюдает все правила", rarity: "rare", condition: p => p.isVeteran, progress: () => [0, 1] },
    { id: "ext9", cat: "trophies", icon: "💫", name: "Икона клуба", desc: "Пример для подражания", rarity: "legendary", condition: p => p.trophies >= 100000 && p.inChat, progress: () => [0, 1] },
    { id: "ext10", cat: "team", icon: "🎖️", name: "Верный друг", desc: "Помог в 50+ матчах", rarity: "epic", condition: p => p.mk >= 4, progress: () => [0, 1] },
];

/* ==================== ТЕКУЩИЙ ИГРОК ==================== */
const CURRENT_PLAYER_NICK = "КЕФУКА"; // Меняй для теста
let currentPlayer = null;

function getCurrentPlayer() {
    if (typeof players === 'undefined') return null;
    return players.find(p => p.nick === CURRENT_PLAYER_NICK) || players[0];
}

function getRank(nick) {
    if (typeof players === 'undefined') return 99;
    const sorted = [...players].sort((a, b) => b.trophies - a.trophies);
    return sorted.findIndex(p => p.nick === nick) + 1;
}

/* ==================== ФИЛЬТРЫ ==================== */
let activeCat = 'all';
let activeRar = 'all';

/* ==================== ПРОВЕРКА РАЗБЛОКИРОВКИ ==================== */
function isUnlocked(ach, player) {
    if (!player) return false;
    try {
        return ach.condition(player);
    } catch (e) {
        return false;
    }
}

function getProgress(ach, player) {
    if (!player) return [0, 1];
    try {
        return ach.progress(player) || [0, 1];
    } catch (e) {
        return [0, 1];
    }
}

/* ==================== РЕНДЕР СЕТКИ ==================== */
function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    const player = getCurrentPlayer();
    let list = ACHIEVEMENTS.slice();

    // Фильтр по категории
    if (activeCat !== 'all') {
        list = list.filter(a => a.cat === activeCat);
    }

    // Фильтр по редкости
    if (activeRar !== 'all') {
        list = list.filter(a => a.rarity === activeRar);
    }

    // Сортировка: сначала разблокированные, потом по редкости
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
    list.sort((a, b) => {
        const aUnlocked = isUnlocked(a, player);
        const bUnlocked = isUnlocked(b, player);
        if (aUnlocked !== bUnlocked) return aUnlocked ? -1 : 1;
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });

    grid.innerHTML = list.map(ach => {
        const unlocked = isUnlocked(ach, player);
        const [cur, max] = getProgress(ach, player);
        const percent = Math.min(100, Math.round((cur / max) * 100));
        const isSecret = ach.secret && !unlocked;

        const displayName = isSecret ? '???' : ach.name;
        const displayDesc = isSecret ? 'Секретное достижение. Продолжай играть, чтобы открыть.' : ach.desc;
        const displayIcon = isSecret ? '🔒' : ach.icon;

        return `
            <div class="ach-page-card ${ach.rarity} ${unlocked ? '' : 'locked'} ${isSecret ? 'secret' : ''}"
                 data-id="${ach.id}"
                 onclick="showAchDetails('${ach.id}')">
                <span class="ach-page-icon">${displayIcon}</span>
                <div class="ach-page-name">${displayName}</div>
                <div class="ach-page-desc">${displayDesc}</div>
                <div class="ach-page-footer">
                    <span class="ach-page-rarity rarity-${ach.rarity}">${ach.rarity.toUpperCase()}</span>
                    ${unlocked ? '<span class="ach-page-date">✓ Открыто</span>' : ''}
                </div>
                ${!unlocked && !isSecret ? `
                    <div class="ach-page-progress">
                        <div class="ach-page-progress-track">
                            <div class="ach-page-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                        <div class="ach-page-progress-label">
                            <span>${cur.toLocaleString('ru-RU')}</span>
                            <span>${max.toLocaleString('ru-RU')}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

/* ==================== ОБНОВЛЕНИЕ СТАТИСТИКИ ==================== */
function updateStats() {
    const player = getCurrentPlayer();
    if (!player) return;

    const total = ACHIEVEMENTS.length;
    const unlocked = ACHIEVEMENTS.filter(a => isUnlocked(a, player)).length;
    const legendary = ACHIEVEMENTS.filter(a => a.rarity === 'legendary' && isUnlocked(a, player)).length;
    const percent = Math.round((unlocked / total) * 100);

    document.getElementById('unlocked-count').textContent = unlocked;
    document.getElementById('legendary-count').textContent = legendary;
    document.getElementById('progress-percent').textContent = percent + '%';
    document.getElementById('progress-text').textContent = `${unlocked} из ${total}`;

    setTimeout(() => {
        const fill = document.getElementById('ach-progress-fill');
        if (fill) fill.style.width = percent + '%';
    }, 200);
}

/* ==================== МОДАЛКА РАЗБЛОКИРОВКИ ==================== */
function showAchDetails(id) {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    const player = getCurrentPlayer();
    const unlocked = isUnlocked(ach, player);
    const isSecret = ach.secret && !unlocked;

    // Если разблокировано — показываем анимацию
    if (unlocked) {
        showUnlockAnimation(ach);
    } else {
        // Иначе показываем прогресс
        showProgressModal(ach, player, isSecret);
    }
}

function showUnlockAnimation(ach) {
    const modal = document.getElementById('ach-modal');
    const content = document.getElementById('ach-modal-content');
    const iconEl = document.getElementById('ach-modal-icon');
    const rarityEl = document.getElementById('ach-modal-rarity');
    const nameEl = document.getElementById('ach-modal-name');
    const descEl = document.getElementById('ach-modal-desc');
    const particlesEl = document.getElementById('ach-modal-particles');

    content.className = 'ach-modal-content ' + (ach.rarity === 'legendary' ? 'legendary' : '');
    iconEl.textContent = ach.icon;
    rarityEl.textContent = ach.rarity.toUpperCase();
    rarityEl.className = 'ach-modal-rarity rarity-' + ach.rarity;
    nameEl.textContent = ach.name;
    descEl.textContent = ach.desc;

    // Частицы
    particlesEl.innerHTML = '';
    const count = ach.rarity === 'legendary' ? 40 : ach.rarity === 'epic' ? 25 : 15;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'ach-modal-particle';
        const angle = (Math.PI * 2 * i) / count;
        const dist = 150 + Math.random() * 200;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        p.style.animationDelay = (0.3 + Math.random() * 0.4) + 's';
        if (ach.rarity === 'legendary') {
            p.style.background = '#ffd700';
            p.style.boxShadow = '0 0 20px #ffd700';
        }
        particlesEl.appendChild(p);
    }

    modal.classList.add('active');
}

function showProgressModal(ach, player, isSecret) {
    const modal = document.getElementById('ach-modal');
    const content = document.getElementById('ach-modal-content');
    const iconEl = document.getElementById('ach-modal-icon');
    const rarityEl = document.getElementById('ach-modal-rarity');
    const nameEl = document.getElementById('ach-modal-name');
    const descEl = document.getElementById('ach-modal-desc');
    const particlesEl = document.getElementById('ach-modal-particles');

    content.className = 'ach-modal-content';
    particlesEl.innerHTML = '';

    iconEl.textContent = isSecret ? '🔒' : ach.icon;
    rarityEl.textContent = ach.rarity.toUpperCase();
    rarityEl.className = 'ach-modal-rarity rarity-' + ach.rarity;
    nameEl.textContent = isSecret ? '???' : ach.name;

    if (isSecret) {
        descEl.innerHTML = 'Секретное достижение.<br>Продолжай играть, чтобы открыть его!';
    } else {
        const [cur, max] = getProgress(ach, player);
        const percent = Math.min(100, Math.round((cur / max) * 100));
        descEl.innerHTML = `
            ${ach.desc}<br><br>
            <strong style="color:var(--gold);">Прогресс:</strong> ${cur.toLocaleString('ru-RU')} / ${max.toLocaleString('ru-RU')} (${percent}%)
        `;
    }

    modal.classList.add('active');
}

document.getElementById('ach-modal-close')?.addEventListener('click', () => {
    document.getElementById('ach-modal').classList.remove('active');
});
document.getElementById('ach-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'ach-modal') e.target.classList.remove('active');
});

/* ==================== ФИЛЬТРЫ ==================== */
function initAchFilters() {
    // Категории
    document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat;
            renderAchievements();
        });
    });

    // Редкости
    document.querySelectorAll('.filter-btn[data-rar]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-rar]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeRar = btn.dataset.rar;
            renderAchievements();
        });
    });
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    currentPlayer = getCurrentPlayer();
    renderAchievements();
    updateStats();
    initAchFilters();
});