/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */

function getOriginalCashCounterMoneyString(textblock) {
  return textblock.innerText.split("$")[1].split("+")[0];
}
function getCashCounterEndNumber(textblock) {
  return parseInt(getOriginalCashCounterMoneyString(textblock).replace(/,/g, ""));
}
function getCashCounterStartNumber(textblock) {
  let endNumber = String(getCashCounterEndNumber(textblock));
  let start = "1";
  while (start.length < endNumber.length) {
    start = start + "0";
  }
  return parseInt(start);
}
function cashCounterVisible(textblock) {
  const originalText = textblock.innerText;
  const duration = 1500;
  let originalMoneyString = getOriginalCashCounterMoneyString(textblock);
  let endNumber = getCashCounterEndNumber(textblock);
  let startNumber = getCashCounterStartNumber(textblock);
  const startTime = performance.now();
  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentNumber = Math.floor(startNumber + (endNumber - startNumber) * progress);
    const newMoneyString = currentNumber.toLocaleString('en-US');
    textblock.textContent = originalText.replace(originalMoneyString, newMoneyString);
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  requestAnimationFrame(updateCounter);
}
function initCashCounter(textblock) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cashCounterVisible(textblock);
        observer.unobserve(entry.target);
      }
    });
  });

  // Start observing the target element
  observer.observe(textblock);
}
function initCashCounters() {
  const found = document.querySelectorAll('.cash_counter');
  found.forEach(textblock => {
    initCashCounter(textblock);
  });
}
window.addEventListener("load", initCashCounters);

/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map