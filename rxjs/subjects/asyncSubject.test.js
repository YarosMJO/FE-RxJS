const { AsyncSubject, finalize, from } = require('rxjs');

it('Subscriber should receive last value emitted from observable after its completion', done => {
    let resultWord = "";
    let subj = new AsyncSubject();
    let obs = subj.asObservable();

    obs.subscribe({
        next: (letter) => {
            resultWord += letter;
        },
        complete: () => {
            expect(resultWord).toEqual("N");
            done();
        }
    })

    subj.next("R");
    subj.next("U");
    subj.next("N");

    subj.complete();
});

it('Subscriber shouldnt receive any value if error throwed', done => {
    let resultWord = "";
    let subj = new AsyncSubject();
    let obs = subj.asObservable();

    subj.next("A");
    subj.next("L");
    subj.next("P");
    subj.next("H");
    subj.next("A");

    subj.error(() => "Error throwed")

    let first = obs.subscribe({
        next: (letter) => {
            resultWord += letter;
        },
        error: () => {
            expect(resultWord).toEqual("");
            done();
        }
    })
});