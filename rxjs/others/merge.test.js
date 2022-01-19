const { of, merge } = require('rxjs');
const { skip } = require('rxjs/operators');


it('Pass two value, skip first and expect to receive second, both should be passed to subscriber', done => {
  const expectedValue = 1;

  merge(
    of(expectedValue),
    of(expectedValue)
  )
    .pipe(skip(1))
    .subscribe(
      (value) => {
        expect(value).toEqual(expectedValue);
        done();
      }
    );
});


it('Pass first value and skip it, expect receive second value from merge', done => {
  const firstObsValue = 1;
  const secondObsValue = 2;
  const expectedValue = secondObsValue;
  const { merge } = require('rxjs/operators');

  of(firstObsValue)
    .pipe(
      skip(1),
      merge(
        of(secondObsValue)
      )
    ).subscribe(
      (value) => {
        expect(value).toEqual(expectedValue);
        done();
      }
    );
});