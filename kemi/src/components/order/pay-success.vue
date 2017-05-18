<template>
  <div class="pau-success-wrapper">
    <div class="img-box">
      <image class="header-img"
             src="http://61.135.195.78:1080/group1/M00/00/05/CsMQCFjIOqaAYFavAACV6zVhPXo367.png"></image>
    </div>
    <div class="btn-group">
      <div class="check-info-btn">
        <text class="btn-text" @click="goOrderInfoPage('myActivityInfo')">查看订单详情</text>
      </div>
      <div class="continue-btn">
        <text class="btn-text" @click="goHomePage('home')">继续挑选活动</text>
      </div>
    </div>
    <div class="warning-bgcover" v-if="warningTipShow">
      <div class="warning-del">
        <div class="warning-title-two">
          <text class="warning-title-txt"><br>此活动包含线上任务哦～</br>可以通过任务来增加和宝宝的互动快来参加吧</text>
        </div>
        <div class="warning-btn-group">
          <div class="warning-continue-btn join-now-div" @click="attend">
            <text class="warning-continue-btn-txt join-now-text">马上参加</text>
          </div>
          <div class="warning-continue-btn" @click="later">
            <text class="warning-continue-btn-txt">稍后再说</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .img-box {
    font-size: 0;
  }

  .header-img {
    width: 750px;
    height: 200px;
  }

  .btn-group {

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .check-info-btn, .continue-btn {
    height: 80px;
    width: 270px;
    border: 1px solid #999;
    border-radius: 10px;
    margin-top: 30px;
  }

  .check-info-btn {
    margin-right: 90px;
  }

  .btn-text {
    color: #999;
    text-align: center;
    line-height: 80px;
  }

  .warning-btn-group {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    margin-bottom: 60px;
    margin-top: 30px;
  }

  .warning-bgcover {
    width: 750px;
    height: 1344px;
    background-color: #000;
    width: 750px;
    height: 1344px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  .warning-del {
    width: 520px;
    height: 320px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 18px;
    margin: 200px auto;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    z-index: 100;
    position: fixed;
    top: 14%;
    left: 50%;
    margin-left: -260px;
  }

  .warning-title {
    text-align: center;
    padding: 0 60px;
  }

  .warning-title-two {
    padding: 0 30px;
  }

  .warning-title-txt {
    font-size: 30px;
    line-height: 50px;
    color: #666666;
    text-align: center;
  }

  .warning-btn {
    width: 220px;
    height: 80px;
    border: 1px solid #686868;
    border-radius: 10px;
  }

  .warning-yes {
    background-color: #ffbc01;
    border-color: #ffbc01;
    color: #fff;
    position: relative;
    top: 20px;
  }

  .warning-word {
    line-height: 80px;
    text-align: center;
    color: #fff;
  }

  .bloder {
    font-size: 30px;
    color: #333333;
  }

  .warning-continue-btn {
    width: 180px;
    border: 1px solid #666666;
    border-radius: 10px;
  }

  .warning-continue-btn-txt {
    line-height: 80px;
    text-align: center;
    color: #666666;
  }

  .join-now-div {
    margin-right: 30px;
    border-color: #ffbc00;
    background-color: #ffbc00;
  }

  .join-now-text {
    color: #fff;
  }
</style>

<script>
  import {mapGetters} from 'vuex';

  module.exports = {
    data() {
      return {
        warningTipShow: false,
      };
    },

    computed: {
      ...mapGetters([
        'orderInfo',
      ]),
    },

    methods: {
      goOrderInfoPage(name) {
        this.$router.push({
          name,
          params: {
            orderNumber: this.orderInfo.orderNumber,
          },
        });
      },
      goHomePage(name) {
        this.$router.push({
          name,
        });
      },

      attend() {
        this.$router.replace({
          name: "taskList",
          query: {
            activityId: this.orderInfo.activityId,
            activityName: this.orderInfo.activityName,
          },
        });
      },

      later() {
        this.warningTipShow = false;
      },
    },

    mounted() {
      this.$store.dispatch('getOrderInfo', {
        "orderNumber": this.$route.params.orderNumber,
        "queryAgain": true,
      });
      this.warningTipShow = this.orderInfo.isContainTask === '1';
    },
  };
</script>