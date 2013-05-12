//track.js: tracking colors

/*global mainVideoWidth:false, mainVideoHeight:false, rgb2hsl: false, x:false,
         v:false, hl:false, maskArray:false */

var createMaskArray = function() {
  // var rowArr;
  // var arr = [];
  // var ri, ci;

  // for (ri = 0; ri < mainVideoHeight; ri++) {
  //   rowArr = [];
  //   for (ci = 0; ci < mainVideoWidth; ci++) {
  //     rowArr.push(255);
  //   }
  //   arr.push(rowArr);
  // }
  // return arr;
  return pixelDataArray(255);
};

var erase = function() {
  // var w = mainVideoWidth,
  //     h = mainVideoHeight;

  x.drawImage(v, 0, 0, w, h);

  var pixels = x.getImageData(0, 0, w, h),
      pixCount = pixels.data.length / 4;

  var emptyArray = pixelDataArray(undefined);
  var map = emptyArray, scores = emptyArray;
  // var map = new Array(w);
  // var scores = new Array(w);
  // for(var i = 0; i < w; i++){
  //   map[i] = new Array(h);
  //   scores[i] = new Array(h);
  // }

  var index, r, g, b, hsl, ha, s, l;

  for(var pi = 0; pi < pixCount; pi++){
    index = pi*4;
    r = pixels.data[index];
    g = pixels.data[index+1];
    b = pixels.data[index+2];
    hsl = rgb2hsl(r, g, b);
    ha = hsl[0];
    s = hsl[1];
    l = hsl[2];
    // var left = Math.floor(pi%w);
    // var top = Math.floor(pi/w);
    // change: left -> ci, top -> ri

    var ri = Math.floor(pi/w),
        ci = pi % w;
    
    if (ha >= 70 && ha <= 180 &&
        s >= 25 && s <= 90 &&
        l >= 20 && l <= 95) {

        maskArray[ri][ci]=0;
        map[ri][ci] = 1;
    } else {
        map[ri][ci] = 0;
    }
    pixels.data[pi * 4 + 3] = maskArray[ri][ci];
  }

  // Sum the score for each pixel
  var neighborsCount = 10;

  for(var ri = neighborsCount; ri < (h - neighborsCount); ri++){
    for(var ci = neighborsCount; ci < (w - neighborsCount); ci++){
      scores[ri][ci] = map[ri][ci];
      for(var pi = neighborsCount - 1; pi > 0; pi--) {      
        scores[ri][ci] += map[ri - pi][ci] + map[ri + pi][ci];
        scores[ri][ci] += map[ri][ci - pi] + map[ri][ci + pi];
      }
    }
  }

  //Find the pixel closest to the top left that has the highest score. The
  //  pixel with the highest score is where the highlight box will appear.
  var targetx = 0, targety = 0, targetscore = 0;
  for(var ri = 10; ri < (h - 10); ri++){
    for(var ci = 10; ci < (w - 10); ci++){
      if(scores[ri][ci] > targetscore){
        targetx = ri;
        targety = ci;
        targetscore = scores[ri][ci];
      }
    }
  }

  hl.style.left = '' + targetx + 'px';
  hl.style.top = '' + (($('.button-toolbar').height() * 2) + targety) + 'px';
  x.putImageData(pixels, 0, 0);

  // Keep re-rendering until the current mode changes
  // while() {
    setTimeout(erase,50);
  // }
};

