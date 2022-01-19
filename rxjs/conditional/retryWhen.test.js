const { mergeMap, throwError, interval, take, Subject, timer } = require('rxjs');
const { retryWhen, delayWhen, } = require('rxjs/operators');

jest.setTimeout(10000);
it('Expects to retry with two seconds delay and in result to be two seconds later then etalon', done => {
  const sub = new Subject();

  // etalonCount:  1---1---1---1
  // count:        1---e---x---1 (two seconds for delay)

  const etalonTimes = 4;
  const expectedDelaySeconds = 2;

  let count = 0;
  let etalonCount = 0;

  const base = interval(1000)
    .pipe(
      mergeMap(() => {
        sub.next();
        return throwError(() => "Error")
      }),
      retryWhen(errors =>
        errors.pipe(
          delayWhen(() => timer(2000))
        )
      ))
    .subscribe();

  interval(1000)
    .pipe(take(etalonTimes))
    .subscribe({
      next: () => etalonCount++,
      complete: () => {
        base.unsubscribe();
        expect(etalonCount).toEqual(count + expectedDelaySeconds);
        done();
      }
    })

  sub.subscribe(() => count++);
});