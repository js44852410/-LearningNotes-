<style lang='sass'>
  .upload-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;
    .file {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      opacity: 0.02;
    }
    .text {
      text-align: center;
      color: #fff;
      /*width: (51px/2);
      height: (44px/2);*/
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      margin-top: (-44px/4) + 10px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
    }
  }
</style>

<template lang='jade'>
  .upload-wrapper
    input.file(
      @change='upload($event)',
      type="file"
    )
    em.icon-camera
    p.text(
      v-text='text'
    )
    img(
      v-if='imgSrc',
      :src='imgSrc'
    )
</template>

<script lang='babel'>
  export default {
    props: ['text', 'url', 'image'],
    data() {
      return {
        imgSrc: '',
      }
    },
    methods: {
      upload($event) {
        self.DD.upload($event.target, (result) => {
          this.imgSrc = result.image;
          this.$emit('upload-event', result.media, this.imgSrc);
        });
      }
    },
    mounted() {
      if (this.image) {
        this.imgSrc = this.image;
      }
    }
  }
</script>
