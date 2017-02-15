<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .shop-nav-footer {
    height: 50px;
    line-height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
    font-size: 0;
    box-shadow: 0 -1px 5px rgba(51, 51, 51, 0.1);
    z-index: 2;
    @include borderTop;
    & > a {
      font-size: 14px;
      display: inline-block;
      width: 33%;
      position: relative;
      &:nth-child(2) {
        width: 34%;
        @include borderLeft;
        @include borderRight;
      }
    }
    .point {
      margin-right: 5px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 10px;
      height: 7px;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 3px;
        width: 80%;
        border-bottom: 1px solid $borderColor;
      }
    }
    span,
    em {
      vertical-align: middle;
    }
    em {
      margin-right: 5px;
    }
    .sub-nav {
      position: absolute;
      left:  3%;
      bottom: 55px;
      min-width: 27%;
      font-size: 12px;
      border: 1px solid $borderColor;
      border-radius: 3px;
      a {
        position: relative;
        display: block;
        padding: 10px;
        line-height: 20px;
        background-color: #fff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        @include borderTop;
      }
      .line {
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
      }
      .arrow {
        width: 8px;
        height: 8px;
        display: block;
        margin: 0 auto -5px;
        background-color: #fff;
        border-left: 1px solid $borderColor;
        border-bottom: 1px solid $borderColor;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  }
</style>

<template lang='jade'>
  div
    footer.shop-nav-footer
      a(@click.stop='getCategory')
        em.point(v-if='shopGoodsCategory && shopGoodsCategory.length > 0')
        span 经营分类
      a(:href='shopIntroUrl')
        span 店铺详情
      a(:href='"tel: " + shopTel')
        span 联系卖家
      .sub-nav(v-if='shopGoodsCategory && shopGoodsCategory.length > 0 && categoryToggle',)
        router-link(
          v-for='item in shopGoodsCategory',
          v-text='item.category_name',
          :to='{name: "goodsList", query: {store_id: storeId, category_id: item.category_id}}'
        )
        span.line
          em.arrow
    site-cart
</template>

<script lang='babel'>
  import SiteCart from '../carts/siteCart.vue';
  export default {
    components: {
      SiteCart,
    },
    props: ['storeId'],
    data() {
      return {
        categoryToggle: false,
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'shopGoodsCategory', 'shopTel', 'shopIntroUrl'
      ]),
    },
    methods: {
      /**
       * 获取分类，此接口获取的是所有的分类，然后需要跟据 shopGoodsCategory 来进行过滤，只显示当前店铺有的分类
       * 如果 category 有数据就不能再请求接口了，直接控制显/隐就O啦
       */
      getCategory() {
        if (this.shopGoodsCategory.length < 1) {
          return self.toast('暂无分类哟~');
        };
        this.categoryToggle = !this.categoryToggle;
      },
      bodyEventHandler() {
        this.categoryToggle = false;
      }
    },
    mounted() {
      this.$nextTick(() => {
        self.document.body.addEventListener('click', this.bodyEventHandler);
      });
    },
  }
</script>
