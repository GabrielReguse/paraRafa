/* ═══════════════════════════════════
   QUIZ — Data & Logic
═══════════════════════════════════ */

const QUIZ_QUESTIONS = [
    {
        q: 'Qual foi a data em que começamos a namorar?',
        opts: ['15/03/2025', '09/04/2025', '01/05/2025', '20/02/2025'],
        correct: 1
    },
    {
        q: 'Qual lugar foi nosso primeiro "encontro"?',
        opts: ['Minha Casa', 'The Best', 'Sua Casa', 'Riacho'],
        correct: 1
    },
    {
        q: 'Em que dia damos nosso primeiro beijo?',
        opts: ['02/05/2025', '06/05/2025', '29/04/2025', '10/05/2025'],
        correct: 1
    },
    {
        q: 'Se eu pudesse escolher qualquer coisa agora, seria:',
        opts: ['Te ver', 'Te abraçar', 'Conversar com você', 'Tudo isso'],
        correct: 3
    },
    {
        q: 'Em que lugar nos beijamos pela primeira vez?',
        opts: ['Minha Casa', 'The Best', 'Riacho', 'Sua Casa'],
        correct: 2
    },
    {
        q: 'O que eu mais gosto em você?',
        opts: ['Seu jeito de rir', 'Sua inteligência', 'Seu coração', 'Tudo isso junto'],
        correct: 3
    },
    {
        q: 'Quem costuma ser mais autista?',
        opts: ['Obviamente eu', 'Claramente eu', 'O autisma lá (Gabriel)', 'Sem dúvidas eu'],
        correct: 2
    },
    {
        q: 'Qual dessas coisas sempre acontece quando nos despedimos?',
        opts: ['Abraço', 'Beijo', 'Demoramos para ir embora', 'Tudo isso'],
        correct: 3
    },
    {
        q: 'Qual foi o primeiro presente que recebi de você?',
        opts: ['Uma carta escrita à mão', 'Flores', 'Um livro', 'Uma playlist'],
        correct: 0
    },
    {
        q: 'O que eu mais amo na gente juntos?',
        opts: ['Nossos planos', 'Nosso silêncio confortável', 'Nossas risadas', 'Tudo isso'],
        correct: 3
    },
];

const RESULT_MSGS = {
    low: '💭 Parece que você não lembrou de muita coisa... mas tudo bem, o que importa é a gente estar junto. Que tal revivermos esses momentos?',
    mid: '💖 Você lembra de boa parte dos nossos momentos! Já dá pra ver que nossa história ficou guardadinha no seu coração.',
    high: '🌟 Uau! Você lembra de quase tudo! Isso me derrete completamente. Você é incrível e eu te amo muito!',
};

const LETTERS = ['A', 'B', 'C', 'D'];

let qIndex = 0;
let score = 0;
let answered = false;

/* ── CONTROLS ── */
function startQuiz() {
    qIndex = 0; score = 0;
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    answered = false;
    const q = QUIZ_QUESTIONS[qIndex];

    document.getElementById('quiz-qcount').textContent = `Pergunta ${qIndex + 1} de ${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-qtext').textContent = q.q;
    document.getElementById('quiz-fill').style.width = `${(qIndex / QUIZ_QUESTIONS.length) * 100}%`;

    const btnNext = document.getElementById('btn-next');
    btnNext.textContent = qIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima →' : 'Ver resultado ✨';
    btnNext.classList.remove('enabled');

    const optsEl = document.getElementById('quiz-opts');
    optsEl.innerHTML = q.opts.map((opt, i) => `
    <div class="quiz-option" onclick="selectOption(this, ${i})">
      <span class="quiz-option-letter">${LETTERS[i]}</span>
      ${opt}
    </div>`).join('');
}

function selectOption(el, idx) {
    if (answered) return;
    answered = true;

    const correct = QUIZ_QUESTIONS[qIndex].correct;
    document.querySelectorAll('.quiz-option').forEach((opt, i) => {
        if (i === correct) opt.classList.add('correct');
        else if (i === idx && idx !== correct) opt.classList.add('wrong');
    });

    if (idx === correct) score++;
    document.getElementById('btn-next').classList.add('enabled');
}

function nextQuestion() {
    if (!answered) return;
    qIndex++;
    if (qIndex >= QUIZ_QUESTIONS.length) { showResult(); return; }
    renderQuestion();
}

function showResult() {
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-fill').style.width = '100%';
    document.getElementById('result-score').textContent = `${score} / ${QUIZ_QUESTIONS.length}`;

    let msg, icon;
    if (score <= 4) { msg = RESULT_MSGS.low; icon = '💭'; }
    else if (score <= 7) { msg = RESULT_MSGS.mid; icon = '💖'; }
    else { msg = RESULT_MSGS.high; icon = '🌟'; }

    document.getElementById('result-icon').textContent = icon;
    document.getElementById('result-msg').textContent = msg;
}

function resetQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}