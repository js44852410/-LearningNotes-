<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .buy-now-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    .content {
      background-color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 6;
      padding-bottom: 65px;
      text-align: right;
    }
    .num {
      position: relative;
      height: 40px;
      margin: 0 3%;
      @include borderBottom;
      @include borderTop;
      .title {
        position: absolute;
        left: 0;
        top: 10px;
      }
      .cart-option {
        right: -10px;
      }
    }
    .btn-settle {
      height: 50px;
      width: 100%;
      top: auto;
      line-height: 48px;
    }
    .close {
      padding: 10px;
      display: inline-block;
      .icon-close {
        width: 15px;
        height: 15px;
        color: #666;
        border: 1px solid currentColor;
        border-radius: 30px;
        position: relative;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        background: none;
        &:before {
          content: '';
          position: absolute;
          left: 2px;
          top: 7px;
          width: 11px;
          height: 1px;
          background-color: currentColor;
        }
        &:after {
          content: '';
          position: absolute;
          top: 2px;
          left: 7px;
          width: 1px;
          height: 11px;
          background-color: currentColor;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .buy-now-wrapper
    .content
      a.close(@click='toggleEmit')
        em.icon-close
      .num
        span.title 购买数量
        p.cart-option
          a.sub-cart(@click='changeNum("sub")')
            em -
          span.input
            input(
              v-model='num',
              @change='changeNum("change")',
              type='tel'
            )
          a.add-cart(@click='changeNum("add")')
            em +
      a.btn-settle(@click='goSettle') 确定
    .mask(@click='toggleEmit')
</template>

<script lang='babel'>
  export default {
    props: ['stock', 'price', 'startPrice'],
    data() {
      return {
        num: 1
      }
    },
    methods: {
      changeNum(type) {
        switch (type) {
          case 'add':
            this.num = Number(this.num) + 1;
            break;
          case 'sub':
            if (this.num > 1) {
              this.num -= 1;
            } else {
              this.num = 1;
            }
            break;
          case 'change':
            if (this.num < 1 || self.isNaN(this.num)) {
              this.num = 1;
            }
        }
        if (Number(this.num) > Number(this.stock)) {
          this.num = this.stock;
        }
      },
      goSettle() {
        if (this.num * this.price < +this.startPrice) {
          self.toast('购买商品不满足起送金额哟, 再多选两件吧!');
          return;
        };
        const goodsId = this.$route.params.goodsId;
        self.sessionStorage.clear();
        self.sessionStorage.setItem('goods', self.JSON.stringify({
          [goodsId]: this.num
        }));
        self.sessionStorage.setItem('buyNow', true);
        // this.cancelCoupon();
        this.$router.push({
          name: 'confirm'
        });
      },
      toggleEmit() {
        this.$emit('toggle-event');
      }
    }
  }
</script>
