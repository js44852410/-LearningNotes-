<style lang='sass'>
  @import '../../scss/variable';
  .pending-wrapper {
    text-align: center;
    padding-top: 75px;
    background-color: #fff;
    height: 100%;
    & > p {
      margin-top: 20px;
    }
    .reason {
      display: inline-block;
      padding: 15px $margin 10px;
      overflow: hidden;
      font-size: 12px;
      p {
        margin-top: 0;
        line-height: 1.5;
        color: $grayColor;
        overflow: hidden;
        text-align: left;
      }
    }
    .btn-submit {
      line-height: 45px;
    }
    .options {
      overflow: hidden;
      padding: 0 $margin;
      color: $grayColor;
    }
    .forget {
      float: right;
    }
  }
</style>

<template lang='jade'>
  .wrapper.pending-wrapper
    em.icon-unpass
    p 非常抱歉! 您提交的资料并未审核通过!
    .reason
      em.i !
      p(v-text='"原因：" + reason')
    router-link.btn-submit(:to='{name: "registerInfo", query: {modify: 1}}') 修改资料
    .options
      a.forget(@click='logout') 切换账号
    tips
</template>

<script lang='babel'>
  import Tips from './tips.vue';
  export default {
    components: {
      Tips,
    },
    data() {
      return {
        reason: self.home.reviewReason,
      }
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
    },
    mounted(){
      this.$store.dispatch('getRegionList');
    }
  }
</script>
