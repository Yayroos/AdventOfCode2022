class Monkey{

    name;
    inspected;
    items;
    operator;
    operationValue;
    testVal;
    trueDest;
    falseDest;
    
    constructor(monkeyString, throwToFunc){
        this.throwTo = throwToFunc;
        let lines = monkeyString.split('\n').map(line => line.trim());
        this.name = lines[0];
        this.inspected = 0;
        this.items = lines[1].substring('Starting items: '.length).split(', ').map(val => parseInt(val));
        this.operator = lines[2].split(' ')[4];
        this.operationValue = lines[2].split(' ')[5];
        this.testVal = parseInt(lines[3].split(' ')[3]);
        this.trueDest = parseInt(lines[4].split(' ')[5]);
        this.falseDest = parseInt(lines[5].split(' ')[5]);
    }

    catch(item){
        this.items.push(item);
    }

    operation () {
        //console.log(this.name, "inspects item value", this.items[0])
        if(this.operator === '+'){
            this.items[0] += (this.operationValue === 'old' ? this.items[0] : parseInt(this.operationValue));
        } else {
            this.items[0] *= (this.operationValue === 'old' ? this.items[0] : parseInt(this.operationValue));
        }
        this.inspected++;
        //this.items[0] = Math.floor(this.items[0] / 3); //removed in part 2
        this.test();
    }

    test(){
        (this.items[0] % this.testVal === 0 ? this.throw(this.trueDest) : this.throw(this.falseDest))
    }

    throw(dest){
        this.throwTo(this.items.splice(0, 1)[0], dest);
    }

    turn(){
        while(this.items.length !== 0){
            this.operation();
        }
    }
}

module.exports = Monkey;