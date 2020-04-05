/**
 * Import anything needed here
 */
// import something from 'something'

/**
 * DOM Selectors
 */
const selectors = {
  fields: '.input-group',
  field: '[el="field"]',
  clearBtn: '[el="clear"]'
}
const fields = document.querySelectorAll(selectors.fields)

/**
 * Other global variables
 */


/**
 * Initialise script
 */
const init = () => {
  showHideFormClear()
}

/**
 * Click events
 */

/**
 * Show/Hide Clear form fields button
 */
const showHideFormClear = () => {
  fields.forEach(field => {
    const input = field.querySelector(selectors.field)
    const clearBtn = field.querySelector(selectors.clearBtn)

    input.addEventListener('input', () => {
      clearBtn.classList.remove('dni')
    })

    // clearBtn.addEventListener('touchstart', resetFormFields(input, clearBtn))
    clearBtn.addEventListener('click', () => {
      input.value = ''
      clearBtn.classList.add('dni')
    })
  })
}

// const resetFormFields = (input, clearBtn) => {
//   input.value = ''
//   clearBtn.classList.add('dni')
// }

/**
 * Wait for the page to load before initialising JS
 */
window.addEventListener('DOMContentLoaded', () => {
  init()
})
