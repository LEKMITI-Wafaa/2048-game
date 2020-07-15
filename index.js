let gridSize = 4;

const generateGrid = () => {
    const grid = document.querySelector('table');
    for (let x = 0; x< gridSize; x++){
        const row = document.createElement("tr");
        grid.append(row);
        for (let y = 0; y < gridSize; y++ ){
            row.append(document.createElement("td"));
        }
    }
}

generateGrid();