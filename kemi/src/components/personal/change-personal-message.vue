<template>
  <div class="wrapper">
    <div class="change-container">
      <div v-if="type === 'fullName'" class="change-item-container">
        <input type="text" autofocus v-model="userInfo.fullName" class="change-input" placeholder="姓名"/>
      </div>
      <div v-if="type === 'gender'" class="change-sex">
        <div class="sex-item" @click="changeSex('男')">
          <text class="sex-text">男</text>
          <image v-if="userInfo.gender != '女'" resize="contain" class="sex-icon"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzU0NkQyODBGQUZEMTFFNkFERkFENTRFMzA4Q0UyQzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzU0NkQyODFGQUZEMTFFNkFERkFENTRFMzA4Q0UyQzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNTQ2RDI3RUZBRkQxMUU2QURGQUQ1NEUzMDhDRTJDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNTQ2RDI3RkZBRkQxMUU2QURGQUQ1NEUzMDhDRTJDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnGLJSgAAAL+SURBVHja1JhJaBRBFIZ7okYSRcGgOSioBxVEcDmIYGLiqLgvCMYtShQXFCO4RNCDy0UPRlAUSQTFBbcc3MUY44IrkoMQBUH0IAouoIOKBhMk/g/+hvZRznR3umemH3yQfpMp5q+ueu+virU3WlGNgWAEuCgPOREVMQw8AnVgliRiEXwjY8B10IvPrWBa1N7IJNDoECGRCzZHScg8cA10U3nJzY2KkJXgLGffGadFBGiJgpCtoBZ0UvlDYAloy/aqFQN7wW7+7YxdoBK024nOWSpCZv8IWK7y8sPX8238E9kopCs4w7XvDFlCy7gvrGRChoA/4HUGRXQHl8AElW8BZaxQxrD3yChwHzSAfhkSUQBuG0R8A1OSibCFlIC7oA/9izSc3mkW0ZcTOVrlP4Hx/MxKJWQL6KGW2C3QM00iBoGHYKjKvwXjwDM3g4iQheCpyg8H9SA/ZBHiXh+AASr/EhSBV24HEiHfxXSB5wZzdpVVJIyQ2b4HClW+CRSD914Gszf7VxoyXbHitMpdAhYxg29cL197s3/xOmCO2lhxw0yI3z9usAh+YzG4APJUXnLTwQ8/g2qL8o5V4rPKLwKHDVbBa6wDpwxv+Bj7xG+/A5u8liyviSCh8qvoffzGDnDQMBnVYAWbsRWkEIsbf6rhNW8C232YvwNgp8E3bQNVTvMXtBCLJXkO+GVwnhtcji8W6CSNnjNk9teAPUFVj1Q2/g6Yz3OxM/ZxOSSLPG7gcpVv5Z6rDbIMujmPiMdZqtawLJcasOA/3xGncAPMVPmfrIJ1QTcltwer82C1WstSjk8YfmwhG12JyifYq26G0V29nBCPgo0ql0uRcT73p8Ebqf7vAzv5k7C8jtej7n6WUb0XLnP5ifkbrD5/A8aCF6Gei31e0FWzFKeKZjAZfAzbQvu9fKjimTpZPAal6RDRESGy6dfybG2Kem7sRLpOZh25DpJyXAGuqPw5MNvQSLNWiH2zUcbGabG3lBsaaPiXYAHdxuezatVk6vrlrwADABvakUwVYzaUAAAAAElFTkSuQmCC"></image>
        </div>
        <div class="sex-item" @click="changeSex('女')">
          <text class="sex-text">女</text>
          <image v-if="userInfo.gender == '女'" resize="contain" class="sex-icon"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzU0NkQyODBGQUZEMTFFNkFERkFENTRFMzA4Q0UyQzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzU0NkQyODFGQUZEMTFFNkFERkFENTRFMzA4Q0UyQzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNTQ2RDI3RUZBRkQxMUU2QURGQUQ1NEUzMDhDRTJDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNTQ2RDI3RkZBRkQxMUU2QURGQUQ1NEUzMDhDRTJDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnGLJSgAAAL+SURBVHja1JhJaBRBFIZ7okYSRcGgOSioBxVEcDmIYGLiqLgvCMYtShQXFCO4RNCDy0UPRlAUSQTFBbcc3MUY44IrkoMQBUH0IAouoIOKBhMk/g/+hvZRznR3umemH3yQfpMp5q+ueu+virU3WlGNgWAEuCgPOREVMQw8AnVgliRiEXwjY8B10IvPrWBa1N7IJNDoECGRCzZHScg8cA10U3nJzY2KkJXgLGffGadFBGiJgpCtoBZ0UvlDYAloy/aqFQN7wW7+7YxdoBK024nOWSpCZv8IWK7y8sPX8238E9kopCs4w7XvDFlCy7gvrGRChoA/4HUGRXQHl8AElW8BZaxQxrD3yChwHzSAfhkSUQBuG0R8A1OSibCFlIC7oA/9izSc3mkW0ZcTOVrlP4Hx/MxKJWQL6KGW2C3QM00iBoGHYKjKvwXjwDM3g4iQheCpyg8H9SA/ZBHiXh+AASr/EhSBV24HEiHfxXSB5wZzdpVVJIyQ2b4HClW+CRSD914Gszf7VxoyXbHitMpdAhYxg29cL197s3/xOmCO2lhxw0yI3z9usAh+YzG4APJUXnLTwQ8/g2qL8o5V4rPKLwKHDVbBa6wDpwxv+Bj7xG+/A5u8liyviSCh8qvoffzGDnDQMBnVYAWbsRWkEIsbf6rhNW8C232YvwNgp8E3bQNVTvMXtBCLJXkO+GVwnhtcji8W6CSNnjNk9teAPUFVj1Q2/g6Yz3OxM/ZxOSSLPG7gcpVv5Z6rDbIMujmPiMdZqtawLJcasOA/3xGncAPMVPmfrIJ1QTcltwer82C1WstSjk8YfmwhG12JyifYq26G0V29nBCPgo0ql0uRcT73p8Ebqf7vAzv5k7C8jtej7n6WUb0XLnP5ifkbrD5/A8aCF6Gei31e0FWzFKeKZjAZfAzbQvu9fKjimTpZPAal6RDRESGy6dfybG2Kem7sRLpOZh25DpJyXAGuqPw5MNvQSLNWiH2zUcbGabG3lBsaaPiXYAHdxuezatVk6vrlrwADABvakUwVYzaUAAAAAElFTkSuQmCC"></image>
        </div>
      </div>
      <div v-if="type === 'myHome'" class="change-item-container">
        <input type="text" autofocus v-model="userInfo.myHome" class="change-input"/>
      </div>
    </div>
    <div class="save-container" @click="saveMessage">
      <text class="save-btn">保存</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .change-container {
    margin-top: 20px;
    background-color: #fff;
  }

  .change-item-container {
    width: 750px;
    height: 100px;
  }

  .change-input {
    margin-left: 20px;
    margin-right: 20px;
    height: 100px;
    border: none;
  }

  .sex-item {
    width: 720px;
    height: 88px;

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

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    border-bottom: 2px solid #f5f4f9;
  }

  .change-sex {
    margin-left: 30px;
  }

  .sex-text {
    color: #333;
    font-size: 28px;
  }

  .sex-icon {
    height: 88px;
    width: 40px;
    background-position: center;
    margin-right: 50px;
  }

  .save-container {
    width: 660px;
    height: 80px;
    margin: auto;
    margin-top: 20px;
    background-color: #ffbc00;
    border-radius: 10px;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .save-btn {
    color: #FFF;
    letter-spacing: 20px;
  }
</style>

<script>
  import {mapGetters} from 'vuex';
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        type: "",
      };
    },

    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },

    methods: {
      changeSex(type) {
        this.userInfo.gender = type || '男';
      },

      /*保存信息*/
      saveMessage() {
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
            this.$router.replace({
              "name": "editPersonal",
            });
          } else {
            modal.toast({
              message: res.data.mes,
              duration: 1,
            });
          }
        });
      },
    },

    mounted() {
      this.type = this.$route.query.type;
    },
  };
</script>