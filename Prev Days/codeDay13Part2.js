const input = require('./input.js');

let packets = input.split('\n');
packets = packets.filter(line => line !== '');
packets.push('[[2]]', '[[6]]')

packets = packets.map(str => JSON.parse(str));


let puzzleSol = 0;

packets.sort((a, b) => {
    return isOrdered(a, b);
});

function isOrdered(left, right){
    if(typeof left === 'number' && typeof right === 'number'){
        return (left <= right ? (left < right ? -1 : 0) : 1);
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
            case -1: return -1;
            case 1: return 1;
        }
    }
    return (left.length <= right.length ? (left.length < right.length ? -1 : 0) : 1)
}

let twoPacket, sixPacket;

packets.forEach((packet, index) => {
    if(JSON.stringify(packet) === '[[2]]'){
        twoPacket = index + 1;
    }
    if(JSON.stringify(packet) === '[[6]]'){
        sixPacket = index + 1;
    }
})

console.log(twoPacket * sixPacket);