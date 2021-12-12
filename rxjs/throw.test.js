const create = require('./throw');
const createAndComplete = create.createAndComplete;

it('Completes immediately', done => {
    createAndComplete.subscribe({
        next: (data) => console.log(data),
        complete: () => console.log("Completed and not any error throwed"),
        error: val => {
            console.log(`Error: ${val}`);
            done();
        }
    })
});
