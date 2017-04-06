<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .shop-wrapper-topic {
    position: relative;
    padding-top: 33%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    -webkit-background-size: cover;
    background-size: cover;
    margin-top: 50px;
    &:before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .3);
    }
    .logo {
      z-index: 1;
      position: absolute;
      bottom: 12%;
      left: 5%;
      width: 15%;
      height: 30%;
      border: 2px solid #fff;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name,
    .tips {
      z-index: 1;
      position: absolute;
      left: 25%;
      color: #fff;
      font-size: 16px;
      text-shadow: 1px 1px 0 #333;
    }
    .name {
      bottom: 28%;
    }
    .tips {
      bottom: 13%;
      font-size: 12px;
    }
    .collection {
      position: absolute;
      right: 0;
      bottom: 12%;
      color: #fff;
      padding: 5px 10px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      background-color: $priceColor;
      &.active {
        background-color: #fff;
        color: $priceColor;
      }
      em {
        margin-right: 3px;
      }
      em, span {
        vertical-align: middle;
      }
    }
  }
</style>

<template lang='jade'>
  header.shop-wrapper-topic(
    :style='{backgroundImage: "url(" + shopBanner + ")"}'
  )
    a.logo(
      :style='{backgroundImage: "url(" + shopLogo + ")"}'
    )
    p.name(v-text='shopName')
    p.tips(v-text='shopPriceTips')
    a.collection(
      @click='toggleCollectionShop({ id: storeId, status: shopCollection, type: 1 })',
      :class='{ active: shopCollection }'
    )
      em.icon-shop-collection
      span(v-text='shopCollection? "已收藏": "收藏"')
</template>

<script lang='babel'>
  export default {
    props: ['storeId'],
    computed: {
      ...Vuex.mapGetters([
        'shopBanner', 'shopLogo', 'shopName', 'shopPriceTips', 'shopCollection'
      ]),
    },
    methods: {
      ...Vuex.mapActions(['getShopInfo', 'toggleCollectionShop']),
    },
    mounted() {
      this.getShopInfo(this.storeId);
    }
  }
</script>
