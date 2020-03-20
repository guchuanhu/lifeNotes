//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    imgArr: [],
    textValue: null,
    title: null
  },

  onLoad: function() {
  },
  // 上传图片
  doUpload: function () {
    let that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片s
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        console.log(filePath, cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.data.imgArr.push({
              id: res.fileID,
              path: filePath
            })
            that.setData({ imgArr: that.data.imgArr })
            console.log(that.data.imgArr)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  dbSave(){
    if (!this.data.textValue){
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
      })
      return
    }
    wx.hideToast();
    wx.showLoading({
      title: '发表中',
    })
    const db = wx.cloud.database()
    db.collection('notes').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: this.data.title,
        content: this.data.textValue,
        img: this.data.imgArr,
        createTime: new Date(),
        reviseTime: null
      }
    }).then(res => {
      console.log(res)
      wx.switchTab({
        url: '../display/index'
      })
      wx.hideLoading();
    })
  },
  onBlur(e){
    const { value } = e.detail;
    console.log(value, e)
    const { name } = e.target.dataset;
    this.setData({
      [name]: value
    })
  }

})
