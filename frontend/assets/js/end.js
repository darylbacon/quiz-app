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
  field: '[el="field"]',
  clearBtn: '[el="clear"]',
  saveScoreBtn: '[el="save-score-btn"]'
}

const finalScore = document.querySelector(selectors.finalScore)
const fields = document.querySelectorAll(selectors.fields)
const saveScoreBtn = document.querySelector(selectors.saveScoreBtn)

/**
 * Other global variables
 */
const mostRecentScore = localStorage.getItem('mostRecentScore')

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
    const input = field.querySelector(selectors.field)
    const clearBtn = field.querySelector(selectors.clearBtn)
    console.log(input.name)

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
}

/**
 * Wait for the page to load before initialising JS
 */
window.addEventListener('DOMContentLoaded', () => {
  init()
})
