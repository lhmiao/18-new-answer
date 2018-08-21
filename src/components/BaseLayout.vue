<template>
  <div class="base-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.base-layout {
  min-height: calc(100vh - 2px);
  padding: 1px;
  background: url(../assets/background_img.jpg) no-repeat;
  background-size: cover;
}
</style>
