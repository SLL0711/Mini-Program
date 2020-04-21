import request from '../../network/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    similarProducts: {
      pageIndex: 1,
      pageSize: 20,
      dataCount: 1000,
      list: []
    },
    bottomLine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBannerInfos()
    this.getRecommendInfos()
    this.getSimilarProductsInfos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageINdex = this.data.similarProducts.pageIndex
    let pageSize = this.data.similarProducts.pageSize
    let pageCount = this.data.similarProducts.dataCount

    if ((pageINdex - 1) * pageSize >= pageCount) {
      if (!this.data.bottomLine) {
        this.setData({
          "bottomLine": true
        })
      }
      return;
    }

    this.getSimilarProductsInfos()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getBannerInfos() {
    request({
      url: '/banner/getbannerinfos'
    }).then(res => {
      this.setData({
        bannerList: res.data.list
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getRecommendInfos() {
    request({
      url: '/recommend/getRecommendInfos'
    }).then(res => {
      this.setData({
        recommendList: res.data.list
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getSimilarProductsInfos() {
    let pageINdex = this.data.similarProducts.pageIndex
    let pageSize = this.data.similarProducts.pageSize

    request({
      url: '/similarProduct/getSimilarProduct?pageIndex=' + pageINdex + '&pageSize=' + pageSize
    }).then(res => {
      // debugger
      let nowProducts = this.data.similarProducts.list //.concat(res.data.list)
      let nowProductIDs = nowProducts.map((v, i) => {
        return v._id;
      })

      let arrNew = res.data.list.filter((v, i) => {
        return nowProductIDs.indexOf(v) == -1
      })
      nowProducts = nowProducts.concat(arrNew)

      let list = 'similarProducts.list';
      let dataCount = 'similarProducts.dataCount';
      let pageIndex = "similarProducts.pageIndex"

      this.setData({
        [list]: nowProducts,
        [dataCount]: res.data.dataCount,
        [pageIndex]: pageINdex + 1
      })

    }).catch(err => {
      console.log(err)
    })
  }
})