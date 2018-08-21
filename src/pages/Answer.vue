<template>
  <div class="answer">
    <div class="answer-left">
      <div class="user-info">
        <div class="user-photo">
          <img src="../assets/userphoto.png" alt="">
        </div>
        <div class="user-name">
          {{ username }}
        </div>
        <div class="user-id">
          {{ userID }}
        </div>
      </div>
      <ul @click="changeType">
        <li data-value="product">产品</li>
        <li data-value="design">设计</li>
        <li class="active" data-value="frontEnd">前端</li>
        <li data-value="backEnd">后台</li>
        <li data-value="Android">安卓</li>
        <li data-value="devops">DevOps</li>
      </ul>
    </div>
    <div class="answer-right">
      <div class="item" v-for="item in items" :key="item.question">
        <p class="question">{{ item.question }}</p>
        <textarea placeholder="请将答案填入此处，或者上传附件"></textarea>
        <div class="commit">
          <label class="upload" value="当前未上传附件">
            上传附件
            <input type="file">
          </label>
          <button class="save" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '杨家铖',
      userID: 2016123456789,
      items: [
        {
          question: '设计-简述调整效果-黑白，和调整效果-阈值的区别'
        },
        {
          question: '产品-你对共享经济的未来发展的看法，现有的共享经济哪个做的比较好，如果你去做共享经济方面的策划，你会想要做一个什么样子的共享经济产品'
        }
      ]
    }
  },
  methods: {
    changeType (e) {
      console.log(e.target.dataset.value)
    },
    save () {
      this.$message('保存啦')
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 1480px;
  min-height: 950px;
  margin: 70px auto 55px auto;
  box-shadow: 0px 11px 39px 4px rgba(50, 51, 52, 0.28);

  .answer-left {
    flex: 0 0 310px;
    background: #4b4b4bd6;
    text-align: center;
    color: #f4f4f4;

    .user-info {
      margin: 90px 0;

      .user-photo {
        width: 103px;
        margin: 0 auto 20px auto;
      }

      .user-name {
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: bold;
      }

      .user-id {
        font-size: 16px;
      }
    }

    ul {
      list-style: none;

      li {
        height: 65px;
        line-height: 65px;
        font-size: 30px;
        cursor: pointer;
      }

      .active {
        color: #4b4b4bd6;
        background: #f4f4f4;
      }
    }
  }

  .answer-right {
    flex: 1 1 auto;
    padding: 35px;
    background: #f9f9f9d4;

    .item {
      margin-bottom: 15px;
      padding: 35px;
      font-size: 18px;
      background: #fefefee8;
      border-radius: 10px;

      .question {
        margin-bottom: 20px;
        font-size: 18px;
      }

      textarea {
        width: calc(100% - 42px);
        height: 220px;
        margin-bottom: 20px;
        padding: 20px;
        font-size: 18px;
        border: 1px solid #a4a4a4;
        border-radius: 10px;
        resize: none;

        &:focus {
          outline: none;
        }
      }

      label {
        position: relative;
        display: inline-block;
        width: 135px;
        height: 33px;
        margin-right: 10px;
        vertical-align: top;
        line-height: 35px;
        text-align: center;
        color: #096dd9;
        border: 1px solid #096dd9;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          color: white;
          background: #096dd9;
        }

        &::before {
          content: attr(value);
          position: absolute;
          top: -70px;
          left: 50%;
          z-index: 1000;
          visibility: hidden;
          min-width: 120px;
          padding: 10px 15px;
          font-size: 16px;
          line-height: 20px;
          color: #f4f4f4;
          background: #4b4b4bd6;
          border-radius: 5px;
          transform: translateX(-50%);
          transition: all 0.5s;
          opacity: 0;
        }

        &:hover::before {
          visibility: visible;
          top: -50px;
          opacity: 1;
        }

        input {
          width: 0;
          height: 0;
          overflow: hidden;
        }
      }

      button {
        width: 135px;
        height: 35px;
        vertical-align: top;
        font-size: 18px;
        color: #52c41a;
        background: transparent;
        border: 1px solid #52c41a;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          color: white;
          background: #52c41a;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
