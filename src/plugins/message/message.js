import './message.scss'

function message (msg) {
  let p = createMessage(msg)
  let timeID = setTimeout(() => {
    p.classList.add('message-disappear')
  }, 3000)
  p.addEventListener('mouseenter', stopDisappear)
  p.addEventListener('mouseleave', reStartDisappear)
  // animation事件只能通过addEventListener添加，DOM 0 级处理无效
  p.addEventListener('animationend', destroyMessage)

  function stopDisappear () {
    clearTimeout(timeID)
  }

  function reStartDisappear () {
    timeID = setTimeout(() => {
      this.classList.add('message-disappear')
    }, 3000)
  }

  function destroyMessage (e) {
    if (e.animationName === 'message-disappear') {
      document.body.removeChild(this)
      this.removeEventListener('mouseenter', stopDisappear)
      this.removeEventListener('mouseleave', reStartDisappear)
      this.removeEventListener('animationend', destroyMessage)
    }
  }
}

function createMessage (msg) {
  let p = document.createElement('p')
  p.innerHTML = msg
  p.className = 'message'
  p.classList.add('message-appear')
  document.body.appendChild(p)
  return p
}

export default {
  install (Vue) {
    Vue.prototype.$message = message
  }
}
