/**
 * 游戏等级
 */
function GameLevel() {
  let level = localStorage.getItem('saolei_gameRank') || 1
  let levelDict = {
    0: {
      title: '小白',
      rowNum: 10,
      mineNum: 10,
    },
    1: {
      title: '入门',
      rowNum: 15,
      mineNum: 16,
    },
    2: {
      title: '初级',
      rowNum: 20,
      mineNum: 22,
    },
    3: {
      title: '中级',
      rowNum: 40,
      mineNum: 45,
    },
    4: {
      title: '高级',
      rowNum: 80,
      mineNum: 92,
    },
    5: {
      title: '进阶',
      rowNum: 160,
      mineNum: 190,
    },
    6: {
      title: '大师',
      rowNum: 320,
      mineNum: 384,
    }
  }

  return {
    getTitle: () => levelDict[level].title,
    getRowNum: () => levelDict[level].rowNum,
    getMineNum: () => levelDict[level].mineNum,
    get: () => level,
    set: (lev) => {
      level = lev
      localStorage.setItem('saolei_gameRank', lev)
    },
    getControlElement: (column = 3) => {
      let i = 0
      let element = ''
      for (let key in levelDict) {
        let item = levelDict[key]
        if (i == 0) element += '<div class="row">'
        element += `<label class="rank-label">
            <input type="radio" name="gameRank" />
            ${item.title}
          </label>`
        if (++i == column) {
          element += '</div>'
          i = 0
        }
      }
      while (i && i < column) {
        element += `<label class="rank-label"></label>`
        if (++i == column) element += '</div>'
      }
      return element
    }
  }
}