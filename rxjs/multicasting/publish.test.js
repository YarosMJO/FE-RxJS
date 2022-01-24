const { interval, timer, BehaviorSubject } = require('rxjs');
const { take, publish } = require('rxjs/operators');

jest.setTimeout(7000);
it('Value should be emitted only after connect', done => {
    const expectedValue = 0;
    const source = interval(1000).pipe(take(2));
    const subj = new BehaviorSubject();
    const checkSource = timer(2000);

    const obs = publish()(source);
    obs.subscribe(subj);

    checkSource.subscribe(() => {
        expect(subj.getValue()).toEqual(expectedValue);
        done();
    })
    checkSource.subscribe(obs.connect());
});