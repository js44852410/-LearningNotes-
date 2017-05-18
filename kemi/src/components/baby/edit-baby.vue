<template>
  <div class="wrapper">
    <div class="item-container head" @click="changeHead">
      <div>
        <text class="head-title">头像</text>
      </div>
      <div class="image-container">
        <image :src="faceImageUrl|defaultHead" class="head-image" resize="cover"></image>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container" @click="changeMessage('name')">
      <div>
        <text class="item-title">姓名</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{babyName}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container" @click="changeMessage('sex')">
      <div>
        <text class="item-title">性别</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{gender}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="item-container">
      <input type="date" v-model="birthDay" class="age-input"/>
      <div>
        <text class="item-title">生日</text>
      </div>
      <div class="default-container">
        <text class="default-detail">{{birthDay}}</text>
      </div>
      <div class="right-icon-container">
        <image class="right-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
      </div>
    </div>
    <div class="btn-container">
      <text class="save-btn" @click="saveMessage">保存</text>
      <text v-if="id" class="delete-btn" @click="deleteBaby">删除</text>
    </div>
    <footer :status="2"></footer>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .item-container {
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    width: 750px;
    background-color: #fff;
    border-bottom: 2px solid #f5f4f9;
    position: relative;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
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

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
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
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    /*width: 20%; !* For old syntax, otherwise collapses. *! */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    margin-right: 30px;
  }

  .default-detail {
    color: #666;
    font-size: 28px;
  }

  .age-input {
    position: absolute;
    width: 690px;
    height: 150px;
    opacity: 0;
    z-index: 10;
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

  .btn-container {
    margin-top: 50px;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .save-btn {
    width: 665px;
    height: 80px;
    border-radius: 10px;
    background-color: #fdc528;
    text-align: center;
    line-height: 80px;
    color: #FFF;
    letter-spacing: 20px;
  }

  .delete-btn {
    margin-top: 30px;
    width: 665px;
    height: 80px;
    border-radius: 10px;
    background-color: #FFF;
    text-align: center;
    line-height: 80px;
    color: #999;
    letter-spacing: 20px;
    font-size: 30px;
  }
</style>

<script>
  import footer from '../common/footer.vue';

  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    components: {
      footer,
    },

    data() {
      return {
        faceImageUrl: "",
        babyName: "",
        gender: "男",
        birthDay: "",
        id: "",
        userToken: "",
      };
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
              success: result => {
                stream.fetch({
                  method: "POST",
                  type: "json",
                  url: `${__APIDIR}appapi/userBabys/upload`,
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "token": this.userToken,
                  },
                  body: `{"serverId":"${result.serverId}"}`,
                }, res => {
                  if (res.data.code === "1") {
                    this.faceImageUrl = res.data.result;
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
        let query = {};
        query.type = type;
        query.id = this.id;
        query.babyName = this.babyName;
        query.gender = this.gender;
        query.faceImageUrl = this.faceImageUrl;
        query.birthDay = this.birthDay;

        this.$router.replace({
          name: "changeBabyMessage",
          query: query,
        });
      },

      deleteBaby() {
        modal.confirm({
          message: "您确定要删除宝宝信息么？删除后无法恢复",
          okTitle: "确定",
          cancelTitle: "取消",
        }, res => {
          if (res === "确定") {
            stream.fetch({
              method: 'POST',
              type: 'json',
              url: `${__APIDIR}appapi/deleteBaby`,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "token": this.userToken,
              },
              body: `{"id":"${this.id}"}`,
            }, res => {
              if (res.data.code === "1") {
                this.$router.replace({
                  name: "babyList",
                });
              } else {
                modal.toast({
                  message: res.data.mes,
                  duration: 1,
                });
              }
            });
          }
        });
      },

      /*计算年龄*/
      computeAge() {
        let date = new Date();
        let birthArr = this.birthDay.split("-");
        let age = date.getFullYear() - birthArr[0];

        if (birthArr.length < 3) {
          age = 0;
        } else if (date.getMonth() - birthArr[1] > 0 || (date.getMonth() === birthArr[1] && date.getDate() - birthArr[2] > 0)) {
          age++;
        }

        return age;
      },

      saveMessage() {
        if (!this.babyName) {
          modal.toast({
            message: "请填写宝宝姓名",
            duration: 1,
          });
        } else if (!this.birthDay) {
          modal.toast({
            message: "请填写宝宝生日",
            duration: 1,
          });
        } else {
          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/users/userBabys`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "token": this.userToken,
            },
            body: `{"id":"${this.id}","babyName":"${this.babyName}","gender":"${this.gender}","faceImageUrl":"${this.faceImageUrl}","birthDay":"${this.birthDay}","babyAge":${this.computeAge()}}`,
          }, res => {
            if (res.data.code === "1") {
              this.$router.replace({
                name: "babyList",
              });
            } else {
              modal.toast({
                message: res.data.mes,
                duration: 1,
              });
            }
          });
        }
      },
    },

    mounted() {
      this.userToken = __userToken;
      var query = this.$route.query;

      this.id = query.id || this.id;
      this.babyName = query.babyName || this.babyName;
      this.gender = query.gender || this.gender;
      this.faceImageUrl = query.faceImageUrl || "";
      this.birthDay = query.birthDay || this.birthDay;
    },
  };
</script>