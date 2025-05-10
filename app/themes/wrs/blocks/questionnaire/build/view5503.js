/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
let questionnaire_values = {};
let current_slide = 0; // Start with the first slide
const questionnaire = document.querySelector('.questionnaire_stage');
function getQuestionnaireSlider() {
  return document.querySelector('.questionnaire_slider');
}
function getSlidePosition(slideIndex) {
  const slider = getQuestionnaireSlider();
  const slide = slider.children[slideIndex];
  return slide.offsetLeft;
}
function setupQuestionnaireAnswerEvents() {
  const slides = [...getQuestionnaireSlider().children];

  // Set up back buttons
  slides.forEach((slide, index) => {
    if (index !== 0) {
      let back_button = document.createElement('div');
      back_button.className = 'questionnaire_back_btn';
      back_button.innerHTML = '< Back';
      back_button.addEventListener('click', () => gotoQuestionnairePage(index));
      slide.appendChild(back_button);
    }
  });

  // Slide 1
  let slide_1_submit = slides[0].querySelector('input[type="submit"]');
  slide_1_submit.addEventListener('click', function () {
    const input = slides[0].querySelector('input[type="text"]');
    if (input.value !== "") {
      // Need to work out what to do if under 5000
      // if(input.value < 5000){
      //     gotoQuestionnaireEndPage('no-end');
      // } else {
      setQuestionnaireValue('amount_lost', input.value);
      gotoQuestionnairePage(2);
      // }
    }
  });

  // Slide 2
  const payment_methods = ['Bank transfer', 'Card payment', 'International payment gateway', 'Crypto transfer', 'Other'];
  payment_methods.forEach((type, index) => {
    const method_btn = slides[1].querySelectorAll('.questionnaire_answer_btn')[index];
    method_btn.addEventListener('click', function () {
      setQuestionnaireValue('method_of_transfer', type);
      gotoQuestionnairePage(3);
    });
  });

  // Slide 3
  let slide_3_submit = slides[2].querySelector('input[type="submit"]');
  slide_3_submit.addEventListener('click', function () {
    const input = slides[2].querySelector('input[type="text"]');
    if (input.value !== "") {
      setQuestionnaireValue('name', input.value);
      gotoQuestionnairePage(4);
    }
  });

  // Slide 4
  let slide_4_submit = slides[3].querySelector('input[type="submit"]');
  slide_4_submit.addEventListener('click', function () {
    const input = slides[3].querySelector('input[type="text"]');
    if (input.value !== "") {
      setQuestionnaireValue('phone', input.value);
      gotoQuestionnairePage(5);
    }
  });

  // Slide 5
  let slide_5_submit = slides[4].querySelector('input[type="submit"]');
  slide_5_submit.addEventListener('click', function () {
    const input = slides[4].querySelector('input[type="email"]');
    if (input.value !== "") {
      setQuestionnaireValue('email', input.value);
      gotoQuestionnairePage(6);
    }
  });

  // Slide 6
  const heard_of_us = ['Facebook/Instagram', 'Google', 'Podcast', 'Online advertisement', 'News article/website', 'Word of mouth', 'Other'];
  heard_of_us.forEach((type, index) => {
    const method_btn = slides[5].querySelectorAll('.questionnaire_answer_btn')[index];
    method_btn.addEventListener('click', function () {
      setQuestionnaireValue('heard_of_us', type);
      gotoQuestionnairePage(7);
      sendQuestionnaire();
    });
  });

  // Slide 7 (Review Slide)
  const submit_btn = slides[6].querySelector('.questionnaire_submit');
  submit_btn.addEventListener('click', function () {
    gotoQuestionnaireEndPage('sent-end');
  });
}
function setupQuestionnaireEvents(questionnaire) {
  let phoneInput = getQuestionnaireSlideAnswerElement(questionnaire, 4, 0);
  phoneInput.addEventListener('input', filterQuestionFieldForPhoneNumber);
}
function filterQuestionFieldForPhoneNumber(inputEvent) {
  let input = inputEvent.target;
  const filteredValue = input.value.replace(/[^0-9+]/g, '');
  input.value = filteredValue;
}
function getQuestionnaireSlideAnswerElement(questionnaire, slide_number, answer_i) {
  let slider = getQuestionnaireSlider();
  let slide_i = slide_number - 1;
  let slide = slider.children[slide_i];
  let answers = slide.children[slide_number === 1 ? 3 : 2];
  return answers.children[answer_i];
}
function setQuestionnaireValue(key, value) {
  questionnaire_values[key] = value;
}
function sendQuestionnaire() {
  const send = `-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7"

3918
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7_version"

5.9.6
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7_locale"

en_GB
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7_unit_tag"

wpcf7-f3918-p3904-o1
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7_container_post"

3904
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="_wpcf7_posted_data_hash"


-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="contact-name"

${questionnaire_values['name']}
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="contact-phone"

${questionnaire_values['phone']}
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="contact-email"

${questionnaire_values['email']}
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="amount-lost"

${questionnaire_values['amount_lost']}
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="method-of-transfer"

${questionnaire_values['method_of_transfer']}
-----------------------------156668624431635078444246009338
Content-Disposition: form-data; name="heard-of-us"

${questionnaire_values['heard_of_us']}
-----------------------------156668624431635078444246009338--`;
  console.log(questionnaire_values);
  fetch("/wp-json/contact-form-7/v1/contact-forms/3918/feedback", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=---------------------------156668624431635078444246009338'
    },
    body: send
  }).then(response => response.json()).then(data => {
    // console.log()
  });
  // .catch(error => console.error('Error:', error));
}
function gotoQuestionnaireEndPage(address) {
  window.location = "/start-your-claim/" + address;
}
function smoothScrollTo(element, target, duration, currentIndex, newIndex) {
  const start = element.scrollLeft;
  const distance = target - start;
  const startTime = performance.now();
  const slides = [...element.children];
  const currentSlide = slides[currentIndex];
  const newSlide = slides[newIndex];
  window.scrollTo({
    top: document.querySelector('.questionnaire_container').offsetTop,
    behavior: 'smooth'
  });
  // Ensure the new slide is visible before starting the animation
  newSlide.style.position = 'relative';
  newSlide.style.opacity = '1';
  function scroll() {
    const now = performance.now();
    const timeElapsed = now - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Ease function: Ease-in-out cubic (can be changed as needed)
    const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    element.scrollLeft = start + distance * ease;

    // Slide the old element off the screen by adjusting its opacity
    currentSlide.style.opacity = `${1 - ease}`;
    newSlide.style.opacity = `${ease}`;
    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    } else {
      // Ensure final positions are set correctly after the animation
      currentSlide.style.opacity = '0';
      newSlide.style.opacity = '1';
    }
  }
  requestAnimationFrame(scroll);
}
function getAnswersForReviewPage() {
  let claim_review_items = [...document.querySelector('.questionnaire_claim_review').children];
  claim_review_items.forEach(item => {
    if (questionnaire_values.hasOwnProperty(item.className)) {
      item.innerHTML = questionnaire_values[item.className];
    }
  });
}
function gotoQuestionnairePage(page) {
  const slider = getQuestionnaireSlider();
  const position = getSlidePosition(page - 1);
  if (page === document.querySelector('.questionnaire_slider').children.length) {
    getAnswersForReviewPage();
  }
  ;
  smoothScrollTo(slider, position, 500, current_slide, page - 1); // 600ms duration for smooth scroll

  // Update the active class
  const slides = [...slider.children];
  slides.forEach((slide, index) => {
    if (index === page - 1) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  current_slide = page - 1; // Update the current slide index
}
function initQuestionnaire() {
  const loading = document.querySelector('.questionnaire_loading');
  setupQuestionnaireEvents(questionnaire);
  setTimeout(() => {
    loading.classList.add('hide');
  }, 100);
  setupQuestionnaireAnswerEvents();

  // HIDE START CLAIM BUTTON WHEN ON FORM
  const buttons = document.querySelectorAll('.wp-block-button__link');
  buttons.forEach(button => {
    if (button.innerHTML === 'Start claim') {
      button.style.display = 'none';
    }
  });
  window.addEventListener('resize', () => {
    const position = getSlidePosition(current_slide);
    getQuestionnaireSlider().scrollLeft = position;
  });
}
window.addEventListener("DOMContentLoaded", initQuestionnaire);
/******/ })()
;
//# sourceMappingURL=view.js.map