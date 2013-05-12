//track.js: tracking colors

/*global mainVideoWidth:false, mainVideoHeight:false, rgb2hsl: false, x:false,
         v:false, hl:false */
var pixels, pixCount;

var draw = function() {

  x.save();
  x.translate(mainVideoWidth, 0);
  x.scale(-1,1);
  x.drawImage(v, 0, 0, w, h);
  x.restore();

  pixels = x.getImageData(0, 0, w, h);
  pixCount = pixels.data.length / 4;

  var emptyArray = pixelDataArray(0);
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
    
    var ri = Math.floor(pi/w),
        ci = pi % w;
        
    if (ha >= 70 && ha <= 180 &&
        s >= 25 && s <= 90 &&
        l >= 20 && l <= 95) {
        
        // Change the opacity to 0
        pixels.data[pi * 4 + 3] = 0;
        //map[ci][ri] = 1;
        map[ri][ci] = 1;
    } else {
        //map[ci][ri] = 0;
        map[ri][ci] = 0;
    }
  }
  // Sum the score for each pixel
  var neighborsCount = 10;
  // chad: plz change 10 -> neighborsCount

  for(var ri = neighborsCount; ri < (h - neighborsCount); ri++){
    for(var ci = neighborsCount; ci < (w - neighborsCount); ci++){
      scores[ri][ci] = map[ri][ci];
      for(var pi = neighborsCount - 1; pi > 0; pi--) {      
        // scores[ri][ci] += map[ri - pi][ci] + map[ri + pi][ci];
        // scores[ri][ci] += map[ri][ci - pi] + map[ri][ci + pi];
      }
    }
  }

  //Find the pixel closest to the top left that has the highest score. The
  //  pixel with the highest score is where the highlight box will appear.
  var targetx = 0, targety = 0, targetscore = 0;
  for(var ri = 10; ri < (h - 10); ri++){
    for(var ci = 10; ci < (w - 10); ci++){
      if(scores[ri][ci] > targetscore){
        targety = ri;
        targetx = ci;
        targetscore = scores[ri][ci];
      }
    }
  }

  hl.style.left = '' + (v.width - targetx) + 'px';
  hl.style.top = '' + (($('.button-toolbar').height() * 2) + targety) + 'px';
  x.putImageData(pixels, 0, 0);

  setTimeout(draw, 50);
};
