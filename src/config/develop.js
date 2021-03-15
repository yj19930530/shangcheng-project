let http = '', httpImg = '', circleNoteUrl = '', httpReturn = '', userImgUrl = '', httpDetailImg = '', uploadImgUrl = "", atcImgUrl = "", url = "https://www.chuyinxiang.net/erpManageSystem";
const env = process.env.NODE_ENV;
switch (env) {
    case 'test': {
        // http = 'http://47.114.135.205:9966/erpManageSystem';
        // url = "https://www.chuyinxiang.net/erpManageSystem";
        // url = "http://192.168.1.72:9966/erpManageSystem";
        break;
    }
    case 'test-ha': {
        http = 'http://10.8.3.193:9998';
        break;
    }
    default: {
        http = url;
        httpImg = url + '/static/images/upload/goods/';
        httpDetailImg = url + '/static/images/upload/goodDetails/';
        httpReturn = url + '/static/images/upload/returnApply';
        uploadImgUrl = url + '/static/images/upload/smallProgram/';
        atcImgUrl = url + '/static/images/upload/smallProgram/article/';
        circleNoteUrl = url + '/static/images/upload/impressNote/';
        userImgUrl = url + '/static/images/upload/user/';
        break;
    }
}
module.exports = {
    http,
    httpImg,
    httpDetailImg,
    httpReturn,
    uploadImgUrl,
    atcImgUrl,
    circleNoteUrl,
    userImgUrl
}