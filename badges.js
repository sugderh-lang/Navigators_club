/* ==================== КОНФИГУРАЦИЯ ==================== */
const VISITOR_KEY = 'club_visitor_data';

/* ==================== ОПИСАНИЕ БЕЙДЖЕЙ ==================== */
const BADGES = [
    // === ПОСЕЩЕНИЯ ===
    { id: "first_visit", cat: "visit", icon: "🚪", name: "Первый шаг", desc: "Зашёл на сайт впервые", rarity: "common",
      check: (d) => d.visits >= 1, progress: (d) => [Math.min(d.visits, 1), 1] },
    { id: "visits_5", cat: "visit", icon: "👋", name: "Постоянный гость", desc: "Посетил сайт 5 раз", rarity: "common",
      check: (d) => d.visits >= 5, progress: (d) => [Math.min(d.visits, 5), 5] },
    { id: "visits_10", cat: "visit", icon: "🏠", name: "Свой человек", desc: "Посетил сайт 10 раз", rarity: "rare",
      check: (d) => d.visits >= 10, progress: (d) => [Math.min(d.visits, 10), 10] },
    { id: "visits_25", cat: "visit", icon: "💎", name: "Верный фанат", desc: "Посетил сайт 25 раз", rarity: "epic",
      check: (d) => d.visits >= 25, progress: (d) => [Math.min(d.visits, 25), 25] },
    { id: "visits_50", cat: "visit", icon: "👑", name: "Легенда сайта", desc: "Посетил сайт 50 раз", rarity: "legendary",
      check: (d) => d.visits >= 50, progress: (d) => [Math.min(d.visits, 50), 50] },

    // === ИССЛЕДОВАНИЕ ===
    { id: "explore_3", cat: "explore", icon: "🗺️", name: "Путешественник", desc: "Открыл 3 разные страницы", rarity: "common",
      check: (d) => d.pages.size >= 3, progress: (d) => [Math.min(d.pages.size, 3), 3] },
    { id: "explore_5", cat: "explore", icon: "🧭", name: "Исследователь", desc: "Открыл 5 разных страниц", rarity: "rare",
      check: (d) => d.pages.size >= 5, progress: (d) => [Math.min(d.pages.size, 5), 5] },
    { id: "explore_all", cat: "explore", icon: "🏰", name: "Хозяин замка", desc: "Открыл все разделы сайта", rarity: "legendary",
      check: (d) => d.pages.size >= 11, progress: (d) => [Math.min(d.pages.size, 11), 11] },
    { id: "castle_master", cat: "explore", icon: "🗺️", name: "Картограф", desc: "Открыл карту клуба", rarity: "common",
      check: (d) => d.pages.has('castle'), progress: (d) => [d.pages.has('castle') ? 1 : 0, 1] },
    { id: "minigame_player", cat: "explore", icon: "🎮", name: "Геймер", desc: "Сыграл в мини-игру", rarity: "common",
      check: (d) => d.pages.has('minigames'), progress: (d) => [d.pages.has('minigames') ? 1 : 0, 1] },

    // === СОЦСЕТИ ===
    { id: "opened_tg", cat: "social", icon: "💬", name: "В Telegram", desc: "Открыл Telegram-чат клуба", rarity: "rare",
      check: (d) => d.links.has('telegram'), progress: (d) => [d.links.has('telegram') ? 1 : 0, 1] },
    { id: "opened_club", cat: "social", icon: "⚔️", name: "Хочет в клуб", desc: "Открыл ссылку на клуб", rarity: "rare",
      check: (d) => d.links.has('club'), progress: (d) => [d.links.has('club') ? 1 : 0, 1] },
    { id: "shared_site", cat: "social", icon: "📤", name: "Поделился", desc: "Поделился сайтом", rarity: "epic",
      check: (d) => d.links.has('share'), progress: (d) => [d.links.has('share') ? 1 : 0, 1] },

    // === СЕКРЕТНЫЕ ===
    { id: "konami", cat: "secret", icon: "🎮", name: "Konami Code", desc: "Ввёл секретный код ↑↑↓↓←→←→BA", rarity: "legendary",
      check: (d) => d.secrets.has('konami'), progress: (d) => [d.secrets.has('konami') ? 1 : 0, 1] },
    { id: "night_owl", cat: "secret", icon: "🦉", name: "Полуночник", desc: "Зашёл на сайт после 2 часов ночи", rarity: "rare",
      check: (d) => d.secrets.has('night_owl'), progress: (d) => [d.secrets.has('night_owl') ? 1 : 0, 1] },
    { id: "early_bird", cat: "secret", icon: "🐦", name: "Ранняя пташка", desc: "Зашёл на сайт до 7 утра", rarity: "rare",
      check: (d) => d.secrets.has('early_bird'), progress: (d) => [d.secrets.has('early_bird') ? 1 : 0, 1] },
    { id: "core_visitor", cat: "secret", icon: "🔒", name: "В штабе", desc: "Зашёл в Штаб элиты", rarity: "legendary",
      check: (d) => d.secrets.has('core_visited'), progress: (d) => [d.secrets.has('core_visited') ? 1 : 0, 1] },
    { id: "logo_hunter", cat: "secret", icon: "💀", name: "Охотник за лого", desc: "Кликнул на логотип 5 раз", rarity: "epic",
      check: (d) => (d.logoClicks || 0) >= 5, progress: (d) => [Math.min(d.logoClicks || 0, 5), 5] },

    // === ОСОБЫЕ ===
    { id: "used_search", cat: "special", icon: "🔍", name: "Искатель", desc: "Воспользовался поиском", rarity: "common",
      check: (d) => d.secrets.has('used_search'), progress: (d) => [d.secrets.has('used_search') ? 1 : 0, 1] },
    { id: "played_roulette", cat: "special", icon: "🎰", name: "Рулетчик", desc: "Крутил рулетку клуба", rarity: "rare",
      check: (d) => d.secrets.has('played_roulette'), progress: (d) => [d.secrets.has('played_roulette') ? 1 : 0, 1] },
    { id: "opened_profile", cat: "special", icon: "👤", name: "Знакомится", desc: "Открыл профиль игрока", rarity: "common",
      check: (d) => d.secrets.has('opened_profile'), progress: (d) => [d.secrets.has('opened_profile') ? 1 : 0, 1] },
    { id: "bought_item", cat: "special", icon: "💰", name: "Покупатель", desc: "Купил награду в магазине", rarity: "rare",
      check: (d) => d.secrets.has('bought_item'), progress: (d) => [d.secrets.has('bought_item') ? 1 : 0, 1] },
    { id: "theme_switcher", cat: "special", icon: "🌙", name: "Смена темы", desc: "Переключил тему", rarity: "common",
      check: (d) => d.secrets.has('theme_switched'), progress: (d) => [d.secrets.has('theme_switched') ? 1 : 0, 1] },
    { id: "sound_master", cat: "special", icon: "🔊", name: "Меломан", desc: "Включил/выключил звук", rarity: "common",
      check: (d) => d.secrets.has('sound_toggled'), progress: (d) => [d.secrets.has('sound_toggled') ? 1 : 0, 1] },
    { id: "all_badges", cat: "special", icon: "🏆", name: "Коллекционер", desc: "Собрал все бейджи", rarity: "legendary",
      check: (d) => BADGES.filter(b => b.id !== 'all_badges').every(b => b.check(d)),
      progress: (d) => {
          const total = BADGES.filter(b => b.id !== 'all_badges').length;
          const unlocked = BADGES.filter(b => b.id !== 'all_badges' && b.check(d)).length;
          return [unlocked, total];
      }
    }
];

