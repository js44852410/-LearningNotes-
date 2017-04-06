<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .brand-list-warpper {
    font-size: 0;
    padding-top: 50px;
    background-color: #fff;
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
      font-size: 14px;
      @include borderBottom;
      .input {
        width: 100%;
        background-color: #e5e5e5;
        border-radius: 3px;
        padding: 5px 10px;
      }
    }
    .item {
      display: inline-block;
      position: relative;
      width: 33.33333333%;
      padding-top: 33.33333333%;
      @include borderRight;
      @include borderBottom;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-background-size: cover;
      background-size: cover;
      &:nth-child(3n) {
        &:before {
          display: none;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.brand-list-warpper
    form.search(
      @submit.prevent='getBrandList(true)'
    )
      input.input(
        type="text",
        v-model='name',
        placeholder='搜索品牌'
      )
    .content(v-if='pageCount > 0')
      router-link.item(
        v-for='item in items',
        :to='{name: "goodsList", query: {brand_id: item.brand_id}}',
        :style='{backgroundImage: "url(" + item.brand_icon + ")"}'
      )
    not-found(v-else)
      p 未查询到相关数据!
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
        name: '',

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    methods: {
      getBrandList(type = false) {
        // 如果 type 存在说明执行的 submit事件, 需要将分页重置为 第一页
        if (type) {
          this.page = 0;
          this.loadingEl = null;
          self.document.body.scrollTop = 0;
          // 一定要先卸载上一个状态的 scroll 事件, 不然的话, 会重复执行 scroll 事件
          self.document.removeEventListener('scroll', this.next);
        }
        const body = {
          api: 'brand',
          method: 'get_brand_items',
          brand_name: this.name,
          page: this.page + 1,
          pagesize: 20,
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
            this.page = +data.info.page;
            this.pageCount = +data.info.pageCount;

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
            this.getBrandList();
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.brand-list-warpper');
      this.getBrandList();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
