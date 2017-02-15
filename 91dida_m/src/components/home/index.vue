<style lang='sass'>
  .home-wrapper {
    padding-bottom: 70px;
  }
</style>

<template lang='jade'>
  .wrapper.home-wrapper
    search
    swipe(
      :page='"home"',
      :height='"49%"'
    )
    category
    new-products
    special-products
    hot-products
    shop
    brand
    nav-bar
</template>

<script lang='babel'>
  import NavBar          from '../common/navBar.vue';
  import Swipe           from '../common/swipe.vue';
  import Category        from './category.vue';
  import Shop            from './shop.vue';
  import Brand           from './brand.vue';
  import NewProducts     from './newProducts.vue';
  import HotProducts     from './hotProducts.vue';
  import SpecialProducts from './specialProducts.vue';
  import Search          from './search.vue';
  export default {
    name: 'Home',
    components: {
      Search,
      Category,
      NavBar,
      Swipe,
      Shop,
      Brand,
      NewProducts,
      HotProducts,
      SpecialProducts,
    },
  }
</script>
