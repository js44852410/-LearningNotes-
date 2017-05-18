<template>
  <div class="info-wrapper">
    <div class="user-info">
      <div class="user-info-content" @click="goPage()">
        <image class="user-img" :src="userInfo.headImageUrl|defaultHead" resize="cover"></image>
        <div v-if="userInfo.mobile" class="user-login">
          <div class="message-container">
            <text class="user-name">{{userInfo.fullName}}</text>
            <image class="gender-icon" :src="sexSrc[userInfo.gender == '男' ? 0 : 1]"></image>
          </div>
          <a class="user-edit-btn" v-if="!userInfo.headImageUrl || !userInfo.fullName || !userInfo.myHome">
            <text class="edit" style="color: #e3e3e3;">点击这里, 完善个人信息</text>
          </a>
        </div>
        <div v-else class="user-no-login">
          <a class="login-btn">
            <text class="login-word">登录/注册</text>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .info-wrapper {
    background: #fff;
    margin-bottom: 20px;
  }

  .user-info {
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

    margin-top: 80px;
    margin-bottom: 10px;
    background: #fff;
  }

  .user-info-content {
    width: 290px;
  }

  .user-img {
    width: 122px;
    height: 122px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    background-position: center;
  }

  .message-container {
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

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .user-name {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 16px;
    margin-right: 20px;
  }

  .gender-icon {
    width: 32px;
    height: 32px;
  }

  .user-edit-btn {
    height: 40px;
    width: 290px;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    border-radius: 20px;
    margin: 0 auto;
    margin-bottom: 46px;
  }

  .edit {
    line-height: 40px;
    text-align: center;
    font-size: 22px;
  }

  .login-btn {
    height: 56px;
    width: 198px;
    border-radius: 28px;
    margin: 0 auto;
    background: #ffbc00;
  }

  .login-word {
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 56px;
  }

  .user-no-login {
    margin-bottom: 60px;
  }


</style>

<script>
  module.exports = {
    props: ["userInfo"],
    data() {
      return {
        sexSrc: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAATlBMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD///7/xB3/+OX/9+D/6Kf/12f/vw3/zDz/45X/7Lf/+en/8s//5Zz/23X/0VH/zDv/yTP/8s2G33IqAAAAB3RSTlMAvk2E8/L0nCRdegAAAKBJREFUKM+V09kKxCAMBdBol7hWu3f+/0entIMtXAzMfRE8iCZEItKqZUyrNJ1puJaGSHM9mpSgijpBO2IpoOZOUYydBT3cWtdt2hg0BWdcSLy6g0Gzj5Zt9J/ZMugyDtc6jAuD7v7Em/0O9YZYdmIAnexTrAM1727JZ/+8N73enEA5l3rzg9irH9b6DFqNOFetPJPyPMt/4fpHPWN6pYm+q4YYhjqKlV4AAAAASUVORK5CYII=",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAAV1BMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vgX/+eb/vwv/9+D/6Kf/12f/7bj/6q3/zDz/45X//vv/5p3/xB7/xB3/wA7/8MX/67H/4o//2XD/zDv/3oG1BpFxAAAAB3RSTlMA875NhExOK39ouAAAALRJREFUKM+Vk+sKwyAMhaO2M95t7XXd+z/npAxZsWbs/PHAR0jMBQAEZ7IW4z1kdbKlDqCXbQngBOXACMpAUrrSaNWobLylOBg34eTMgDc0eX2+2qeaHmb5OG2OilpXrLMVVXOxk6roiMXiSMf+mTcaXWqO3xSfOeeiyn8HeaFhQ73uuVczznWvMASf2n3WSun2jJIPAVt0XzVuARv0tZyF15QSvVc/dlIQVNC3kPVo3FGOfAMT2Rlv1DwUlwAAAABJRU5ErkJggg=="],
      };
    },

    methods: {
      goPage() {
        if (__userToken) {
          this.$router.push({
            name: "editPersonal",
          });
        } else {
          this.$router.push({
            name: "bindMobile",
          });
        }
      },
    },
  };
</script>