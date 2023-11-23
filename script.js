const questions = [
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: "São Paulo", correct: false },
      { text: "Brasília", correct: true },
      { text: "Rio de Janeiro", correct: false },
      { text: "Salvador", correct: false }
    ]
  },
  {
    question: "Who painted the famous artwork 'The Starry Night'?",
    answers: [
      { text: "Claude Monet", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van Gogh", correct: true },
      { text: "Leonardo da Vinci", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for potassium?",
    answers: [
      { text: "K", correct: true },
      { text: "P", correct: false },
      { text: "Pt", correct: false },
      { text: "Kr", correct: false }
    ]
  },
  {
    question: "Who developed the theory of general relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Stephen Hawking", correct: false },
      { text: "Galileo Galilei", correct: false }
    ]
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    answers: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "South Korea", correct: false },
      { text: "Vietnam", correct: false }
    ]
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false }
    ]
  },
  {
    question: "Which instrument has black and white keys and pedals?",
    answers: [
      { text: "Guitar", correct: false },
      { text: "Piano", correct: true },
      { text: "Violin", correct: false },
      { text: "Drums", correct: false }
    ]
  },
  {
    question: "Who founded Microsoft?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Jeff Bezos", correct: false },
      { text: "Mark Zuckerberg", correct: false }
    ]
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false }
    ]
  }
];




const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("next");
const winSound = new Audio("sounds/win.mp3");
const looseSound = new Audio("sounds/loose.mp3");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


  currentQuestion.answers.forEach(answer => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    options.appendChild(button);

    
    button.dataset.correct = answer.correct;
    button.addEventListener("click", ()=> {
      button.style.color = "white";
      if(answer.correct) {
        button.style.backgroundColor = "green";
        winSound.play();
        score++;
      } else {
        button.style.backgroundColor = "red";
        looseSound.play();
      }
      Array.from(options.children).forEach(button => {
        if(button.dataset.correct === "true") {
          button.style.backgroundColor = "green";
          button.style.color = "white";
        }
        button.disabled = "true";
      })
      nextBtn.style.display = "block";
    });
  })
}


document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    nextBtn.click();
  }
});

nextBtn.addEventListener("click", ()=> {
  nextBtn.style.display = "none";
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`
    nextBtn.innerHTML = "Play again";
    nextBtn.style.display = "block";

    nextBtn.addEventListener("click", ()=> {
      startQuiz();
      nextBtn.style.display = "none";
    })
  }
})

function resetState() {
  while(options.firstChild) {
    options.removeChild(options.firstChild);
  }
}


startQuiz();

