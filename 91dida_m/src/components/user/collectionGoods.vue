<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .collection-goods-item {
    .item {
      position: relative;
      background-color: #fff;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
    }
    .shop-info {
      position: relative;
      display: block;
      padding: 10px $margin;
      em,span {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .goods-info {
      position: relative;
    }
    .goods {
      display: block;
      padding: 10px $margin;
      overflow: hidden;
      position: relative;
      @include borderTop;
    }
    .topic {
      float: left;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name {
      @include ellipsis;
    }
    .sub-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $priceColor;
    }
    .price {
      position: absolute;
      left: 90px;
      bottom: 10px;
      margin-left: $margin;
      font-size: 16px;
    }
    .add-carts,
    .options {
      position: absolute;
      bottom: 0;
      z-index: 1;
      padding: 10px;
    }
    .options {
      right: 0;
      height: 30px;
      line-height: 25px;
      em {
        $size: 8px;
        display: inline-block;
        width: $size;
        height: $size;
        border-radius: 30px;
        margin-right: 3px;
        background-color: #e5e5e5;
      }
    }
    .add-carts {
      right: 55px;
    }
  }
</style>

<template lang='jade'>
  div
    not-found(v-if='items.length === 0')
      p 您还未收藏过商品哟!
    ul.collection-goods-item(v-if='items.length > 0')
      li.item(v-for='(item, index) in items')
        a.shop-info
          em.icon-shop
          span(v-text='item.store_name')
        .goods-info
          router-link.goods(
            :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
            :data-id='item.store_product_entity_id'
          )
            span.topic(
              :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
            )
            h3.name(v-text='item.product_name')
            p.sub-title(v-text='item.store_product_sub_title')
            p.price(v-text='"¥" + item.store_product_final_price')
          a.add-carts(
            @click='addToCarts(item)'
          )
            em.icon-add-carts
          a.options(
            @click='activeCollectionGoods({ vm: item, index: index })'
          )
            em
            em
            em
    site-cart(v-if='items.length > 0')
    cancel-collection-toast(
      v-if='toastToggle',
    )
</template>

<script lang='babel'>
  import SiteCart from '../carts/siteCart.vue';
  import NotFound from '../common/notFound.vue';
  import CancelCollectionToast from './cancelCollectionToast.vue';
  export default {
    components: {
      SiteCart,
      NotFound,
      CancelCollectionToast,
    },
    data() {
      return {
        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    computed: {
      ...Vuex.mapGetters({
        items: 'goodsCollectionList',
        toastToggle: 'goodsCollectionToastToggle',
      }),
    },
    methods: {
      ...Vuex.mapActions(['addToCarts', 'getCollctionGoods', 'activeCollectionGoods']),
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.loadingEl.style.display = 'block';
            this.getCollctionGoods(this);
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.collection-wrapper');
      this.getCollctionGoods(this);
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
