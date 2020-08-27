const { common } = require('../utils/index');
const homeApi = require('./module/home');
const meApi = require('./module/me');
const apiObj = {};
apiObj.extend = function (copy) {
    return common.extend(this, copy)
}
apiObj.extend(homeApi);
apiObj.extend(meApi);
module.exports = apiObj;