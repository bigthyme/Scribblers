
    $(function(){
      $('canvas').hide();
      //TODO: loop through and give titles
      $('.button').on('mouseenter', function(e){
        var self = $(this),
            text = self.text().replace(/\s+/g, ''),
            dynamicContent = '';

        var uniqueText = {
          'Paint' : 'Painting paints stuff',
          'Erase' : 'Erase erases stuff',
          'SnapShot': 'Do you want to snapshot?',
          'Track': 'Do you want to track?',
          'Start': 'Do you want to start?',
          'Stop': 'Do you want to stop?'
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

      $('#trackbutton').on('click', function(){
        $('canvas').show();
      });
    });