const { timer } = require('rxjs');
const { tap, shareReplay, share } = require('rxjs/operators');

it('Value should be emitted', done => {
    const expectedValue = 0;

    const sharedSource = timer(1000).pipe(
        tap((value) => {
            expect(value).toEqual(expectedValue);
        }),
        shareReplay({ refCount: true })
    );

    sharedSource.subscribe();
    sharedSource.subscribe();

    timer(3000).subscribe(done());
});