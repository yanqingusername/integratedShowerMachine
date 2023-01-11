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
    real_name: "",
    company: "",
  },
  onShow: function () {
  },
  onLoad: function (options) {
    this.setData({
      title: options.title,
      real_name: app.globalData.userInfo.real_name,
      company: app.globalData.userInfo.company,
    });
    
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
})