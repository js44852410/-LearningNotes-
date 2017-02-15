<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .home-new-products {
    article {
      background-color: #fff;
      font-size: 0;
    }
    .item {
      width: 33.33%;
      text-align: center;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      padding: 10px;
      @include borderBottom;
      @include borderRight;
    }
    .topic {
      display: inline-block;
      width: 80%;
      padding-top: 80%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      margin-bottom: 10px;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name {
      overflow : hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .price {
      font-size: 14px;
      text-align: left;
      color: $priceColor;
    }
    .new-product-ad {
      padding: 0 10px;
      overflow: hidden;
      a {
        background-repeat: no-repeat;
        background-position: 50% 50%;
        -webkit-background-size: cover;
        background-size: cover;
        float: left;
        &:first-child {
          width: 50%;
          padding-top: 42%;
          margin-right: 2%;
        }
        &:nth-child(2),
        &:nth-child(3) {
          width: 48%;
          padding-top: 20%;
        }
        &:nth-child(2) {
          margin-bottom: 2%;
        }
      }
    }
  }
</style>

<template lang='jade'>
  section.home-new-products(v-if='newProducts.length > 0')
    home-title(
      :hex-color='"#f467e5"',
      :text='"新品推荐"',
      :url='{name: "goodsList", query: {type: "new", order: "sell_num"}}',
      :icon='"icon-home-recommend"',
      :category='category'
    )
    article.new-product-ad(v-if='newProductsAd.length > 0')
      a(
        v-for='item in newProductsAd',
        :href='item.link',
        :title='item.title',
        :style='{backgroundImage: "url(" + item.file + ")"}',
        @click='monitor(item.product_name)'
      )
    article
      a.item(
        v-for='item in newProducts',
        @click='goPage({name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}},item.product_name)',
        :data-id='item.store_product_entity_id',
      )
        span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
        h4.name(v-text='item.product_name')
        p.price(v-text='"¥" + item.store_product_final_price')
</template>

<script lang='babel'>
  import HomeTitle from './title.vue';
  export default {
    components: {
      HomeTitle,
    },
    data() {
      return {
        newProducts: [],
        newProductsAd: [],
        category:''
      }
    },
    methods:{
      goPage(router, label){
        this.$router.push(router);
        _czc.push(['_trackEvent', this.category, 'click', `${label}`]);
      },
      monitor(label){
        _czc.push(['_trackEvent', `${this.category}广告`, 'click', `${label}`]);
      },
    },
    created() {
      this.newProducts = self.home.new_pro || [];
      this.newProductsAd = self.home.new_pro_adv || [];
      this.category = `${self.home.deviceType}_首页新品推荐`
    }
  }
</script>
