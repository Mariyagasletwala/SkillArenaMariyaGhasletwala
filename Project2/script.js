const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Silver", "Iron"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    
    questionContainer.classList.add("fade-in");
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = "";
    
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        const label = document.createElement("span");
        label.classList.add("option-label");
        label.textContent = String.fromCharCode(65 + index); // A, B, C, D
        button.appendChild(label);
        button.appendChild(document.createTextNode(option));
        button.onclick = () => selectAnswer(index);
        button.style.animationDelay = `${index * 0.1}s`;
        optionsElement.appendChild(button);
    });

    updateProgress();
}

function selectAnswer(selectedIndex) {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => button.disabled = true);

    const correctIndex = questions[currentQuestion].answer;
    buttons[correctIndex].style.backgroundColor = "#4caf50";
    buttons[correctIndex].style.borderColor = "#45a049";
    buttons[correctIndex].style.color = "#ffffff";

    if (selectedIndex === correctIndex) {
        score++;
    } else {
        buttons[selectedIndex].style.backgroundColor = "#f44336";
        buttons[selectedIndex].style.borderColor = "#d32f2f";
        buttons[selectedIndex].style.color = "#ffffff";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    const container = document.querySelector(".container");
    const resultElement = document.getElementById("result");
    
    container.innerHTML = "";
    container.appendChild(resultElement);
    
    const percentage = (score / questions.length) * 100;
    resultElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score}/${questions.length} (${percentage.toFixed(2)}%)</p>
    `;
    resultElement.classList.add("fade-in");
    
    let resultMessage, gifUrl;
    if (percentage >= 60) {
        resultMessage = "Congratulations! You passed!";
        gifUrl = "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif";  // Example "success" GIF
    } else {
        resultMessage = "Sorry, you failed. Better luck next time!";
        gifUrl = "https://media.giphy.com/media/TU76e2JHkPchG/giphy.gif";  // Example "failure" GIF
    }
    
    resultElement.innerHTML += `
        <p style="font-size: 1.2rem; font-weight: bold; margin-top: 1rem;">${resultMessage}</p>
        <img src="${gifUrl}" alt="Result GIF" style="max-width: 100%; height: auto; margin-top: 1rem;">
    `;

    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.onclick = resetQuiz;
    retryButton.classList.add("fade-in");
    retryButton.style.marginTop = "1rem";
    container.appendChild(retryButton);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1><i class="fas fa-lightbulb"></i> Brilliant Quiz</h1>
        <div id="question-container">
            <div id="question"></div>
            <div id="options" class="options"></div>
        </div>
        <div id="result"></div>
        <div id="progress-container">
            <div id="progress-bar"></div>
            <div id="question-counter"></div>
        </div>
    `;
    loadQuestion();
}

function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const questionCounter = document.getElementById("question-counter");
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

loadQuestion();