<template>
  <div class="wrapper">
    <div class="task-head">
      <text class="head-title">线上任务</text>
    </div>
    <div class="task-container">
      <container class="task-item" v-for="(item, index) in taskList" @click="goPage(item)" :key="item.id">
        <div>
          <image class="task-img" :src="taskImageList[index]"></image>
        </div>
        <div class="task-title-container">
          <text class="task-title">{{item.taskTitle}}</text>
        </div>
        <div class="task-btn-container" :class="{ complete: item.isComplete!=0}">
          <text class="task-btn">{{statusArr[item.isComplete]}}</text>
        </div>
      </container>
    </div>
    <div class="task-head">
      <text class="head-title">线下活动</text>
    </div>
    <div class="task-container">
      <container class="task-item line-activity">
        <div class="task-title-container">
          <text class="task-title">{{activityName}}</text>
        </div>
        <div class="task-btn-container" @click="goPage">
          <text class="task-btn">查看详情</text>
        </div>
      </container>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background-color: #f5f4f9;
  }

  .task-head {
    height: 88px;
    width: 750px;
    border-bottom: 2px solid #f5f4f9;
    background-color: #fff;
    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .head-title {
    padding-left: 30px;
    color: #333;
    font-size: 32px;
  }

  .task-container {
    background-color: #fff;
    margin-bottom: 30px;
  }

  .task-item {
    margin-left: 30px;
    height: 120px;
    width: 720px;
    border-bottom: 2px solid #f5f4f9;

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .line-activity {
    margin-left: 0;
    width: 750px;
  }

  .task-img {
    width: 50px;
    height: 50px;
  }

  .task-title-container {
    margin-left: 30px;
    flex: 1;
  }

  .task-title {
    color: #666;
    font-size: 28px;
  }

  .task-btn-container {
    width: 138px;
    height: 50px;
    background-color: #ffbc01;
    margin-right: 30px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .complete {
    background-color: #999;
  }

  .task-btn {
    color: #FFF;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 138px;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  module.exports = {
    data() {
      return {
        activityId: "",
        activityName: "",
        taskList: [],
        statusArr: ["立即开始", "已完成"],
        taskImageList: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABNCAYAAABdX7HtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDhFM0IwRDdGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDhFM0IwRDhGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOTNBOUQ4RUZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOEUzQjBENkZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkJ2K14AAAdjSURBVHja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",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABNCAYAAABdX7HtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjAyNEY4ODdGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjAyNEY4ODhGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDI0Rjg4NUZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDI0Rjg4NkZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm9K0/wAAAgZSURBVHja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",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABNCAYAAABdX7HtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzkzQTlEODhGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzkzQTlEODlGQjA1MTFFNjlDMDVCNTBFNEJFMkY5OTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOTNBOUQ4NkZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOTNBOUQ4N0ZCMDUxMUU2OUMwNUI1MEU0QkUyRjk5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkUML8UAAAf+SURBVHja7F1pbFVFFJ5CWYQIjSQCshXjEoRI+wO3mogCUdAoShDQRFsXjAsCChplXySpRhAUZREoaEyRKFVRJBHkBxijplCoYMHlySZqjIVEBArUc+h3vCeFtu/1vblv3uuc5GS+Lnc7Z+abmTPnzs2orq42IqvKN5nzSGvSO4C5vBG4O2km8F+kZcDrST8G3msaL9mkVwPnkvYBvpK0C3A7dQ//kh4F/oO0AricdBvwDtJIHPd0Oco7SQcD9yXtAHyKdB/wFtJ1wOse6HPL8fpO3Mx4cUIy6mkRt6MsJO0J/DXp56q2VwF3JM1TteUM8BLS2cAn6rkPqVF3kT6oWkQW8GHS7cC7SA8AH0FLYGlD2h6YW8xVwDmknYArVYtYSfqRatF1SSuUk0gfUxX4E1XzfwduQXoZMLeY64B/IX2eAbWMT2NxxBTSmcAfkE5VRmhI2pI+CjxNHTNCGZClG8onSB8Bbkm6Efgz0i+AI3FWuGyUA0mHAA8gPQn8NumbwPvVcV1Ji4F7k84AXkoG/aehi5I9pTKwLYeJTejYmZ6aUoSapqoW8Qzw63GcnzvbDxUt3As8lPRF4NOkC4DfQzMOQ5huRwGPJW0OPIe0BPh9RXfDqCbvaOzFyLZPA75KOgs0NfMcR9A/DgYdGHDhkgQ9cHeUW1VfwBedC/xaAxwdhlxEOg54gmKKCOiM5QAZLu4LkZ1HU7EYPw6hc6731OQSNa3cufEC4G9JdwMPt3Ctl0jvBx6JEZiLco2i4zlqZGUS0SLQKtYA9iLtZzAZGqImK/dYfMCFpMuAf3a4cn5DehNwlaVrTEK5U+zvqckRycQkSjrTPRavdUhTIjpsV+W4zZMTxe0BRW0V+7MjbsDfF4f4oNW+DZwVjlKM9tTkGDX1ULGjRIk4+Iw3cb2yR+yfaYIwcqJGCBneAVFLldjfU5ND1CThhYt9Rxy6dBT7c4sog+Z5u4QueWJ/T00OUdN6YF5BklDtMW8ae0ITuTaAvJpZKI6Q9YIpMrkwNaHppiphzPplBbOl2N9TkyveVwtDHPIdi9/nGrtxp5SUBC0MXWGC9J4FdM4XjJrMsXC2xSDgtaS3Ae93zB79oSKylMkZHRFgXuqsdKxf6KZsu0vZ3HhqcpGa4DXJoONMvUuAC0yQyxS2ZKNkyswHzoryWBlwjE82NZFdmV1W4MdDGC3x+Q7q4asW+QMfKMuFPLyVpCju4bcCc7bFSYtOmK76rNrG34xyOyiJpYeiLHbgOHVsQUj0wyOurvjxZhNkrXCy3mrgMeSAP2sf66nJoQnd+YQ9NhKYm9RE4ELVCjj9ZkeC7ydHNeEc9XvuhGfE0BGvUFTG5XzVgmzKhaYmlZOFs/y+F4ahVrChMY7QsgHKwslRkjpYYeFBcpQDKhW/F8V4noJaNDU0JEdwGqZkxbxLxp8Q7YGemhynprqEO8QtwCcs3I+u+fHOBSK1Rl5hTPhOU4ctKaM9bThC8kJ5VrjG8vMUJeg82gFhTu5+QDmcnNJcHOSpKc2oqQVKnuQdSIHnGlerRZSEeG0JCXVWdjudKEc0U8OzIw47QIas89Tvxpv4X3SJRcQ+7WJhHE9NKUZNGShbWg5rxBsSmXaeTj/sRa7jis4zEu0IyVPiJdS2Dhmf40hrgfvXoqNkrTK2Rsk5S1Gv9HlqSjFqkhZxFJ2QK8KtQMekJISxOYn31F7Z6kyiHXEKJQcDOznkiBJldA70SUzpS1MThtbOCUskDH7YxJDG6qkpxahJJiQ/mZq9MFwSCV/cbYIQej5aBUtuyPMIsc/eaEIbsTpChNMDRzlcsWQlTofT58FJYUk/lMWxHOSpyRGJ1RHc8XWBdnP4ueYrPDSsi64q39RV2afUtiOOQgf6enyODFL2KfPUlMajJhEefUgqJqeIFAG78nJKNkodc7I+uUMajdhE7POrTUecva7iYZm82E7LzFfG3VzHQ/atoz8YH0IFkMS8Ww1ysWjoGlPl9NSUotTEIu9TvEJ6H3Ch5fvMUrSTHyWFFoQY4pDt76qUfaw7Qmayb5kgrZH3dvrb4oNySLtEDUfryn8tCdH40j90MEFq6EKipEYlKnhqSmFqEllE+jgwv3s3w/K9RlTrcEmeMkG60aJkOIKzOeYA86ZYElupaAo1mChJgnv8xs9kjJQOhhXi8OIgNZ3tnFDyFnFLgQcYezt/udIaMtXz8vZ7byTbEZKxwBvofqVmtZPTvAJPN0G4O6+hfb89NTUhahIpVSOo5aQ/AhelGSXJZJI3R3wIHXSpS45gkWXKSxXmDdRXp4kfRqjnmk0OWJHIk3tqSjNq0sJ7esimH++Y4FWmVKUpiSPxKGku6GhKKjiC5VmUlao580susgn8KceNLzNl3kRdNpOfSg6YZeuCnprSmJq0cA3apyZ/1wOPMTXf/nFR+FtG8hmFa00Qdl+Zyo7QD1CmZqPfkb4MPNckfwMTDqvL9zKeMzV7drPwh622hXEDnpqaCDVp4cUa2YX+SYOPH5E8bII8JH5jNawvqmSbYK8MXthppUZ9EkM7lo6O0A/Gy6zFyikT1YzVxseeZLdnzsWSr4npjz0tU8ZPyv5UnpockYwovswYhjT0HbrfTLAOvVu1EF4nl5A7v1Kmv0PXC5izwTureU1EDSKi+Q7d/5KoL6q4QE11iRhiOVQc0VcZszcwb8oi+VTt1OSLJ4nyiUxeKZOVwmI18ikz4aboe2pKNflPgAEAcQfkKe2Ld9EAAAAASUVORK5CYII="],
      };
    },

    methods: {
      /*获取任务列表*/
      getTaskList() {
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/selectMyActivityTask`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: `{"activityId":${this.activityId}}`,
        }, res => {
          if (res.data.code === "1") {
            this.taskList = res.data.result;
          }
        });
      },
      goPage(item = {}) {
        if (item.taskId) {
          this.$router.push({
            name: "taskInfo",
            params: {
              id: item.taskId,
            },
            query: {
              activityId: this.activityId,
              activityName: this.activityName,
            },
          });
        } else {
          this.$router.push({
            name: "activityInfo",
            params: {
              activityID: this.activityId,
            },
          });
        }
      },
    },

    mounted() {
      this.activityId = this.$route.query.activityId;
      this.activityName = this.$route.query.activityName;

      this.getTaskList();
    },
  };
</script>