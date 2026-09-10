/* ==================== КОНФИГУРАЦИЯ ==================== */
const CURRENT_PLAYER_NICK = "КЕФУКА";
const STORAGE_KEY = 'minigames_data';

/* ==================== ДАННЫЕ ==================== */
const GAMES = [
    {
        id: "daily",
        icon: "📅",
        title: "Ежедневное испытание",
        desc: "Кликни 20 раз за 10 секунд — заработай очки",
        difficulty: "easy",
        maxPoints: 150
    },
    {
        id: "guess",
        icon: "🎯",
        title: "Угадай бойца",
        desc: "По эмодзи угадай персонажа Brawl Stars",
        difficulty: "medium",
        maxPoints: 200
    },
    {
        id: "reaction",
        icon: "⚡",
        title: "Реакционное испытание",
        desc: "Кликни, как только экран станет зелёным",
        difficulty: "medium",
        maxPoints: 250
    },
    {
        id: "result",
        icon: "🎲",
        title: "Угадай результат",
        desc: "Победит синий или красный? Попробуй угадать",
        difficulty: "easy",
        maxPoints: 100
    },
    {
        id: "wheel",
        icon: "🎡",
        title: "Колесо заданий",
        desc: "Крути колесо — получи случайное задание",
        difficulty: "easy",
        maxPoints: 50
    },
    {
        id: "quiz",
        icon: "🧠",
        title: "Викторина",
        desc: "10 вопросов о Brawl Stars — проверь знания",
        difficulty: "hard",
        maxPoints: 300
    }
];

const BRAWLER_HINTS = [
    { hint: "🌵💚", answer: "Спайк", options: ["Спайк", "Леон", "Кольт", "Поко"] },
    { hint: "👻🗡️", answer: "Леон", options: ["Леон", "Мортис", "Эдгар", "Байрон"] },
    { hint: "🤠🔫", answer: "Кольт", options: ["Кольт", "Шелли", "Рико", "Дэррил"] },
    { hint: "🎸🎵", answer: "Поко", options: ["Поко", "Барли", "Эмз", "Байрон"] },
    { hint: "🐻💪", answer: "Нита", options: ["Нита", "Роза", "Джесси", "Пэм"] },
    { hint: "🦅⚡", answer: "Фэнг", options: ["Фэнг", "Базз", "Кенджи", "Сэнди"] },
    { hint: "🕷️🎭", answer: "Байрон", options: ["Байрон", "Спайк", "Сэнди", "Гейл"] },
    { hint: "🥷🍬", answer: "Кенджи", options: ["Кенджи", "Леон", "Мортис", "Эдгар"] },
    { hint: "🌸💣", answer: "Сью", options: ["Сью", "Джесси", "Пенни", "Белль"] },
    { hint: "👑🔱", answer: "Мег", options: ["Мег", "Байрон", "Спайк", "Кольт"] }
];

const QUIZ_QUESTIONS = [
    { q: "Сколько кубков даёт одна победа в Brawl Stars?", options: ["5-10", "8-12", "10-15", "15-20"], correct: 1 },
    { q: "Какой максимальный ранг в Brawl Stars?", options: ["25", "30", "35", "50"], correct: 2 },
    { q: "Сколько игроков в команде в Гем-грабе?", options: ["2", "3", "4", "5"], correct: 1 },
    { q: "Что такое мегакопилка?", options: ["Валюта", "Клубное событие", "Персонаж", "Карта"], correct: 1 },
    { q: "Какой режим требует собрать 10 гемов?", options: ["Гем-граб", "Броулбол", "Захват кристаллов", "Награда за поимку"], correct: 0 },
    { q: "Сколько билетов дают на неделе лиги?", options: ["10", "14", "20", "24"], correct: 1 },
    { q: "Кто такой Спайк по классу?", options: ["Танк", "Стрелок", "Убийца", "Поддержка"], correct: 1 },
    { q: "Что даёт Супер Поко?", options: ["Лечение", "Урон", "Ускорение", "Щит"], correct: 0 },
    { q: "Максимальное количество кубков за сезон?", options: ["1000", "1500", "2000", "3000"], correct: 2 },
    { q: "Сколько участников максимум в клубе?", options: ["20", "25", "30", "50"], correct: 2 }
];

