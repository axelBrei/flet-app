const middlewares = [];

// if (__DEV__) {
const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
middlewares.push(createFlipperMiddleware());
// }

export default middlewares;
