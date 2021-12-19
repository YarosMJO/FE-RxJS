const { of } = require('rxjs');

it('Receive three values', done => {
    let i = 0;
    of(1, 2, 3).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(3)
            done();
        }
    })
});

it('Receives single value', done => {
    let i = 0;
    of(1).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(1)
            done();
        }
    })
});

it('Completes', done => {
    of().subscribe({
        complete: () => done()
    })
});
