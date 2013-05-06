//record.js: the functionality behind the record button
var recordVideo = function(){
  navigator.getUserMedia({video: true, audio: true}, function(stream){
      v.src = window.URL.createObjectURL(stream);
    });
}