/**
 * Import anything needed here
 */
// import something from 'something'

/**
 * DOM Selectors
 */
const selectors = {
  highScoresList: '[el="high-scores-list"]'
}

const highScoresList = document.querySelector(selectors.highScoresList)

/**
 * Other global variables
 */
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

/**
 * Initialise script
 */
const init = () => {
  showHighScores()
}

/**
 * Click events
 */


/**
 * Show HighScores
 */
const showHighScores = () => {
  highScoresList.innerHTML = highScores
  .map(highScore => {
    return `<li class="high-score">${highScore.name} - ${highScore.score}</li>`
  })
  .join('')
}



/**
 * Wait for the page to load before initialising JS
 */
window.addEventListener('DOMContentLoaded', () => {
  init()
})
