//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    myLists: null
  },

  onLoad: function () {
  },
  onShow: function () {
    this.getListData();
  },
  getListData() {
    let that = this;
    wx.cloud.database().collection('notes').skip(0).limit(10).get({
      success: function (res) {
        console.log(res.data);
        that.setData({ myLists: res.data });
      }
    })
  },
  toDisplay(){
    wx.navigateTo({
      url: '../upload/index'
    })
  }
})
