const { postRequest } = require('../../utils/lib/request');
// 小程序预支付
const wecatPayHandle = (data) => postRequest('/web/pay/payWechatBefore', data);
// 获取支付凭证
const getWxPaySign = (data) => postRequest('/web/pay/getWxPaySign', data, 'no');
// 加入购物车
const addShopCar = (data) => postRequest('/smallprogramMain/handleGoodAddCart', data);
// 获取购物车list
const getShopCarList = (data) => postRequest('/smallprogramMain/handleGetCartLists', data);
// 购物选择状态
const shopCheckType = (data) => postRequest('/smallprogramMain/handleRequestBaseUpdateCart', data, 'no');
// 获取收货地址
const getAddressList = (data) => postRequest('/smallprogramMain/handleGetAddressLists', data, 'no');
// 新增收货地址
const addAddress = (data) => postRequest('/smallprogramMain/handleRequestBaseAddAddress', data);
// 切换默认地址
const editDefaultAddress = (data) => postRequest('/smallprogramMain/handleUpdateAddressDefult', data);
// 修改地址
const editAddressData = (data) => postRequest('/smallprogramMain/handleUpdateAddress', data);
// 新增订单
const addOrder = (data) => postRequest('/smallprogramMain/handleWebAddOrder', data, 'no');
// 删除订单
const deleteOrder = (data) => postRequest('/smallprogramMain/handleCancelOrder', data);
// 获取订单详情
const getOrderInfo = (data) => postRequest('/smallprogramMain/handleGetOrderDetails', data);
// 获取相关文章
const getAboutAtc = (data) => postRequest('/sa/index/front/findIndexOrOtherArticlePage', data, 'no');
// 文章点赞
const articleDz = (data) => postRequest('/web/article/dz', data, 'no');
// 文章评论
const articlePl = (data) => postRequest('/web/article/pl', data, 'no');
// 文章收藏
const articleSc = (data) => postRequest('/web/article/sc', data, 'no');
// 文章转发
const articleZc = (data) => postRequest('/web/article/zf', data, 'no', 'no');
// 关注
const articleGz = (data) => postRequest('/smallprogramMain/handleAddFans', data, 'no');
// 取消关注
const articleCloseGz = (data) => postRequest('/smallprogramMain/handleDelFans', data, 'no');
// 评论文章
const atcPlRequest = (data) => postRequest('/web/article/pl', data, 'no');
// 删除购物车商品
const deleteCarGoods = (data) => postRequest('/smallprogramMain/handleRequestBaseDeleteCart', data, 'no');
// 删除地址
const deleteAddress = (data) => postRequest('/smallprogramMain/handleRequestBaseDelAddress', data, 'no');
module.exports = {
    addShopCar,
    getShopCarList,
    shopCheckType,
    getAddressList,
    addAddress,
    editDefaultAddress,
    addOrder,
    getAboutAtc,
    articleDz,
    articlePl,
    articleSc,
    articleZc,
    articleGz,
    articleCloseGz,
    atcPlRequest,
    deleteOrder,
    deleteCarGoods,
    deleteAddress,
    editAddressData,
    wecatPayHandle,
    getWxPaySign,
    getOrderInfo
}