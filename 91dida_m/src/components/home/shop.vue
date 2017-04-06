<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .home-shop {
    article {
      padding: 10px 0 0;
      background-color: #fff;
    }
    .item {
      position: relative;
      display: block;
      overflow: hidden;
      padding: 8px $margin 8px;
      @include borderTop($left: $margin);
      &:first-child {
        &:before {
          display: none;
        }
      }
    }
    .topic {
      float: left;
      width: 60px;
      height: 60px;
      border-radius: 5px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      margin-right: 10px;
      -webkit-background-size: cover;
      background-size: cover;
    }
    h4.title {
      margin-top: 3px;
      height: 35px;
      overflow: hidden;
    }
    .num {
      overflow: hidden;
      font-size: 12px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .sales {
      width: 40%;
      color: #fd4d3e;
      margin-right: 5px;
    }
    .more {
      display: block;
      padding-top: 10px;
      width: 50px;
      margin: -8px auto 0;
      font-size: 0;
      height: 12px;
      overflow: hidden;
      text-align: center;
    }
  }
</style>

<template lang='jade'>
  section.home-shop(v-if='viewShops.length > 0')
    home-title(
      :hex-color='"#f6c157"',
      :text='"商家推荐"',
      :url='{name: "shopList"}',
      :icon='"icon-home-shop"',
      :category='category'
    )
    article
      a.item(
        v-for='item in viewShops',
        @click='goPage({name: "shop", params: {shopId: item.store_id}},item.store_name)',
      )
        span.topic(:style='{backgroundImage: "url(" + item.logo + ")"}')
        h4.title(v-text='item.store_name')
        p.num
          span.sales(v-text='"起送金额 " + item.starting_price + " 元"')
          span.godds(v-text='"商品:" + item.items_num + "款"')
      a.more(
        v-if='shops.length > 3',
        @click='viewMore'
      )
        em.icon-home-shop-more(:class='{open: open}')
</template>

<script lang='babel'>
  import HomeTitle from './title.vue';
  export default {
    components: {
      HomeTitle,
    },
    data() {
      return {
        limitNum: 3,
        open: false,
        shops: [],
        viewShops: [],
        category:''
      }
    },
    watch: {
      limitNum(val) {
        this.viewShops = this.shops.slice(0, val);
      }
    },
    methods: {
      goPage(router, label){
        this.$router.push(router);
        this.monitor(`${label}`);
      },

      monitor(label){
        _czc.push(['_trackEvent', this.category, 'click', `${label}`]);
      },
      viewMore() {
        this.monitor('展开/收起');
        if (this.open) {
          this.limitNum = 3;
          this.open = false;
        } else {
          this.limitNum = this.shops.length;
          this.open = true;
        }
      }
    },
    created() {
      this.shops = self.home.store_is_recommend || [];
      this.viewShops = this.shops.slice(0, 3);
      this.category = `${self.home.deviceType}_首页商家推荐`;
    }
  }
</script>
