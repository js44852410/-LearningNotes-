<template>
  <div class="wrapper">
    <div class="image">
      <image class="item-image" :src="taskImageUrl|dirImage"></image>
    </div>
    <div class="item-content html-text" v-html="taskDetail"></div>
    <div class="btn-bottom" @click="completeTask" v-if="isComplete">
      <text class="btn-submit">完成</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background-color: #fff;
  }

  .image {
    width: 750px;
    height: 300px;
    background-color: #f3f3f3;
  }

  .item-image {
    width: 750px;
    height: 300px;
  }

  .item-content {
    margin: 0 30px;
    padding-bottom: 200px;
  }

  .btn-bottom {
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 200px;
    background: #fff;
    padding-bottom: 60px;
    padding-top: 60px;
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

  .btn-submit {
    width: 670px;
    height: 80px;
    background-color: #ffbc00;
    text-align: center;
    line-height: 80px;
    color: #fff;
    font-size: 32px;
    border-radius: 10px;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  module.exports = {
    data() {
      return {
        id: "",
        taskImageUrl: "",
        taskDetail: "",
        isWeiXin: false,
        isComplete: false,
        activityId: "",
        activityName: "",
      };
    },

    methods: {
      judgeWeiXIn() {
        let ua = window.navigator.userAgent.toLowerCase();
        this.isWeiXin = ua.match(/MicroMessenger/i) === 'micromessenger';
      },

      getTaskDetail() {
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/selectActivityTaskStatistic/${this.id}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }, res => {
          if (res.ok) {
            let data = res.data;

            if (typeof data === "string") {
              data = eval("(" + data + ")");
            }

            if (data.code === "1") {
              this.taskImageUrl = data.result.taskImageUrl;
              this.taskDetail = data.result.taskDetail;
              this.isComplete = this.isWeiXin && data.result.isComplete === 0;
            }
          }
        });
      },

      completeTask() {
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/updateActivityTaskStatistic`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: `{"id":${this.id}}`,
        }, res => {
          if (res.ok) {
            let data = res.data;

            if (typeof data === "string") {
              data = eval("(" + data + ")");
            }

            if (data.code === "1") {
              this.isComplete = false;
              this.$router.push({
                name: "taskList",
                query: {
                  activityId: this.activityId,
                  activityName: this.activityName,
                },
              });
            }
          }
        });
      },
    },

    mounted() {
      this.judgeWeiXIn();
      this.id = this.$route.params.id;

      const query = this.$route.query;
      this.activityId = query.activityId;
      this.activityName = query.activityName;

      this.getTaskDetail();
    },
  };
</script>