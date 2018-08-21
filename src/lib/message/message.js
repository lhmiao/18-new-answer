import './message.scss'

function message (msg) {
  let p = createMessage(msg)
  let timeID = setTimeout(() => {
    p.classList.add('disappear')
  }, 3000)
  p.addEventListener('mouseenter', stopDisappear)
  p.addEventListener('mouseleave', reStartDisappear)
  p.addEventListener('animationend', destroySelf)

  function stopDisappear () {
    clearTimeout(timeID)
  }

  function reStartDisappear () {
    timeID = setTimeout(() => {
      this.classList.add('disappear')
    }, 3000)
  }

  function destroySelf (e) {
    if (e.animationName === 'disappear') {
      document.body.removeChild(this)
      this.removeEventListener('mouseenter', stopDisappear)
      this.removeEventListener('mouseleave', reStartDisappear)
      this.removeEventListener('animationend', destroySelf)
    }
  }
}

function createMessage (msg) {
  let p = document.createElement('p')
  p.innerText = msg
  p.className = 'message'
  p.classList.add('appear')
  document.body.appendChild(p)
  return p
}

export default {
  install (Vue) {
    Vue.prototype.$message = message
  }
}
