<style lang='sass'>

</style>

<template lang='jade'>
  .footer-settle
    a.icon-big-check(
      :class='{"active": count === payCount}',
      @click='checkAll'
    )
      em.icon-cart-check
      span 全选
    em 总计:
    span.price {{payPrice | formatAmount}}
    a.btn-settle(
      @click='pay'
    ) 合并付款
</template>

<script lang='babel'>
  export default {
    props: ['count', 'orderList'],
    computed: {
      ...Vuex.mapGetters(['payPrice', 'payCount'])
    },
    methods: {
      checkAll() {
        if (this.payCount !== this.count) {
          this.$emit('order-list-event', true);
        } else {
          this.$emit('order-list-event', false);
        }
      },
      pay() {
        const orderIds = [];
        this.orderList.map((item) => {
          if (item.checked) {
            orderIds.push(item.entity_id);
          }
        });
        if (orderIds.length < 1) {
          self.toast('请先选择要付款的订单哟~');
          return;
        }
        self.location.href = `/pay?order_ids=${orderIds.join(',')}`;
      },
    },
    created() {
      this.$store.dispatch('setOrderPay');
    }
  }
</script>
