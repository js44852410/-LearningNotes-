<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .order-wrapper {
    padding: 49px 0 50px;
    .tab-box{
      width: 100%;
      background-color: #fff;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      font-size: 0;
      text-align: center;
      @include borderBottom;
      .item {
        display: inline-block;
        line-height: 50px;
        position: relative;
        width: (100% / 6);
        font-size: 14px;
        &.active {
          color: $mainColor;
          z-index: 2;
          &:before {
            content: '';
            height: 3px;
            background-color: $mainColor;
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
          }
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.order-wrapper
    nav.tab-box
      router-link.item(
        :to="{name: 'myOrder', params: {status: 0}}" replace
      ) 全部
      router-link.item(
        :to="{name: 'myOrder', params: {status: 1}}" replace
      ) 待付款
      router-link.item(
        :to="{name: 'myOrder', params: {status: 2}}" replace
      ) 待发货
      router-link.item(
        :to="{name: 'myOrder', params: {status: 3}}" replace
      ) 待收货
      router-link.item(
        :to="{name: 'myOrder', params: {status: 4}}" replace
      ) 已完成
      router-link.item(
        :to="{name: 'myOrder', params: {status: 5}}" replace
      ) 退货
    item(
      v-if='totalRows > 0',
      v-for='orderShop in orderList',
      :order-shop='orderShop',
      @shop-checked-event='changeShopChecked(orderShop)',
      :status='status'
    )
    payment(
      v-if='totalRows > 0 && status == 1',
      @order-list-event='initAttrChecked',
      :count='count',
      :order-list='orderList'
    )
    not-found(v-if='totalRows == 0')
      p 你还没有相关的订单!
    nav-bar
    modal(
      v-if='modalToggle'
    )
      p(slot='content') 确认订单收货?
</template>

<script lang='babel'>
  import Item from './item.vue';
  import Payment from './payment.vue';
  import NotFound from '../common/notFound.vue';
  import NavBar from '../common/navBar.vue';
  import Modal from '../common/modal.vue';
  import * as apis from '../../store/apis';
  export default {
    components: {
      Item,
      NotFound,
      NavBar,
      Modal,
      Payment
    },
    data() {
      return {
        orderList: [],
        status: 0,
        totalRows: 0,

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,

        count: 0,
      }
    },
    computed: {
      ...Vuex.mapGetters(['modalToggle']),
    },
    watch: {
      ['$route']() {
        this.status = this.$route.params.status || 0;
        this.getOrderList(true);
      }
    },
    methods: {
      ...Vuex.mapActions(['hideModal']),
      changeShopChecked(shop){
        Vue.set(shop, 'checked', !shop.checked)
      },
      initAttrChecked(checked) {
        let totalPrice = 0;
        const number = checked? this.count: 0;
        this.orderList.map(item => {
          Vue.set(item, 'checked', checked);
          if (checked) {
            totalPrice += self.Number(item.grand_total);
          }
        });
        this.$store.dispatch('setOrderPay', { price: totalPrice, count: number });
      },
      getOrderList(type = false){
        // 如果 type 存在说明执行的 click 事件, 需要将分页重置为 第一页
        if (type) {
          this.page = 0;
          this.loadingEl = null;
          self.document.body.scrollTop = 0;
          // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
          self.document.removeEventListener('scroll', this.next);
        }
        let statusArr = ['', 'pending_payment', 'pending_shipment', 'pending_receiving', 'complete'];
        const body = { ...apis.GET_ORDER_LIST };
        body.page = this.page + 1;
        body.status = statusArr[this.status];
        if (this.status == 5) {
          body.method ='get_buyer_refund_order_items';
        }

        self.DD.loading();
        self.DD.get(body, data => {
          this.scrollToggle = true;
          if (data.result === 'success') {
            if (this.loadingEl && this.loadingEl.parentElement) {
              this.scrollEl.removeChild(this.loadingEl);
            }
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.orderList = data.info.items;
            } else {
              this.orderList = this.orderList.concat(data.info.items);
            }

            this.totalRows = data.info.total_rows;
            this.page = data.info.page;
            this.pageCount = data.info.pageCount;

            this.loadingEl = self.document.createElement('div');
            this.loadingEl.className = 'next-loading';
            this.loadingEl.innerHTML = '努力加载中...';

            if (this.page != this.pageCount) {
              self.document.addEventListener('scroll', this.next);
            } else {
              self.document.removeEventListener('scroll', this.next);
            }

            if (this.status == 1) {
              this.count = this.orderList.length;
            } else {
              this.count = 0;
            }
            this.initAttrChecked(false);
          } else {
            self.toast(data.info.errmsg);
          }
        });
      },
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.loadingEl.style.display = 'block';
            this.getOrderList();
          }
        }
      },
    },
    created() {
      this.status = this.$route.params.status || 0;
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.order-wrapper');
      this.getOrderList();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
      this.hideModal();
    }
  };
</script>
