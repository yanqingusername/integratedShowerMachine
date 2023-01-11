const app = getApp()
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')
const login = require('../../utils/login.js')
const utils = require('../../utils/utils.js')

Page({
    data: {
        phone: "",
        password: ''
    },

    onLoad: function () {
    },
    // 检测手机号输入框
    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value,
        })
    },
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value,
        })
    },
    // 登录
    login: function (e) {
        var that = this;
        var info = e.detail.value;
        var phone = info.phone;
        var password = info.password;
        
        if (phone == '') {
            box.showToast("请输入手机号");
            return;
        } 
        if (!utils.checkPhone(phone)) {
            box.showToast("手机号有误");
            return;
        }
        if (password == '') {
            box.showToast("请输入密码");
            return;
        } 

        login.toLogin(phone, password);
    }
})
