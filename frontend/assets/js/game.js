/**
 * Import anything needed here
 */
// import something from 'something'

/**
 * DOM Selectors
 */
const selectors = {
  progressBar: '[el="progress-bar-full"]',
  loader: '[el="loader"]',
  game: '[el="game"]',
  questionCounter: '[el="question-counter"]',
  scoreCounter: '[el="score-counter"]',
  question: '[el="question"]',
  choices: '[el="choice"]',
  choiceText: '[el="choice-text"]',
}

const loader = document.querySelector(selectors.loader)
const game = document.querySelector(selectors.game)
const question = document.querySelector(selectors.question)
const choices = [...document.querySelectorAll(selectors.choices)]
let progressBar = document.querySelector(selectors.progressBar)
let questionCounterText = document.querySelector(selectors.questionCounter)
let scoreCounterText = document.querySelector(selectors.scoreCounter)

/**
 * Other global variables
 */
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = []

const correctBonus = 10
const maxQuestions = 3

/**
 * Initialise script
 */
const init = () => {
  // startGame()
  getQuestions()
}

/**
 * Click events
 */
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) {
      return
    } else {
      acceptingAnswers = false

      const selectedChoice = choice
      const selectedAnswer = selectedChoice.dataset['number']
      let classStatus = 'incorrect'

      if (selectedAnswer == currentQuestion.answer) {
        classStatus = 'correct'
        incrementScore(correctBonus)
      }

      choice.classList.add(classStatus)
      setTimeout(() => {
        choice.classList.remove(classStatus)
        getNewQuestion()
      }, 1000);
    }
  })
})

/**
 * Get Questions
 */
const getQuestions = () => {
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(res => {
      return res.json()
    })
    .then(loadedQuestions => {
      questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
          question: loadedQuestion.question
        }

        const answerChoices = [...loadedQuestion.incorrect_answers]
        // Put the answer in a random position in the array
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
        // Minus 1 to make it zero based index
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer)

        // Add choices to the formattedQuestion object
        answerChoices.forEach((choice, index) => {
          formattedQuestion[`choice${index+1}`] = choice
        })

        return formattedQuestion
      })
      startGame()
    })
    .catch(err => {
      console.error(err)
    })
  }

  /**
   * Start game function
   */
  const startGame = () => {
    questionCounter = 0
    score = 0
    // get complete copy of question array using spread operator
    availableQuestions = [...questions]
    getNewQuestion()
    // hide the spinner and show the quiz
    loader.classList.add('hidden')
    game.classList.remove('hidden')
}

/**
 * Get a new question function
 */
const getNewQuestion = () => {
  // show the end page if there's no more question
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }

  questionCounter++
  // Update the question number for the user
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`
  // Update the progress bar percentage
  progressBar.style.width = `${(questionCounter/maxQuestions) * 100}%`
  // get a random number based on the amount of questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  // set the text of the question to that random question
  question.innerText = decodeEntities(currentQuestion.question)

  // loop over choices and set the choice to the random question answers
  choices.forEach(choice => {
    const number = choice.dataset['number']
    const choiceText = choice.querySelector(selectors.choiceText)

    choiceText.innerText = decodeEntities(currentQuestion[`choice${number}`])
  })

  // get rid of the question that has just been used so it doesn't appear again
  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true
}

const incrementScore = num => {
  score += num
  scoreCounterText.innerText = score
}

/**
 * Helper Functions
 */
const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div')

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
      element.innerHTML = str
      str = element.textContent
      element.textContent = ''
    }

    return str
  }

  return decodeHTMLEntities
})()

/**
 * Wait for the page to load before initialising JS
 */
window.addEventListener('DOMContentLoaded', () => {
  init()
})
