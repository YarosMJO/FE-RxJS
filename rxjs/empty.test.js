const { EMPTY, mergeMap } = require('rxjs');

it('Completes immediately and no other value should be emitted after it', done => {
    EMPTY.pipe(
        mergeMap(() => of(1))
    ).subscribe({
        next: _ => expect(i).not.toEqual(1),
        complete: _ => done()
    })
});
