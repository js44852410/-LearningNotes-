<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .confirm-order-wrapper {
    padding-bottom: 50px;
    em[class^='icon-'] {
      vertical-align: middle;
      margin-right: 5px;
      width: 19px;
      height: 19px;
      & + span {
        vertical-align: middle;
      }
    }
    .pay-container {
      background-color: #fff;
      margin-bottom: 10px;
      position: relative;
      padding-top: 10px;
      @include borderTop;
      @include borderBottom;
      .icon-pay {
        margin-left: 10px;
      }
      .online {
        margin-top: 10px;
      }
      .pay {
        overflow: hidden;
        position: relative;
        display: block;
        padding: 10px;
        @include borderTop;
        span {
          float: left;
        }
        em {
          float: right;
        }
      }
    }
    .shop {
      margin-bottom: 10px;
      position: relative;
      background-color: #fff;
      @include borderTop;
      @include borderBottom;
      .title {
        position: relative;
        .checked {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          padding: 10px;
          z-index: 1;
        }
        .shop-name {
          display: block;
          padding-right: 20px;
        }
      }
      .border {
        position: relative;
        @include borderBottom;
        padding: 10px;
      }
    }
    .coupon {
      display: block;
      strong {
        vertical-align: middle;
        color: $mainColor;
        margin-left: 5px;
      }
      .null {
        position: absolute;
        right: 30px;
        top: 50%;
        margin-top: -10px;
        color: $darkenGrayColor;
        &.choose {
          color: $mainColor;
        }
      }
    }
    .total {
      padding: 10px;
    }
    .item {
      padding: 10px 10px 10px 90px;
      position: relative;
      display: block;
      min-height: 70px;
      @include borderBottom;
      .topic {
        width: 70px;
        height: 70px;
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: 10px;
        margin-top: -35px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      }
      .name {
        margin-bottom: 3px;
      }
      .sub-title {
        font-size: 12px;
        margin-bottom: 3px;
        color: $darkenGrayColor;
      }
      .price {
        overflow: hidden;
        strong {
          float: left;
          color: $priceColor;
        }
        span {
          float: right;
          font-size: 12px;
          margin-top: 5px;
          color: $grayColor;
        }
      }
    }
    .total {
      text-align: right;
      .price {
        margin-left: 5px;
        color: $priceColor;
      }
    }
    .remarks {
      .input {
        height: 100%;
        left: 70px;
        right: 30px;
        top: 0;
        position: absolute;
        input {
          height: 100%;
          width: 100%;
        }
      }
    }
    .footer-settle {
      bottom: 0;
      padding-left: 0;
      text-align: left;
      em {
        margin-left: 10px;
      }
      &.cheap-tips-wrapper {
        line-height: 1;
        padding-top: 10px;
        .cheap-tips {
          font-size: 12px;
          margin-left: 10px;
          margin-top: 5px;
          color: $priceColor;
        }
        .btn-settle {
          line-height: 50px;
        }
      }
    }
    .pocket-money {
      display: block;
      background-color: #fff;
      position: relative;
      padding: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
      span, strong {
        vertical-align: middle;
      }
      strong {
        color: $priceColor;
        margin-left: 5px;
      }
      .icon-confirm {
        float: right;
      }
    }
  }
  .consignee-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    padding-top: 15px;
    background: #fff url(/src/images/envelope.png) 0 0 repeat-x;
    -webkit-background-size: auto 3px;
    background-size: auto 3px;
    .icon-consignee {
      margin-left: 10px;
      vertical-align: middle;
      margin-right: 5px;
      & + span {
        vertical-align: middle;
      }
    }
    .consignee-info {
      display: block;
      padding: 10px 10px 15px;
      margin-top: 10px;
      position: relative;
      @include borderTop;
      background: #fff url(/src/images/envelope.png) 0 100% repeat-x;
      -webkit-background-size: auto 3px;
      background-size: auto 3px;
      span {
        display: inline-block;
        vertical-align: middle;
        &:first-child {
          width: 65%;
        }
      }
      p {
        margin-top: 5px;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.confirm-order-wrapper
    article.consignee-wrapper
      em.icon-consignee.icon-36
      span 收货人信息
      a.consignee-info(
        @click='goAddress'
      )
        span.name(v-text='address.addressee')
        span.mobile(v-text='address.mobile_phone')
        p(v-text='address.addressDetail')
        em.icon-more
    article.pay-container
      em.icon-pay.icon-36
      span 请选择支付方式
      a.pay.online(
        :class='{active: pay_method === "online"}',
        @click='initPage("online", isUsePocket)'
      )
        span 在线支付
        em.icon-confirm.icon-36
      a.pay.offline(
        :class='{active: pay_method === "offline"}',
        @click='initPage("offline", isUsePocket)'
      )
        span 货到付款
        em.icon-confirm.icon-36
    a.pocket-money(
      v-if='use_pocket_money > 0',
      :class='{active: isUsePocket}',
      @click='initPage(pay_method, !isUsePocket)'
    )
      em.icon-confirm.icon-36
      span 零钱抵扣:
      strong(v-text='"¥" + use_pocket_money')
    section.shop(v-for='item in items')
      .title
        router-link.shop-name.border(
          v-text='item.store_name',
          :to='{name: "shop", params: {shopId: item.store_id}}'
        )
        em.icon-more
      a.item(
        v-for='goodsItem in item.items',
        @click='viewGoodsInfo(item.store_id, goodsItem.store_product_id, goodsItem.activity_tags)',
        :class='{"carts-activity-tags": goodsItem.activity_tags && goodsItem.activity_tags.length > 0}'
      )
        span.topic(
          :style='{backgroundImage: "url(" + goodsItem.default_media_gallery_thumb + ")"}'
        )
        h4.name(v-text='goodsItem.product_name')
        p.sub-title(
          v-if='goodsItem.store_product_sub_title',
          v-text='goodsItem.store_product_sub_title'
        )
        .activity-tags(v-if='goodsItem.activity_tags && goodsItem.activity_tags.length > 0')
          span(
            v-for='tag in goodsItem.activity_tags',
            v-text='tag.sell_tag'
          )
        .price
          strong(v-if='goodsItem.base_price') {{goodsItem.base_price | formatAmount}}
          span.num(v-text='"×" + goodsItem.qty')
      a.coupon.border(@click='chooseCoupon(item)')
        em.icon-coupon.icon-36
        span 优惠券
        strong(
          v-if='item.coupon_num > 0',
          v-text='item.coupon_num + "张可用"'
        )
        span.null(v-else) 无可用
        span.null(v-if='item.coupon_num && !item.using_coupon') 未使用
        span.null.choose(
          v-if='item.using_coupon && item.using_coupon.coupon_price',
        ) -{{item.using_coupon.coupon_price | formatAmount}}
        em.icon-more
      .remarks.border
        em.icon-remark.icon-36
        span 备注
        .input
          input(
            v-model='item.remark',
            maxlength='50',
            placeholder='请输入备注，50字以内',
            @change='setRemark(item.store_id, $event.target.value)'
          )
      .total
        span 合计:
        strong.price {{item.grand_total | formatAmount}}
    .footer-settle(
      :class='{"cheap-tips-wrapper": first_cheap_tips}'
    )
      em 应付金额:
      span.price {{sub_grand_total | formatAmount}}
      p.cheap-tips(
        v-if='first_cheap_tips',
        v-text='"首单减免: " + first_cheap_tips'
      )
      a.btn-settle(@click='createOrder') 确认订单
</template>

<script lang='babel'>
  import * as apis from '../../store/apis';
  export default {
    data() {
      return {
        address: {},
        items: [],
        pay_method: '',
        isUsePocket: 1,
        is_first: {},
        use_pocket_money: 0,
        sub_grand_total: 0,
        first_cheap_tips: '',
        type: '',

        goods: {},
        remarks: null,
      }
    },
    methods: {
      initPage(pay_method, isUsePocket) {
        // 切换支付方式后，将备注信息写到storage中
        // 从选择地址页或选择优惠券页回来，需要将storage中的数据写到vm中，如果存在的话
        if (this.remarks) {
          self.sessionStorage.setItem('remarks', self.JSON.stringify(this.remarks));
        } else {
          this.remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
        }
        this.goods = self.JSON.parse(self.sessionStorage.getItem('goods'));
        const buy_now = self.sessionStorage.getItem('buyNow');

        const body = {...apis.SETTLEMENT};
        body.address_id = this.$route.query.address_id || 0;
        body.pay_method = pay_method;
        body.is_clear_coupon = self.sessionStorage.getItem('isClear') || 0;
        body.is_use_pocket = +isUsePocket;
        // 从购物车进来，不需要goods咯
        if (buy_now) {
          this.type = 'buy_now';
          body.goods = this.goods;
        } else {
          delete body.goods;
          this.type = 'cart';
        }
        body.type = this.type;

        self.DD.loading();
        self.DD.get(body, (data) => {
          if (data.result === 'success') {
            this.address = data.info.address;
            this.items = data.info.items;
            this.is_first = data.info.first_full_cut;
            this.pay_method = data.info.pay_method;
            this.isUsePocket = +data.info.is_use_pocket;
            this.use_pocket_money = data.info.use_pocket_money;
            this.address.addressDetail = data.info.address.province + data.info.address.city + data.info.address.county + data.info.address.street;
            this.sub_grand_total = data.info.sub_grand_total;
            this.first_cheap_tips = data.info.first_cheap_tips;
            self.sessionStorage.setItem('payMethod', this.pay_method);
            self.sessionStorage.setItem('isUsePocket', this.isUsePocket);
          } else {
            self.toast(data.info.errmsg, {
              callback: function() {
                if (data.code === '0x8101') {
                  this.$router.replace({
                    name: 'cart'
                  });
                } else {
                  this.$router.replace({
                    name: 'home'
                  });
                }
              }.bind(this)
            });
          }
        })
      },
      getRemark() {
        const remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
        if (remarks) {
          this.items.map(item => {
            Vue.set(item, 'remark', remarks[item.store_id]);
          });
        }
      },
      goAddress() {
        const query = this.$route.query;
        query.from = 'confirm';
        query.pay_method = this.pay_method;
        this.$router.push({
          name: "addressList",
          query
        })
      },
      viewGoodsInfo(shopId, goodsId, activity) {
        if (activity && activity[0].is_show_detail === 0) return;
        this.$router.push({
          name: "goodsInfo",
          params: {
            shopId,
            goodsId,
          }
        })
      },
      chooseCoupon(vm) {
        if (!vm.coupon_num) {
          self.toast('暂无可用的优惠券哟~');
          return;
        }
        const productInfo = {
          store_id: 0,
          item: [],
        };

        productInfo.store_id = vm.store_id;
        vm.items.map((item) => {
          productInfo.item.push({
            num: item.qty,
            product_id: item.store_product_id
          });
        });
        self.sessionStorage.setItem('productInfo', self.JSON.stringify(productInfo));
        const query = this.$route.query;
        query.from = 'confirm';
        query.pay_method = this.pay_method;
        this.$router.push({
          name: "couponUse",
          query,
        })
      },
      setRemark(shopId, value) {
        this.remarks = this.remarks || {};
        this.remarks[shopId] = value;
      },
      createOrder() {
        if (this.checkedCount === 0) {
          self.toast('请选择购买商品~');
          return;
        }
        self.DD.loading();
        let comments = {};
        let coupon_detail_ids = {};
        this.items.map((item) => {
          if (item.remark) {
            comments[item.store_id] = item.remark;
          }
          if (item.using_coupon) {
            coupon_detail_ids[item.store_id] = item.using_coupon.coupon_detail_id;
          }
        })
        const orderGoods = {};
        this.items.map(item => {
          item.items.map(goods => {
            orderGoods[goods.store_product_id] = goods.qty;
          })
        })
        const body = {...apis.CREATED_NEW_ORDER};
        body.address_id = this.address.address_id;
        body.goods = orderGoods;
        body.type = this.type;
        body.pay_method = this.pay_method;
        body.comments = comments;
        body.coupon_detail_ids = coupon_detail_ids;
        body.use_pocket_money = this.isUsePocket? this.use_pocket_money: 0;

        self.DD.post(body, data => {
          self.sessionStorage.clear();
          if (data.result === 'success') {
            if (this.type === 'cart') {
              // 生成订单后需要重新计算购物车商品数量
              // 并且要将购物车商品总价重置为 0
              self.DD.get(apis.GET_CART_COUNT, res => {
                if (res.result === 'success') {
                  this.$store.dispatch('setCartsCount', res.info);
                }
              });
            }
            // 货到付款到待发货
            // 在线支付去合并付款页面
            if (this.pay_method === 'offline') {
              this.$router.replace({
                name: 'myOrder',
                params: {
                  status: 2
                }
              })
            } else {
              if (data.info.transfer_status === 'pending_shipment') {
                this.$router.replace({
                  name: 'myOrder',
                  params: {
                    status: 2
                  }
                })
              } else {
                self.sessionStorage.setItem('onlineIds', self.JSON.stringify(data.info.order_ids));
                this.$router.replace({
                  name: 'online',
                  params: {
                    status: 1,
                  }
                })
              }
            }
          } else {
            self.toast(data.info.errmsg);
          }
        })
      }
    },
    created() {
      this.pay_method = self.sessionStorage.getItem('payMethod') || 'offline';
      this.isUsePocket = self.sessionStorage.getItem('isUsePocket') || 1;
      this.initPage(this.pay_method, this.isUsePocket);
    },
    beforeDestroy() {
      self.sessionStorage.setItem('remarks', self.JSON.stringify(this.remarks));
    }
  }
</script>
