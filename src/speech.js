// Implementing Speech to Text
if (!('webkitSpeechRecognition' in window)) {
  alert('Oh no your browser is too old for this!');
} else {
  var recognizing;

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;

  recognition.onstart = function(){
    console.log('recording...');
    recognizing = true;
  }

  recognition.onresult = function (event) {
    if (typeof(event.results) == 'undefined') {
      console.log('event.results is undefined');
      recognition.onend = null;
      recognition.stop();
      return;
    }

    console.log('testing event ', event.results);
     for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        textarea.innerHTML = ' ' + event.results[i][0].transcript
        // textarea.innerHTML += ' ' + event.results[i][0].transcript;
        checkOutput();
      } else {
        alert('what happened?');
      }
    }
  }

  var reset = function() {
    recognizing = false;
    $('#speechbutton p').text('Speak').parent().removeClass('orange').addClass('blue-purple');
  }

  var toggleStartStop = function() {
    if (recognizing) {
      console.log('stop recording...');
      recognition.stop();
      reset();
    } else {
      recognition.start();
      recognizing = true;
      console.log('in the else', recognition);
      $('#speechbutton p').text('Done').parent().removeClass('blue-purple').addClass('orange');
    }
  }

  //Output helpers
  var checkOutput = function(){
    var output = document.getElementById('textarea').innerHTML;
    if(output.length > 0){
      lastWord(output);
    } else {
      alert('Oops, please speak into the microphone.');
    }
  }

  var lastWord = function(string) {
    words = string.split(' ');
    console.log(words);
    var latestWord = words.pop();
    if(latestWord === 'red' || latestWord === 'blue' || latestWord === 'green'){
      return latestWord;
    } else {
      alert('Oops, please choose a color');
    }
  };
}