var timeLeft = 75;
var currentQuestion = 0;
var audio = new Audio(
  "http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3"
);
var score = 0;
console.log(score);

function nextQuestion() {
    
  // This wipes away the quizMain section when the quiz starts.
  quizMain.innerHTML = "";

  questions.forEach(function(questionsList, index) {
    var quizBlock = document.createElement("quizBlock");

    if (currentQuestion != index) {
      quizBlock.setAttribute("class", "hide");
    
    }

    // We're creating a questions field in h1.
    var questionField = document.createElement("h1");
    questionField.textContent = questionsList.title;

    // We're creating a choices field in ul.
    var ul = document.createElement("ul");

    // For each choice, create a new line and button that will later be inserted into ul.
    questionsList.choices.forEach(function(choiceList) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.textContent = choiceList;
      btn.addEventListener("click", submitAnswer);

      // We're assigning the choice list to the button and then to the line and then to the ul section.
      li.append(btn);
      ul.append(li);
    });

    // Append questionsField and ul to quizMain.
    quizBlock.append(questionField);
    quizBlock.append(ul);
    quizMain.append(quizBlock);

    // Allow users to select one of the choices.
    function submitAnswer() {
      var choicesList = document.getElementsByTagName("button");

      for (var i = 0; i < choicesList.length; i++) {
        choicesList[i].onclick = function() {
          var selectedAnswer = this.innerHTML;
          var questionsLength = questions.length - 1;
          console.log("index:" + index);
          console.log("array length:" + questionsLength);
          
           if (index === questionsLength) { 
              timeLeft = 0;  
              score += 10;
              console.log(score);
              document.getElementById("quizMain").innerHTML = "";
              document.getElementById("score").innerHTML = "High Score: " + score;


           }
           else {
              var correctAnswer = questionsList.answer;
              if (correctAnswer === selectedAnswer) {
                score += 10;
                console.log(score);
                document.getElementById("score").innerHTML =
                "High Score: " + score;
                document.getElementById("status").innerHTML =
                  "Correct Answer";
                audio.play();
                currentQuestion++;
                nextQuestion();
              } else {
                document.getElementById("status").innerHTML = "Wrong Answer!";
                penalizeTimer();
                currentQuestion++;
                nextQuestion();
                
              }
           }
        };
      }
    }
  });
}

// This starts the timer.
function startTimer() {
  var downloadTimer = setInterval(function() {
    document.getElementById("timer").innerHTML = "Timer: " + timeLeft;
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("timer").innerHTML = "Finished";
    }
  }, 1000);
}

// If the answer is wrong, penalize the remaining time.
function penalizeTimer() {
  timeLeft -= 10;
  document.getElementById("timer").innerHTML = "Timer: " + timeLeft;
}

function addToHighScores() {
    addToHighScores.innerHTML = "";
    const person = {
        //name:document.createElement('input');
        name: document.getElementById("name").value,
        number: score,
    }

    // var nameHighScore = document.getElementById("name").value;
    window.localStorage.setItem('user', JSON.stringify(person));
    console.log(window.localStorage.getItem('user'));
    document.getElementById("highScores").innerHTML = window.localStorage.getItem('user');

}   
