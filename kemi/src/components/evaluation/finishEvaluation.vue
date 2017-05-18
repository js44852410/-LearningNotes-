<template>
  <div class="wrapper">
    <div class="close_container">
      <closeBtn></closeBtn>
    </div>
    <div class="mes_container">
      <text class="finish_mes">测评已经完成，正在紧张计算中</text>
      <text class="wait_mes">请稍等...</text>
    </div>
    <loadingIcon></loadingIcon>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #a0d5ee;
    position: relative;
  }

  .close_container {
    height: 350px;
  }

  .finish_mes {
    width: 750px;
    font-size: 34px;
    color: #FFF;
    text-align: center;
  }

  .wait_mes {
    width: 750px;
    font-size: 34px;
    color: #FFF;
    text-align: center;
    margin-top: 20px;
  }
</style>
<script>
  import closeBtn from './close.vue';
  import loadingIcon from '../common/loadingIcon.vue';
  export default {
    data() {
      return {};
    },

    components: {
      closeBtn,
      loadingIcon,
    },
  };
</script>