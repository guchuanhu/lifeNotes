//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    myLists: [],
    total: 0,
    count: null
  },

  onLoad: function () {
  },
  onShow: function () {
    this.getListData();
  },
  async getListData() {
    let that = this; 
    const db = wx.cloud.database().collection('notes');
    const {total} = await db.count()
    console.log(total)
    if (this.data.count===null){
      this.data.count = Math.floor(total/10)
    }
    this.data.total = total;
    let result = await db.skip(this.data.count * 10).limit(10).get();
    let arryList = Array.prototype.concat.apply([],result.data.map(v=>v.img.map(val=>val.id)));
    
    let arryListRes = await wx.cloud.getTempFileURL({ fileList: arryList });
    let arryListResDict = {};
    arryListRes.fileList.forEach(v=>{
      arryListResDict[v.fileID] = v.tempFileURL
    })
    result.data.forEach(v=>{
      v.img.forEach(val=>{
        val.path = arryListResDict[val.id];
      })
    })
    console.log(result, arryList, arryListRes)
    this.data.count = this.data.count - 1;
    this.setData({ myLists: this.data.myLists.concat(result.data.reverse()) });
  },
  onchange(event){
    const { current, source } =  event.detail;
    console.log(current, source)
    if (current > (this.data.myLists.length - 3) && this.data.myLists.length < this.data.total){
      this.getListData();
    }
    if (current===0){
      wx.showToast({
        icon: 'none',
        title: '已经完整浏览一遍了哦'
      })
    }
  },
  toDisplay(){
    wx.navigateTo({
      url: '../upload/index'
    })
  }
})
