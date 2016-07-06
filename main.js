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
    addBombs();
    addHelperDigits();
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


  function getRandomCords() {
    return Math.floor(Math.random() * (boardSize-1) + 1);
  }

  function getBombCords(){
    let x, y, emptyPosition;
    do {
      x = getRandomCords();
      y = getRandomCords();
      emptyPosition = board[x][y];
    } while (emptyPosition !== '');

    return [x,y];
  }

  function addBomb(){
    let cords = getBombCords();
    let [x, y] = cords;
    board[x][y] = bomb;
  }

  function calculateNumOfBombs(){
    return Math.floor((boardSize * boardSize) * 10 / 100) + 1;
  }

  function addBombs() {
    let numOfBombs = calculateNumOfBombs();
    for (let i = 1; i <= numOfBombs; i++){
      addBomb();
    }
  }

  function isWithinAcceptableRange(element){
    let x, y;
    [x, y] = element;
    return x >= 0 && y >= 0 && x <= boardSize - 1 && y <= boardSize - 1;
  }

  function selectAdjacentPositions(x, y){
    return [[x-1, y-1], [x-1, y],
        [x-1, y+1], [x, y+1],
          [x+1, y+1], [x+1, y],
            [x+1, y-1], [x, y-1]].filter(isWithinAcceptableRange)
  }

  function howManyAdjacentBombs(x, y){
    adjacentPositions = selectAdjacentPositions(x,y);

    let count = 0;
    adjacentPositions.forEach(function(cords){
      let x, y;
      [x, y] = cords;
      if (board[x][y] == bomb) count++;
    });
    return count;
  }

  function addHelperDigits(){
    board.forEach(function(row, x){
      row.forEach(function(value, y){
        if (value == bomb) {
          return;
        } else {
          let count = howManyAdjacentBombs(x, y);
          if (count > 0) board[x][y] = count;
        }
      });
    });
  }

  function showContent() {
    board.forEach(function(row, x){
      row.forEach(function(value, y){
        $('#' + x + '_' + y).html(value).text();
      });
    });
  }



  return {
    flag : function() { return flag; },
    bomb : function() { return bomb; },
    board : function() { return board; },
    render : render,
    showContent : showContent
  };


})(jQuery);


$(document).ready(function(){
  minesweeper.render();

  $('.grid').click(function(e){
    $(this).toggleClass('active');
    console.log(event.target.id);
  });

  // $('.grid').html(minesweeper.bomb).text();

});


