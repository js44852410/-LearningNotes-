<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .add-coupon {
    display: block;
    overflow: hidden;
    margin: 0 $margin 10px;
    padding-right: 30px;
    input {
      float: left;
      height: 36px;
      width: 80%;
      padding: 0 10px;
      border-radius: 3px;
    }
    button {
      width: 16%;
      height: 36px;
      float: right;
      border-radius: 3px;
      background-color: #fff;
      color: $mainColor;
      border: 1px solid currentColor;
    }
    .coupon-rule {
      position: absolute;
      right: 10px;
    }
    .coupon-rule {
      position: absolute;
      right: 0;
      padding: 7px 10px;
    }
    .icon-rule {
      display: block;
      border-radius: 50px;
      width: 20px;
      height: 20px;
      border: 1px solid #E60012;
      text-align: center;
      line-height: 21px;
      color: #E60012;
      background: #fff;
    }
  }
</style>

<template lang='jade'>
  form.add-coupon
    input(
      placeholder='请输入优惠券码',
      v-model='couponSn'
    )
    button(
      @click.prevent='addCoupon',
      v-text='btnText'
    )
    a.coupon-rule(href='/website/coupon_rule.html')
      span.icon-rule ?
</template>

<script lang='babel'>
  export default {
    props: ['productInfo'],
    data() {
      return {
        couponSn: '',
        from: '',
        btnText: '绑定'
      }
    },
    methods: {
      addCoupon() {
        if (!this.couponSn) {
          self.toast('优惠券码不能为空哟~');
          return;
        }
        this.$store.dispatch('addCoupon', {
          sn: this.couponSn,
          from: this.from,
          productInfo: this.productInfo,
          callback: function() {
            self.sessionStorage.setItem('isClear', 1);
            this.$router.replace({
              name: "confirm",
            })
          }.bind(this)
        });
      },
    },
    created() {
      this.from = this.$route.query.from;
      this.btnText = this.from? '使用': '绑定';
    }
  }
</script>
