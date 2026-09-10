/* ============================================================
   NOTIFICATIONS.JS — Игровые уведомления
   ============================================================ */

(function() {
    'use strict';

    const STORAGE_KEY = 'club_notifications';

    function loadNotifs() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    }

    function saveNotifs(list) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 30)));
        } catch (e) {}
    }

    let notifications = loadNotifs();

    /* ==================== ДОБАВИТЬ УВЕДОМЛЕНИЕ ==================== */
    function addNotification({ icon = '🔔', title = 'Событие', text = '', type = 'info' } = {}) {
        notifications.unshift({
            id: Date.now() + Math.random(),
            icon,
            title,
            text,
            type,
            time: Date.now(),
            read: false
        });
        notifications = notifications.slice(0, 30);
        saveNotifs(notifications);
        renderBell();
        if (document.getElementById('notif-list')) renderPanel();
    }

    /* ==================== ВРЕМЯ ==================== */
    function timeAgo(timestamp) {
        const diff = Date.now() - timestamp;
        const sec = Math.floor(diff / 1000);
        const min = Math.floor(sec / 60);
        const hour = Math.floor(min / 60);
        const day = Math.floor(hour / 24);

        if (sec < 60) return 'только что';
        if (min < 60) return `${min} мин назад`;
        if (hour < 24) return `${hour} ч назад`;
        return `${day} дн назад`;
    }

    /* ==================== BELL В ШАПКЕ ==================== */
    function createBell() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions || headerActions.querySelector('.notif-bell')) return;

        const bell = document.createElement('button');
        bell.className = 'notif-bell';
        bell.setAttribute('aria-label', 'Уведомления');
        bell.innerHTML = `
            🔔
            <span class="notif-bell-badge" id="notif-count" style="display:none;">0</span>
        `;
        bell.addEventListener('click', togglePanel);

        const firstChild = headerActions.firstChild;
        headerActions.insertBefore(bell, firstChild);
    }

    function renderBell() {
        const badge = document.getElementById('notif-count');
        if (!badge) return;
        const unread = notifications.filter(n => !n.read).length;
        if (unread > 0) {
            badge.textContent = unread > 9 ? '9+' : unread;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    /* ==================== ПАНЕЛЬ ==================== */
    function createPanel() {
        if (document.getElementById('notif-panel')) return;

        const panel = document.createElement('div');
        panel.className = 'notif-panel';
        panel.id = 'notif-panel';
        panel.innerHTML = `
            <div class="notif-header">
                <span>🔔 Уведомления</span>
                <button class="notif-clear" id="notif-clear">Очистить</button>
            </div>
            <div class="notif-list" id="notif-list"></div>
        `;
        document.body.appendChild(panel);

        panel.querySelector('#notif-clear').addEventListener('click', () => {
            notifications = [];
            saveNotifs(notifications);
            renderBell();
            renderPanel();
        });
    }

    function renderPanel() {
        const list = document.getElementById('notif-list');
        if (!list) return;

        if (!notifications.length) {
            list.innerHTML = `
                <div class="notif-empty">
                    <div style="font-size:3rem;opacity:0.3;margin-bottom:15px;">🔔</div>
                    Пока нет уведомлений
                </div>
            `;
            return;
        }

        list.innerHTML = notifications.slice(0, 15).map(n => `
            <div class="notif-item ${n.read ? '' : 'unread'}">
                <div class="notif-item-icon">${n.icon}</div>
                <div class="notif-item-body">
                    <div class="notif-item-title">${n.title}</div>
                    <div class="notif-item-text">${n.text}</div>
                    <div class="notif-item-time">${timeAgo(n.time)}</div>
                </div>
            </div>
        `).join('');
    }

    function togglePanel() {
        createPanel();
        const panel = document.getElementById('notif-panel');
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            // Все прочитаны
            notifications.forEach(n => n.read = true);
            saveNotifs(notifications);
            renderBell();
            renderPanel();
        }
    }

    function closePanel() {
        const panel = document.getElementById('notif-panel');
        if (panel) panel.classList.remove('active');
    }

    /* ==================== КЛИК ВНЕ ПАНЕЛИ ==================== */
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('notif-panel');
        const bell = document.querySelector('.notif-bell');
        if (!panel || !panel.classList.contains('active')) return;
        if (panel.contains(e.target) || bell?.contains(e.target)) return;
        closePanel();
    });

    /* ==================== ДЕМО: ПРИМЕРЫ ==================== */
    function seedDemo() {
        if (notifications.length) return;
        if (!localStorage.getItem('club_notif_seeded')) {
            addNotification({
                icon: '👑',
                title: 'Новое звание',
                text: 'Ты получил звание «Элита»'
            });
            addNotification({
                icon: '🏆',
                title: 'Достижение',
                text: 'Разблокировано «Легенда кубков»'
            });
            addNotification({
                icon: '🎮',
                title: 'Мини-игра',
                text: 'Рекорд в «Угадай бойца» побит'
            });
            localStorage.setItem('club_notif_seeded', 'true');
        }
    }

    /* ==================== ЗАПУСК ==================== */
    function init() {
        createBell();
        renderBell();
        seedDemo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.ClubNotifications = {
        add: addNotification,
        toggle: togglePanel,
        close: closePanel
    };
})();