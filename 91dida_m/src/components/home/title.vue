<style lang='sass'>
  .home-title-wrapper {
    display: block;
    position: relative;
    text-align: center;
    padding: 10px 10px 8px;
    overflow: hidden;
    em[class^='icon-'] {
      vertical-align: middle;
    }
    .text {
      font-size: 16px;
      margin-left: 5px;
      vertical-align: middle;
    }
    .icon-more {
      &:before {
        width: 8px;
        height: 8px;
        border-color: #666;
      }
    }
    .title {
      position: relative;
      display: inline-block;
      padding: 0 10px;
      width: 50%;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -10%;
        width: 30%;
        height: 1px;
        background-color: currentColor;
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: -10%;
        width: 30%;
        height: 1px;
        background-color: currentColor;
      }
    }
    .more-text {
      font-size: 12px;
      position: absolute;
      right: 20px;
      top: 50%;
      height: 14px;
      margin-top: -7px;
    }
  }
</style>

<template lang='jade'>
  a.home-title-wrapper(@click='goPage()')
    .title(:style='{color: hexColor}')
      em.icon-32(:class='icon')
      span.text(v-text='text')
    span.more-text 更多
    em.icon-more
</template>

<script lang='babel'>
  export default {
    props: ['hexColor', 'text', 'url', 'icon','category'],
	  methods:{
      goPage(){
        this.$router.push(this.url);
        _czc.push(['_trackEvent', `${this.category}`, 'click', `查看更多`]);
      },
      monitor(){
        _czc.push(['_trackEvent', `${this.category}`, 'click', `查看更多`]);
        return false;
      }
	  }
  }
</script>