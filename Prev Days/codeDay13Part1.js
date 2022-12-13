const input = require('./input.js');

let pairs = input.split('\n\n');

let puzzleSol = 0;

pairs.forEach((pair, index) => {
    let [left, right] = pair.split('\n').map(str => JSON.parse(str));
    if(isOrdered(left, right) !== 'wrong'){
        puzzleSol += index + 1;
        console.log("index", index+1, "is ordered correctly");
    }
});

function isOrdered(left, right){
    if(typeof left === 'number' && typeof right === 'number'){
        return (left <= right ? (left < right ? "right" : "same") : "wrong");
    } else if(typeof left !== typeof right){
        //one is number, one is array
        if(typeof left === 'number'){
            left = [left];
        } else {
            right = [right];
        }
        //make sole number a single elem array and check arrays
    }
    
    //two arrays handling
    for(let i = 0; i < left.length && i < right.length; i++){
        let ordering = isOrdered(left[i], right[i]);
        switch (ordering) {
            case 'right': return 'right';
            case 'wrong': return 'wrong';
        }
    }
    return (left.length <= right.length ? (left.length < right.length ? "right" : "same") : "wrong")
}

console.log(puzzleSol);