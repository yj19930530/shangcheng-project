// 常用方法
const _ = require('underscore');
const { http } = require('../../config/develop');
const token = getData('token');
/**
 * 对象合并
 * @param target object 继承目标
 * @param copy object 复制对象
 * @param deep boolean 是否深拷贝
 * @returns {*}
 */
function extend(target, copy, deep) {
    if (deep) {
        return _.extend({}, target, copy)
    } else {
        for (let key in copy) {
            target[key] = copy[key];
        }
        return target;
    }
}
// 对象复制
function objAss(form, obj) {
    let newObj = {}
    for (let key in form) {
        newObj[key] = obj[key];
    }
    newObj.id = obj.id;
    return newObj;
}
// 浅克隆
function objCopy(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[key] = obj[key];
    }
    return newObj;
}
// 深克隆多层
function cloneData(data) {
    const type = Object.prototype.toString.call(data)
    if (type === "[object Object]") {
        const newObj = {}
        Object.keys(data).forEach(key => newObj[key] = cloneData(data[key]))
        return newObj;
    } else if (type === "[object Array]") {
        return data.map(item => cloneData(item))
    }
    return data;
}
// 时间转换
function dateTime(time) {
    if (!time) return '-';
    let date = new Date(time);
    let year = date.getFullYear();
    let month =
        date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    let m =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
}
// 缓存数据
function saveData(key, data) {
    uni.setStorageSync(key, data);
}
// 获取缓存数据
function getData(key) {
    return uni.getStorageSync(key)
}
// 上传图片
function updataImg(num, type) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '上传中'
        });
        uni.chooseImage({
            count: num,
            sizeType: 'compressed',
            success: res => {
                let imgArr = [];
                res.tempFilePaths.forEach(item => {
                    uni.uploadFile({
                        url: http + '/smallprogramMain/uploadImg',
                        name: 'file',
                        filePath: item,
                        header: { 'token': token },
                        formData: {
                            uploadFilePlateType: type
                        },
                        success: (r) => {
                            let uploadData = JSON.parse(r.data);
                            uni.hideLoading();
                            if (uploadData.state !== 200) {
                                uni.showToast({
                                    title: uploadData.message,
                                })
                            } else {
                                imgArr.push({
                                    imgPath: item,
                                    imgObj: uploadData.data
                                })
                                if (res.tempFilePaths.length === imgArr.length) {
                                    resolve(imgArr)
                                }
                            }

                        },
                        fail: () => {
                            uni.hideLoading();
                        }

                    });
                })

            },
            fail: () => {
                uni.hideLoading();
                reject(false)
            }
        })
    })
}
// 上传一张图片
function updataImgOnce() {
    return new Promise((resolve, reject) => {
        uni.chooseImage({
            count: 1,
            sizeType: 'compressed',
            success: res => {
                res.tempFilePaths.forEach(item => {
                    uni.showLoading({
                        title: '上传中'
                    });
                    uni.uploadFile({
                        url: http + '/skin/uploadImg',
                        name: 'image',
                        header: {
                            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJ0BstsRQ55xWJzBB'
                        },
                        filePath: item,
                        success: (r) => {
                            uni.hideLoading()
                            let resolveData = JSON.parse(r.data);
                            if (resolveData.code === -100) {
                                uni.showModal({
                                    title: '提示',
                                    content: resolveData.msg,
                                    showCancel: false,
                                    confirmText: '返回登录',
                                    success: function () {
                                        uni.reLaunch({
                                            url: "/pages/page/login"
                                        })
                                    }
                                });
                            } else {
                                let imgObj = JSON.parse(r.data);
                                resolve({
                                    imgPath: imgObj.data,
                                    // imgObj: imgObj.data
                                })
                            }
                        }, fail: () => {
                            uni.hideLoading()
                        }
                    });
                })

            },
            fail: () => {
                reject(false)
            }
        })
    })
}
// 上传视频
function updataVideo() {
    return new Promise((resolve, reject) => {
        uni.chooseVideo({
            count: 1,
            success: res => {
                uni.uploadFile({
                    url: http + '/wechatUpload/picture',
                    name: 'file',
                    filePath: res.tempFilePath,
                    header: { 'token': token },
                    success: (r) => {
                        let imgObj = JSON.parse(r.data).body;
                        resolve({
                            imgPath: res.tempFilePath,
                            imgObj: imgObj[0].url
                        })
                    }
                });
            },
            fail: () => {
                reject(false)
            }
        })
    })

}
// 小程序支付
function weCatPay(obj) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            provider: 'wxpay',
            timeStamp: obj.timeStamp,
            nonceStr: obj.nonceStr,
            package: obj.package,
            signType: obj.signType,
            paySign: obj.paySign,
            success: function (res) {
                uni.navigateTo({
                    url: '/subPackages/shop/paymentMsg?type=success',
                })
            },
            fail: function (err) {
                uni.navigateTo({
                    url: '/subPackages/shop/paymentMsg?type=err',
                })
            }
        });
    })
}
module.exports = {
    objCopy,
    cloneData,
    extend,
    saveData,
    getData,
    updataImg,
    updataVideo,
    objAss,
    updataImgOnce,
    weCatPay,
    dateTime,
    _,
}