const { postRequest } = require('../../utils/lib/request');
// 获取商场首页数据
const getHomePage = (data) => postRequest('/web/good/index', data);
// 获取顶部消息数量
const getMessageCount = (data) => postRequest('/sa/index/front/systemMessageCount', data);
module.exports = {
    getHomePage,
    getMessageCount
}