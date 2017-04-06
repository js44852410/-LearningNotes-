<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .search-home {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 50px;
    padding: 10px 45px 10px 10px;
    box-sizing: border-box;
    .input {
      width: 100%;
      color: #fff;
      background-color: rgba(255, 255, 255, .6);
      border-radius: 3px;
      padding: 5px 10px;
      &::-webkit-input-placeholder {
        color: #fff;
      }
    }
    .icon {
      width: 44px;
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      text-align: center;
      padding-top: 8px;
      p {
        font-size: 12px;
        color: #fff;
        margin-top: -5px;
      }
    }
    .back {
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 50px;
      display: none;
      em {
        left: 13px;
      }
    }
    &.show-hot {
      background-color: $mainColor;
      padding-left: 30px;
      input {
        color: #333;
        background-color: #fff;
        &::-webkit-input-placeholder {
          color: #666;
        }
      }
      .back {
        display: block;
      }
    }
    &.show-bg {
      background-color: $mainColor;
    }
  }
  .home-hot-keys {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 4;
    padding-top: 50px;
    text-align: center;
    overflow: auto;
    .title {
      padding: 10px;
      font-size: inherit;
      color: $darkenGrayColor;
      position: relative;
      text-align: left;
      @include borderBottom;
    }
    .item {
      display: block;
      position: relative;
      padding: 10px;
      font-size: 12px;
      text-align: left;
      @include borderBottom($left: $margin);
    }

    .search-item,
    .search-item {
      display: inline-block;
      vertical-align: middle;
      margin: 50px 20px 0;
      span {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 200px;
        margin-bottom: 5px;
        background-color: #d1d2d4;
      }
      em {
        margin-top: 13px;
      }
    }
    .icon-s-store {
      margin-left: 2px;
    }
  }
</style>

<template lang='jade'>
  div
    form.search-home(
      :class='{"show-hot": hotToggle}',
      :style='{background-color:rgba(230,0,18,scrollToggle)}',
      @submit.prevent='search'
    )
      a.back(
        @click='getBack'
      )
        em.icon-back
      input.input(
        type="search",
        v-model='keywords',
        placeholder='搜索商家/商品',
        @focus='getHotKey()'
      )
      a.icon.message(@click='goPage({name: "imList"})')
        em.icon-message.icon-40
        p 消息
    .home-hot-keys(v-if='hotToggle')
      h4.title 热搜关键词
      a.item(
        v-for='item in hotKeys',
        v-text='item.tag_label',
        @click='search(item.tag_label)'
      )
    .home-hot-keys(
      v-if='choiceToggle'
    )
      a.search-item(
        @click='search(keywords, "goods")'
      )
        span.goods
          em.icon-s-goods
        p 商品搜索
      a.search-item(
        @click='search(keywords, "shop")'
      )
        span.shop
          em.icon-s-store
        p 商家搜索
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        hotKeys: [],
        keywords: '',
        hotToggle: false,
        choiceToggle: false,
        scrollToggle: 0,
      }
    },
    watch: {
      keywords(val) {
        if (val) {
          this.choiceToggle = true;
        } else {
          this.choiceToggle = false;
        }
      }
    },
    methods: {
      goPage(router){
        this.$router.push(router);
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页消息`, 'click', `消息`]);
      },
      getHotKey() {
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页搜索`, 'focus', '输入框获取焦点']);
        if (this.hotKeys.length > 0) {
          this.hotToggle = true;
          return;
        }
        const body = {
          api: 'website',
          method: 'get_website_tags'
        };
        self.DD.get(body, data => {
          if (data.result === 'success') {
            this.hotKeys = data.info._items;
            this.hotToggle = true;
          }
        })
      },
      search(keywords, type) {
        this.keywords = this.keywords || keywords;
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页搜索`, 'search', `keywords=${this.keywords}&type=${type}`]);
        if (type === 'shop') {
          this.$router.push({
            name: 'shopList',
            query: {
              keywords: this.keywords
            }
          });
        } else {
          this.$router.push({
            name: 'goodsList',
            query: {
              keywords: this.keywords
            }
          });
        }
      },
      getBack() {
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页搜索`, 'click', '取消搜索']);
        this.keywords = '';
        this.hotToggle = false;
        this.choiceToggle = false;
      },
      scrollHandler() {
        const st = self.document.body.scrollTop;
        if (st > 115) {
          this.scrollToggle = 1;
        } else {
          this.scrollToggle = (st/115).toFixed(2);
        }
      }
    },
    mounted() {
      self.document.addEventListener('scroll', this.scrollHandler);
    }
  }
</script>
