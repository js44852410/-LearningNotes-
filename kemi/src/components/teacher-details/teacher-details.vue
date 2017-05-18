<template>
  <div class="wrapper">
    <div class="details-top">
      <div class="details-title">
        <div><image resize="cover" class="details-left" :src="detailsList.headImageUrl|defaultHead"></image></div>
        <div class="details-right">
          <text class="details-msg">
            <text class="details-name">{{detailsList.userName}}</text>
            <text :class="{'details-collection':detailsList.isCollection === '1','details-on':detailsList.isCollection === '0'}" @click="changeCollection(detailsList.isCollection)">{{collectionText[detailsList.isCollection]}}</text>
          </text>
          <text class="details-num">收藏 {{detailsList.collectionNumber}}</text>
          <text class="details-brief" lines="1">{{detailsList.describe1}}</text>
        </div>
      </div>
    </div>
    <div class="details-main">
      <div class="details-introduce">
        <text>简介</text>
      </div>
      <div class="details-content">
        <text ref="abstract"  class="detailfont" :class="{detailShow:showall == 1}" v-html="detailsList.introduction"></text>
        <text class='details-btn'  v-if="showall == 1" @click="changeMore">了解更多</text>
      </div>
    </div>
    <div class="nav_container" ref="occupy">
      <div class="nav-containerBox"  ref="navContainer">
        <a class="nav_item" @click="reduction(1)">
          <text class="nav_text" :class="{active:showFlag}">活动</text>
        </a>
        <a class="nav_item" @click="reduction(0)">
          <text class="nav_text" :class="{active:!showFlag}">文章</text>
        </a>
      </div>
    </div>
    <div v-show="!showFlag">
   <!--   <div class="flow-content-box">
        <div class="details-img"></div>
        <div class="details-msgbox">
          <text class="details-msgtext">钢琴入门那些事</text>
          <text class="msg-cont">
            <text class="msg-text">2017/5/6</text>
            <text class="msg-text">14:29:15</text>
          </text>
          <text class="msg-text details-icon">1234</text>
        </div>
      </div>-->
      <div class="no-article-container">
        <image class="noArticleList"
               src="data:image/png;base64,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"
               resize="contain"></image>
        <text class="noArticleTxt">还没有文章~</text>
      </div>
    </div>
    <div class="nav_detail_container" v-show="showFlag">
      <div class="activity-nav-box" ref="navBox">
        <div class="activity-nav-container" ref="activityNav">
          <text class="activity-nav" :class="{'activity-active': activityType===0}" @click="changeActivityType(0)">在线活动</text>
          <text class="activity-nav" :class="{'activity-active': activityType===1}" @click="changeActivityType(1)">历史活动</text>
        </div>
      </div>
      <activityList v-show="activityType===0" keyword="teacherId" url="appapi/getOnlineActPage" :id="id"></activityList>
      <historyActivityList v-show="activityType===1" keyword="teacherId" :id="id" url="appapi/getHisActPage"></historyActivityList>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    width: 750px;
    background: #f5f5f7;
  }

  .details-top {
    width: 750px;
    height: 300px;
    background-image: url("/src/img/infoHead.png");
    background-size: cover;
    position: relative;
  }

  .details-main {
    background: #fff;
  }

  .details-title {
    position: absolute;
    left: 30px;
    bottom: 40px;

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
  }

  .details-left {
    width: 126px;
    height: 126px;
    border-radius: 100%;
    border: 2px solid #fff;
    margin-right: 30px;
  }

  .details-msg {
    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
  }

  .details-name {
    color: #fff;
    font-size: 30px;
    margin-right: 80px;
    margin-bottom: 20px;
  }

  .details-collection {
    width: 88px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #bdbdbd;
    font-size: 22px;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
  }

  .details-on{
    width: 88px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffbc01;
    font-size: 22px;
    border: 1px solid #ffbc01;
    border-radius: 10px;
  }

  .details-num {
    color: #fff;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .details-brief {
    max-width: 480px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 22px;
    background: rgba(0, 0, 0, .4);
    border-radius: 10px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .details-brief:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right: 16px solid rgba(0, 0, 0, .4);
    border-bottom: 8px solid transparent;
    margin-left: -46px;
    margin-top: 12px;
    position: absolute;
  }

  .details-introduce {
    border-bottom: 1px solid #E2E2E2;
  }

  .details-introduce p {
    color: #333;
    font-size: 32px;
    margin: 20px 0 20px 20px;
  }

  .details-content {
    padding: 30px;
    box-sizing: border-box;
  }

  .detailfont {
    color: #666;
    font-size: 26px;
  }

  .detailShow {
    height: 320px;
    overflow: hidden;
  }

  .details-btn {
    color: #999;
    font-size: 22px;
    margin-top: 30px;
    text-align: center;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAOCAYAAAAxDQxDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzA2OUEzNjgyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzA2OUEzNjkyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQUYyMzE3RjJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQUYyMzE4MDJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuYCeU4AAAFlSURBVHjarJTNK0RRGIev07CwRr4/JpEs/B8SkUgRKTdKg2JhIaIslFJW98aCsZCPYuGzhLLx59hM08jwnPqpaZqPe5m3nnPqnPeep/Oec26Z53lrjuOkYRu+nZDhum7eOd/36+huIRmhmQM7UAVLTokCSQPdE3TCg6EZhA9Y1K5KIWmie5HEyoas6B36IAGrsP5PSYsk7fAI/ZQ3YTT/Zgck24CVP0raJInCPQxYiZ0zGXl2i8OQgh2IhZREJWmFG0mSv/MmK/8ORiXbg5mAkg66V2iGa3smSFKZOSbHd1cwoSvvwWQRiT3wZ2iESxjJluQT2TiDackOtctc0aVy1cM5jOWSFBLZOIZZ5cT1DDKjW5JaOJXkM99ipkj5D2AByrVYr8Z7VK4aOIFxJF+FFjIBznoflqECLmBeN7QajmCqmMRGJODt3YVK2JTY0dnhcNNBFoiEeCpbyo+pnPEwP+EfAQYAsRVjANQKuSYAAAAASUVORK5CYII=');
    background-position: 410px;
    background-repeat: no-repeat;
  }

  .nav_container {
    width: 750px;
    height: 91px;
    margin-top: 20px;
  }
  .nav-containerBox {
    width: 750px;
    height: 90px;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #E2E2E2;

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

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .nav_item {
    flex: 1;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .nav_text {
    font-size: 32px;
    color: #333;
    text-align: center;
    width: 100px;
    height: 90px;
    line-height: 90px;
  }

  .flow-content-box {
    height: 210px;
    box-sizing: border-box;
    background: #fff;
    padding: 30px 20px 0 30px;
    border-bottom: 1px solid #E2E2E2;

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
  }

  .details-img {
    width: 200px;
    height: 150px;
    margin-right: 30px;
    background: no-repeat center center;
    background-size: contain;
  }

  .details-msgtext {
    margin-top: 10px;
    color: #333;
    font-size: 32px;
  }

  .msg-cont {
    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
  }

  .msg-text {
    color: #999;
    font-size: 26px;
    margin-top: 20px;
    margin-right: 20px;
  }

  .details-icon {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAYCAYAAAB9ejRwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUFGMjMxNzkyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUFGMjMxN0EyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQUYyMzE3NzJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQUYyMzE3ODJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl2d+gsAAAOLSURBVHjatJdrTI1xHMd1mGGUu2SYNy7hRV4QYyXM/RqGNpnDXObOGNFyvw1jMzIvLLUmuZuShhTJXHKbywwLJd4IixXx/W+fsz2enefUaflvnz17zv/y/P6/+wlITEysV4vRXEwQkaKPCBGtxA/xWtwT18UZ8cXfwxv4uT5UrBbTRJUoEFmiRFSKlqKXGCZmikMiTewST+paqDZih5iFFtzinPjusD5A9BezRQwcE3HiY10INVEYG38WY0SGZa6JiBBdxR/xQeSJUnELNsBcMU4sFCd9fdDlY64+ajfqPyzCLAK1xzRG0Eus2ybSRTEm7cvaEgQx70Wct4fz/RIqEPPMEFEiXlQwZ5z7MX61Ex9qJJqKtiJWdBD5Yo3lzAciXOwWy8VFEVRT8xn/uSJ+cbtiy5wx1WVxW0wRn2x7jeaSRSom246wG5ivJFCMWZMwdRT7HDXVGoG+srjY5j8polCMFN/EMkJ/ke2c3yJBbMG5B9rmz4rBKOAqT69CBSGQkXoEglnHYtEO85h0cENMR3N5Dm5gBLuPxuzjHsKay2ZbTemyOPUpbj9elHs5JJZk+FxMxX8i+GChg1BV+J35eCcv8684w5j4tGhoFWofWXmsg0DGcXuIC7yHcYmfNUgpmQg31GH+vRhCWjnocfRpZF/j1GUOGz23fMOzozhfw8T7jYTZ2ceat2KUyBU5RqglfOClj02VtvfJfpanhl7OsI/HBMBSF1oyZpvjY0MRzy61KN7NiOp31axbSZGPceFs0WK/mOSwweSjZwjv7xjB85qPNUvFVizw0uPoVymeydQnbyOJOtjND4FcJMubFm3bxzoCzU1q+CdPnRDzqE1uL5sPUGiTyC01GQlE6loHPzsqNqGQFKcyc5x2JJWI20g41yNVRJM0MxzKjFVDprSsJ6Pn2uaDUUI40Z9eXUE2CXK4mM/Hgy1zBfhIT/GCQh1K/+SpmzFEUjwasmdz4x6PRG8x2i6Qry4hhzY3kOpu9bNrHJhGF/CUNvgrmkuirxpANvcM0y4fIezNfD+PD/nT5H2gBGwme2dy8yf0SPNoQSLJxlX8nsfTMxqLBextgVPH+aoG1XWeFWgjlcMe0tQlUrzLeb/kZW8vTOnGrEb7q8TduurRC2k1TP1aYenP8xG01PLHoTum6UKLnMWFLv+vfzPZEEL2HURCDaH1KMN0d8Re/Oe9v9n2rwADAGSJ58AJrURSAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    padding-left: 47px;
  }

  .active {
    color: #febd01;
    border-bottom: 4px solid #febd01;
  }

  .activity-nav-container {
    width: 750px;
    z-index: 999;
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
    height: 88px;
    background-color: #fff;
    border-bottom: 1px solid #E2E2E2;
  }

  .activity-nav {
    font-size: 26px;
    color: #999;
    height: 88px;
    line-height: 88px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .activity-active {
    color: #ffbc01;
  }

  .no-article-container {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: inherit;
    -moz-box-orient: inherit;
    -webkit-box-orient: inherit;
    box-orient: inherit;
    -webkit-flex-direction: inherit;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    margin-top: 80px;

    min-height: 1000px;
  }

  .noArticleList {
    width: 400px;
    height: 400px;
    background-position: center;
  }

  .noArticleTxt {
    color: #a5a5a5;
  }
</style>
<script>
  import activityList from '../home/activity-list.vue';
  import historyActivityList from '../activity/historyActivityList.vue';
  const stream = weex.requireModule('stream');
  module.exports = {
    name: "teacherDetails",
    data() {
      return {
        id: "",
        showFlag: 1,
        showall: 0,
        detailsList: [],
        activityType: 0,
        collectionText: ["收藏", "已收藏"],
      };
    },

    components: {
      activityList,
      historyActivityList,
    },

    methods: {
      changeCollection(type) {
        if (!__userToken) {
          this.$router.push({
            name: "bindMobile",
            query: {
              redirect: {
                name: "teacherDetails",
                params: {
                  id: this.id,
                },
              },
            },
          });
        } else {
          if (this.detailsList.isCollection === "1") {
            this.$set(this.detailsList, "isCollection", "0");
            this.detailsList.collectionNumber--;
          } else {
            this.$set(this.detailsList, "isCollection", "1");
            this.detailsList.collectionNumber++;
          }

          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/toCollection`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "token": __userToken,
            },
            body: `{"collectionType":"2", "commentModelId": ${this.id}, "operationStatus": "${this.detailsList.isCollection}"}`,
          });
        }
      },

      reduction(flag) {
        this.showFlag = flag;
      },

      changeActivityType(type) {
        this.activityType = type;
      },

      changeMore(bool) {
        this.showall = 2;
      },

      fixedFunc() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const ele = this.$refs.navContainer.$el;
        const top = this.$refs.occupy.$el.offsetTop;

        if (scrollTop >= top && !ele.style.position) {
          ele.style.position = "fixed";
          ele.style.left = 0;
          ele.style.top = 0;
        } else if (scrollTop < top && ele.style.position === 'fixed') {
          ele.style.position = "";
          ele.style.left = "";
          ele.style.top = "";
        }
      },

      ChildfixedFunc() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const ele = this.$refs.activityNav.$el;
        const top = this.$refs.navBox.$el.offsetTop - 90;

        if (scrollTop >= top && !ele.style.position) {
          ele.style.position = "fixed";
          ele.style.left = 0;
          ele.style.top = "90px";
        } else if (scrollTop < top && ele.style.position === 'fixed') {
          ele.style.position = "";
          ele.style.left = "";
          ele.style.top = "";
        }
      },
    },

    created() {
      this.id = `${this.$route.params.id}`;
      /* 请求老师简介数据*/
      stream.fetch({
        method: 'GET',
        type: 'json',
        url: `${__APIDIR}appapi/getTeacherById/?id=${this.id}`,
        headers: {
          "token": __userToken,
        },
      }, res => {
        if (res.data.code === "1") {
          this.detailsList = res.data.result;
        }
      });
    },

    updated() {
      if (this.showall === 0) {
        let ele = this.$refs.abstract.$el;
        let height = ele.offsetHeight;
        if (height > 320) {
          this.showall = 1;
        }
      }

      window.addEventListener("scroll", this.fixedFunc);
      window.addEventListener("scroll", this.ChildfixedFunc);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.fixedFunc);
      window.removeEventListener("scroll", this.ChildfixedFunc);
    },
  };
</script>