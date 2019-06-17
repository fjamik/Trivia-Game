var questions = [{
  question: "Behold the mighty TIE fighters. They are named after",
  choices: ["Turbo Ignition Engines", "Trajectory Inverse Exothermic", "Twin Ion Exhaust", "Twin Ion Engines"],
  correctAnswer: 3
}, {
  question: "Who flew this X-Wing as Red Leader in the Battle of Endor?",
  choices: ["Luke Skywalker", "Garven Dreis", "Wedge Antilles", "Biggs Darklighter"],
  correctAnswer: 2
}, {
  question: "Before being called Luke Skywalker, this character had another name",
  choices: ["Kane Starkiller", "Annikin Starkiller", "Luke Starlighter", "Justin Valor"],
  correctAnswer: 1
}, {
  question: "Master Yoda, we salute you. What's the first line he says in Episode V?",
  choices: ["Away with your weapon!", "Why are you here?", "Feel like what?", "I mean you no harm."],
  correctAnswer: 2
}, {
  question: "A view of Vader's flagship, a Super Star Destroyer. What was its call sign?",
  choices: ["Executor", "Enforcer", "Eviscerator", "Enterprise"],
  correctAnswer: 0
}];
  // var for trackin ques and array of player choises
var questionCounter = 0;
var selections = []; 
var quiz = $('#quiz'); 
  
// show first question
displayNext();
timer();
$('#done').hide();

// next button
$('#next').on('click', function () {
  choose();
  // if they don't pick an answer
  if (isNaN(selections[questionCounter])) {
    alert('Please make a selection!');
  } 
  else {
    questionCounter++;
    displayNext();
  }
});
  
//sets the timer
function timer(){
  t = setTimeout(timeUp, 1000 * 60);
}

function StopFunction() {
  clearTimeout(t);
}

function timeUp(){
  $('#done').show();
  $('#start').show();
  $('#next').hide(); 
  $('#quiz').hide();
  $('#time').hide();
  StopFunction();
  StopFunctionTwo(); 
}

var seconds;
var temp;

function countdown() {
  seconds = document.getElementById('countdown').innerHTML;
  seconds = parseInt(seconds, 10);

  if (seconds == 1) {
    temp = document.getElementById('countdown');
    return;
  }

  seconds--;
  temp = document.getElementById('countdown');
  temp.innerHTML = seconds;
  setTimeoutMyTimer = setTimeout(countdown, 1000);
 
}
 
countdown();

function StopFunctionTwo() {
    clearTimeout(setTimeoutMyTimer);
}
  // Resets game when the 'Start Over' button is clicked
$('#start').on('click', function () {
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#next').show();    
    $('#done').hide();
    $('#time').show();
    timer();
    document.getElementById("countdown").innerHTML = 60;
    countdown();
});
  
  
// Creates the div with the questions and  choices
function makeQuiz(index) {
  var quizDiv = $('<div>', {
    id: 'question'
  });
  
  var question = $('<p>').append(questions[index].question);
  quizDiv.append(question);
  
  var radioButtons = createRadios(index);
  quizDiv.append(radioButtons);
  return quizDiv;
};
  
  // Creates a list of the answer choices as multi choice selectors
function createRadios(index) {
  var radioList = $('<ul>');
  var input = '';// creating space where the choices will go
  for (var i = 0; i < questions[index].choices.length; i++) {
    var item = $('<li>'); //creating each list item
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += questions[index].choices[i]; //input is equal to input plus questions[index].choices.[i]
    item.append(input); //adding the list item to the space you created on line 145
    radioList.append(item); //adding it to the radio list
  }
  return radioList;
}
  
// Reads the user selection and pushes the value to an array
function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}
  
// Displays next requested element
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    if(questionCounter < questions.length){
      var nextQuestion = makeQuiz(questionCounter);
      quiz.append(nextQuestion).show();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }
      else if(questionCounter === 0){
        $('#next').show();
      }
    }
    else {
    var scoreElem = displayScore();
    quiz.append(scoreElem).fadeIn();
    $('#next').hide();
    $('#start').show();
    }
  });
};
  
  // Computes score and returns a paragraph element to be displayed
function displayScore() {
  clearTimeout(t);
  $('#time').hide();
  StopFunctionTwo();
  StopFunction();
  var score = $('<p>',{id: 'question'});
  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === questions[i].correctAnswer) {
      numCorrect++;
    }
  }
  
  score.append('You got ' + numCorrect + ' out of ' + questions.length + ' questions right!!!');
  return score;
  
};
