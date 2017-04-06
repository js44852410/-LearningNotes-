<style lang='sass'>
  @import '../../scss/variable';
  .site-view-carts {
    padding: 8px;
    border: 1px solid $mainColor;
    position: fixed;
    right: 10px;
    bottom: 90px;
    z-index: 1;
    border-radius: 60px;
    background-color: #fff;
    em {
      width: 23px;
      height: 23px;
      margin: 0 auto;
      display: block;
    }
    .num {
      position: absolute;
      background-color: #fd4d3e;
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
  router-link.site-view-carts.active(:to='{name: "cart"}')
    em.icon-carts
    label.num {{cartsCount | maxNum}}
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
