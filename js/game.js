/**
 * 游戏模型
 */
function Game(level = 0) {
  // 初始化数据
  let params = { state: 0 } // 0-进行中 1-失败 2-胜利
  switch (level) {
    case 1:
      params.row = 15
      params.col = 10
      params.mine = 16
      break
    case 2:
      params.row = 20
      params.col = 10
      params.mine = 22
      break
    case 3:
      params.row = 40
      params.col = 10
      params.mine = 45
      break
    case 4:
      params.row = 80
      params.col = 10
      params.mine = 92
      break
    case 5:
      params.row = 160
      params.col = 10
      params.mine = 190
      break
    case 6:
      params.row = 320
      params.col = 10
      params.mine = 384
      break
    default:
      params.row = params.col = params.mine = 10
  }
  params.count = params.row * params.col - params.mine

  let map = []
  for (let i = 0; i < params.row; i++) {
    map[i] = []
    for (let j = 0; j < params.col; j++)
      map[i][j] = 10
  }

  // 判断坐标是否在地图里
  function inMap(i, j) {
    return i >= 0 && j >= 0 && i < params.row && j < params.col
  }

  // 布雷
  for (let i = 0; i < params.mine;) {
    let x = parseInt(Math.random() * params.row)
    let y = parseInt(Math.random() * params.col)
    if (map[x][y] == 19) continue

    ++i
    map[x][y] = 19
    for (let m = x - 1; m <= x + 1; ++m)
      for (let n = y - 1; n <= y + 1; ++n)
        if (inMap(m, n) && map[m][n] != 19)
          ++map[m][n]
  }

  let result = []

  /**
   * 获取操作结果集
   */
  function get() {
    let r = result
    result = []
    return r
  }

  /**
   * 翻开
   */
  function open(i, j) {
    if (params.state === 0 && inMap(i, j) && map[i][j] >= 10) {
      map[i][j] %= 10
      result.push([i, j, map[i][j]])

      if (map[i][j] == 9) {
        params.state = 1
        return
      }

      if (--params.count == 0) {
        params.state = 2
        return
      }

      if (map[i][j] == 0)
        for (let m = i - 1; m <= i + 1; ++m)
          for (let n = j - 1; n <= j + 1; ++n)
            open(m, n)
    }
  }

  /**
   * 快捷翻开
   */
  function openQuickly(i, j) {
    if (map[i][j] >= 10) return

    let count = 0
    for (let m = i - 1; m <= i + 1; ++m)
      for (let n = j - 1; n <= j + 1; ++n)
        if (inMap(m, n) && map[m][n] >= 20)
          ++count

    if (map[i][j] != count) return

    for (let m = i - 1; m <= i + 1; ++m)
      for (let n = j - 1; n <= j + 1; ++n)
        if (inMap(m, n) && map[m][n] < 20)
          open(m, n)
  }

  /**
   * 标记|取消标记
   */
  function flag(i, j) {
    if (map[i][j] < 10) return

    if (map[i][j] < 20) {
      map[i][j] += 10
      result.push([i, j, 11])
    } else {
      map[i][j] -= 10
      result.push([i, j, 10])
    }
  }

  /**
   * 提示
   */
  function tip(i, j) {
    if (map[i][j] >= 10 && map[i][j] < 20) {
      map[i][j] == 19 ? flag(i, j) : open(i, j)
    }
  }

  /**
   * 翻开
   */
  function openBlock(i, j) {
    if (map[i][j] < 10) {
      openQuickly(i, j)
    } else if (map[i][j] < 20) {
      open(i, j)
    }
  }

  return {
    // map,
    params,
    get,
    flag,
    tip,
    openBlock
  }
}