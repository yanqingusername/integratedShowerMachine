import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
const utils = require('../../utils/utils.js')
const request = require('../../utils/request.js')
const box = require('../../utils/box.js')

// let chart = null;

// function initChart(canvas, width, height, dpr) {
//   chart = echarts.init(canvas, null, {
//     width: width,
//     height: height,
//     devicePixelRatio: dpr // new
//   });
//   canvas.setChart(chart);

//   var option = {
//     title: {
//       text: '',
//       left: 'center'
//     },
//     legend: {
//       data: ['A', 'B', 'C','D'],
//       top: 20,
//       left: 'center',
//       backgroundColor: 'red',
//       z: 100
//     },
//     grid: {
//       containLabel: true
//     },
//     tooltip: {
//       show: true,
//       trigger: 'axis'
//     },
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周十', '周八', '周九','周七'],
//       // show: false
//     },
//     yAxis: {
//       x: 'center',
//       type: 'value',
//       splitLine: {
//         lineStyle: {
//           type: 'dashed'
//         }
//       }
//       // show: false
//     },
//     series: [{
//       name: 'A',
//       type: 'line',
//       smooth: true,
//       data: [18, 36, 65, 30, 78, 40, 33,23,32,41,50]
//     }, {
//       name: 'B',
//       type: 'line',
//       smooth: true,
//       data: [12, 50, 51, 35, 70, 30, 20,23,32,41,90]
//     }, {
//       name: 'C',
//       type: 'line',
//       smooth: true,
//       data: [10, 30, 31, 50, 40, 20, 10,23,32,41,30]
//     },{
//       name: 'D',
//       type: 'line',
//       smooth: true,
//       data: [40, 60, 66, 50, 80, 20, 10,23,32,41,60]
//     }]
//   };

