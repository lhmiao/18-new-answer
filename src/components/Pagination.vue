<template>
  <div class="pagination">
    <div class="pre" @click="pre">
      <img src="../assets/arrow_left.png" alt="">
    </div>
    <div class="page-index">
      <div class="page-index-container" :style="{ marginLeft: getMarginLeft + 'px', justifyContent: getJustifyContent}">
        <div class="page-index-number"
          :class="item === currentPage ? 'current-page' : ''"
          v-for="item in pageCount"
          :key="item"
          @click="currentChange(item)">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="next" @click="next">
      <img src="../assets/arrow_right.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageCount'],
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    getMarginLeft () {
      if (this.currentPage <= 3) {
        return 0
      } else if (this.currentPage >= this.pageCount - 2) {
        return (this.pageCount - 5) * -60
      } else {
        return (this.currentPage - 3) * -60
      }
    },
    getJustifyContent () {
      if (this.pageCount <= 5) {
        return 'center'
      } else {
        return ''
      }
    }
  },
  methods: {
    pre () {
      if (this.currentPage === 1) {
        return
      }
      this.currentPage -= 1
      this.currentChange(this.currentPage)
    },
    currentChange (pageNumber) {
      if (this.currentPage === pageNumber) {
        this.$message('到头啦！别点啦！')
        return
      }
      this.currentPage = pageNumber
      this.$emit('current-change', pageNumber)
    },
    next () {
      if (this.currentPage === this.pageCount) {
        return
      }
      this.currentPage += 1
      this.currentChange(this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 386px;
  user-select: none;

  .pre {
    margin-right: 10px;
    font-size: 0;
    cursor: pointer;
  }

  .next {
    margin-left: 10px;
    font-size: 0;
    cursor: pointer;
  }

  .page-index {
    width: 300px;
    overflow: hidden;
  }

  .page-index-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .page-index-number {
      flex: 0 0 auto;
      width: 30px;
      height: 30px;
      margin: 0 13px;
      line-height: 30px;
      text-align: center;
      font-size: 20px;
      color: white;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }

    .current-page {
      color: #c7c6c6;
      background: white;
    }
  }
}
</style>
