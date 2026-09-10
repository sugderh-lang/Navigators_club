// ==================== ДАННЫЕ УЧАСТНИКОВ ====================
// Аватары: парни boy-01..boy-10, девушки girl-01..girl-10
// Остальные — DiceBear автоматически

const players = [
    { nick: "грудь Насти", tgNick: "настоящий китаец", role: "Ветеран", trophies: 119571, mk: 4, inChat: false, isVeteran: true, bestBrawler: "Байрон", tag: "#8QCVQPYY9", description: "Топ-1 по кубкам. Сенсация клуба.", avatar: "images/avatars/boy-01.jpg" },
    { nick: "Batya", role: "Участник", trophies: 103039, mk: 0, inChat: false, isVeteran: false, avatar: "images/avatars/boy-02.jpg" },
    { nick: "Ақымақ ешкі", role: "Ветеран", trophies: 90935, mk: 4, inChat: false, isVeteran: true, bestBrawler: "Поко", avatar: "images/avatars/boy-03.jpg" },
    { nick: "ляшки насти", role: "Участник", trophies: 90832, mk: 0, inChat: false, isVeteran: false, avatar: "images/avatars/boy-04.jpg" },
    { nick: "КЕФУКА", tgNick: "Гудвин", role: "Ветеран · Лидер чата", trophies: 76553, mk: 4, inChat: true, isVeteran: true, description: "«Был бы выбор между учёбой и воровством...»", avatar: "images/avatars/boy-05.jpg" },
    { nick: "SexySwag", role: "Ветеран", trophies: 74932, mk: 4, inChat: false, isVeteran: true, bestBrawler: "Спайк", avatar: "images/avatars/boy-06.jpg" },
    { nick: "Funtik", role: "Ветеран", trophies: 71815, mk: 5, inChat: false, isVeteran: true, avatar: "images/avatars/boy-07.jpg" },
    { nick: "с гордостью", role: "Участник", trophies: 71264, mk: 0, inChat: false, isVeteran: false, avatar: "images/avatars/boy-08.jpg" },
    { nick: "Bonjour", role: "Участник", trophies: 68778, mk: 3, inChat: false, isVeteran: false, avatar: "images/avatars/boy-09.jpg" },
    { nick: "Baiker?", tgNick: "Flins", role: "Ветеран", trophies: 64871, mk: 5, inChat: true, isVeteran: true, bestBrawler: "Леон", avatar: "images/avatars/boy-10.jpg" },
    { nick: "АНТОХА", role: "Ветеран", trophies: 62267, mk: 2, inChat: false, isVeteran: true, description: "«Некогда объяснять!»" },
    { nick: "zero", tgNick: "Илья", role: "Пане президент", trophies: 60992, mk: 4, inChat: true, isVeteran: true, description: "«1667»" },
    { nick: "Kabachok", role: "Участник", trophies: 56408, mk: 3, inChat: false, isVeteran: false },
    { nick: "Swin", role: "Участник", trophies: 53157, mk: 0, inChat: false, isVeteran: false },
    { nick: "gandOn", role: "Участник", trophies: 51470, mk: 0, inChat: false, isVeteran: false },
    { nick: "Nemo/щь", role: "Ветеран", trophies: 50664, mk: 4, inChat: false, isVeteran: true, description: "«Красавчик»" },
    { nick: "Pipsin", role: "Ветеран", trophies: 49807, mk: 5, inChat: false, isVeteran: true, description: "«Жадина»" },
    { nick: "Александр", role: "Участник", trophies: 48268, mk: 1, inChat: false, isVeteran: false },
    { nick: "Revo", role: "Участник", trophies: 47262, mk: 0, inChat: false, isVeteran: false },
    { nick: "NeOrum", tgNick: "@Tv_seller", role: "Участник", trophies: 42713, mk: 3, inChat: true, isVeteran: false, description: "«Очень жаль, Если передумаете по цене — пишите»" },
    { nick: "jumber", role: "Участник", trophies: 40539, mk: 0, inChat: false, isVeteran: false },
    { nick: "Kerzi's | Veyro", role: "Участник", trophies: 39220, mk: 0, inChat: false, isVeteran: false },
    { nick: "Simoha", role: "Участник", trophies: 38951, mk: 0, inChat: false, isVeteran: false },
    { nick: "S.T.A.L.K.E.R.", tgNick: "мариша", role: "Президент", trophies: 37479, mk: 3, inChat: false, isVeteran: true, description: "«Одной левой!»", avatar: "images/avatars/girl-05.jpg" },
    { nick: "OG tosos", role: "Участник", trophies: 37090, mk: 2, inChat: false, isVeteran: false },
    { nick: "@MONSTER", role: "Участник", trophies: 36470, mk: 0, inChat: false, isVeteran: false },
    { nick: "andruha", role: "Участник", trophies: 35190, mk: 0, inChat: false, isVeteran: false },
    { nick: "рёккі", role: "Участник", trophies: 32642, mk: 0, inChat: false, isVeteran: false },
    { nick: "rensai", role: "Участник", trophies: 31443, mk: 0, inChat: false, isVeteran: false },
    { nick: "чемодан", role: "Участник", trophies: 29954, mk: 0, inChat: false, isVeteran: false },
];

