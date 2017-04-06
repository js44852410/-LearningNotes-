<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .goods-info-wrapper {
    padding-bottom: 50px;
    .goods-info {
      position: relative;
      padding: 10px $margin;
      margin-bottom: 10px;
      background-color: #fff;
      @include borderTop;
    }
    .name {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .price {
      overflow: hidden;
      margin-bottom: 5px;
      .final {
        float: left;
        font-size: 18px;
        color: $priceColor;
      }
      .market {
        font-size: 12px;
        float: right;
        color: $darkenGrayColor;
        margin-top: 3px;
      }
    }
    .stock,
    .ladder {
      font-size: 12px;
      color: $darkenGrayColor;
    }
    .ladder {
      margin-bottom: 5px;
    }
    .promotion {
      position: relative;
      background-color: #fff;
      padding: 10px $margin;
      overflow: hidden;
      font-size: 12px;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .title {
        float: left;
      }
      .con {
        margin-left: 40px;
        color: $darkenGrayColor;
      }
      .pro-tag {
        position: relative;
        color: $priceColor;
        left: 0;
        padding: 2px 4px;
        line-height: 1;
        margin: 0 5px 0 0;
        font-size: 8px;
        border-radius: 2px;
        @include border($priceColor, 4px);
      }
      .tag-des,
      .pro-tag {
        vertical-align: middle;
      }
      p {
        margin-bottom: 3px;
      }
    }
    .activity {
      position: relative;
      background-color: #fff;
      overflow: hidden;
      font-size: 12px;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .title {
        padding: 10px $margin;
        position: relative;
        @include borderBottom;
      }
      .con {
        padding: 10px $margin;
        overflow: hidden;
        .act-tag {
          float: left;
          color: #fff;
          padding: 1px 5px;
          border-radius: 3px;
          overflow: hidden;
          background-color: $priceColor;
        }
        .act-des {
          overflow: hidden;
          padding-left: 10px;
          color: $darkenGrayColor;
        }
      }
    }
    .specifications {
      position: relative;
      background-color: #fff;
      overflow: hidden;
      font-size: 12px;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .title {
        display: block;
        padding: 10px $margin;
        position: relative;
        overflow: hidden;
        @include borderBottom;
        .des {
          float: right;
          margin-right: 15px;
        }
      }
      .con {
        padding: 10px $margin;
        overflow: hidden;
        color: $darkenGrayColor;
        .item {
          overflow: hidden;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        strong {
          float: left;
          margin-right: 5px;
        }
        .label {
          overflow: hidden;
        }
      }
    }
    .shop {
      position: relative;
      background-color: #fff;
      overflow: hidden;
      font-size: 12px;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .title {
        padding: 10px $margin;
        position: relative;
        @include borderBottom;
      }
      .con {
        padding: 10px $margin 10px;
        overflow: hidden;
        color: $darkenGrayColor;
        strong {
          float: left;
          margin-right: 5px;
        }
        .label {
          overflow: hidden;
        }
      }
      .item {
        margin-bottom: 5px;
        overflow: hidden;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .footer-options {
    z-index: 2;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: #fafafa;
    @include borderTop;
    & > {
      a {
        position: absolute;
        top: 1px;
        height: 100%;
        text-align: center;
        font-size: 12px;
      }
    }
    .online {
      width: 20%;
      left: 0;
      padding-top: 10px;
    }
    .collection {
      width: 13%;
      left: 20%;
      padding-top: 10px;
    }
    .view-shop {
      width: 13%;
      left: 33%;
      padding-top: 10px;
    }
    .btn-add-cart {
      width: 27%;
      right: 27%;
      color: #fff;
      background-color: $btnColor;
    }
    .btn-right-now {
      width: 27%;
      right: 0;
      color: #fff;
      background-color: $mainColor;
    }
    a[class^='btn-'] {
      font-size: 14px;
      line-height: 50px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.goods-info-wrapper
    swipe(
      v-if='toggle',
      :page='"goodsInfo"',
      :height='"100%"',
      :images='info.photo_gallery'
    )
    aside.goods-info
      h4.name(v-text='info.product_name')
      p.price
        span.final(v-text='info.store_product_final_price_range')
        span.market(v-text='"零售指导价: ¥" + info.store_product_market_price')
      p.ladder(
        v-if='info.store_product_ladder_desc',
        v-text='info.store_product_ladder_desc'
      )
      p.stock(v-text='"库存: " + info.store_product_stock_qty')
    aside.promotion(v-if='info.activity_tags.length > 0')
      span.title 促销:
      .con
        p(v-for='item in info.activity_tags')
          em.pro-tag(v-text='item.sell_tag')
          span.tag-des(v-text='item.tips')
    aside.activity(v-if='info.store_product_sub_title')
      h5.title(v-text='info.store_product_sub_title')
      .con
        em.act-tag 政策
        p.act-des(v-text='info.store_product_sub_description')
    aside.specifications(v-if='info.attribute.length > 0')
      router-link.title(
        v-if='info.content_url',
        :to='{name: "goodsSpec"}'
      )
        span 规格参数
        span.des 详细介绍
        em.icon-more
      a.title(v-else)
        span 规格参数
      ul.con
        li.item(v-for='item in info.attribute')
          strong(v-text='item.option_label + ": "')
          .label(v-text='item.attribute_label')
    aside.shop
      h5.title(v-text='info.store.store_name')
      ul.con
        li.item
          strong 总销量:
          .label(v-text='info.store.sales_num')
        li.item
          strong 经营分类:
          .label(v-text='info.store.operation_category')
        li.item
          strong 店铺地址:
          .label(v-text='info.store.company_street')
    site-cart
    footer.footer-options
      a.online(:href='"tel: " + info.store.company_phone')
        em.icon-service-online.icon-30
        p 联系卖家
      collection(
        :product-id='goodsId',
        :is-collection='info.is_collection',
        @collection-event='collectionHandler'
      )
      router-link.view-shop(:to='{name: "shop", params: {shopId: shopId}}')
        em.icon-view-shop
        p 店铺
      a.btn-add-cart(@click='addToCarts(info)') 加入购物车
      a.btn-right-now(@click='buy(info.store_product_stock_qty)') 立即购买
    buy-now(
      v-if='buyNowToggle',
      :stock='info.store_product_stock_qty',
      :price='info.store_product_final_price',
      :start-price='info.store.starting_price',
      @toggle-event='toggleHandler'
    )
    router-view
</template>

<script>
  import Swipe from '../common/swipe.vue';
  import Collection from './collection.vue';
  import SiteCart from '../carts/siteCart.vue';
  import BuyNow from './buyNow.vue';
  import * as apis from '../../store/apis';
  export default {
    components: {
      Swipe,
      SiteCart,
      Collection,
      BuyNow,
    },
    data() {
      return {
        info: {
          attribute: [],
          activity_tags: [],
          store: {},
          company: {},
          store_product_final_price: '',
          store_product_market_price: '',
          store_product_stock_qty: ''
        },
        shopId: 0,
        goodsId: 0,
        toggle: false,
        buyNowToggle: false,
      }
    },
    methods: {
      initPage() {
        const body = { ...apis.GET_PRODUCT_INFO };
        body.store_id = this.shopId;
        body.store_product_id = this.goodsId;
        self.DD.loading();
        self.DD.get(body, (data) => {
          if (data.result === 'success') {
            Vue.set(this.$data, 'info', data.info);
            this.toggle = true;
          } else {
            self.toast(data.info.errmsg);
          }
        });
      },
      buy(stock) {
        if (+stock > 0) {
          this.buyNowToggle = true;
        } else {
          self.toast('您来晚了，没有库存啦~');
        }
      },
      addToCarts(vm) {
        this.$store.dispatch('addToCarts', vm);
      },
      toggleHandler() {
        this.buyNowToggle = !this.buyNowToggle;
      },
      collectionHandler(type) {
        this.info.is_collection = type;
      }
    },
    created() {
      this.shopId= this.$route.params.shopId;
      this.goodsId= this.$route.params.goodsId;
      this.initPage();
    }
  }
</script>
