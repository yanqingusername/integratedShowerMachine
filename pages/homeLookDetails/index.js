import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
const utils = require('../../utils/utils.js')
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '测试下面legend的红色区域不应被裁剪',
      left: 'center'
    },
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ec_pig: {
      lazyLoad: true // 将 lazyLoad 设为 true 后，需要手动初始化图表
    },
    yearmouthday: "",
    timestamp: new Date().getTime(),
    startDate: "",
    endDate: "",

    isShowName: false,
    isShowResult: false,
    isShowWork: false,
    showOrHide: false,
    

    riderCommentList: [{
      value: '商品品质',
      selected: false,
      title: '商品品质'
     }, {
      value: '眉笔质地',
      selected: false,
       title: '眉笔质地'
     }, {
      value: '最新',
      selected: false,
       title: '最新'
     }, {
      value: '正品',
      selected: false,
       title: '正品'
     }, {
      value: '包装完整',
      selected: false,
       title: '包装完整'
     }, {
      value: '是否防水',
      selected: false,
       title: '是否防水'
     }, {
      value: '其他',
      selected: false,
      title: '其他'
     }]
  },
  onShow: function () {
    // this.getAllCus();
  },
  onLoad: function (options) {
    let that = this;

    wx.setNavigationBarTitle({
      title: '淋浴信息记录'
    });

    this.currentTime()

    // this.pig_component = this.selectComponent('#mychart-line');

    // that.chartInit(["1","2","3","4","5","6"],[0,20,40,60,80,100],["上班","下班"])
  },
  getAllCus() {
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
  /**
   * 当前日期
   */
  currentTime() {
    let tempTime = new Date(this.data.timestamp);
    let month = tempTime.getMonth() + 1;
    let day = tempTime.getDate();
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    let curtime = tempTime.getFullYear() + "年" + (month) + "月" + day + "日";
    console.log('currentTime' + curtime);
    this.setData({
      yearmouthday: curtime,
      startDate: curtime,
      endDate: curtime
    })
  },
  formatYear(datestring,typestring){
    if(datestring){
      let dateList = datestring.split('-');
      console.log('---->:',dateList)
      let startDate = dateList[0] + "年" +dateList[1] + "月" + dateList[2] + "日";
      this.setData({
        [typestring]: startDate
      })
    }
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let datestring = e.detail.value;
    if(datestring){
      this.formatYear(datestring,'startDate');
    }
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let datestring = e.detail.value;
    if(datestring){
      this.formatYear(datestring,'endDate');
    }
  },
  bingNameHandler(e){
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowName: true
    });
  },
  bingResultHandler(e){
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowResult: true
    });
  },
  bingWorkHandler(e){
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowWork: true
    });
  },
  closeMask(e){
    this.setData({
      showOrHide: false,
      isShowName: false,
      isShowResult: false,
      isShowWork: false,
    });
  },
  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "riderCommentList[" + e.target.dataset.index + "].selected"
    this.setData({
     [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)
   },
   // 开始画图
  //  chartInit:function(xdata,ydata,axisLabel){
  //   var that = this;
  //   that.pig_component.init((canvas, width, height) => {
  //       const chart = echarts.init(canvas, null, { width: width, height: height});
  //       that.setLineOption(chart, xdata, ydata,axisLabel);
  //       return chart;  // 注意这里一定要返回 chart 实例，否则会影响事件处理等
  //   });    
// },

// setLineOption:function(chart, xdata, ydata,axisLabel){
//     var option = {
//         backgroundColor: "#ffffff",
//         color: ["#E60012"],
//         title: {
//             show: false
//         },
//         legend: {
//             show: false
//         },
//         grid: {
//             containLabel: true,
//             top: 20,
//             bottom:0
//         },
//         tooltip: {
//             show: true,
//             trigger: 'axis'
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false,
//             data:xdata,
//             axisLabel: axisLabel,
//         },
//         yAxis: {
//             x: 'center',
//             type: 'value',
//             splitLine: {
//                 lineStyle: {
//                 type: 'dashed'
//                 }
//             },
//             minInterval: 1,
//             y:'dataMin'
//         },
//         series: [{
//             name: '数量',
//             type: 'line',
//             smooth: true,
//             data: ydata
//         }]
//     };
//     chart.setOption(option);
//     return chart;
// },
})