// ==================== ЭЛИТА ====================
const eliteMembers = [
    { nick: "Гудвин", roleIcon: "👑", role: "Основатель · Философ", quote: "«Был бы выбор между учёбой и воровством...»", avatar: "images/avatars/boy-05.jpg" },
    { nick: "Илья (zero)", roleIcon: "🎩", role: "Пане президент", quote: "«1667»", avatar: "images/avatars/boy-06.jpg" },
    { nick: "Flins (Baiker?)", roleIcon: "🎯", role: "Снайпер", quote: "«Время на ветер»", avatar: "images/avatars/boy-10.jpg" },
    { nick: "NeOrum", roleIcon: "💰", role: "Барыга", quote: "«Очень жаль, Если передумаете по цене — пишите»", avatar: "images/avatars/boy-09.jpg" },
    { nick: "Iris", roleIcon: "💬", role: "Хранитель порядка", quote: "Чат-менеджер", avatar: "images/avatars/girl-03.jpg" },
    { nick: "True Mafia", roleIcon: "🕶️", role: "Тень", quote: "Молчит, но следит", avatar: "images/avatars/boy-08.jpg" },
    { nick: "Assiverb", roleIcon: "😂", role: "Мемный генерал", quote: "Флуд клуба", avatar: "images/avatars/boy-07.jpg" },
    { nick: "Кирилл", roleIcon: "🎸", role: "Меломан", quote: "The Raven", avatar: "images/avatars/boy-04.jpg" },
    { nick: "Nastoyashly_kitaec", roleIcon: "🧐", role: "Интеллигент", quote: "«Excuse me, sir»", avatar: "images/avatars/boy-03.jpg" },
    { nick: "Vivian", roleIcon: "🌸", role: "Душа компании", quote: "«(๑>ᴗ<๑)»", avatar: "images/avatars/girl-01.jpg" },
];

// ==================== МЕГАКОПИЛКА ====================
const megapigData = [
    { nick: "Pipsin", wins: 5 }, { nick: "Baiker?", wins: 5 }, { nick: "Funtik", wins: 5 },
    { nick: "Nemo/щь", wins: 4 }, { nick: "SexySwag", wins: 4 }, { nick: "КЕФУКА", wins: 4 },
    { nick: "грудь Насти", wins: 4 }, { nick: "Ақымақ ешкі", wins: 4 }, { nick: "zero", wins: 4 },
    { nick: "S.T.A.L.K.E.R.", wins: 3 }, { nick: "Kabachok", wins: 3 }, { nick: "Bonjour", wins: 3 },
    { nick: "NeOrum", wins: 3 }, { nick: "АНТОХА", wins: 2 }, { nick: "OG tosos", wins: 2 },
    { nick: "Александр", wins: 1 },
];

