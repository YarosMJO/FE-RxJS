const { Observable } = require('rxjs');

it('Receives three values and error when receive more', done => {
    let i = 0;
    new Observable(
        (observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        }
    ).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(3)
            done();
        }
    })
});

it('Receives single value, error othervise', done => {
    let i = 0;
    new Observable(
        (observer) => {
            observer.next(1);
            observer.complete();
        }
    ).subscribe({
        next: _ => i++,
        complete: () => {
            expect(i).toEqual(1)
            done();
        }
    })
});

it('Should just complete', done => {
    new Observable((observer) => observer.complete())
        .subscribe({
            complete: () => done()
        })
});
