/**
 * Import anything needed here
 */
// import something from 'something'

/**
 * DOM Selectors
 */
const selectors = {
  finalScore: '[el="final-score"]',
  fields: '[el="input-group"]',
  username: '[el="username"]',
  clearBtn: '[el="clear"]',
  saveScoreBtn: '[el="save-score-btn"]'
}

const finalScore = document.querySelector(selectors.finalScore)
const fields = document.querySelectorAll(selectors.fields)
const username = document.querySelector(selectors.username)
const saveScoreBtn = document.querySelector(selectors.saveScoreBtn)

/**
 * Other global variables
 */
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const scoresToShow = 5

/**
 * Initialise script
 */
const init = () => {
  updateFinalScore(mostRecentScore)
  showHideFormClear()
}

/**
 * Click events
 */
saveScoreBtn.addEventListener('click', (event) => {
  saveHighScore(event)
})

/**
 * Update final score
 */
const updateFinalScore = mostRecentScore => {
  finalScore.innerText = mostRecentScore
}

/**
 * Show/Hide Clear form fields button
 */
const showHideFormClear = () => {
  fields.forEach(field => {
    const input = field.querySelector(selectors.username)
    const clearBtn = field.querySelector(selectors.clearBtn)

    input.addEventListener('input', () => {
      clearBtn.classList.remove('dni')

      if (!input.value) {
        clearBtn.classList.add('dni')
        saveScoreBtn.disabled = true
      } else {
        saveScoreBtn.disabled = false
      }
    })

    // clearBtn.addEventListener('touchstart', resetFormFields(input, clearBtn))
    clearBtn.addEventListener('click', () => {
      input.value = ''
      clearBtn.classList.add('dni')
      saveScoreBtn.disabled = true
    })
  })
}

// const resetFormFields = (input, clearBtn) => {
//   input.value = ''
//   clearBtn.classList.add('dni')
// }

const saveHighScore = event => {
  event.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  // Push score to the array
  highScores.push(score)
  // Sort the highscore high to low
  highScores.sort((a,b) => b.score - a.score)
  // Limit the amount of scores
  highScores.splice(scoresToShow)

  localStorage.setItem('highScores', JSON.stringify(highScores))

  window.location.assign('/')
}

/**
 * Wait for the page to load before initialising JS
 */
window.addEventListener('DOMContentLoaded', () => {
  init()
})