//   chart.setOption(option);
//   return chart;
// }



Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ec: {
    //   onInit: initChart
    // },
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

    page: 1,
    limit: 10,
    iwadomListinfo: [],
    start_time: "", //开始时间，第二个接口用  默认当前
    end_time: "", //结束时间 同开始时间
    status: '', //洗消状态 1成功 2失败 0沐浴中
    workType: "", //上下班 0是上班 1是下班  ""全部
    staffids: '', //员工id以','分割
    // resultList: ['全部', '淋浴中', '淋浴成功', '淋浴失败'],
    // resultListId: ["", "0", "1", "2"],
    resultList: ['全部', '淋浴成功', '淋浴失败'],
    resultListId: ["", "1", "2"],
    resultIndex: 0,

    workList: ['全部', '上班', '下班'],
    workListId: ["", "0", "1"],
    workIndex: 0,

    isShow: false,

    // homePersonal: [{
    //   "id": 1,
    //   "real_name": "张1",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 2,
    //   "real_name": "张2",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 3,
    //   "real_name": "张三",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 4,
    //   "real_name": "张4",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 5,
    //   "real_name": "张5",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 6,
    //   "real_name": "张6",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 7,
    //   "real_name": "张7",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 8,
    //   "real_name": "张8",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 9,
    //   "real_name": "张9",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 10,
    //   "real_name": "张10",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 11,
    //   "real_name": "张11",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 12,
    //   "real_name": "张12",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 13,
    //   "real_name": "张13",
    //   "company_serial": "TJhc",
    //   "selected": false
    // },{
    //   "id": 14,
    //   "real_name": "张14",
    //   "company_serial": "TJhc",
    //   "selected": false
    // }],
    // homePersonalOld: [{
    //   "id": 1,
    //   "real_name": "张1",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 2,
    //   "real_name": "张2",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 3,
    //   "real_name": "张三",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 4,
    //   "real_name": "张4",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 5,
    //   "real_name": "张5",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 6,
    //   "real_name": "张6",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 7,
    //   "real_name": "张7",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 8,
    //   "real_name": "张8",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 9,
    //   "real_name": "张9",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 10,
    //   "real_name": "张10",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 11,
    //   "real_name": "张11",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 12,
    //   "real_name": "张12",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 13,
    //   "real_name": "张13",
    //   "company_serial": "TJhc",
    // },{
    //   "id": 14,
    //   "real_name": "张14",
    //   "company_serial": "TJhc",
    // }],
    homePersonal: [],
    homePersonalOld: [],
    homePersonalIds: [],
    homePersonalOldIds: []
  },
  clickName(e) {
    this.setData({
      isShow: true
    });
    console.log('clickName homePersonalIds---->:', this.data.homePersonalIds)
    console.log('clickName homePersonalOldIds---->:', this.data.homePersonalOldIds)
    console.log('clickName homePersonal---->:', this.data.homePersonal)
    console.log('clickName homePersonalOld---->:', this.data.homePersonalOld)

  },
  hideModal(e) {
    this.setData({
      isShow: false
    });
    if(this.data.homePersonalIds.length > 0){
      console.log('111111')
      if(this.data.homePersonalOldIds.length > 0){
        console.log('222222')
        console.log('222222',this.data.homePersonalOldIds)
        console.log('222222',this.data.homePersonalOld)

        let homePersonal = this.data.homePersonalOld;
        for(let i = 0; i< homePersonal.length; i++){
          homePersonal[i].selected = false;

          for(let j = 0; j < this.data.homePersonalOldIds.length; j++){
            if(this.data.homePersonalOldIds[j] == homePersonal[i].id){
              homePersonal[i].selected = true;
              break;
            }else{
              homePersonal[i].selected = false;
            }
          }
        }


        // for(let i = 0; i< this.data.homePersonalOld.length; i++){
        //   for(let j = 0; j < this.data.homePersonalOldIds.length; j++){
        //     if(this.data.homePersonalOld[i].id == this.data.homePersonalOldIds[j]){
        //       this.data.homePersonalOld[i].selected = true;
        //     }
        //   }
        // }

        this.setData({
          homePersonalIds: this.data.homePersonalOldIds,
          homePersonal: homePersonal
        });
      } else {
        console.log('333333',this.data.homePersonalOld)
        let homePersonal = this.data.homePersonalOld;
        for(let i = 0; i< homePersonal.length; i++){
          homePersonal[i].selected = false;
        }
        this.setData({
          homePersonalIds: [],
          homePersonalOldIds: [],
          homePersonal: homePersonal
        });
      }
    } else {
      let homePersonal = this.data.homePersonalOld;
        for(let i = 0; i< homePersonal.length; i++){
          homePersonal[i].selected = false;
        }
      this.setData({
        homePersonalIds: [],
        homePersonalOldIds: [],
        homePersonal: homePersonal
      });
    }
  },
  onConfirm(e) {
    this.setData({
      isShow: false,
      page: 1
    });
    if(this.data.homePersonalIds.length > 0){
      this.setData({
        homePersonalOldIds: [].concat(this.data.homePersonalIds||[]),
      });
    } else {
      box.showToast("请选择员工姓名");
      this.setData({
        homePersonalIds: [],
        // homePersonal: this.data.homePersonalOld
      });
    }

    this.getIwadomlistinfo();
    this.getIwadomchartinfo();
    console.log('--homePersonalOldIds-->:',this.data.homePersonalOldIds)
  },
  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "homePersonal[" + e.target.dataset.index + "].selected"
    console.log('checkboxChange string:', string);
    this.setData({
      [string]: !this.data.homePersonal[e.target.dataset.index].selected
    })
    let detailValue = this.data.homePersonal.filter(it => it.selected).map(it => it.id)
    console.log('所有选中的值为：', detailValue)
    this.setData({
      homePersonalIds: detailValue
    });
    console.log('homePersonalIds---->:', this.data.homePersonalIds,this.data.homePersonal)
  },
  bindPickerChangeResult(e) {
    console.log(e.detail.value)
    var that = this;
    this.setData({
      resultIndex: e.detail.value,
      status: this.data.resultListId[e.detail.value],
      page: 1
    });
    console.log(this.data.status)

    this.getIwadomlistinfo();
    this.getIwadomchartinfo();
  },
  bindPickerChangeWork(e) {
    console.log(e.detail.value)
    var that = this;
    this.setData({
      workIndex: e.detail.value,
      workType: this.data.workListId[e.detail.value],
      page: 1
    });
    console.log(this.data.workType)

    this.getIwadomlistinfo();
    this.getIwadomchartinfo();
  },
  onShow: function () {
    this.getEmployees();
  },
  onLoad: function (options) {
    let that = this;

    wx.setNavigationBarTitle({
      title: '淋浴信息记录'
    });

    this.currentTime();

    this.getIwadomlistinfo();
    this.getIwadomchartinfo();

    this.pig_component = this.selectComponent('#mychart-line');
  },
  getIwadomlistinfo: function () {
    var that = this;
    var data = {
      id: app.globalData.userInfo.id, //登录人的id
      start_time: this.data.startDate, //开始时间，第二个接口用  默认当前
      end_time: this.data.endDate, //结束时间 同开始时间
      status: this.data.status, //洗消状态 1成功 2失败 0沐浴中
      workType: this.data.workType, //上下班 0是上班 1是下班  ""全部
      staffids: this.data.homePersonalIds.length > 0 ? this.data.homePersonalIds.join(',') : "", //员工id以','分割
      page: this.data.page,
      limit: this.data.limit
    }

    console.log('---->:', data)

    request.request_get('/iwadom/getIwadomlistinfo.hn', data, function (res) {
      if (res) {
        if (res.success) {
          if (that.data.page == 1) {
            that.setData({
              iwadomListinfo: res.data,
              page: (res.data && res.data.length > 0) ? that.data.page + 1 : that.data.page
            });
          } else {
            that.setData({
              iwadomListinfo: that.data.iwadomListinfo.concat(res.data || []),
              page: (res.data && res.data.length > 0) ? that.data.page + 1 : that.data.page,
            });
          }
        } else {
          box.showToast(res.msg);
        }
      }
    })
  },
  onReachBottom: function () {
    this.getIwadomlistinfo();
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
    let curDate = tempTime.getFullYear() + "-" + (month) + "-" + day;
    console.log('currentTime' + curtime);
    this.setData({
      yearmouthday: curDate,
      start_time: curtime,
      end_time: curtime,
      startDate: curDate,
      endDate: curDate
    })
  },
  formatYear(datestring, typestring, datetypestring) {
    if (datestring) {
      let dateList = datestring.split('-');
      console.log('---->:', dateList)
      let start_time = dateList[0] + "年" + dateList[1] + "月" + dateList[2] + "日";
      this.setData({
        [typestring]: start_time,
        [datetypestring]: datestring,
        page: 1
      })

      this.getIwadomlistinfo();
      this.getIwadomchartinfo();
    }
  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let datestring = e.detail.value;
    if (datestring) {
      this.formatYear(datestring, 'start_time', 'startDate');
    }
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let datestring = e.detail.value;
    if (datestring) {
      this.formatYear(datestring, 'end_time', 'endDate');
    }
  },
  bingNameHandler(e) {
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowName: true
    });
  },
  bingResultHandler(e) {
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowResult: true
    });
  },
  bingWorkHandler(e) {
    this.setData({
      showOrHide: !this.data.showOrHide,
      isShowWork: true
    });
  },
  closeMask(e) {
    this.setData({
      showOrHide: false,
      isShowName: false,
      isShowResult: false,
      isShowWork: false,
    });
  },
  // 开始画图
  chartInit: function (xdata, ydata, axisLabel, series) {
    var that = this;
    that.pig_component.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      that.setLineOption(chart, xdata, ydata, axisLabel, series);
      return chart; // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    });
  },

  setLineOption: function (chart, xdata, ydata, axisLabel, series) {
    var option = {
      dataZoom: [{
        type: 'inside', //1平移 缩放
        throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
        minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
        start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
        end: 50, //数据窗口范围的结束百分比。范围是：0 ~ 100。
        zoomLock: true, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
      }],
      // backgroundColor: "#ffffff",
      // color: ["#E60012"],
      title: {
        show: false
      },
      legend: {
        show: false
        // data: ['A', 'B', 'C','D'],
        // top: 0,
        // left: 'center',
        // backgroundColor: 'red',
        // z: 100
      },
      grid: {
        containLabel: true,
        top: 50,
        bottom: 20
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata,
        axisLabel: axisLabel,
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
      // yAxis: {
      //     x: 'center',
      //     type: 'value',
      //     splitLine: {
      //         lineStyle: {
      //         type: 'dashed'
      //         }
      //     },
      //     y:'dataMin'
      // },
      series: series
      // series: [{
      //   name: 'A',
      //   type: 'line',
      //   smooth: true,
      //   data: [18, 36, 65, 30, 78, 40, 33, 23, 32, 41, 50, 90, 90, 90, 90, 90]
      // }, {
      //   name: 'B',
      //   type: 'line',
      //   smooth: true,
      //   data: [12, 50, 51, 35, 70, 30, 20, 23, 32, 41, 90, 90, 90, 90, 90, 90]
      // }, {
      //   name: 'C',
      //   type: 'line',
      //   smooth: true,
      //   data: [10, 30, 31, 50, 40, 20, 10, 23, 32, 41, 30, 90, 90, 90, 90, 90]
      // }, {
      //   name: 'D',
      //   type: 'line',
      //   smooth: true,
      //   data: [40, 60, 66, 50, 80, 20, 10, 23, 32, 41, 60, 90, 90, 90, 90, 90]
      // }]
    };
    chart.setOption(option);
    return chart;
  },
  // 获取所有人员 
  getEmployees: function () {
    var that = this;
    var data = {
      id: app.globalData.userInfo.id
    }
    request.request_get('/personnelManagement/getEmployees.hn', data, function (res) {
      if (res) {
        if (res.success) {
          let list = res.data;
          for(let i = 0; i< list.length; i++){
            list[i].selected = false;
          }
          
          that.setData({
            homePersonal: list,
            homePersonalOld: res.data
          });
        } else {
          box.showToast(res.msg);
        }
      }
    })
  },
  getIwadomchartinfo: function () {
    var that = this;
    var data = {
      company_serial: app.globalData.userInfo.company_serial, //
      start_time: this.data.startDate, //开始时间，第二个接口用  默认当前
      end_time: this.data.endDate, //结束时间 同开始时间
      status: this.data.status, //洗消状态 1成功 2失败 0沐浴中
      workType: this.data.workType, //上下班 0是上班 1是下班  ""全部
      staffids: this.data.homePersonalIds.length > 0 ? this.data.homePersonalIds.join(',') : "", //员工id以','分割
    }

    console.log('---->:', data)

    request.request_get('/iwadom/getIwadomchartinfo.hn', data, function (res) {
      if (res) {
        if (res.success) {
          var xdata = res.xdata
          // var ydata = ['10', '30', '60', '90', '20', '70', '80', '24', '55', '67', '40']
          var ydata = []
          var series = res.ydata
          var axisLabel = { //设置x轴的字
            show: true,
            interval: 0,
          }
          that.chartInit(xdata, ydata, axisLabel, series)

        //   var xdata = ['张一','张一','张一','张一','张一','张一','张一','张一','张一','张一','张二','张三','张4','张5','张6','张7']
        // // var ydata = ['10','30','60','90','20','70','80','24','55','67','40']
        // var ydata = []
        // var axisLabel = { //设置x轴的字
        //   show:true,
        //   interval:0,
      // }
    // that.chartInit(xdata,ydata,axisLabel)
        } else {
          box.showToast(res.msg);
        }
      }
    })
  },
})