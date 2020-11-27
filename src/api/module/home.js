const { postRequest } = require('../../utils/lib/request');
// 获取商场首页数据
const getHomePage = (data) => postRequest('/web/good/index', data);
// 获取顶部消息数量
const getMessageCount = (data) => postRequest('/sa/index/front/systemMessageCount', data);
// 商品浏览量
const broweGoodsAdd = (data) => postRequest('/smallprogramMain/broweGood', data, 'no', 'no');
// 渠道推广计数
const accessCount = (data) => postRequest('/channelPromote/accessCount', data, 'no', 'no');
module.exports = {
    getHomePage,
    getMessageCount,
    broweGoodsAdd,
    accessCount
}