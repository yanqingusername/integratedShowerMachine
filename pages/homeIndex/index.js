const app = getApp();
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')
const utils = require('../../utils/utils.js')

Page({
    data:{
        real_name: "",
        company: "",
		timestamp:new Date().getTime(),
        yearmouthday:"",
    },

    onLoad:function(){
        this.setData({
            real_name: app.globalData.userInfo.real_name,
            company: app.globalData.userInfo.company,
        });
        this.currentTime()
    },
    onShow:function(){
        
    },
    /**
     * 当前日期
     */
     currentTime() {
        let tempTime = new Date(this.data.timestamp);
        let month=tempTime.getMonth() + 1;
        let day=tempTime.getDate();
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        let curtime = tempTime.getFullYear() + "年" + (month) + "月" + day + "日";
        console.log('currentTime' + curtime);
        this.setData({
            yearmouthday: curtime
        })
    },
    getUntreatedAlarmNum:function(){
        var that = this;
        var data = {
            pig_farm: app.globalData.userInfo.pig_farm_id
        }
        request.request_get('/pigProjectApplet/getUntreatedAlarmNum.hn', data, function (res) {
            console.info('回调', res)
            if (res) {
                if (res.success) {
                    var alarmNum = res.msg;
                    that.setData({alarmNum:alarmNum});
                } else {
                    box.showToast(res.msg)
                }
            }
        })
    },
    bindHandlerClick(e){
        let urlstring = e.currentTarget.dataset.urlstring;
        if(urlstring){
            wx.navigateTo({
                url: urlstring
            });
        }
    }

})