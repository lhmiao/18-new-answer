<template>
  <div class="loading">
    <div class="loading-circle"></div>
    <div class="loading-message">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading-circle {
    width: 1em;
    height: 1em;
    border: 0.1em solid #cbc9c9;
    border-top-color: #38f;
    border-radius: 50%;
    animation: loading 0.8s linear infinite;
  }

  .loading-message {
    margin-top: 0.6em;
    font-size: 0.4em;
    color: #333;
  }
}
</style>
