const { range } = require('rxjs');

it('Should receive three values from range and complete', done => {
    let i = 0;
    range(1, 3).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(3)
            done();
        }
    })
});

it('Should receive single value from range and complete', done => {
    let i = 0;
    range(3, 1).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(1)
            done();
        }
    })
});

it('Should complete after emiiting', done => {
    range().subscribe({
        complete: () => done()
    })
});
