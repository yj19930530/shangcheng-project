const { postRequest } = require('../../utils/lib/request');
// 登录
const userLoginGetOpenId = (data) => postRequest('/smallprogramMain/getSmallUserInfo', data, 'no','no');
// 添加用户
const addUserInfo = (data) => postRequest('/smallprogramMain/handleInsertUserInfo', data, 'no');
// 获取用户信息
const getUserInfo = (data) => postRequest('/smallprogramMain/handleGetUserInfo', data);
// 获取完善用户信息
const getAllUserInfo = (data) => postRequest('/sa/index/getAllUserInfo', data, 'no', 'no');
// 修改用户
const editUserInfo = (data) => postRequest('/smallprogramMain/handleUpdateSmallUser', data);
// 请求添加用户
const handleInsertUserInfoNew = (data) => postRequest('/smallprogramMain/handleInsertUserInfoNew', data);
// 获取订单
const getOrderList = (data) => postRequest('/smallprogramMain/handleGetOrderData', data);
// 获取文章详情
const getAtcInfo = (data) => postRequest('/web/article/getArticleInfo', data);
// 申请退款
const payWechatRefund = (data) => postRequest('/web/order/addReturnApply', data, 'no');
// 商品评论
const publishGoodComment = (data) => postRequest('/web/good/publishGoodComment', data, 'no', 'no');
// 商品评论分页
const findGoodCommentPage = (data) => postRequest('/web/good/findGoodCommentPage', data, 'no');
// 确认收货
const confirmReceipt = (data) => postRequest('/web/order/confirmReceipt', data, 'no', 'no');
// 获取物流详情
const getKuaidiInfo = (data) => postRequest('/web/order/getKuaidiInfo', data, 'no', 'no');
// 退款详情
const findOneReturnApply = (data) => postRequest('/web/order/findOneReturnApply', data, 'no', 'no');
// 退款申请
const findReturnApplyPage = (data) => postRequest('/web/order/findReturnApplyPage', data, 'no', 'no');
// 撤销申请
const cancelReturnApply = (data) => postRequest('/web/order/cancelReturnApply', data, 'no', 'no');
// 获取用户文章
const findNotifyRemindPage = (data) => postRequest('/sa/index/front/findNotifyRemindPage', data, 'no', 'no');
// 清空消息数量
const readAll = (data) => postRequest('/sa/index/front/readAll', data, 'no','no');
module.exports = {
    userLoginGetOpenId,
    getAllUserInfo,
    addUserInfo,
    editUserInfo,
    getOrderList,
    getAtcInfo,
    payWechatRefund,
    publishGoodComment,
    findGoodCommentPage,
    confirmReceipt,
    getUserInfo,
    getKuaidiInfo,
    findOneReturnApply,
    findReturnApplyPage,
    findNotifyRemindPage,
    cancelReturnApply,
    readAll,
	handleInsertUserInfoNew
}