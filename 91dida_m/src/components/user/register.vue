<template lang='jade'>
  div
    .wrapper.user-form-wrapper
      form#register(
        @submit.prevent='register'
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
            :type='"register"'
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
          .items
            span.title 邀请码
            input.input(
              v-model='body.invite_code',
              type="text",
              placeholder="地推员邀请码"
            )
        p.options
          em.icon-check(
            :class='{"active": checked}',
            @click='checked = !checked'
          )
          span(
            @click='checked = !checked'
          ) 同意
          router-link(:to='{name: "agreement"}') 《服务协议》
        button.btn-submit(
          :disabled='disabled'
        ) 立即注册
      tips
    router-view
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
          method: 'add_customer_item',
          mobile: '',
          password: '',
          repwd: '',
          valid_code: '',
          invite_code: ''
        },
        checked: true,
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
        if (/^1[345678]{1}\d{9}$/.test(b.mobile) && b.valid_code.length === 6 && b.password && b.invite_code) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      register() {
        if (this.body.repwd != this.body.password) {
          self.toast('两次输入的密码不一致哟~');
        } else if (!this.checked) {
          self.toast('您还未同意《服务协议》哟~');
        } else {
          this.disabled = true;
          self.DD.post(this.body, (data) => {
            if (data.result === 'success') {
              this.$router.push({
                name: 'registerInfo'
              });
            } else {
              self.toast(data.info.errmsg);
            }
          })
        }
      }
    }
  }
</script>
