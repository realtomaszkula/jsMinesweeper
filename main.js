var minesweeper = (function($) {
  const boardSize = 9;
  const bomb = '&#9760;';
  const flag = '&#8683;';

  var styleContainerSize = function(){
    // 20px heigt/width + 5 * 2 border
    let size = (boardSize * 26);
    $('#container').css( {
              'width' : size,
              'height' : size
    });
  };

  var appendContainer = function() {
    $('body').append('<div id="container"></div>');
    styleContainerSize();
  };


  var appendGrid = function() {
    let $container = $('#container');
    let gridSize = boardSize  * boardSize;

    for (var x = 1; x <= boardSize ; x++){
      for(var y = 1; y <= boardSize; y++) {
        let $grid =
        $('<div class="grid" id="' + x + '_' + y + '"></div>');
        $container.append($grid);
      }
    }

  };

  var render = function() {
    appendContainer();
    appendGrid();
  };

  return {
    flag : function() { return flag; },
    bomb : function() { return bomb; },
    render : render
  };


})(jQuery);


$(document).ready(function(){
  minesweeper.render();

  $('.grid').click(function(){
    $(this).toggleClass('active');
  });

  $('.grid').html(minesweeper.bomb).text();

});


