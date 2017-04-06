<style lang='sass'>
  @import '../../scss/variable';
  .pay-result-wrapper {
    min-height: 100%;
    .explain {
      position: absolute;
      right: 0;
      top: 0;
      padding: 10px;
      line-height: 1;
    }
    .result {
      .fail {
        top: 25px;
        border-color: #E60012 #E60012 transparent transparent;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.pay-result-wrapper
    router-link.explain(:to='{name: "payHelp"}')
      em.i i
      span 支付说明
    span.result
      em.mouth.fail
    p 非常抱歉! 您的订单支付失败!
    router-link.btn-submit(
      :to='{name: "pay"}'
    ) 重新支付
    tips
</template>

<script lang='babel'>
  import tips from '../user/tips.vue';
  export default {
    components: {
      tips,
    }
  }
</script>
