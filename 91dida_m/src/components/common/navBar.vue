<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .nav-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 0;
    text-align: center;
    color: $grayColor;
    height: 50px;
    width: 100%;
    padding-top: 6px;
    box-sizing: border-box;
    background-color: #fafafa;
    z-index: 3;
    @include borderTop;
    a {
      width: 25%;
      vertical-align: bottom;
      display: inline-block;
      position: relative;
      &.active {
        color: $mainColor;
      }
    }
    span {
      display: block;
      font-size: 12px;
    }
    em {
      $size: (46px/2);
      width: $size;
      height: $size;
      margin-bottom: 3px;
    }
    .num {
      position: absolute;
      background-color: $priceColor;
      color: #fff;
      min-width: 13px;
      height: 13px;
      padding: 1px 2px 2px;
      border-radius: 50px;
      text-align: center;
      font-size: 12px;
      top: -3px;
      left: 50%;
      pointer-events: none;
    }
  }
</style>

<template lang='jade'>
  nav.nav-wrapper
    router-link(:to='{name:"home"}')
      em.icon-home
      span 首页
    router-link(:to='{name:"myOrderAll"}')
      em.icon-order
      span 我的订单
    router-link(:to='{name:"cart"}')
      em.icon-carts
      span 购物车
      label.num(v-if='cartsCount > 0') {{cartsCount | maxNum}}
    router-link(:to='{name:"user"}')
      em.icon-user
      span 个人中心
</template>

<script lang='babel'>
  export default {
    computed: {
      ...Vuex.mapGetters(['cartsCount']),
    },
    mounted() {
      /**
      * 第一次打开页面时购物车数量是由PHP变量返回，所以第一次需要把这个数量传给 vuex
      * 只是在第一次打开页面需要执行一次就OK啦
      */
      if (!self.home.first_cart_num) {
        self.home.first_cart_num = true;
        this.$store.dispatch('setCartsCount', self.home.cart_num);
      }
    }
  }
</script>
