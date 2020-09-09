const { postRequest } = require('../../utils/lib/request');
// 登录
const userLoginGetOpenId = (data) => postRequest('/smallprogramMain/getSmallUserInfo', data, 'no');
// 添加用户
const addUserInfo = (data) => postRequest('/smallprogramMain/handleInsertUserInfo', data, 'no');
// 获取用户信息
const getUserInfo = (data) => postRequest('/smallprogramMain/handlePerfectUserInfo', data);
// 修改用户
const editUserInfo = (data) => postRequest('/smallprogramMain/handleUpdateSmallUser', data);
// 获取订单
const getOrderList = (data) => postRequest('/smallprogramMain/handleGetOrderData', data);
// 获取文章详情
const getAtcInfo = (data) => postRequest('/web/article/getArticleInfo', data);
// 申请退款
const payWechatRefund = (data) => postRequest('/web/order/addReturnApply', data,'no');
// 商品评论
const publishGoodComment = (data) => postRequest('/web/good/publishGoodComment', data,'no');
// 商品评论分页
const findGoodCommentPage = (data) => postRequest('/web/good/findGoodCommentPage', data,'no');
module.exports = {
    userLoginGetOpenId,
    addUserInfo,
    getUserInfo,
    editUserInfo,
    getOrderList,
    getAtcInfo,
    payWechatRefund,
    publishGoodComment,
    findGoodCommentPage
}