const { of, mergeMap, throwError, interval, take, Subject } = require('rxjs');
const { retry } = require('rxjs/operators');

jest.setTimeout(10000);
it('Expects to retry two times after error occured', done => {
  // 0 - accepted; 1 - unaccepted;
  // Three times will be accepted value : 0---1---0---1---0 |; 
  const expectedCount = 3;
  // expected value whole time, because error appear on the others.
  const expectedValue = 0;

  const expectedRetryCount = 2;
  const sub = new Subject();

  sub
    .pipe(
      take(expectedCount)
    )
    .subscribe({
      next: (data) => {
        expect(data).toEqual(expectedValue);
      },
      complete: () => {
        sourceSubscription.unsubscribe();
        done();
      }
    })

  const sourceSubscription = interval(1000)
    .pipe(
      mergeMap((data) => {
        return data % 2 !== 0
          ? throwError(() => "Error")
          : of(data);
      }),
      retry(expectedRetryCount)
    )
    .subscribe((data) => sub.next(data))
});