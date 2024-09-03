let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
const questionNumber = document.getElementById("question-number");
let answerValue;
let operatorQuestion;
let score = 0;
let questionCount = 0;
const totalQuestions = 20;

// Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Generate Question
const questionGenerator = () => {
  // Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

  // For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator === "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);

  // For placing the input at random position
  let randomVar = randomValue(1, 5);

  if (randomVar === 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar === 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar === 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }

  // Update question number
  questionNumber.innerHTML = `Question: ${questionCount + 1}`;
};

// Handle Submit Button Click
submitBtn.addEventListener("click", () => {
  let userInput = document.getElementById("inputValue").value;
  if (userInput) {
    if (userInput == answerValue) {
      score++;
    }
    questionCount++;
    if (questionCount >= totalQuestions) {
      showResult(`<span>Game Over!</span> Your final score is ${score}/${totalQuestions}`);
    } else {
      questionGenerator();
    }
  } else {
    questionCount++;
    if (questionCount >= totalQuestions) {
      showResult(`<span>Game Over!</span> Your final score is ${score}/${totalQuestions}`);
    } else {
      questionGenerator();
    }
  }
});

// Start Game
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  score = 0;
  questionCount = 0;
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});

// Show Result
const showResult = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};
