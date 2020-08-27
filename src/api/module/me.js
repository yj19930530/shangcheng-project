const { postRequest } = require('../../utils/lib/request');
// 登录
const userLoginGetOpenId = (data) => postRequest('/smallprogramMain/getSmallUserInfo', data,'no');
// 添加用户
const addUserInfo = (data) => postRequest('/smallprogramMain/handleInsertUserInfo', data,'no');
// 获取用户信息
const getUserInfo = (data) => postRequest('/smallprogramMain/handleGetUserInfo', data);
// 修改用户
const editUserInfo = (data) => postRequest('/smallprogramMain/handleUpdateSmallUser', data);
module.exports = {
    userLoginGetOpenId,
    addUserInfo,
    getUserInfo,
    editUserInfo
}