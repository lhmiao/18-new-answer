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
      user.login()
        .then()
      this.$router.replace('/answer')
      this.$message('登录成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 685px;
  margin: 200px auto 0 auto;
  padding: 60px;
  box-shadow: 7px 8px 39px 4px rgba(50, 51, 52, 0.66);
  background: #f9f9f9d4;
  border-radius: 20px;

  .title {
    margin-bottom: 35px;
    font-size: 30px;
    font-weight: bold;
    color: #535353;
  }

  label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;
    height: 60px;
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
    font-size: 16px;
    color: #535353;
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    height: 60px;
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
  background: #f3f3f3a3;
  box-shadow: inset 9px 10px 18px 0px rgba(6, 0, 1, 0.27);

  p {
    margin: 20px 0;
    text-align: center;
    font-size: 18px;
    color: #3c3c3c;
  }
}
</style>
