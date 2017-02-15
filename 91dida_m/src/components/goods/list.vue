<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .goods-list {
    background-color: #fff;
    position: relative;
    padding-top: 95px;
    .item {
      position: relative;
    }
    .goods {
      display: block;
      padding: 10px;
      overflow: hidden;
      position: relative;
      min-height: 100px;
      @include borderTop($left: 100px);
      h4, p {
        padding-left: 90px;
      }
    }
    .topic {
      position: absolute;
      left: 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 80px;
      height: 80px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name {
      @include ellipsis;
    }
    .shop-name {
      text-indent: -5px;
      margin-bottom: 5px;
    }
    .shop-name,
    .sub-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sub-title {
      color: lighten($priceColor, 10%);
      margin-bottom: 5px;
    }
    .price-wrapper {
      margin-left: 90px;
      overflow: hidden;
    }
    .price {
      font-size: 16px;
      color: $priceColor;
      margin-bottom: 5px;
      margin-right: 5px;
      float: left;
    }
    .activity-tags {
      float: left;
      width: auto;
      margin-top: 3px;
      position: static;
    }
    .stock {
      overflow: hidden;
      font-size: 12px;
      color: $darkenGrayColor;
    }
    .add-carts {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      padding: 10px;
    }
  }
  .goods-list-wrapper {
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
    .sort {
      position: fixed;
      left: 0;
      top: 50px;
      width: 100%;
      z-index: 2;
      overflow: hidden;
      background-color: #fff;
      height: 40px;
      border-bottom: 5px solid #e5e5e5;
      text-align: center;
      span {
        vertical-align: middle;
        pointer-events: none;
      }
      a {
        float: left;
        width: 33%;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
      }
      .price {
        width: 34%;
        @include borderLeft($top: 10px, $bottom: 10px);
        @include borderRight($top: 10px, $bottom: 10px);
      }
    }
    .arrow {
      @include arrow($direction: 'bottom', $borderColor: #666)
      pointer-events: none;
      right: 0;
      left: 50%;
      top: -5px;
      margin-left: 20px;
    }
    .asc {
      .arrow {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 5px;
      }
    }
    .hot-keys {
      position: fixed;
      left: 0;
      top: 50px;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      z-index: 2;
      overflow: auto;
      .title {
        padding: 10px;
        font-size: inherit;
        color: $darkenGrayColor;
        position: relative;
        @include borderBottom;
      }
      .item {
        display: block;
        position: relative;
        padding: 10px;
        font-size: 12px;
        @include borderBottom($left: $margin);
      }
    }
    .goods-stock {
      color: $priceColor;
      font-size: 12px;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.goods-list-wrapper
    form.search(
      @submit.prevent='getGoodsData({keywords: keywords}, true)'
    )
      input.input(
        type="search",
        v-model='keywords',
        placeholder='搜索商品',
        @focus='getHotKey()'
      )
    .sort
      a(
        :class='{asc: numAsc}',
        @click='getGoodsData({order: "sell_num"}, true)'
      )
        span 销量
        em.arrow
      a.price(
        :class='{asc: priceAsc}',
        @click='getGoodsData({order: "final_price"}, true)'
      )
        span 价格
        em.arrow
      router-link(
        :to='{name: "goodsFilter"}'
      )
        span 筛选
    .hot-keys(
      v-if='hotToggle',
      @click='hotToggle = false'
    )
      h4.title 热搜关键词
      a.item(
        v-for='item in hotKeys',
        v-text='item.tag_label',
        @click='hotKeyHandler(item.tag_label)'
      )
    ul.goods-list(v-if='totalRows > 0')
      li.item(v-for='item in items')
        router-link.goods(
          :to='{name: "goodsInfo", params: {shopId: item.store_product_store_id, goodsId: item.store_product_entity_id}}',
          :data-id='item.store_product_entity_id'
        )
          span.topic(
            :style='{backgroundImage: "url(" + item.default_media_gallery_thumb + ")"}'
          )
          h4.shop-name(v-text='"【" + item.store_name + "】"')
          h4.name(v-text='item.product_name')
          p.sub-title(v-text='item.store_product_sub_title')
          .price-wrapper
            span.price(v-text='"¥" + item.store_product_final_price')
            .activity-tags(v-if='item.activity_tags.length > 0')
              span(
                v-for='(tag, index) in item.activity_tags',
                v-text='tag.sell_tag'
              )
          p.stock(v-text='"库存: " + item.store_product_stock_qty')
        a.add-carts(
          v-if='item.store_product_stock_qty != 0',
          @click='addToCarts(item)'
        )
          em.icon-add-carts
        span.goods-stock(v-else) 补货中
    .goods-list(v-else)
      not-found
        p 未查询到相关数据!
    site-cart(v-if='totalRows > 0')
</template>

<script lang='babel'>
  import SiteCart from '../carts/siteCart.vue';
  import NotFound from '../common/notFound.vue';
  export default {
    components: {
      SiteCart,
      NotFound,
    },
    data() {
      return {
        items: [],
        totalRows: 0,
        numAsc: false,
        priceAsc: false,
        keywords: '',
        order_type: '',
        order: '',
        query: {},

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,

        hotKeys: [],
        hotToggle: false,
      }
    },
    methods: {
      ...Vuex.mapActions(['addToCarts']),
      getGoodsData(options = {}, reset = false) {
        this.hotToggle = false;
        if (this.order) {
          delete this.query.order;
          self.DD.assign(options, this.query);
        } else {
          self.DD.assign(options, this.query);
        }

        options.keywords = this.keywords;

        if (options.order === 'sell_num') {
          this.numAsc = !this.numAsc;
          this.priceAsc = false;
          this.order_type = this.numAsc? 'desc': 'asc';
          this.order = options.order;
        }

        if (options.order === 'final_price') {
          this.priceAsc = !this.priceAsc;
          this.numAsc = false;
          this.order_type = this.priceAsc? 'desc': 'asc';
          this.order = options.order;
        }

        // reset 为 true 时重置所有数据, 并且要卸载上一次的事件
        if (reset) {
          this.page = 0;
          // scrollTop重置为0，不然的话点击的时候会触发两次事件
          self.document.body.scrollTop = 0;
          self.document.removeEventListener('scroll', this.next);
        }
        options.page = this.page + 1;
        self.DD.assign(options, {
          order_type: this.order_type,
          order: this.order,
          callback: function (data) {
            this.scrollToggle = true;
            if (!data) return;
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.items = data.items;
              this.loadingEl = null;
              self.document.removeEventListener('scroll', this.next);
            } else {
              this.items = this.items.concat(data.items);
            }

            this.totalRows = data.total_rows;
            this.page = data.page;
            this.pageCount = data.pageCount;

            if (this.loadingEl && this.loadingEl.parentElement) {
              this.loadingEl.parentElement.removeChild(this.loadingEl);
            }

            this.loadingEl = self.document.createElement('div');
            this.loadingEl.className = 'next-loading';
            this.loadingEl.innerHTML = '努力加载中...';

            if (this.page != this.pageCount) {
              self.document.addEventListener('scroll', this.next);
            } else {
              self.document.removeEventListener('scroll', this.next);
            }
          }.bind(this)
        });
        // 接口需要的是一个对象，而我们拿到的是一个JSON串
        if (options.attribute) {
          options.attribute = self.JSON.parse(options.attribute);
        }
        this.$store.dispatch('getGoodsList', options);
      },
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.getGoodsData();
          }
        }
      },
      getHotKey() {
        if (this.hotKeys.length > 0) {
          this.hotToggle = true;
          return;
        }
        const body = {
          api: 'WEBSITE',
          method: 'get_website_tags'
        };
        self.DD.get(body, data => {
          if (data.result === 'success') {
            this.hotKeys = data.info._items;
            if (this.hotKeys.length > 0) {
              this.hotToggle = true;
            }
          }
        })
      },
      hotKeyHandler(keywords) {
        this.keywords = keywords;
        this.hotToggle = false;
        this.getGoodsData({ keywords }, true);
      }
    },
    mounted() {
      this.query = this.$route.query;
      if (this.query.attribute) {
        this.query.attribute = self.decodeURIComponent(this.query.attribute);
      }
      if (this.query.keywords) {
        this.keywords = this.query.keywords;
      }
      this.scrollEl = self.document.querySelector('.goods-list-wrapper');
      this.getGoodsData({}, true);
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
