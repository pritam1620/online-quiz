// Login System

let username = "";

function loginUser(){

    username =
    document.getElementById("usernameInput").value;

    if(username.trim() === ""){

        alert("Please Enter Name");

        return;
    }

    document.getElementById("loginPage")
    .style.display = "none";

    document.getElementById("mainContainer")
    .style.display = "block";

    loadQuiz();
}

// Logout

function logoutUser(){

    location.reload();
}

// Quiz Questions

const quizData = [

{
    question:"What is Java?",
    a:"Programming Language",
    b:"Animal",
    c:"Fruit",
    d:"Car",
    correct:"a"
},

{
    question:"Which tag is used in HTML?",
    a:"<java>",
    b:"<html>",
    c:"<python>",
    d:"<css>",
    correct:"b"
},

{
    question:"CSS stands for?",
    a:"Creative Style Sheet",
    b:"Computer Style Sheet",
    c:"Cascading Style Sheets",
    d:"Color Style",
    correct:"c"
},

{
    question:"Which language is used for backend?",
    a:"Java",
    b:"HTML",
    c:"CSS",
    d:"Bootstrap",
    correct:"a"
},

{
    question:"Which company developed Java?",
    a:"Google",
    b:"Microsoft",
    c:"Sun Microsystems",
    d:"Apple",
    correct:"c"
},

{
    question:"What does CPU stand for?",
    a:"Central Processing Unit",
    b:"Central Program Unit",
    c:"Computer Processing Unit",
    d:"Central Processor Utility",
    correct:"a"
}

];

// Shuffle Questions

quizData.sort(() => Math.random() - 0.5);

const question =
document.getElementById("question");

const a_text =
document.getElementById("a_text");

const b_text =
document.getElementById("b_text");

const c_text =
document.getElementById("c_text");

const d_text =
document.getElementById("d_text");

const answers =
document.querySelectorAll("input[name='answer']");

let currentQuiz = 0;
let score = 0;

let timer;
let timeLeft = 15;

// Load Quiz

function loadQuiz(){

    deselectAnswers();

    startTimer();

    let progress =
    (currentQuiz / quizData.length) * 100;

    document.getElementById("progressBar")
    .style.width = progress + "%";

    const currentData =
    quizData[currentQuiz];

    question.innerText =
    currentData.question;

    a_text.innerText =
    currentData.a;

    b_text.innerText =
    currentData.b;

    c_text.innerText =
    currentData.c;

    d_text.innerText =
    currentData.d;

    speakQuestion();
}

// Remove Previous Selection

function deselectAnswers(){

    answers.forEach(answer => {

        answer.checked = false;
    });
}

// Get Selected Answer

function getSelected(){

    let answer;

    answers.forEach(answerEl => {

        if(answerEl.checked){

            answer = answerEl.value;
        }
    });

    return answer;
}

// Submit

document.getElementById("submit")
.addEventListener("click", () => {

    const answer = getSelected();

    if(answer){

        if(answer ===
        quizData[currentQuiz].correct){

            score++;

            alert("Correct Answer ✅");

        }else{

            alert("Wrong Answer ❌");
        }

        nextQuestion();
    }
});

// Next Question

function nextQuestion(){

    clearInterval(timer);

    currentQuiz++;

    if(currentQuiz < quizData.length){

        loadQuiz();

    }else{

        showResult();
    }
}

// Timer

function startTimer(){

    clearInterval(timer);

    timeLeft = 15;

    document.getElementById("timer")
    .innerText =
    "⏰ Time Left: " + timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer")
        .innerText =
        "⏰ Time Left: " + timeLeft;

        if(timeLeft <= 0){

            nextQuestion();
        }

    },1000);
}

// Result

function showResult(){

    document.getElementById("quiz")
    .innerHTML =

    `
    <h2>${username}, Your Score:
    ${score}/${quizData.length}</h2>

    <button onclick="downloadCertificate()">
        🎓 View Certificate
    </button>

    <button onclick="location.reload()">
        🔄 Play Again
    </button>
    `;

    saveLeaderboard();
}

// Dark Mode

document.getElementById("darkBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});

// Save Leaderboard

function saveLeaderboard(){

    let leaderboard =
    JSON.parse(localStorage
    .getItem("leaderboard")) || [];

    leaderboard.push({
        name: username,
        score: score
    });

    leaderboard.sort((a,b) =>
    b.score - a.score);

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );

    displayLeaderboard();
}

// Display Leaderboard

function displayLeaderboard(){

    let leaderboard =
    JSON.parse(localStorage
    .getItem("leaderboard")) || [];

    let html =
    "<h2>🏆 Leaderboard</h2>";

    leaderboard.slice(0,5)
    .forEach((user,index) => {

        html +=
        `<p>${index+1}. ${user.name} - ${user.score}</p>`;
    });

    document.getElementById("leaderboard")
    .innerHTML = html;
}

displayLeaderboard();

// Certificate

function downloadCertificate(){

    document.getElementById("certificateBox")
    .classList.remove("certificate-hidden");

    document.getElementById("certificateBox")
    .classList.add("certificate-show");

    document.getElementById("certName")
    .innerText = username;

    document.getElementById("certScore")
    .innerText =
    "Score: " + score +
    "/" + quizData.length;

    let today = new Date();

    document.getElementById("certDate")
    .innerText =
    "Date: " + today.toDateString();
}

function closeCertificate(){

    document.getElementById("certificateBox")
    .classList.remove("certificate-show");

    document.getElementById("certificateBox")
    .classList.add("certificate-hidden");
}

// Voice Feature

function speakQuestion(){

    let text =
    question.innerText + ". " +

    "Option A " + a_text.innerText + ". " +
    "Option B " + b_text.innerText + ". " +
    "Option C " + c_text.innerText + ". " +
    "Option D " + d_text.innerText;

    let speech =
    new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);
}

// Voice Recognition

const voiceBtn =
document.getElementById("voiceBtn");

voiceBtn.addEventListener("click", () => {

    if(!('webkitSpeechRecognition' in window)){

        alert("Voice Recognition Not Supported");

        return;
    }

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    voiceBtn.innerText =
    "🎙 Listening...";

    recognition.onresult = function(event){

        let voiceAnswer =
        event.results[0][0].transcript
        .toLowerCase();

        if(voiceAnswer.includes("a")){

            document.querySelector(
            "input[value='a']").checked = true;
        }

        else if(voiceAnswer.includes("b")){

            document.querySelector(
            "input[value='b']").checked = true;
        }

        else if(voiceAnswer.includes("c")){

            document.querySelector(
            "input[value='c']").checked = true;
        }

        else if(voiceAnswer.includes("d")){

            document.querySelector(
            "input[value='d']").checked = true;
        }

        alert("Voice Selected: " + voiceAnswer);

        voiceBtn.innerText =
        "🎤 Voice Answer";
    };

    recognition.onerror = function(){

        voiceBtn.innerText =
        "🎤 Voice Answer";

        alert("Voice Recognition Error");
    };
});

// AI QUESTION GENERATOR

async function generateAIQuestion(topic){

const API_KEY =
"PASTE_YOUR_API_KEY_HERE";

const response =
await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

contents:[{

parts:[{

text:
`Generate one MCQ question on ${topic}
with 4 options and correct answer`

}]

}]
})
}
);

const data =
await response.json();

console.log(data);

alert(
data.candidates[0]
.content.parts[0].text
);
}

// START AI FUNCTION

function startAI(){

let topic =
document.getElementById(
"topic").value;

if(topic.trim() === ""){

alert("Please Enter Topic");

return;
}

generateAIQuestion(topic);
}