const { throwError, mergeMap } = require('rxjs');
const { of } = require('rxjs/operators');

const createAndComplete = throwError("Error!").pipe(
    mergeMap(() => of(1))
)

exports.createAndComplete = createAndComplete;