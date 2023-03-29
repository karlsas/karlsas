function GameBlock(blockWidth) {
  let currentImage = 0;
  let backgroundImageArr = [{
      url: './img/mv.jpg',
      rowNum: 30,
      colNum: 30,
    },
    {
      url: './img/nt.png',
      rowNum: 1,
      colNum: 10,
    },
  ];

  function setBackgroundImage(block) {
    let image = backgroundImageArr[currentImage]
    let r = Math.floor(Math.random() * image.rowNum)
    let c = Math.floor(Math.random() * image.colNum)
    block.style.backgroundPosition = (-blockWidth * c) + 'px ' + (-blockWidth * r) + 'px'
  }

  function init(block) {
    let image = backgroundImageArr[currentImage]
    block.style.backgroundImage = `url(${image.url})`
    block.style.backgroundSize = (blockWidth * image.colNum) + 'px'
  }

  return {
    init,
    setBackgroundImage
  }
}