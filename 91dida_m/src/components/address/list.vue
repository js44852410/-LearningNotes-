<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .address-wrapper {
    .add {
      display: block;
      margin: 10px 0;
      position: relative;
      padding: 10px 0 10px 30px;
      background-color: #fff;
      @include borderTop;
      @include borderBottom;
      .icon-add {
        border: 1px solid $mainColor;
        width: 13px;
        height: 13px;
        border-radius: 30px;
        position: absolute;
        left: 10px;
        top: 11px;
        &:before {
          content: '';
          position: absolute;
          left: 2px;
          top: 6px;
          width: 9px;
          height: 1px;
          background-color: $mainColor;
        }
        &:after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 1px;
          height: 9px;
          background-color: $mainColor;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.address-wrapper
    router-link.add(:to='{name: "addressAdd", query: $route.query}')
      span.icon-add
      strong 新增收货地址
    ul
      item(
        v-for='(item, index) in addressList',
        :address='item',
        :data-index='index'
      )
</template>

<script lang='babel'>
  import Item from './item.vue';
  export default {
    components: {
      Item,
    },
    computed: {
      ...Vuex.mapGetters(['addressList']),
    },
    mounted() {
      this.$store.dispatch('getAddressList');
    }
  }
</script>
