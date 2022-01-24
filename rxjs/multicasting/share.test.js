const { timer } = require('rxjs');
const { tap, share } = require('rxjs/operators');

it('Side effect shoud be emitted only once, value shares between subscribers', done => {
    const expectedValue = 0;

    const sharedSource = timer(1000).pipe(
        tap((value) => {
            expect(value).toEqual(expectedValue);
        }),
        share()
    );

    sharedSource.subscribe();
    sharedSource.subscribe();

    timer(3000).subscribe(done());
});