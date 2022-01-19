
const { of, Subject } = require('rxjs');
const { takeUntil } = require('rxjs/operators');

it('Expects to receive only one expected(1) value and completes when subject completes', done => {
  const source = of(1, 2, 3);
  const expected = 1;
  const sub = new Subject();

  source
    .pipe(takeUntil(sub))
    .subscribe({
      next: (data) => {
        expect(data).toEqual(expected);
        sub.next(true);
      },
      complete: done
    });
});