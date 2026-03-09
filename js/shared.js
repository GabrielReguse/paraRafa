/* ═══════════════════════════════════════════════
   SHARED — Canvas BG · Sidebar · Fade · Polaroid
═══════════════════════════════════════════════ */

// ── CANVAS HEART ANIMATION ───────────────────────
(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COUNT = 38;
    const CONNECT_DIST = 150;
    const PULSE_CHANCE = 0.003;

    let hearts = [];
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function spawnHeart() {
        return {
            x: rnd(0, W),
            y: rnd(0, H),
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            baseSize: rnd(7, 16),
            phase: rnd(0, Math.PI * 2),
            breathSpd: rnd(0.5, 1.3),
            alpha: rnd(0.22, 0.48),
            color: Math.random() < 0.25 ? '#e8789a' : '#f2a7be',
            pulsing: false,
            pulseT: 0,
        };
    }

    for (let i = 0; i < COUNT; i++) hearts.push(spawnHeart());

    function drawHeart(s) {
        ctx.beginPath();
        ctx.moveTo(0, s * 0.35);
        ctx.bezierCurveTo(-s * 0.55, -s * 0.05, -s, s * 0.22, 0, s);
        ctx.bezierCurveTo(s * 0.55, -s * 0.05, s, s * 0.22, 0, s * 0.35);
        ctx.fill();
    }

    let lastT = 0;
    function loop(t) {
        const dt = Math.min(t - lastT, 40);
        lastT = t;

        ctx.clearRect(0, 0, W, H);
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, '#fff0f5');
        g.addColorStop(1, '#fce4ec');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        /* lines */
        for (let i = 0; i < hearts.length; i++) {
            for (let j = i + 1; j < hearts.length; j++) {
                const dx = hearts[i].x - hearts[j].x;
                const dy = hearts[i].y - hearts[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT_DIST) {
                    const str = 1 - d / CONNECT_DIST;
                    ctx.save();
                    ctx.globalAlpha = 0.28 * str;
                    ctx.strokeStyle = '#e8789a';
                    ctx.lineWidth = 0.8 + str * 0.8;
                    ctx.beginPath();
                    ctx.moveTo(hearts[i].x, hearts[i].y);
                    ctx.lineTo(hearts[j].x, hearts[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        /* hearts */
        for (const h of hearts) {
            const breath = Math.sin(t * 0.001 * h.breathSpd + h.phase);

            if (!h.pulsing && Math.random() < PULSE_CHANCE) { h.pulsing = true; h.pulseT = 0; }

            let scaleExtra = 1;
            if (h.pulsing) {
                h.pulseT += dt * 0.004;
                scaleExtra = 1 + Math.sin(h.pulseT * Math.PI) * 0.6;
                if (h.pulseT >= 1) h.pulsing = false;
            }

            ctx.save();
            ctx.globalAlpha = h.alpha * (0.8 + breath * 0.2);
            ctx.fillStyle = h.color;
            ctx.translate(h.x, h.y);
            drawHeart(h.baseSize * (1 + breath * 0.1) * scaleExtra);
            ctx.restore();

            h.x += h.vx;
            h.y += h.vy;
            if (h.x < -30) h.x = W + 30;
            if (h.x > W + 30) h.x = -30;
            if (h.y < -30) h.y = H + 30;
            if (h.y > H + 30) h.y = -30;
        }

        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
})();

// ── SIDEBAR ──────────────────────────────────────
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

// ── SCROLL FADE-INS ──────────────────────────────
function initFadeIns() {
    const els = document.querySelectorAll('.fade-in:not(.visible)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 90);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
}
document.addEventListener('DOMContentLoaded', initFadeIns);

// ── POLAROID BUILDER ─────────────────────────────
function buildPolaroid(p, extraStyle = '') {
    const rot = p.rotate !== undefined ? p.rotate : 0;
    return `
    <div class="polaroid" style="transform:rotate(${rot}deg);${extraStyle}">
      <div class="polaroid-img">
        ${p.src
            ? `<img src="${p.src}" alt="${p.phrase}">`
            : `<div class="photo-placeholder">${p.emoji || '📷'}</div>`}
      </div>
      <div class="polaroid-caption">
        <span class="polaroid-phrase">${p.phrase}</span>
        <span class="polaroid-date">${p.date}</span>
      </div>
    </div>`;
}