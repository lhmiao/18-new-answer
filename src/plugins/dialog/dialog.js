import './dialog.scss'

function dialog (title, question) {
  let dialogContainer = creatDialogContainer(title, question)
  let dialogBox = dialogContainer.querySelector('.dialog-box')
  dialogBox.classList.add('dialog-appear')
  dialogBox.addEventListener('animationend', destroyDialog)
  document.body.appendChild(dialogContainer)
  return new Promise((resolve, reject) => {
    dialogContainer.onclick = function (e) {
      const cancelClassList = ['dialog-container', 'dialog-box-close', 'dialog-cancel']
      const targetClass = e.target.className
      if (targetClass === 'dialog-confirm') {
        resolve('confirm')
      } else if (cancelClassList.includes(targetClass)) {
        reject(new Error('cancel'))
      } else {
        return
      }
      dialogBox.classList.add('dialog-disappear')
    }
  })

  function destroyDialog (e) {
    if (e.animationName === 'dialog-disappear') {
      document.body.removeChild(dialogContainer)
      this.onclick = null
      dialogBox.removeEventListener('animationend', destroyDialog)
    }
  }
}

function creatDialogContainer (title, question) {
  let container = document.createElement('div')
  container.className = 'dialog-container'
  container.innerHTML = `
    <div class="dialog-box">
      <header>
        <p class="dialog-title">${title}</p>
        <span class="dialog-box-close">x</span>
      </header>
      <main>
        <p class="dialog-question">${question}</p>
      </main>
      <footer>
        <button class="dialog-confirm">确定</button>
        <button class="dialog-cancel">取消</button>
      </footer>
    </div>
  `
  return container
}

export default {
  install (Vue, option) {
    Vue.prototype.$dialog = dialog
  }
}
