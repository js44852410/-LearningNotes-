<style lang='sass'>
  .home-brand {
    article {
      background-color: #fff;
      font-size: 0;
      position: relative;
      a {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .scroll {
      padding-left: 25px;
      overflow-x: auto;
    }
    .item {
      width: 90px;
      height: 90px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      margin-right: 10px;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .view-more {
      width: 30px;
      height: 90px - 15px;
      padding-top: 15px;
      span {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        font-size: 12px;
        margin-left: 3px;
      }
    }
    .recommend-title {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      z-index: 1;
    }
  }
</style>

<template lang='jade'>
  section.home-brand(v-if='brands.length > 0')
    home-title(
      :hex-color='"#936ad9"',
      :text='"品牌推荐"',
      :url='{name: "brand"}',
      :icon='"icon-home-brand"',
      :category='category'
    )
    article
      a.recommend-title(
        @click='goPage({name: "brand"}, "查看更多_left")'
      )
        em.icon-recommend-title
      .scroll
        .scroll-bar(:style='{width: 100 * brands.length + "px"}')
          a.item(
            v-for='item in brands',
            @click='goPage({name: "goodsList", query: {brand_id: item.brand_id}},item.brand_name)',
            :style='{backgroundImage: "url(" + item.brand_icon + ")"}',
          )
</template>

<script lang='babel'>
  import HomeTitle from './title.vue';
  export default {
    components: {
      HomeTitle,
    },
    data() {
      return {
        brands: [],
        category:''
      }
    },
    methods:{
      goPage(router, label){
        this.$router.push(router);
        _czc.push(['_trackEvent', this.category, 'click', `${label}`]);
      }
    },
    created() {
      this.brands = self.home.brand || [];
      this.category = `${self.home.deviceType}_首页品牌推荐`;
    }
  }
</script>
