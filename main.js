prediction_1="";
prediction_2="";
Webcam.set({width:350, height:300, image_format:'png',png_quality:90});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function capture_snapshot(){
    Webcam.snap(function(data_uri)
    {document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';}
    )
    ;
}

console.log('ml5 version: ',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XA8JkhiCZ/model.json',modelLoaded);
function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is  "+prediction_1;
    speak_data2="the second prediction is  "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}


function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresults);
}

function gotresults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
 
    document.getElementById("result_emotion_name").innerHTML= results[0].label;
    document.getElementById("result_emotion_name2").innerHTML= results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    
    if(results[0].label == "peace out" ){
    document.getElementById("update_emoji").innerHTML="✌️";
}

if(results[0].label == "good" ){
document.getElementById("update_emoji").innerHTML="👍";
}   

if(results[0].label == "hello" ){
document.getElementById("update_emoji").innerHTML="👋";
}

if(results[1].label == "peace out" ){
    document.getElementById("update_emoji2").innerHTML="✌️";
}

if(results[1].label == "good" ){
document.getElementById("update_emoji2").innerHTML="👍";
}   

if(results[1].label == "hello" ){
document.getElementById("update_emoji2").innerHTML="👋";
}
}
}
