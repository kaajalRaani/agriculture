var slideNavButtons = document.querySelectorAll(".slide-nav");

function switchToSlide(nextSlide) {
  // Get the current slide
  var currentSlide = document
    .querySelector(".flex--active")
    .getAttribute("data-slide");

  slideNavButtons.forEach(function (navButton) {
    navButton.classList.remove("active");
  });

  slideNavButtons[nextSlide - 1].classList.add("active");

  if (currentSlide === nextSlide) {
    return false;
  } else {
    var sliderWrapper = document.querySelector(".slider__warpper");
    var currentSlideContainer = document.querySelector(
      '.flex__container[data-slide="' + nextSlide + '"]'
    );
    var activeSlide = document.querySelector(".flex--active");

    currentSlideContainer.classList.add("flex--preStart");
    activeSlide.classList.add("animate--end");

    setTimeout(function () {
      currentSlideContainer.classList.remove(
        "animate--start",
        "flex--preStart"
      );
      currentSlideContainer.classList.add("flex--active");
      activeSlide.classList.add("animate--start");
      activeSlide.classList.remove("animate--end", "flex--active");
    }, 800);
  }
}

slideNavButtons.forEach(function (button, index) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    switchToSlide(index + 1);
  });
});

var autoSlideInterval = 7000; // Change to the desired interval in milliseconds
var currentSlideIndex = 0;

function autoSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slideNavButtons.length;
  switchToSlide(currentSlideIndex + 1);
}

var slideTimer = setInterval(autoSlide, autoSlideInterval);

// Optionally, you can stop the autoslide when the user interacts with the navigation buttons
slideNavButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    clearInterval(slideTimer);
    slideTimer = setInterval(autoSlide, autoSlideInterval);
  });
});


