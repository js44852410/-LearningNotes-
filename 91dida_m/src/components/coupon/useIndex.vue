<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .coupon-use-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    background-color: $bgColor;
    z-index: 2;
    .tab {
      background-color: #fff;
      text-align: center;
      font-size: 0;
      margin-bottom: $margin;
      li {
        width: 50%;
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
  .coupon-checked {
    .coupon-item {
      .item {
        margin-left: 35px;
      }
      .icon-big-check {
        display: block;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.coupon-use-wrapper
    ul.tab
      li
        a(
          :class='{active: status === 1}',
          @click='toggleType(1)'
        )
          span 可用优惠券
          em(v-text='"(" + validTotalRows + ")"')
      li
        a(
          :class='{active: status === 0}',
          @click='toggleType(0)'
        )
          span 不可用优惠券
          em(v-text='"(" + unvalidTotalRows + ")"')
    add-coupon(
      :product-info='productInfo'
    )
    .coupon-item-wrapper(
      :class='{"coupon-checked": status === 1}'
    )
      coupon-item(
        v-if='couponList.length > 0',
        v-for='item in couponList',
        :coupon-data='item',
        :shop-id='productInfo.store_id',
        :status='status'
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
        couponSn: '',
        validTotalRows: 0,
        unvalidTotalRows: 0,
        validItems: [],
        unvalidItems: [],
        status: 1,

        couponList: [],
        productInfo: {
          store_id: 0,
        },
        pay_method: '',
      }
    },
    methods: {
      getCouponList() {
        const body = {...apis.CHOOSE_COUPON};
        body.pay_method = this.pay_method;
        body.product_info = self.encodeURIComponent(self.JSON.stringify(this.productInfo));
        self.DD.loading();
        self.DD.get(body, data => {
          if (data.result === 'success') {
            this.validTotalRows = data.info.valid_coupons.total_rows;
            this.unvalidTotalRows = data.info.unvalid_coupons.total_rows;
            this.validItems = data.info.valid_coupons.items || [];
            this.unvalidItems = data.info.unvalid_coupons.items || [];

            this.couponList = this.validItems;
          } else {
            self.toast(data.info.errmsg);
          }
        })
      },
      toggleType(status) {
        this.status = status;
        if (status) {
          this.couponList = this.validItems;
        } else {
          this.couponList = this.unvalidItems
        }
      }
    },
    created() {
      this.productInfo = self.JSON.parse(self.sessionStorage.getItem('productInfo'));
      this.pay_method = self.sessionStorage.getItem('payMethod');
      this.getCouponList();
    },
  }
</script>
