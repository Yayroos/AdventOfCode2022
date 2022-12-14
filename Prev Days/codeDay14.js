const input = require('./input.js');

const FILLED = 1;

let lines = input.split('\n');

let rockCells = [];

lines.forEach(line => {
    let coordStrings = line.split(' -> ');
    let coords = coordStrings.map(pair => pair.split(',').map(val => parseInt(val)));
    coords.forEach(([x, y], index) => {
        //placeRock(x,y);
        //determine direction and length to next point
        if(index < coords.length - 1){
            //there is a next point
            if(x === coords[index + 1][0]){
                //same col, moving up or down
                let dir = (y > coords[index+1][1] ? -1 : 1)
                for(let i = y; i !== coords[index + 1][1]; i += 1*dir){
                    //placeRock(x, i);
                    rockCells.push(JSON.stringify([x,i]));
                }

            } else {
                //same row, moving side to side
                let dir = (x > coords[index+1][0] ? -1 : 1)
                for(let i = x; i !== coords[index + 1][0]; i += 1*dir){
                    //placeRock(i, y);
                    rockCells.push(JSON.stringify([i,y]));
                }
            }
        } else {
            //endpoint
            rockCells.push(JSON.stringify([x,y]));
        }
    })
});

let maxY = rockCells.reduce((current, cell) => (JSON.parse(cell)[1] > current ? JSON.parse(cell)[1] : current), 0);
//let minX = rockCells.reduce((current, cell) => (JSON.parse(cell)[0] < current ? JSON.parse(cell)[0] : current), Infinity);
//let maxX = rockCells.reduce((current, cell) => (JSON.parse(cell)[0] > current ? JSON.parse(cell)[0] : current), 0);

let xWidth = 1000;

//setup some graphic for debug
let grid = Array.from(Array(maxY + 1 + 2), () => new Array(xWidth).fill(' ')); //leave space on either side

grid[maxY + 2] = new Array(xWidth).fill('#'); //part 2 rocky floor

rockCells.forEach(cell => {
    let [x, y] = JSON.parse(cell);
    grid[y][x] = '#';
})


//all rocks placed, now start flowing sand

let settledSand = [];

let settledCount = 0;
let settling = true;
let lastSandSettled = true;
let currentSand;

while(settling){
    if(lastSandSettled){
        if(currentSand && currentSand.x === 500 && currentSand.y === 0){
            settling = false;
            break;
        }
        lastSandSettled = false;
        currentSand = {x: (500), y: 0};
    }
    if(grid[currentSand.y + 1][currentSand.x] === ' '){
        //move down
        grid[currentSand.y][currentSand.x] = ' ';
        currentSand.y++;
        //if(currentSand.y === maxY){
            //falling past grid
        //    settling = false;
        //} else {
            grid[currentSand.y][currentSand.x] = '~';
        //}
    } else if(grid[currentSand.y + 1][currentSand.x - 1] === ' '){
        //move diagonal left
        grid[currentSand.y][currentSand.x] = ' ';
        currentSand.y++;
        currentSand.x--;
        //if(currentSand.y === maxY){
            //falling past grid
        //    settling = false;
        //} else {
            grid[currentSand.y][currentSand.x] = '~';
        //}
    } else if(grid[currentSand.y + 1][currentSand.x + 1] === ' '){
        //move diagonal right
        grid[currentSand.y][currentSand.x] = ' ';
        currentSand.y++;
        currentSand.x++;
        //if(currentSand.y === maxY){
            //falling past grid
        //    settling = false;
        //} else {
            grid[currentSand.y][currentSand.x] = '~';
        //}
    } else {
        //no options, settle
        settledSand.push(JSON.stringify([currentSand.x, currentSand.y]));
        grid[currentSand.y][currentSand.x] = 'O';
        settledCount++;
        lastSandSettled = true;
        //grid.map(row => console.log(row.join('')));
    }
}

console.log(settledCount);