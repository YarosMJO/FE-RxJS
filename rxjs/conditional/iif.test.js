const { iif, of, mergeMap, concat, EMPTY } = require('rxjs');
const { isEmpty, catchError } = require('rxjs/operators');
const identity = value => value;

it('Expects to receive true if condition true, false othervise', done => {
    const source$ = of(true);
    const expected = true;

    source$
        .pipe(
            mergeMap(
                (data) => iif(
                    identity,
                    of(data),
                    of(false)
                )
            )
        )
        .subscribe((value) => {
            expect(expected).toEqual(value);
            done();
        })
});

it('Expects to call both cold observables despite of condition, but only one value will be returned to the stream (depended on condition)', done => {
    const expectedValue1 = 1;
    const expectedValue2 = 2;

    const coldObs1 = of(expectedValue1);
    const coldObs2 = of(expectedValue2);

    coldObs1
        .pipe(
            mergeMap(
                (data) => iif(
                    () => data === expectedValue1,
                    coldObs1,
                    coldObs2,
                )
            )
        )
        .subscribe(currentValue =>
            expect(currentValue).toEqual(expectedValue1)
        );

    coldObs1.subscribe(currentValue => {
        expect(currentValue).toEqual(expectedValue1);
    })

    coldObs2.subscribe(currentValue => {
        expect(currentValue).toEqual(expectedValue2);
        done()
    })
});

it('Expects recive value if condition true and EMPTY if no observable was provided', done => {
    const expectedValue1 = 1;
    const expectedValueWhenEmpty = true;

    let enableOne = false;
    const obs$ = concat(
        iif(
            () => enableOne,
            of(expectedValue1)
        )
    );
    enableOne = true;
    obs$
        .pipe(catchError(err => EMPTY))
        .subscribe(currentValue => expect(currentValue).toEqual(expectedValue1));

    enableOne = false;
    obs$
        .pipe(catchError(err => EMPTY))
        .pipe(isEmpty()).subscribe(currentValue => expect(currentValue).toEqual(expectedValueWhenEmpty));

    done();
});