const { Observable, delay, Subject, BehaviorSubject, finalize, from } = require('rxjs');

it('Subscribers should receive default value before emitted one', done => {
    let firstCount = 0;
    let subj = new BehaviorSubject(1);
    let obs = subj.asObservable();

    let first = obs.subscribe({
        next: (v) => {
            firstCount += v;
        },
        complete: () => {
            expect(firstCount).toEqual(-1)
        }
    })

    subj.next(-2);
    subj.complete();

    setTimeout(() => done(), 1000);
});

it('Subscribers should receive only one previous value (L) and all upcoming values (PHA)', done => {
    let resultWord = "";
    let subj = new BehaviorSubject();
    let obs = subj.asObservable();

    subj.next("A");
    subj.next("L");

    let first = obs.subscribe({
        next: (letter) => {
            resultWord += letter;
        },
        complete: () => {
            expect(resultWord).toEqual("LPHA");
            done();
        }
    })

    from([..."PHA"])
        .pipe(
            finalize(() => subj.complete())
        )
        .subscribe(letter => subj.next(letter));

});

// chrome://inspect
