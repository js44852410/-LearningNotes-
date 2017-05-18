<template>
  <div class="wrapper">
    <div class="item" v-for="item in reviewList" @click="goReviewItem(item.id)" :key="item.id">
      <div class="image-wrapper">
        <a>
          <image resize="cover" class="info-image" :src="item.cotentImageUrl|dirImage"></image>
          <div class="right-top-box">
            <text class="people-number">{{item.partNumber}}人报名</text>
          </div>
        </a>
      </div>
      <div class="content-wrapper">
        <div class="item-content">
          <div class="item-title">
            <text class="item-title-word">{{item.title}}</text>
          </div>
          <div class="item-info">
            <text class="item-info-text html-text" v-html="item.introduction"></text>
          </div>
        </div>
      </div>
    </div>
    <div v-show="loadingMore">
      <text class="loading-more">加载更多...</text>
    </div>
    <footer :status="1"></footer>
  </div>
</template>

<style scoped>
  .wrapper {
    padding-bottom: 110px;
  }

  .item {
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
  }

  .image-wrapper {
    position: relative;
    top: 0;
    left: 0;
    margin: 40px 30px;
  }

  .info-image {
    height: 270px;
    width: 690px;
    border-radius: 10px;
  }

  .right-top-box {
    position: absolute;
    right: 0;
    top: 20px;
    height: 40px;
    width: 115px;
    background: rgba(0, 0, 0, .5);
  }

  .people-number {
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    color: #fff;
  }

  .content-wrappe {
    background: #fff;
  }

  .item-content {
    margin: 0 30px;
  }

  .item-title {
    margin-bottom: 24px;
  }

  .item-title-word {
    font-size: 33px;
    color: #333;
    line-height: 45px;
  }

  .item-info-text {
    width: 690px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 28px;
    color: #666;
    text-indent: 56px;
    line-height: 48px;
  }

  .item-time {
    margin: 30px 0;
  }

  .item-time-text {
    font-size: 22px;
    color: #999;
    text-align: right;
  }

  .footer-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
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
    -webkit-align-items: stretch;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    background: #fff;
    border-top: 2px solid #DDD;
  }

  .footer-item {
    width: 250px;
    margin-top: 13px;
  }

  .item-image {
    width: 50px;
    height: 52px;
    margin: 0 auto;
  }

  .item-name {
    margin: 8px 0 15px;
    text-align: center;
    color: #33363a;
    font-size: 18px;
  }

  .loading-more {
    text-align: center;
    font-size: 30px;
    color: #333;
    line-height: 80px;
  }
</style>

<script>
  import footer from '../common/footer.vue';

  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');
  module.exports = {
    data() {
      return {
        page: 0,
        size: 5,
        reviewList: [],
        stop: false,
        loadingMore: false,
      };
    },
    components: {
      footer,
    },
    methods: {
      getreviewList(repo, callback) {
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: '{"page": "' + this.page + '", "size": "' + this.size + '"}',
        }, callback);
      },

      goReviewItem(id) {
        this.$router.push({
          name: "reviewInfo",
          params: {
            id,
          },
        });
      },
    },

    mounted() {
      this.getreviewList('getHitoryActs', res => {
        if (res.ok && res.data.code === "1") {
          this.reviewList = res.data.result;
          this.page++;
        } else {
          modal.toast({
            message: res.data.mes,
            duration: 1,
          });
        }
      });
    },

    updated() {
      let self = this;
      var timeoutInt;   // 要保证最后要运行一次
      window.onscroll = function() {
        setTimeout(function() {
          if (!timeoutInt) {
            window.clearTimeout(timeoutInt);
          }
          timeoutInt = window.setTimeout(function() {
            //监听事件内容
            if (getScrollHeight() < getDocumentTop() + getWindowHeight() + 20) {
              //当滚动条到底时,这里是触发内容
              //异步请求数据,局部刷新dom
              if (self.stop) {
                return false;
              }
              self.loadingMore = true;
              self.getreviewList('getHitoryActs', res => {
                if (!res.data.result.length) {
                  self.stop = true;
                  self.loadingMore = false;
                  return false;
                }
                if (res.ok && res.data.code === "1") {
                  self.reviewList = self.reviewList.concat(res.data.result);
                  self.page++;
                } else {
                  modal.toast({
                    message: res.data.mes,
                    duration: 1,
                  });
                }
                self.loadingMore = false;
              });
            }
          }, 105);
        }, 100);
      };

      //文档高度
      function getDocumentTop() {
        let scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      }

      //可视窗口高度
      function getWindowHeight() {
        let windowHeight = 0;
        if (document.compatMode === "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      }

      //滚动条滚动高度
      function getScrollHeight() {
        let scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      }
    },
  };
</script>