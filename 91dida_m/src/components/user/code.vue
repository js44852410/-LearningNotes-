<style lang='sass'>
  @import '../../scss/variable';
  .btn-code {
    position: absolute;
    right: $margin;
    top: 7px;
    bottom: 7px;
    line-height: $inputHeight - 16px;
    width: 110px;
    text-align: center;
    color: $mainColor;
    border: 1px solid $mainColor;
    border-radius: 3px;
  }
</style>

<template lang='jade'>
  a.btn-code(
    v-text='text',
    @click='getCode'
  )
</template>

<script lang='babel'>
  export default {
    props: ['mobile', 'type'],
    data() {
      return {
        text: '获取验证码',
        num: 60,
        timer: null,
        body: {
          api: 'system',
          method: 'send_mobile_code',
          buyer: 1,
          seller: 0
        }
      }
    },
    methods: {
      getCode() {
        if (this.num < 60) return;
        if (this.mobile === '') {
          self.toast('请先输入您的手机号码');
        } else if (!/^1[345678]{1}\d{9}$/.test(this.mobile)) {
          self.toast('您输入的手机号码不正确');
        } else {
          this.body.mobile = this.mobile;
          this.body.type = this.type;
          self.DD.post(this.body, (data) => {
            if (data.result === 'success') {
              this.timer = self.setInterval(this.countDown, 1000);
              self.toast('短信发送成功');
            } else {
              this.text = '获取验证码',
              self.toast(data.info.errmsg);
            }
          });
        }
      },
      countDown() {
        this.num--;
        if (this.num < 1) {
          self.clearInterval(this.timer);
          this.num = 60;
          this.text = '获取验证码';
        } else {
          this.text = `${this.num}s后重新获取`;
        }
      }
    }
  }
</script>
