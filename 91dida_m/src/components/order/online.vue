<style lang='sass'>
  .online-wrapper {
    .footer-settle {
      bottom: 0;
    }
  }
</style>

<template lang='jade'>
  .wrapper.online-wrapper
    item(
      v-for='orderShop in orderList',
      :order-shop='orderShop',
      @shop-checked-event='changeShopChecked(orderShop)',
      :status='1'
    )
    payment(
      @order-list-event='initAttrChecked',
      :count='count',
      :order-list='orderList'
    )
</template>

<script lang='babel'>
  import Item from './item.vue';
  import Payment from './payment.vue';
  import * as apis from '../../store/apis';
  export default {
    components: {
      Item,
      Payment
    },
    data() {
      return {
        orderList: [],
        count: 1,
      }
    },
    methods: {
      changeShopChecked(shop){
        Vue.set(shop, 'checked', !shop.checked)
      },
      initAttrChecked(checked) {
        let totalPrice = 0;
        const number = checked? this.count: 0;
        this.orderList.map(item => {
          Vue.set(item, 'checked', checked);
          if (checked) {
            totalPrice += self.Number(item.grand_total);
          }
        });
        this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
      },
      getOnlineOrder() {
        const body = { ...apis.GET_ON_LINE_ORDER };
        body.order_ids = self.JSON.parse(self.sessionStorage.getItem('onlineIds'));
        self.DD.loading();
        self.DD.get(body, (data) => {
          if (data.result === 'success') {
            this.orderList = data.info.items;
            this.count = this.orderList.length;
          } else {
            self.toast(data.info.errmsg);
          }
        })
      }
    },
    created() {
      this.getOnlineOrder();
    }
  }
</script>
