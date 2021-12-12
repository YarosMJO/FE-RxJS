const create = require('./defer');
const createAndComplete = create.createAndComplete;

it('Completes immediately', done => {
    createAndComplete.subscribe({
        next: (data) => console.log(data),
        complete: () => done()
    })
});
