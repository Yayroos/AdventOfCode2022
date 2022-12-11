const input = require('./input.js');
const Monkey = require('./monkey.js');

let monkeyStrings = input.split('\n\n');



let monkeys = monkeyStrings.map(str => new Monkey(str, ((item, dest) => throwTo(item, dest))));
console.log(monkeys);

let lowestCommonMultiple = monkeys.reduce((accum, currentMonkey) => {
    return accum * currentMonkey.testVal;
},1);

console.log("lcm is", lowestCommonMultiple);

function throwTo(item, dest){
    monkeys[dest].catch(item % lowestCommonMultiple);
}

for(let i = 0; i < 10000; i++){
    monkeys.forEach(monkey => {
        monkey.turn();
    });

    console.log("at end of round", i);
}

monkeys.forEach(monkey => console.log(monkey.inspected));

let top = 0;
let second = 0;

monkeys.forEach(monkey => {
    if(monkey.inspected >= top){
        second = top;
        top = monkey.inspected;
    } else if(monkey.inspected >= second){
        second = monkey.inspected;
    }
})

console.log(top * second);