<template>
  <div class="feed-back-wrapper">
    <textarea class="feed-back-text" placeholder="请输入您的反馈意见 (200字以内)" v-model="feedbackContent"></textarea>
    <input class="tel-input" type="num" placeholder="请输入您的联系方式" v-model="userInfo.mobile"></input>
    <button type="button" class="sub-button" @click="submitFeed">提交</button>
  </div>
</template>

<style scoped>
  .feed-back-wrapper {
    width: 100%;
    /*min-height: 1334px;*/
    background: #fff;
  }

  .feed-back-text {
    padding-left: 30px;
    height: 320px;
    width: 750px;
    font-size: 26px;
    border: none;
    padding-top: 28px;
  }

  .tel-input {
    width: 750px;
    height: 88px;
    text-indent: 30px;
    font-size: 26px;
    border: 1px solid #dddddd;
    -webkit-appearance: none;
    border-left: none;
    border-right: none;
  }

  .sub-button {
    width: 670px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    height: 80px;
    background-color: #fff;
    color: #f1da7e;
    border: 1px solid #ffc72a;
    border-bottom: 2px solid #ffc72a;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    font-size: 34px;
    background-color: #ffc72a;
    letter-spacing: 3px;
    color: #fff;
  }

  .sub-button:focus {
    outline: none;
  }
</style>
<script>
  import {mapGetters} from 'vuex';
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        mobile: '',
        feedbackContent: '',
        userToken: '',
      };
    },

    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },

    methods: {
      postFeedBcak(repo, callback) {
        if (this.feedbackContent === '') {
          modal.toast({
            message: "请填写反馈内容",
            duration: 1,
          });
          return false;
        } else if (this.feedbackContent.length < 5) {
          modal.toast({
            message: "反馈内容不能少于5个字",
            duration: 1,
          });
          return false;
        } else if (this.feedbackContent.length > 200) {
          modal.toast({
            message: "反馈内容不能多于200字",
            duration: 1,
          });
          return false;
        }
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: `{"mobile": ${this.userInfo.mobile || null}, "feedbackContent":"${this.feedbackContent}"}`,
        }, callback);
      },

      submitFeed() {
        this.postFeedBcak('feedback', res => {
          if (res.ok && res.data.code === "1") {
            modal.toast({
              message: "您的反馈已提交",
              duration: 1,
            });

            setTimeout(() => {
              this.$router.push({
                "name": "personalCenter",
              });
            }, 1000);
          } else {
            modal.toast({
              message: res.data.message,
              duration: 1,
            });
          }
        });
      },
    },

    mounted() {
      this.userToken = __userToken;
    },
  };
</script>