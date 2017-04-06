<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .shop-list-warpper {
    background-color: #fff;
    padding-top: 50px;
    .search {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      @include borderBottom;
      .input {
        width: 100%;
        background-color: #e5e5e5;
        border-radius: 3px;
        padding: 5px 10px;
      }
    }
    .item {
      display: block;
      padding: 10px $margin;
      position: relative;
      overflow: hidden;
      @include borderBottom($left: $margin);
    }
    .topic {
      float: left;
      width: 70px;
      height: 70px;
      margin-right: 10px;
      border-radius: 3px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name,
    .shop-info {
      overflow: hidden;
    }
    .name {
      font-size: 16px;
      @include ellipsis;
    }
    .shop-info {
      position: absolute;
      bottom: 10px;
      left: $margin;
      margin-left: 80px;
      color: $darkenGrayColor;
      span {
        display: inline-block;
        vertical-align: middle;
        &:first-child {
          min-width: 120px;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.shop-list-warpper
    form.search(
      @submit.prevent='getShopList(true)'
    )
      input.input(
        type="text",
        v-model='store_name',
        placeholder='搜索商家'
      )
    router-link.item(
      v-for='item in items',
      :to='{name: "shop", params: {shopId: item.store_id}}'
    )
      span.topic(
        :style='{backgroundImage: "url(" + item.logo + ")"}'
      )
      h4.name(v-text='item.store_name')
      p.shop-info
        span(v-text='"起送金额 " + item.starting_price +  " 元"')
        span(v-text='"商品: " + item.items_num +  "款"')
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        store_name: '',
        items: [],
        totalRows: 0,

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    methods: {
      getShopList(type = false) {
        // 如果 type 存在说明执行的 submit事件, 需要将分页重置为 第一页
        if (type) {
          this.page = 0;
          this.loadingEl = null;
          self.document.body.scrollTop = 0;
          // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
          self.document.removeEventListener('scroll', this.next);
        }
        const body = {
          api: 'store',
          method: 'get_store_items',
          store_name: this.store_name,
          page: +this.page + 1
        }
        self.DD.loading();
        self.DD.get(body, (data) => {
          this.scrollToggle = true;
          if (data.result === 'success') {
            if (this.loadingEl) {
              this.loadingEl.style.display = 'none';
            }

            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.items = data.info.items;
            } else {
              this.items = this.items.concat(data.info.items);
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
          } else {
            self.toast(data.info.errmsg);
          }
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
            this.getShopList();
          }
        }
      },
    },
    mounted() {
      const query = this.$route.query;
      if (query.keywords) {
        this.store_name = query.keywords;
      }
      this.scrollEl = self.document.querySelector('.shop-list-warpper');
      this.getShopList();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>