const WHEEL_TASKS = [
    { icon: "⚔️", task: "Сыграть 5 матчей в клубных войнах", points: 50 },
    { icon: "💬", task: "Написать 3 сообщения в чате клуба", points: 30 },
    { icon: "🎯", task: "Победить в мерпорте", points: 100 },
    { icon: "🏆", task: "Помочь новичку клуба", points: 70 },
    { icon: "🔥", task: "Поднять 50 кубков", points: 40 },
    { icon: "🤝", task: "Сыграть с сокланом", points: 60 }
];

const DAILY_CHALLENGES = [
    { icon: "⚔️", task: "Победи в 3 матчах сегодня", reward: 50, key: "wins" },
    { icon: "🎯", task: "Победи в мерпорте", reward: 100, key: "merport" },
    { icon: "💰", task: "Заработай 200 очков", reward: 30, key: "points" },
    { icon: "🏆", task: "Разблокируй достижение", reward: 70, key: "ach" },
    { icon: "💬", task: "Активность в чате", reward: 40, key: "chat" }
];

/* ==================== СОХРАНЕНИЕ ==================== */
function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            scores: {},
            leaderboard: [],
            totalPoints: 0,
            totalPlays: 0,
            dailyDone: null,
            dailyDate: null
        };
    } catch (e) {
        return { scores: {}, leaderboard: [], totalPoints: 0, totalPlays: 0, dailyDone: null, dailyDate: null };
    }
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
}

let data = loadData();

/* ==================== ХЕЛПЕРЫ ==================== */
function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getDailyChallenge() {
    const today = getTodayKey();
    const dayIndex = new Date().getDate() % DAILY_CHALLENGES.length;
    return DAILY_CHALLENGES[dayIndex];
}

/* ==================== СТАТИСТИКА ==================== */
function updateStats() {
    document.getElementById('total-plays').textContent = data.totalPlays || 0;
    document.getElementById('total-points').textContent = data.totalPoints || 0;

    const best = Object.values(data.scores || {}).reduce((max, s) => Math.max(max, s.best || 0), 0);
    document.getElementById('best-score').textContent = best;
}

/* ==================== РЕНДЕР: ДНЕВНОЕ ЗАДАНИЕ ==================== */
function renderDailyPanel() {
    const el = document.getElementById('daily-panel');
    if (!el) return;

    const today = getTodayKey();
    const isDone = data.dailyDate === today;

    if (isDone) {
        el.innerHTML = `
            <div class="daily-complete">
                ✅ Ежедневное задание выполнено!<br>
                <span style="color:var(--text-dim); font-size:0.85rem;">Возвращайся завтра за новым</span>
            </div>
        `;
        return;
    }

    const challenge = getDailyChallenge();
    const progress = 0;
    const max = 100;

    el.innerHTML = `
        <div class="daily-header">
            <div class="daily-title">📅 Задание дня</div>
            <div class="daily-timer" id="daily-timer">24:00:00</div>
        </div>
        <div class="daily-task">
            <span class="daily-task-icon">${challenge.icon}</span>
            <div class="daily-task-text">${challenge.task}</div>
            <div class="daily-task-reward">🎁 Награда: +${challenge.reward} Тиранских очков</div>
        </div>
        <div class="daily-progress">
            <div class="daily-progress-track">
                <div class="daily-progress-fill" style="width: ${progress}%;"></div>
            </div>
            <div class="daily-progress-label">
                <span>Прогресс</span>
                <span><strong>${progress}%</strong></span>
            </div>
        </div>
    `;

    startDailyTimer();
}

