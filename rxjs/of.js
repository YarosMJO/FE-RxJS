const { of } = require('rxjs');

const createThree = of(1, 2, 3);
const createOne = of(3);
const createAndComplete = of();


exports.createOne = createOne;
exports.createThree = createThree;
exports.createAndComplete = createAndComplete;