/* ==================== РАБОТА С ДАННЫМИ ==================== */
function loadVisitorData() {
    try {
        const saved = localStorage.getItem(VISITOR_KEY);
        if (saved) {
            const d = JSON.parse(saved);
            return {
                visits: d.visits || 0,
                firstVisit: d.firstVisit || Date.now(),
                lastVisit: d.lastVisit || Date.now(),
                pages: new Set(d.pages || []),
                links: new Set(d.links || []),
                secrets: new Set(d.secrets || []),
                logoClicks: d.logoClicks || 0,
                unlockedBadges: new Set(d.unlockedBadges || [])
            };
        }
    } catch (e) {}

    return {
        visits: 0,
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        pages: new Set(),
        links: new Set(),
        secrets: new Set(),
        logoClicks: 0,
        unlockedBadges: new Set()
    };
}

function saveVisitorData(d) {
    try {
        localStorage.setItem(VISITOR_KEY, JSON.stringify({
            visits: d.visits,
            firstVisit: d.firstVisit,
            lastVisit: d.lastVisit,
            pages: [...d.pages],
            links: [...d.links],
            secrets: [...d.secrets],
            logoClicks: d.logoClicks,
            unlockedBadges: [...d.unlockedBadges]
        }));
    } catch (e) {}
}

