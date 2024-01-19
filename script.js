/*
An input for the user to type the answer. (Event Listener)
An element displaying the current math equation question. (DOM Manipulation)
Equations uses "+" operator only. (Function)
A count down for the time left. (Interval, Time, DOM Manipulation)
The game starts when the user clicks a button or starts typing in the input. (Event Listener)
The game ends when the user runs out of time. (Interval, Time, Function)
When the user makes a correct guess, add 1 second to the available time left. (Function)
The current score is shown. (DOM Manipulation)
A way to restart the game if time runs out. (Function)
High score indicator for the high score in the current session. (Not covered in this walkthrough)
*/


$(document).ready(function(){
  var currentQuestion;
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }
  
  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
    }
  }

  $('#user-input').on('keyup', function() {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});