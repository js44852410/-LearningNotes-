<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .cancel-toast-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 6;
    background-color: #fff;
    text-align: center;
    padding: 20px 0 70px;
    a {
      display: inline-block;
      &:first-child {
        margin-right: 20px;
      }
    }
    p {
      margin-top: 5px;
    }
    .icon-wrapper {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 50px;
      padding-top: 13px;
      box-sizing: border-box;
      border-radius: 3px;
      font-size: 0;
      @include border($borderColor: #999);
    }
    .btn-cancel {
      background-color: $mainColor;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 15px;
      width: 100%;
      color: #fff;
      font-size: 16px;
    }
  }
</style>

<template lang='jade'>
  div
    .mask(@click='activeCollectionGoods')
    .cancel-toast-wrapper
      a(@click='toggleCollectionGoods({ id: product.store_product_entity_id })')
        span.icon-wrapper.cancel-collection
          em.icon-shop-cancel-collect2
        p 取消收藏
      router-link(:to='{ name: "shop", params: { shopId: product.store_product_store_id } }')
        span.icon-wrapper.view-shop
          em.icon-goto-shop
        p 进入店铺
      a.btn-cancel(@click='activeCollectionGoods') 取消
</template>

<script lang='babel'>
  export default {
    computed: {
      ...Vuex.mapGetters({
        product: 'activeGoodsCollection',
      }),
    },
    methods: {
      ...Vuex.mapActions(['activeCollectionGoods', 'toggleCollectionGoods']),
    }
  }
</script>
