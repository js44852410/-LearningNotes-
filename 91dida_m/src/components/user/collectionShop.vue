<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .collection-shop-item {
    .item {
      position: relative;
      background-color: #fff;
      margin-bottom: 10px;
      @include borderTop;
      @include borderBottom;
    }
    .shop-info {
      display: block;
      padding: 10px 110px 10px $margin;
      overflow: hidden;
    }
    .topic {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .name {
      overflow: hidden;
    }
    .btn-cancel-collection {
      position: absolute;
      right: $margin;
      top: 50%;
      z-index: 1;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      padding: 6px 10px 7px;
      line-height: 1;
      background-color: #fff;
      border-radius: 3px;
      @include border($borderColor: #999);
      em {
        vertical-align: middle;
        margin-right: 3px;
      }
      span {
        vertical-align: middle;
      }
    }
  }
</style>

<template lang='jade'>
  ul.collection-shop-item(v-if='items && items.length > 0')
    li.item(v-for='(item, index) in items')
      router-link.shop-info(:to='{name: "shop", params: {shopId: item.entity_id}}')
        span.topic(:style='{backgroundImage: "url(" + item.logo + ")"}')
        h3.name(v-text='item.store_name')
      a.btn-cancel-collection(@click='toggleCollectionShop({ id: item.entity_id, index: index })')
        em.icon-shop-cancel-collect
        span 取消收藏
  not-found(v-else)
    p 您还未收藏过店铺哟!
</template>

<script lang='babel'>
  import NotFound from '../common/notFound.vue';
  export default {
    components: {
      NotFound,
    },
    data() {
      return {
        page: 0,
        pageCount: 0,
        scrollToggle: false,
        loadingEl: null,
        scrollEl: null,
      }
    },
    computed: {
      ...Vuex.mapGetters({
        items: 'shopCollectionList',
      }),
    },
    methods: {
      ...Vuex.mapActions(['toggleCollectionShop', 'getCollectionShop']),
      next() {
        const scrollHeight = self.document.body.scrollHeight;
        const scrollTop    = self.document.body.scrollTop;
        if (self.DD.height + scrollTop + 50 > scrollHeight && this.scrollToggle) {
          this.scrollToggle = false;
          if (this.page < this.pageCount) {
            this.scrollEl.appendChild(this.loadingEl);
            this.loadingEl.style.display = 'block';
            this.getCollectionShop(this);
          }
        }
      },
    },
    mounted() {
      this.scrollEl = self.document.querySelector('.collection-wrapper');
      this.getCollectionShop(this);
    }
  }
</script>
