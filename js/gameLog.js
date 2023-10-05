/**
 * 排行榜
 */
function GameRanking() {
  let get = () => {
    try {
      return JSON.parse(localStorage.getItem('gameRanking')) || {}
    } catch (e) {
      return {}
    }
  }
  return {
    get,
    push: (rank, timeCount) => {
      let gameRanking = get()
      if (!gameRanking[rank] || timeCount < gameRanking[rank]) {
        gameRanking[rank] = timeCount
        localStorage.setItem('gameRanking', JSON.stringify(gameRanking))
        return true
      }
      return false
    },
    clear: () => {
      localStorage.removeItem('gameRanking')
    },
  }
}

/**
 * 历史记录
 */
function GameHistory() {
  let get = () => {
    try {
      return JSON.parse(localStorage.getItem('gameHistories')) || []
    } catch (e) {
      return []
    }
  }

  let push = (rank, state, timeCount) => {
    let isNew = false
    if (state == 2) {
      isNew = GameRanking().push(rank, timeCount)
    }
    let gameHistories = get()
    let gameInfo = {
      date: new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
      rank,
      state,
      timeCount,
      isNew
    }
    gameHistories.push(gameInfo)
    localStorage.setItem('gameHistories', JSON.stringify(gameHistories.slice(-30)))

    return gameInfo
  }

  return {
    push,
    get,
    clear: () => {
      localStorage.removeItem('gameHistories')
    },
  }
}