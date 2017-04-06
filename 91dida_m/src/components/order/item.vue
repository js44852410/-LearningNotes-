<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .order-shop {
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    @include borderBottom;
    .shop-info,
    .goods-info {
      display: block;
      position: relative;
    }
    .shop-info {
      padding: 10px;
      @include borderTop;
      @include borderBottom;
    }
    .goods-list {
      @include borderBottom;
    }
    .icon-shop {
      vertical-align: middle;
      margin-right: 5px;
    }
    .shop-name {
      vertical-align: middle;
      position: relative;
      padding-right: 30px;
      span {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
        max-width: 68%;
      }
      em {
        position: static;
        @include arrow($size: 7px, $borderColor: #666);
      }
    }
    .order-state {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #E60012;
    }
    .goods {
      display: block;
      position: relative;
      padding: 10px 10px 10px 90px;
      min-height: 70px;
      color: $grayColor;
      border-top: 3px solid $bgColor;
      &:first-child {
        border-top: 0 none;
      }
    }
    .topic {
      position: absolute;
      left: 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 70px;
      height: 70px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .goods-name{
      font-size: inherit;
      padding-right: 10px;
      margin-bottom: 5px;
      @include ellipsis;
    }
    .goods-price {
      float: right;
    }
    .goods-num {
      position: absolute;
      right: 10px;
      top: 50px;
    }
    .order-price {
      position: relative;
      text-align: right;
      @include borderTop;
      padding: 10px;
      strong {
        color: $priceColor;
      }
    }
    .discount-total {
      color: $grayColor;
      margin-bottom: 5px;
    }
    .btn-box {
      padding: 10px;
      position: relative;
      text-align: right;
      @include borderTop;
      a {
        display: inline-block;
        position: relative;
        padding: 5px 10px;
        border-radius: 3px;
        overflow: hidden;
        margin-left: 10px;
        color: $mainColor;
        @include border($borderColor: $mainColor);
      }
    }
    &.merge-pay {
      .shop-info {
        padding-left: 40px;
      }
      &:last-of-type {
        margin-bottom: 60px;
      }
    }
  }
</style>

<template lang='jade'>
  section.order-shop(
    :class='{"merge-pay": status == 1}'
  )
    a.icon-big-check(
      v-if='status == 1',
      :data-checked='orderShop.checked',
      :data-grand_total='orderShop.grand_total',
      :class='{active: orderShop.checked}',
      @click='toggleChecked(orderShop.grand_total)'
    )
      em.icon-cart-check
    router-link.shop-info(
      :to='{name: "shop", params: {shopId: orderShop.store_id}}'
    )
      em.icon-shop
      span.shop-name
        span(v-text='orderShop.store_info.store_name')
        em
      span.order-state(v-text='orderShop.status_label')
    router-link.goods-info(
      :to="{name: 'orderInfo', params: {orderId: orderShop.entity_id, incrementId: orderShop.increment_id}}"
    )
      .goods(
        v-for='goods in orderShop.items',
        :class='{"carts-activity-tags": goods.activity_tags && goods.activity_tags.length > 0}'
      )
        span.topic(:style = '{backgroundImage: "url(" + goods.product_info.default_media_gallery_thumb + ")"}')
        span.goods-price(
          v-if='goods.product_original_price',
          v-text='"¥" + goods.product_original_price'
        )
        span.goods-num(v-text='"×" + goods.ordered_qty')
        h5.goods-name(v-text='goods.product_name')
        .activity-tags(v-if='goods.activity_tags')
          span(
            v-for='tag in goods.activity_tags',
            v-text='tag.sell_tag'
          )
      .order-price
        .discount-total(v-text='"优惠合计: -¥" + orderShop.discount_amount')
        .order-sum
          span 实付金额:
          strong(v-text='"¥" + orderShop.grand_total')
    .btn-box(v-if='showStatus(orderShop)')
      a(
        v-if='orderShop.status === "pending_payment"',
        v-text='"付款"',
        @click='pay(orderShop.entity_id)'
      )
      a(
        v-if='orderShop.status === "closed" || orderShop.status === "canceled" || orderShop.status === "complete"',
        v-text='"再次购买"',
        @click='buyAgain'
      )
      a(
        v-if='orderShop.status === "pending_receiving" && (!orderShop.refund_info || (orderShop.refund_info && orderShop.refund_info.refund_status !== "pending"))',
        v-text='"确认收货"',
        @click='toggleModal({ type: "confirmReceipt", params: { id: orderShop.entity_id } })'
      )
</template>

<script lang='babel'>
  import * as apis from '../../store/apis';
  export default {
    props: ['status', 'orderShop'],
    computed: {
      ...Vuex.mapGetters(['payPrice', 'payCount'])
    },
    data() {
      return {
        orderIds: [],
      }
    },
    methods: {
      ...Vuex.mapActions(['toggleModal']),
      showStatus(_t) {
        // this.orderShop.refund_info:
          // null - 没有申请过退货
          // status:
            // pending - 退货审核中 - 什么都不显示
            // denied - 拒绝退货 - 显示'再次购买'按钮
            // approve - 同意退货 - 什么都不显示

        if (_t.refund_info && _t.refund_info.refund_status == 'pending') {
          return false;
        }
        switch (_t.status) {
          // 待支付 - 显示'付款'按钮
          case "pending_payment":
            return true;
          // 待发货 - 什么都不显示
          case "pending_shipment":
            return false;
          // 待收货 - 显示'确认收货'按钮
          case "pending_receiving":
            return true;
          // 已完成 - 显示'再次购买'按钮
          case "complete":
            return true;
          // 已退货 - 什么都不显示
          case "refunded":
            return false;
          // 已取消 - 显示'再次购买'按钮
          case "canceled":
            return true;
          // 已关闭 - 显示'再次购买'按钮
          case "closed":
            return true;
        }

        return true;
      },
      pay(orderId) {
        this.orderIds.push(orderId);
        self.location.href = `/pay?order_ids=${this.orderIds.join(',')}`;
      },
      toggleChecked(price) {
        this.$emit('shop-checked-event');
        let totalPrice = this.payPrice;
        let number = this.payCount;
        if (this.orderShop.checked) {
          number += 1;
          totalPrice += self.Number(price);
        } else {
          number -= 1;
          totalPrice -= self.Number(price);
        }
        this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
      },
      // 再次购买
      buyAgain() {
        if (+this.orderShop.store_info.starting_price > +this.orderShop.base_grand_total) {
          self.toast('购买商品不满足起送金额哟, 请重新选择吧!');
          return;
        }

        let goods = {}
        self.sessionStorage.clear();
        this.orderShop.items.map(item => {
          if (item.is_gift) return;
          goods[item.store_product_id] = item.ordered_qty;
        });
        self.sessionStorage.setItem('goods', self.JSON.stringify(goods));
        self.sessionStorage.setItem('buyNow', true);
        this.$router.push({
          name: 'confirm'
        });
      },
    }
  }
</script>
