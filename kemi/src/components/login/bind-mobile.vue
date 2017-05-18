<template>
  <div class="wrapper">
    <div class="register-forget-input">
      <div class="input-box">
        <image class="input-image"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAMAAAB2vTk8AAAAPFBMVEUAAABkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGS+d2oUAAAAE3RSTlMA7gU7kROJ5kodxXngt7KSc2oynSBf8QAAAHJJREFUKM/t0zsOgCAQBNBhAeUj/rj/XQUam4HQ2DkdeSFLyA7EqEyijMBo0OgFCjwFcjfI6GSC5LDwjtKyQ8LJyG22KiG/6qqEJMSmhGJqysiWQan3eLdaTm1Qh+5r8Bs/Nfpi2d5DzdStQR0GJRpU7wEozwzAXiB8ngAAAABJRU5ErkJggg=="></image>
        <input v-model="mobile" ref="mobile" class="item-input" type="tel" placeholder="请输入手机号"
               maxlength="11"/>
      </div>
      <div class="input-box">
        <image class="input-image image-pwd"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAMAAAB/VplGAAAAaVBMVEUAAABkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGQOI0GnAAAAInRSTlMAHesFTPm4LJSGeOVY3g4gEKclcDfz49nJpYJoGO5BzsOrkCgp/gAAAOxJREFUOMuFUll2wyAMNGIH4y1e4mxtdf9Dts1zYpsIww8D86TRMkXi8Ko4Oib0B+wDpb/wFNt4dDd17hL0D37/hV6hJNkrDvX/rTXFdgPe08L8jPOB8AVDkxbupXw8hcXmkzk1ymFSTge0cQSbwQjGq06YO37FVQmwzXsiNhY9hV1/Opy2z3JkkdRYbh7QfxQPa8BsP5uz7QvVQCy+gnpBzpBucAtQgqKFWoBnFM38AiQntyZfdHVI+45Onist31h+LEVLD3VdiY5ZDWyz0OkWlT2VGTtkzBSla59W5EwYaFfdnZG9lF65evf9C7KKCfpcuhwdAAAAAElFTkSuQmCC"></image>
        <input v-model="code" class="item-input input-code" placeholder="输入验证码" maxlength="6" type="tel"/>
        <text v-show="!count" class="btn-word" @click="getCode">获取验证码</text>
        <text v-show="count" class="btn-change">重新获取({{count}})</text>
      </div>
    </div>
    <div class="submit-btn" @click="bindMobile">
      <text class="submit-text">确定</text>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #fff;
  }

  .register-forget-input {
    margin-top: 105px;
    margin-bottom: 50px;
  }

  .input-box {
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

    margin-left: 42px;
    margin-right: 42px;
    border-bottom: 2px solid #e0e0e0;
  }

  .input-no-margin {
    margin-left: 0;
  }

  .input-image {
    height: 34px;
    width: 26px;
    margin-left: 12px;
  }

  .image-pwd {
    height: 34px;
    width: 30px;
  }

  .item-input {
    width: 640px;
    height: 100px;
    border: none;
    text-indent: 30px;
    font-size: 24px;
    color: #333;
  }

  .code-box {
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

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    margin-right: 30px;
    margin-left: 56px;
  }

  .input-code {
    border: none;
    width: 450px;
  }

  .btn-word {
    padding-left: 20px;
    border-left: 1px solid #e0e0e0;
    color: #ffbc01;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
  }

  .btn-change {
    color: #e0e0e0;
    padding-left: 20px;
    border-left: 1px solid #e0e0e0;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
  }

  .submit-btn {
    height: 80px;
    width: 666px;
    margin: 0 auto;
    background: #ffbc01;
    border-radius: 10px;
  }

  .submit-text {
    line-height: 80px;
    text-align: center;
    color: #fff;
    letter-spacing: 10px;
    font-size: 25px;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  const stream = weex.requireModule('stream');

  module.exports = {
    data() {
      return {
        checkRegister: 0,
        mobile: "",
        code: "",
        count: 0,
      };
    },

    methods: {
      countDown() {
        let interval = setInterval(() => {
          this.count--;
          if (this.count <= 0) {
            clearInterval(interval);
          }
        }, 1000);
      },
      getCode() {
        if (!/^1[345678]\d{9}$/.test(this.mobile)) {
          modal.toast({
            message: "请输入正确的手机号码",
            duration: 1,
          });
        } else {
          stream.fetch({
            method: "GET",
            url: `${__APIDIR}appapi/getSms?mobile=${this.mobile}&type=bind`,
            type: "json",
          }, res => {
            if (res.data.code === "1") {
              this.count = 60;
              this.countDown();
            } else {
              modal.toast({
                message: res.data.mes,
                duration: 1,
              });
            }
          });
        }
      },

      login(data) {
        stream.fetch({
          method: "POST",
          type: "json",
          url: `${__APIDIR}appapi/V1.3/login`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: `{"weiSurfaceId":${data.id}, "mobile":"${data.username}"}`,
        }, res => {
          if (res.data.code === "1") {
            __userToken = res.data.result.split(",")[0];
            __userMobile = this.mobile;
            setCookie("__userToken", __userToken, null);

            let redirect = this.$route.query.redirect;
            if (redirect) {
              this.$router.replace(redirect);
            } else {
              this.$router.replace({
                "name": "personalCenter",
              });
            }
          } else {
            modal.toast({
              message: res.data.mes,
              duration: 1,
            });
          }
        });
      },
      bindMobile() {
        if (!/^1[345678]\d{9}$/.test(this.mobile)) {
          modal.toast({
            message: "请输入正确的手机号码",
            duration: 1,
          });
        } else if (this.code.length < 6) {
          modal.toast({
            message: "请输入短信验证码",
            duration: 1,
          });
        } else {
          stream.fetch({
            method: "POST",
            url: `${__APIDIR}wei/addMobile`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            type: "json",
            body: `{"mobile":"${this.mobile}", "id":${__weiSurfaceId}, "sms":"${this.code}"}`,
          }, res => {
            if (res.data.code === "1") {
              this.login(res.data.result);
            } else if (res.data.code === 0) {
              modal.toast({
                message: res.data.mes,
                duration: 1,
              });
            }
          });
        }
      },
    },
  };
</script>