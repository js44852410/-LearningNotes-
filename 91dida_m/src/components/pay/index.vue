<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .pay-wrapper {
    padding: 10px;
    .price {
      background-color: #fff;
      border-radius: 3px;
      overflow: hidden;
      padding: 10px;
      margin-bottom: 10px;
      strong {
        float: right;
        color: $priceColor;
      }
    }
    .pay-method {
      background-color: #fff;
      border-radius: 3px;
      .title {
        padding: 10px;
      }
      .item {
        display: block;
        padding: 10px;
        position: relative;
        @include borderTop;
      }
      em:first-child {
        $size: (72px/2);
        float: left;
        width: $size;
        height: $size;
        margin-right: 10px;
      }
      h5 {
        font-size: 14px;
      }
      h5, p {
        overflow: hidden;
      }
      p {
        color: $darkenGrayColor;
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.pay-wrapper
    .price
      span 订单金额:
      strong(v-text='grand_total | formatAmount')
    .pay-method
      h5.title 在线支付方式
      a.item(
        v-for='pay in payment_list',
        @click='goPayment(pay.payment_code)'
      )
        div(v-if='pay.id == 4')
          em.icon-pay-yb
          h5 易宝支付
          p 支持易宝支付
          em.icon-more
        div(v-if='pay.id == 1')
          em.icon-pay-alipay
          h5 支付宝
          p 推荐使用支付宝账号的用户
          em.icon-more
        div(v-if='pay.id == 2')
          em.icon-pay-wechat
          h5 微信支付
          p 建议微信5.0版本以上的用户使用
          em.icon-more
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        grand_total: '0.00',
        payment_list: [],
        payment_number: 0,

        order_ids: []
      }
    },
    methods: {
      getOrderPayment() {
        this.order_ids = self.JSON.parse(self.sessionStorage.getItem('orderIds'));
        const body = {
          api: 'sales_order',
          method: 'order_payment',
          order_ids: this.order_ids
        }
        self.DD.loading();
        self.DD.get(body, (data) => {
          if (data.result === 'success') {
            this.grand_total = data.info.grand_total;
            this.payment_list = data.info.payment_list;
            this.payment_number = data.info.payment_number;
          } else {
            self.toast(data.info.errmsg, {
              callback: function() {
                if (data.code === '0x9011') {
                  this.$router.replace({
                    name: 'myOrderAll'
                  });
                }
              }.bind(this)
            });
          }
        })
      },
      goPayment(code) {
        self.DD.loading();
        if (code === 'yeepay') {
          const body = {
            order_ids: this.order_ids,
            api: 'payment',
            method: 'get_yeepay_no',
          }
          self.DD.post(body, (data) => {
            if (data.result === 'success') {
              self.location.href = data.info.payurl;
            } else {
              self.toast(data.info.errmsg);
            }
          });
        } else {
          let url = '/pay/wxpay';
          if (code === 'alipay') {
            url = '/pay/alipay';
          }

          this.$http.post(url, {
              order_ids: this.order_ids,
            }).then(response => response.json())
              .then(data => {
                if (data.result === 'success') {
                  if (code === 'alipay') {
                    self.location.href = data.info.payurl;
                  } else {
                    self.location.href = '/website/wxpay';
                  }
                }
              });
        }
      }
    },
    created() {
      this.getOrderPayment();
    }
  }
</script>
