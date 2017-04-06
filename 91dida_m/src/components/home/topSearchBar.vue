<style lang='sass'>

</style>

<template lang='jade'>
  .wrapper.home-wrapper
    swipe
    nav-bar
</template>

<script lang='babel'>
  import NavBar from '../common/navBar.vue';
  import Swipe from '../common/swipe.vue';
  export default {
    components: {
      NavBar,
      Swipe,
    }
  }
</script>
