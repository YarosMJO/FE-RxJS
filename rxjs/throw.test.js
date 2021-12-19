const { throwError, mergeMap } = require('rxjs');
const { of } = require('rxjs/operators');

it('Should completes immediately, value emitted after throwed error shouldnt be emetted after it', done => {
    throwError(() => "Error!")
        .pipe(
            mergeMap(() => of(1))
        ).subscribe({
            next: (data) => console.log(data),
            complete: () => console.log("Completed and not any error throwed"),
            error: _ => done()
        })
});
