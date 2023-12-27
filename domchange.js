function noMsgCodeLogin() {
  const msgCodeLogin = document.querySelector('.col-blue.fr')

  if (msgCodeLogin) {
    // 删除验证码登录以及机构登录
    const linkToRemove = msgCodeLogin
    const otherlinkToRemove = document.querySelector('#otherlogin')
    // 隐藏双登录
    linkToRemove.style.display = 'none'
    otherlinkToRemove.style.display = 'none'
    // 创建新的验证码登录
    const newLink = document.createElement('a')
    newLink.href = 'javaScript:void(0)'
    newLink.className = 'col-blue fr cx-fake-msg-button'
    newLink.textContent = '手机验证码登录'
    newLink.onclick = noMsgCodeLoginClick

    // 将新的a插入到容器中
    const container = document.querySelector('.clearaft.fs14.pd-lr-24')
    container.appendChild(newLink)
  }
}

function recnoMsgCodeLogin() {
  //还原修改
  const msgCodeLogin = document.querySelector('.col-blue.fr')
  const fakemsgCodeLogin = document.querySelector(
    '.col-blue.fr.cx-fake-msg-button'
  )
  const otherlinkToRemove = document.querySelector('#otherlogin')
  msgCodeLogin.style.display = 'block'
  otherlinkToRemove.style.display = 'block'
  if (fakemsgCodeLogin) {
    fakemsgCodeLogin.style.display = 'none'
  }
}

function noMsgCodeLoginClick() {
  const errtext = document.getElementById('err-txt')
  errtext.innerHTML = '短信验证服务维护中，请使用账号密码登录'
}

function noQRCodeLogin() {
  var ewmDisable = document.querySelector('.ewmDisable')
  if (ewmDisable) {
    ewmDisable.style.display = 'block' // 设置 display 属性为 block

    var paragraph = ewmDisable.querySelector('p')
    if (paragraph) {
      paragraph.innerHTML = '二维码服务维护中<br>请使用密码登录' // 修改 <p> 标签的内容
    }

    var link = ewmDisable.querySelector('a')
    if (link) {
      link.style.display = 'none' // 隐藏 <a> 标签
    }
  }
}

function recQRCodeLogin() {
  var ewmDisable = document.querySelector('.ewmDisable')
  if (ewmDisable) {
    ewmDisable.style.display = 'none' // 设置 display 属性为 none

    var paragraph = ewmDisable.querySelector('p')
    if (paragraph) {
      paragraph.innerHTML = '二维码已失效' // 防止二维码失效时还显示维护
    }

    var link = ewmDisable.querySelector('a')
    if (link) {
      link.style.display = 'block' // 显示 <a> 标签
    }
  }
}
