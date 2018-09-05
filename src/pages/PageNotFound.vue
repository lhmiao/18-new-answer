<template>
  <div class="page-not-found">
    <div>
      <h1>404</h1>
      <p>page not Found</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.page-not-found {
  height: calc( 100vh - 2px );
  padding: 1px;
  background: url(../assets/background_img.jpg) no-repeat;
  background-size: cover;
  text-align: center;

  div {
    position: relative;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: rgba(249, 249, 249, 0.831);
    transform: translate(-50%, -50%);
    border-radius: 10px;

    h1 {
      font-size: 200px;
      color: rgba(42, 40, 40, 0.788);
    }

    p {
      font-size: 20px;
      color: #333;
    }
  }
}
</style>
