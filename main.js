var minesweeper = (function($) {
  const boardSize = 9;
  const bomb = '&#9760;';
  const flag = '&#8683;';

  let styleContainerSize = () => {
    let size = (boardSize * 26);
    $('#container').css( {
              'width' : size,
              'height' : size
    });
  };

   let appendContainer = () => {
    $('body').append('<div id="container"></div>');
    styleContainerSize();
  };

  let appendGrid = () => {
    let $container = $('#container');
    let gridSize = boardSize  * boardSize;

    for (var x = 1; x <= boardSize ; x++){
      for(var y = 1; y <= boardSize; y++) {
        let $grid =
        $('<div class="grid" id="' + (x-1) + '_' + (y-1) + '"></div>');
        $container.append($grid);
      }
    }

  };

  let fillBoard = () => {
    let board = [];
    for (let i = 0; i < boardSize; i++){
      let row = [];
        for (let i = 0; i < boardSize; i++ ){
          row.push("");
        }
      board.push(row);
    }
    return board;
  };

  let board = fillBoard();

  let getRandomCords = () => {
    return Math.floor(Math.random() * (boardSize-1) + 1);
  };

  let getBombCords = () => {
    let x, y, emptyPosition;
    do {
      x = getRandomCords();
      y = getRandomCords();
      emptyPosition = board[x][y];
    } while (emptyPosition !== '');

    return [x,y];
  };

  let addBomb = () => {
    let cords = getBombCords();
    let [x, y] = cords;
    board[x][y] = bomb;
  };

  let calculateNumOfBombs = () => {
    return Math.floor((boardSize * boardSize) * 10 / 100) + 1;
  };

  let addBombs = () => {
    let numOfBombs = calculateNumOfBombs();
    for (let i = 1; i <= numOfBombs; i++){
      addBomb();
    }
  };

  let isWithinAcceptableRange = (element) => {
    let x, y;
    [x, y] = element;
    return x >= 0 && y >= 0 && x <= boardSize - 1 && y <= boardSize - 1;
  };

  let selectAdjacentPositions = (x, y) => {
    return [[x-1, y-1], [x-1, y],
        [x-1, y+1], [x, y+1],
          [x+1, y+1], [x+1, y],
            [x+1, y-1], [x, y-1]].filter(isWithinAcceptableRange);
  };

  let isOccupiedByBomb = (cords) => {
    let x, y;
    [x, y] = cords;
    return board[x][y] == bomb;
  };

  let howManyAdjacentBombs = (x, y) => {
    adjacentPositions = selectAdjacentPositions(x,y);

    let count = 0;
    adjacentPositions
    .forEach( cords => { if (isOccupiedByBomb(cords))  count++; } );
    return count;
  };

  let addHelperDigits = () => {
    board.forEach( (row, x) => {
      row.forEach( (value, y) => {
        if (value == bomb) {
          return;
        } else {
          let count = howManyAdjacentBombs(x, y);
          if (count > 0) board[x][y] = count;
        }
      });
    });
  };

  let showContent = () => {
    board.forEach( (row, x) => {
      row.forEach( (value, y) => {
        $('#' + x + '_' + y).html(value).text();
      });
    });
  };

  let render = () => {
    appendContainer();
    appendGrid();
    addBombs();
    addHelperDigits();
  };

  let activate = (ids) => {
    ids.forEach( id => {
      $('#' + id[0] + '_' + id[2]).addClass('active');
    });
  };

  let findEmptyFieldsTouching = (id) => {
    let x = parseInt(id[0]);
    let y = parseInt(id[2]);
    console.log(selectAdjacentPositions(x,y));
    return [id];
  };

  let toggleActive = (id) => {
    let ids = findEmptyFieldsTouching(id);
    activate(ids);
  };


  return {
    flag        : () => { return flag; },
    bomb        : () => { return bomb; },
    board       : () => { return board; },
    results     : () => { return results; },
    render      : render,
    showContent : showContent,
    toggleActive : (id) => toggleActive(id)
  };


})(jQuery);


$(document).ready( () => {
  minesweeper.render();
  minesweeper.showContent();


  $('.grid').click((e) => {
    minesweeper.toggleActive(e.target.id);
  });

  // $('.grid').html(minesweeper.bomb).text();

});


