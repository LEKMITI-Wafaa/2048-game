
let gridSize = 4;
let grid;
let isWon = false;
let score = 0;
const defaultCellBackgroundColor = '#cec1b4';
const defaultCellTextColor = '#cec1b4';
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
    [undefined, {backgroundColor: defaultCellBackgroundColor, color: defaultCellTextColor}],
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
    grid = Array.from(Array(gridSize), () => new Array(gridSize));
    score = 0;
   renderscore()

    const point1 = generateRandomCordinates();
    grid[point1.x][point1.y] = 2;

    let point2 = generateRandomCordinates();
    while(JSON.stringify(point1) === JSON.stringify(point2)){
        point2 = generateRandomCordinates();
    }
     grid[point2.x][point2.y] = 2;
    // grid[0][0] = 2; 
    // grid[0][1] = 32;
    // grid[0][2] = 16;
    // grid[1][0] = 32;
    // grid[1][1] = 8;
    // grid[1][2] = 4;
    // grid[2][0] = 64;
    // grid[2][1] = 8;
    // grid[2][2] = 64;
    renderGridState();
   
  
};

const generateRandomCordinates = () => {
    let x = randomIntFromInterval(0, gridSize - 1);
    let y = randomIntFromInterval(0, gridSize - 1);  
    return {x : x, y: y};
}
const getEmptycells  =() => {
    const array = [];
    for(let i = 0 ; i < gridSize; i++ ) {
        for(let j = 0 ; j< gridSize; j++ ) {
            if(!grid[i][j]) {
                array.push({x: i, y:j});
            }
        
        }
    }
    return array;
} 
const addNewValueOfTwo = () => {
    const emptyCells = getEmptycells();
    const newPoint = emptyCells[randomIntFromInterval(0, emptyCells.length)]
    if(newPoint) {
        grid[newPoint.x][newPoint.y] = 2;
    }
}

// generate an integer between [min;max[
const randomIntFromInterval = (min, max) => {  
    return Math.floor(Math.random() * (max - min) + min);
}


const renderGridState = () => {
      for (let i = 0; i < gridSize ; i++){
        const $row = $grid.querySelectorAll(".grid-row")[i];
        for (let j = 0; j < gridSize; j++){
            const $cell = $row.querySelectorAll(".grid-data")[j];
            $cell.innerHTML = grid[i][j] ?  grid[i][j] : '';
            $cell.style.backgroundColor = styleByNumber.get(grid[i][j]).backgroundColor || defaultCellBackgroundColor;
            $cell.style.color = styleByNumber.get(grid[i][j]).color || defaultCellTextColor;
        }
      }
}

let onkeydown = (event) => {
    const keyName = event.key
    switch(keyName) {
            case 'ArrowUp': moveUp(); break;
            case 'ArrowDown': moveDown(); break;
            case 'ArrowLeft': moveLeft(); break;
            case 'ArrowRight': moveRight(); break;
    }
    if(['ArrowUp', 'ArrowDown','ArrowLeft', 'ArrowRight'].includes(keyName)) {
        addNewValueOfTwo();
        renderGridState();         
    }
    if(isGameOver()) {
     document.getElementById("game-over").style.visibility = "visible";
    }
    
}

// Ecouter un click de clavier
document.addEventListener('keydown', onkeydown)   




const moveUp = () => {
    for (let j = 0; j < gridSize; j++){ // parcourir la grille verticallement
        let f = 0;  // represente le plus petit indice dans la recherche du nombre similaire. Le f augmente dès qu'une premiere opération est faite pour ne pas mélanger deux opérations
        for (let i = 1; i < gridSize; i++){ // parcourir une colonne 
            // 2.a
            if (grid[i][j]) { 
                for (let k = i - 1; k >= f ; k--){   // chercher le nombre similaire en haut de la meme colonne, en partant de la case juste au dessus du nombre actuel
                    if (grid[i][j] === grid[k][j]){  // Cas 01:  le cas où on trouve un nombre similaire au dessus
                        grid[k][j] =  grid[k][j]* 2; //          multiplier la valeur du nombre similaire trouvé
                        score += grid[k][j];
                        renderscore();
                        f = k +1                     //          la valeur trouveé n'est plus concernée par la recherche. 
                        grid[i][j] = undefined;      //          mettre la valeur du nombre actuel à undefined vue qu'il a bougé
                        break;                       //          on intrompt la boucle du 'k' car une décision a été prise pour le nombre courant (pour chaque valeur on fait une seul action à la fois)
                   
                    } else if (grid[k][j]){          // Cas 01: le cas où on trouve au dessus un nombre non-similaire mais qui est défini 
                        grid[k+1][j] = grid[i][j]    //         remonte le nombre actuel juste en dessous du nombre non-similaire trouvé
                        if(k+1 !== i){               //         traiter le cas où le nombre actuel ne monte pas (car le nombre non-similaire trouvé est juste en dessus), dans ce cas il ne faut pasle mettre à undefined
                            grid[i][j] = undefined;  //         si le nombre actuel monte ,  mettre sa place précédente (avant qu'il ne bouge) à undefined  
                        }
                        break;                       //         on intrompt la boucle du 'k' car une décision a été prise pour le nombre courant (pour chaque valeur on fait une seul action à la fois)
                    }
                    if (k === f){                    // Cas 03: le cas ou nous avons parcourru toute les cases concernées en dessus mais aucun nombre (similaire ou pas) n'a été trouvé
                        grid[k][j] = grid[i][j];     //         monter le nombre actuel vers la dernière case concernée
                        grid[i][j] = undefined;      //         mettre le nombre actuel à undefined
                    }
                }
            }
            
        }
    }
   
}


