<style lang='sass'>
  .swipe-wrapper {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    .swipe-container {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      list-style: none;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .padding {
      a {
        -webkit-background-size: 80%;
        background-size: 80%;
      }
    }
    .swipe-point {
      position: absolute;
      z-index: 1;
      right: 10px;
      bottom: 5px;
      em {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 5px;
        border-radius: 20px;
        border: 1px solid #fff;
      }
      .active {
        background-color: #fff;
      }
    }
    .banner {
      float: left;
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>

<template lang='jade'>
  aside.swipe-wrapper(
    v-if='banner.length > 0',
    :style='{paddingTop: height}',
    ref='swipe',
  )
    ul.swipe-container(
      :class='{padding: page === "goodsInfo"}'
    )
      li.banner(
        v-for='item in banner'
      )
        a(
          v-if='page === "home"',
          @click='goPage(item)',
          :style='{backgroundImage: "url(" + item.file + ")"}'
        )
        a(
          v-if='page === "goodsInfo"',
          :style='{backgroundImage: "url(" + item + ")"}'
        )
    .swipe-point(v-if='banner.length > 1')
      em.point(
        v-for='(item, index) in banner',
        :class='{"active": index === active}'
      )
</template>

<script lang='babel'>
export default {
  props: ['page', 'height', 'images'],
  data() {
    return {
      active: 0,
      banner: [],
    }
  },
  methods: {
    initSwipe() {
      new Swipe(this.$refs.swipe, {
        auto: 3000,
        autoRestart: true,
        transitionEnd: function(index, elem) {
          this.active = index;
        }.bind(this)
      });
    },
    goPage(vm) {
      if(vm.link_type){
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页焦点图`, 'click', `${vm.title}`]);
      }

      if (vm.link_type === 'url') {
        self.location.href = vm.link;
      } else if (vm.link_type === 'activity') {
        this.$router.push({
          name: 'shopActivity',
          params: {
            id: vm.activity_id,
          }
        })
      } else if (vm.link_type === 'products') {
        this.$router.push({
          name: 'goodsInfo',
          params: {
            shopId: 0,
            goodsId: vm.link,
          }
        })
      }
    }
  },
  mounted() {
    if (this.page === 'home') {
      var defaultBanner = [{
        file: '//static.91dida.cn/skin/m/images/banner.png',
      }]
      this.banner = self.home.adv.length?  self.home.adv: defaultBanner;
    } else if (this.page === 'goodsInfo') {
      this.banner = this.images || [];
    }
    this.$nextTick(() => {
      this.initSwipe();
    });
  }
}
</script>
