<style lang='sass'>
  @import '../../scss/variable';
  .user-form-wrapper {
    padding-top: 10px;
    padding-bottom: 56px;
    min-height: 100%;
    color: $grayColor;
    .options {
      overflow: hidden;
      padding: 0 $margin;
    }
    .register {
      float: left;
    }
    .forget {
      float: right;
    }
  }
</style>

<template lang='jade'>
  .wrapper.user-form-wrapper
    form#login(
      @submit.prevent='login'
    )
      .items
        span.title 手机号
        input.input(
          v-model='mobile',
          type='tel',
          maxlength='11',
          placeholder='请输入手机号码'
        )
      .items
        span.title 密码
        input.input(
          v-model='password',
          type='password',
          maxlength='15',
          placeholder='请输入6~15位密码'
        )
      button.btn-submit(
        :disabled='disabled',
        v-text='text'
      )
    p.options
      router-link.register(
        :to='{name: "register"}'
      ) 立即注册
      router-link.forget(
        :to='{name: "findPassWord"}'
      ) 忘记密码
    tips
</template>

<script lang='babel'>
  import * as apis from '../../store/apis';
  import Tips from './tips.vue';
  export default {
    components: {
      Tips
    },
    data() {
      return {
        mobile: '',
        password: '',
        text: '登录',
        disabled: true
      }
    },
    watch: {
      mobile: 'verification',
      password: 'verification',
    },
    methods: {
      verification() {
        if (/^1[345678]{1}\d{9}$/.test(this.mobile) && this.password) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      login() {
        const body = { ...apis.LOGIN };
        body.mobile =  this.mobile;
        body.password = this.password;
        this.disabled = true;
        this.text = '正在登录中...';
        self.DD.post(body, data => {
          if (data.result === 'success') {
            if (data.info.status === 'pending') {
              // 正在审核中
              this.$router.replace({
                name: 'pending'
              });
            } else if (data.info.status === 'denied') {
              // 审核未通过
              this.$router.replace({
                name: 'unpass'
              });
            } else {
              // 这里使用location.href而不用vue-router是为了回首页刷新一下页面
              self.location.href = '/';
            }

          } else {
            self.toast(data.info.errmsg);
            if (data.code === '0x6013') {
              self.location.href = '/';
            } else {
              this.disabled = false;
              this.text = '登录';
            }
          }
        })
      }
    },
    mounted(){
      this.$store.dispatch('getRegionList');
    }
  }
</script>
