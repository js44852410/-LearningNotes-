<template lang='jade'>
  .wrapper.user-form-wrapper
    form(
      @submit.prevent='submit'
    )
      .items
        span.title 手机号
        input.input(
          v-model='body.mobile',
          type="tel",
          maxlength='11',
          placeholder="请输入手机号码"
        )
      .items
        span.title 验证码
        input.input(
          v-model='body.valid_code',
          type="text",
          maxlength='6',
          placeholder=""
        )
        get-code(
          :mobile='body.mobile',
          :type='"forgotpassword"'
        )
      div.separate
        .items
          span.title 密码
          input.input(
            v-model='body.password',
            type="password",
            maxlength='15',
            placeholder="请输入密码"
          )
        .items.separate-left
          span.title 确认密码
          input.input(
            v-model='body.repwd',
            type="password",
            maxlength='15',
            placeholder="请确认密码"
          )
      button.btn-submit(
        :disabled='disabled'
      ) 提交
    tips
</template>

<script lang='babel'>
  import GetCode from './code.vue';
  import Tips from './tips.vue';
  export default {
    components: {
      GetCode,
      Tips
    },
    data() {
      return {
        body: {
          api: 'customer',
          method: 'find_customer_password',
          is_buyer: 1,
          is_seller: 0,
          mobile: '',
          password: '',
          repwd: '',
          valid_code: '',
        },
        disabled: true
      }
    },
    watch: {
      body: {
        handler: 'verification',
        deep: true
      }
    },
    methods: {
      verification() {
        const b = this.body;
        if (/^1[345678]{1}\d{9}$/.test(b.mobile) && b.valid_code.length === 6 && b.password && b.repwd) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      submit() {
        if (this.body.repwd != this.body.password) {
          self.toast('两次输入的密码不一致哟~');
        } else {
          this.disabled = true;
          self.DD.post(this.body, (data) => {
            this.disabled = false;
            if (data.result === 'success') {
              this.$router.push({
                name: 'login'
              });
            } else {
              self.toast(data.info.errmsg);
            }
          });
        }
      }
    }
  }
</script>