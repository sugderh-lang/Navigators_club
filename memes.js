/* ==================== ДАННЫЕ МЕМОВ ==================== */
const MEMES = [
    {
        id: "meme-1",
        img: "images/memes/meme-1.png",
        title: "Легенда о Консте",
        desc: "Илья прочитал этот диалог и понял — пора ливать",
        cat: "chat",
        badge: "Из чата"
    },
    {
        id: "meme-2",
        img: "images/memes/meme-2.png",
        title: "Клоуны вокруг",
        desc: "«Одни клоуны вокруг» — Ecstasy VS Konsta",
        cat: "chat",
        badge: "Из чата"
    },
    {
        id: "meme-3",
        img: "images/memes/meme-3.png",
        title: "Женская логика",
        desc: "Они мыслят нестандартно 🤡",
        cat: "fun",
        badge: "Весёлое"
    },
    {
        id: "meme-4",
        img: "images/memes/meme-4.png",
        title: "Наша гордость",
        desc: "Повышение в Лигу Мастеров — заслуга Ильи и Стёпы",
        cat: "pride",
        badge: "Гордость"
    },
    {
        id: "meme-5",
        img: "images/memes/meme-5.png",
        title: "Мем-поцелуй",
        desc: "Классика жанра 2026 года",
        cat: "fun",
        badge: "Весёлое"
    },
    {
        id: "meme-6",
        img: "images/memes/meme-6.png",
        title: "Ещё один мем",
        desc: "Внутренняя шутка клуба",
        cat: "fun",
        badge: "Весёлое"
    }
];

let activeCat = 'all';
let currentMeme = null;

/* ==================== РЕНДЕР ==================== */
function renderMemes() {
    const grid = document.getElementById('memes-grid');
    if (!grid) return;

    let list = MEMES.slice();
    if (activeCat !== 'all') {
        list = list.filter(m => m.cat === activeCat);
    }

    if (!list.length) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-dim);">
                <div style="font-size: 4rem; opacity: 0.4; margin-bottom: 15px;">😂</div>
                <div style="font-family: 'Russo One'; color: var(--gold); font-size: 1.2rem; margin-bottom: 10px;">Мемов пока нет</div>
                <p>Заходи позже — скоро добавим!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(m => `
        <div class="meme-card" onclick="openMeme('${m.id}')">
            <span class="meme-card-badge ${m.cat}">${m.badge}</span>
            <img src="${m.img}" alt="${m.title}" class="meme-card-img" onerror="this.src='images/logo.png'">
            <div class="meme-card-body">
                <div class="meme-card-title">${m.title}</div>
                <div class="meme-card-desc">${m.desc}</div>
            </div>
        </div>
    `).join('');
}

/* ==================== ОТКРЫТИЕ МЕМА ==================== */
function openMeme(id) {
    const meme = MEMES.find(m => m.id === id);
    if (!meme) return;

    currentMeme = meme;

    const modal = document.getElementById('meme-modal');
    document.getElementById('meme-modal-img').src = meme.img;
    document.getElementById('meme-modal-img').alt = meme.title;
    document.getElementById('meme-modal-title').textContent = meme.title;
    document.getElementById('meme-modal-desc').textContent = meme.desc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.ClubSounds) ClubSounds.play('open');
}

function closeMeme() {
    document.getElementById('meme-modal').classList.remove('active');
    document.body.style.overflow = '';
    currentMeme = null;
    if (window.ClubSounds) ClubSounds.play('close');
}

document.getElementById('meme-modal-close')?.addEventListener('click', closeMeme);
document.getElementById('meme-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'meme-modal') closeMeme();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentMeme) closeMeme();
});

/* ==================== ПОДЕЛИТЬСЯ ==================== */
function shareMeme() {
    if (!currentMeme) return;
    const url = `https://nagibatory3000.netlify.app/memes.html`;
    if (navigator.share) {
        navigator.share({
            title: currentMeme.title,
            text: currentMeme.desc,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Ссылка скопирована!');
        });
    }
}

/* ==================== ФИЛЬТРЫ ==================== */
function initFilters() {
    document.querySelectorAll('#meme-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#meme-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat;
            renderMemes();
            if (window.ClubSounds) ClubSounds.play('tab');
        });
    });
}

/* ==================== ЗАПУСК ==================== */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initBurger === 'function') initBurger();
    if (typeof initScrollReveal === 'function') initScrollReveal();

    renderMemes();
    initFilters();
});

window.openMeme = openMeme;
window.closeMeme = closeMeme;
window.shareMeme = shareMeme;