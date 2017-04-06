<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .carts-shop-item {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    @include borderTop;
    @include borderBottom;
    $titleHeight: 40px;
    .shop-name {
      position: relative;
      height: $titleHeight;
      .name {
        display: block;
        padding: 10px $margin 10px 40px;
      }
      span,
      label {
        display: inline-block;
        vertical-align: bottom;
      }
      span {
        margin-right: 5px;
        max-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      label {
        color: $priceColor;
        font-size: 12px;
      }
    }
    .goods-item {
      position: relative;
      z-index: 1;
      padding-top: 1px;
      @include borderTop($left: 40px);
      &.goods-disabled {
        opacity: 0.5;
        .icon-big-check {
          pointer-events: none;
        }
      }
    }
    .touch {
      position: relative;
      z-index: 1;
      background-color: #fff;
      height: 125px;
    }
    .btn-del {
      position: absolute;
      right: 0;
      top: 1px;
      background-color: $priceColor;
      color: #fff;
      width: 50px;
      height: 125px;
      line-height: 125px;
      text-align: center;
    }
    .goods {
      display: block;
      overflow: hidden;
      min-height: 69px;
      padding: 10px $margin 25px 115px;
      position: relative;
      z-index: 1;
      background-color: inherit;
      span, h4, p {
        pointer-events: none;
      }
    }
    .topic {
      width: 70px;
      height: 70px;
      position: absolute;
      left: 40px;
      top: 50%;
      margin-top: -35px;
      -webkit-background-size: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    .goods-name {
      overflow: hidden;
      margin: 0 5px 5px 0;
      @include ellipsis;
    }
    .sub-title {
      margin-bottom: 5px;
      color: $priceColor;
      @include ellipsis;
    }
    .price {
      float: right;
      font-size: 16px;
    }
    .goods-stock {
      color: $priceColor;
      font-size: 12px;
      position: absolute;
      right: 10px;
      bottom: 12px;
      z-index: 1;
    }
  }
  .cart-option {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    font-size: 12px;
    width: 90px;
    z-index: 1;
    background-color: inherit;
    a {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
    }
    .sub-cart {
      left: 0;
      padding-left: 10px;
      em {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .add-cart {
      right: 0;
      padding-right: 10px;
      em {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    em {
      display: block;
      position: relative;
      width: 20px;
      height: 20px;
      line-height: 19px;
      overflow: hidden;
      text-align: center;
      border-radius: 3px;
      background-color: #fff;
      border: 1px solid #666;
    }
    .input {
      position: absolute;
      right: 29px;
      left: 29px;
      height: 20px;
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
      input {
        width: 100%;
        height: 20px;
        text-align: center;
      }
    }
  }
</style>

<template lang='jade'>
  section.carts-shop-item
    h3.shop-name
      router-link.name(
        :data-id='shopData.store_id',
        :price='shopData.starting_price',
        :to='{name: "shop", params: {shopId: shopData.store_id}}'
      )
        span(v-text='shopData.store_name')
        label(v-text='shopData.starting_price_tips')
      a.icon-big-check(
        :data-price='shopData.grand_total',
        :class='{"active": shopData.store_is_selected === "1"}',
        @click='optionsCart({el: $event.target, type: 2, vm: shopData.goods})'
      )
        em.icon-cart-check
      em.icon-more
    .goods-item(
      v-for='item in shopData.goods',
      :class='{"goods-disabled": item.store_product_status != "on_sale"}'
    )
      .touch
        router-link.goods(
          :to='{name: "goodsInfo", params: {shopId: shopData.store_id, goodsId: item.store_product_id}}',
          :data-id='item.store_product_id',
          :class='{"carts-activity-tags": item.activity_tags && item.activity_tags.length > 0}'
        )
          span.topic(:style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}')
          span.price(v-text='"¥" + item.base_price')
          h4.goods-name(v-text='item.product_name')
          p.sub-title(v-text='item.store_product_sub_title')
          .activity-tags(v-if='item.activity_tags && item.activity_tags.length > 0')
            span(
              v-for='tag in item.activity_tags',
              v-text='tag.sell_tag'
            )
        p.cart-option(
          :data-stock='item.store_product_stock_qty',
          v-if='item.store_product_status == "on_sale"'
        )
          a.sub-cart(@click='optionsCart({el: $event.target, type: 5, vm: item})')
            em -
          span.input
            input(
              :value='item.qty',
              @change='optionsCart({el: $event.target, type: 6, vm: item})',
              type='tel'
            )
          a.add-cart(@click='optionsCart({el: $event.target, type: 4, vm: item})')
            em +
        span.goods-stock(v-else) 已下架
        a.icon-big-check(
          :data-price='item.sub_total',
          :class='{"active": item.is_selected === "1"}',
          @click='optionsCart({el: $event.target, type: 3, vm: item})'
        )
          em.icon-cart-check
      a.btn-del(@click.stop='optionsCart({el: $event.target, type: 7, vm: item})') 删除
</template>

<script lang='babel'>
  export default {
    props: ['shopData'],
    methods: {
      ...Vuex.mapActions(['optionsCart']),
    }
  }
</script>
