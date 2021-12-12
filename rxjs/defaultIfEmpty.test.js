const create = require('./defaultIfEmpty');
const createDefaultValueWhenEmpty = create.createDefaultValueWhenEmpty;
const createEmittedValueAfterEmpty = create.createEmittedValueAfterEmpty;

it('Default value if nothing emitted after empty', done => {
    createDefaultValueWhenEmpty.subscribe({
        next: (data) => {
            if (data === "Default value") done()
        }
    })
});

it('Return emitted value if its not empty', done => {
    createEmittedValueAfterEmpty.subscribe({
        next: (data) => {
            if (data !== "Default value") done()
        }
    })
});
