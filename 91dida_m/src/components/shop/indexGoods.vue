<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .shop-goods-wrapper {
    margin-bottom: 60px;
    ul {
      background-color: #fff;
    }
    .item {
      position: relative;
      min-height: 90px;
      @include borderBottom($left: 105px);
      &:last-child {
        &:after {
          display: none;
        }
      }
      &.goods-disabled {
        opacity: 0.5;
      }
    }
    .goods {
      display: block;
      overflow: hidden;
      padding: 10px $margin 0 105px;
    }
    .topic {
      width: 70px;
      height: 70px;
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      margin: auto;
      -webkit-background-size: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    .goods-name {
      overflow: hidden;
      margin: 0 5px 5px 0;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sub-title {
      margin-bottom: 5px;
      color: $priceColor;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price-wrapper {
      position: absolute;
      bottom: 10px;
      left: 105px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .price {
      color: $priceColor;
      font-size: 16px;
      margin-right: 10px;
      min-width: 85px;
    }
    .stock {
      font-size: 12px;
      color: $darkenGrayColor;
    }
    .add-carts {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      padding: 10px;
      em {
        display: block;
      }
    }
    .goods-stock {
      color: $priceColor;
      font-size: 12px;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .activity-tags {
      margin-bottom: 25px;
    }
  }
</style>

<template lang='jade'>
  .shop-goods-wrapper
    ul(v-if='pageCount > 0')
      li.item(
        v-for='item in items',
        :class='{"goods-disabled": item.store_product_stock_qty == 0}'
      )
        router-link.goods(
          :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
          :data-id='item.store_product_entity_id',
          :class='{"carts-activity-tags": item.activity_tags && item.activity_tags.length > 0}'
        )
          span.topic(
            :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
          )
          h4.goods-name(v-text='item.product_name')
          p.sub-title(v-text='item.store_product_sub_title')
          .activity-tags(v-if='item.activity_tags.length > 0')
            span(
              v-for='tag in item.activity_tags',
              v-text='tag.sell_tag'
            )
          .price-wrapper
            span.price(v-text='"¥" + item.store_product_final_price')
            span.stock(v-text='"库存: " + item.store_product_stock_qty')
        a.add-carts(
          v-if='item.store_product_stock_qty != 0',
          @click='addToCarts(item)'
        )
          em.icon-add-carts
        span.goods-stock(v-else) 补货中
    not-found(v-else)
      p 未查询到相关数据!
</template>

<script lang='babel'>
  import NotFound from '../common/notFound.vue';
  export default {
    components: {
      NotFound,
    },
    data() {
      return {
        keywords: '',
        items: [],
        totalRows: 0,
        storeId: 0,
        type: 'hot',
        from: '',

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    watch: {
      '$route': function() {
        this.type = this.$route.meta.type;
        this.scrollEl = null;
        this.loadingEl = null;
        this.page = 0;
        self.document.body.scrollTop = 0;
        self.document.removeEventListener('scroll', this.next);
        this.getGoodsData();
      }
    },
    methods: {
      ...Vuex.mapActions(['addToCarts']),
      getGoodsData(options = {}) {
        options.page = this.page + 1;
        if (this.keywords) {
          options.keywords = this.keywords;
        }
        self.DD.assign(options, {
          type: this.type,
          store_id: this.storeId,
          callback: function (data) {
            this.scrollToggle = true;
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.items = data.items;
              this.loadingEl = null;
              self.document.body.scrollTop = 0;
              self.document.removeEventListener('scroll', this.next);
            } else {
              this.items = this.items.concat(data.items);
            }

            this.totalRows = data.total_rows;
            this.page = data.page;
            this.pageCount = data.pageCount;
            if (!this.scrollEl) {
              this.scrollEl = self.document.querySelector('.shop-goods-wrapper');
            }
            if (this.loadingEl && this.loadingEl.parentElement) {
              this.scrollEl.removeChild(this.loadingEl);
            }

            this.loadingEl = self.document.createElement('div');
            this.loadingEl.className = 'next-loading';
            this.loadingEl.innerHTML = '努力加载中...';

            if (this.page != this.pageCount) {
              self.document.addEventListener('scroll', this.next);
            } else {
              self.document.removeEventListener('scroll', this.next);
            }

            this.count = this.items.length;
          }.bind(this)
        })
        this.$store.dispatch('getGoodsList', options);
      },
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.loadingEl.style.display = 'block';
            this.getGoodsData();
          }
        }
      },
    },
    created() {
      this.type = this.$route.meta.type;
      this.storeId = this.$route.params.shopId;
    },
    mounted() {
      this.getGoodsData();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