let visitorData = loadVisitorData();

/* ==================== ОБНОВЛЕНИЕ ДАННЫХ ==================== */
function updateOnVisit() {
    const now = Date.now();
    const lastVisit = visitorData.lastVisit;
    // Если прошло больше 30 минут — считаем новым посещением
    if (now - lastVisit > 30 * 60 * 1000) {
        visitorData.visits++;
    }
    if (!visitorData.visits) visitorData.visits = 1;
    visitorData.lastVisit = now;

    // Определяем текущую страницу
    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    visitorData.pages.add(pageName);

    // Секретные условия
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 5) visitorData.secrets.add('night_owl');
    if (hour >= 5 && hour < 7) visitorData.secrets.add('early_bird');
    if (pageName === 'core') visitorData.secrets.add('core_visited');

    saveVisitorData(visitorData);
}

/* ==================== ОТСЛЕЖИВАНИЕ СОБЫТИЙ ==================== */
function attachTrackers() {
    // Клик по Telegram-ссылкам
    document.querySelectorAll('a[href*="t.me"]').forEach(a => {
        a.addEventListener('click', () => {
            visitorData.links.add('telegram');
            saveVisitorData(visitorData);
            checkAndUnlockBadges();
        });
    });

    // Клик по ссылкам на клуб
    document.querySelectorAll('a[href*="brawlstars"]').forEach(a => {
        a.addEventListener('click', () => {
            visitorData.links.add('club');
            saveVisitorData(visitorData);
            checkAndUnlockBadges();
        });
    });

    // Клик на логотип (5 раз)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            visitorData.logoClicks = (visitorData.logoClicks || 0) + 1;
            saveVisitorData(visitorData);
            if (visitorData.logoClicks === 5) {
                checkAndUnlockBadges();
            }
        });
    }

    // Переключение темы
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            visitorData.secrets.add('theme_switched');
            saveVisitorData(visitorData);
            checkAndUnlockBadges();
        });
    }

    // Переключение звука
    const soundBtn = document.querySelector('.sound-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            visitorData.secrets.add('sound_toggled');
            saveVisitorData(visitorData);
            checkAndUnlockBadges();
        });
    }

    // Открытие профилей
    document.addEventListener('click', (e) => {
        const playerCard = e.target.closest('.player-card, .player-mini');
        if (playerCard) {
            visitorData.secrets.add('opened_profile');
            saveVisitorData(visitorData);
            checkAndUnlockBadges();
        }
    });

    // Покупка в магазине (проверяем localStorage shop_data)
    try {
        const shopData = JSON.parse(localStorage.getItem('tyrant_points_data') || '{}');
        if (shopData.purchases && shopData.purchases.length > 0) {
            visitorData.secrets.add('bought_item');
        }
    } catch (e) {}

    // Рулетка (проверяем localStorage roulette_data)
    try {
        const rData = JSON.parse(localStorage.getItem('club_roulette_data') || '{}');
        if (rData.history && rData.history.length > 0) {
            visitorData.secrets.add('played_roulette');
        }
    } catch (e) {}

    saveVisitorData(visitorData);
}

