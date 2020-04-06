var selectors={finalScore:'[el="final-score"]',fields:'[el="input-group"]',username:'[el="username"]',clearBtn:'[el="clear"]',saveScoreBtn:'[el="save-score-btn"]'},finalScore=document.querySelector(selectors.finalScore),fields=document.querySelectorAll(selectors.fields),username=document.querySelector(selectors.username),saveScoreBtn=document.querySelector(selectors.saveScoreBtn),mostRecentScore=localStorage.getItem("mostRecentScore"),highScores=JSON.parse(localStorage.getItem("highScores"))||[],scoresToShow=5,init=function(){updateFinalScore(mostRecentScore),showHideFormClear()};saveScoreBtn.addEventListener("click",(function(e){saveHighScore(e)}));var updateFinalScore=function(e){finalScore.innerText=e},showHideFormClear=function(){fields.forEach((function(e){var o=e.querySelector(selectors.username),r=e.querySelector(selectors.clearBtn);o.addEventListener("input",(function(){r.classList.remove("dni"),o.value?saveScoreBtn.disabled=!1:(r.classList.add("dni"),saveScoreBtn.disabled=!0)})),r.addEventListener("click",(function(){o.value="",r.classList.add("dni"),saveScoreBtn.disabled=!0}))}))},saveHighScore=function(e){e.preventDefault();var o={score:mostRecentScore,name:username.value};highScores.push(o),highScores.sort((function(e,o){return o.score-e.score})),highScores.splice(scoresToShow),localStorage.setItem("highScores",JSON.stringify(highScores)),window.location.assign("/")};window.addEventListener("DOMContentLoaded",(function(){init()}));