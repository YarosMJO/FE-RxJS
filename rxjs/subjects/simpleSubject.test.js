const { Observable, delay, Subject } = require('rxjs');

it('Subscribers shouldnt receive any emitted values before subcription done', done => {
    let firstCount = 0;
    let secondCont = 0;
    let subj = new Subject();
    let obs = subj.asObservable();

    subj.next(1);
    subj.complete();

    let first = obs.subscribe({
        next: _ => firstCount++,
        complete: () => {
            expect(firstCount).toEqual(0)
        }
    })

    let second = obs.subscribe({
        next: _ => secondCont++,
        complete: () => {
            expect(secondCont).toEqual(0)
        }
    })

    setTimeout(() => done(), 1000);
});

it('Subscribers shouldnt receive any values after subject completes', done => {
    let firstCount = 0;
    let subj = new Subject();
    let obs = subj.asObservable();

    let subscriberWaitUntilTheEnd = obs.subscribe({
        next: _ => firstCount++,
        complete: () => {
            expect(firstCount).toEqual(1)
        }
    })

    subj.next(1);
    subj.complete();
    subj.next(1);

    setTimeout(() => done(), 1000);
});