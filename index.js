
let gridSize = 4;
let grid;
let isGameOver = false;
let isWon = false;

const styleByNumber = new Map([
    [2, {backgroundColor:'#eee4da', color:'#776d64'}],
    [4, {backgroundColor:'#ede0c8', color:'#776d64'}],
    [8, {backgroundColor:'#f2b179', color:'#f9f6f2'}],
    [16, {backgroundColor:'#f09462', color:'#f9f6f2'}],
    [32, {backgroundColor:'#ed7b5e', color:'#f9f6f2'}],
    [64, {backgroundColor:'#e84c24', color:'#f9f6f2'}],
    [128, {backgroundColor:'#f4d066', color:'#f9f6f2'}],
    [256, {backgroundColor:'#f2c747', color:'#f9f6f2'}],
    [512, {backgroundColor:'#ecbd32', color:'#f9f6f2'}],
    [1024, {backgroundColor:'#ba591f', color:'#f9f6f2'}],
    [2048, {backgroundColor:'#9a5315', color:'#f9f6f2'}],
    [undefined, {backgroundColor:'#cec1b4', color:'#f9f6f2'}],
]);


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
};

const randomIntFromInterval = (min, max) => {  
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const renderGridState = () => {
      for (let i = 0; i < gridSize ; i++){
        const $row = $grid.querySelectorAll(".grid-row")[i];
        for (let j = 0; j < gridSize; j++){
            const $cell = $row.querySelectorAll(".grid-data")[j];
            $cell.innerHTML = grid[i][j] ?  grid[i][j] : '';
            $cell.style.backgroundColor = styleByNumber.get(grid[i][j]).backgroundColor;
            $cell.style.color = styleByNumber.get(grid[i][j]).color;
        }
      }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key
    switch(keyName) {
        case 'ArrowUp': moveUp(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
    }      

})   

const moveUp = () => {
    console.log("moveUp")
}

const moveDown = () => {
    console.log("moveDown")
}

const moveLeft = () => {
    console.log("moveLeft")
}

const moveRight = () => {
    console.log("moveRight")
}

generateGrid();
initGame();
renderGridState();

