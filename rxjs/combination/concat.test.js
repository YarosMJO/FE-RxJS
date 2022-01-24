const { of, concat, interval } = require('rxjs');
const { skip, take } = require('rxjs/operators');

it('Should receive always second obs value, other will be skipped', done => {
  const firstObsValue = 1;
  const secondObsValue = 2;
  const expectedValue = secondObsValue;

  concat(
    of(firstObsValue),
    of(firstObsValue),
    of(firstObsValue),
    of(secondObsValue),
  )
    .pipe(skip(3))
    .subscribe(
      (value) => {
        expect(value).toEqual(expectedValue);
        done();
      }
    );
});


it('Skip some values from infinite source and expect to receive 3 (any not from the second observable)', done => {
  const secondObsValue = 1;
  const itemsToSkip = 3; // can be any number > 2 to be sure we always will receive values from infinite source
  const expectedValue = 3;

  concat(
    interval(1000),
    of(secondObsValue),
  )
    .pipe(
      skip(itemsToSkip),
      take(1)
    )
    .subscribe(
      (value) => {
        expect(value).toEqual(expectedValue)
        done();
      }
    );
});
