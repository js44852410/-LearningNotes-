<style lang='sass'>
  @import '../../scss/variable';
  .urgent {
    line-height: 1.5;
    font-size: 12px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 20px;
    text-align: center;
    color: $grayColor;
    a {
      color: $linkColor;
    }
  }
</style>

<template lang='jade'>
  .urgent
    p 如您需要加急处理，请联系邸达平台
    p
      span 客服：
      a(
        href="tel: 4000798798"
      ) 4000-798-798
</template>

<script lang='babel'>

</script>
