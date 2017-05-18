<template>
  <div class="wrapper">
    <div class="comment-mes-container">
      <text class="comment-mes">最多可以选择3个标签呦</text>
    </div>
    <div class="comment-container">
      <text class="comment-btn" v-for="item in commentList"
            :class="{active: item.checked, disabled: selectNum==3 && !item.checked}"
            :key="item.id"
            @click="checkComment(item)">{{item.commentTag}}</text>
    </div>
    <div class="submit-btn-container">
      <text class="submit-btn" @click="submitComment">发布</text>
    </div>
  </div>
</template>
<style scoped>
  .comment-mes-container {
    width: 750px;
    height: 60px;
    background-color: #f5f5f7;
  }

  .comment-mes {
    color: #999;
    font-size: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 100px;
    margin-top: 30px;
  }

  .comment-container {
    flex: 1;

    padding-top: 30px;
    padding-left: 100px;
    padding-right: 100px;
    background-color: #f5f5f7;

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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;

    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .comment-btn {
    width: 260px;
    height: 60px;
    color: #999;
    font-size: 26px;
    border: 1px solid #cecece;
    margin-bottom: 30px;
    text-align: center;
    line-height: 60px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .disabled {
    background-color: #eee;
  }

  .active {
    border: 1px solid #FF9869;
    background-color: #FFF5D4;
    color: #FF9869;
  }

  .submit-btn-container {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    margin-bottom: 130px;
  }

  .submit-btn {
    background-color: #FFBC01;
    width: 670px;
    height: 80px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;

    color: #FFF;
    font-size: 32px;
    text-align: center;
    line-height: 80px;
  }
</style>
<script>
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');
  export default {
    data() {
      return {
        commentList: [],
        selectNum: 0,
        showModal: false,
      };
    },

    methods: {
      getCommentList() {
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/selectCommentTag`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
        }, res => {
          if (res.data.code === "1") {
            this.commentList = res.data.result;
          }
        });
      },

      checkComment(item) {
        if (item.checked) {
          this.$set(item, "checked", 0);
          this.selectNum--;
        } else {
          if (this.selectNum < 3) {
            this.$set(item, "checked", 1);
            this.selectNum++;
          } else {
            if (!this.showModal) {
              this.showModal = true;

              modal.toast({
                message: "最多选择3个标签",
                duration: 1,
              });

              setTimeout(() => {
                this.showModal = false;
              }, 1300);
            }
          }
        }
      },

      submitComment() {
        let selectList = [];
        let selectNameList = [];
        let orderId = this.$route.query.orderId;

        for (let item of this.commentList) {
          if (item.checked) {
            selectList.push(item.id);
            selectNameList.push(item.commentTag);
          }
        }

        if (selectList.length <= 0) {
          modal.toast({
            message: "请选择评价标签",
            duration: 1,
          });
        } else {
          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/toAssessMyAct`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "token": __userToken,
            },
            body: `{"orderId":${orderId}, "commentIds": [${selectList}],"commentDetails":"${selectNameList}"}`,
          }, res => {
            if (res.data.code === "1") {
              this.$router.replace({
                name: 'myActivityList',
                params: {
                  status: 'assess',
                },
              });
            }
          });
        }
      },
    },

    mounted() {
      this.getCommentList();
    },
  };
</script>