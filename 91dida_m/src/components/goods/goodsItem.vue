<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .product-item-wrapper {
    font-size: 0;
    .item {
      width: 49%;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 2%;
      background-color: #fff;
      overflow: hidden;
      &:nth-child(1) {
        margin-top: 0;
      }
      &:nth-child(2) {
        margin-top: 0;
      }
      &:nth-child(odd) {
        margin-right: 1%;
      }
      &:nth-child(even) {
        margin-left: 1%;
      }
      a {
        display: block;
      }
    }
    .topic {
      display: block;
      width: 80%;
      padding-top: 80%;
      margin: 0 auto;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      margin-bottom: 10px;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name {
      font-size: 14px;
      margin-bottom: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      color: $priceColor;
      font-size: 14px;
    }
    .add-carts {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      padding: 10px;
    }
    .goods-stock {
      color: $priceColor;
      font-size: 12px;
      position: absolute;
      right: 10px;
      bottom: 12px;
    }
  }
</style>

<template lang='jade'>
  ul.product-item-wrapper
    li.item(v-for='item in goodsData')
      a.product(
        @click='goGoodsInfo(item)',
        :data-id='item.store_product_entity_id'
      )
        span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
        h4.name(v-text='item.product_name')
        .activity-tags(v-if='item.activity_tags.length > 0')
          span(
            v-for='(tag, index) in item.activity_tags',
            v-text='tag.sell_tag'
          )
        .activity-tags(v-if='item.activity_tags.length === 0 && (type === "special" || type === "hot")')
        p.price {{item.store_product_final_price | formatAmount}}
      a.add-carts(
        v-if='item.store_product_stock_qty != 0',
        @click='addToCarts(item)'
      )
        em.icon-add-carts
      span.goods-stock(v-else) 补货中
</template>
<script lang='babel'>
  export default {
    props: ['goodsData', 'type', 'category'],
    data() {
      return {
        deviceType: self.home.deviceType,
      }
    },
    methods: {
      ...Vuex.mapActions(['addToCarts']),
      goGoodsInfo(item) {
        const shopId = item.store_product_store_id;
        const goodsId = item.store_product_entity_id;
        _czc.push(['_trackEvent', `${this.category}`, 'click', `${item.product_name}`]);
        if (this.deviceType === 'wap') {
          this.$router.push({
            name: "goodsInfo",
            params: {
              shopId,
              goodsId,
            }
          });
        } else {
          DIDAJSBridge.callHandler('GOODS_DETAIL', {
            tagName: 'goods_detail',
            goodsId,
            storeId: shopId,
          });
        }
      },
      addToCarts(item) {
        _czc.push(['_trackEvent', `${this.category}_加入购物车`, 'click', `${item.product_name}`]);
        if (this.deviceType === 'wap') {
          this.$store.dispatch('addToCarts', item);
        } else {
          DIDAJSBridge.callHandler('ADD_TO_CART', {
            tagName: 'add_to_cart',
            shopId: item.store_product_store_id,
            productId: item.store_product_entity_id
          });
        }
      }
    },
  }
</script>