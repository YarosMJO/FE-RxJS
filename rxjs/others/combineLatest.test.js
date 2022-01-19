const { of, timer, mergeMap, combineLatest, EMPTY, merge, take } = require('rxjs');
const { last, skip, takeUntil } = require('rxjs/operators');


jest.setTimeout(7000);
it('Expected string should be equal to final emitted value', done => {
  const slogan = "Just do it";
  const expectedSloganArray = slogan.split(" ");

  combineLatest([
    timer(0).pipe(mergeMap(() => of(`${expectedSloganArray[0]} `))),
    timer(1000).pipe(mergeMap(() => of(`${expectedSloganArray[1]} `))),
    timer(1500).pipe(mergeMap(() => of(`${expectedSloganArray[2]}`))),
  ])
    .pipe(
      last()
    )
    .subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        expect(timerValOne + timerValTwo + timerValThree).toEqual(expectedSloganArray.join(" "));
        done();
      }
    );
});

it('Emitted values should be received at the same time, whenever they was emitted', done => {
  const expectedCheckSum = 2;

  combineLatest([
    timer(0).pipe(mergeMap(() => of(1))),
    timer(1000).pipe(mergeMap(() => of(1))),
  ])
    .subscribe(
      ([timerValOne, timerValTwo]) => {
        expect(timerValOne + timerValTwo).toEqual(expectedCheckSum);
        done();
      }
    );
});

it('Result value should combine new and latest value from other source', done => {
  const expectedCheckSum = 3;

  combineLatest([
    timer(0, 1000), // 0 1 2 3
    timer(3000, 3000)// 0
  ])
    .pipe(
      skip(1),
      take(1)
    )
    .subscribe(
      ([timerValOne, timerValTwo]) => {
        expect(timerValOne + timerValTwo).toEqual(expectedCheckSum);
        done();
      }
    );
});


it('Only if all of observables emit at least one value then emit both combined. Here this condition not gonna met so we expect only one value', done => {
  const expectedValue = "Value";

  merge(
    combineLatest([
      timer(0).pipe(mergeMap(() => of("Some value"))),
      timer(2000).pipe(mergeMap(() => EMPTY)),
    ]),
    timer(1000).pipe(mergeMap(() => of(expectedValue))),
  )
    .pipe(
      last()
    )
    .subscribe(
      (value) => {
        expect(value).toEqual(expectedValue);
        done();
      }
    );
});