function startDailyTimer() {
    const el = document.getElementById('daily-timer');
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

/* ==================== РЕНДЕР: СЕТКА ИГР ==================== */
function renderGamesGrid() {
    const el = document.getElementById('games-grid');
    if (!el) return;

    el.innerHTML = GAMES.map(g => {
        const s = data.scores[g.id] || { best: 0, plays: 0 };
        return `
            <div class="game-card" onclick="openGame('${g.id}')">
                <span class="game-card-difficulty diff-${g.difficulty}">${g.difficulty.toUpperCase()}</span>
                <span class="game-card-icon">${g.icon}</span>
                <div class="game-card-title">${g.title}</div>
                <div class="game-card-desc">${g.desc}</div>
                <div class="game-card-meta">
                    <div class="game-card-meta-item">
                        <span class="game-card-meta-value">${s.best}</span>
                        <span class="game-card-meta-label">Рекорд</span>
                    </div>
                    <div class="game-card-meta-item">
                        <span class="game-card-meta-value">${s.plays}</span>
                        <span class="game-card-meta-label">Игр</span>
                    </div>
                    <div class="game-card-meta-item">
                        <span class="game-card-meta-value">${g.maxPoints}</span>
                        <span class="game-card-meta-label">Макс. очков</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ==================== РЕНДЕР: ЛИДЕРБОРД ==================== */
function renderLeaderboard() {
    const el = document.getElementById('leaderboard');
    if (!el) return;

    // Генерируем mock-лидерборд на основе players
    const mockLb = [];
    if (typeof players !== 'undefined') {
        players.slice(0, 10).forEach((p, i) => {
            const points = 200 + Math.floor(Math.random() * 800);
            mockLb.push({ nick: p.nick, points });
        });
    }

    // Добавляем текущего игрока
    const myPoints = data.totalPoints || 0;
    mockLb.push({ nick: CURRENT_PLAYER_NICK, points: myPoints, isMe: true });

    mockLb.sort((a, b) => b.points - a.points);

    el.innerHTML = mockLb.map((item, i) => {
        let cls = '';
        if (i === 0) cls = 'top-1';
        else if (i === 1) cls = 'top-2';
        else if (i === 2) cls = 'top-3';
        if (item.isMe) cls += ' my-row';

        return `
            <div class="lb-row ${cls}">
                <div class="lb-rank">#${i + 1}</div>
                <div class="lb-nick">${item.nick} ${item.isMe ? '<span style="color:var(--gold); font-size:0.75rem;">(ты)</span>' : ''}</div>
                <div class="lb-points">${item.points} 💰</div>
            </div>
        `;
    }).join('');
}

/* ==================== ОТКРЫТИЕ ИГРЫ ==================== */
let currentGame = null;

function openGame(id) {
    const game = GAMES.find(g => g.id === id);
    if (!game) return;

    currentGame = game;
    document.getElementById('game-icon').textContent = game.icon;
    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-subtitle').textContent = game.desc;

    const area = document.getElementById('game-area');
    const result = document.getElementById('game-result');
    result.style.display = 'none';
    area.style.display = 'flex';
    area.innerHTML = '';

    switch (id) {
        case 'daily': initDailyGame(area); break;
        case 'guess': initGuessGame(area); break;
        case 'reaction': initReactionGame(area); break;
        case 'result': initResultGame(area); break;
        case 'wheel': initWheelGame(area); break;
        case 'quiz': initQuizGame(area); break;
    }

    document.getElementById('game-modal').classList.add('active');
}

document.getElementById('game-close')?.addEventListener('click', () => {
    document.getElementById('game-modal').classList.remove('active');
});
document.getElementById('game-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'game-modal') e.target.classList.remove('active');
});

/* ==================== ИГРА 1: ЕЖЕДНЕВНОЕ ИСПЫТАНИЕ ==================== */
function initDailyGame(area) {
    let score = 0;
    let timeLeft = 10;
    let running = false;

    area.innerHTML = `
        <div class="daily-challenge-area">
            <div style="font-size:0.9rem; color:var(--text-dim);">Кликай по мишени как можно быстрее!</div>
            <div class="daily-score-big" id="daily-score">0</div>
            <div class="daily-timer-big" id="daily-time">10 сек</div>
            <div class="daily-target" id="daily-target">🎯</div>
            <button class="game-start-btn" id="daily-start">НАЧАТЬ</button>
        </div>
    `;

    const target = document.getElementById('daily-target');
    const scoreEl = document.getElementById('daily-score');
    const timeEl = document.getElementById('daily-time');
    const startBtn = document.getElementById('daily-start');

    startBtn.addEventListener('click', () => {
        score = 0;
        timeLeft = 10;
        running = true;
        scoreEl.textContent = '0';
        timeEl.textContent = '10 сек';
        startBtn.style.display = 'none';

        const interval = setInterval(() => {
            timeLeft--;
            timeEl.textContent = timeLeft + ' сек';
            if (timeLeft <= 0) {
                clearInterval(interval);
                running = false;
                finishDailyGame(score);
            }
        }, 1000);
    });

    target.addEventListener('click', () => {
        if (!running) return;
        score++;
        scoreEl.textContent = score;
        target.style.transform = 'scale(0.9)';
        setTimeout(() => target.style.transform = '', 80);
        // Перемещение мишени
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 150 - 75;
        target.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => target.style.transform = '', 100);
    });
}

function finishDailyGame(score) {
    const points = Math.min(150, score * 8);
    showResult(score, points, `Кликов: ${score}`, 'daily');
}

/* ==================== ИГРА 2: УГАДАЙ БОЙЦА ==================== */
function initGuessGame(area) {
    let currentQ = 0;
    let correct = 0;

    function showQuestion() {
        if (currentQ >= 5) {
            const points = correct * 40;
            showResult(correct, points, `${correct}/5 правильных`, 'guess');
            return;
        }
        const q = BRAWLER_HINTS[currentQ];
        area.innerHTML = `
            <div class="guess-question">Вопрос ${currentQ + 1} из 5</div>
            <div class="guess-hint">${q.hint}</div>
            <div class="guess-options">
                ${q.options.map(o => `<button class="guess-option" data-answer="${o}">${o}</button>`).join('')}
            </div>
        `;
        area.querySelectorAll('.guess-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const ans = btn.dataset.answer;
                if (ans === q.answer) {
                    btn.classList.add('correct');
                    correct++;
                } else {
                    btn.classList.add('wrong');
                    area.querySelector(`[data-answer="${q.answer}"]`).classList.add('correct');
                }
                setTimeout(() => {
                    currentQ++;
                    showQuestion();
                }, 800);
            });
        });
    }
    showQuestion();
}

/* ==================== ИГРА 3: РЕАКЦИЯ ==================== */
function initReactionGame(area) {
    let state = 'wait';
    let startTime = 0;
    let timeout = null;

    area.innerHTML = `
        <div class="reaction-area reaction-wait" id="reaction-area">
            Нажми, чтобы начать
        </div>
    `;

    const reactArea = document.getElementById('reaction-area');

    reactArea.addEventListener('click', () => {
        if (state === 'wait') {
            state = 'waiting';
            reactArea.className = 'reaction-area reaction-wait';
            reactArea.textContent = 'Жди зелёного...';
            const delay = 1500 + Math.random() * 3000;
            timeout = setTimeout(() => {
                state = 'ready';
                reactArea.className = 'reaction-area reaction-ready';
                reactArea.textContent = 'ЖМИ!!!';
                startTime = Date.now();
            }, delay);
        } else if (state === 'waiting') {
            clearTimeout(timeout);
            reactArea.className = 'reaction-area reaction-result';
            reactArea.textContent = 'Слишком рано! Попробуй ещё раз';
            state = 'wait';
            setTimeout(() => {
                reactArea.textContent = 'Нажми, чтобы начать';
            }, 1500);
        } else if (state === 'ready') {
            const reaction = Date.now() - startTime;
            state = 'done';
            let points = 0;
            if (reaction < 250) points = 250;
            else if (reaction < 400) points = 200;
            else if (reaction < 600) points = 150;
            else if (reaction < 900) points = 80;
            else points = 30;

            reactArea.className = 'reaction-area reaction-result';
            reactArea.textContent = `${reaction} мс`;
            setTimeout(() => {
                showResult(reaction, points, `${reaction} мс реакции`, 'reaction');
            }, 1200);
        }
    });
}

/* ==================== ИГРА 4: УГАДАЙ РЕЗУЛЬТАТ ==================== */
function initResultGame(area) {
    let round = 1;
    let wins = 0;

    function showRound() {
        if (round > 5) {
            const points = wins * 20;
            showResult(wins, points, `${wins}/5 угадано`, 'result');
            return;
        }
        area.innerHTML = `
            <div class="result-question">
                Раунд ${round}/5<br>
                Кто победит?
            </div>
            <div class="result-options">
                <button class="result-option" data-choice="blue">🔵 СИНИЙ</button>
                <button class="result-option" data-choice="red">🔴 КРАСНЫЙ</button>
            </div>
        `;

        area.querySelectorAll('.result-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const choice = btn.dataset.choice;
                const winner = Math.random() < 0.5 ? 'blue' : 'red';
                const isWin = choice === winner;
                if (isWin) wins++;

                btn.style.background = isWin ? 'var(--green)' : 'var(--pink)';
                btn.textContent = isWin ? '✅ Победа!' : `❌ Победил ${winner === 'blue' ? 'СИНИЙ' : 'КРАСНЫЙ'}`;

                setTimeout(() => {
                    round++;
                    showRound();
                }, 900);
            });
        });
    }
    showRound();
}

/* ==================== ИГРА 5: КОЛЕСО ==================== */
function initWheelGame(area) {
    area.innerHTML = `
        <div class="wheel-container">
            <div class="wheel-arrow">▼</div>
            <div class="wheel" id="wheel"></div>
        </div>
        <button class="game-start-btn" id="wheel-spin">🎡 КРУТИТЬ</button>
        <div class="wheel-result" id="wheel-result">Нажми «Крутить», чтобы получить задание</div>
    `;

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('wheel-spin');
    const result = document.getElementById('wheel-result');
    let rotation = 0;
    let spinning = false;

    spinBtn.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;
        spinBtn.textContent = '...';
        const extra = 1440 + Math.random() * 720;
        rotation += extra;
        wheel.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            const index = Math.floor(Math.random() * WHEEL_TASKS.length);
            const task = WHEEL_TASKS[index];
            result.innerHTML = `${task.icon} <strong>${task.task}</strong><br><span style="color:var(--green);">+${task.points} очков</span>`;
            spinning = false;
            spinBtn.textContent = '🎡 КРУТИТЬ СНОВА';

            // Автоматически засчитываем очки
            addPoints('wheel', task.points, 0);
            renderGamesGrid();
            updateStats();
            renderLeaderboard();
        }, 4200);
    });
}

/* ==================== ИГРА 6: ВИКТОРИНА ==================== */
function initQuizGame(area) {
    let current = 0;
    let correct = 0;

    function showQuestion() {
        if (current >= QUIZ_QUESTIONS.length) {
            const points = correct * 30;
            showResult(correct, points, `${correct}/${QUIZ_QUESTIONS.length} правильных`, 'quiz');
            return;
        }
        const q = QUIZ_QUESTIONS[current];
        const percent = ((current) / QUIZ_QUESTIONS.length) * 100;
        area.innerHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-track">
                    <div class="quiz-progress-fill" style="width:${percent}%;"></div>
                </div>
            </div>
            <div class="quiz-question">Вопрос ${current + 1}/${QUIZ_QUESTIONS.length}: ${q.q}</div>
            <div class="quiz-options">
                ${q.options.map((o, i) => `<button class="quiz-option" data-index="${i}">${o}</button>`).join('')}
            </div>
        `;
        area.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                const isCorrect = idx === q.correct;
                if (isCorrect) {
                    correct++;
                    btn.style.background = 'var(--green)';
                    btn.style.color = '#fff';
                } else {
                    btn.style.background = 'var(--pink)';
                    btn.style.color = '#fff';
                    area.querySelectorAll('.quiz-option')[q.correct].style.background = 'var(--green)';
                }
                setTimeout(() => {
                    current++;
                    showQuestion();
                }, 900);
            });
        });
    }
    showQuestion();
}

