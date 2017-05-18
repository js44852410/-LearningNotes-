<template>
  <div class="wrapper">
    <list class="task-container">
      <cell class="shownoAct" v-if="taskList.length == 0">
        <image class="noActiveList"
               src="data:image/png;base64,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"></image>
        <text class="noActiveTxt">暂无任务</text>
      </cell>
      <cell v-else v-for="item in taskList" class="item-container" @click="goPage(item)" :key="item.activityId">
        <div class="item-message-container">
          <text class="task-title">{{item.activityName}}</text>
          <text class="task-time">任务结束时间：{{item.activityEndTime}}</text>
        </div>
        <div class="right-icon-container">
          <image class="right-icon" resize="contain"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
        </div>
      </cell>

    </list>
  </div>
</template>

<style scoped>
  .item-container {
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff;
    width: 750px;
    height: 120px;
    border-bottom: 2px solid #f5f4f9;

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .item-message-container {
    -moz-justify-content: space-around;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    flex: 1;
  }

  .task-title {
    font-size: 28px;
    color: #333;
  }

  .task-time {
    font-size: 22px;
    color: #999;
  }

  .right-icon-container {
    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .right-icon {
    width: 15px;
    height: 27px;
    background-position: center;
  }

  .noActiveList {
    width: 400px;
    height: 400px;
  }

  .shownoAct {
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
  }

  .noActiveTxt {
    color: #a5a5a5;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  module.exports = {
    data() {
      return {
        taskList: [],
      };
    },

    methods: {
      goPage(item = {}) {
        this.$router.push({
          name: "taskList",
          query: {
            activityId: item.activityId,
            activityName: item.activityName,
          },
        });
      },

      getTaskActivityList() {
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/selectMyALLTask`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
        }, res => {
          if (res.data.code === "1") {
            this.taskList = res.data.result;
          }
        });
      },
    },

    mounted() {
      this.getTaskActivityList();
    },
  };
</script>