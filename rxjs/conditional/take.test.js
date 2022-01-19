const { of } = require('rxjs');
const { take } = require('rxjs/operators');

it('Expects to receive only one expected(1) value and completes', done => {
  const source = of(1, 2, 3);
  const expected = 1;

  source
    .pipe(take(1))
    .subscribe({
      next: (data) => expect(data).toEqual(expected),
      complete: done
    })
});