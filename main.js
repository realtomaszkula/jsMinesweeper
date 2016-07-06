var minesweeper = (function($) {
  this.boardSize = 9;

  var styleContainerSize = function(){
    // 20px heigt/width + 5 * 2 border
    let size = (this.boardSize * 26);
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
    let gridSize = this.boardSize  * this.boardSize;

    console.log(gridSize);
    for (var i = 1; i <= gridSize ; i++){
      let $grid = $('<div class="grid"></div>');
      $container.append($grid);
    }

  };

  var render = function() {
    appendContainer();
    appendGrid();
  };

  return {
    render : render
  };


})(jQuery);



$(document).ready(function(){
  minesweeper.render();

  $('.grid').click(function(){
    $(this).toggleClass('active');
  });

});


