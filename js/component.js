/**
 * 计时器
 */
function Timer() {
  let a, b, c, d

  init()

  /**
   * 下一秒
   */
  function run() {
    if (++d >= 10) {
      d = 0
      if (++c >= 6) {
        c = 0
        if (++b >= 10) {
          b = 0
          if (++a > 9)
            a = 0
        }
      }
    }
    return get()
  }

  /**
   * 初始化
   */
  function init() {
    a = b = c = d = 0
    return get()
  }

  function get() {
    return `${a}${b}:${c}${d}`
  }

  return {
    run,
    init
  }
}
