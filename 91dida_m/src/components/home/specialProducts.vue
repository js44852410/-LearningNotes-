<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .home-products {

  }
</style>

<template lang='jade'>
  section.home-products(v-if='specialProducts.length > 0')
    home-title(
      :hex-color='"#5dd166"',
      :text='"特价商品"',
      :url='{name: "goodsList", query: {type: "special_offer", order: "sell_num"}}',
      :icon='"icon-home-dis"',
      :category='category'
    )
    goods-item(
      :goods-data="specialProducts",
      :type='"special"',
      :category='category'
    )
</template>

<script lang='babel'>
  import HomeTitle from './title.vue';
  import GoodsItem from '../goods/goodsItem.vue';
  export default {
    components: {
      HomeTitle,
      GoodsItem,
    },
    data() {
      return {
        specialProducts: [],
        category:''
      }
    },
    mounted() {
      this.specialProducts = self.home.special_offer || [];
      this.category = `${self.home.deviceType}_首页特价商品`;
    }
  }
</script>
