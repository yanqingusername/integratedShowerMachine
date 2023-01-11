const app = getApp()
const utils = require('../../utils/utils.js')
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    dataList: [
      {
        "id": 1,
        "name":"张三",
        "custom": "测试",
        "headerimg": ''
      }
    ],
  },
  onShow: function () {
    // this.getAllCus();
  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    });

    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  getAllCus(){
    let that = this;
    let data = {
      openid: app.globalData.openid,
    }
    request.request_get('/Newacid/getShoppingAddress.hn', data, function (res) {
      console.info('回调', res)
      if (res) {
        if (res.success) {
          that.setData({
            dataList: res.msg
          })
        } else {
          box.showToast(res.msg);
        }
      } else {
        box.showToast("网络不稳定，请重试");
      }
    })
  },
  onReachBottom: function () {
    
  },
  bindAddEquipment(){
    wx.navigateTo({
      url:`/pages/homeEquipmentAdd/index`
    });
  },
})