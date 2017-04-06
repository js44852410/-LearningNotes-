<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .coupon-item {
    position: relative;
    display: block;
    $sizeHeight: 636px;
    .icon-big-check {
      top: 50%;
      margin-top: -20px;
      pointer-events: none;
      display: none;
    }
    .item {
      pointer-events: none;
      overflow: hidden;
      margin: 0 $margin 10px $margin;
      height: 106px;
      padding: 8px 110px 8px 15px;
      box-sizing: border-box;
      color: #fff;
      background: #ffcf98 url(/src/images/coupon_bg.png) 0 0 no-repeat;
      -webkit-background-size: auto $sizeHeight;
      background-size: auto $sizeHeight;
      font-size: 12px;
      position: relative;
      .title {
        font-size: 16px;
        margin-bottom: 3px;
      }
      .sub-title {
        font-size: 14px;
        margin-bottom: 3px;
      }
      .des {
        height: 30px;
        @include ellipsis;
      }
      .time {
        em {
          margin: 0 5px;
        }
      }
      em[class^='icon-'] {
        $size: (118px/2);
        position: absolute;
        right: -5px;
        top: -3px;
        width: $size;
        height: $size;
      }
    }
    .price {
      position: absolute;
      right: 0;
      top: 0;
      height: 106px;
      line-height: 100px;
      padding: 0 10px 0 10px;
      width: 95px;
      text-align: center;
      font-size: 0;
      background: url(/src/images/coupon_bg.png) 100% -212px no-repeat,
                  url(/src/images/coupon_bg.png) -4px -106px no-repeat;
      background-color: #ffb561;
      -webkit-background-size: auto $sizeHeight;
      background-size: auto $sizeHeight;
      em {
        font-size: 18px;
        line-height: 78px;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      span {
        font-size: 32px;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.8;
    }
    &.unuse {
      opacity: 1;
      .item {
        background-position: 0 -318px;
        background-color: #cbcbcb;
      }
      .price {
        background: url(/src/images/coupon_bg.png) 100% -530px no-repeat,
                    url(/src/images/coupon_bg.png) -4px -424px no-repeat;
        background-color: #b0b0b0;
        -webkit-background-size: auto $sizeHeight;
        background-size: auto $sizeHeight;
      }
    }
  }
</style>

<template lang='jade'>
  a.coupon-item(
    :class='{disabled: couponData.status === 1 || (status === 0 && from == "confirm"), unuse: (status === 3 || status === 2), used: couponData.is_own}',
    @click='chooseCoupon(couponData)'
  )
    span.icon-big-check
      em.icon-cart-check
    div.item
      h4.title(v-text='couponData.coupon_name')
      p.sub-title(v-text='couponData.coupon_tips')
      p.des(v-text='couponData.coupon_desc')
      p.time
        span.start(v-text='couponData.start_time')
        em 至
        span.end(v-text='couponData.end_time')
      .price
        em ¥
        span(v-text='couponData.coupon_price')
      em.icon-activation(v-if='couponData.status === 1 && status != 3 && status != 2')
      em.icon-overdue(v-if='status === 3')
      em.icon-inused(v-if='status === 2')
</template>

<script lang='babel'>
  import * as apis from '../../store/apis';
  export default {
    props: ['couponData', 'shopId', 'status'],
    data() {
      return {
        from: ''
      }
    },
    methods: {
      chooseCoupon(item) {
        if (!this.shopId) {
          return;
        }
        self.DD.loading();
        const body = {...apis.OCCUPY_CHOOSE_COUPON};
        body.coupon_detail_id = item.coupon_detail_id;
        // is_own === 1 说明是已被占用
        // 已占用时，再点击时则取消选中状态
        if (item.is_own) {
          body.method = 'clear_occupy_coupon';
        } else {
          body.use_store_id = this.shopId;
        }
        const pay_method = self.sessionStorage.getItem('payMethod');
        const address_id = this.$route.query.address_id || 0;
        self.DD.post(body, (data) => {
          if (data.result === 'success') {
            if (item.is_own) {
              item.is_own = 0;
              self.sessionStorage.removeItem('isClear');
              self.toast('取消成功!');
            } else {
              self.sessionStorage.setItem('isClear', 1);
              this.$router.replace({
                name: "confirm",
                query: {
                  address_id,
                  pay_method
                }
              });
            }
          } else {
            self.toast(data.info.errmsg);
          }
        });
      }
    },
    mounted() {
      this.from = this.$route.query.from;
    }
  }
</script>
