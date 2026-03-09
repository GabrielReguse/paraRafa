/* ═══════════════════════════════════
   INÍCIO — polaroids & memory tiles
═══════════════════════════════════ */

const HOME_POLAROIDS = [
    { src: '../assets/fotoInicio1.jpg', phrase: 'O dia em que tudo começou.', date: '04/04/2025' },
    { src: '../assets/fotoInicio2.jpg', phrase: 'Nossa primeira foto juntos.', date: '13/04/2025' },
    { src: '../assets/fotoInicio3.jpg', phrase: 'O dia que me fez nunca mais esquecer seus labios.', date: '06/05/2025' },
    { src: '../assets/fotoInicio4.jpg', phrase: 'Simples e absolutamente perfeito.', date: '02/09/2025' },
    { src: '../assets/fotoInicio5.png', phrase: 'Essa album é nosso.', date: 'EU/TE/AMO' },
];

/* Angle: alternating sign, 4°–14°, jitter ±2° */
function randomAngle(prevSign) {
    const sign = prevSign !== undefined ? -Math.sign(prevSign) : (Math.random() < .5 ? 1 : -1);
    return sign * (4 + Math.random() * 10 + (Math.random() - .5) * 4);
}

function renderHomePolaroids() {
    const el = document.getElementById('home-polaroids');
    if (!el) return;
    let prev;
    el.innerHTML = HOME_POLAROIDS.map((p, i) => {
        const angle = randomAngle(prev); prev = angle;
        const vert = (i % 2 === 0 ? -1 : 1) * (6 + Math.random() * 16);
        return buildPolaroid({ ...p, rotate: angle }, `margin:${vert}px ${-6 + Math.random() * 5}px;`);
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderHomePolaroids);