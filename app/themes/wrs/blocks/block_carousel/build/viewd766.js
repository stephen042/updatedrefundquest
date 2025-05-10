/******/ (() => { // webpackBootstrap
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
// console.log( 'Hello World! (from create-block-block_carousel block)' );

let carousels = [];

//============================================

function getCarouselStage(carousel) {
  return carousel.children[0].children[1];
}
function getCarouselPrevBtn(carousel) {
  return carousel.children[0].children[0];
}
function getCarouselNextBtn(carousel) {
  return carousel.children[0].children[2];
}
function getCarouselStageWidth(carousel) {
  let stage = getCarouselStage(carousel);
  return stage.offsetWidth;
}
function getCarouselSlider(carousel) {
  return getCarouselStage(carousel).children[0];
}
function getCarouselItemContainer(carousel) {
  let slider = getCarouselSlider(carousel);
  if (slider.children[0].classList.contains('wp-block-query')) {
    return slider.children[0].children[0];
  }
  return slider;
}
function getCarouselSliderWidth(carousel) {
  let slider = getCarouselSlider(carousel);
  return slider.scrollWidth;
}
function getCarouselItemWidth(carousel) {
  let stage_width = getCarouselStageWidth(carousel);
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 800) {
    return stage_width;
  }
  if (carousel.classList.contains('carousel_full')) {
    return stage_width;
  }
  if (carousel.classList.contains('carousel_thirds')) {
    return (stage_width - 40) / 3;
  }
}
function getCarouselItemMarginBreakpoint(carousel) {
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 800) {
    return 0;
  }
  if (carousel.classList.contains('carousel_full')) {
    return 0;
  }
  if (carousel.classList.contains('carousel_thirds')) {
    return 3;
  }
}
function getCarouselPagingDotsContainer(carousel) {
  return carousel.children[1];
}
function getCurrentCarouselPage(carousel) {
  let stage_width = getCarouselStageWidth(carousel);
  let slider = getCarouselSlider(carousel);
  let marginStr = slider.style.marginLeft;
  let margin = 0;
  if (marginStr != "") {
    margin = Math.abs(parseInt(marginStr.replace("px", "")));
  }
  let sliderPos = margin;
  if (sliderPos == 0) {
    return 1;
  }
  let division = sliderPos / stage_width;
  return Math.round(division) + 1;
}
function getTotalCarouselPages(carousel) {
  let stage_width = getCarouselStageWidth(carousel);
  let slider_width = getCarouselSliderWidth(carousel);
  let max_pages = Math.ceil(slider_width / stage_width);
  let diff = max_pages - slider_width / stage_width;
  if (diff <= 0.9) {
    return max_pages;
  }
  return Math.floor(slider_width / stage_width);
}
function getElementCarousel(element) {
  let parent = element;
  let count = 0;
  while (count < 10) {
    if (parent.classList.contains("wp-block-wrs-block-carousel")) {
      break;
    }
    parent = parent.parentElement;
    count++;
  }
  return parent;
}

//============================================

function updateCarouselStageWidth(carousel, completed_callback) {
  let slider = getCarouselSlider(carousel);
  let stage = getCarouselStage(carousel);
  slider.style.display = "none";
  setTimeout(function () {
    stage.style.width = String(getCarouselStageWidth(carousel)) + "px";
    slider.style.display = "flex";
    setTimeout(function () {
      completed_callback();
    }, 1000);
  }, 1000);
}
function resetCarouselStageWidth(carousel) {
  let stage = getCarouselStage(carousel);
  stage.style.width = "auto";
}
function resetCarouselSliderPosition(carousel) {
  let slider = getCarouselSlider(carousel);
  slider.style.marginLeft = 0;
}
function updateCarouselItemWidths(carousel, completed_callback) {
  updateCarouselStageWidth(carousel, function () {
    let slider = getCarouselItemContainer(carousel);
    let itemWidth = getCarouselItemWidth(carousel);
    let marginBreakpoint = getCarouselItemMarginBreakpoint(carousel);
    let i = 1;
    Array.from(slider.children).forEach(child => {
      child.style.width = String(itemWidth) + "px";
      if (marginBreakpoint != 0) {
        if (i % marginBreakpoint == 0) {
          child.style.marginRight = 0;
        } else {
          child.style.marginRight = "20px";
        }
      } else {
        child.style.marginRight = 0;
      }
      i = i + 1;
    });
    completed_callback();
  });
}
function updateCarouselPagingButtons(carousel) {
  let current_page = getCurrentCarouselPage(carousel);
  let total_pages = getTotalCarouselPages(carousel);
  let container = getCarouselPagingDotsContainer(carousel);
  container.innerHTML = '';
  let built = 1;
  while (built <= total_pages) {
    let dot = document.createElement('div');
    if (built == current_page) {
      dot.className = "paging_btn active page_" + String(built);
    } else {
      dot.className = "paging_btn page_" + String(built);
    }
    dot.onclick = carouselPagingDotPressed;
    container.appendChild(dot);
    built++;
  }
}
function updateCarouselNextPrevButtons(carousel) {
  let current_page = getCurrentCarouselPage(carousel);
  let total_pages = getTotalCarouselPages(carousel);
  let prev_btn = getCarouselPrevBtn(carousel);
  if (current_page > 1) {
    prev_btn.style.opacity = 1.0;
  } else {
    prev_btn.style.opacity = 0.0;
  }
  let next_btn = getCarouselNextBtn(carousel);
  if (current_page < total_pages) {
    next_btn.style.opacity = 1.0;
  } else {
    next_btn.style.opacity = 0.0;
  }
}
function updateCarouselButtons(carousel) {
  updateCarouselNextPrevButtons(carousel);
  updateCarouselPagingButtons(carousel);
}
function setupCarouselNextPrevButtonClickEvents(carousel) {
  let prev_btn = getCarouselPrevBtn(carousel);
  prev_btn.onclick = carouselPrevBtnPressed;
  let next_btn = getCarouselNextBtn(carousel);
  next_btn.onclick = carouselNextBtnPressed;
}

//============================================

function gotoCarouselPage(carousel, page) {
  let slider = getCarouselSlider(carousel);
  let stage_width = getCarouselStageWidth(carousel);
  let endMargin = (page - 1) * stage_width * -1;
  let startMargin = slider.style.marginLeft != "" ? parseInt(slider.style.marginLeft.replace("px", "")) : 0;
  const duration = 1000;
  const startTime = performance.now();
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    const currentMargin = startMargin + (endMargin - startMargin) * easedProgress;
    slider.style.marginLeft = currentMargin + 'px';
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      updateCarouselButtons(carousel);
    }
  }
  requestAnimationFrame(animate);
}

//============================================

function carouselNextBtnPressed(e) {
  let carousel = getElementCarousel(e.target);
  let current_page = getCurrentCarouselPage(carousel);
  let total_pages = getTotalCarouselPages(carousel);
  if (current_page < total_pages) {
    let next_page = current_page + 1;
    gotoCarouselPage(carousel, next_page);
  }
}
function carouselPrevBtnPressed(e) {
  let carousel = getElementCarousel(e.target);
  let current_page = getCurrentCarouselPage(carousel);
  if (current_page > 1) {
    let next_page = current_page - 1;
    gotoCarouselPage(carousel, next_page);
  }
}
function carouselPagingDotPressed(e) {
  let carousel = getElementCarousel(e.target);
  let page = parseInt(String(e.target.classList).split(" ").slice(-1).pop().replace("page_", ""));
  let current_page = getCurrentCarouselPage(carousel);
  if (page != current_page) {
    gotoCarouselPage(carousel, page);
  }
}

//============================================

let lastCarouselWindowWidth = window.innerWidth;
function carouselResized() {
  let newWindowWidth = window.innerWidth;
  if (newWindowWidth == lastCarouselWindowWidth) {
    return;
  }
  lastCarouselWindowWidth = newWindowWidth;
  carousels.forEach(carousel => {
    resetCarouselStageWidth(carousel);
    resetCarouselSliderPosition(carousel);
    updateCarouselItemWidths(carousel, function () {
      updateCarouselButtons(carousel);
    });
  });
}

//============================================

function initCarousel(carousel) {
  carousels.push(carousel);
  updateCarouselItemWidths(carousel, function () {
    updateCarouselButtons(carousel);
    setupCarouselNextPrevButtonClickEvents(carousel);
    window.addEventListener('resize', carouselResized);
  });
}
function initCarousels() {
  const found = document.querySelectorAll('.wp-block-wrs-block-carousel');
  found.forEach(carousel => {
    initCarousel(carousel);
  });
}
window.onload = initCarousels;
/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map