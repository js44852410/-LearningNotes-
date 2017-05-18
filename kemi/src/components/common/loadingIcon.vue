<template>
  <div class="loading" :style="loadingBG">
    <image src="/src/img/loading_face.png" class="loading_face"></image>
  </div>
</template>
<style>
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    background-position: center;
    background-repeat: no-repeat;
  }

  .loading_face {
    width: 88px;
    height: 88px;
  }
</style>
<script>
  export default {
    data() {
      return {
        bgList: [
          "/src/img/loading_bg1.png",
          "/src/img/loading_bg2.png",
          "/src/img/loading_bg3.png",
        ],
        index: 0,
        interval: null,
      };
    },

    computed: {
      loadingBG() {
        return `background-image:url(${this.bgList[this.index]})`;
      },
    },

    mounted() {
      this.interval = setInterval(() => {
        this.index++;
        this.index %= this.bgList.length;
      }, 400);
    },

    beforeDestory() {
      clearInterval(this.interval);
    },
  };
</script>