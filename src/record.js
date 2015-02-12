//record.js: the functionality behind the record button

/*global localStream:false, v:false, localStream:false */

var recordVideo = function(){
  navigator.getUserMedia({video: true}, success, error);
  videoRunning = true;
};

var success = function(stream){
  localStream = stream;
  //v is the video element set in main.js
  v.src = window.URL.createObjectURL(localStream);
  if($('video').attr('src')){
    displayElement = 'video';
    $('.arrow').remove();
  };
};

var error = function(err) {
  console.log("The following error occured: " + err);
};