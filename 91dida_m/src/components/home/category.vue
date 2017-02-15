<style lang='sass'>
  .home-category {
      background-color: #fff;
      font-size: 0;
      padding: 15px 0;
      .item {
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 25%;
        margin-bottom: 10px;
        &:nth-child(4) {
          & ~ a {
            margin-bottom: 0;
          }
        }
      }
      .icon {
        display: block;
        margin: 0 auto;
        margin-bottom: 5px;
        width: 60%;
      }
    }
</style>

<template lang='jade'>
  section.home-category(v-if='category.length > 0')
    a.item(
      v-for='item in category',
      @click='page(item.category_id, item.category_name)'
    )
      img.icon(:src='item.app_icon')
      p(v-text='item.category_name')
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        category: []
      }
    },
    methods: {
      page(category_id, category_name) {
        _czc.push(['_trackEvent', `${self.home.deviceType}_首页分类`, 'click', `${category_name}`]);
        if (category_id === 0) {
          this.$router.push({
            name: 'category'
          });
        } else {
          this.$router.push({
            name: "goodsList",
            query: {
              category_id
            }
          })
        }
      }
    },
    created() {
      this.category = self.home.category || [];
    }
  }
</script>
