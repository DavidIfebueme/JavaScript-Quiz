var usernameForm = document.getElementById('username');
var uname = document.getElementById('uname');
var login = false; // not logged in
var theForm = document.getElementById('theForm');
var theQuiz = document.getElementById('theQuiz');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submit');
var err = document.getElementById('err');
var errH = document.getElementById('errH');
var i;


function admitCandidate(){
    //function to admit user or candidate to take the test
    //function also checks if user has provided name before and stores provided username

    var candidateName = localStorage.getItem('name');

    if (candidateName == '' || candidateName =='undefined'){
        // check if candidateName does not exist
        candidateNameForm.style.display = 'block'; // to display candidate name form
        document.getElementById('logoutBtn').style.display = 'none';
    } else{
        var tempCa = localStorage.getItem('ca'); //to get previous score
        var tempPer = localStorage.getItem('percentage'); // to get previous percentage

    }
}



function startTest(){    
    theQuiz.style.display = 'block' // to display the test 
    randomQuestion(); // function to start test with a random question from the question bank
}

    
    

var questionsAsked = 0; //init questions asked to zero
var candidateAnswers = []; //init candidate's answers to empty array
var questionsAnsweredArray = []; //init questiions anwered to empty array

steps(totalQuestions.length); // making the dot steps to show how many questions are left


// creating variables for options A-D
var p = document.getElementById('que'); // the question paragraph
var a = document.getElementById('optionA'); // option A
var b = document.getElementById('optionB'); // option B
var c = document.getElementById('optionC'); // option C
var d = document.getElementById('optionD'); // option D


function randomQuestion(){
    var alreadyAsked = false;
    var x = Math.floor(Math.random() * totalQuestions.length); // to get a random whole number from the number of questions in bank
    while ((totalQuestions[x].asked === 0) == true){
        alreadyAsked = true;
        totalQuestions[x].asked = 1;
        questionsAnsweredArray.unshift(x);
        questionsAnswered = ++questionsAnswered;
        p.innerHTML = totalQuestions[x].question;
        a.nextElementSibling.innerHTML = totalQuestions[x].optionA;
        b.nextElementSibling.innerHTML = totalQuestions[x].optionB;
        c.nextElementSibling.innerHTML = totalQuestions[x].optionC;
        d.nextElementSibling.innerHTML = totalQuestions[x].optionD;

    }

    if(!alreadyAsked){
        if(questionsAnswered != totalQuestions.length){
            randomQuestion();

        }
    }
}


function nextBtnFunc(){
    if(questionsAnswered == totalQuestions.length){
        theQuiz.style.display = 'none';
        document.getElementById('the Result').style.display = 'block';
        calcResult();
        return false;
    } else{
        randomQuestion();
    }
    
}

var checkBox = document.getElementsByClassName('custom-control-input');

function validateForm() {
	var valid = false;
	for (var i = 0; i < checkBox.length; i++) {
		// checks every radio btn
		if (checkBox[i].checked) {
			// if found checked
			valid = true;
			userAns.unshift(checkBox[i].value); // store user's answer			
			checkBox[i].checked = false;
			nextBtn.setAttribute('disabled', 'disabled'); // disable button for next question
			break;
		}
	}
	if (!valid) {
		// if no option selected
		alert('Please Select Any Option...');
		nextBtn.setAttribute('disabled', 'disabled');
	}
	if (valid)
		// if the valid status is true, mark the step as finished
		document.getElementsByClassName('step')[questionsAnswered - 1].className += ' finish';
	return valid; // return the valid status
}

// enable btn if radio btn is checked
var nextBtn = document.getElementById('next-button');

function fixStepIndicator(n) {
	// removes the "active" class of all steps...
	var i,
		x = document.getElementsByClassName('step');
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(' active', '');
	}
	x[n - 1].className += ' active'; // and adds the "active" class on the current step
}

function enableBtn(i) {
	if (i.checked) nextBtn.removeAttribute('disabled');
	else nextBtn.setAttribute('disabled', 'disabled');
}


function topping(n) {
	// dynamic next button's text
	if (n == totQ.length - 1)
		document.getElementById('next-button').innerHTML = 'Submit';
	else if (n == totQ.length) {
		document.getElementById('next-button').innerHTML = 'No Questions';
		nextBtn.setAttribute('disabled', 'disabled');
	} else document.getElementById('next-button').innerHTML = 'Next';
	fixStepIndicator(n); // it will display the correct step indicator
}

function calcResult() {
	// calculates result
	var ca = 0; // correct answer - currently ZerO..
	for (var i = 0; i < totQ.length; i++) {
		// loop till total num of questions
		var a = queDoneArr[i]; // getting done questions from array
		if (userAns[i] == totQ[a].answer) {
			// if user's answer matches with array's question's answer
			ca = ca + 1; // increase correct answers' counter
		}
	}
	var percentage = (ca / totQ.length) * 100; // calculates %
	// alert('Correct Answers: ' + ca + '\n' + 'Your Percentage is: ' + percentage);
	showResult(percentage, ca);
}

var resultCircle = document.getElementById('resultCircle');
var resultFb = document.getElementById('resultFb');
var correctAns = document.getElementById('correctAns');
var quizCompleted = false;
var RColor;
function showResult(percentage, ca) {
	if (percentage == 100) {
		RColor = 'teal';
		resultFb.innerHTML = 'Wohoo.. Great, You pass!';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 80) {
		RColor = 'green';
		resultFb.innerHTML = 'Congrats! You pass.';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 65) {
		RColor = 'blue';
		resultFb.innerHTML = 'Good Effort, You pass.';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 50) {
		RColor = 'orange';
		resultFb.innerHTML = 'You passed!';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else {
		RColor = 'red';
		resultFb.innerHTML = 'Oh No! You Failed... <br> Better Luck Next Time';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	}

	localStorage.setItem('percentage', percentage);
	localStorage.setItem('ca', ca);
	quizCompleted = true;

	var path =
		'<svg viewbox="0 0 36 36" class="circular-chart ' +
		RColor +
		'"> \
    <path class="circle-bg" \
    d="M18 2.0845 \
    a 15.9155 15.9155 0 0 1 0 31.831 \
    a 15.9155 15.9155 0 0 1 0 -31.831" \
    /> \
    <path class="circle" \
    stroke-dasharray="' +
		percentage +
		', 100" \
    d="M18 2.0845 \
    a 15.9155 15.9155 0 0 1 0 31.831 \
    a 15.9155 15.9155 0 0 1 0 -31.831" \
    /> \
    <text x="19" y="21" id="percentage">' +
		percentage +
		'%</text> \
    </svg>';
	resultCircle.innerHTML = path;
}

function logout() {
	// when logout button triggered
	localStorage.clear(); // clear all local storage
	location.reload(true); // hard reload the page
}

function retakeQuiz() {
	localStorage.removeItem('percentage');
	localStorage.removeItem('ca');
	location.reload(true); // hard reload the page
}
