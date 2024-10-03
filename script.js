const questions = [
    {
        question: "Qual é um dos principais problemas causados pelo descarte incorreto de lixo eletrônico?",
        answers: [
            { text: "Produção de energia limpa", correct: false },
            { text: "Contaminação do solo e da água", correct: true },
            { text: "Melhoria da qualidade do ar", correct: false },
            { text: "Aumento da Biodiversidade", correct: false },
        ],
    },
    {
        question: "Qual metal é comumente encontrado em placas de circuito?",
        answers: [
            { text: "Cobre", correct: true },
            { text: "Plástico", correct: false },
            { text: "Silício", correct: false },
            { text: "Alumínio", correct: false },
        ],
    },
    {
        question: "Qual metal tóxico, presente em resíduos eletrônicos, é conhecido por prejudicar o sistema nervoso humano? que é lixo eletrônico?",
        answers: [
            { text: "Ferro", correct: false },
            { text: "Cobre", correct: false },
            { text: "Chumbo", correct: true },
            { text: "Alumínio", correct: false },
        ],
    },
    {
        question: "Qual das alternativas abaixo NÃO é um metal tóxico comumente encontrado no lixo eletrônico??",
        answers: [
            { text: "Mercúrio", correct: false },
            { text: "Cádmio", correct: false },
            { text: "Níquel", correct: false },
            { text: "Cálcio", correct: true },
        ],
    },
    {
        question: "O que o CRC faz com equipamentos eletrônicos usados?",
        answers: [
            { text: "Descarte em aterros", correct: false },
            { text: "Recupera e doa para instituições", correct: true },
            { text: "Incinera para produzir energia", correct: false },
            { text: "Exporta como sucata", correct: false },
        ],
    },
    {
        question: "Qual é o país que gera mais lixo eletrônico por habitante na América Latina?",
        answers: [
            { text: "México", correct: false },
            { text: "Brasil", correct: true },
            { text: "Peru", correct: false },
            { text: "Colômbia", correct: false },
        ],
    },
    {
        question: "Qual é o principal efeito do mercúrio liberado pelo lixo eletrônico no meio ambiente?",
        answers: [
            { text: "Aumenta a fertilidade do solo", correct: false },
            { text: "Contamina cursos d'água e afeta a vida aquática", correct: true },
            { text: "Melhora a qualidade do ar", correct: false },
            { text: "Promove a reciclagem natural de minerais", correct: false },
        ],
    },
    {
        question: "Qual porcentagem de um computador é composta por metais ferrosos",
        answers: [
            { text: "12%", correct: false },
            { text: "23%", correct: false },
            { text: "32%", correct: true },
            { text: "45%", correct: false },
        ],
    },
    {
        question: "O que significa a sigla CRC",
        answers: [
            { text: "Controle de Resíduos Culturais", correct: false },
            { text: "Ciclo de Reutilização Consciente", correct: false },
            { text: "Ciclo de Reciclagem Completo", correct: false },
            { text: "Centro de Recondicionamento de Computadores", correct: true },
        ],
    },
    {
        question: "Qual dos seguintes não é um componente eletrônico?",
        answers: [
            { text: "Cabo de alimentação", correct: false },
            { text: "Placa mãe", correct: false },
            { text: "Teclado", correct: false },
            { text: "Lata de lixo", correct: true },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    questionContainer.innerHTML += `<h2>${question.question}</h2>`;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => selectAnswer(answer));
        questionContainer.appendChild(button);
    });
}

function selectAnswer(answer) {
    const question = questions[currentQuestionIndex];
    userAnswers.push({ question: question.question, userAnswer: answer.text, correctAnswer: question.answers.find(a => a.correct).text });

    const questionContainer = document.getElementById("question-container");
    if (answer.correct) {
        score++;
        questionContainer.innerHTML += `<p class="correct">Você acertou!</p>`;
    } else {
        questionContainer.innerHTML += `<p class="incorrect">Você errou! A resposta correta é: ${question.answers.find(a => a.correct).text}</p>`;
    }

    document.getElementById("next-button").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        document.getElementById("next-button").classList.add("hidden");
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    const resultContainer = document.getElementById("result-container");
    resultContainer.classList.remove("hidden");
    document.getElementById("result-summary").innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    
    const finalReport = document.getElementById("final-report");
    finalReport.innerHTML = "";

    userAnswers.forEach(answer => {
        const answerLine = document.createElement("div");
        answerLine.classList.add("card");
        answerLine.innerHTML = `
            <p>${answer.question}</p>
            <p class="${answer.userAnswer === answer.correctAnswer ? "correct" : "incorrect"}">
                Sua resposta: ${answer.userAnswer} | Resposta correta: ${answer.correctAnswer}
            </p>
        `;
        finalReport.appendChild(answerLine);
    });

    document.getElementById("restart-button").classList.remove("hidden");
}

// Event Listeners
document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("restart-button").addEventListener("click", startGame);

function showQuestion(question) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    questionContainer.innerHTML += `<h2>${question.question}</h2>`;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => selectAnswer(answer));
        questionContainer.appendChild(button);
    });

    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

startGame();
