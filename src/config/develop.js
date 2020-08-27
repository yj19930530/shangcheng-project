let http = '';
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
        http = 'http://192.168.1.72:9966/erpManageSystem';
        // http = 'https://www.chuyinxiang.net//erpManageSystem';
        break;
    }
}
module.exports = {
    http,
}