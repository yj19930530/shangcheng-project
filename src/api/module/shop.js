const { postRequest } = require('../../utils/lib/request');
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
// 新增订单
const addOrder = (data) => postRequest('/smallprogramMain/handleAddOrder', data);
// 获取相关文章
const getAboutAtc = (data) => postRequest('/sa/index/front/findIndexOrOtherArticlePage', data,'no');
module.exports = {
    addShopCar,
    getShopCarList,
    shopCheckType,
    getAddressList,
    addAddress,
    editDefaultAddress,
    addOrder,
    getAboutAtc
}