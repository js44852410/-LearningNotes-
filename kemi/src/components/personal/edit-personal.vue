<template>
  <div class="wrapper">
    <div class="item-container head" @click="changeHead">
      <div>
        <text class="head-title">头像</text>
      </div>
      <div class="image-container">
        <image :src="userInfo.headImageUrl|defaultHead" class="head-image" resize="cover"></image>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container" @click="changeMessage('fullName')">
      <div>
        <text class="item-title">姓名</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{userInfo.fullName}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container">
      <div>
        <text class="item-title">手机号</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{userInfo.mobile}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container" @click="changeMessage('gender')">
      <div>
        <text class="item-title">性别</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{userInfo.gender}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container" @click="changeMessage('myHome')">
      <div>
        <text class="item-title">我的家</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{userInfo.myHome}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container my-baby" @click="changeMessage('babyNumber')">
      <div>
        <text class="item-title">我的宝宝</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{babyNumber}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <footer :status="2"></footer>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .item-container {
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

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    padding-left: 30px;
    padding-right: 30px;
    width: 750px;
    background-color: #fff;
    border-bottom: 2px solid #f5f4f9;
    position: relative;
  }

  .head {
    margin-bottom: 20px;
  }

  .head-title {
    font-size: 24px;
    height: 155px;
    line-height: 155px;
    color: #333;
  }

  .item-title {
    font-size: 24px;
    height: 88px;
    line-height: 88px;
    color: #333;
  }

  .image-container {
    height: 110px;
    width: 110px;
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    /*width: 20%; !* For old syntax, otherwise collapses. *! */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1;
    align-items: flex-end;
    margin-right: 30px;
  }

  .head-image {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-position: center;
  }

  .default-container {
    height: 88px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    /*width: 20%; !* For old syntax, otherwise collapses. *! */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1;
    margin-right: 30px;
  }

  .default-detail {
    color: #666;
    font-size: 28px;
  }

  .right-icon-container {
    height: 28px;
    width: 28px;
  }

  .right-icon {
    width: 28px;
    height: 28px;
    background-position: center;
  }

  .my-baby {
    margin-top: 20px;
  }

  .btn-container {
    margin-top: 40px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .save-btn {
    width: 630px;
    height: 80px;
    border-radius: 10px;
    background-color: #fdc528;
    text-align: center;
    line-height: 80px;
    color: #FFF;
    letter-spacing: 20px;
  }

</style>

<script>
  import footer from '../common/footer.vue';
  import {mapGetters} from 'vuex';

  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        babyNumber: "",
      };
    },

    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },

    components: {
      footer,
    },

    methods: {
      changeHead() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            let localId = res.localIds[0];
            wx.uploadImage({
              localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: res => {
                this.userInfo.serverId = res.serverId;
                stream.fetch({
                  method: "POST",
                  type: "json",
                  url: `${__APIDIR}appapi/user/updateContent`,
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "token": __userToken,
                  },
                  body: JSON.stringify(this.userInfo),
                }, res => {
                  if (res.data.code === "1") {
                    modal.toast({
                      message: "修改成功",
                      duration: 1,
                    });

                    this.userInfo.headImageUrl = res.data.result;
                  } else {
                    modal.toast({
                      message: res.data.mes,
                      duration: 1,
                    });
                  }
                });
              },
            });
          },
        });
      },

      changeMessage(type) {
        if (type === "babyNumber") {
          this.$router.push({
            name: "babyList",
          });
        } else {
          this.$router.replace({
            name: "changePersonalMessage",
            query: {
              type,
            },
          });
        }
      },
    },
  };
</script>