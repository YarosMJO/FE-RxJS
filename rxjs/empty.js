rxjs = require('rxjs');

const createAndComplete = empty().pipe(
    mergeMap(() => of(1))
)

exports.createAndComplete = createAndComplete;