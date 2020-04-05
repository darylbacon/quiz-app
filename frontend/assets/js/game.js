// Import anything here
// import something from 'something'

// DOM selectors
const selectors = {
  question: '[el="question"]',
  choices: '[el="choice"]',
  choiceText: '[el="choice-text"]'
}

const question = document.querySelector(selectors.question)
const choices = [...document.querySelectorAll(selectors.choices)]

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
]

const correctBonus = 10
const maxQuestions = 3

// Initialise script
const init = () => {
  startGame()
}

// Click event listeners
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) {
      return
    } else {
      acceptingAnswers = false

      const selectedChoice = choice
      const selectedAnswer = selectedChoice.dataset['number']
      const classStatus = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      choice.classList.add(classStatus)
      setTimeout(() => {
        choice.classList.remove(classStatus)
        getNewQuestion()
      }, 1000);
    }
  })
})

const startGame = () => {
  questionCounter = 0
  score = 0
  // get complete copy of question array using spread operator
  availableQuestions = [...questions]
  console.log(availableQuestions)
  getNewQuestion()
}

getNewQuestion = () => {
  // show the end page if there's no more question
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    return window.location.assign('/end.html')
  }

  questionCounter++
  // get a random number based on the amount of questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  // set the text of the question to that random question
  question.innerText = currentQuestion.question

  // loop over choices and set the choice to the random question answers
  choices.forEach(choice => {
    const number = choice.dataset['number']
    const choiceText = choice.querySelector(selectors.choiceText)

    choiceText.innerText = currentQuestion[`choice${number}`]
  })

  // get rid of the question that has just been used so it doesn't appear again
  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true
}

window.addEventListener('DOMContentLoaded', () => {
  init()
})
