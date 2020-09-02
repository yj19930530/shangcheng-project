const { postRequest } = require('../../utils/lib/request');
// 分类列表
const getClassList = (data) => postRequest('/smallprogramMain/handle_getTypes', data, 'no');
// 分类全部状态列表
const getClassAllList = (data) => postRequest('/smallprogramMain/handle_getGoodsOrderBy', data, 'no');
// 获取商品详情
const getGoodsDetail = (data) => postRequest('/smallprogramMain/handle_getGoodDetails', data, 'no');
module.exports = {
    getClassList,
    getClassAllList,
    getGoodsDetail
}