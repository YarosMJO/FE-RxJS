const { of, finalize } = require('rxjs');
const { take, startWith, scan, skip, last } = require('rxjs/operators');


it('Final result should be expected value in correct order and be equal "Expected value"', done => {
  const expectedValue = "Expected value";
  const expectedPart1 = "Expected ";
  const expectedPart2 = "value";

  of(expectedPart2).pipe(
    take(1),
    startWith(expectedPart1),
    scan((acc, curr) => expect(acc + curr).toEqual(expectedValue)),
    finalize(done)
  ).subscribe();
});

it('First three values will be skipped and final result should be 4', done => {
  const expectedValue = 4;

  of(expectedValue).pipe(
    startWith(1, 2, 3),
    skip(3),
  ).subscribe(
    (value) => {
      expect(value).toEqual(expectedValue);
      done();
    }
  );
});

it('First value is 0, not 1 because startWith should be first, so last value must to be 3', done => {
  const expectedValue = 3;

  of(0).pipe(
    skip(1),
    startWith(1, 2, 3),
    last()
  ).subscribe(
    (value) => {
      expect(value).toEqual(expectedValue);
      done();
    }
  );
});
