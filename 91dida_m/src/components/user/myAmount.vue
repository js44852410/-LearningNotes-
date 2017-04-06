<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .my-amount-wrapper {
    .header {
      height: 160px;
      line-height: 160px;
      color: #fff;
      text-align: center;
      background: #2cb49a;
      background: -webkit-linear-gradient(-135deg, #2cb49a 0%, #7393a6 85%);
      background: -webkit-linear-gradient(225deg, #2cb49a 0%, #7393a6 85%);
      background: linear-gradient(-135deg, #2cb49a 0%, #7393a6 85%);
      font-size: 42px;
    }
    dt {
      color: $grayColor;
      padding: 15px 10px 10px;
    }
    dd {
      position: relative;
      padding: 10px;
      background-color: #fff;
      @include borderBottom;
    }
    h4 {
      margin-bottom: 5px;
    }
    p {
      font-size: 12px;
      color: $darkenGrayColor;
    }
    .icon {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      height: 15px;
      margin: auto 0;
      color: $priceColor;
      &.green {
        color: $mainColor;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.my-amount-wrapper
    .header {{amount | formatAmount}}
    dl(v-if='items.length > 0')
      dt 近期流水记录
      dd(v-for='item in items')
        h4(v-text='item.type_name')
        p(v-text='item.created_at')
        span.icon(
          :class='{green: item.type == "1"}',
          v-text='item.money'
        )
    not-found(v-else)
      p 您还没有零钱记录哟~
</template>

<script lang='babel'>
  import NotFound from '../common/notFound.vue';
  export default {
    components: {
      NotFound,
    },
    data() {
      return {
        items: [],
        amount: 0,
        totalRows: 0,

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    methods: {
      getAmountList() {
        const body = {
          api: 'customer',
          method: 'get_buyer_amount_logs',
          page: +this.page + 1
        }
        self.DD.get(body, (data) => {
          this.scrollToggle = true;
          if (data.result === 'success') {
            if (this.loadingEl) {
              this.loadingEl.style.display = 'none';
            }
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.amount = data.info.amount;
              this.items = data.info.item;
              this.totalRows = data.info.total_rows;
            } else {
              this.items = this.items.concat(data.info.item);
            }
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
            this.getAmountList();
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.my-amount-wrapper');
      self.DD.loading();
      this.getAmountList();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
