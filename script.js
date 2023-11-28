const question = [
    {
        question : "Apa singkatan dari HTML?",
        answers:[
            {text:"Hyperlinks and Text Markup Language",correct:false},
            {text:"Hypertext Markup Language",correct:true},
            {text:"Home Tool Markup Language",correct:false},
            {text:" Hyper Text Makeup Language",correct:false}
        ]
    },
    {
        question : "Apa fungsi dari CSS dalam pengembangan web?",
        answers:[
            {text:"Mengatur struktur dan konten dari halaman web",correct:false},
            {text:"Membuat interaksi dinamis di halaman web",correct:false},
            {text:"Mengelola basis data dan server",correct:false},
            {text:"Memperindah tampilan visual halaman web",correct:true}
        ]
    },
    {
        question : "Bahasa pemrograman mana yang digunakan untuk pengembangan aplikasi Android?",
        answers:[
            {text:"Java",correct:true},
            {text:"Python",correct:false},
            {text:"C++",correct:false},
            {text:"JavaScript",correct:false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();