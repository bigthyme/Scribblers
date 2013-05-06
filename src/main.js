// Main.js: Implementation of getUserMedia API

//Select html element id's
var v = document.querySelector('#main-video'),
    c = document .querySelector('#main-canvas'),
    //canvas x cord size
    x = c.getContext('2d'),
    hl = document.querySelector('#highlight'),
    //dimensions
    mainVideoHeight = 480,
    mainVideoWidth = 640;


//Set dimensions for elmements
$('#main-video').attr('width', mainVideoWidth +'px').attr('height', mainVideoHeight + 'px');

$('#main-canvas').attr('width', mainVideoWidth +'px').attr('height', mainVideoHeight + 'px');

//Detect browser compatibility
var hasGetUserMedia = function(){
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

//If the user does have one of the follow navigators
if(hasGetUserMedia()){
  //set window url to the user's specified browser
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia  = navigator.getUserMedia ||navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}


