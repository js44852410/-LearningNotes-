<template>
  <list>
    <cell class="activity_container" v-for="item in activityList" :key="item.activityID"
          @click="goPage(item.activityID)">
      <div>
        <image class="activity_img" :src="item.activityImageUrl|dirImage"></image>
      </div>
      <div class="activity_mes_container">
        <div>
          <text class="activity_title">{{item.activtyName}}</text>
          <text class="activity_time">{{item.activityStartTime}}</text>
        </div>
        <div class="activity_price_container">
          <text class="now_price">￥{{item.nowPrice|formatPrice}}</text>
          <text class="old_price">￥{{item.oldPrice|formatPrice}}</text>
        </div>
      </div>
    </cell>
    <cell class="activity_container" v-if="activityList.length <= 0 && size < 5">
      <text class="no-activity-text">还没有活动~</text>
    </cell>
    <cell v-if="activityList.length <= 0 && size >= 5" class="no-activity-container">
      <image class="noActiveList"
             src="data:image/png;base64,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"
             resize="contain"></image>
      <text class="noActiveTxt">还没有活动~</text>
    </cell>
  </list>
</template>

<style scoped>
  .activity_container {
    width: 750px;
    height: 230px;
    padding: 30px;
    border-bottom: 1px solid #ddd;

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
  }

  .activity_img {
    width: 230px;
    height: 170px;
  }

  .activity_mes_container {
    margin-left: 30px;
    flex: 1;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .activity_title {
    color: #333;
    font-size: 28px;
    lines: 2;
  }

  .activity_time {
    margin-top: 20px;
    color: #999;
    font-size: 22px;
    height: 22px;
    line-height: 22px;
  }

  .activity_price_container {
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

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .now_price {
    font-size: 32px;
    color: #ff4614;
    height: 32px;
    line-height: 32px;
  }

  .old_price {
    color: #999;
    font-size: 22px;
    margin-left: 30px;
    height: 22px;
    line-height: 22px;
    text-decoration: line-through;
  }

  .no-activity-text {
    color: #999;
    font-size: 26px;
    width: 690px;
    text-align: center;
    line-height: 169px;
  }

  .no-activity-container {
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

  .noActiveList {
    width: 400px;
    height: 400px;
    background-position: center;
  }

  .noActiveTxt {
    font-size: 26px;
    color: #999;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  module.exports = {
    props: {
      size: {
        type: String,
        default: "10",
      },
      bgChange: {
        type: Function,
      },
      url: {
        type: String,
        default: "appapi/recommendActivitys/getByPage",
      },
      keyword: {
        type: String,
        default: "",
      },
      id: null,
    },
    data() {
      return {
        activityList: [],
        page: 0,
        showLoading: false,
      };
    },

    methods: {
      getActivityList() {
        let bodyStr = "";
        if (this.keyword) {
          bodyStr = `{"page": "${this.page}", "size": "${this.size}", "${this.keyword}":"${this.id}"}`;
        } else {
          bodyStr = `{"page": "${this.page}", "size": "${this.size}"}`;
        }
        if (!this.showLoading) {
          this.showLoading = true;
          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}${this.url}`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: bodyStr,
          }, res => {
            if (res.ok) {
              this.showLoading = false;

              if (res.data.code === "1") {
                if (res.data.result.length) {
                  this.page++;
                  if (this.page) {
                    this.activityList = this.activityList.concat(res.data.result);
                  } else {
                    this.activityList = res.data.result;
                  }
                } else {
                  this.showLoading = true;
                }
              } else {
              }
            }
          });
        }
      },

      next() {
        const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        const wHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight);

        if (this.bgChange) {
          this.bgChange(scrollTop);
        }

        if (scrollHeight < scrollTop + wHeight + 200) {
          this.getActivityList();
        }
      },

      goPage(activityID) {
        this.$router.push({
          name: "activityInfo",
          params: {
            activityID,
          },
        });
      },
    },

    mounted() {
      this.getActivityList();
    },

    updated() {
      if (this.size >= 5) {
        window.addEventListener("scroll", this.next);
      }
    },

    beforeDestroy() {
      if (this.size >= 5) {
        window.removeEventListener("scroll", this.next);
      }
    },
  };
</script>