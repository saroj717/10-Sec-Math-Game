$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    do {
      num1 = randomNumberGenerator(10);
      num2 = randomNumberGenerator(10);
    } while (num1 <= num2);

    var operation;
    var randomValue = Math.random();

    if (randomValue < 0.25 && num1 % num2 === 0) {
      operation = '+';
    } else if (randomValue < 0.5 && num1 % num2 === 0) {
      operation = '-';
    } else if (randomValue < 0.75 && num1 % num2 === 0) {
      operation = '/';
    } else {
      operation = '*';
    }

    if (operation === '+') {
      question.answer = num1 + num2;
      question.equation = `${num1} + ${num2}`;
    } else if (operation === '-') {
      question.answer = num1 - num2;
      question.equation = `${num1} - ${num2}`;
    } else if (operation === '*') {
      question.answer = num1 * num2;
      question.equation = `${num1} * ${num2}`;
    } else {
      question.answer = num1 / num2;
      question.equation = `${num1} / ${num2}`;
    }

    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
});
