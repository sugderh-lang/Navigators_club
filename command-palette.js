/* ============================================================
   COMMAND-PALETTE.JS — Ctrl+K поиск по сайту
   ============================================================ */

(function() {
    'use strict';

    /* ==================== РЕЕСТР ==================== */
    const REGISTRY = [
        { type: 'page', icon: '🏠', title: 'Главная', sub: 'Командный центр', url: 'index.html' },
        { type: 'page', icon: '🏰', title: 'Карта клуба', sub: 'Замок и комнаты', url: 'castle.html' },
        { type: 'page', icon: '👤', title: 'Профили игроков', sub: '30 участников', url: 'profiles.html' },
        { type: 'page', icon: '🏅', title: 'Звания', sub: 'Лестница званий', url: 'ranks.html' },
        { type: 'page', icon: '🏆', title: 'Достижения', sub: '47 ачивок', url: 'achievements.html' },
        { type: 'page', icon: '🎮', title: 'Мини-игры', sub: '6 игр + лидерборд', url: 'minigames.html' },
        { type: 'page', icon: '📡', title: 'LIVE-лента', sub: 'Активность клуба', url: 'activity.html' },
        { type: 'page', icon: '💰', title: 'Магазин', sub: 'Награды за очки', url: 'shop.html' },
        { type: 'page', icon: '🎰', title: 'Рулетка', sub: 'Ежедневный спин', url: 'roulette.html' },
        { type: 'page', icon: '🏅', title: 'Бейджи', sub: 'Твоя коллекция', url: 'badges.html' },
        { type: 'page', icon: '📚', title: 'Гайды', sub: 'Тир-лист и советы', url: 'guides.html' },
        { type: 'page', icon: '🏆', title: 'Киберспорт', sub: 'Турниры', url: 'team.html' },
        { type: 'page', icon: '🔒', title: 'Штаб элиты', sub: 'Закрытая страница', url: 'core.html', badge: 'ELITE' }
    ];

    function getPlayers() {
        if (typeof players === 'undefined') return [];
        return players.map(p => ({
            type: 'player',
            icon: '👤',
            title: p.nick,
            sub: `${p.role} · ${p.trophies.toLocaleString('ru-RU')} 🏆`,
            url: 'profiles.html',
            badge: p.inChat ? 'ELITE' : null
        }));
    }

    function buildIndex() {
        return [...REGISTRY, ...getPlayers()];
    }

    /* ==================== СОСТОЯНИЕ ==================== */
    let overlay, palette, input, results;
    let activeIndex = 0;
    let currentResults = [];

    /* ==================== СОЗДАНИЕ DOM ==================== */
    function createPalette() {
        if (document.getElementById('cmd-palette')) return;

        overlay = document.createElement('div');
        overlay.className = 'cmd-overlay';
        document.body.appendChild(overlay);

        palette = document.createElement('div');
        palette.className = 'cmd-palette';
        palette.id = 'cmd-palette';
        palette.innerHTML = `
            <div class="cmd-input-wrap">
                <span class="cmd-icon">🔍</span>
                <input type="text" class="cmd-input" placeholder="Поиск игроков, страниц, разделов..." autocomplete="off">
                <span class="cmd-hint">ESC</span>
            </div>
            <div class="cmd-results" id="cmd-results"></div>
            <div class="cmd-footer">
                <span><span class="cmd-kbd">↑</span><span class="cmd-kbd">↓</span> навигация</span>
                <span><span class="cmd-kbd">↵</span> открыть</span>
                <span><span class="cmd-kbd">ESC</span> закрыть</span>
            </div>
        `;
        document.body.appendChild(palette);

        input = palette.querySelector('.cmd-input');
        results = palette.querySelector('.cmd-results');

        overlay.addEventListener('click', close);
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeydown);
    }

    /* ==================== ПОИСК ==================== */
    function search(query) {
        const index = buildIndex();
        if (!query.trim()) return index.filter(i => i.type === 'page');

        const q = query.toLowerCase().trim();
        return index
            .map(item => {
                const title = (item.title || '').toLowerCase();
                const sub = (item.sub || '').toLowerCase();
                let score = 0;
                if (title === q) score = 100;
                else if (title.startsWith(q)) score = 80;
                else if (title.includes(q)) score = 60;
                else if (sub.includes(q)) score = 30;
                return { ...item, _score: score };
            })
            .filter(i => i._score > 0)
            .sort((a, b) => b._score - a._score)
            .slice(0, 15);
    }

    /* ==================== РЕНДЕР ==================== */
    function renderItems(items) {
        currentResults = items;
        
        if (!items.length) {
            results.innerHTML = `
                <div class="cmd-empty">
                    <span class="cmd-empty-icon">💀</span>
                    <div>Ничего не найдено</div>
                </div>
            `;
            return;
        }

        const groups = {};
        items.forEach(item => {
            const key = item.type === 'page' ? '📄 Разделы' : '👥 Игроки';
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
        });

        let html = '';
        let globalIndex = 0;

        Object.entries(groups).forEach(([label, list]) => {
            html += `<div class="cmd-section">${label}</div>`;
            list.forEach(item => {
                const badge = item.badge 
                    ? `<span style="padding:2px 8px;background:var(--hud-gold);color:#1a1a2e;font-size:0.6rem;font-weight:900;border-radius:10px;">${item.badge}</span>` 
                    : '';
                html += `
                    <a href="${item.url}" class="cmd-item" data-index="${globalIndex}">
                        <span class="cmd-item-icon">${item.icon}</span>
                        <div style="flex:1;min-width:0;">
                            <div class="cmd-item-title">${item.title}</div>
                            <div class="cmd-item-sub">${item.sub}</div>
                        </div>
                        ${badge}
                    </a>
                `;
                globalIndex++;
            });
        });

        results.innerHTML = html;
        activeIndex = 0;
        updateActive();
    }

    function updateActive() {
        results.querySelectorAll('.cmd-item').forEach((el, i) => {
            el.classList.toggle('active', i === activeIndex);
        });
        const activeEl = results.querySelector('.cmd-item.active');
        if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    /* ==================== КЛАВИАТУРА ==================== */
    function handleKeydown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
            updateActive();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            updateActive();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const activeEl = results.querySelector('.cmd-item.active');
            if (activeEl) {
                if (window.ClubSounds) ClubSounds.play('click');
                window.location.href = activeEl.href;
            }
        } else if (e.key === 'Escape') {
            close();
        }
    }

    function handleInput(e) {
        renderItems(search(e.target.value));
    }

    /* ==================== ОТКРЫТИЕ / ЗАКРЫТИЕ ==================== */
    function open() {
        createPalette();
        overlay.classList.add('active');
        palette.classList.add('active');
        setTimeout(() => input.focus(), 100);
        renderItems(search(''));
        if (window.ClubSounds) ClubSounds.play('open');
    }

    function close() {
        if (!palette) return;
        overlay.classList.remove('active');
        palette.classList.remove('active');
        input.value = '';
        if (window.ClubSounds) ClubSounds.play('close');
    }

    function toggle() {
        if (palette?.classList.contains('active')) close();
        else open();
    }

    /* ==================== КНОПКА В ШАПКЕ ==================== */
    function createTriggerButton() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions || headerActions.querySelector('.cmd-trigger')) return;

        const btn = document.createElement('button');
        btn.className = 'theme-btn';
        btn.style.cssText = 'font-size:1rem;';
        btn.setAttribute('aria-label', 'Поиск');
        btn.innerHTML = '🔍';
        btn.title = 'Поиск (Cmd+K)';
        btn.addEventListener('click', open);

        const firstChild = headerActions.firstChild;
        headerActions.insertBefore(btn, firstChild);
    }

    /* ==================== ГОРЯЧАЯ КЛАВИША ==================== */
    function initHotkey() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape' && palette?.classList.contains('active')) {
                close();
            }
        });
    }

    /* ==================== ЗАПУСК ==================== */
    function init() {
        createTriggerButton();
        initHotkey();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CommandPalette = { open, close, toggle };
})();