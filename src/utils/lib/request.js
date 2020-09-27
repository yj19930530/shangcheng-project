// 请求
// const token = 
const {
	http
} = require('../../config/develop');
const {
	extend
} = require('../lib/common');
const {
	toast,
	common
} = require('../index');

function uniRequest() { };
uniRequest._extend = function (copy) {
	return extend(this, copy)
}
uniRequest._extend({
	postRequest(url, data = {}, type, noType) {
		const opId = common.getData('opId');
		const token = common.getData('token');
		const userno = common.getData('userno');
		let header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		};
		// if (!opId) {
		// 	uni.reLaunch({
		// 		url: "/pages/page/login"
		// 	})
		// }
		if (noType !== 'no') {
			if (userno) data.userno = userno;
		}
		if (type !== 'no') {
			if (opId) data.openId = opId;
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: http + url,
				data: data,
				method: 'post',
				header: header,
				success: (res) => {
					switch (res.data.state) {
						case 200:
							{
								resolve(res.data);
								break
							}
						case -100:
							{
								toast.showToast(res.data.message)
								uni.reLaunch({
									url: "/pages/page/login"
								})
								resolve(res.data);
								break
							}
						case 500: {
							resolve(res.data);
							break;
						}
						case 201:
							{
								uni.showModal({
									title: '提示',
									content: res.data.message,
									showCancel: false,
									confirmText: '返回登录',
									success: function () {
										uni.clearStorageSync();
										uni.reLaunch({
											url: "/pages/page/login"
										})
									}
								});
								break
							}
						default:
							{
								toast.showToast(res.data.message)
								resolve({});
								break
							}
					}
				},
				fail: err => {
					toast.showToast('网络错误')
					reject(err)
				}
			})
		})
	}
})
module.exports = uniRequest;
