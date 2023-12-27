// 检查账号是否正确
function checkLogin(phone, pwd) {
  return new Promise((resolve, reject) => {
    // 进行加密
    let transferKey = 'u2oh6Vu^HWe4_AES'
    enpwd = encryptByAES(pwd, transferKey)
    enphone = encryptByAES(phone, transferKey)

    // 创建表单
    const postData = {
      fid: -1,
      uname: phone,
      password: pwd,
      refer: 'https%3A%2F%2Fi.chaoxing.com',
      t: true,
      forbidotherlogin: 0,
      validate: '',
      doubleFactorLogin: 0,
      independentId: 0,
      independentNameId: 0,
    }

    // 访问登录 API
    fetch('https://passport2.chaoxing.com/fanyalogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === true) {
          resolve(true) // 登录成功，返回 true
        } else {
          resolve(false) // 登录失败，返回 false
        }
      })
      .catch((error) => {
        resolve(false) // 网络错误，返回 false
      })
  })
}

//进行密码/手机号加密
function encryptByAES(message, key) {
  let CBCOptions = {
    iv: CryptoJS.enc.Utf8.parse(key),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
  let aeskey = CryptoJS.enc.Utf8.parse(key)
  let secretData = CryptoJS.enc.Utf8.parse(message)
  let encrypted = CryptoJS.AES.encrypt(secretData, aeskey, CBCOptions)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
