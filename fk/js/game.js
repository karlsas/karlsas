function Game() {
  let state = 0;
  let map = [];
  let grade = 0;

  clearMap();

  function clearMap() {
    for (let i = 0; i < 10; ++i) {
      map[i] = []
      for (let j = 0; j < 10; ++j) {
        map[i][j] = 0
      }
    }
  }

  /**
   * 检测是否可以放入
   * @param {int} i 行坐标
   * @param {int} j 列坐标
   * @param {array} block 方块数组
   * @returns {boolean}
   */
  function check(i, j, block) {
    if (i < 0 || j < 0) return false;
    for (let x = i, m = 0; m < block.length; ++x, ++m) {
      if (x >= map.length) return false

      for (let y = j, n = 0; n < block[0].length; ++y, ++n) {
        if (y >= map[0].length || block[m][n] && map[x][y]) return false
      }
    }
    return true
  }

  /**
   * 预览
   * @param {int} i 行坐标
   * @param {int} j 列坐标
   * @param {array} block 方块数组
   * @returns {array}
   */
  function preview(i, j, block) {
    if (state) return [];

    let previewResult = [];

    if (check(i, j, block)) {
      // 获取预览数组
      for (let x = i, m = 0; m < block.length; ++x, ++m) {
        for (let y = j, n = 0; n < block[0].length; ++y, ++n) {
          if (block[m][n]) {
            previewResult.push([x, y])
          }
        }
      }
    }
    return previewResult;
  }

  /**
   * 放入方块
   * @param {int} i 行坐标
   * @param {int} j 列坐标
   * @param {array} block 方块数组
   * @returns {array}
   */
  function update(i, j, block) {
    if (state) return false;

    // 检测是否可以放入
    if (!check(i, j, block)) return false;

    // 放入
    for (let x = i, m = 0; m < block.length; ++x, ++m) {
      for (let y = j, n = 0; n < block[0].length; ++y, ++n) {
        if (block[m][n]) {
          map[x][y] = block[m][n]
        }
      }
    }

    // 检测行得分
    let row = [];
    for (let i = 0; i < map.length; ++i) {
      let push = true
      for (let j = 0; j < map[0].length; ++j) {
        if (!map[i][j]) {
          push = false;
          break
        }
      }
      if (push) row.push(i)
    }
    // 检测列得分
    let col = [];
    for (let j = 0; j < map[0].length; ++j) {
      let push = true
      for (let i = 0; i < map.length; ++i) {
        if (!map[i][j]) {
          push = false;
          break
        }
      }
      if (push) col.push(j)
    }

    let num = row.length + col.length
    if (num) {
      grade += [0, 1, 3, 5, 10, 20, 30][num] * 100;
      // 消除行
      for (let i = 0; i < row.length; ++i) {
        for (let j = 0; j < map[0].length; ++j) {
          map[row[i]][j] = 0;
        }
      }
      //消除列
      for (let i = 0; i < col.length; ++i) {
        for (let j = 0; j < map.length; ++j) {
          map[j][col[i]] = 0;
        }
      }
    }
    return true
  }

  /**
   * 检测所有方块是否可以放入地图
   * @param {array} blocks 方块数组
   * @returns 
   */
  function no(blocks) {
    for (let i = 0; i < blocks.length; ++i) {
      let body = blocks[i].getBody()
      for (let n = 0; n < 4; ++n) {
        body = rotateBlock(body)
        for (let x = 0; x < map.length; ++x) {
          for (let y = 0; y < map[0].length; ++y) {
            if (check(x, y, body)) return false
          }
        }
      }
    }
    return true
  }

  function rotateBlock(blockBody) {
    let newBody = [];
    for (let i = 0; i < blockBody[0].length; ++i) {
      let arr = [];
      for (let j = blockBody.length - 1; j >= 0; --j) {
        arr.push(blockBody[j][i])
      }
      newBody.push(arr)
    }
    return newBody
  }

  return {
    map,
    update,
    preview,
    no,
    clearMap,
    getGrade: () => (grade),
    getState: () => (state),
    setState: (s) => (state = s)
  }
}