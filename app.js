const cols = document.querySelectorAll('.col') //c помощью метода документа querySelectorAll мы //
//забираем все элементы с классом .col//

//keydomw - реакция на анжатие кнопки
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code === 'Space') {
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

    node.classList.toggle('fa-unlock')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickBoard(event.target.textContent)
  }
})

function generateRandomColor() {
  //#FF0000 red
  //#00FF00 green
  //#0000FF blue
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}
//.floor - метод округления

function setRandomColors() {
  //set - набор//
  cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const colorName = col.querySelector('h2')
    const button = col.querySelector('button')
    const color = generateRandomColor()
    if (isLocked) {
      return
    }

    colorName.textContent = color
    col.style.background = color

    setTextColor(colorName, color)
    setTextColor(button, color)
  })
}

function copyToClickBoard(text) {
  return navigator.clipboard.writeText(text)
}

function setTextColor(colorName, color) {
  const luminance = chroma(color).luminance()
  colorName.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors()
