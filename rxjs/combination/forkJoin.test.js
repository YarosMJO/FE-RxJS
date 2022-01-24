const { of, forkJoin } = require('rxjs');


it('Should receive last values only, so in result will be 5', done => {
  const firstObsValue = 1;
  const secondObsValue = 2;
  const thirdObsValue = 3;
  const expectedValue = 5;

  forkJoin(
    of(firstObsValue, secondObsValue),
    of(firstObsValue, thirdObsValue),
  )
    .subscribe(
      ([secondObsValue, thirdObsValue]) => {
        expect(secondObsValue + thirdObsValue).toEqual(expectedValue);
        done();
      }
    );
});

