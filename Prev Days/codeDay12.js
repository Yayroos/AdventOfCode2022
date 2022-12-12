const input = require('./input.js');

let heads = [];

let rows = input.split('\n');
let grid = rows.map((row, rIndex) => {
    return row.split('').map((item, cIndex) => {
        if(item === 'S' || item === 'a'){
            startRow = rIndex;
            startCol = cIndex;
            heads.push({row: rIndex, col: cIndex});
            return {height: 'a', steps: 0};
        }
        return {height: item, steps: undefined}
    })
});

let endFound = false;
let endSteps = -1;

while(!endFound){
    [...heads].forEach(head => checkSurround(head));
    grid.map(row => console.log(row.map(item => item.steps ?? '.').join('')));
    console.log('\n\n');
}

function checkSurround({row, col}){
    let currentHeight = grid[row][col].height;
    let adjacent = [{row: row-1, col: col}, {row: row+1, col: col}, {row: row, col: col-1}, {row: row, col: col+1}];
        
    adjacent.forEach(check => {
        if(check.row >= 0 
            && check.col >= 0 
            && check.row < rows.length 
            && check.col < rows[check.row].length){ //is in bounds
            if(grid[check.row][check.col].height.charCodeAt(0) <= currentHeight.charCodeAt(0)+1 //and is reachable
                && (grid[check.row][check.col].steps === undefined || grid[check.row][check.col].steps > grid[row][col].steps + 1) //and this is closer
                && grid[check.row][check.col].height !== 'E'){ //special handle the end point
                //is new best path to here
                grid[check.row][check.col].steps = grid[row][col].steps + 1;
                heads.push({row: check.row, col: check.col});
            }
            if((grid[row][col].height === 'y' || grid[row][col].height === 'z') && grid[check.row][check.col].height === 'E'){
                endFound = true;
                grid[check.row][check.col].steps = grid[row][col].steps + 1;
                endSteps = grid[check.row][check.col].steps;
            }
        }
    })
    heads.splice(0,1);
}

console.log(endSteps);