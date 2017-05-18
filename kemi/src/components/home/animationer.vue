<template>
  <div class="mes_nav_container">
    <div class="headlines_container">
      <image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAaCAYAAACq/ULmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzRBMERDMzgxNzYyMTFFNzhBQTU4QUZFODUwODlBODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzRBMERDMzkxNzYyMTFFNzhBQTU4QUZFODUwODlBODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEY2RkVDOTE3NjIxMUU3OEFBNThBRkU4NTA4OUE4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEY2RkVDQTE3NjIxMUU3OEFBNThBRkU4NTA4OUE4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqdlaC8AAAZVSURBVHja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" class="headlines_img" resize="contain"></image>
    </div>
    <div class="label_container" v-if="false">
      <text class="label_text">爆款</text>
    </div>
    <div class="animation_container">
      <div class="animation_list_container" v-show="scrollList.length">
        <div class="animation_list" :style="{height: 80*scrollList.length+'px'}" ref="animater">
          <a v-for="(item, $index) in scrollList" class="animation_item" :key="$index"
             :style="{transform: item.translate}" @click="goPage(item.contentUrl)">
            <text class="item_title">{{item.title}}</text>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .animation_list {
    position: relative;
  }

  .animation_item {
    width: 400px;
    height: 80px;
    overflow: hidden;

    position: absolute;
    left: 0;
    top: 0;
  }

  .item_title {
    font-size: 26px;
    color: #333;
    lines: 1;
    line-height: 80px;
    height: 80px;
  }

  .mes_nav_container {
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

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    height: 80px;
    padding-left: 30px;
    padding-right: 30px;
    border-bottom: 1px solid #ddd;
  }

  .headlines_container {
    padding-right: 20px;
    border-right: 1px solid #bfbfbf;
    height: 34px;
  }

  .headlines_img {
    width: 103px;
    height: 34px;
    background-position: center;
  }

  .label_container {
    width: 62px;
    height: 30px;
    border: 1px solid #ffbc00;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    margin-left: 20px;
  }

  .label_text {
    font-size: 22px;
    color: #666;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  .animation_container {
    flex: 1;
    height: 80px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=');
    background-position: right center;
    background-repeat: no-repeat;
    margin-left: 20px;
  }

  .animation_list_container {
    width: 440px;
    height: 80px;
    overflow: hidden;
  }
</style>
<script>
  const animation = weex.requireModule('animation');
  const stream = weex.requireModule('stream');
  export default {
    data() {
      return {
        scrollList: [],
        index: 0,
        animateTimeout: null,
      };
    },

    methods: {
      animate() {
        let ele = this.$refs.animater;
        const length = this.scrollList.length;
        animation.transition(ele, {
          styles: {
            height: `${80 * (this.index + length + 1)}px`,
            transform: `translateY(${-80 * (++this.index)}px)`,
          },
          duration: 800, //ms
          timingFunction: 'linear',
          delay: 0, //ms
        }, () => {
          this.animateTimeout = setTimeout(() => {
            this.scrollList[(this.index - 1) % length].translate = `translate3d(0, ${80 * ((this.index - 1) + length)}px, 0)`;
            this.animate();
          }, 3000);
        });
      },

      getScrollList() {
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/informations`,
        }, res => {
          if (res.ok && res.data.code === "1") {
            for (let i = 0, l = res.data.result.length; i < l; i++) {
              res.data.result[i].translate = `translate3d(0, ${80 * i}px, 0)`;
            }

            this.scrollList = res.data.result;

            if (this.scrollList.length > 1) {
              this.animate();
            }
          }
        });
      },

      goPage(url) {
        window.location.href = url;
      },
    },

    mounted() {
      this.getScrollList();
    },

    beforeDestroy() {
      clearTimeout(this.animateTimeout);
    },
  };
</script>