// ==================== ЗАЛ СЛАВЫ ====================
const hallOfFame = [
    { icon: "🏆", title: "Максимум кубков", nick: "грудь Насти", value: "119 571" },
    { icon: "🎯", title: "Больше всех в МК", nick: "Pipsin / Baiker? / Funtik", value: "5 побед" },
    { icon: "🥷", title: "Президент", nick: "мариша (Stalker)", value: "37 479 кубков" },
    { icon: "🎩", title: "Пане президент", nick: "Илья (zero)", value: "60 992 кубка" },
    { icon: "🔥", title: "Самый активный", nick: "КЕФУКА", value: "4 победы в МК" },
];

// ==================== КАЛЕНДАРЬ ====================
const calendarEvents = [
    { day: "Понедельник", event: "Клубный день", time: "18:00 – 21:00", badge: "important" },
    { day: "Вторник", event: "Мегапорт", time: "19:00 – 22:00", badge: "normal" },
    { day: "Среда", event: "Свободная игра", time: "весь день", badge: "optional" },
    { day: "Четверг", event: "Клубные войны", time: "20:00 – 22:00", badge: "important" },
    { day: "Пятница", event: "Мини-игры", time: "20:00", badge: "normal" },
    { day: "Суббота", event: "Турнир внутри клуба", time: "18:00", badge: "important" },
    { day: "Воскресенье", event: "Шахматный вечер", time: "19:00", badge: "optional" },
];

// ==================== ГАЙДЫ ====================
const guides = [
    { icon: "🐷", title: "Гайд по мегакопилке", desc: "Как быстро набивать победы.", points: ["Играй в команде", "Используй Спайка или Леона", "Дождись клубного дня"] },
    { icon: "🏆", title: "Как поднять кубки", desc: "Пошаговая стратегия.", points: ["Играй по 3-4 персонажа", "Избегай тильта", "Смотри реплеи"] },
    { icon: "🗺️", title: "Разбор карт", desc: "Какие карты лучше.", points: ["Гем-граб: Спайк, Леон", "Захват: Поко, Байрон", "Поимка: Кенджи, Мег"] },
    { icon: "⚔️", title: "Стратегия на войны", desc: "Как играть в команде.", points: ["Роли: танк, дамагер, саппорт", "Голосовой чат", "Разминка перед игрой"] },
    { icon: "🧠", title: "Психология игры", desc: "Как не тильтовать.", points: ["Не играй уставшим", "Перерывы каждые 30 мин", "Фокус на процессе"] },
    { icon: "♟️", title: "Шахматы и BS", desc: "Как шахматы помогают.", points: ["Читай на 2-3 хода", "Думай о позиции", "Учись на ошибках"] },
];

// ==================== СОВЕТЫ ====================
const tips = [
    "Играй <strong>по 3-4 персонажа</strong> — так быстрее растёшь.",
    "Всегда играй <strong>в команде с соклановцами</strong>.",
    "<strong>Не тильтуй</strong> — после 3 поражений перерыв.",
    "<strong>Смотри реплеи</strong> поражений — там 80% уроков.",
    "Используй <strong>голосовой чат</strong> в Telegram.",
    "<strong>Не играй на слабом интернете</strong>.",
    "Изучай <strong>карты</strong> — где укрытия, где точки.",
    "<strong>Не гонись за убийствами</strong> — цель в очках.",
    "<strong>Учись у сильных</strong> — смотри стримы.",
    "<strong>Отдыхай</strong> — мозг работает лучше после паузы.",
];

// ==================== FAQ ====================
const faq = [
    { q: "Как вступить в клуб?", a: "Нажми кнопку «Вступить» на главной. Нужно 25 000+ кубков." },
    { q: "Как попасть в Telegram-чат?", a: "Ссылка в подвале сайта. После вступления напиши свой ник." },
    { q: "Как стать ветераном?", a: "14 билетов за неделю, все квесты, активность." },
    { q: "Что такое мегакопилка?", a: "Клубное событие, где все собирают победы." },
    { q: "Что будет за нарушение?", a: "Понижение до участника или исключение." },
    { q: "Как часто турниры?", a: "Раз в месяц по субботам." },
    { q: "Можно играть с соклановцами?", a: "Да, приветствуется!" },
];

