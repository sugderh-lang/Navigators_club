/* ==================== ХРАНИЛИЩЕ ==================== */
const ROULETTE_KEY = 'club_roulette_data';

function loadRouletteData() {
    try {
        const saved = localStorage.getItem(ROULETTE_KEY);
        return saved ? JSON.parse(saved) : {
            lastSpin: null,
            history: []
        };
    } catch (e) {
        return { lastSpin: null, history: [] };
    }
}

function saveRouletteData(d) {
    try {
        localStorage.setItem(ROULETTE_KEY, JSON.stringify(d));
    } catch (e) {}
}

let rouletteData = loadRouletteData();

/* ==================== КОНТЕНТ РУЛЕТКИ ==================== */
const ROULETTE_CONTENT = [
    // СОВЕТЫ
    { cat: "СОВЕТ", icon: "💡", color: "#f9ca24", text: "Играй по 3-4 персонажа, а не по всем сразу — так быстрее растёшь в кубках." },
    { cat: "СОВЕТ", icon: "💡", color: "#f9ca24", text: "После 3 поражений подряд сделай перерыв на 15 минут. Тильт — главный враг кубков." },
    { cat: "СОВЕТ", icon: "💡", color: "#f9ca24", text: "Всегда играй в команде с сокланами — это +30% к шансу победы." },
    { cat: "СОВЕТ", icon: "💡", color: "#f9ca24", text: "Смотри реплеи своих поражений — 80% уроков именно там." },
    { cat: "СОВЕТ", icon: "💡", color: "#f9ca24", text: "В мерпорте главное — контроль карты. Не гонись за фрагами." },

    // МЕМЫ
    { cat: "МЕМ", icon: "😂", color: "#eb4d4b", text: "Когда не играл мерпорт и боишься открывать Telegram-чат клуба..." },
    { cat: "МЕМ", icon: "😂", color: "#eb4d4b", text: "«Скину 1667» — Илья, клубная классика." },
    { cat: "МЕМ", icon: "😂", color: "#eb4d4b", text: "Когда набрал 5 побед в мегакопилке, а тебе говорят «мало»." },
    { cat: "МЕМ", icon: "😂", color: "#eb4d4b", text: "Спайк на Гем-грабе: «Я контролирую центр», а сам сидит в кустах весь матч." },

    // ЦИТАТЫ
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«Был бы выбор между учёбой и воровством, я бы воровал» — Гудвин (КЕФУКА)." },
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«Excuse me, sir» — Настоящий китаец." },
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«shit_seller» — NeOrum, легендарная фраза клуба." },
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«Одной левой!» — S.T.A.L.K.E.R., президент клуба." },
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«Некогда объяснять!» — АНТОХА, врывается в бой." },
    { cat: "ЦИТАТА", icon: "💬", color: "#229ED9", text: "«Красавчик» — Nemo/щь, самопровозглашённый титул." },

    // ЗАДАНИЯ
    { cat: "ЗАДАНИЕ", icon: "🎯", color: "#6ab04c", text: "Победи в 3 матчах подряд сегодня. Награда: +50 Тиранских очков." },
    { cat: "ЗАДАНИЕ", icon: "🎯", color: "#6ab04c", text: "Сыграй 5 матчей в команде с сокланом. Награда: +70 очков." },
    { cat: "ЗАДАНИЕ", icon: "🎯", color: "#6ab04c", text: "Победи в мерпорте сегодня. Награда: +100 очков." },
    { cat: "ЗАДАНИЕ", icon: "🎯", color: "#6ab04c", text: "Помоги новичку клуба советом. Награда: +40 очков." },

    // ФАКТЫ
    { cat: "ФАКТ", icon: "🏆", color: "#9b59b6", text: "Клуб «нагибаторы3000» существует больше 1000 дней. Через него прошло 400+ игроков." },
    { cat: "ФАКТ", icon: "🏆", color: "#9b59b6", text: "Настоящий китаец (грудь Насти) — топ-1 клуба с 119 571 кубком." },
    { cat: "ФАКТ", icon: "🏆", color: "#9b59b6", text: "«14 билетов на неделе лиги» — это железное правило клуба." },

    // РЕКОРДЫ
    { cat: "РЕКОРД", icon: "🔥", color: "#e67e22", text: "Максимум кубков в клубе: 119 571 (грудь Насти)." },
    { cat: "РЕКОРД", icon: "🔥", color: "#e67e22", text: "5 побед в мегакопилке за неделю: Pipsin, Baiker?, Funtik." },
    { cat: "РЕКОРД", icon: "🔥", color: "#e67e22", text: "Самая длинная серия: 12 побед подряд (КЕФУКА)." }
];

