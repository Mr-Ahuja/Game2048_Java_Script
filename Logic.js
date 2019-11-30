class Logic {
    constructor(size) {
        this.size = size;
        this.grid = [];
        this.freeIndex = Array.from(Array(size * size).keys());

        for (let x = 0; x < size; x++) {
            let subArray = [];
            for (let y = 0; y < size; y++) {
                subArray.push(0);
            }
            this.grid.push(subArray);
        }

        this.addValueInGrid();
        this.addValueInGrid();
    }

    getRandomNumberInRange(min, max) {
        ++max;
        return Math.floor(Math.random() * (+max - +min)) + +min;
    }

    getFreeIndexCount() {
        return this.freeIndex.length;
    }

    getNewValueIndex() {
        return this.newValueIndex;
    }

    getFreeIndexRandom() {
        let randomIndex = this.getRandomNumberInRange(
            0,
            this.getFreeIndexCount() - 1
        );
        let freeIndexValue = this.freeIndex[randomIndex];
        this.newValueIndex = freeIndexValue;
        this.freeIndex.splice(randomIndex, 1);
        return freeIndexValue;
    }

    getRandomNumber2and4() {
        if (this.getRandomNumberInRange(1, 10) == 1) return 4;
        return 2;
    }

    addValueInGrid(value = this.getRandomNumber2and4()) {
        let freeIndexValue = this.getFreeIndexRandom();
        let xCord = Math.floor(freeIndexValue / this.size);
        let yCord = freeIndexValue % this.size;
        this.grid[xCord][yCord] = value;
        return this.grid;
    }
}

class Action extends Logic {
    constructor(size, winningValue, winningTrigger, lossTrigger) {
        super(size);
        this.winningValue = winningValue;
        this.winningTrigger = winningTrigger;
        this.lossTrigger = lossTrigger;
        this.check = true;
    }

    moveLeft(sequence = []) {
        return this.gravity(false,false);
    }

    moveRight() {
        return this.gravity(true,false);
    }

    moveDown() {
        return this.gravity(true,true);
    }

    moveUp() {
        return this.gravity(false,true);
    }

    getCopyOfArray(array) {
        return array.map(function (arr) {
            return arr.slice();
        });
    }

    // Single Method to reduce Redundancy
    gravity(antiGravity, metaGravity) {
        //Flushing free Spaces
        this.freeIndex = [];
        let sequence = [];
        for (let x = 0; x < this.size; ++x) {
            let values = [];
            for (let y = 0; y < this.size; ++y) {
                let X = x,
                    Y = y;

                if (metaGravity) {
                    let temp = x;
                    X = y;
                    Y = temp;
                }

                if (this.grid[X][Y] != 0) values.push(this.grid[X][Y]);
            }

            if (antiGravity) values.reverse();

            values = this.mergeSequence(values);

            //To add rest spaces as 0
            for (let y = this.size - values.length; y > 0; --y) values.push(0);

            if (antiGravity) values.reverse();

            for (let y = 0; y < this.size; ++y) {
                let X = x,
                    Y = y;

                if (metaGravity) {
                    let temp = x;
                    X = y;
                    Y = temp;
                }

                this.grid[X][Y] = values[y];
                //To keep track of Empty Indexes
                if (this.grid[X][Y] == 0) this.freeIndex.push(X * this.size + Y);
            }

            sequence.push(this.getCopyOfArray(this.grid));
        }
        if (this.getFreeIndexCount() > 0) this.addValueInGrid();

        if (this.check) this.checkForLost();

        sequence.push(this.getCopyOfArray(this.grid));
        return sequence;
    }

    checkForLost() {
        if (this.getFreeIndexCount() != 0) return;

        this.check = false;
        let gridCopy = this.getCopyOfArray(this.grid);

        this.moveDown();
        this.moveUp();
        this.moveLeft();
        this.moveRight();

        this.check = true;

        let validation = true;

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.grid[x][y] == gridCopy[x][y]) {
                    validation = validation && true;
                } else {
                    validation = validation && false;
                }
            }
        }

        if (validation) this.lossTrigger();
        else this.grid = gridCopy;
    }

    mergeSequence(values) {
        for (let iter = 0; iter < values.length; ++iter) {
            if (iter + 1 < values.length && values[iter] === values[iter + 1]) {
                values[iter] = values[iter] * 2;
                values.splice(iter + 1, 1);

                if (values[iter] == this.winningValue) this.winningTrigger();
            }
        }
        return values;
    }

    getGrid(){
        return this.grid;
    }
}
