function Block() {
  let blocks = [
    [
      [1, 1],
      [1, 1]
    ],
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
    rotate()
  }

  function rotate() {
    let newBody = [];
    for (let i = 0; i < body[0].length; ++i) {
      let arr = [];
      for (let j = body.length - 1; j >= 0; --j) {
        arr.push(body[j][i])
      }
      newBody.push(arr)
    }
    body = newBody
  }

  return {
    rotate,
    getBody: () => (body),
  }
}