<template lang='jade'>
  section.home-products(v-if='hotProducts.length > 0')
    home-title(
      :hex-color='"#fc5671"',
      :text='"热销商品"',
      :url='{name: "goodsList", query: {type: "hot", order: "sell_num"}}',
      :icon='"icon-home-hot"',
      :category='category'
    )
    goods-item(
      :goods-data="hotProducts",
      :type='"hot"',
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
        hotProducts: [],
        category:''
      }
    },
    mounted() {
      this.hotProducts = self.home.hot || [];
      this.category = `${self.home.deviceType}_首页热销商品`;
    },
  }
</script>