/* ==================== СТАТУС РУЛЕТКИ ==================== */
function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function canSpin() {
    return rouletteData.lastSpin !== getTodayKey();
}

function renderStatus() {
    const el = document.getElementById('roulette-status');
    if (!el) return;

    if (canSpin()) {
        el.className = 'roulette-status available';
        el.innerHTML = `✅ Сегодняшнее вращение доступно!<br>Нажми «Крутить», чтобы узнать свою судьбу.`;
    } else {
        el.className = 'roulette-status used';
        el.innerHTML = `
            ⏳ Ты уже крутил сегодня!<br>
            Возвращайся завтра через:
            <span class="roulette-status-timer" id="roulette-timer">--:--:--</span>
        `;
        startRouletteTimer();
    }
}

function startRouletteTimer() {
    const el = document.getElementById('roulette-timer');
    if (!el) return;
    setInterval(() => {
        const now = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const diff = end - now;
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        el.textContent = `${h}:${m}:${s}`;
    }, 1000);
}

/* ==================== ВРАЩЕНИЕ РУЛЕТКИ ==================== */
function initRoulette() {
    const spinBtn = document.getElementById('roulette-spin-btn');
    const wheel = document.getElementById('roulette-wheel');
    if (!spinBtn || !wheel) return;

    if (!canSpin()) {
        spinBtn.disabled = true;
        spinBtn.textContent = '⏳ Уже крутил сегодня';
        renderTodayResult();
    }

    let rotation = 0;

    spinBtn.addEventListener('click', () => {
        if (!canSpin()) return;

        spinBtn.disabled = true;
        spinBtn.textContent = '🎡 Крутится...';

        // Случайный поворот: 5-10 полных оборотов + случайный угол
        const extra = 1800 + Math.random() * 1800;
        rotation += extra;
        wheel.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            // Выбираем случайный контент
            const content = ROULETTE_CONTENT[Math.floor(Math.random() * ROULETTE_CONTENT.length)];

            // Сохраняем
            rouletteData.lastSpin = getTodayKey();
            rouletteData.history.unshift({
                ...content,
                date: new Date().toLocaleDateString('ru-RU')
            });
            if (rouletteData.history.length > 30) {
                rouletteData.history = rouletteData.history.slice(0, 30);
            }
            saveRouletteData(rouletteData);

            // Показываем модалку
            showRouletteResult(content);

            // Обновляем UI
            renderStatus();
            renderHistory();
            renderTodayResult();
            spinBtn.disabled = true;
            spinBtn.textContent = '⏳ Уже крутил сегодня';
        }, 5200);
    });
}

function showRouletteResult(content) {
    const modal = document.getElementById('roulette-modal');
    const iconEl = document.getElementById('roulette-modal-icon');
    const catEl = document.getElementById('roulette-modal-category');
    const textEl = document.getElementById('roulette-modal-text');
    const particlesEl = document.getElementById('roulette-modal-particles');

    iconEl.textContent = content.icon;
    catEl.textContent = content.cat;
    catEl.style.color = content.color;
    textEl.textContent = content.text;

    // Цветные частицы
    particlesEl.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'roulette-modal-particle';
        const angle = (Math.PI * 2 * i) / 40;
        const dist = 150 + Math.random() * 200;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        p.style.background = content.color;
        p.style.boxShadow = `0 0 15px ${content.color}`;
        p.style.animationDelay = (0.3 + Math.random() * 0.4) + 's';
        particlesEl.appendChild(p);
    }

    modal.classList.add('active');
}

document.getElementById('roulette-modal-close')?.addEventListener('click', () => {
    document.getElementById('roulette-modal').classList.remove('active');
});
document.getElementById('roulette-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'roulette-modal') e.target.classList.remove('active');
});

/* ==================== РЕЗУЛЬТАТ СЕГОДНЯ ==================== */
function renderTodayResult() {
    if (canSpin()) return;
    if (!rouletteData.history.length) return;

    const today = rouletteData.history[0];
    const resultEl = document.getElementById('roulette-result');
    if (!resultEl) return;

    resultEl.style.display = 'block';
    document.getElementById('roulette-result-icon').textContent = today.icon;
    document.getElementById('roulette-result-category').textContent = today.cat;
    document.getElementById('roulette-result-category').style.color = today.color;
    document.getElementById('roulette-result-text').textContent = today.text;
}