// ==================== СОСТАВ КОМАНДЫ ====================
const roster = [
    { icon: "👑", nick: "Гудвин", role: "Лидер", info: "76 553 кубка" },
    { icon: "🎩", nick: "Илья (zero)", role: "Страйкер", info: "60 992 кубка" },
    { icon: "🎯", nick: "Flins (Baiker?)", role: "Снайпер", info: "64 871 кубок" },
    { icon: "💰", nick: "NeOrum", role: "Саппорт", info: "42 713 кубков" },
    { icon: "🥷", nick: "мариша (Stalker)", role: "Капитан", info: "37 479 кубков" },
    { icon: "🏆", nick: "грудь Насти", role: "Резерв", info: "119 571 кубок" },
];

// ==================== ТУРНИРНАЯ ТАБЛИЦА ====================
const tournament = [
    { team: "нагибаторы3000", played: 16, wins: 12, losses: 4, points: 36 },
    { team: "Tigers BS", played: 16, wins: 11, losses: 5, points: 33 },
    { team: "Cyber Wolves", played: 16, wins: 10, losses: 6, points: 30 },
    { team: "Shadow Squad", played: 16, wins: 8, losses: 8, points: 24 },
    { team: "Rising Stars", played: 16, wins: 5, losses: 11, points: 15 },
    { team: "Newbie Team", played: 16, wins: 2, losses: 14, points: 6 },
];

// ==================== ДОСТИЖЕНИЯ ====================
const achievements = [
    { icon: "🥇", title: "1-е место", desc: "Клубная лига, 2026" },
    { icon: "🏆", title: "1 700 000+", desc: "Общие кубки клуба" },
    { icon: "🔥", title: "10 побед подряд", desc: "Клубные войны" },
    { icon: "💎", title: "100% мегакопилка", desc: "Закрыли 3 раза" },
    { icon: "⭐", title: "Quality 69/100", desc: "Рейтинг клуба" },
    { icon: "🎯", title: "30/30 состав", desc: "Полный клуб" },
];

// ==================== РАСПИСАНИЕ ====================
const schedule = [
    { date: "12.09 · 20:00", match: "нагибаторы3000 vs Tigers BS", status: "soon", statusText: "Скоро" },
    { date: "08.09 · 20:00", match: "нагибаторы3000 vs Shadow Squad", status: "win", statusText: "Победа 3:1" },
    { date: "05.09 · 19:00", match: "нагибаторы3000 vs Cyber Wolves", status: "win", statusText: "Победа 3:0" },
    { date: "01.09 · 21:00", match: "нагибаторы3000 vs Rising Stars", status: "loss", statusText: "Поражение 2:3" },
    { date: "28.08 · 20:00", match: "нагибаторы3000 vs Newbie Team", status: "win", statusText: "Победа 3:0" },
];

// ==================== УНИВЕРСАЛЬНЫЙ АВАТАР ====================
function getAvatar(player) {
    if (player.avatar) return player.avatar;
    const colors = 'f9ca24,eb4d4b,6ab04c,3498db,9b59b6';
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(player.nick)}&backgroundColor=${colors}`;
}

// ==================== АНИМИРОВАННЫЕ СЧЁТЧИКИ ====================
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count;
        const duration = 1800;
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased).toLocaleString('ru-RU');
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    });
}

// ==================== РЕНДЕР ЭЛИТЫ ====================
function renderElite() {
    const grid = document.getElementById('elite-grid');
    if (!grid) return;
    grid.innerHTML = eliteMembers.map(m => {
        const avatarUrl = m.avatar || getAvatar(m);
        return `
            <div class="elite-card">
                <div class="elite-card-avatar">
                    <img src="${avatarUrl}" alt="${m.nick}" class="elite-avatar-img">
                </div>
                <div class="elite-nick">${m.nick}</div>
                <div class="elite-role">${m.role}</div>
                <div class="elite-quote">${m.quote || ''}</div>
            </div>
        `;
    }).join('');
}

// ==================== ПРОФИЛЬ ИГРОКА ====================
function openProfile(nick) {
    const p = players.find(x => x.nick === nick);
    if (!p) return;
    const modal = document.getElementById('profile-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    let badge = '';
    if (p.inChat) badge = '<span class="badge badge-elite">💬 Элита</span>';
    else if (p.isVeteran) badge = '<span class="badge badge-veteran">🛡️ Ветеран</span>';
    else badge = '<span class="badge badge-member">⚔️ Участник</span>';

    body.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="${getAvatar(p)}" alt="${p.nick}" class="profile-avatar-img">
            </div>
            <div class="profile-nick">${p.nick}</div>
            <div class="profile-role">${p.role}</div>
            ${badge}
        </div>
        <div class="profile-stats">
            <div class="profile-stat">
                <span class="profile-stat-value">${p.trophies.toLocaleString('ru-RU')}</span>
                <span class="profile-stat-label">Кубки</span>
            </div>
            <div class="profile-stat">
                <span class="profile-stat-value">${p.mk}</span>
                <span class="profile-stat-label">Мегакопилка</span>
            </div>
        </div>
        ${p.tgNick ? `<div class="profile-section"><h4>Telegram</h4><p>${p.tgNick}</p></div>` : ''}
        ${p.bestBrawler ? `<div class="profile-section"><h4>Лучший боец</h4><p>${p.bestBrawler}</p></div>` : ''}
        ${p.tag ? `<div class="profile-section"><h4>Тег в игре</h4><p>${p.tag}</p></div>` : ''}
        ${p.description ? `<div class="profile-section"><h4>О игроке</h4><p>${p.description}</p></div>` : ''}
    `;
    modal.classList.add('active');
}

