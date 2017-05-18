<template>
  <div class="wrapper">
    <div class="head-image-container"></div>
    <div class="mes-container">
      <text class="title-text">6月饱含着爸爸的爱</text>
      <text class="mes-text">错过了漫天樱花飞舞的人间四月天，</text>
      <text class="mes-text">告别了绚烂缤纷的最美五月花海，</text>
      <text class="mes-text">如果说春天是妈妈的爱，那接下来的夏天让爸爸来承包你的欢乐吧！</text>
    </div>
    <div class="theme">
      <text class="theme-text">主题活动</text>
    </div>
    <div class="activity-container">
      <div class="activity-item" v-for="item in activityList" :key="item.activityID" @click="goPage(item.activityID)">
        <div class="activity-image" :style="{backgroundImage: 'url('+item.image+')'}"></div>
        <div class="activity-detail">
          <text class="activity-price">￥{{item.price}}</text>
          <text class="activity-title" lines="1">{{item.title}}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #fff;
  }

  .head-image-container {
    width: 750px;
    height: 300px;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-image: url("/src/img/recommendImage/head.jpg");
  }

  .mes-container {
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom: 50px;
    border-bottom: 1px solid #E2E2E2;
  }

  .title-text {
    color: #333;
    font-size: 36px;
    font-weight: 700;
    margin-top: 50px;
  }

  .mes-text {
    color: #666;
    font-size: 26px;
    margin-top: 50px;
  }

  .theme {
    margin-top: 50px;
    padding-left: 30px;
  }

  .theme-text {
    color: #333;
    font-size: 32px;
    font-weight: 500;
  }

  .activity-container {
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 50px;
  }

  .activity-item {
    margin-top: 50px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .activity-image {
    width: 690px;
    height: 500px;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAC0CAIAAAAl/ja/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzdDRjA0MzBGODE1MTFFNjgzRkNCOTg1NDNGOEVFNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzdDRjA0MzFGODE1MTFFNjgzRkNCOTg1NDNGOEVFNUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDN0NGMDQyRUY4MTUxMUU2ODNGQ0I5ODU0M0Y4RUU1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDN0NGMDQyRkY4MTUxMUU2ODNGQ0I5ODU0M0Y4RUU1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PghU+HcAABeqSURBVHja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");
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .activity-detail {
    margin-top: 30px;

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

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .activity-price {
    color: #FF4614;
    font-size: 40px;
  }

  .activity-title {
    flex: 1;
    font-size: 28px;
    color: #666;
    margin-left: 30px;
  }
</style>
<script>
  export default {
    data() {
      return {
        activityList: [
          {
            activityID: 49,
            price: 269,
            title: "爸爸去这儿——探访历史，重走长征路",
            image: "/src/img/recommendImage/49.jpg",
          },
          {
            activityID: 50,
            price: 199,
            title: "同一片蓝天下的心愿——陪伴留守儿童公益行",
            image: "/src/img/recommendImage/50.jpg",
          },
          {
            activityID: 51,
            price: 169,
            title: "天使的绽放——亲子美学培育开show",
            image: "/src/img/recommendImage/51.jpg",
          },
          {
            activityID: 52,
            price: 0,
            title: "每天朗诵一首诗——阅读习惯养成培养计划",
            image: "/src/img/recommendImage/52.jpg",
          },
        ],
      };
    },

    methods: {
      goPage(activityID) {
        this.$router.push({
          name: "activityInfo",
          params: {
            activityID,
          },
        });
      },
    },
  };
</script>