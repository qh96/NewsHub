var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    // article: '',
    // myrich: '',
    content:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(appInstance.globalData.openid)
    var that = this;
    that.setData({
      url: options.url,
      content:options.content,
      title: options.title
    });
    // console.log(that.data.content)
    // this.getArticle(that.data.url);
  },
  toPage: function (event) {
    var that = this;
    wx.navigateTo({
      url: '/pages/contentDetails/contentDetails?id=' + that.data.url
    })
  }
  
})