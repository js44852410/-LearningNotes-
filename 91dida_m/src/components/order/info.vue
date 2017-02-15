<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .order-info-wrapper{
    padding-bottom: 50px;
    .order-sn {
      padding: 10px;
      margin: 10px 0;
      position: relative;
      background-color: #fff;
      @include borderTop;
      @include borderBottom;
      overflow: hidden;
      strong {
        float: right;
        color: $mainColor;
      }
    }
    .sub-title {
      color: $priceColor;
      font-size: 12px;
      padding-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .goods {
      border-top: 0 none;
    }
    .goods-item {
      display: block;
      position: relative;
      @include borderTop;
      &:first-child {
        &:before {
          display: none;
        }
      }
    }
    .discount-amount {
      padding: 10px;
      position: relative;
      overflow: hidden;
      @include borderTop;
      span {
        color: $priceColor;
      }
      strong {
        float: right;
      }
    }
    .goods-info-price {
      position: relative;
      background-color: #fff;
      padding: 10px;
      text-align: right;
      overflow: hidden;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .item {
        margin-bottom: 5px;
        &:last-child {
          font-size: 16px;
          margin-bottom: 0;
        }
      }
      .title {
        float: left;
      }
      strong {
        color: $priceColor;
      }
    }
    .pay-method,
    .remarks,
    .process {
      padding: 10px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      strong {
        float: right;
      }

    }
    .remarks {
      p:first-child {
        margin-bottom: 5px;
      }
      .title {
        margin-right: 5px;
      }
    }
    .process {
      color: $darkenGrayColor;
      .express {
        span {
          margin-right: 5px;
        }
      }
    }
    .contact {
      background-color: #fff;
      font-size: 0;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      a {
        font-size: 14px;
        display: inline-block;
        padding: 10px 0;
        position: relative;
        text-align: center;
        width: 50%;
        em {
          $size: (34px/2);
          width: $size;
          height: $size;
          margin-right: 5px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
        &:first-child {
          @include borderRight($top: 5px, $bottom: 5px);
        }
      }
    }
    .refund {
      position: relative;
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      .title {
        position: relative;
        padding-left: 70px;
        margin-bottom: 10px;
        overflow: hidden;
        span {
          position: absolute;
          left: 0;
          top: 7px;
        }
        input {
          padding: 5px 10px;
          border: 1px solid $borderColor;
          width: 100%;
          pointer-events: none;
        }
        select {
          position: absolute;
          left: 70px;
          top: 0;
          bottom: 0;
          opacity: 0.01;
          width: 100%;
        }
      }
      textarea {
        padding: 5px 10px;
        border: 1px solid $borderColor;
        height: 80px;
        width: 100%;
      }
    }
    .refund-process {
      position: relative;
      background-color: #fff;
      margin-bottom: 10px;
      @include borderBottom;
      li {
        position: relative;
        padding: 10px;
        overflow: hidden;
        @include borderTop;
        .title {
          float: left;
          margin-right: 5px;
        }
        .con {
          overflow: hidden;
        }
      }
      .refuse {
        color: $priceColor;
      }
    }
    .cashback {
      background-color: #fff;
      position: relative;
      margin-bottom: 10px;
      padding: 10px 10px 10px 35px;
      @include borderTop;
      @include borderBottom;
      .icon-cashback {
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
      .price {
        color: $priceColor;
        margin-bottom: 3px;
      }
      .tips {
        color: $darkenGrayColor;
        font-size: 12px;
      }
    }
  }
  .order-info-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    text-align: right;
    z-index: 1;
    @include borderTop;
    a {
      display: inline-block;
      vertical-align: middle;
      padding: 5px 10px;
      margin: 10px 10px 7px 0;
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      @include border($borderColor: $grayColor);
    }
    .btn-again {
      color: $mainColor;
      &:before {
        border-color: $mainColor;
      }
    }
  }
  .fake-modal {
    .modal-content {
      text-align: left;
      font-size: 12px;
    }
    p {
      margin-bottom: 5px;
      text-indent: 2em;
      a {
        color: $mainColor;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.order-info-wrapper
    .order-sn
      span(v-text='"订单号: " + orderInfo.increment_id')
      strong(
        v-if='orderInfo.refund_info',
        v-text='orderInfo.refund_info.refund_status_label'
      )
      strong(
        v-else,
        v-text='orderInfo.status_label',
      )
    article.consignee-wrapper(v-if='!refund')
      em.icon-consignee.icon-36
      span 收货人信息
      a.consignee-info
        span.name(v-text='addressInfo.addressee')
        span.mobile(v-text='addressInfo.mobilephone')
        p(v-text='addressInfo.addressDetail')
    ul.refund-process(v-if='orderInfo.refund_info')
      li(v-if='orderInfo.refund_info.refund_reason')
        span.title 退货原因:
        .con(v-text='orderInfo.refund_info.refund_reason.reason')
      li
        span.title 退货备注:
        .con(v-text='orderInfo.refund_info.comment')
      li.refuse(v-if='orderInfo.refund_info.refund_status === "denied"')
        span.title 拒绝退货:
        .con(v-text='orderInfo.refund_info.note || "无"')
      li.refuse(v-if='orderInfo.refund_info.refund_status === "approve"')
        span.title 同意退货:
        .con(v-text='orderInfo.refund_info.note || "无"')
    section.order-shop
      //- :to='"/shop/" + storeInfo.entity_id + "/home"'
      router-link.shop-info(
        :to='{name: "shop", params: {shopId: storeInfo.entity_id}}'
      )
        em.icon-shop
        span.shop-name
          span(v-text='storeInfo.store_name')
        em.icon-more
      .goods-info
        a.goods-item(
          v-for='goods in goodsList',
          @click='viewGoodsInfo(storeInfo.entity_id, goods.store_product_id, goods.is_gift)'
        )
          .goods(
            :class='{"carts-activity-tags": goods.activity_tags && goods.activity_tags.length > 0}'
          )
            span.topic(:style = '{backgroundImage: "url(" + goods.product_info.default_media_gallery_thumb + ")"}')
            span.goods-price(
              v-if='goods.product_original_price',
              v-text='"¥" + goods.product_original_price'
            )
            span.goods-num(v-text='"×" + goods.ordered_qty')
            h5.goods-name(v-text='goods.product_info.product_name')
            p.sub-title(v-text='goods.product_info.store_product_sub_title')
            .activity-tags(v-if='goods.activity_tags')
              span(
                v-for='tag in goods.activity_tags',
                v-text='tag.sell_tag'
              )
          .discount-amount(v-if='!goods.is_gift')
            span(v-text='"优惠: -¥" + goods.item_discount_amount')
            strong(v-text='"小计: ¥" + goods.item_amount')
    ul.goods-info-price
      li.item(v-if='orderInfo.base_grand_total')
        span.title 商品总额
        span.price {{orderInfo.base_grand_total | formatAmount}}
      li.item(v-if='orderInfo.product_discount_total')
        span.title 单品优惠合计
        span.price(v-text='"-¥" + orderInfo.product_discount_total')
      li.item(v-if='orderInfo.base_discount_amount')
        span.title 整单优惠
        span.price(v-text='"-¥" + orderInfo.base_discount_amount')
      li.item(v-if='orderInfo.coupon_price')
        span.title 优惠券
        span.price(v-text='"-¥" + orderInfo.coupon_price')
      li.item(v-if='orderInfo.use_pocket_money')
        span.title 零钱抵扣
        span.price(v-text='"-¥" + orderInfo.use_pocket_money')
      li.item(v-if='orderInfo.grand_total')
        span 实付金额:
        strong.price {{orderInfo.grand_total | formatAmount}}
    .cashback(v-if='orderInfo.cashback_amount > 0')
      em.icon-cashback
      p.price(v-text='"本单可返现 ¥" + orderInfo.cashback_amount')
      p.tips 确认收货后, 返现会打入您的账户中
    .pay-method(v-if='!refund')
      span 付款方式
      strong(v-if="orderInfo.payment_method == 'online'")
        label 在线支付
        em(v-if='orderInfo.payment_module_code === "alipay"') - 支付宝支付
        em(v-if='orderInfo.payment_module_code === "wxpay"') - 微信支付
        em(v-if='orderInfo.payment_module_code === "yeepay"') - 易宝支付
      strong(
        v-if="orderInfo.payment_method == 'offline'"
      ) 货到付款
    .remarks(v-if='!refund')
      p
        span.title 买家备注:
        span(v-text='orderInfo.order_comment || "无"')
      p
        span.title 卖家备注:
        span(v-text='orderInfo.order_note || "无"')
    ul.process(v-if='!refund')
      li.item.express(v-if='orderInfo.express')
        span.title 配送员信息:
        span(v-text='orderInfo.express.staff_info.express_company')
        span(v-text='orderInfo.express.staff_info.staff_name')
        a(
          v-text='orderInfo.express.staff_info.mobilephone',
          :href='"tel: " + orderInfo.express.staff_info.mobilephone'
        )
      li.item(v-for='item in orderInfo.history')
        span.title(v-text='item.comment + ": "')
        span(v-text='item.created_at')
    aside.refund(v-if='refundToggle')
      .title
        span 退货原因:
        input(v-model='activeReason')
        select(
          v-model='reasonId',
          @change='chooseReason($event)'
        )
          option 请选择一个退货原因
          option(
            v-for='item in refundItems',
            :value='item.id'
          ) {{item.reason}}
      textarea(v-model='comment')
    .contact
      a.contact-seller(:href='"tel: " + storeInfo.company_linkman_phone')
        em.icon-order-seller
        span 联系卖家
      a.service(href='tel:4000798798')
        em.icon-order-service
        span 客服电话
    footer.order-info-footer
      a(
        v-if='!refund && orderInfo.allow_fake == 1 && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status != "pending"))',
        @click='modalEvent({ modalType: 3, type: "applyCompensation", params: { id: orderId }, options: { className: "fake-modal" } })',
      ) 假货先赔
      a(
        @click='modalEvent({ modalType: 2, type: "getRefundReason" })',
        :class='{"btn-again": refundToggle}',
        v-if='(orderInfo.allow_refund == 1 && !orderInfo.refund_info && !refundToggle)'
      ) 申请退货
      a.btn-again(
        v-if='(orderInfo.allow_refund == 1 && !orderInfo.refund_info && refundToggle)',
        @click='submitRefund({ id: orderId, comment: comment, reasonId: reasonId })'
      ) 申请退货
      a(
        @click='modalEvent({ modalType: 2, type: "getRefundReason" })',
        v-if='orderInfo.allow_refund == 1 && !refundToggle && (orderInfo.refund_info && orderInfo.refund_info.refund_status === "denied")'
      ) 再次退货
      a.btn-again(
        @click='submitRefund({ id: orderId, comment: comment, reasonId: reasonId })',
        v-if='orderInfo.allow_refund == 1 && refundToggle && (orderInfo.refund_info && orderInfo.refund_info.refund_status === "denied")'
      ) 再次退货
      a(
        @click='modalEvent({ modalType: 4, type: "cancelOrder", params: {id: orderId} })',
        v-if='orderInfo.status === "pending_payment"'
      ) 取消订单
      a.btn-again(
        v-if='!refund && orderInfo.status === "complete" || orderInfo.status === "refunded" && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status != "pending"))',
        @click='buyAgain'
      ) 再次购买
      a.btn-again(
        v-if='orderInfo.status === "pending_payment"',
        @click='pay(orderInfo.entity_id)'
      ) 付款
      a.btn-again(
        v-if='!refund && orderInfo.status === "pending_receiving" && (!orderInfo.refund_info || (orderInfo.refund_info && orderInfo.refund_info.refund_status !== "pending"))',
        @click='modalEvent({ modalType: 1, type: "confirmReceipt", params: { id: orderId } })'
      ) 确认收货
    modal(
      v-if='modalToggle',
    )
      p(
        v-if='modalType === 1',
        slot='content'
      ) 确认订单收货?
      p(
        v-if='modalType === 2',
        slot='content'
      ) 确认要退货吗?
      div(
        v-if='modalType === 3',
        slot='content'
      )
        p 亲，您已对订单 ({{orderInfo.increment_id}}) 申请假货先赔，当您点击“假货先赔”按钮时，即已明确：
        p (1). 订单 ({{orderInfo.increment_id}}) 立刻开启假货先赔处理，市场督查人员和品牌厂家会立即组织对问题货品的封存和假货鉴定，您需要全力配合做好货物封存和鉴定工作；
        p (2). 若订单 ({{orderInfo.increment_id}}) 确属假货，邸达会直接在卖家账户扣除相应订单款项，并直接打款给您 (由于银行不同，货款会在1个工作日内退回到您的帐户) ，并且邸达会协助您做好理赔工作；您的信用评级由此可以获得提升，也有机会收获更多的优惠政策信息；
        p (3). 若订单 ({{orderInfo.increment_id}}) 鉴定并非假货，需要您承担卖家的物流配送费用，具体金额由双方约定；
        p
          span (4). 您有任何疑问，请随时致电邸达，
          a(href='tel: 4000798798') 4000-798-798.
        p 如您已明确以上信息，请点击“确认”提交假货先赔申请。
      p(
        v-if='modalType === 4',
        slot='content'
      ) 确认要取消订单吗?
</template>

<script lang='babel'>
  import Modal from '../common/modal.vue';
  export default {
    components: {
      Modal,
    },
    data() {
      return {
        orderInfo: {},
        addressInfo: {},
        goodsList: [],
        storeInfo: {
          entity_id: 0,
        },
        orderId: 0,
        orderIds: [],

        refund: false,
        comment: '',
        reasonId: 0,
        activeReason: '请选择一个退货原因',
        reasons: [],
        // 1->确认收货
        // 2->确认退货
        // 3->假货先赔
        // 4->取消订单
        modalType: 0,

        modalToggle: false,
        refundToggle: false,
        cancelToggle: false,
      }
    },
    computed: {
      ...Vuex.mapGetters(['modalToggle', 'refundItems', 'refundToggle']),
    },
    methods: {
      ...Vuex.mapActions(['submitRefund', 'toggleModal', 'hideModal']),
      modalEvent({ modalType = 0, type = '', params = {}, options = {} } = {}) {
        this.modalType = modalType;
        this.toggleModal({ type, params, options });
      },
      getOrderInfo() {
        const body = {
          api: 'sales_order',
          method: 'get_buyer_order_item',
          id: this.orderId,
          increment_id: this.$route.params.incrementId
        };
        self.DD.loading();
        self.DD.get(body, (data) => {
          if (data.result === 'success') {
            Vue.set(this, 'orderInfo', data.info);
            Vue.set(this, 'addressInfo', data.info.address);
            Vue.set(this, 'goodsList', data.info.items);
            Vue.set(this, 'storeInfo', data.info.store_info);
            this.addressInfo.addressDetail = data.info.address.province + data.info.address.city + data.info.address.county + data.info.address.street;
           }else{
            self.toast(data.info.errmsg);
           }
        });
      },
      viewGoodsInfo(shopId, goodsId, isGift) {
        if (isGift) return;
        this.$router.push({
          name: "goodsInfo",
          params: {
            shopId,
            goodsId,
          }
        })
      },
      // 去支付
      pay(orderId) {
        this.orderIds.push(orderId);
        self.location.href = `/pay?order_ids=${this.orderIds.join(',')}`;
      },
      chooseReason($event) {
        this.activeReason = $event.target.selectedOptions[0].text;
      },
      // 再次购买
      buyAgain() {
        if (+this.storeInfo.starting_price > +this.orderInfo.base_grand_total) {
          self.toast('购买商品不满足起送金额哟, 请重新选择吧!');
          return;
        }
        let goods = {}
        self.sessionStorage.clear();
        this.goodsList.map(item => {
          if (item.is_gift) return;
          goods[item.store_product_id] = item.ordered_qty;
        });
        self.sessionStorage.setItem('goods', self.JSON.stringify(goods));
        self.sessionStorage.setItem('buyNow', true);
        this.$router.push({
          name: 'confirm'
        });
      }
    },
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrderInfo();
    },
    beforeDestroy() {
      this.hideModal();
    }
  };
</script>
