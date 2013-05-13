//snapshot.js: the functionality behind the record button

/*global x:false, c:false, v:false, mainVideoWidth:false, mainVideoHeight:false, canvas:false */
var snapShot = function(){
  //if video has a src
  if($('video').attr('src')){
    x.drawImage(v, 0, 0, w, h);
    dataURL = c.toDataURL();
    image.src = dataURL;
    $('#main-canvas').hide();
    $('#main-image').show();
    $('#savebutton a').attr("href",dataURL);   
  } else {
    alert('please start the video first!');
  }
};
