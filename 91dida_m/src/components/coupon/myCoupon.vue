<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .my-coupon-wrapper {
    .tab {
      background-color: #fff;
      text-align: center;
      font-size: 0;
      margin-bottom: $margin;
      li {
        width: 33.33333%;
        font-size: 14px;
        display: inline-block;
      }
      a {
        padding: 10px 0px;
        height: 20px;
        display: inline-block;
        position: relative;
        &.active {
          color: $mainColor;
          &:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 2px;
            background-color: currentColor;
          }
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.my-coupon-wrapper
    ul.tab
      li
        a(
          :class='{active: couponType === 1}',
          @click='getMyCouponList(1, $event)'
        )
          span 未使用
          em(v-text='"(" + couponUnusedNum + ")"')
      li
        a(
          :class='{active: couponType === 2}',
          @click='getMyCouponList(2, $event)'
        )
          span 已使用
          em(v-text='"(" + couponUsedNum + ")"')
      li
        a(
          :class='{active: couponType === 3}',
          @click='getMyCouponList(3, $event)'
        )
          span 已过期
          em(v-text='"(" + couponExpiredNum + ")"')
    add-coupon
    .coupon-item-wrapper
      coupon-item(
        v-if='couponList.length > 0',
        v-for='item in couponList',
        :coupon-data='item',
        :status='couponType',
      )
      not-found(v-if='couponList.length === 0')
        p 暂无数据~
</template>

<script lang='babel'>
  import CouponItem from './item.vue';
  import AddCoupon from './addCoupon.vue';
  import NotFound from '../common/notFound.vue';
  import * as apis from '../../store/apis';
  export default {
    components: {
      CouponItem,
      NotFound,
      AddCoupon,
    },
    data() {
      return {
        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    computed: {
      ...Vuex.mapGetters(['couponType', 'couponList', 'couponUnusedNum', 'couponUsedNum', 'couponExpiredNum']),
    },
    methods: {
      getMyCouponList(type, $event) {
        if($event) {
          this.page = 0;
          self.document.removeEventListener('scroll', this.next);
        }
        this.$store.dispatch('getMyCouponList', {
          type,
          eventType: $event && $event.type,
          vm: this
        })
      },
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.loadingEl.style.display = 'block';
            this.getMyCouponList();
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.my-coupon-wrapper');
      this.getMyCouponList(1);
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
