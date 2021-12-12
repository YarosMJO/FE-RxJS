const { from } = require('rxjs');

const createThree = from([1, 2, 3]);
const createOne = from([3]);
const createAndComplete = from([]);


exports.createOne = createOne;
exports.createThree = createThree;
exports.createAndComplete = createAndComplete;