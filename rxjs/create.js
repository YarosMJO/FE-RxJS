rxjs = require('rxjs');

const createThree = new rxjs.Observable(
  (observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  }
);

const createOne = new rxjs.Observable(
  (observer) => {
    observer.next(3);
    observer.complete();
  }
);

const createAndComplete = new rxjs.Observable(
  (observer) => {
    observer.complete();
  }
);


exports.createOne = createOne;
exports.createThree = createThree;
exports.createAndComplete = createAndComplete;