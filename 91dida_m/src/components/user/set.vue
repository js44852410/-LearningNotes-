<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .user-info-wrapper {

  }
</style>

<template lang='jade'>
  div
    .wrapper.user-info-wrapper
      .layout
        router-link.item(
          :to='{name: "message"}'
        )
          span.title 意见反馈
          em.icon-more
        a.item(
          href='/website/about.html'
        )
          span.title 关于我们
          em.icon-more
      a.btn-logout(@click='logout') 退出登录
    router-view(transition='slide')
</template>

<script lang='babel'>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('logout', {
          callback: function() {
            self.home.reviewStatus = '';
            this.$router.replace({
              name: 'login',
            });
          }.bind(this)
        })
      }
    }
  }
</script>
