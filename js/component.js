/**
 * 难度控制
 */
function LevelConfig() {
  let level = 1

  /**
   * 增加难度
   */
  function inc() {
    if (++level > 2) level = 0
    return level
  }

  /**
   * 降低难度
   */
  function dec() {
    if (--level < 0) level = 2
    return level
  }

  return {
    inc,
    dec
  }
}

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