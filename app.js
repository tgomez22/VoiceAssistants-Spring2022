const synthesis = window.speechSynthesis;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

let dest;
let deptLocation;
let deptDate;
let submitButton;
let humanFriendlyDate;

const months = {
    january: '01', 
    february: '02',
    march: '03', 
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12'
}; 


function startSpeechRecognition(field) {
    recognition.addEventListener('result', event => {
        event.stopPropagation();
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        if (field.id === 'deptDate'){
            field.value = parseDate(transcript);
        } else {
            field.value = transcript;
        }
        field.blur();
    }, {once: true});
    
    recognition.addEventListener('speechend', event => {
        recognition.stop();
    })
   
    recognition.start();

}

function parseDate(transcript){
    let lowerCaseTranscript = transcript.toLowerCase().split(" ");
    console.log(lowerCaseTranscript);
    if (lowerCaseTranscript.length < 3 || lowerCaseTranscript.length > 3){
        let errMsg = new SpeechSynthesisUtterance("I'm sorry but I didn't get that. Can you repeat that?");
        errMsg.addEventListener('end', event => {startSpeechRecognition(deptDate)});
        synthesis.speak(errMsg);
    } else {
        let desiredMonth = months[lowerCaseTranscript[0]];
        let desiredDay = parseInt(lowerCaseTranscript[1], 10);
        if (desiredDay < 10) {
            desiredDay = String(desiredDay);
            desiredDay = '0' + desiredDay;
        } else {
            desiredDay = String(desiredDay);
        }
        let desiredYear = parseInt(lowerCaseTranscript[2], 10);
        let desiredDate = String(desiredYear) + '-' + desiredMonth + '-' + desiredDay;
        humanFriendlyDate = transcript;
        return desiredDate;
    }
   
}

window.onload = (event) => {

    document.getElementById("help").addEventListener('click', event => {
        event.preventDefault();
        const helpMessage = new SpeechSynthesisUtterance("Hello and welcome to wings! This form is filled out using your voice. Please select an input and listen to the voice prompt. When the prompt is finished speaking, wait a second or two before answering the question.");
        synthesis.speak(helpMessage);
    });

    dest = document.getElementById("dest");
    dest.addEventListener('focus', function(event){

        event.preventDefault();
        event.stopPropagation();
        const greetings = "What city and state do you want to go to?";
        let destPrompt = new SpeechSynthesisUtterance(greetings);
        destPrompt.addEventListener('end', event => {startSpeechRecognition(dest)});
        synthesis.speak(destPrompt);
    });

    deptLocation = document.getElementById("deptLocation");
    deptLocation.addEventListener('focus', function(event) {
       

        event.preventDefault();
        event.stopPropagation();
        let deptLocationPrompt = new SpeechSynthesisUtterance("What city and state are you departing from?");
        deptLocationPrompt.addEventListener('end', event => {startSpeechRecognition(deptLocation)});
        synthesis.speak(deptLocationPrompt);
    });
    
    deptDate = document.getElementById("deptDate"); 
    deptDate.addEventListener('focus', function(event) {
        event.preventDefault();
        event.stopPropagation();
        let deptDatePrompt = new SpeechSynthesisUtterance("What date would you like to leave on?");
        deptDatePrompt.addEventListener('end', event => {startSpeechRecognition(deptDate)});
        synthesis.speak(deptDatePrompt);
    });
 

    form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        let destination = document.getElementById("dest").value;
        let departingLocation = document.getElementById("deptLocation").value;

        let submissionString = "On " + humanFriendlyDate + "," + "You will be departing from " + departingLocation + " ,and you will be arriving in " + destination;
        let submission = new SpeechSynthesisUtterance(submissionString);
        synthesis.speak(submission);
       

    });

}


