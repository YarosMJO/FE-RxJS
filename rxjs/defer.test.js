const { of, EMPTY, defer, pipe, finalize } = require('rxjs');


it('Should receive exactly three values', done => {
    let i = 0;
    let emitThreeValues = true;

    defer(() => {
        return emitThreeValues
            ? of(1, 2, 3)
            : EMPTY;

    }).pipe(finalize(() => {
        expect(i).toEqual(3)
        done();
    })).subscribe(_ => i++)
});

it('Should receive single value', done => {
    let i = 0;
    let emitOneValues = true;

    defer(() => {
        return emitOneValues
            ? of(1)
            : EMPTY;

    }).pipe(
        finalize(() => {
            expect(i).toEqual(1)
            done();
        })
    ).subscribe(_ => i++)
});

it('Must comlete', done => {
    defer(() => of(true)).subscribe({
        complete: () => done()
    })
});
