<template>
  <div class="wrapper">
    <div class="wrapper-description">
      <text class="description-txt">
        科米熊是国内第一家为当代父母提供亲子时光解决方案的互联网品牌运营商，通过优质的线下和线上资源整合，打造全场景全行业的亲子服务生态链。用户可以通过咪咪宝贝体验到围绕亲子的教育、活动、内容、电商等高品质服务，让孩子在呵护中认识、快乐成长。
      </text>
      <text class="description-txt ">
        科米熊与顶尖的亲子学院深度合作，在线下开展多种多样、循序渐进的亲子活动，同时输出优质内容。线上我们围绕亲子时光的全维度提供优质一站式服务，通过智能化的数据分析系统找到用户的核心需求，为用户提供精准及时的定向服务。
      </text>
    </div>
    <div class="item-content">
      <text class="item-name">版本号：V1.0.0</text>
    </div>
    <div class="item-content right-icon" @click="goAgreement">
      <text class="item-name">用户服务协议</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin-left: 40px;
    padding-top: 40px;
    padding-right: 30px;
  }

  .wrapper-description {
    padding-bottom: 30px;
    border-bottom: 1px solid #dddddd;
  }

  .description-txt {
    font-size: 26px;
    color: #333333;
    line-height: 45px;
  }

  .item-content {
    height: 88px;
    border-bottom: 1px solid #dddddd;
  }

  .item-name {
    line-height: 88px;
    color: #333333;
  }

  .right-icon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=) 663px center no-repeat;
  }

</style>

<script>
  module.exports = {
    data() {
      return {};
    },
    methods: {
      goAgreement() {
        this.$router.push({path: '/serviceAgreement'});
      },
    },
  };
</script>