export function initCarousel() {
  const slider = document.querySelector(".slide-wrap");
  const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".slide");
  const buttons = document.querySelectorAll(".arrow");
  const controls = document.querySelectorAll(".dash");

  let cardIndex = 0;
  let intervalId;
  let controlAnimation = controls[cardIndex].querySelector('.dash-progress').animate(
    {
      width: "100%",
    },
    5000
  );

  //Toggle active class to progress control
  const toggleActive = (control) => {
    const currActive = document.querySelector(".progress .active");
    currActive.classList.remove("active");
    control.classList.add('active');

    if (controlAnimation) controlAnimation.cancel();
    controlAnimation = controls[cardIndex].querySelector('.dash-progress').animate(
      {
        width: "100%",
      },
      5000
    );
  }

  // Start autoSlider
  let timer;
  let startTime = new Date();
  let leftTime;
  let prevLeftTime;
  const resumeSlider = (time) => {
    const restTime = prevLeftTime ? 5000 - time - prevLeftTime : 5000 - time;
    startTime = new Date();
    timer = setTimeout(() => {
      ++cardIndex;
      if (cardIndex === cards.length) {
        cardIndex = 0;
      } else {
        cardIndex = cardIndex < 0 ? cards.length - 1 : cardIndex;
      }
      toggleActive(controls[cardIndex]);
      carousel.style.transform = `translate(-${cardIndex * 100}%)`;
      autoSlider();
    }, restTime);
  }
  const autoSlider = () => {
    startTime = new Date();
    timer = undefined;
    intervalId = setInterval(() => {
      ++cardIndex;
      showCard();
    }, 5000);
  }

  autoSlider();

  // Show card (calculate card's index and add transform style to carousel)
  const showCard = () => {
    if (cardIndex === cards.length) {
      cardIndex = 0;
    } else {
      cardIndex = cardIndex < 0 ? cards.length - 1 : cardIndex;
    }
    toggleActive(controls[cardIndex]);
    carousel.style.transform = `translate(-${cardIndex * 100}%)`;
    startTime = new Date();
    leftTime = 0;
    timer = undefined;
    prevLeftTime = 0;
  }

  // Carousel buttons
  const clickButton = (e) => {
    clearInterval(intervalId);
    clearTimeout(timer);
    cardIndex += e.currentTarget.id === "next" ? 1 : -1;
    showCard();
    autoSlider();
  }

  const clickControl = (control, index) => {
    control.addEventListener("click", () => {
      clearInterval(intervalId);
      clearTimeout(timer);
      cardIndex = index;
      toggleActive(control);
      showCard();
      autoSlider();
    })
  }

  buttons.forEach((btn) => btn.addEventListener("click", clickButton));
  controls.forEach(clickControl);

  // Stop autoSlider on mouseover
  const pauseSlide = () => {
    if (timer) {
      prevLeftTime = leftTime;
      leftTime = 0;
      clearTimeout(timer);
    } else {
      prevLeftTime = 0;
    };
    leftTime = new Date() - startTime;
    clearInterval(intervalId);
    controlAnimation.pause();
  };

  const playSlide = () => {
    resumeSlider(leftTime);
    controlAnimation.play();
  }

  slider.addEventListener("mouseenter", pauseSlide);

  // Start autoSlider on mouseleave
  slider.addEventListener("mouseleave", playSlide);

  //Change slides on touch
  let startX = 0;
  let endX = 0;
  let touchTimer;

  slider.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startX = e.touches[0].clientX;
    touchTimer = setTimeout(pauseSlide, 0);
  });
  
  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
      clearTimeout(touchTimer);
      let diff = startX - endX;

      clearInterval(intervalId);
      clearTimeout(timer);
      if (Math.abs(diff) > 30 && endX !=0) {
        if (diff > 0) {
          cardIndex += 1;
        } else {
          cardIndex -= 1;
        }
        endX = 0;
        showCard();
        autoSlider();

      } else {
        clearTimeout(touchTimer);
        playSlide();
      }
      
  });
}
