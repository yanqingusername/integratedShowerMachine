const app = getApp()
var request = require('../../utils/request.js')
var box = require('../../utils/box.js')
const utils = require('../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    position: "",
    submitState: true,
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
    genderList: ['男', '女'],
    genderIndex: 0,
    gender: '',
    isShowGender: 1
  },
  onShow: function () {},
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "新增设备信息"
    })
  },
  //保存按钮禁用判断
  checkSubmitStatus: function (e) {
    if (this.data.name != '' && this.data.position != '') {
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
    console.log(e.detail.value)
    var str = e.detail.value;
    // str = utils.checkInput_2(str);
    this.setData({
      name: str
    })

    this.checkSubmitStatus();
  },
  bindPosition: function (e) {
    var str = e.detail.value;
    this.setData({
      position: str
    })

    this.checkSubmitStatus();
  },
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
  submitBuffer() {
    let that = this;
    let name = this.data.name;
    let position = this.data.position;
    if(!name){
      box.showToast("请输入设备编号");
      return;
    }

    if(!position){
      box.showToast("请输入设备位置");
      return;
    }

    let params = {
      name: name,
      position: position
    }

    console.log('---->:', params)

    request.request_get('', params, function (res) {
      console.info('回调', res)
      if (res) {
        if (res.success) {
          wx.navigateBack({
            delta: 1,
          });
        } else {
          box.showToast(res.msg);
        }
      } else {
        box.showToast("网络不稳定，请重试");
      }
    })

  }
})