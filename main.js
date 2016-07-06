var minesweeper = (function($) {
  const boardSize = 9;
  const bomb = '&#9760;';
  const flag = '&#8683;';
  let board = fillBoard();

  function styleContainerSize(){
    let size = (boardSize * 26);
    $('#container').css( {
              'width' : size,
              'height' : size
    });
  }

  function appendContainer() {
    $('body').append('<div id="container"></div>');
    styleContainerSize();
  }


  function appendGrid() {
    let $container = $('#container');
    let gridSize = boardSize  * boardSize;

    for (var x = 1; x <= boardSize ; x++){
      for(var y = 1; y <= boardSize; y++) {
        let $grid =
        $('<div class="grid" id="' + x + '_' + y + '"></div>');
        $container.append($grid);
      }
    }

  }

  function render() {
    appendContainer();
    appendGrid();
  }


  function fillBoard() {
    let board = [];
    for (let i = 0; i < boardSize; i++){
      let row = [];
        for (let i = 0; i < boardSize; i++ ){
          row.push("");
        }
      board.push(row);
    }
    return board;
  }


  function getRandomNum() {
    return Math.floor(Math.random() * (boardSize) + 1);
  }

  function getRandomCords() {
    let x = getRandomNum();
    let y = getRandomNum();
  }

  function randomizeBombs() {
    let numOfBombs = Math.floor((boardSize * boardSize) * 10 / 100) + 1;
    for (let i = 1; i <= numOfBombs; i++){

    }
  }

  return {
    flag : function() { return flag; },
    bomb : function() { return bomb; },
    board : function() { return board; },
    render : render
  };


})(jQuery);


$(document).ready(function(){
  minesweeper.render();

  $('.grid').click(function(){
    $(this).toggleClass('active');
  });

  // $('.grid').html(minesweeper.bomb).text();

});


