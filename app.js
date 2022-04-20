const synthesis = window.speechSynthesis;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

let dest;
let deptLocation;
let deptDate;
let submitButton;

function startSpeechRecognition(field) {
    recognition.addEventListener('result', event => {
        console.log(event);
        event.stopPropagation();
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        console.log(field)
        //recognition.stop();
        field.value = transcript;
        let elem = document.getElementById(field.id);
        elem.blur();
    }, {once: true});
    
    recognition.addEventListener('speechend', event => {
        recognition.stop();
    })
   
    recognition.start();

}



window.onload = (event) => {
    document.getElementById("help").addEventListener('click', event => {
        event.preventDefault();
        const helpMessage = new SpeechSynthesisUtterance("Placeholder text.");
        synthesis.speak(helpMessage);
    });

    dest = document.getElementById("dest");
    dest.addEventListener('click', function(event){
        console.log("elem click")
        event.preventDefault();
        event.stopPropagation();
        const greetings = "Hello and welcome to wings! What city and state do you want to go to?";
        let destPrompt = new SpeechSynthesisUtterance(greetings);
        destPrompt.addEventListener('end', event => {startSpeechRecognition(dest)});
        synthesis.speak(destPrompt);
    });

    deptLocation = document.getElementById("deptLocation");
    deptLocation.addEventListener('click', function(event) {
       
        console.log("elem2 click")
        event.preventDefault();
        event.stopPropagation();
        let deptLocationPrompt = new SpeechSynthesisUtterance("What city and state are you departing from?");
        deptLocationPrompt.addEventListener('end', event => {startSpeechRecognition(deptLocation)});
        synthesis.speak(deptLocationPrompt);
    });
    //deptDate = document.getElementById("deptDate"); 
    
    const group1 = document.getElementById("group1");
    group1.addEventListener("click", function(event){
        console.log("label click")
        event.preventDefault();
        event.stopPropagation();
    });

    const group2 = document.getElementById("group2");
    group2.addEventListener("click", function(event){
        console.log("label2 click")
        event.preventDefault();
        event.stopPropagation();
    });

    const group3 = document.getElementById("group3");
    group3.addEventListener("click", function(event){
        event.stopPropagation();
    });

    form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        let destination = document.getElementById("dest").value;
        let departingLocation = document.getElementById("deptLocation").value;

        let submissionString = "You will be departing from " + departingLocation + " ,and you will be arriving in " + destination;
        let submission = new SpeechSynthesisUtterance(submissionString);
        synthesis.speak(submission);
        //let date 

    });

}


