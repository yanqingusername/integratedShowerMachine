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
      user_id: this.data.user_id
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
  bindAddCus(){
    wx.navigateTo({
      url:`/pages/homeCusAdd/index`
    });
  }
})