const moveDown = () => {
    
   for (let j = 0; j < gridSize; j++){ // parcourir la grille verticallement
        let f = gridSize-1;  // represente le plus grand plafond dans la recherche du nombre similaire. Le f diminue des qu'une premiere operation est faite pour ne pas mélanger deux opérations
        for (let i = gridSize-2; i >= 0; i--){ // parcourir une colonne 
            if (grid[i][j]) { 
                for (let k = i + 1; k <= f ; k++){   // chercher le nombre similaire vers le haut de la meme colonne, en partant de la case juste en dessous du nombre actuel
                    if (grid[i][j] === grid[k][j]){  // Cas 01:  le cas où on trouve un nombre similaire en dessous
                        grid[k][j] =  grid[k][j]* 2; //          multiplier la valeur du nombre similaire trouvé
                        score += grid[k][j];
                        renderscore();
                        f = k -1                     //          la valeur trouvée n'est plus concernée par la recherche. 
                        grid[i][j] = undefined;      //          mettre la valeur du nombre courant à undefined vue qu'il a bougé
                        break;                       //          on intrompt la boucle du 'k' car une décision a été prise pour le nombre courant (pour chaque valeur on fait une seul action à la fois)
                   
                    } else if (grid[k][j]){          // Cas 01: le cas où on  trouve en dessous un nombre non-similaire mais qui est défini 
                        grid[k-1][j] = grid[i][j]    //         descends le nombre actuel juste au dessus du nombre non-similaire trouvé
                        if(k-1 !== i){               //         traiter le cas où le nombre actuel ne descend pas (car le nombre non-similaire trouvé est juste en dessus), dans ce cas il ne faut pas le mettre à undefined
                            grid[i][j] = undefined;  //         si le nombre actuel descend , le mettre à undefined  
                        }
                        break;                       //         on intrompt la boucle du 'k' car une décision a été prise pour le nombre actuel (pour chaque valeur on fait une seul action à la fois)
                    }
                    if (k === f){                    // Cas 03: le cas où nous avons parcourru toutes les cases concernées en dessous mais aucun nombre (similaire ou pas) n'a été trouvé
                        grid[k][j] = grid[i][j];     //         descendre le nombre actuel vers la dernière case concernée (de la boucle)
                        grid[i][j] = undefined;      //         mettre le nombre actuel à undefined
                    }
                }
            }
        }
     }
}

