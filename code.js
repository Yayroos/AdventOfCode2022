const input = require('./input.js');

let splitinput = input.split('\n');

let xReg = 1;

let clock = 0;

let outString = '';

function incrementClock(){
    render();
    clock ++;
    if(clock <= 220 && clock % 40 === 0){
        outString += '\n';
    }
}

function updatexReg(val){
    xReg += val;
}

function render(){
    let drawingCol = clock % 40;
    if(Math.abs(drawingCol - xReg) <= 1){
        outString += '#';
    } else {
        outString += '.';
    }
}

splitinput.forEach(instruction => {
    if(instruction === 'noop'){
        incrementClock();
    } else {
        let change = parseInt(instruction.split(' ')[1]);
        incrementClock();
        incrementClock();
        updatexReg(change);
    }
})

console.log(outString);