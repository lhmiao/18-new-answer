<template>
  <div class="login">
    <div class="login-form">
      <p class="title">星辰工作室答题系统</p>
      <label>
        <img src="../assets/username.png" alt="">
        <input type="text" v-model="username" placeholder="username">
      </label>
      <label>
        <img src="../assets/password.png" alt="">
        <input type="password" v-model="password" placeholder="password">
      </label>
      <p class="tip">※请使用信息门户账号密码登录</p>
      <button @click="login">登录</button>
    </div>
    <footer>
      <p>星辰工作室</p>
      <p>copyright©starstudio 2018</p>
    </footer>
  </div>
</template>

<script>
import User from '../apis/User.js'

const user = new User()

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.$message('请输入账号')
        return
      } else if (this.password === '') {
        this.$message('请输入密码')
        return
      }
      const data = {
        studentId: this.username,
        password: this.password
      }
      user.login(data)
        .then(res => {
          const studentInfo = {
            studentId: res.studentId,
            name: res.name
          }
          localStorage.studentInfo = JSON.stringify(studentInfo)
          this.$router.push('/answer')
          this.$message('登录成功')
        })
        .catch(err => {
          this.$message('登录失败，系统提示：' + (err.errMsg || err))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 550px;
  padding: 45px;
  box-shadow: 7px 8px 39px 4px rgba(50, 51, 52, 0.66);
  background: rgba(249, 249, 249, 0.831);
  border-radius: 20px;
  transform: translate(-50%, -50%);

  .title {
    margin-bottom: 25px;
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
    color: #535353;
  }

  label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 28px;
    width: 100%;
    height: 50px;
    background: white;
    box-shadow: inset 1px 2px 0px 0px rgba(6, 0, 1, 0.24);

    img {
      flex: 0 0 auto;
      margin: 0 20px;
    }

    input {
      flex: 1 1 auto;
      font-size: 24px;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }

  .tip {
    line-height: 21px;
    color: #535353;
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    height: 54px;
    font-size: 30px;
    font-weight: bold;
    color: white;
    background: #003a8c;
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
    }
  }
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(243, 243, 243, 0.639);
  box-shadow: inset 9px 10px 18px 0px rgba(6, 0, 1, 0.27);

  p {
    margin: 10px 0;
    text-align: center;
    font-size: 18px;
    color: #3c3c3c;
  }
}
</style>