// Закрытие модалки
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modal-close');
    const modal = document.getElementById('profile-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target.id === 'profile-modal') modal.classList.remove('active');
    });
});

// ==================== ТОП-3 ====================
function renderTops() {
    const tTrophies = document.getElementById('top-trophies');
    const tMerport = document.getElementById('top-merport');
    if (!tTrophies || !tMerport) return;
    const byTrophies = [...players].sort((a, b) => b.trophies - a.trophies).slice(0, 3);
    const byMk = [...megapigData].sort((a, b) => b.wins - a.wins).slice(0, 3);
    tTrophies.innerHTML = byTrophies.map((p, i) => `
        <li><span><span class="rank">${i + 1}.</span>${p.nick}</span><span>${p.trophies.toLocaleString('ru-RU')} 🏆</span></li>
    `).join('');
    tMerport.innerHTML = byMk.map((p, i) => `
        <li><span><span class="rank">${i + 1}.</span>${p.nick}</span><span>${p.wins} 🎯</span></li>
    `).join('');
}

// ==================== ТАБЛИЦА МЕГАКОПИЛКИ ====================
function renderMegapig() {
    const tbody = document.getElementById('megapig-tbody');
    if (!tbody) return;
    const sorted = [...megapigData].sort((a, b) => b.wins - a.wins);
    tbody.innerHTML = sorted.map((p, i) => `
        <tr><td>${i + 1}</td><td>${p.nick}</td><td>${p.wins} ${'⭐'.repeat(p.wins)}</td></tr>
    `).join('');
}

// ==================== ЗАЛ СЛАВЫ ====================
function renderHall() {
    const grid = document.getElementById('hall-grid');
    if (!grid) return;
    grid.innerHTML = hallOfFame.map(h => `
        <div class="hall-card">
            <span class="hall-icon">${h.icon}</span>
            <div class="hall-title">${h.title}</div>
            <div class="hall-nick">${h.nick}</div>
            <div class="hall-value">${h.value}</div>
        </div>
    `).join('');
}

// ==================== КАЛЕНДАРЬ ====================
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = calendarEvents.map(e => `
        <div class="cal-card">
            <div class="cal-day">${e.day}</div>
            <div class="cal-event">${e.event}</div>
            <div class="cal-time">${e.time}</div>
            <span class="cal-badge ${e.badge}">${e.badge === 'important' ? 'Обязательно' : e.badge === 'normal' ? 'Желательно' : 'По желанию'}</span>
        </div>
    `).join('');
}

// ==================== ТАЙМЕР ====================
function startTimer() {
    const el = document.getElementById('megapig-timer');
    if (!el) return;
    let sec = 17 * 3600 + 46 * 60;
    setInterval(() => {
        if (sec <= 0) return;
        sec--;
        const h = String(Math.floor(sec / 3600)).padStart(2, '0');
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        el.textContent = `${h}:${m}:${s}`;
    }, 1000);
}

