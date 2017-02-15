<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .collection-wrapper {
    .tab-title {
      text-align: center;
      font-size: 0;
      margin-bottom: 10px;
      background-color: #fff;
      a {
        display: inline-block;
        width: 50%;
      }
      span {
        position: relative;
        display: inline-block;
        font-size: 14px;
        height: 45px;
        line-height: 43px;
        &:before {
          content: '';
          position: absolute;
          height: 3px;
          left: 0;
          bottom: 0;
          width: 100%;
        }
      }
      .active {
        color: $mainColor;
        span:before {
          background-color: $mainColor;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.collection-wrapper
    .tab-title
      router-link.goods(
        :to='{name: "myCollectionGoods"}'
      )
        span 商品收藏
      router-link.shop(
        :to='{name: "myCollectionShop"}'
      )
        span 店铺收藏
    router-view
</template>

<script lang='babel'>
  
</script>