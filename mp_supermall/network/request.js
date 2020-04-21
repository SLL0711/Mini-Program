export default function request(options) {

  return new Promise((resolve, reject) => {
    wx.request({
      // url: 'http://localhost:3000'+options.url,
      url: 'http://10.1.1.15:3000' + options.url,
      data: options.data || {},
      header: {},
      method: options.method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      },
      complete: function (res) { },
    })
  })
}