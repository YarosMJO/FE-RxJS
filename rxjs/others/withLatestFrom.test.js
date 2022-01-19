const { of, mergeMap, concatMap, from, delay, interval } = require('rxjs');
const { take, withLatestFrom, skip } = require('rxjs/operators');


jest.setTimeout(7000);
it('Should receive first observable value + last value from second obs', done => {
  const begin = "Caesar ";
  const end1 = "veni";
  const end2 = "vedi";
  const end3 = "vici";

  const endArray = [
    end1, end2, end3
  ]

  const expectedValue = begin + end2;

  interval(3000)
    .pipe(
      skip(1),
      take(1),
      mergeMap(() => of(begin)),
      withLatestFrom(from(endArray)
        .pipe(
          concatMap(val => of(val).pipe(delay(2000))),
        )),
    )
    .subscribe(
      ([firstValue, secondValue]) => {
        expect(firstValue + secondValue).toEqual(expectedValue);
        done();
      }
    );
});

