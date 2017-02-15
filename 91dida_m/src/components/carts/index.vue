<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .carts-wrapper {
    padding-top: 10px;
    padding-bottom: 100px;
  }
  .footer-settle {
    height: 50px;
    line-height: 50px;
    position: fixed;
    z-index: 2;
    left: 0;
    bottom: 50px;
    width: 100%;
    padding-left: 80px;
    padding-right: 32%;
    box-sizing: border-box;
    background-color: #fff;
    text-align: right;
    @include borderTop;
    .icon-big-check {
      padding-top: 0;
      padding-bottom: 0;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
    }
    em, span {
      vertical-align: middle;
      pointer-events: none;
    }
    .price {
      color: $priceColor;
    }
  }
</style>

<template lang='jade'>
  .wrapper.carts-wrapper(
      @touchmove='touchmove($event)',
      @touchstart='touchstart($event)',
      @touchend='touchend($event)'
    )
    shop-cart-item(
      v-if='cartsItems.length > 0',
      v-for='item in cartsItems',
      :shop-data='item',
    )
    .footer-settle(v-if='cartsItems.length > 0')
      a.icon-big-check(
        :class='{"active": allIsSelected === "1"}',
        @click='optionsCart({el: $event.target})'
      )
        em.icon-cart-check
        span 全选
      em 总计:
      span.price {{totalAmount | formatAmount}}
      a.btn-settle(
        @click='goSettle'
      ) 去结算
    not-found(v-else)
      p 未查询到相关数据!
    nav-bar
</template>

<script lang='babel'>
  import NavBar from '../common/navBar.vue';
  import ShopCartItem from './shopCartItem.vue';
  import NotFound from '../common/notFound.vue';
  export default {
    components: {
      NavBar,
      NotFound,
      ShopCartItem
    },
    data() {
      return {
        startX: 0,
	      startY:0,
        end: 0,
        target: null,
      }
    },
    computed: {
      ...Vuex.mapGetters([ 'cartsItems', 'allIsSelected', 'totalAmount', 'beSettled', 'toastMsg' ])
    },
    methods: {
      ...Vuex.mapActions(['getCartsList', 'optionsCart']),
      touchstart($event) {
        if($event.touches.length == 1){
          const touch = $event.touches[0];

          if(touch.target.classList.contains("btn-del")){
            return false;
          }

          this.startX = touch.clientX;
          this.startY = touch.clientY;

          if (this.target) {
            this.end = 0;

            this.target.style.webkitTransform = `translate(${this.end}px, 0) translateZ(0)`;
            this.target.style.transform = `translate(${this.end}px, 0) translateZ(0)`;
            function transitionendFunc() {
              this.removeEventListener("webkitTransitionEnd", transitionendFunc, true);
              this.removeEventListener("transitionend", transitionendFunc, true);
              this.style.webkitTransition = "";
              this.style.transition = "";
            }

            this.target.addEventListener("webkitTransitionEnd", transitionendFunc, true);
            this.target.addEventListener("transitionend", transitionendFunc, true);
            this.target = null;
            return false;
          } else {
            if (touch.target.classList.contains("goods")) {
              this.target = touch.target.parentNode;
            }
            if (touch.target.classList.contains("touch")) {
              this.target = touch.target;
            }
          }
        }
      },
      touchmove($event) {
        if(this.target){
          const touch = $event.touches[0];

          let changeY = touch.clientY - this.startY;

          if(Math.abs(changeY) <= 10 && Math.abs(changeY) > Math.abs(this.end)){
            $event.preventDefault();
            $event.stopPropagation();
          }

          this.end = touch.clientX - this.startX;

          if(this.end < 0){
            this.target.style.webkitTransform = `translate(${this.end}px, 0) translateZ(0)`;
            this.target.style.transform = `translate(${this.end}px, 0) translateZ(0)`;
          }
        }
      },
      touchend($event) {
        if(this.end <= -5){
          if(this.end <= -30){
            this.end = -60;
          } else {
            this.end = 0;
          }

          this.target.style.webkitTransition = "transform 0.2s ease";
          this.target.style.transition = "transform 0.2s ease";

          this.target.style.webkitTransform = `translate(${this.end}px, 0) translateZ(0)`;
          this.target.style.transform = `translate(${this.end}px, 0) translateZ(0)`;
        } else {
          this.target = null;
        }
      },
      goSettle() {
        if (!+this.totalAmount) {
          self.toast('还没有选择要结算的商品哟~');
          return;
        } else if (!+this.beSettled) {
          self.toast(this.toastMsg);
        } else {
          this.$router.push({
            name: 'confirm',
          });
        }
      },
    },
    created() {
      self.sessionStorage.clear();
      this.getCartsList();
    }
  }
</script>
