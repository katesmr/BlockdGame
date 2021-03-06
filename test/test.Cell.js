var Cell = require("../src/core/Cell.js");
var expect = require("chai").expect;

describe("Cell", function(){
    describe("new Cell", function(){
        it("creates Cell object", function(){
            var cell = new Cell();

            expect(cell.constructor).to.equal(Cell);
        });
    });

    describe("computeScore()", function(){
        it("checks total score of empty", function(){
            var cellList = [];
            expect(Cell.computeScore(cellList)).to.equal(0);
        });
    });

    describe("computeScore()", function(){
        it("checks total score of cell list with all cell types", function(){
            var i;
            var count = 10;
            var cellList = [];
            for(i = 0; i < count; ++i){
                cellList.push(new Cell()); // by default price = 1
            }
            cellList[3].transform(Cell.TYPE_EXTRA_BONUS); // set price to 2
            cellList[4].transform(Cell.TYPE_EXTRA_BAD); // set price to 2
            cellList[9].transform(Cell.TYPE_EXTRA_BONUS); // set price to 2
            // normal price - 7, bonus price - 4, bad price - 2
            // 7 * 4 / 2 = 14
            expect(Cell.computeScore(cellList)).to.equal(14);
        });
    });

    describe("computeScore()", function(){
        it("checks total score of cell list with normal and bonus cell types", function(){
            var i;
            var count = 10;
            var cellList = [];
            for(i = 0; i < count; ++i){
                cellList.push(new Cell()); // by default price = 1
            }
            cellList[3].transform(Cell.TYPE_EXTRA_BONUS); // set price to 2
            cellList[9].transform(Cell.TYPE_EXTRA_BONUS); // set price to 2
            // normal price - 8, bonus price - 4, dab price - 0
            // 8 * 4
            expect(Cell.computeScore(cellList)).to.equal(32);
        });
    });

    describe("computeScore()", function(){
        it("checks total score of cell list with normal and bad cell types", function(){
            var i;
            var count = 10;
            var cellList = [];
            for(i = 0; i < count; ++i){
                cellList.push(new Cell()); // by default price = 1
            }
            cellList[3].transform(Cell.TYPE_EXTRA_BAD); // set price to 2
            // normal price - 9, bonus price - 0, dab price - 2
            // 9 / 2 = 4.5 ~ 4
            expect(Cell.computeScore(cellList)).to.equal(4);
        });
    });

    describe("computeScore()", function(){
        it("checks total score of cell list with normal cell types", function(){
            var i;
            var count = 10;
            var cellList = [];
            for(i = 0; i < count; ++i){
                cellList.push(new Cell()); // by default price = 1
            }
            // normal price - 10, bonus price - 0, dab price - 0
            expect(Cell.computeScore(cellList)).to.equal(10);
        });
    });

    describe("isType()", function(){
        it("checks default type", function(){
            var cell = new Cell();
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks normal type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_NORMAL);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks bad type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BAD);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks bonus type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
        });
    });

    describe("isType()", function(){
        it("checks double change type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            cell.transform(Cell.TYPE_NORMAL); // set back
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isFree()", function(){
        it("checks free value cell", function(){
            var cell = new Cell();
            expect(cell.isFree()).to.equal(true);
        });
    });

    describe("isFree()", function(){
        it("checks free value cell", function(){
            var cell = new Cell();
            cell.setValue(6);
            expect(cell.isFree()).to.equal(false);
        });
    });

    describe("transform()", function(){
        it("checks transform to normal", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_NORMAL);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.getPrice()).to.equal(Cell.PRICE_X1);
        });
    });

    describe("transform()", function(){
        it("checks transform to bonus", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
            expect(cell.getPrice()).to.equal(Cell.PRICE_X2);
        });
    });

    describe("transform()", function(){
        it("checks transform to bad", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BAD);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(cell.getPrice()).to.equal(Cell.PRICE_X2);
        });
    });

    describe("reset()", function(){
        it("checks reset default cell", function(){
            var cell = new Cell();
            cell.reset();
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.getValue()).to.equal(Cell.FREE_CELL_VALUE);
        });
    });

    describe("reset()", function(){
        it("checks reset", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            cell.reset();
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.getValue()).to.equal(Cell.FREE_CELL_VALUE);
        });
    });

    describe("equals()", function(){
        it("checks equals equal cells", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            expect(currentCell.equals(otherCell)).to.equal(true);
        });
    });

    describe("equals()", function(){
        it("checks equals not equal value of cells", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            otherCell.setValue(6);
            expect(currentCell.equals(otherCell)).to.equal(false);
            expect(currentCell.isType(Cell.TYPE_NORMAL) === otherCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(currentCell.getValue() === otherCell.getValue()).to.equal(false);
        });
    });

    describe("equals()", function(){
        it("checks equals not equal type of cells", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            currentCell.transform(Cell.TYPE_EXTRA_BONUS);
            expect(currentCell.equals(otherCell)).to.equal(true);
            expect(currentCell.isType(Cell.TYPE_NORMAL) === otherCell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(currentCell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
            expect(currentCell.getPrice() === otherCell.getPrice()).to.equal(false);
        });
    });

    describe("equals()", function(){
        it("checks equals not equal type of cells", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            otherCell.transform(Cell.TYPE_EXTRA_BAD);
            expect(currentCell.equals(otherCell)).to.equal(true);
            expect(currentCell.isType(Cell.TYPE_NORMAL) === otherCell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(otherCell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(currentCell.getPrice() === otherCell.getPrice()).to.equal(false);
        });
    });

    describe("swap()", function(){
        it("checks swap", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            currentCell.transform(Cell.TYPE_EXTRA_BONUS);
            currentCell.swap(otherCell);
            expect(currentCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(currentCell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
            expect(otherCell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(otherCell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
        });
    });

    describe("swap()", function(){
        it("checks swap equals cells", function(){
            var currentCell = new Cell();
            var otherCell = new Cell();
            currentCell.swap(otherCell);
            expect(currentCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(otherCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(currentCell.getValue() === otherCell.getValue()).to.equal(true);
        });
    });

    describe("swap()", function(){
        it("checks swap self", function(){
            var currentCell = new Cell();
            currentCell.swap(currentCell);
            expect(currentCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
        });
    });

    describe("clone()", function(){
        it("checks clone method", function(){
            var cell = new Cell();
            var newCell = cell.clone();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            expect(newCell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
            expect(newCell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(false);
        });
    });

    describe("clone()", function(){
        it("checks clone method", function(){
            var cell = new Cell();
            var newCell = cell.clone();
            newCell.transform(Cell.TYPE_EXTRA_BAD);
            expect(newCell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(newCell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
        });
    });
});

