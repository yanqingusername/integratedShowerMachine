const app = getApp();
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')

Page({
	data:{
        real_name: "",
        role_name: "",
        head_url: "",
        homePersonal: [],
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
	},
    onLoad:function() {
        this.setData({
            real_name: app.globalData.userInfo.real_name,
            role_name: app.globalData.userInfo.role_name,
            head_url: app.globalData.userInfo.head_url,
        });
        this.setData({
            isIphoneX: this.isIphoneX()
        });
    },
    onShow:function(){
        var that = this;
        that.getWorderInfo();
    },
    isIphoneX() {
        let info = wx.getSystemInfoSync();
        console.log(info)
        if (info.model.indexOf("iPhone") >= 0 && (info.statusBarHeight > 20)) {
          return true;
        } else {
          return false;
        }
      },
    catchHandler:function(e){
        let pathstring = e.currentTarget.dataset.pathstring;
        let title = e.currentTarget.dataset.title;
        if(pathstring && title){
            wx.navigateTo({
                url: pathstring + "?title=" + title,
            });
        }
    },
    // 获取个人中心的信息
    getWorderInfo:function(){
        var that = this;
        var data = {
            id: app.globalData.userInfo.id
        }
        request.request_get('/AppletCommon/getUserinfo.hn', data, function (res) {
            if(res){
                if(res.success){
                    var homePersonal = res.personal;
                    that.setData({ homePersonal: homePersonal})
                }else{
                    box.showToast(res.msg);
                }
            }
        })
    },
    // 退出当前账号
    toExit:function(){
        wx.showModal({
            title: '',
            content: '是否退出当前账号',
            success: function (res) {
                if (res.confirm) {
                    var data = {
                        openid:app.globalData.openid,
                    }
                    request.request_get('/AppletCommon/appLogOut.hn', data, function (res) {
                        console.info('回调', res)
                        if(res){
                            if(res.success){
                                wx.reLaunch({
                                    url: '/pages/main/login',
                                })
                            }else{
                                box.showToast(res.msg);
                            }
                        }
                    })
                }
            }
        })
    }
});