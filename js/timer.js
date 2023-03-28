/**
 * 计时器
 */
function Timer(id) {
  let element = document.getElementById(id)
  let interval = null
  let lastTime = 0
  let count = 0

  function start(clear) {
    if (interval) { // 如果定时器存在，清除定时器
      clearInterval(interval)
      interval = null
    }
    if (clear) count = 0; // 是否清空计时
    element.innerText = format(count)
    lastTime = new Date().getTime() / 1000
    interval = setInterval(update, 1000)
  }

  function update() {
    let now = new Date().getTime() / 1000
    count += now - lastTime
    lastTime = now
    element.innerText = format(count)
  }

  function stop() {
    if (interval) {
      clearInterval(interval)
      interval = null
      update()
    }
  }

  function format(count) {
    if (!count || count <= 0) return '00:00'
    let s = Math.round(count)
    return `${Math.floor(s/600)}${Math.floor(s/60)%10}:${Math.floor(s/10)%6}${s%10}`
  }

  return {
    start,
    stop,
    get: () => count,
    format,
  }
}