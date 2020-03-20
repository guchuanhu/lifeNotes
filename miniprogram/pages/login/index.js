//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    name: null
  },

  onLoad: function () {
    wx.showToast({
      icon: 'none',
      title: '功能开发中'
    })
    return;
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.cloud.callFunction({
            // 云函数名称
            name: 'login',
            // 传给云函数的参数
            data: {
              js_code: res.code
            },
            success: function (res) {
              console.log(res)
            },
            fail: console.error
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  submit() {
    console.log('submit',this.data.name)
    return
    db.collection('user').add({
      data: {
        name: this.data.name
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  onChange(){
    const { value } = e.detail;
    console.log(value)
    this.setData({name: value})
  },
  toDisplay(){
    wx.navigateTo({
      url: '../upload/index'
    })
  }
})