// ==================== ТЕМА ====================
function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
}

// ==================== БУРГЕР ====================
function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// ==================== ГАЙДЫ ====================
function renderGuides() {
    const el = document.getElementById('guides-grid');
    if (!el) return;
    el.innerHTML = guides.map(g => `
        <div class="guide-card">
            <span class="guide-icon">${g.icon}</span>
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
            <ul>${g.points.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
    `).join('');
}

// ==================== СОВЕТЫ ====================
function renderTips() {
    const el = document.getElementById('tips-list');
    if (!el) return;
    el.innerHTML = tips.map((t, i) => `
        <div class="tip-item">
            <span class="tip-num">${i + 1}</span>
            <span class="tip-text">${t}</span>
        </div>
    `).join('');
}

// ==================== FAQ ====================
function renderFaq() {
    const el = document.getElementById('faq-list');
    if (!el) return;
    el.innerHTML = faq.map((f, i) => `
        <div class="faq-item" data-faq="${i}">
            <div class="faq-q">${f.q}</div>
            <div class="faq-a">${f.a}</div>
        </div>
    `).join('');
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
    });
}

// ==================== СОСТАВ ====================
function renderRoster() {
    const el = document.getElementById('roster-grid');
    if (!el) return;
    el.innerHTML = roster.map(r => `
        <div class="roster-card">
            <span class="roster-role-icon">${r.icon}</span>
            <div class="roster-nick">${r.nick}</div>
            <div class="roster-role">${r.role}</div>
            <div class="roster-info">${r.info}</div>
        </div>
    `).join('');
}

// ==================== ТУРНИР ====================
function renderTournament() {
    const tbody = document.getElementById('tournament-tbody');
    if (!tbody) return;
    tbody.innerHTML = tournament.map((t, i) => `
        <tr class="${i === 0 ? 'top-1' : ''}">
            <td>${i + 1}</td><td>${t.team}</td><td>${t.played}</td>
            <td>${t.wins}</td><td>${t.losses}</td><td><strong>${t.points}</strong></td>
        </tr>
    `).join('');
}

// ==================== ДОСТИЖЕНИЯ ====================
function renderAchievements() {
    const el = document.getElementById('achievements-grid');
    if (!el) return;
    el.innerHTML = achievements.map(a => `
        <div class="achievement-card">
            <span class="achievement-icon">${a.icon}</span>
            <div class="achievement-title">${a.title}</div>
            <div class="achievement-desc">${a.desc}</div>
        </div>
    `).join('');
}

// ==================== РАСПИСАНИЕ ====================
function renderSchedule() {
    const el = document.getElementById('schedule-list');
    if (!el) return;
    el.innerHTML = schedule.map(s => `
        <div class="schedule-item">
            <div class="schedule-date">${s.date}</div>
            <div class="schedule-match">${s.match}</div>
            <span class="schedule-status ${s.status}">${s.statusText}</span>
        </div>
    `).join('');
}

// ==================== PARTICLES ====================
function initParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 4 || window.innerWidth < 600) return;
    const count = window.innerWidth < 1000 ? 15 : 28;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (15 + Math.random() * 20) + 's';
        p.style.animationDelay = (-Math.random() * 30) + 's';
        p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
        frag.appendChild(p);
    }
    container.appendChild(frag);
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    document.querySelectorAll('.stagger').forEach(el => observer.observe(el));
    document.querySelectorAll('.progress').forEach(el => observer.observe(el));
}

// ==================== STAGGER ====================
function applyStagger() {
    document.querySelectorAll('.stagger').forEach(parent => {
        [...parent.children].forEach((child, i) => {
            child.style.transitionDelay = (i * 70) + 'ms';
        });
    });
}

