/* ═══════════════════════════════════
   COUNTER — time since 09/04/2025
═══════════════════════════════════ */

const START_DATE = new Date('2025-04-09T00:00:00');

function updateCounter() {
    const now = new Date();

    // Seconds / minutes / hours (within the current day)
    const totalSec = Math.floor((now - START_DATE) / 1000);
    const seconds = totalSec % 60;
    const minutes = Math.floor(totalSec / 60) % 60;
    const hours = Math.floor(totalSec / 3600) % 24;

    // Months (calendar-accurate)
    let y1 = START_DATE.getFullYear(), m1 = START_DATE.getMonth(), d1 = START_DATE.getDate();
    let y2 = now.getFullYear(), m2 = now.getMonth(), d2 = now.getDate();
    let months = (y2 - y1) * 12 + (m2 - m1);
    if (d2 < d1) months--;
    if (months < 0) months = 0;

    // Days since the last month-anniversary
    const monthBase = new Date(y1, m1 + months, d1);
    const days = Math.floor((now - monthBase) / 86400000);

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val).padStart(2, '0');
    };

    set('cnt-months', months);
    set('cnt-days', days);
    set('cnt-hours', hours);
    set('cnt-minutes', minutes);
    set('cnt-seconds', seconds);
}

updateCounter();
setInterval(updateCounter, 1000);