/* ==================== ИСТОРИЯ ==================== */
function renderHistory() {
    const el = document.getElementById('roulette-history');
    if (!el) return;

    if (!rouletteData.history.length) {
        el.innerHTML = `<p style="text-align:center; color:var(--text-dim);">История пока пуста. Крути рулетку!</p>`;
        return;
    }

    el.innerHTML = rouletteData.history.map(h => `
        <div class="roulette-history-item">
            <span class="roulette-history-icon">${h.icon}</span>
            <div class="roulette-history-info">
                <div class="roulette-history-cat" style="color:${h.color};">${h.cat}</div>
                <div class="roulette-history-text">${h.text}</div>
            </div>
            <div class="roulette-history-date">${h.date}</div>
        </div>
    `).join('');
}

/* ==================== ВКЛАДКИ ==================== */
function initTabs() {
    document.querySelectorAll('.tab-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${tab}`).classList.add('active');
        });
    });
}

/* ==================== РАНДОМАЙЗЕР ПАР ==================== */
let randMode = 'megapig';
let randTeams = [];

const MODE_NAMES = {
    megapig: "Мегакопилки",
    merport: "Мерпорта",
    clubwars: "Клубных войн",
    custom: "Своего режима"
};

function initRandomizer() {
    // Выбор режима
    document.querySelectorAll('.rand-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.rand-mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            randMode = btn.dataset.mode;
        });
    });

    // Генерация
    document.getElementById('rand-generate-btn')?.addEventListener('click', generateTeams);

    // Перемешать
    document.getElementById('rand-reroll-btn')?.addEventListener('click', generateTeams);

    // Скопировать
    document.getElementById('rand-copy-btn')?.addEventListener('click', copyTeams);

    // Поделиться
    document.getElementById('rand-share-btn')?.addEventListener('click', shareTeams);
}

function generateTeams() {
    if (typeof players === 'undefined') return;

    const count = parseInt(document.getElementById('rand-count').value);
    const teamSize = parseInt(document.getElementById('rand-team-size').value);
    const onlyElite = document.getElementById('rand-only-elite').checked;
    const onlyVeteran = document.getElementById('rand-only-veteran').checked;

    // Фильтр
    let pool = players.slice();
    if (onlyElite) pool = pool.filter(p => p.inChat);
    if (onlyVeteran) pool = pool.filter(p => p.isVeteran);

    // Если меньше игроков — берём всех
    if (pool.length < count) {
        pool = players.slice();
    }

    // Перемешиваем (Fisher-Yates)
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    // Разбиваем на команды
    randTeams = [];
    for (let i = 0; i < selected.length; i += teamSize) {
        randTeams.push(selected.slice(i, i + teamSize));
    }

    renderTeams();
}

function renderTeams() {
    const resultEl = document.getElementById('rand-result');
    const teamsEl = document.getElementById('rand-teams');
    if (!resultEl || !teamsEl) return;

    document.getElementById('rand-result-mode').textContent = MODE_NAMES[randMode] || 'режима';

    const teamNames = ["🔥 Красные", "💙 Синие", "💚 Зелёные", "💜 Фиолетовые", "💛 Жёлтые", "🧡 Оранжевые"];

    teamsEl.innerHTML = randTeams.map((team, i) => `
        <div class="rand-team">
            <div class="rand-team-header">
                <span class="rand-team-number">${i + 1}</span>
                <span class="rand-team-title">${teamNames[i % teamNames.length]}</span>
            </div>
            <div class="rand-team-members">
                ${team.map(p => `
                    <div class="rand-member">
                        <span class="rand-member-avatar">${p.nick[0].toUpperCase()}</span>
                        <span class="rand-member-nick">${p.nick}</span>
                        <span class="rand-member-trophies">${p.trophies.toLocaleString('ru-RU')}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    resultEl.style.display = 'block';
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ==================== СКОПИРОВАТЬ / ПОДЕЛИТЬСЯ ==================== */
function buildTeamsText() {
    const mode = MODE_NAMES[randMode] || 'режима';
    let text = `🎲 Команды для ${mode} — клуб «нагибаторы3000»\n\n`;
    randTeams.forEach((team, i) => {
        text += `🎯 Команда ${i + 1}:\n`;
        team.forEach(p => {
            text += `  • ${p.nick} (${p.trophies.toLocaleString('ru-RU')} 🏆)\n`;
        });
        text += '\n';
    });
    return text;
}

function copyTeams() {
    const text = buildTeamsText();
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('rand-copy-btn');
        const original = btn.textContent;
        btn.textContent = '✅ Скопировано!';
        setTimeout(() => btn.textContent = original, 2000);
    }).catch(() => {
        alert('Не удалось скопировать. Текст:\n\n' + text);
    });
}

function shareTeams() {
    const text = encodeURIComponent(buildTeamsText());
    window.open(`https://t.me/share/url?url=&text=${text}`, '_blank');
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    renderStatus();
    initRoulette();
    renderHistory();
    initTabs();
    initRandomizer();
});