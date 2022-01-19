const { of, throwError } = require('rxjs');
const { catchError } = require('rxjs/operators');

it('Expects to catch value and handle it, passing next value to the stream', done => {
  const expectedErrorMessage = () => 'Error';
  const errorCaughtMessage = 'Caught';

  throwError(expectedErrorMessage)
    .pipe(
      catchError(val => {
        expect(val).toEqual(expectedErrorMessage());
        return of(errorCaughtMessage);
      })
    )
    .subscribe(val => {
      expect(val).toEqual(errorCaughtMessage);
      done();
    });
});


it('Expects to catch value and throw another one to observer', done => {
  const expected = 'Error';
  const expected2 = 'Error again';
  const expectedErrorMessage = () => 'Error';

  throwError(expectedErrorMessage)
    .pipe(
      catchError(val => {
        expect(val).toEqual(expected);
        return throwError(() => expected2)
      })
    )
    .subscribe({
      error: val => {
        expect(val).toEqual(expected2);
        done();
      }
    });
});