/* ==================== ДАННЫЕ ЗВАНИЙ ==================== */
const RANKS = [
    {
        id: "member",
        level: 1,
        emoji: "⚔️",
        name: "Участник",
        rarity: "common",
        color: "#7f8c8d",
        description: "Базовое звание клуба. Ты — часть команды, но ещё не доказал свою преданность.",
        requirements: [
            "Вступить в клуб",
            "Иметь 25 000+ кубков",
            "Играть хотя бы раз в неделю"
        ],
        reward: "Доступ к клубным войнам"
    },
    {
        id: "veteran",
        level: 2,
        emoji: "🛡️",
        name: "Ветеран",
        rarity: "rare",
        color: "#e67e22",
        description: "Опытный боец, который доказал свою преданность клубу. Пример для новичков.",
        requirements: [
            "14 билетов на неделе лиги",
            "Все клубные квесты выполнены",
            "Повышение за 3 дня до конца недели",
            "Уважение к участникам"
        ],
        reward: "Значок 🛡️ + приоритет в составе"
    },
    {
        id: "elite",
        level: 3,
        emoji: "💎",
        name: "Элита",
        rarity: "epic",
        color: "#f9ca24",
        description: "Ветеран, который вступил в Telegram-чат клуба. Ядро клуба — те, кто в самом сердце.",
        requirements: [
            "Быть в звании Ветерана",
            "Вступить в Telegram-чат клуба",
            "Написать свой игровой ник в чате",
            "Активно участвовать в жизни клуба"
        ],
        reward: "Значок 💎 + доступ к закрытому штабу"
    },
    {
        id: "vice",
        level: 4,
        emoji: "🎩",
        name: "Пане президент",
        rarity: "legendary",
        color: "#a29bfe",
        description: "Заместитель президента. Помогает управлять клубом, принимает решения.",
        requirements: [
            "Быть в Элите",
            "Показать лидерские качества",
            "Назначение президентом клуба",
            "Стабильная активность 6+ месяцев"
        ],
        reward: "Значок 🎩 + права модератора"
    },
    {
        id: "president",
        level: 5,
        emoji: "👑",
        name: "Президент",
        rarity: "mythic",
        color: "#ff4757",
        description: "Глава клуба. Основатель, лидер, легенда. Тот, кто ведёт команду к победам.",
        requirements: [
            "Основать клуб",
            "ИЛИ получить клуб от прошлого президента",
            "Управлять клубом 1+ год",
            "Быть примером для всех"
        ],
        reward: "Корона 👑 + полные права"
    }
];

/* ==================== МОЙ ПРОФИЛЬ (КЕФУКА) ==================== */
const MY_PROFILE = {
    nick: "КЕФУКА",
    tgNick: "Гудвин",
    currentRank: "elite", // КЕФУКА — элита (в чате) + ветеран
    trophies: 76553,
    progressToNext: 65 // 65% до Пане президента (условно)
};

