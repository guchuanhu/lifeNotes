//index.js
const app = getApp()

Page({
  data: {
    details: {}
  },

  onLoad: function (options) {
    console.log(options)
    let that = this;
    const db = wx.cloud.database().collection('notes');
    db.where({
      _id: options.id
    }).get({
      success: function (res) {
        console.log(res.data);
        that.setData({ details: res.data[0] });
      }
    })
  },
  toDisplay(){
    wx.navigateTo({
      url: '../upload/index'
    })
  }
})
