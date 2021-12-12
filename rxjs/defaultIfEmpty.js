const { empty, of } = require('rxjs');
const { defaultIfEmpty, mergeMap } = require('rxjs/operators');

rxjs = require('rxjs');

const createDefaultValueWhenEmpty = empty().pipe(
    defaultIfEmpty('Default value')
)

const createEmittedValueAfterEmpty = of("Not default value").pipe(
    defaultIfEmpty('Default value')
)
exports.createDefaultValueWhenEmpty = createDefaultValueWhenEmpty;
exports.createEmittedValueAfterEmpty = createEmittedValueAfterEmpty;