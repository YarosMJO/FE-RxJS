const { from } = require('rxjs');

it('Should receive three values from array', done => {
    let i = 0;
    from([1, 2, 3]).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(3)
            done();
        }
    })
});

it('Should receive single value from array', done => {
    let i = 0;
    from([1]).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(1)
            done();
        }
    })
});

it('Should completes', done => {
    from([]).subscribe({
        complete: () => done()
    })
});
