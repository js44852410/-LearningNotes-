<style lang='sass'>

</style>

<template lang='jade'>
  nav-bar
</template>

<script lang='babel'>
  import NavBar from './common/navBar.vue';
  export default {
    components: {
      NavBar,
    },
    methods: {
      init() {
        self.DD.loading();
        switch (self.home.reviewStatus) {
          case 'pending':
            // 正在审核中...
            this.$router.replace({
              name: 'pending',
            });
            break;
          case 'denied':
            // 审核未通过
            this.$router.replace({
              name: 'unpass',
            });
            break;
          case 'on_hold':
            // 用户已注册，但是没有填写信息
            this.$router.replace({
              name: 'registerInfo',
            });
            break;
          case '':
            this.$router.replace({
              name: 'login',
            });
            break;
          default:
            this.$router.replace({
              name: 'home',
            });
        }
      }
    },
    created() {
      this.init();
    },
    destroyed() {
      self.DD.loading(false);
    }
  }
</script>
