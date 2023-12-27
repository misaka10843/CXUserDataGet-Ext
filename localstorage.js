// 设置 localStorage，值为当前时间
function setLocalStorage() {
  console.log('set now time localStorage')
  var now = new Date()
  localStorage.setItem('cxLoginGetTime', now.getTime())
}

// 获取 localStorage 中的时间值
function getLocalStorage() {
  var storageValue = localStorage.getItem('cxLoginGetTime')
  if (storageValue) {
    return parseInt(storageValue)
  }
  return null
}

// 判断时间是否已经过去了20分钟或者没有 localStorage
function isTimeExpired() {
  var storageTime = getLocalStorage()
  if (!storageTime) {
    return true // 如果没有 localStorage，则表示已经过去了20分钟
  }

  var now = new Date()
  var timeDiff = now.getTime() - storageTime
  var minutesDiff = Math.floor(timeDiff / (1000 * 60))
  return minutesDiff >= 20 || isNaN(minutesDiff)
}
