Page({

  /**
   * 页面的初始数据
   */
  data: {
    feeds: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getFeeds(that.data.page);
  },

  onReachBottom: function () {
    wx.showLoading({
      title: 'Show More...',
    })
    var that = this;
    this.getFeeds(that.data.page);
  },

  getFeeds: function (page) {
    if (page == 1) {
      wx.showLoading({
        title: 'Loading...',
      })
    }
    var that = this
    
    wx.request({
      url: 'https://newsapi.org/v2/everything?language=zh&q=technology&pagesize=8&page='+ page +'&apiKey=需要获得',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var res = res.data;
        // console.log(res)

        // var feedTemp = that.data.articles;
        // that.setData({
        //   feeds: feedTemp.concat(res.articles),
        //   page: page + 1
        // })

        if (that.data.page > 1) {
          var feedTemp = that.data.feeds;
          that.setData({
            feeds: feedTemp.concat(res.articles),
            page: page + 1
          })
        } else {
          console.log(res);
          that.setData({
            feeds: res.articles,
            page: page + 1
          })
        }
      },

      fail: function () {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function () {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },
  tapItem: function (event) {
    var that = this;
    var article = event.currentTarget.dataset.para;
    // console.log(event.currentTarget)
    wx.navigateTo({
      url: "/pages/content/content?url=" + article.url + "&content=" + article.description + "&title=" + article.title
    })
  },
  share: function (event){
    var that = this;
    var article = event.currentTarget.dataset.para;
    console.log(article)
    wx.setClipboardData({
      data: article.url + ' ' + article.title,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制到剪切板',
              icon: 'success',
              duration: 2000
            })
            console.log(res.data) // data
          }
        })
      }
    })
  }
})