/* ==================== KONAMI CODE ==================== */
function initKonamiCode() {
    const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === konamiSequence[index]) {
            index++;
            if (index === konamiSequence.length) {
                visitorData.secrets.add('konami');
                saveVisitorData(visitorData);
                checkAndUnlockBadges();
                if (window.ClubSounds) ClubSounds.play('legendary');
                // Спецэффект
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => { document.body.style.filter = ''; }, 2000);
                index = 0;
            }
        } else {
            index = 0;
        }
    });
}

/* ==================== ПРОВЕРКА РАЗБЛОКИРОВКИ ==================== */
function checkAndUnlockBadges() {
    let unlockedNow = false;
    BADGES.forEach(badge => {
        if (!visitorData.unlockedBadges.has(badge.id)) {
            if (badge.check(visitorData)) {
                visitorData.unlockedBadges.add(badge.id);
                saveVisitorData(visitorData);
                unlockedNow = true;
                // Показываем модалку только если мы на странице бейджей
                if (document.getElementById('badges-grid')) {
                    setTimeout(() => showBadgeUnlock(badge), 300);
                }
            }
        }
    });
    if (unlockedNow) {
        renderBadgesGrid();
        renderProgress();
        renderVisitorStats();
    }
}

/* ==================== РЕНДЕР ==================== */
function renderVisitorStats() {
    const el = document.getElementById('visitor-stats');
    if (!el) return;

    const daysSince = Math.floor((Date.now() - visitorData.firstVisit) / (24 * 60 * 60 * 1000));
    const unlockedCount = visitorData.unlockedBadges.size;

    el.innerHTML = `
        <div class="visitor-stat">
            <span class="visitor-stat-icon">🚪</span>
            <span class="visitor-stat-value">${visitorData.visits}</span>
            <span class="visitor-stat-label">Посещений</span>
        </div>
        <div class="visitor-stat">
            <span class="visitor-stat-icon">📅</span>
            <span class="visitor-stat-value">${daysSince}</span>
            <span class="visitor-stat-label">Дней с нами</span>
        </div>
        <div class="visitor-stat">
            <span class="visitor-stat-icon">🗺️</span>
            <span class="visitor-stat-value">${visitorData.pages.size}</span>
            <span class="visitor-stat-label">Страниц открыто</span>
        </div>
        <div class="visitor-stat">
            <span class="visitor-stat-icon">🏅</span>
            <span class="visitor-stat-value">${unlockedCount}/${BADGES.length}</span>
            <span class="visitor-stat-label">Бейджей</span>
        </div>
    `;
}

function renderProgress() {
    const el = document.getElementById('badges-progress-panel');
    if (!el) return;

    const total = BADGES.length;
    const unlocked = visitorData.unlockedBadges.size;
    const percent = Math.round((unlocked / total) * 100);

    el.innerHTML = `
        <div class="badges-progress-header">
            <h3>📊 Прогресс коллекции</h3>
            <span>${percent}%</span>
        </div>
        <div class="badges-progress-track">
            <div class="badges-progress-fill" id="badges-progress-fill"></div>
        </div>
        <p class="badges-progress-hint">
            Собрано <strong>${unlocked} из ${total}</strong> бейджей
        </p>
    `;

    setTimeout(() => {
        const fill = document.getElementById('badges-progress-fill');
        if (fill) fill.style.width = percent + '%';
    }, 300);
}

let activeCat = 'all';

