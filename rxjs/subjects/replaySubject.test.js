const { Observable, delay, ReplaySubject, BehaviorSubject, finalize, from } = require('rxjs');

it('Subscriber should receive all values emitted before subscription done', done => {
    let resultWord = "";
    let subj = new ReplaySubject();
    let obs = subj.asObservable();

    subj.next("A");
    subj.next("L");

    let first = obs.subscribe({
        next: (letter) => {
            resultWord += letter;
        },
        complete: () => {
            expect(resultWord).toEqual("ALPHA");
            done();
        }
    })

    from([..."PHA"])
        .pipe(
            finalize(() => subj.complete())
        )
        .subscribe(letter => subj.next(letter));

});

it('Subscriber should receive only one previous value (L) and all upcoming values (PHA)', done => {
    let resultWord = "";
    let subj = new ReplaySubject(1);
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