/* ==================== ЛЕСТНИЦА ЗВАНИЙ ==================== */
function renderLadder() {
    const el = document.getElementById('ranks-ladder');
    if (!el) return;

    el.innerHTML = RANKS.map(r => {
        const count = countPlayersInRank(r.id);
        return `
            <div class="rank-step rank-${r.id}" data-level="${r.level}" data-rank-id="${r.id}">
                <div class="rank-step-inner">
                    <span class="rank-step-emoji">${r.emoji}</span>
                    <div class="rank-step-name">${r.name}</div>
                    <div class="rank-step-count">${count} чел.</div>
                </div>
                <div class="rank-step-tooltip">
                    <div class="rank-tooltip-title">${r.emoji} ${r.name}</div>
                    <ul class="rank-tooltip-list">
                        ${r.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
}

/* ==================== ПОДСЧЁТ ИГРОКОВ ==================== */
function countPlayersInRank(rankId) {
    if (typeof players === 'undefined') return 0;

    return players.filter(p => {
        if (rankId === 'president') return p.role === 'Президент';
        if (rankId === 'vice') return p.role === 'Пане президент';
        if (rankId === 'elite') return p.inChat && p.role !== 'Пане президент' && p.role !== 'Президент';
        if (rankId === 'veteran') return p.isVeteran && !p.inChat && p.role !== 'Президент' && p.role !== 'Пане президент';
        if (rankId === 'member') return !p.isVeteran && !p.inChat;
        return false;
    }).length;
}

/* ==================== МОЁ ЗВАНИЕ ==================== */
function renderMyRank() {
    const el = document.getElementById('my-rank-panel');
    if (!el) return;

    const currentRank = RANKS.find(r => r.id === MY_PROFILE.currentRank);
    const nextRank = RANKS.find(r => r.level === currentRank.level + 1);

    el.innerHTML = `
        <div class="my-rank-header">
            <div class="my-rank-avatar">${MY_PROFILE.nick[0]}</div>
            <div class="my-rank-info">
                <div class="my-rank-nick">${MY_PROFILE.nick}</div>
                <div class="my-rank-tg">Telegram: ${MY_PROFILE.tgNick}</div>
            </div>
        </div>

        <div class="my-rank-current">
            <span class="my-rank-emoji">${currentRank.emoji}</span>
            <div class="my-rank-label">Текущее звание</div>
            <div class="my-rank-name">${currentRank.name}</div>
        </div>

        ${nextRank ? `
            <div class="my-rank-progress">
                <div class="my-rank-progress-label">
                    <span>До звания <strong>${nextRank.name}</strong></span>
                    <span><strong>${MY_PROFILE.progressToNext}%</strong></span>
                </div>
                <div class="my-rank-progress-track">
                    <div class="my-rank-progress-fill" id="my-rank-fill"></div>
                </div>
                <div class="my-rank-next">
                    Осталось: <strong>35%</strong> прогресса
                </div>
            </div>
        ` : `
            <div class="my-rank-next" style="margin-top:20px;">
                🎉 <strong>Максимальное звание достигнуто!</strong>
            </div>
        `}
    `;

    // Анимация заполнения
    setTimeout(() => {
        const fill = document.getElementById('my-rank-fill');
        if (fill) fill.style.width = MY_PROFILE.progressToNext + '%';
    }, 300);
}

/* ==================== ПОДРОБНО О ЗВАНИЯХ ==================== */
function renderDetailed() {
    const el = document.getElementById('ranks-detailed');
    if (!el) return;

    el.innerHTML = RANKS.slice().reverse().map(r => `
        <div class="rank-detail-card rank-${r.id}">
            <div class="rank-detail-header">
                <span class="rank-detail-emoji" style="color: ${r.color};">${r.emoji}</span>
                <div>
                    <div class="rank-detail-name">${r.name}</div>
                </div>
                <span class="rank-detail-rarity rarity-${r.rarity}">${r.rarity.toUpperCase()}</span>
            </div>
            <div class="rank-detail-section">
                <h4>Описание</h4>
                <p>${r.description}</p>
            </div>
            <div class="rank-detail-section">
                <h4>Требования</h4>
                <ul class="rank-detail-req">
                    ${r.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <div class="rank-detail-section">
                <h4>Награда</h4>
                <p>🎁 ${r.reward}</p>
            </div>
        </div>
    `).join('');
}

/* ==================== УЧАСТНИКИ ПО ЗВАНИЯМ ==================== */
function renderMembersByRank() {
    const el = document.getElementById('ranks-members');
    if (!el || typeof players === 'undefined') return;

    const groups = RANKS.slice().reverse().map(r => {
        const members = players.filter(p => {
            if (r.id === 'president') return p.role === 'Президент';
            if (r.id === 'vice') return p.role === 'Пане президент';
            if (r.id === 'elite') return p.inChat && p.role !== 'Пане президент' && p.role !== 'Президент';
            if (r.id === 'veteran') return p.isVeteran && !p.inChat && p.role !== 'Президент' && p.role !== 'Пане президент';
            if (r.id === 'member') return !p.isVeteran && !p.inChat;
            return false;
        }).sort((a, b) => b.trophies - a.trophies);

        return { rank: r, members };
    });

    el.innerHTML = groups.map(g => `
        <div class="rank-members-group">
            <h3>
                <span style="font-size:1.5rem;">${g.rank.emoji}</span>
                ${g.rank.name}
                <span style="margin-left:auto; color:var(--text-dim); font-size:0.8rem;">${g.members.length}</span>
            </h3>
            <div class="rank-members-list">
                ${g.members.length ? g.members.map(m => `
                    <div class="rank-member-item">
                        <div class="rank-member-item-avatar">${m.nick[0].toUpperCase()}</div>
                        <span>${m.nick}</span>
                        <span style="margin-left:auto; color:var(--gold); font-size:0.8rem;">
                            ${m.trophies.toLocaleString('ru-RU')} 🏆
                        </span>
                    </div>
                `).join('') : '<p style="color:var(--text-dim); text-align:center; font-size:0.85rem;">—</p>'}
            </div>
        </div>
    `).join('');
}

/* ==================== АНИМАЦИЯ ПОВЫШЕНИЯ ==================== */
function showRankUp(rankId) {
    const rank = RANKS.find(r => r.id === rankId);
    if (!rank) return;

    const modal = document.getElementById('rankup-modal');
    const iconEl = document.getElementById('rankup-icon');
    const rankEl = document.getElementById('rankup-rank');
    const subtitleEl = document.getElementById('rankup-subtitle');
    const particlesEl = document.getElementById('rankup-particles');

    iconEl.textContent = rank.emoji;
    rankEl.textContent = rank.name;
    subtitleEl.textContent = `Ты получил звание «${rank.name}»`;

    // Создаём частицы
    particlesEl.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'rankup-particle';
        const angle = (Math.PI * 2 * i) / 30;
        const dist = 150 + Math.random() * 150;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        p.style.animationDelay = (0.3 + Math.random() * 0.3) + 's';
        particlesEl.appendChild(p);
    }

    modal.classList.add('active');
}

document.getElementById('rankup-close')?.addEventListener('click', () => {
    document.getElementById('rankup-modal').classList.remove('active');
});
document.getElementById('rankup-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'rankup-modal') e.target.classList.remove('active');
});

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    renderLadder();
    renderMyRank();
    renderDetailed();
    renderMembersByRank();

    // Демо: клик по любой карточке звания → показать анимацию повышения
    // (в реальном приложении вызывается при фактическом повышении)
    setTimeout(() => {
        document.querySelectorAll('.rank-step').forEach(step => {
            step.addEventListener('dblclick', () => {
                showRankUp(step.dataset.rankId);
            });
        });
    }, 500);
});