// ==================== TILT ====================
function initTilt() {
    if (window.innerWidth < 1000) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            requestAnimationFrame(() => {
                card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.02)`;
            });
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ==================== PARALLAX ====================
function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1000) return;
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    let raf = null;
    window.addEventListener('scroll', () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            els.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.1;
                el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            });
            raf = null;
        });
    }, { passive: true });
}

// ==================== HEADER SCROLL ====================
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 30);
    }, { passive: true });
}

// ==================== PODIUM ====================
function renderPodium() {
    const el = document.getElementById('podium');
    if (!el) return;
    const top3 = [...players].sort((a, b) => b.trophies - a.trophies).slice(0, 3);
    const crowns = ['👑', '🥈', '🥉'];
    el.innerHTML = top3.map((p, i) => `
        <div class="podium-card podium-${i + 1}">
            <span class="podium-crown">${crowns[i]}</span>
            <div class="podium-rank">#${i + 1}</div>
            <div class="podium-nick">${p.nick}</div>
            <div class="podium-trophies">🏆 ${p.trophies.toLocaleString('ru-RU')}</div>
        </div>
    `).join('');
}

// ==================== КАРТОЧКИ ИГРОКОВ ====================
function renderPlayerCards(filter = 'all') {
    const container = document.getElementById('player-cards');
    if (!container) return;
    let list = [...players];
    if (filter === 'elite') list = list.filter(p => p.inChat);
    if (filter === 'veteran') list = list.filter(p => p.isVeteran);
    list.sort((a, b) => b.trophies - a.trophies);
    const maxTrophies = list[0]?.trophies || 1;

    container.innerHTML = list.map((p, i) => {
        const rank = i + 1;
        const progress = Math.round((p.trophies / maxTrophies) * 100);
        const isTop = rank <= 3;
        const goldClass = p.inChat ? 'elite-card-gold' : '';
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const online = p.inChat || rank <= 5;

        return `
            <div class="player-card ${goldClass}" onclick="openProfile('${p.nick.replace(/'/g, "\\'")}')" style="--progress: ${progress}%">
                <span class="player-rank-badge ${rankClass}">#${rank}</span>
                <div class="player-card-header">
                    <div class="player-avatar">
                        <img src="${getAvatar(p)}" alt="${p.nick}" class="player-avatar-img">
                        ${isTop ? '<div class="player-avatar-ring"></div>' : ''}
                        <span class="player-online ${online ? '' : 'offline'}"></span>
                    </div>
                    <div class="player-info">
                        <div class="player-nick">${p.nick}</div>
                        <div class="player-role">${p.role}</div>
                    </div>
                </div>
                <div class="player-stats">
                    <div class="player-stat">
                        <span class="player-stat-value">${p.trophies.toLocaleString('ru-RU')}</span>
                        <span class="player-stat-label">Кубки</span>
                    </div>
                    <div class="player-stat">
                        <span class="player-stat-value">${p.mk}</span>
                        <span class="player-stat-label">МК</span>
                    </div>
                </div>
                <div class="player-progress">
                    <div class="player-progress-fill"></div>
                </div>
            </div>
        `;
    }).join('');

    setTimeout(() => {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        container.querySelectorAll('.player-card').forEach((c, i) => {
            c.style.transitionDelay = (i * 50) + 'ms';
            c.classList.add('reveal-up');
            io.observe(c);
        });
        initTilt();
    }, 50);
}

// ==================== ФИЛЬТРЫ ====================
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPlayerCards(btn.dataset.filter);
        });
    });
}

// ==================== ЗАПУСК ====================
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    renderElite();
    renderTops();
    renderMegapig();
    renderHall();
    renderCalendar();
    renderPodium();
    renderPlayerCards();
    startTimer();
    initTheme();
    initFilters();
    initBurger();

    initParticles();
    applyStagger();
    initScrollReveal();
    initParallax();
    initHeaderScroll();

    renderGuides();
    renderTips();
    renderFaq();
    renderRoster();
    renderTournament();
    renderAchievements();
    renderSchedule();
});/* ==================== СКРОЛЛ-ПРОГРЕСС ==================== */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #f9ca24, #eb4d4b, #f9ca24);
        z-index: 99999;
        box-shadow: 0 0 15px rgba(249, 202, 36, 0.8);
        pointer-events: none;
        transition: width 0.1s;
    `;
    bar.id = 'scroll-progress-bar';
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = (scrollTop / docHeight) * 100;
        bar.style.width = percent + '%';
    }, { passive: true });
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});