/* ==================== ПОКАЗ РЕЗУЛЬТАТА ==================== */
function showResult(score, points, scoreText, gameId) {
    const area = document.getElementById('game-area');
    const result = document.getElementById('game-result');

    addPoints(gameId, points, score);

    area.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = `
        <span class="game-result-icon">🏆</span>
        <div class="game-result-title">Игра окончена!</div>
        <div class="game-result-score">${scoreText}</div>
        <div class="game-result-points">+${points} 💰</div>
        <button class="game-result-btn" onclick="replayGame()">🔄 Играть снова</button>
        <button class="game-result-btn secondary" onclick="closeGameModal()">Закрыть</button>
    `;

    renderGamesGrid();
    updateStats();
    renderLeaderboard();
}

function replayGame() {
    if (currentGame) {
        document.getElementById('game-modal').classList.remove('active');
        setTimeout(() => openGame(currentGame.id), 300);
    }
}

function closeGameModal() {
    document.getElementById('game-modal').classList.remove('active');
}

/* ==================== ДОБАВЛЕНИЕ ОЧКОВ ==================== */
function addPoints(gameId, points, score) {
    if (!data.scores[gameId]) data.scores[gameId] = { best: 0, plays: 0 };
    data.scores[gameId].plays++;
    if (score > data.scores[gameId].best) data.scores[gameId].best = score;
    data.totalPoints = (data.totalPoints || 0) + points;
    data.totalPlays = (data.totalPlays || 0) + 1;
    saveData();
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    renderDailyPanel();
    renderGamesGrid();
    renderLeaderboard();
    updateStats();
});

/* Глобальные функции */
window.openGame = openGame;
window.replayGame = replayGame;
window.closeGameModal = closeGameModal;