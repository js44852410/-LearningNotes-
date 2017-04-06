<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  @import '../../scss/css3Module';
  .filter-wrapper {
    min-height: 100%;
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
    .price {
      position: fixed;
      left: 0;
      top: 50px;
      z-index: 2;
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 10px 10px 10px 100px;
      box-sizing: border-box;
      @include borderBottom;
      em,input {
        float: left;
      }
      span {
        width: 85px;
        position: absolute;
        left: 10px;
        top: 15px;
      }
      em {
        width: 4%;
        line-height: 26px;
        text-align: center;
        color: #e5e5e5;
      }
      input {
        width: 48%;
        text-align: center;
        background-color: #e5e5e5;
        border-radius: 3px;
        padding: 5px 10px;
      }
    }
    .content {
      padding: 15px 10px;
      font-size: 0;
      margin-bottom: 45px;
      margin-top: 110px;
      background-color: #fff;
      .title {
        font-size: 14px;
        position: relative;
        margin-bottom: 15px;
        span {
          font-weight: 700;
        }
        .view-all {
          position: absolute;
          right: 10px;
          padding: 10px 15px 10px 10px;
          top: -10px;
          color: $darkenGrayColor;
        }
      }
      .arrow {
        @include arrow($direction: 'bottom', $borderColor: #666)
        pointer-events: none;
        right: 0;
        left: 50%;
        top: -5px;
        margin-left: 20px;
      }
      .open {
        .arrow {
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          top: 5px;
        }
      }
    }
    .items {
      margin-bottom: 10px;
    }
    .item {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 32%;
      margin-right: 2%;
      margin-bottom: 2%;
      padding: 10px;
      box-sizing: border-box;
      background-color: #f0f0f0;
      border-radius: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      &.active {
        color: $mainColor;
        @include border($borderColor: $mainColor);
        background-color: #fff;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .btn-confirm {
      height: 45px;
      line-height: 45px;
      color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      background-color: $mainColor;
    }
  }
</style>

<template lang='jade'>
  .wrapper.filter-wrapper
    form.search(
      @submit.prevent='submit'
    )
      input.input(
        type="text",
        v-model='keywords',
        placeholder='搜索商品'
      )
    .price
      span.title 价格区间(元)
      input(v-model='minPrice', type='number', placeholder='最低价')
      em -
      input(v-model='maxPrice', type='number', placeholder='最高价')
    article.content
      section.category(v-if='filterCategory.length > 0')
        h4.title
          span 分类
        .items
          a.item(
            v-for='item in filterCategory',
            v-text='item.category_label',
            @click='toggleFilterCategory(item.entity_id)',
            :class='{active: item.entity_id === filterCurrentId}'
          )
      section.brand(
        v-if='filterBrand[filterCurrentId] && filterBrand[filterCurrentId].length > 0'
      )
        h4.title
          span 品牌
        .items
          a.item(
            v-for='(item, index) in filterBrand[filterCurrentId]',
            v-text='item.brand_name',
            :class='{active: item.checked}',
            @click='toggleFilterBrand(index)'
          )
      section.attributes(
        v-if='filterAttributes[filterCurrentId] && filterAttributes[filterCurrentId].length > 0'
      )
        .attr(v-for='attr in filterAttributes[filterCurrentId]')
          h4.title
            span(v-text='attr.option_label')
          .items
            a.item(
              v-for='(item, index) in attr.values',
              v-text='item.v',
              :data-id='index',
              :class='{active: item.checked}',
              @click='toggleFilterAttr({ parentId: attr.attribute_id, activeIndex: index })',
            )
    a.btn-confirm(@click='submit') 确定
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        keywords: '',
        minPrice: '',
        maxPrice: ''
      }
    },
    computed: {
      ...Vuex.mapGetters(['filterCategory', 'filterBrand', 'filterAttributes', 'filterCurrentId', 'filterBrandId', 'filterAttr']),
    },
    methods: {
      ...Vuex.mapActions(['getFilterGoods', 'toggleFilterCategory', 'toggleFilterBrand', 'toggleFilterAttr']),
      submit() {
        this.$router.push({
          name: "goodsList",
          query: {
            brand_id: this.filterBrandId,
            category_id: this.filterCurrentId,
            keywords: this.keywords,
            min_price: this.minPrice,
            max_price: this.maxPrice,
            attribute: self.encodeURIComponent(self.JSON.stringify(this.filterAttr))
          }
        })
      }
    },
    created() {
      this.getFilterGoods();
    }
  }
</script>
