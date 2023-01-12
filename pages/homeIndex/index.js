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
        freesum: '0',
        runningsum: '0',
        manRuningsum: '0',
        womanRuningsum: '0',
        manfreesum: '0',
        womanfreesum: '0',
    },

    onLoad:function(){
        this.setData({
            real_name: app.globalData.userInfo.real_name,
            company: app.globalData.userInfo.company,
        });
        this.currentTime()
    },
    onShow:function(){
        this.getdeviceRun();
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
    getdeviceRun:function(){
        var that = this;
        var data = {
            company_serial: app.globalData.userInfo.company_serial
        }
        request.request_get('/equipmentManagement/getdeviceRun.hn', data, function (res) {
            console.info('回调', res)
            if (res) {
                if (res.success) {
                    that.setData({
                        freesum: res.freesum, //空闲总数
                        runningsum: res.runningsum, //运行总数
                        manRuningsum: res.manRuningsum, //男运行数
                        womanRuningsum: res.womanRuningsum, //女运行数
                        manfreesum: res.manfreesum, //男空闲数
                        womanfreesum: res.womanfreesum //女空闲数
                    });
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