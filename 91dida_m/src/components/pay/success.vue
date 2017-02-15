<style lang='sass'>
  @import '../../scss/variable';
  .pay-result-wrapper {
    padding-top: 60px;
    text-align: center;
    min-height: 100%;
    .result {
      $borderSize: 3px;
      display: inline-block;
      position: relative;
      width: 50px;
      height: 50px;
      border: $borderSize solid $mainColor;
      border-radius: 100px;
      margin-bottom: 20px;
      &:before,
      &:after {
        content: '';
        width: 5px;
        height: 5px;
        background-color: $mainColor;
        border-radius: 100px;
        position: absolute;
        top: 15px;
      }
      &:before {
        left: 13px;
      }
      &:after {
        right: 13px;
      }
      .mouth {
        content: '';
        position: absolute;
        top: 13px;
        left: 12px;
        width: 20px;
        height: 20px;
        border-style: solid;
        border-width: 3px;
        border-color: transparent transparent #E60012 #E60012;
        border-radius: 50px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
    .btn-submit {
      line-height: 45px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.pay-result-wrapper
    span.result
      em.mouth
    p 恭喜您! 订单支付成功!
    router-link.btn-submit(
      :to='{name: "myOrder", params: {status: 2}}'
    ) 查看订单
    tips
</template>

<script lang='babel'>
  import tips from '../user/tips.vue';
  export default {
    components: {
      tips,
    },
    created() {
      self.sessionStorage.clear();
    }
  }
</script>
