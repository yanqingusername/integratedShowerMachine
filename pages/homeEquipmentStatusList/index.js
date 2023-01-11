const app = getApp();
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')

Page({
	data:{
        page: 1,
        limit: 10,
        deviceinfoList: [],
	},
    onLoad:function() {
        
    },
    onShow:function(){
        var that = this;
        that.getdeviceinfo();
    },
    onReachBottom: function () {
        this.getdeviceinfo();
      },
    getdeviceinfo:function(){
        var that = this;
        var data = {
            page: that.data.page,
            limit: that.data.limit
        }
        request.request_get('/equipmentManagement/getdeviceinfo.hn', data, function (res) {
            if (res) {
                if (res.success) {
                  if (that.data.page == 1) {
                    that.setData({
                        count: res.count,
                        deviceinfoList: res.info,
                      page: (res.info && res.info.length > 0) ? that.data.page + 1 : that.data.page
                    });
                  } else {
                    that.setData({
                        count: res.count,
                        deviceinfoList: that.data.deviceinfoList.concat(res.info || []),
                      page: (res.info && res.info.length > 0) ? that.data.page + 1 : that.data.page,
                    });
                  }
                } else {
                  box.showToast(res.msg);
                }
              }
        })
    },
});