
const { of } = require('rxjs');
const { takeWhile, skip } = require('rxjs/operators');

it('Expects to receive only expected values (1)', done => {
  const source = of(1, 2, 3);
  const expected = 1;

  source
    .pipe(takeWhile(data => data === expected))
    .subscribe({
      next: (data) => expect(data).toEqual(expected),
      complete: done
    });
});


it('First value will be skipped, so we expects to receive only first value which not fit condition (2)', done => {
  const source = of(1, 2, 3);
  const expected = 2;

  source
    .pipe(
      takeWhile(data => data === expected, true),
      skip(1)
    )
    .subscribe({
      next: (data) => expect(data).toEqual(expected),
      complete: done
    });
});