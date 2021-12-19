const { Observable, delay } = require('rxjs');

it('Should unsubscribe all subcriptions when observavble completes', done => {
    let firstCount = 0;
    let secondCont = 0;

    let obs = new Observable(
        (observer) => {
            observer.next(1);
            observer.complete();
            observer.next(2);
            observer.next(3);
        }
    );

    let first = obs.subscribe({
        next: _ => firstCount++,
        complete: () => {
            expect(firstCount).toEqual(1)
        }
    })

    let second = obs.subscribe({
        next: _ => secondCont++,
        complete: () => {
            expect(secondCont).toEqual(1)
        }
    })

    setTimeout(() => done(), 500);
});

it('Should remain other subscribtion working after one of them will be unsubscribed ', done => {
    let firstCount = 0;
    let secondCont = 0;

    let obs = new Observable(
        (observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        }
    ).pipe(delay(200));

    let subscriberWaitUntilTheEnd = obs.subscribe({
        next: _ => firstCount++,
        complete: () => {
            expect(firstCount).toEqual(3)
        }
    })

    let subscriberStopReceiveDataAfterOne = obs.subscribe({
        next: _ => secondCont++,
        complete: () => {
            expect(secondCont).toEqual(1)
        }
    })

    setTimeout(() => subscriberStopReceiveDataAfterOne.unsubscribe());

    setTimeout(() => done(), 1000);
});