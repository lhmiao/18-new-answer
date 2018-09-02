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
        <li data-value="frontEnd">前端</li>
        <li data-value="backEnd">后台</li>
        <li data-value="android">安卓</li>
        <li data-value="devOps">DevOps</li>
      </ul>
    </div>
    <div class="answer-right">
      <loading :message="loadingMsg" v-if="loading"></loading>
      <div class="item" v-for="(item, index) in items" :key="item.question" v-else>
        <p class="question">{{item.id}}. {{ item.toward }}-{{ item.question }} </p>
        <div class="question-img">
          <img :src="item.questionImages">
        </div>
        <textarea :placeholder="getPlaceHolder(index)" v-model="texts[index]"></textarea>
        <div class="commit">
          <label class="upload" :for="item.id" :value="fileNames[index] || '当前尚未上传附件'">
            上传附件
          </label>
          <input type="file" :id="item.id" @change="getFile(index, $event)">
          <button class="save" @click="save(index)">保存</button>
        </div>
      </div>
      <pagination :pageCount="pageCount" @current-change="handleCurrentChange"></pagination>
    </div>
  </div>
</template>

<script>
import User from '@/apis/User'
import towardCode from '@/constants/towardCode'
import pagination from '@/components/Pagination'
import loading from '@/components/Loading'

const user = new User()

export default {
  data () {
    return {
      loading: true,
      loadingMsg: '请选择方向',
      username: '杨家铖',
      userID: 2016123456789,
      toward: '',
      items: [
        {
          id: 1,
          toward: '设计',
          question: '简述调整效果-黑白，和调整效果-阈值的区别',
          answer: null
        },
        {
          id: 2,
          toward: '产品',
          question: '你对共享经济的未来发展的看法，现有的共享经济哪个做的比较好，如果你去做共享经济方面的策划，你会想要做一个什么样子的共享经济产品',
          answer: {
            type: 'text',
            answer: '这是答案'
          }
        }
      ],
      texts: [],
      files: [],
      fileNames: [],
      activeType: null,
      pageCount: 1
    }
  },
  methods: {
    changeType (e) {
      let target = e.target
      let type = target.dataset.value
      this.toward = towardCode[type]
      if (this.activeType !== null) {
        this.activeType.classList.toggle('active')
      }
      this.activeType = target
      this.activeType.classList.toggle('active')
      this.getTimuList(this.toward)
    },
    getPlaceHolder (index) {
      const answer = this.items[index].answer
      if (answer === null) {
        return '请将答案填入此处，或者上传附件（二选一，都做则将附件做为最终结果）'
      } else {
        if (answer.type === 'text') {
          return '该题已完成（提交的是文字），可再次提交覆盖之前的结果'
        } else {
          return '该题已完成（提交的是附件），可再次提交覆盖之前的结果'
        }
      }
    },
    getFile (index, e) {
      let file = e.target.files[0]
      this.files[index] = file
      let newFileNames = [...this.fileNames]
      newFileNames[index] = file.name
      this.fileNames = newFileNames
    },
    save (index) {
      let text = this.texts[index]
      let file = this.files[index]
      if (!(text || file)) {
        this.$message('请先输入答案或上传附件')
        return
      }
      let answer = file || text
      let type = typeof answer === 'string' ? 'text' : 'file'
      let id = this.items[index].id
      const data = {
        id,
        answer,
        type
      }
      if (this.items[index].answer !== null) {
        this.$dialog('该题已保存', '这道题你已经保存过啦，再保存会覆盖之前的结果！是否继续？')
          .then(res => {
            return user.submitAnswer(data)
          })
          .then(res => {
            this.$message('保存成功')
          })
          .catch(err => {
            if (err.errCode === 0) {
              this.$message('取消本次保存')
            } else {
              this.$message('错误，系统提示：' + err.errMsg)
            }
          })
      } else {
        user.submitAnswer(data)
          .then(res => {
            this.$message('保存成功')
          })
          .catch(err => {
            this.$message('错误，系统提示：' + err.errMsg)
          })
      }
    },
    handleCurrentChange (pageNumber) {
      this.getTimuList(this.toward, pageNumber)
    },
    getTimuList (toward, page = 1) {
      this.loading = true
      this.loadingMsg = '加载中'
      const data = {
        toward,
        page
      }
      user.getTimuList(data)
        .then(res => {
          this.loading = false
          this.pageCount = res.pageSum
          if (res.list.length === 0) {
            this.$message('题目暂时还没出好，以下是测试数据')
            return
          }
          this.items = res.list.sort((pre, next) => {
            return pre.id - next.id
          })
          this.texts = []
          this.files = []
          this.fileNames = []
        })
        .catch(err => {
          if (err.errCode === 110) {
            this.$message('请先登录')
            this.$router.replace('/login')
          } else {
            this.loadingMsg = '加载失败，请刷新重试'
            this.$message('错误，系统提示：' + err.errMsg)
          }
        })
    }
  },
  components: {
    pagination, loading
  },
  mounted () {
    const studentInfo = JSON.parse(localStorage.studentInfo)
    this.username = studentInfo.name
    this.userID = studentInfo.studentId
  }
}
</script>

<style lang="scss" scoped>
.answer {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 78%;
  min-width: 1100px;
  min-height: 1070px;
  margin: 70px auto 55px auto;
  box-shadow: 0px 11px 39px 4px rgba(50, 51, 52, 0.28);

  .answer-left {
    flex: 0 1 310px;
    background: rgba(75, 75, 75, 0.839);
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
        color: rgba(75, 75, 75, 0.839);
        background: #f4f4f4;
      }
    }
  }

  .answer-right {
    flex: 1 2 auto;
    padding: 35px;
    background: rgba(249, 249, 249, 0.831);

    .loading {
      height: 922px;
      margin-bottom: 20px;
      font-size: 40px;
      border-radius: 10px;
      background: rgba(254, 254, 254, 0.91);
    }

    .item {
      margin-bottom: 15px;
      padding: 35px;
      font-size: 18px;
      background: rgba(254, 254, 254, 0.91);
      border-radius: 10px;

      .question {
        margin-bottom: 20px;
        font-size: 18px;
      }

      .question-img {
        margin-bottom: 20px;
        text-align: center;
        font-size: 0;
      }

      textarea {
        width: calc(100% - 42px);
        height: 220px;
        margin-bottom: 20px;
        padding: 20px;
        font-size: 18px;
        font-family: 'MicrosoftYaHeiUI';
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
        width: 133px;
        height: 33px;
        margin-right: 10px;
        line-height: 33px;
        vertical-align: top;
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
          top: -55px;
          left: 50%;
          z-index: 1000;
          visibility: hidden;
          min-width: 120px;
          padding: 10px 15px;
          font-size: 16px;
          line-height: 20px;
          color: #f4f4f4;
          white-space: nowrap;
          background: rgba(75, 75, 75, 0.839);
          border-radius: 5px;
          transform: translateX(-50%);
          transition: all 0.3s;
          opacity: 0;
        }

        &::after {
          content: '';
          position: absolute;
          top: -15px;
          left: 10px;
          z-index: 1000;
          visibility: hidden;
          border: 5px solid transparent;
          border-top: 10px solid rgba(75, 75, 75, 0.839);
          transition: all 0.3s;
          opacity: 0;
        }

        &:hover::before,
        &:hover::after {
          visibility: visible;
          opacity: 1;
        }
      }

      input {
          display: none;
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

    .pagination {
      margin: auto;
    }
  }
}
</style>
