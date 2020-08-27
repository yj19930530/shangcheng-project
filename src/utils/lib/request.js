// 请求
// const token = 
const { http } = require('../../config/develop');
const { extend } = require('../lib/common');
const { toast, common } = require('../index');
function uniRequest() { };
uniRequest._extend = function (copy) {
    return extend(this, copy)
}
uniRequest._extend({
    postRequest(url, data = {}, type) {
        let header = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const opId = common.getData('opId');
        if (!opId) {
            uni.reLaunch({
                url: "/pages/page/login"
            })
        }
        if (type !== 'no') data.openId = opId;
        return new Promise((resolve, reject) => {
            uni.request({
                url: http + url,
                data: data,
                method: 'post',
                header: header,
                success: (res) => {
                    switch (res.data.code) {
                        case 200: {
                            resolve(res.data);
                            break
                        }
                        case 201: {
                            uni.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false,
                                confirmText: '返回登录',
                                success: function () {
                                    uni.reLaunch({
                                        url: "/pages/page/login"
                                    })
                                }
                            });
                            break
                        }
                        default: {
                            toast.showToast(res.data.msg)
                            resolve(res.data);
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