<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .im-list-wrapper {
    .item {
      display: block;
      overflow: hidden;
      background-color: #fff;
      position: relative;
      padding: 10px;
      @include borderTop($left: 60px);
      &:last-child {
        @include borderBottom;
      }
    }
    .topic {
      float: left;
      width: 45px;
      height: 45px;
      border-radius: 3px;
      margin-right: 5px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      text-align: center;
      background-color: #538eca;
      em {
        margin-top: 12px;
      }
    }
    .title,
    .des {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .title {
      margin-top: 3px;
      margin-bottom: 5px;
      padding-right: 70px;
    }
    .des {
      color: $darkenGrayColor;
    }
    .time {
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 12px;
    }
  }
</style>

<template lang='jade'>
  .wrapper.im-list-wrapper
    div(v-if='pageCount > 0')
      a.item(
        v-for='item in items',
        :href='item.info_url'
      )
        span.topic
          em.icon-set.icon-40
        h4.title(v-text='item.title')
        p.des
          time(v-text='item.created_at')
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

        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    methods: {
      getList() {
        const body = {
          api: 'notice',
          method: 'get_notice_items_by',
          page: this.page + 1
        }

        self.DD.loading();
        self.DD.get(body, data => {
          this.scrollToggle = true;
          if (data.result === 'success') {
            // 如果为第一页，是清空数据，大于1则是追加数据
            if (this.page === 0) {
              this.items = data.info.items;
            } else {
              this.items = this.items.concat(data.info.items);
            }
            this.page = data.info.page;
            this.pageCount = data.info.pageCount;

            if (this.loadingEl && this.loadingEl.parentElement) {
              this.scrollEl.removeChild(this.loadingEl);
            }

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
        if (self.DD.height + scrollTop + 20 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.getList();
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.im-list-wrapper');
      this.getList();
    },
    beforeDestroy() {
      // 在销毁的时候, 一定要先卸载当前组件的 scroll 事件, 不然的话, 在所有组件下都会触发当前组件的 scroll 事件
      self.document.removeEventListener('scroll', this.next);
    }
  }
</script>
