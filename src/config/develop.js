let http = '', httpImg = '', httpDetailImg = '', uploadImgUrl = "", atcImgUrl = "", url = "http://192.168.1.72:9966";
const env = process.env.NODE_ENV;
switch (env) {
    case 'test': {
        http = 'http://47.114.135.205:9998';
        break;
    }
    case 'test-ha': {
        http = 'http://10.8.3.193:9998';
        break;
    }
    default: {
        http = url + '/erpManageSystem';
        httpImg = url + '/erpManageSystem/static/images/upload/goods/';
        httpDetailImg = url + '/erpManageSystem/static/images/upload/goodDetails/';
        uploadImgUrl = url + '/erpManageSystem/static/images/upload/smallProgram/';
        atcImgUrl = url + '/erpManageSystem/static/images/upload/smallProgram/article/';
        // http = 'https://www.chuyinxiang.net//erpManageSystem';
        // httpImg = 'https://www.chuyinxiang.net//erpManageSystem/static/images/upload/goods/';
        // httpDetailImg = 'https://www.chuyinxiang.net//erpManageSystem/static/images/upload/goodDetails/';
        break;
    }
}
module.exports = {
    http,
    httpImg,
    httpDetailImg,
    uploadImgUrl,
    atcImgUrl
}