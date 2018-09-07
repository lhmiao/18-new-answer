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
      color: transparent;
      background: linear-gradient(90deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6) no-repeat;
      background-size: 80% 100%;
      -webkit-background-clip: text;
      animation: animateTextBackground 2s ease-in-out infinite alternate;
    }

    @keyframes animateTextBackground {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 100% 0;
      }
    }

    p {
      font-size: 30px;
      color: #555;
    }
  }
}
</style>
