let gridSize = 4;
let grid;
const $grid = document.getElementById('grid');


const generateGrid = () => {
    for (let x = 0; x< gridSize; x++){
        const $row = document.createElement("div");
        $row.classList.add("grid-row");
        $grid.append($row);
        for (let y = 0; y < gridSize; y++ ){
            const $cell = document.createElement("div");
            $cell.classList.add("grid-data");
            $row.append($cell);
        }
    }
}

const initGame = () => {
    grid = Array.from(Array(gridSize), () => new Array(gridSize))
    let x1 = randomIntFromInterval(0, gridSize - 1);
    let y1 = randomIntFromInterval(0, gridSize - 1);  
    grid[x1][y1] = 2;

    let x2 = randomIntFromInterval(0, gridSize - 1);
    let y2 = randomIntFromInterval(0, gridSize - 1);

    while(x1 === x2 && y1 === y2){
         x2 = randomIntFromInterval(0, gridSize - 1);
         y2 = randomIntFromInterval(0, gridSize - 1);
    }
    grid[x2][y2] = 2;  
}

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const renderGridState = () => {
      for (let i = 0; i < gridSize ; i++){
        const $row = $grid.querySelectorAll(".grid-row")[i];
        for (let j = 0; j < gridSize; j++){
            const $cell = $row.querySelectorAll(".grid-data")[j];
            $cell.innerHTML = grid[i][j] ?  grid[i][j] : '';
        }
      }
  }



  generateGrid();
  initGame();
  renderGridState();
