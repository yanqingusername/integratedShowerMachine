const app = getApp()
const request = require('../utils/request.js')
const box = require('../utils/box.js')

/* 
*  登录js
*/
function toLogin(phone,password){
    console.log("开始登录" + phone,password);
    var data = {
        openid: app.globalData.openid,
        phone: phone,
        password: password
    }
    request.request_get('/AppletCommon/loginApplet.hn', data, function (res) {
        console.info('回调', res)
        if(res){
            if(res.success){
                console.log('登录成功',res)
                var userInfo = res.user_info;
                    // 存储用户信息
                    app.globalData.userInfo = userInfo[0];
                    wx.switchTab({
                        url: '/pages/homeIndex/index',
                    })
            }else{
                box.showToast(res.msg);
            }
        }
    })
}

module.exports = {
    toLogin: toLogin
}