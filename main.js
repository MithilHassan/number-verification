const screen = document.querySelector(".mobile__screen");
const slides = document.querySelectorAll(".slide");
const sliderCount = document.querySelector(".slider__count");
const progress = document.querySelector(".progress__animation");
let slide = 0;

// SlideShow & progressBar

for (let i = 0; i < slides.length - 1; i++) {
  var count = document.createElement("div");
  count.classList.add("count");
  count.style.width = 100 / (slides.length - 1) + "%";
  sliderCount.appendChild(count);
}

// Slide on click

const handleSlide = (slide) => {
  slides[slide].classList.add("active");
  slides[slide - 1].classList.remove("active");
  progress.style.width = (100 / (slides.length - 1)) * slide + "%";
};

const slideShow = () => {
  if (slide < slides.length - 1) {
    slide++;
    handleSlide(slide);
  }
};

screen.addEventListener("click", slideShow);

// Auto slide

const autoSlide = () => {
  if (slide < slides.length - 1) {
    slide++;
    handleSlide(slide);
  } else {
    document.querySelector(".input__number").focus();
    clearInterval(myInterval);
  }
};

const myInterval = setInterval(autoSlide, 3000);

// Input Numbers

const overlay = document.querySelector(".screen__overlay");
const bottom = document.querySelector(".screen__bottom");
const numbers = document.querySelectorAll(".number");
const inputNumber = document.querySelector(".input__number");
const sendButton = document.querySelector(".btn__send");
const getInput = () => inputNumber.value;
const setInput = (num) => (inputNumber.value = num);
const inputs = document.querySelector(".inputs").querySelectorAll("input");

// Get input from keypad

numbers.forEach((num) => {
  num.addEventListener("click", (event) => {
    let input = getInput();
    setInput(input + event.target.innerText);
    validateInput();
  });
});

// Delete input number

const deleteInput = () => {
  let input = getInput();
  setInput(input.substring(0, input.length - 1));
  validateInput();
};

// Focus Input & Popup keypad

const toggleOverlay = (isFocus) => {
  isFocus
    ? overlay.classList.add("active") +
      bottom.classList.add("active") +
      inputNumber.focus()
    : overlay.classList.remove("active") + bottom.classList.remove("active");
};

// Validate input to enable send button

const validateInput = () => {
  let input = getInput();
  input.length >= 10 && sendButton.classList.add("validate");
  input.length <= 10 && sendButton.classList.remove("validate");
};

// Handle Send Button

function handleSend(counter) {
  if (counter < 100) {
    setTimeout(function () {
      counter++;
      handleSend(counter);
    }, 50);
  }
  const stages = sendButton.dataset.stages
    .split(",")
    .map((stage) => stage.split(":"));

  stages.sort((stageA, stageB) => {
    return stageB[0] - stageA[0];
  });

  const activeStage = stages.find((stage) => {
    return counter >= stage[0];
  });

  sendButton.style.setProperty("--afterBack", counter + "%");
  sendButton.querySelector("span").innerText = `${activeStage[1]}...`;

  // switch screen

  if (counter == 100) {
    document.body.style.backgroundImage = "linear-gradient(180deg, #fff, #fff)";
    screen.classList.add("screen2");
    document.getElementById("first").focus();

    // input otp from custom keypad

    let inp = -1;

    numbers.forEach((num) => {
      num.addEventListener("click", (event) => {
        if (event) {
          if (inp <= 2) {
            inp++;
            inputs[inp].value = event.target.innerText;
          }
        }
      });
    });

    document.querySelector(".delete").addEventListener("click", () => {
      if (inp >= 0) {
        inputs[inp].value = "";
        inp--;
      }
    });

    // input otp from keyboard

    document.addEventListener("keydown", function (event) {
      if (event.code === "Backspace") {
        if (inp >= 0) {
          inputs[inp].focus();
          inp--;
        }
      } else {
        if (inp <= 2) {
          inp++;
          inputs[inp].focus();
        }
      }
    });
  }
}
