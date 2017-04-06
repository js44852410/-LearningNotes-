<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .shop-wrapper {
    .search {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      @include borderBottom;
      .input {
        width: 100%;
        background-color: #e5e5e5;
        border-radius: 3px;
        padding: 5px 10px;
      }
    }
    .tabs {
      background-color: #fff;
      font-size: 0;
      border-bottom: 5px solid $bgColor;
      a {
        display: inline-block;
        width: 25%;
        padding: 10px 0;
        text-align: center;
        position: relative;
        span {
          margin-top: 5px;
          display: block;
          font-size: 14px;
        }
      }
      .active {
        color: $mainColor;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background-color: $mainColor;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.shop-wrapper
    form.search(
      @submit.prevent='search'
    )
      input.input(
        type="search",
        v-model='keywords',
        placeholder='搜索店铺内商品',
      )
    shop-header(:store-id = 'storeId')
    .tabs
      router-link(:to='{name: "shopHome"}' replace)
        em.icon-hot.icon-32
        span 热销商品
      router-link(:to='{name: "shopAll"}' replace)
        em.icon-shop-all.icon-32
        span 全部商品
      router-link(:to='{name: "shopNew"}' replace)
        em.icon-shop-new.icon-32
        span 新品推荐
      router-link(:to='{name: "shopSpecial"}' replace)
        em.icon-shop-special.icon-32
        span 特价商品
    router-view
    shop-footer(:store-id='storeId')
</template>

<script lang='babel'>
  import ShopHeader from './header.vue';
  import ShopFooter from './footer.vue';
  export default {
    components: {
      ShopHeader,
      ShopFooter,
    },
    data() {
      return {
        keywords: '',
        storeId: '',
      }
    },
    methods: {
      search() {
        this.$router.push({
          name: 'goodsList',
          query: {
            store_id: this.$route.params.shopId,
            keywords: this.keywords
          }
        })
      }
    },
    created() {
      this.storeId = this.$route.params.shopId;
    },
  }
</script>
