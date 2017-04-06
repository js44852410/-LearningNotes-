<style lang='sass'>
  @import '../../scss/variable';
  .agreement-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 2;
    height: 100%;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template lang='jade'>
  .wrapper.agreement-wrapper(transition='slide')
    iframe(
      src='/website/agreement?role=buyer',
      frameborder='0'
    )
</template>
