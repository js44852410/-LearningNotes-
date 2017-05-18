<template>
  <div class="wrapper">
    <div class="review-info-wrapper">
      <div class="review-info-content">
        <div class="review-title">
          <text class="review-title-text">{{itemInfo.title}}</text>
        </div>
        <div class="review-image-box">
          <image class="review-image" :src="itemInfo.cotentImageUrl|dirImage"></image>
        </div>
        <div class="review-info-item html-text" v-html="itemInfo.articleDetails"></div>
        <div class="review-number">
          <div class="reader-number">
            <text class="reader-number number-text">阅读 {{readingNum}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .review-info-wrapper {
    background: #fff;
    margin-bottom: 20px;
  }

  .review-info-content {
    margin: 40px 30px 0;
  }

  .review-title-text {
    font-size: 32px;
    line-height: 50px;
    color: #333;
    margin-bottom: 30px;
  }

  .review-time-text {
    font-size: 22px;
    color: #333;
    text-align: right;
    margin-bottom: 30px;
  }

  .review-image {
    height: 270px;
    width: 690px;
    border-radius: 10px;
    margin-bottom: 40px;
  }

  .review-info-item {
    font-size: 28px;
    color: #333;
    line-height: 50px;
    margin: 40px 0 70px;
  }

  .review-number {
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
  }

  .reader-number, .praise-number {
    flex-direction: row;
    font-size: 24px;
    color: #999;
  }

  .image-icon {
    height: 30px;
    width: 30px;
  }

  .reader-icon {
    margin-right: 20px;
  }

  .reader-number {
    margin-right: 40px;
  }

  .praise-icon {
    margin-right: 10px;
  }
</style>

<script>
  import { __KMBirdge } from '../../js/bridge';
  const stream = weex.requireModule('stream');

  module.exports = {
    data() {
      return {
        itemInfo: {cotentImageUrl: ''},
        id: '',
        readingNum: 0,
        appreciateIt: true,
      };
    },

    methods: {
      getPageInfo() {
        this.id = this.$route.params.id;
        stream.fetch({
          method: 'post',
          type: 'json',
          url: `${__PREAPIDIR}api/preview/historyActivitys/${this.id}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }, res => {
          if (res.ok) {
            let data = res.data;

            if (typeof data === "string") {
              data = eval("(" + data + ")");
            }

            this.itemInfo = data.result;

            __KMBirdge("getShareInfo", {
              "id": `${this.id}`,
              "title": this.itemInfo.title,
              "icon": this.itemInfo.cotentImageUrl,
              "detail": this.itemInfo.articleDetails.replace(/<[^>]*>/g, "").trim().slice(0, 50),
              "url": window.location.href,
            });

            setShare({
              "title": this.itemInfo.title,
              "imgUrl": `${__IMGURL}${this.itemInfo.cotentImageUrl}`,
              "desc": this.itemInfo.articleDetails.replace(/<[^>]*>/g, "").trim().slice(0, 50),
              "link": `${__DIRPATH}reviewInfo/${this.id}`,
            });
          }
        });
      },
    },

    mounted() {
      this.getPageInfo();
    },

    updated() {
      let imgGroup = [...document.getElementsByTagName('img')];//将类数组转为数组
      for (let item of imgGroup) {
        item.style.width = '100%';
        item.style.marginBottom = '20px';
      }
    },
  };
</script>