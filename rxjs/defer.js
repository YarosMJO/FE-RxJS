const { of, EMPTY, defer } = require('rxjs');

const createThree = function (count) {
    return defer(() => {
        if (count === 3) {
            return of(1, 2, 3);
        }

        return EMPTY;
    })
};

const createOne = function (count) {
    return defer(() => {
        if (count === 1) {
            return of(1);
        }

        return EMPTY;
    })
};

const createAndComplete = defer(
    () => {
        return of(true);
    }
);

exports.createOne = createOne;
exports.createThree = createThree;
exports.createAndComplete = createAndComplete;