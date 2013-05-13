// Main.js: Implementation of getUserMedia API

/*global recordVideo:false, snapShot:false, draw:false, maskArray:false, createMaskArray:false, paint: false, paintArray:false, createPaintArray:false, erase:false  */

//Select html element id's
var v = document.querySelector('#main-video'),
    c = document .querySelector('#main-canvas'),
    //canvas x cord size
    x = c.getContext('2d'),
    hl = document.querySelector('#highlight'),
    localStream,

    //dimensions
    h = 480,
    w = 640,

    erasing,
    painting,
    colorChoice,
    paintArray;

var pixelDataArray = function(elem) {
  var rowArr, arr = [];
  for(var ri = 0; ri < h; ri++) {
    rowArr = [];
    for(var ci = 0; ci < w; ci++) {
      rowArr.push(elem);
    }
    arr.push(rowArr);
  }
  return arr;
};

    // Sum the score for each pixel
var scoreSum = function(scores, map) {
  var neighborsCount = 10;
  for(var ri = neighborsCount; ri < (h - neighborsCount); ri++){
    for(var ci = neighborsCount; ci < (w - neighborsCount); ci++){
      scores[ri][ci] = map[ri][ci];
      // scores[ci][ri] = map[ci][ri];
      for(var pi = neighborsCount - 1; pi > 0; pi--) {
        scores[ri][ci] += map[ri - pi][ci] + map[ri + pi][ci];
        scores[ri][ci] += map[ri][ci - pi] + map[ri][ci + pi];
        // scores[ci][ri] += map[ci - pi][ri] + map[ci + pi][ri];
        // scores[ci][ri] += map[ci][ri - pi] + map[ci][ri + pi];
      }
    }
  }
};

var findClosestHighScore = function(scores) {
  //Find the pixel closest to the top left that has the highest score. The
  //  pixel with the highest score is where the highlight box will appear.
  var neighborsCount = 10;
  targetx = 0, targety = 0, targetscore = 0;
  // Are these global intentionally?

  for(var ri = 10; ri < (h - 10); ri++){
    for(var ci = 10; ci < (w - 10); ci++){
      if(scores[ri][ci] > targetscore){
        targetx = ri;
        targety = ci;
        targetscore = scores[ri][ci];
      }
    }
  }
}

var highlightPlacer = function(x, pixels) {
  hl.style.left = '' + targetx + 'px';
  hl.style.top = '' + (($('.button-toolbar').height() * 2) + targety) + 'px';
  x.putImageData(pixels, 0, 0);
}

//Set dimensions for elmements
$('#main-video').attr('width', w +'px').attr('height', h + 'px');

$('#main-canvas').attr('width', w +'px').attr('height', h + 'px');

//Detect browser compatibility
var hasGetUserMedia = function(){
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

//If the user does have one of the follow navigators
if(hasGetUserMedia()){
  //Set window url to the user's specified browser
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia  = navigator.getUserMedia ||navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  //List of all button functionalities
  $('#startbutton').on('click', function(){
    //look at record.js for funcitonality
    recordVideo();
  });

  $('#snapshot').on('click', function(){
    //look at snapshot.js for functionality
    snapShot();
  });

  $('#trackbutton').on('click', function(){
    //look at track.js for functionality
    $('#main-video').css('display', 'none');
    $('#main-canvas').css('visibility', 'visible');
    draw();
  });

  // REVEAL
  $('#erasebutton').on('click', function(){
    $('#main-video').css('display', 'none');
    $('#main-canvas').css('visibility', 'visible');
    maskArray = createMaskArray();
    erase();
  });

  $('#eraserbutton').on('click', function(){
    if(paintArray === undefined) {
      alert('Nothing to erase!');
    } else {
      painting = false;
      erasing = true;
      eraser();
    };
  })

  $('#paintbutton').on('click', function(){
    if(!colorChoice){
      colorChoice = 'black';
    } else if(colorChoice === 'black') {
      $('#textarea').text('Would you like to try more colors').css('color', 'pink');
    }
    $('.color-palette').fadeIn(400);
    $('#main-video').css('display', 'none');
    $('#main-canvas').css('display', 'inline-block');
    if(paintArray === undefined) {
      paintArray = createPaintArray();
    };
    painting = true;
    erasing = false;
    paint();
  });

  $('#speechbutton').on('click',function(){
    $('canvas').show();
    console.log('recording...');
    toggleStartStop();

    //TODO: Add helper function
    setTimeout(function(){
      textArray = $('#textarea').text().split(' ');
      colorChoice = textArray[textArray.length - 1];
      console.log('your color: ', colorChoice);
    }, 2000);

    $('#main-video').css('display', 'none');
    $('#main-canvas').css('visibility', 'visible');
    if(paintArray === undefined) {
      paintArray = createPaintArray();
    };
    painting = true;
    erasing = false;
    paint();
  });

  $('li').on('click', function(){
    colorChoice = $(this).attr('class');
    $('#textarea').text('You picked ' + colorChoice).css('color', colorChoice);
    console.log(colorChoice);
  });

  //Stop recording (for dev purposes)
  $('#stopbutton').on('click', function(){
    console.log('stopping..');
    $('.color-palette').fadeOut(400);
    localStream.stop();
  });
} else {
  //no modern browser detected...fallback?
  alert('please use a better browser');
}

