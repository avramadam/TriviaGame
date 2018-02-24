$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	//event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unanswered++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x2.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correct++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrect++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x2.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {

	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct text-center'>Correct Answers: " + correct + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrect + "</p>" + "<p class='text-center'>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["How many oscars did the Titanic movie get?", "How many Tomb Raider movies were made?", "Which malformation did Marilyn Monroe have when she was born?", "What is the house number of the Simpsons?", "What is the name of the little dragon in the animated movie Mulan?", "Who was the male protagonist in The Horse Wisperer?", "What is the profession of Popeye?", "Which French woman was the most famous actress in the world in the late 19th and early 20th century?"];
var answerArray = [["5", "8", "10", "11"], ["1","2","3","4"], ["Two belly buttons", "Three ears", "Six toes", "Two left feet"], ["742","724","632","519"], ["Mishi", "Mushu", "Shanghi", "Beijing"], ["Arnold Schwarzenegger","Ben Reynolds","Ice T","Robert Redford"], ["Cook", "Seaman", "Bartender", "Waiter"], ["Catherine Deneuve","Isabelle Adjani","Eva Green","Sarah Bernhardt"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/Titanic.png'>", "<img class='center-block img-right' src='assets/images/Tomb-Raider.png'>", "<img class='center-block img-right' src='assets/images/Marilyn.png'>", "<img class='center-block img-right' src='assets/images/homer.gif'>", "<img class='center-block img-right' src='assets/images/mushu.gif'>", "<img class='center-block img-right' src='assets/images/Redford.png'>", "<img class='center-block img-right' src='assets/images/PopEye.png'>", "<img class='center-block img-right' src='assets/images/Sarah.png'>"];
var correctAnswers = ["D. 11", "B. 2", "C. Six toes", "A. 742", "B. Mushu", "D. Robert Redford", "B. Seaman", "D. Sarah Bernhardt"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var clickSound = new Audio("sound/button-click.mp3");
