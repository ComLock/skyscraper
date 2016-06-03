const arrayFrom = require('array-from');
const objectAssign = require('object-assign');

if (!Array.from) {
    Array.from = arrayFrom;
}
if (!Object.assign) {
    Object.assign = objectAssign;
}
