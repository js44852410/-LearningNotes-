<style lang='sass'>
  .goods-spec-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #fff;
  }
</style>

<template lang='jade'>
  transition(name='slide')
    iframe.goods-spec-wrapper(
      frameborder='0',
      :src='this.$parent.info.content_url'
    )
</template>
