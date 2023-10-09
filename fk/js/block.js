function rotate(block) {
  let newBlock = [];
  for (let i = 0; i < block[0].length; ++i) {
    let arr = [];
    for (let j = block.length - 1; j >= 0; --j) {
      arr.push(block[j][i])
    }
    newBlock.push(arr)
  }

  return newBlock
}

function Block() {
  let blocks = [
    [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1]
    ],
    [
      [1, 0],
      [1, 1]
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1]
    ],
    [
      [1]
    ],
    [
      [1, 1]
    ],
    [
      [1, 1, 1]
    ],
    [
      [1, 1, 1, 1]
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 1]
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ]
  ]

  let body = blocks[Math.floor(Math.random() * blocks.length)].concat();

  for (let i = 0; i < Math.floor(Math.random() * 4); ++i) {
    body = rotate(body)
  }

  return {
    body
  }
}