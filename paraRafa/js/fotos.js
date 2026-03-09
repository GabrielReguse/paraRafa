/* ═══════════════════════════════════
   FOTOS — gallery render
═══════════════════════════════════ */

const GALLERY_POLAROIDS = [
    { src: '../assets/fotos1.jpg', phrase: 'Uma beldade com uma maquiagem linda.', date: '06/03/2026', blurb: 'Desde esse dia tudo ficou mais bonito.' },
    { src: '../assets/fotos2.jpg', phrase: 'O autismo não pertence somente a mim.', date: '31/01/2026', blurb: 'Contigo até o silêncio é confortável.' },
    { src: '../assets/fotos3.jpg', phrase: 'Essa maquiagem e esse cabelos são perfeitos.', date: '15/01/2026', blurb: 'Cada pequeno ritual ficou mais especial.' },
    { src: '../assets/fotos4.jpeg', phrase: 'Xingando todos, como sempre', date: '30/10/2025', blurb: 'Não lembro muito do filme, só de você.' },
    { src: '../assets/fotos5.jpg', phrase: 'Rodrigo Ramos Nogueira.', date: '67/67/6767', blurb: 'Horas viraram minutos do seu lado.' },
    { src: '../assets/fotos6.jpg', phrase: 'Para esse zombie eu me entrego livremente.', date: '11/10/2025', blurb: 'Você colore até os dias cinzas.' },
    { src: '../assets/fotos7.jpg', phrase: 'Lembranças juntos são sempre boas.', date: '02/10/2025', blurb: 'Uma playlist inteira de memórias nossas.' },
    { src: '../assets/fotos8.jpg', phrase: 'Esse riacho tem cada memória boa.', date: '04/09/2025', blurb: 'Como se o mundo respirasse mais fundo.' },
    { src: '../assets/fotos9.jpg', phrase: 'Queria eu estar nessa praia.', date: '02/08/2025', blurb: 'As coisas simples são as que mais importam.' },
];

/* Intercalated quotes to break the flow */
const QUOTES = [
    'Cada memória com você é um presente que eu atesoro pra sempre.',
    'Os melhores momentos da minha vida têm você no centro.',
    'Obrigado por existir e por fazer parte dos meus dias.',
];

/* Left cards: negative angles; right cards: positive */
const ANGLE_POOL = {
    left: [-10, -5, -13, -7, -11, -4],
    right: [8, 14, 6, 11, 5, 13],
};

function galleryAngle(side, idx) {
    const pool = ANGLE_POOL[side];
    const base = pool[idx % pool.length];
    return base + (Math.random() - .5) * 3;
}

function renderGallery() {
    const gallery = document.getElementById('fotos-gallery');
    if (!gallery) return;

    let html = '';
    let quoteIdx = 0;

    GALLERY_POLAROIDS.forEach((p, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const angle = galleryAngle(side, Math.floor(i / 2));
        const blurbAlign = side === 'left' ? '' : '';

        /* Inject a quote every 3rd photo */
        if (i > 0 && i % 3 === 0 && quoteIdx < QUOTES.length) {
            html += `<div class="fotos-quote fade-in"><p>${QUOTES[quoteIdx++]}</p></div>`;
        }

        html += `
      <div class="fotos-row ${side} fade-in">
        ${buildPolaroid({ ...p, rotate: angle })}
        <div class="fotos-blurb">
          <span class="blurb-icon">${['🌹', '✨', '🫶', '💫', '🌷', '💌', '🎵', '🌊', '🍃'][i]}</span>
          <p>${p.blurb}</p>
        </div>
      </div>`;
    });

    gallery.innerHTML = html;
    if (typeof initFadeIns === 'function') initFadeIns();
}

document.addEventListener('DOMContentLoaded', renderGallery);