const moveRight = () => {
    for (let i = 0; i < gridSize; i++){ // parcourir la grille horizontallement
        let f = gridSize-1;  // represente le plus  grand plafond dans la recherche du nombre similaire. Le f diminue dès qu'une premiere operation est faite pour ne pas mélanger deux opérations
        for (let j = gridSize - 2; j >= 0; j--){ // parcourir une ligne (gridSize -2 car on commence à partir de l'avant dernière case)
            if (grid[i][j]) { 
                for (let k = j + 1; k <= f ; k++){   // chercher le nombre similaire vers la droite de la meme ligne, en partant de la case juste à droite du nombre actuel
                    if (grid[i][j] === grid[i][k]){  // Cas 01:  le cas où on trouve un nombre similaire à droite
                        grid[i][k] =  grid[i][k]* 2; //          multiplier la valeur du nombre similaire trouvé
                        score += grid[i][k];
                        renderscore();
                        f = k - 1;                   //          la valeur trouvée n'est plus concernée par la recherche. 
                        grid[i][j] = undefined;      //          mettre la valeur du nombre actuel à undefined vue qu'elle a bougé
                        break;                       //          on intrompt la boucle du 'k' car une décision a été prise pour le nombre courant (pour chaque valeur on fait une seul action à la fois)
                   
                    } else if (grid[i][k]){          // Cas 01: le cas où on  trouve à droite un nombre non-similaire mais qui est défini 
                        grid[i][k-1] = grid[i][j]    //         bascule vers la droite le nombre actuel juste avant le nombre non-similaire trouvé
                        if(k-1 !== j){               //         traiter le cas où le nombre actuel ne bascule pas vers la droite  (car le nombre non-similaire trouvé le suis directement à droite), dans ce cas il ne faut pas le mettre à undefined
                            grid[i][j] = undefined;  //         si le nombre actuel bascule vers la droite : le mettre à undefined  
                        }
                        break;                       //         on intrompt la boucle du 'k' car une décision a été prise pour le nombre actuel (pour chaque valeur on fait une seule action à la fois)
                    }
                    if (k === f){                    // Cas 03: le cas où nous avons parcourru toutes les cases concernées à droite mais aucun nombre (similaire ou pas) n'a été trouvé
                        grid[i][k] = grid[i][j];     //         basculer vers la droite le nombre actuel jusqu'à la dernière case possible (plus petit indice possible)
                        grid[i][j] = undefined;      //         mettre le nombre actuel à undefined
                    }
                }
            }
            
        }
     }
}

const moveLeft = () => {
    for (let i = 0; i < gridSize; i++){ // parcourir la grille horizontallement
        let f = 0;  // represente le plus  petit plafond dans la recherche du nombre similaire. Le f augmente dès qu'une premiere operation est faite pour ne pas mélanger deux opérations
        for (let j = 1; j <=gridSize - 1; j++){ // parcourir une ligne (gridSize -1 car on commence à partir de l'avant dernière case)
            if (grid[i][j]) { 
                for (let k = j - 1; k >= f ; k--){   // chercher le nombre similaire vers la gauche de la meme ligne, en partant de la case juste à gauche du nombre actuel
                    if (grid[i][j] === grid[i][k]){  // Cas 01:  le cas où on trouve un nombre similaire à gauche
                        grid[i][k] =  grid[i][k]* 2; //          multiplier la valeur du nombre similaire trouvé
                        score += grid[i][k];
                        renderscore();
                        f = k + 1;                   //          la valeur trouvée n'est plus concernée par la recherche. 
                        grid[i][j] = undefined;      //          mettre la valeur du nombre actuel à undefined vue qu'elle a bougé
                        break;                       //          on intrompt la boucle du 'k' car une décision a été prise pour le nombre courant (pour chaque valeur on fait une seul action à la fois)
                   
                    } else if (grid[i][k]){          // Cas 01: le cas où on  trouve à gauche un nombre non-similaire mais qui est défini 
                        grid[i][k+1] = grid[i][j]    //         bascule vers la gauche le nombre actuel juste avant le nombre non-similaire trouvé
                        if(k+1 !== j){               //         traiter le cas où le nombre actuel ne bascule pas vers la gauche  (car le nombre non-similaire trouvé le suis directement à gauche), dans ce cas il ne faut pas le mettre à undefined
                            grid[i][j] = undefined;  //         si le nombre actuel bascule vers la droite : le mettre à undefined  
                        }
                        break;                       //         on intrompt la boucle du 'k' car une décision a été prise pour le nombre actuel (pour chaque valeur on fait une seule action à la fois)
                    }
                    if (k === f){                    // Cas 03: le cas où nous avons parcourru toutes les cases concernées à gauche mais aucun nombre (similaire ou pas) n'a été trouvé
                        grid[i][k] = grid[i][j];
                             //         basculer vers la gauche le nombre actuel jusqu'à la dernière case possible (plus petit indice possible)
                        grid[i][j] = undefined;      //         mettre le nombre actuel à undefined
                    }
                }
            }
            
        }
     }
}


const  renderscore = () => document.getElementById('digital-score').innerHTML= score;

const tryAgain = () => {
    initGame();
    document.getElementById("game-over").style.visibility = "hidden";
}

const isGameOver = () => {
    for(let i = 0; i< gridSize; i++){
        for (let j = 0 ; j<gridSize; j++){
            
            if(
                 !grid[i][j]                || 
                 (i+1 <gridSize && grid[i][j] === grid[i+1][j] )    ||
                 (i-1 >= 0 && grid[i][j] === grid[i-1][j])    || 
                 grid[i][j] === grid [i][j+1]   || 
                 grid[i][   j] === grid[i][j-1]
                 ){
                return false;
            }
        }  
    }    
    return true;
}
generateGrid();
initGame();

