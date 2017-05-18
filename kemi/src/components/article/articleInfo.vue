<template>
  <div class="wrapper">
    <div class="article-header-container">
      <div class="article-header">
        <div class="publisher-head-container">
          <image class="publisher-head" :src="''|defaultHead"></image>
        </div>
        <div class="publisher-detail-container">
          <text class="publisher-name" lines="1">科米熊</text>
          <text class="publisher-abstract" lines="1">亲子教育</text>
        </div>
      </div>
    </div>
    <div class="article-detail-container"></div>
    <div class="article-bottom-container"></div>
  </div>
</template>
<style scoped>
  .article-detail-container{

  }





  .wrapper{
    background-color: #fff;
  }

  .article-header-container{
    padding-left: 30px;
    padding-right: 30px;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;
    height: 120px;
  }

  .article-header{
    height: 120px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;

    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: right center;
  }

  .publisher-head-container{
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .publisher-head{
    width: 90px;
    height: 90px;
  }

  .publisher-detail-container{
    flex: 1;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
  }

  .publisher-name{
    color: #333;
    font-size: 28px;
    line-height: 28px;
    height: 28px;
  }

  .publisher-abstract{
    margin-top: 30px;
    color: #999;
    font-size: 24px;
    line-height: 24px;
    height: 24px;
  }
</style>
<script>
  export default {
    data() {
      return {};
    },

    methods: {},
    mounted() {
    },
  };
</script>