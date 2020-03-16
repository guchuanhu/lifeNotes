//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
  },

  onLoad: function() {
    console.log(wx.cloud.database());
  },
})
