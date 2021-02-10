var SpeechRecognition = window.webkitSpeechRecognition;
var recogntion = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recogntion.start();
}

recogntion.onresult = function(event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content.includes("take my selfie")) {
        console.log("taking selfie in ---")
        speak();
    }
}
function speak() {
    synth = window.speechSynthesis;
    speech_data = "Taking your selfie in 5 seconds";
    utter = new SpeechSynthesisUtterance(speech_data);
    synth.speak(utter);
    Webcam.attach(camera);
    setTimeout(function() {
        take_snapshot();
        save();
    }, 5000);
}

camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height: 250,
    image_format: 'png',
    image_quality: 90
});
function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("picture").innerHTML = "<img id='selfie_img' src ='"+ data_uri +"'/>"
    });
}
function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}