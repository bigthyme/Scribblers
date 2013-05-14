//Document ready stuff...

$(function(){
  //TODO: loop through and give titles
  $('.button').on('mouseenter', function(e){
    var self = $(this),
        text = self.text().replace(/\s+/g, ''),
        dynamicContent = '';

    var uniqueText = {
      'Paint' : 'Painting paints stuff',
      'Eraser' : 'Erase erases stuff',
      'Speak': 'say a color!',
      'Save': 'Do you want to save this beautiful picture?',
      'Pic': 'paint on a picture!',
      'SnapShot': 'Do you want to snapshot?',
      'Track': 'Do you want to track?',
      'Start': 'do you want to start playing?',
      'Stop': 'Do you want to stop playing?'
    }

    if(self.hasClass('move-left')){
      if(text in uniqueText){
        dynamicContent = uniqueText[text];
      }
      self.popover({
        trigger: 'hover',
        title: text,
        content: dynamicContent,
      });
    } else if (self.hasClass('move-right')){
      if(text in uniqueText){
        dynamicContent = uniqueText[text];
      }
      self.popover({
        trigger: 'hover',
        placement: 'left',
        title: text,
        content: dynamicContent,
      });
    }
  });
});