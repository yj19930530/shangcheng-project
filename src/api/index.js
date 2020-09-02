const { common } = require('../utils/index');
const homeApi = require('./module/home');
const meApi = require('./module/me');
const classApi = require('./module/class');
const carApi = require('./module/shop');
const apiObj = {};
apiObj.extend = function (copy) {
    return common.extend(this, copy)
}
apiObj.extend(carApi);
apiObj.extend(classApi);
apiObj.extend(homeApi);
apiObj.extend(meApi);
module.exports = apiObj;