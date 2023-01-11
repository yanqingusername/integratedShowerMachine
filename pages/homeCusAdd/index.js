const app = getApp()
var request = require('../../utils/request.js')
var box = require('../../utils/box.js')
const utils = require('../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    job_number: '',
    job_name: '',
    frontPhoto: [],
    jobNameList:[
      {
        "id": 1,
        "name": '测试1'
      },
      {
        "id": 2,
        "name": '测试2'
      }
    ],
    categoryIndex: 0,
    isShowRegion: 1,
    submitState: true,
    genderList: ['男', '女'],
    genderIndex: 0,
    gender: '',
    isShowGender: 1
  },
  onShow: function () {},
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "新增员工信息"
    })
  },
  //保存按钮禁用判断
  checkSubmitStatus: function (e) {
    if (this.data.name != '' && this.data.job_number != '' && this.data.job_name != '' && this.data.frontPhoto.length > 0) {
      this.setData({
        submitState: false
      })
    } else {
      this.setData({
        submitState: true
      })
    }
  },
  bindName: function (e) {
    var str = e.detail.value;
    // str = utils.checkInput_2(str);
    this.setData({
      name: str
    })

    this.checkSubmitStatus();
  },
  bindJobNumber: function (e) {
    var str = e.detail.value;
    // str = utils.checkInput(str);
    this.setData({
      job_number: str
    })

    this.checkSubmitStatus();
  },
  // bindJobNameChange(e){
  //   console.log(e.detail.detail)
  //   this.setData({
  //     job_name: '',
  //     isShowRegion: 2
  //   });
  // },
  // 类别改变
  bindJobNameChange:function(e) {
    var categoryIndex = e.detail.value;
    this.setData({
        categoryIndex: categoryIndex,
        job_name: this.data.jobNameList[categoryIndex].name,
        isShowRegion: 2
    })
},
bindPickerChangeGender: function (e) {
  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    genderIndex: e.detail.value,
    gender: that.data.genderList[e.detail.value],
    isShowGender: 2
  })
  console.log('picker发送选择改变，携带值为', that.data.genderIndex)
},
  // 头像上传
  ChooseImage: function () {
    var that = this;
    that.setData({
      imgFlag: true
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var frontPhoto = res.tempFilePaths
        that.setData({
          frontPhoto: frontPhoto
        })
      }
    })
  },
  //预览图片，放大预览
  preview: function (e) {
    var that = this;
    that.setData({
      imgFlag: true
    })
    let currentUrl = e.currentTarget.dataset.url
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
  delview: function () {
    this.setData({
      frontPhoto: []
    })
  },
  submitBuffer() {

  }

})