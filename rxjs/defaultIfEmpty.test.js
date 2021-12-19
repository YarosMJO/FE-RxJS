const { of, EMPTY } = require('rxjs');
const { defaultIfEmpty } = require('rxjs/operators');

it('Default value if nothing emitted after empty', done => {
    EMPTY.pipe(defaultIfEmpty('Default value'))
        .subscribe((data) => {
            expect(data).toEqual("Default value")
            done();
        })
});

it('Return emitted value if its not empty', done => {
    of("Not default value").pipe(
        defaultIfEmpty('Default value')
    ).subscribe((data) => {
        expect(data).not.toEqual("Default value")
        done()
    })
});