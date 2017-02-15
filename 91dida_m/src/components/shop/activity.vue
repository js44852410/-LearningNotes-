<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .shop-activity-wrapper {
    .banner {
      padding-top: 45%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-background-size: cover;
      background-size: cover;
      margin-bottom: 10px;
    }
    .content {
      background-color: #fff;
      margin-bottom: 10px;
      p {
        padding: 10px;
      }
    }
    .title {
      position: relative;
      padding: 10px;
      font-size: 16px;
      text-align: center;
      @include borderBottom;
    }
    .goods {
      background-color: #fff;
    }
    .product-item-wrapper  {
      .item {
        width: 50%;
        margin-top: 0;
        @include borderBottom;
        &:nth-child(even) {
          margin-left: 0;
        }
        &:nth-child(odd) {
          margin-right: 0;
          @include borderRight;
        }
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.shop-activity-wrapper
    .banner(:style='{backgroundImage: "url(" + banner + ")"}')
    .content
      h3.title 活动简介
      p(v-text='content')
    .goods
      h3.title 活动商品
      goods-item(
        :goods-data="items"
      )
</template>

<script lang='babel'>
  import GoodsItem from '../goods/goodsItem.vue';
  export default {
    components: {
      GoodsItem,
    },
    data() {
      return {
        banner: '',
        content: '',
        items: [],
        activityId: 0,

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    methods: {
      getActivityInfo() {
        const body = {
          api: 'activity',
          method: 'get_activity_item',
          activity_id: this.activityId,
          page: this.page + 1,
        };
        self.DD.loading();
        self.DD.get(body, (data) => {
          this.scrollToggle = true;
          if (data.result === 'success') {
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page == 0) {
              this.banner = data.info.banner;
              this.content = data.info.content;
              this.items = data.info.product_items.items;
              self.DD.setTitle(data.info.title);
            } else {
              this.items = this.items.concat(data.info.product_items.items);
            }

            if (this.loadingEl) {
              this.loadingEl.style.display = 'none';
            }

            this.page = +data.info.product_items.page;
            this.pageCount = +data.info.product_items.pageCount;

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
            this.getActivityInfo();
          }
        }
      },
    },
    beforeCreate() {
      self.DD.setTitle('');
    },
    mounted() {
      this.activityId = this.$route.params.id;
      this.scrollEl = self.document.querySelector('.shop-activity-wrapper');
      this.getActivityInfo();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