function renderBadgesGrid() {
    const el = document.getElementById('badges-grid');
    if (!el) return;

    let list = BADGES.slice();
    if (activeCat !== 'all') {
        list = list.filter(b => b.cat === activeCat);
    }

    // Сортировка: сначала разблокированные, потом по редкости
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
    list.sort((a, b) => {
        const aUnlocked = visitorData.unlockedBadges.has(a.id);
        const bUnlocked = visitorData.unlockedBadges.has(b.id);
        if (aUnlocked !== bUnlocked) return aUnlocked ? -1 : 1;
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });

    el.innerHTML = list.map(badge => {
        const unlocked = visitorData.unlockedBadges.has(badge.id);
        const [cur, max] = badge.progress(visitorData);
        const percent = Math.min(100, Math.round((cur / max) * 100));

        return `
            <div class="badge-card ${badge.rarity} ${unlocked ? 'unlocked' : 'locked'}">
                <span class="badge-icon">${unlocked ? badge.icon : '🔒'}</span>
                <div class="badge-name">${unlocked ? badge.name : '???'}</div>
                <div class="badge-desc">${badge.desc}</div>
                <span class="badge-rarity rarity-${badge.rarity}">${badge.rarity.toUpperCase()}</span>
                ${!unlocked ? `
                    <div class="badge-progress">
                        <div class="badge-progress-track">
                            <div class="badge-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                        <div class="badge-progress-label">
                            <span>${cur}</span>
                            <span>${max}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

/* ==================== МОДАЛКА ==================== */
function showBadgeUnlock(badge) {
    const modal = document.getElementById('badge-modal');
    const content = modal.querySelector('.badge-modal-content');
    const iconEl = document.getElementById('badge-modal-icon');
    const rarityEl = document.getElementById('badge-modal-rarity');
    const nameEl = document.getElementById('badge-modal-name');
    const descEl = document.getElementById('badge-modal-desc');
    const particlesEl = document.getElementById('badge-modal-particles');

    content.className = 'badge-modal-content' + (badge.rarity === 'legendary' ? ' legendary' : '');
    iconEl.textContent = badge.icon;
    rarityEl.textContent = badge.rarity.toUpperCase();
    rarityEl.className = 'badge-modal-rarity rarity-' + badge.rarity;
    nameEl.textContent = badge.name;
    descEl.textContent = badge.desc;

    // Звук
    if (window.ClubSounds) {
        if (badge.rarity === 'legendary') {
            ClubSounds.play('legendary');
        } else {
            ClubSounds.play('ding');
        }
    }

    // Частицы
    particlesEl.innerHTML = '';
    const count = badge.rarity === 'legendary' ? 40 : 20;
    const colors = ['#f9ca24', '#ffd700', '#ffe66d', '#eb4d4b', '#6ab04c'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'badge-modal-particle';
        const angle = (Math.PI * 2 * i) / count;
        const dist = 150 + Math.random() * 200;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = `0 0 15px ${p.style.background}`;
        p.style.animationDelay = (0.3 + Math.random() * 0.4) + 's';
        particlesEl.appendChild(p);
    }

    modal.classList.add('active');
}

document.getElementById('badge-modal-close')?.addEventListener('click', () => {
    document.getElementById('badge-modal').classList.remove('active');
});
document.getElementById('badge-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'badge-modal') e.target.classList.remove('active');
});

/* ==================== ФИЛЬТРЫ ==================== */
function initFilters() {
    document.querySelectorAll('#badge-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#badge-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat;
            renderBadgesGrid();
        });
    });
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    // Обновляем данные о посещении
    updateOnVisit();

    // Отслеживаем события
    setTimeout(() => {
        attachTrackers();
        initKonamiCode();
        checkAndUnlockBadges();
    }, 500);

    // Рендер
    renderVisitorStats();
    renderProgress();
    renderBadgesGrid();
    initFilters();
});