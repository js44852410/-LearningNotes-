<style lang='sass'>
  @import '../../scss/variable';
  .pending-wrapper {
    text-align: center;
    padding-top: 75px;
    background-color: #fff;
    height: 100%;
    p {
      margin-top: 20px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.pending-wrapper
    em.icon-trial
    p 您提交的资料正在审核，请耐心等待!
    button.btn-submit(@click='logout') 退出登录
    tips
</template>

<script lang='babel'>
  import Tips from './tips.vue';
  export default {
    components: {
      Tips,
    },
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
