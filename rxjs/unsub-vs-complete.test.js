const { Observable } = require('rxjs');
const { take, last } = require('rxjs/operators');

it('Should unsubscribe all subscriptions when observable completes', done => {
    const expected = 1;

    new Observable(
        (observer) => {
            observer.next(1);
            observer.complete();
            observer.next(2);
        }
    )
        .subscribe({
            next: (data) => expect(data).toEqual(expected),
            complete: done
        })
});

it('Should remain other subscription working after one of them will be unsubscribed ', done => {
    const expected = 3;

    let obs = new Observable(
        (observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(expected);
            observer.complete();
        }
    );

    obs
        .pipe(last())
        .subscribe((data) => expect(data).toEqual(expected));

    obs
        .pipe(take(1))
        .subscribe({
            next: (data) => expect(data).toEqual(1),
            complete: done
        });
});