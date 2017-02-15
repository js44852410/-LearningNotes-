<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .user-wrapper {
    .header {
      color: #fff;
      background-color: $mainColor;
      padding: 3*$margin $margin $margin;
      $size: 44px;
      .icon {
        width: $size;
        height: $size;
        position: absolute;
        top: 0;
        box-sizing: border-box;
        text-align: center;
        padding-top: ($size - 20px)/2;
      }
      .set {
        right: $size;
      }
      .message {
        right: 0;
        .has {
          position: absolute;
          top: 12px;
          left: 50%;
          margin-left: 5px;
          $size: 8px;
          width: $size;
          height: $size;
          background-color: #fff;
          border-radius: 3*$size;
        }
      }
    }
    .user-info {
      display: inline-block;
      .head-image {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 150px;
        border: 3px solid #9ed7a2;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        -webkit-background-size: cover;
        background-size: cover;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .collect {
      height: 60px;
      font-size: 0;
      position: relative;
      background-color: #fff;
      margin-bottom: 10px;
      @include borderBottom;
      a {
        line-height: 60px;
        display: inline-block;
        width: 50%;
        text-align: center;
      }
      .product-collect {
        position: relative;
        @include borderRight($top: 10px, $bottom: 10px);
      }
      em {
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        font-size: 14px;
      }
    }
    .order {
      background-color: #fff;
      position: relative;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .view-all-order {
        .icon-my-order {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .num {
        $size: 12px;
        position: absolute;
        left: 50%;
        top: 5px;
        margin-left: 5px;
        padding: 0 2px;
        min-width: $size;
        height: $size + 4px;
        line-height: $size + 3px;
        border-radius: 3*$size;
        color: $priceColor;
        background-color: #fff;
        @include border($borderColor: $priceColor, $bdrz: 100px);
      }
    }
    .status {
      position: relative;
      background-color: #fff;
      font-size: 0;
      text-align: center;
      @include borderBottom;
      a {
        display: inline-block;
        padding: 10px 0;
        font-size: 12px;
        width: 20%;
        position: relative;
      }
      p {
        margin-top: 3px;
      }
    }
    .item {
      background-color: #fff;
      position: relative;
      padding: 10px 10px 10px 40px;
      overflow: hidden;
      display: block;
      @include borderTop;
      @include borderBottom;
      .right {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        padding-right: 15px;
        font-size: 12px;
        height: 15px;
        color: $darkenGrayColor;
        span {
          display: inline-block;
          margin-top: 2px;
          margin-right: 10px;
        }
      }
      em {
        &:first-child {
          position: absolute;
          left: 10px;
          top: 50%;
          margin-top: -10px;
        }
      }
      span {
        vertical-align: middle;
      }
    }
    .coupon,
    .wallet {
      .right {
        color: $mainColor;
      }
    }
    .wallet {
      .tips {
        clear: both;
        color: $darkenGrayColor;
        font-size: 12px;
      }
    }
    .coupon {
      &:before,
      &:after {
        display: none;
      }
    }
    .address {
      margin-bottom: 10px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.user-wrapper
    header.header
      router-link.user-info(:to='{name: "userInfo"}')
        span.head-image(:style='{backgroundImage: "url(" + info.buyer_avatar + ")"}')
        span.name(v-text='info.company_name')
      router-link.icon.set(:to='{name: "set"}')
        em.icon-set.icon-40
      router-link.icon.message(:to='{name: "imList"}')
        em.icon-message.icon-40
        label.has(v-if='info.im_unread_num')
    .collect
      router-link.product-collect(:to='{name: "myCollectionGoods"}')
        em.icon-product-collect.icon-40
        span 商品收藏
      router-link.buyer-collect(:to='{name: "myCollectionShop"}')
        em.icon-buyer-collect.icon-40
        span 店铺收藏
    .order
      router-link.view-all-order.item(:to='{name: "myOrder", params: {status: 0}}')
        em.icon-my-order.icon-40
        span 我的订单
        .right
          span 全部订单
          em.icon-more
      .status
        router-link.pending-payment(:to='{name: "myOrder", params: {status: 1}}')
          em.icon-pending-payment.icon-40
          p 待付款
          label.num(
            v-if='info.pay_order_num > 0',
            v-text='info.pay_order_num'
          )
        router-link.delivered(:to='{name: "myOrder", params: {status: 2}}')
          em.icon-delivered.icon-40
          p 待发货
          label.num(
            v-if='info.ship_order_num > 0',
            v-text='info.ship_order_num'
          )
        router-link.inbound(:to='{name: "myOrder", params: {status: 3}}')
          em.icon-inbound.icon-40
          p 待收货
          label.num(
            v-if='info.receipt_order_num > 0',
            v-text='info.receipt_order_num'
          )
        router-link.completed(:to='{name: "myOrder", params: {status: 4}}')
          em.icon-completed.icon-40
          p 已完成
        router-link.return(:to='{name: "myOrder", params: {status: 5}}')
          em.icon-return.icon-40
          p 退货
    router-link.wallet.item(:to='{name: "myAmount"}')
      em.icon-wallet.icon-40
      span 我的零钱
      .right
        span {{info.amount | formatAmount}}
        em.icon-more
      p.tips 可在提交订单时用于抵扣现金
    router-link.coupon.item(:to='{name: "myCoupon", params: {type: 1}}')
      em.icon-user-coupon.icon-40
      span 优惠券
      .right
        span(v-text='info.coupon_num + "张优惠券"')
        em.icon-more
    router-link.address.item(:to='{name: "addressList"}')
      em.icon-address.icon-40
      span 收货地址
      em.icon-more
    a.service.item(href='tel: 4000798798')
      em.icon-service.icon-40
      span 客服热线
      .right
        span 4000-798-798
        em.icon-more
    nav-bar
</template>

<script lang='babel'>
  import NavBar from '../common/navBar.vue';
  export default {
    components: {
      NavBar,
    },
    data() {
      return {
        body: {
          api: 'customer',
          method: 'get_buyer_personal_info',
        },
        info: {
          coupon_num: 0,
          buyer_avatar: '',
        }
      }
    },
    methods: {
      initPage() {
        self.DD.get(this.body, (data) => {
          if (data.result === 'success') {
            Vue.set(this.$data, 'info', data.info);
            self.DD.userInfo = JSON.parse(JSON.stringify(data.info));
          } else {
            self.toast(data.info.errmsg);
          }
        });
      }
    },
    created() {
      self.DD.loading();
      this.initPage();
    }
  }
</script>
