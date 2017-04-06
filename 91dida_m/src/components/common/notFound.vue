<style lang='sass'>
  .not-found {
    text-align: center;
    padding: 50px;
    font-size: 14px;
    $color: #fff;
    .icon-not-found {
      display: block;
      margin: 0 auto;
      width: 54px;
      height: 54px;
      border-radius: 200px;
      margin-bottom: 10px;
      background-color: #d1d2d4;
    }
    .border {
      display: inline-block;
      width: 25px;
      height: 30px;
      margin-top: 10px;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid $color;
    }
    .line {
      margin-top: 5px;
      display: inline-block;
      width: 15px;
      height: 16px;
      border-top: 1px solid $color;
      border-bottom: 1px solid $color;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        border-top: 1px solid $color;
      }
    }
  }
</style>

<template lang='jade'>
  .not-found
    .icon-not-found
      span.border
        em.line
    slot
</template>

<script lang='babel'>

</script>
