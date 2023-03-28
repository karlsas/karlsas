function Modal(id, options = {}) {
  let modalElement = document.getElementById(id)

  let hidden = () => {
    modalElement.style.display = 'none'
  }

  let close = () => {
    if (options.on_close) options.on_close()
    hidden()
  }

  let closeControl = document.querySelector('#' + id + ' .modal-close')
  if (closeControl) closeControl.addEventListener('click', close)

  let cancelControl = document.querySelector('#' + id + ' .modal-cancel')
  if (cancelControl) cancelControl.addEventListener('click', close)

  let onControl = document.querySelector('#' + id + ' .modal-ok')
  if (onControl) onControl.addEventListener('click', options.on_ok)

  return {
    hidden,
    show: () => {
      modalElement.style.display = 'block'
      if (options.on_show) options.on_show()
    },
  }
}