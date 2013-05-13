var saveImage = function(){
  //if video has a src
  if($('video').attr('src')){
    x.save();
    x.translate(w, 0);
    x.scale(-1,1);
    //x.drawImage(v, 0, 0, w, h);
    x.restore();
    dataURL = c.toDataURL();
    image.src = dataURL;
    $('#main-canvas').hide();
    $('#main-image').show();
    $('#savebutton a').attr("href",dataURL);   
  } else {
    alert('please start the video first!');
  }
};
