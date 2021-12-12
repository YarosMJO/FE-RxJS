const { range } = require('rxjs');

const createThree = range(1, 3);
const createOne = range(3, 1);
const createAndComplete = range();


exports.createOne = createOne;
exports.createThree = createThree;
exports.createAndComplete = createAndComplete;