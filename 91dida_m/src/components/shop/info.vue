<style lang='sass'>
  .shop-info-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>

<template lang='jade'>
  iframe.wrapper.shop-info-wrapper(
    frameborder='0',
    :src='shopIntroUrl'
  )

</template>

<script lang='babel'>
  export default {
    computed: {
      ...Vuex.mapGetters(['shopIntroUrl']),
    },
	  methods:{
		  ...Vuex.mapActions(['getShopInfo']),
	  },
    mounted(){
      if(!this.shopIntroUrl){
        this.getShopInfo(this.$route.params.shopId);
      }
    },
  }
</script>
