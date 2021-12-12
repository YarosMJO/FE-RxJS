const create = require('./defer');

const createOne = create.createOne;
const createThree = create.createThree;
const createAndComplete = create.createAndComplete;

it('Receive three values', done => {
    let i = 0;
    createThree(3).subscribe((data) => {
        i++;
        if (data === 3) {
            expect(i).toEqual(3)
            done();
        }
    })
});

it('Receives single value', done => {
    let i = 0;
    createOne(1).subscribe((data) => {
        i++;
        if (data === 1) {
            expect(i).toEqual(1)
            done();
        }
    })
});

it('Completes', done => {
    createAndComplete.subscribe({
        complete: () => {
            done();
        }
    })
});
