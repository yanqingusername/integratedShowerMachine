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
    job_phone: "",
    password: '',
    job_name: '',
    job_id: '',
    frontPhoto: [],
    jobNameList: [],
    categoryIndex: 0,
    isShowRegion: 1,
    submitState: true,
    genderList: ['男', '女'],
    genderIndex: 0,
    gender: '',
    isShowGender: 1,
    isEditCus: 1
  },
  onShow: function () {
    this.getRoleinfo();
  },
  onLoad: function (options) {
    this.setData({
      isEditCus: options.isEditCus || 1
    });
    wx.setNavigationBarTitle({
      title: "新增员工信息"
    })
  },
  //保存按钮禁用判断
  checkSubmitStatus: function (e) {
    if (this.data.name != '' && this.data.job_number != '' && this.data.job_phone != '' && this.data.password != '' && this.data.job_name != '' && this.data.job_id != '' && this.data.frontPhoto.length > 0 && this.data.gender != '') {
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
  bindPhone: function (e) {
    var str = e.detail.value;
    // str = utils.checkInput_2(str);
    this.setData({
      job_phone: str
    })

    this.checkSubmitStatus();
  },
  bindPassword: function (e) {
    var str = e.detail.value;
    // str = utils.checkInput_2(str);
    this.setData({
      password: str
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
  bindJobNameChange: function (e) {
    var categoryIndex = e.detail.value;
    this.setData({
      categoryIndex: categoryIndex,
      job_name: this.data.jobNameList[categoryIndex].role_name,
      job_id: this.data.jobNameList[categoryIndex].id,
      isShowRegion: 2
    });
    this.checkSubmitStatus();
  },
  bindPickerChangeGender: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      genderIndex: e.detail.value,
      gender: that.data.genderList[e.detail.value],
      isShowGender: 2
    })
    this.checkSubmitStatus();
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
        var filePath = res.tempFilePaths;

        // for (let i = 0; i < filePath.length; i++) {
        //   wx.uploadFile({
        //     url: 'https://monitor.coyotebio-lab.com:8443/HM/api/upload.hn',  // 正式服务器
        //     filePath: filePath[i],
        //     name: 'imageFile',
        //     formData: data,
        //     header: {
        //       "chartset": "utf-8"
        //     },
        //     success: function (returnRes) {
        //       console.log(returnRes)
        //       let data = JSON.parse(returnRes.data)
        //       console.log(data.msg)
        //       let imgList = [];
        //       let imgArr = that.data.img_arr;
        //       for (let i = 0; i < imgArr.length; i++) {
        //         imgList.push(imgArr[i])
        //       }
        //       imgList.push(data.msg)
        //       that.setData({
        //         frontPhoto: imgList
        //       })
        //       that.checkSubmitStatus();
        //       console.log("imgList=" + imgList)
        //     },
        //   })
        // }

        that.setData({
          frontPhoto: frontPhoto
        })
        that.checkSubmitStatus();
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
    });
    this.checkSubmitStatus();
  },
  getRoleinfo() {
    let that = this;
    let params = {
      company_serial: app.globalData.userInfo.company_serial
    }

    request.request_get('/personnelManagement/getRoleinfo.hn', params, function (res) {
      if (res) {
        if (res.success) {
          that.setData({
            jobNameList: res.data
          });
        } else {
          box.showToast(res.msg);
        }
      } else {
        box.showToast("网络不稳定，请重试");
      }
    });
  },
  submitBuffer() {
    let that = this;
    let name = this.data.name;
    let job_number = this.data.job_number;
    let job_phone = this.data.job_phone;
    let password = this.data.password;
    let job_name = this.data.job_name;
    let job_id = this.data.job_id;
    let frontPhoto = this.data.frontPhoto;
    let gender = this.data.gender;



    if (!name) {
      box.showToast("请输入姓名");
      return;
    }

    if (!job_number) {
      box.showToast("请输入工号");
      return;
    }

    if (!job_phone) {
      box.showToast("请输入手机号");
      return;
    }

    if (!utils.checkPhone(job_phone)) {
      box.showToast("手机号有误");
      return;
    }

    if (!password) {
      box.showToast("请输入密码");
      return;
    }

    if (!job_name || !job_id) {
      box.showToast("请选择所在岗位");
      return;
    }

    if (!gender) {
      box.showToast("请选择性别");
      return;
    }

    if (frontPhoto.length == 0) {
      box.showToast("请上传头像");
      return;
    }

    wx.getFileSystemManager().readFile({ // 文件管理系统按照base64方式读取生成的图片
      filePath: frontPhoto[0], //选择图片返回的相对路径
      encoding: 'binary', //编码格式
      success: res => { //成功的回调
        console.log('------->:',res)
  　　 }
  })

    let params = {
      company_serial: app.globalData.userInfo.company_serial,
      real_name: name, //姓名
      gender: gender == '男' ? '0' : '1', //男女
      phone: job_phone, //手机号
      job_number: job_number, //工号
      roleId: job_id, //岗位id
      password: password, //密码
    }

    console.log('---->:',params)
    console.log('---->:',frontPhoto[0])
    return

    request.request_get('/personnelManagement/adduserinfo.hn', params, function (res) {
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