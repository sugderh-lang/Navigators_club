/* ============================================================
   PROFILE-DNA.JS — Player Radar Chart + Archetypes
   Подключается ПОСЛЕ profiles.js
   ============================================================ */

(function() {
    'use strict';

    /* ==================== КОНФИГ ==================== */
    const DNA_AXES = [
        { key: 'strategy',    label: 'Стратегия',  icon: '🧠' },
        { key: 'aggression',  label: 'Агрессия',   icon: '⚔️' },
        { key: 'reaction',    label: 'Реакция',    icon: '⚡' },
        { key: 'teamplay',    label: 'Команда',    icon: '🤝' },
        { key: 'consistency', label: 'Стабильность', icon: '📊' },
        { key: 'activity',    label: 'Активность', icon: '🔥' },
        { key: 'tactics',     label: 'Тактика',    icon: '♟️' }
    ];

    const ARCHETYPES = {
        strategist:  { icon: '🧠', name: 'Стратег',        desc: 'Хладнокровный, продумывает ходы на несколько шагов вперёд. Любит контроль и планирование.' },
        aggressor:   { icon: '⚔️', name: 'Агрессор',       desc: 'Идёт в бой первым. Атакует, давит, ломает позиции. Не даёт врагу вздохнуть.' },
        teamplayer:  { icon: '🤝', name: 'Командный игрок', desc: 'Играет на команду. Всегда поддержит, прикроет, спасёт.' },
        sniper:      { icon: '🎯', name: 'Снайпер',        desc: 'Точные дальние атаки. Реакция и контроль позиции.' },
        tactician:   { icon: '♟️', name: 'Тактик',         desc: 'Гибко меняет план под ситуацию. Понимает карты и мету.' },
        balanced:    { icon: '⚖️', name: 'Универсал',      desc: 'Сбалансированный игрок. Хорош во всём по чуть-чуть.' }
    };

    /* ==================== ГЕНЕРАЦИЯ DNA (mock, если нет данных) ==================== */
    function generateDNA(player) {
        // Если у игрока уже есть DNA — используем
        if (player.dna) return player.dna;

        // Иначе — генерируем стабильный DNA по нику
        const seed = player.nick.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const rng = (offset) => {
            const x = Math.sin(seed + offset) * 10000;
            return Math.floor((x - Math.floor(x)) * 60) + 40; // 40-100
        };

        // Топ-игроки получают бонус
        const bonus = player.trophies > 100000 ? 10 : player.trophies > 70000 ? 5 : 0;

        return {
            strategy:    Math.min(100, rng(1) + bonus),
            aggression:  Math.min(100, rng(2) + bonus),
            reaction:    Math.min(100, rng(3) + bonus),
            teamplay:    Math.min(100, rng(4) + bonus),
            consistency: Math.min(100, rng(5) + bonus),
            activity:    Math.min(100, rng(6) + bonus),
            tactics:     Math.min(100, rng(7) + bonus)
        };
    }

    /* ==================== ОПРЕДЕЛЕНИЕ АРХЕТИПА ==================== */
    function detectArchetype(dna) {
        const values = Object.values(dna);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;

        // Если разброс маленький — универсал
        if (variance < 150) return ARCHETYPES.balanced;

        // Иначе — по доминирующей характеристике
        const get = (key) => dna[key];
        const scores = {
            strategist:  get('strategy') + get('consistency') * 0.5,
            aggressor:   get('aggression') * 1.2 + get('reaction') * 0.5,
            teamplayer:  get('teamplay') * 1.3 + get('consistency') * 0.4,
            sniper:      get('reaction') * 1.2 + get('strategy') * 0.5,
            tactician:   get('tactics') * 1.3 + get('strategy') * 0.4
        };

        const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        return ARCHETYPES[best] || ARCHETYPES.balanced;
    }

    /* ==================== RADAR CHART (SVG) ==================== */
    function renderRadarChart(dna) {
        const size = 320;
        const center = size / 2;
        const radius = 130;
        const axes = DNA_AXES;
        const n = axes.length;

        // Углы для каждой оси (начинаем сверху)
        const angles = axes.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);

        // Функция для точки
        const point = (angle, r) => [
            center + Math.cos(angle) * r,
            center + Math.sin(angle) * r
        ];

        // Сетка (5 кругов)
        const grid = [0.2, 0.4, 0.6, 0.8, 1].map(scale => {
            const pts = angles.map(a => point(a, radius * scale).join(',')).join(' ');
            return `<polygon points="${pts}" class="dna-radar-grid"/>`;
        }).join('');

        // Оси
        const axisLines = angles.map(a => {
            const [x, y] = point(a, radius);
            return `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="dna-radar-axis"/>`;
        }).join('');

        // Полигон игрока
        const playerPoints = axes.map((axis, i) => {
            const value = dna[axis.key] || 50;
            const r = (value / 100) * radius;
            return point(angles[i], r).join(',');
        }).join(' ');

        // Точки на полигоне
        const dots = axes.map((axis, i) => {
            const value = dna[axis.key] || 50;
            const r = (value / 100) * radius;
            const [x, y] = point(angles[i], r);
            return `<circle cx="${x}" cy="${y}" r="4" class="dna-radar-point"/>`;
        }).join('');

        // Подписи осей
        const labels = axes.map((axis, i) => {
            const [x, y] = point(angles[i], radius + 22);
            return `<text x="${x}" y="${y}" class="dna-radar-label">${axis.label}</text>`;
        }).join('');

        return `
            <svg viewBox="0 0 ${size} ${size}" class="dna-radar" xmlns="http://www.w3.org/2000/svg">
                ${grid}
                ${axisLines}
                <polygon points="${playerPoints}" class="dna-radar-polygon"/>
                ${dots}
                ${labels}
            </svg>
        `;
    }

    /* ==================== DNA PANEL ==================== */
    function renderDNAPanel(player) {
        const dna = generateDNA(player);
        const archetype = detectArchetype(dna);

        return `
            <div class="dna-panel">
                <div class="dna-header">
                    <div class="dna-title">
                        <span class="dna-title-icon">🧬</span>
                        <span>Игровая ДНК</span>
                    </div>
                    <div class="dna-archetype-badge">
                        <span class="dna-archetype-icon">${archetype.icon}</span>
                        <span>${archetype.name}</span>
                    </div>
                </div>

                <div class="dna-grid">
                    <div class="dna-radar-wrapper">
                        ${renderRadarChart(dna)}
                    </div>

                    <div class="dna-stats">
                        ${DNA_AXES.map(axis => {
                            const value = dna[axis.key] || 50;
                            return `
                                <div class="dna-stat">
                                    <div class="dna-stat-header">
                                        <span class="dna-stat-name">
                                            <span class="dna-stat-name-icon">${axis.icon}</span>
                                            ${axis.label}
                                        </span>
                                        <span class="dna-stat-value">${value}</span>
                                    </div>
                                    <div class="dna-stat-track">
                                        <div class="dna-stat-fill ${axis.key}" data-value="${value}"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="archetype-card">
                    <div class="archetype-icon-big">${archetype.icon}</div>
                    <div class="archetype-info">
                        <div class="archetype-name">${archetype.name}</div>
                        <div class="archetype-desc">${archetype.desc}</div>
                    </div>
                </div>
            </div>
        `;
    }

    /* ==================== АНИМАЦИЯ ЗАПОЛНЕНИЯ ==================== */
    function animateDNABars() {
        setTimeout(() => {
            document.querySelectorAll('.dna-stat-fill').forEach(fill => {
                const value = fill.dataset.value || 50;
                fill.style.width = value + '%';
            });
        }, 200);
    }

    /* ==================== ИНТЕГРАЦИЯ ==================== */
    // Перехватываем openProfile
    function hookIntoProfile() {
        if (typeof window.openProfile !== 'function') return;

        const originalOpenProfile = window.openProfile;

        window.openProfile = function(nick) {
            // Вызываем оригинальную функцию
            originalOpenProfile(nick);

            // Находим игрока
            const player = (typeof players !== 'undefined') 
                ? players.find(p => p.nick === nick) 
                : null;

            if (!player) return;

            // Через небольшую задержку добавляем DNA panel в модалку
            setTimeout(() => {
                const modalBody = document.getElementById('modal-body');
                if (!modalBody) return;

                // Удаляем старый DNA, если есть
                const oldDNA = modalBody.querySelector('.dna-panel');
                if (oldDNA) oldDNA.remove();

                // Вставляем DNA после профиля
                const statsBlock = modalBody.querySelector('.profile-stats');
                if (statsBlock) {
                    statsBlock.insertAdjacentHTML('afterend', renderDNAPanel(player));
                    animateDNABars();
                } else {
                    modalBody.insertAdjacentHTML('beforeend', renderDNAPanel(player));
                    animateDNABars();
                }
            }, 100);
        };
    }

    /* ==================== ЗАПУСК ==================== */
    document.addEventListener('DOMContentLoaded', () => {
        // Ждём, пока profiles.js выполнится
        setTimeout(hookIntoProfile, 300);
    });

    /* ==================== ЭКСПОРТ ==================== */
    window.PlayerDNA = {
        generate: generateDNA,
        detectArchetype,
        render: renderDNAPanel
    };
})();