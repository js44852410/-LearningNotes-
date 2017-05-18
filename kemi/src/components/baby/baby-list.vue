<template>
  <div class="wrapper">
    <div class="contacts-content">
      <div class="contacts-item" v-for="item in contactsList" @click="goPage(item)">
        <div class="head-container">
          <image :src="item.faceImageUrl|defaultHead" class="baby-head" resize="cover"></image>
        </div>
        <div class="message-container">
          <div class="name-container">
            <text class="name">{{item.babyName}}</text>
            <image class="sex-image" :src="sexSrc[item.gender == '男' ? 0 : 1]"></image>
          </div>
          <div class="age-container">
            <text class="age">{{item.babyAge}}岁</text>
          </div>
        </div>
        <div class="go-detail">
          <image class="go-detail-btn" resize="contain"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII="></image>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <a class="add-btn" @click="goPage">添加宝宝</a>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .btn-box {
    height: 88px;
    margin-top: 20px;
    background: #fff;
  }

  .add-btn {
    text-align: center;
    line-height: 94px;
    font-size: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAMAAAAynjhNAAAAbFBMVEUAAAD5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugcX2gZ1AAAAI3RSTlMAiAb54nhwrXct1WtUStnSkygZ8/JbQw8KyWdQNMC3pklgJ39XNosAAAD4SURBVCjPhZHZboMwEEWHsWPXZt8CBLK09///sYlUythK4LyYqyPdwWP6h7O7Vq2/Z0xvmAv8UcwUwwngTc1cGw8kcUECla7flxZJaDOo85bOCllQrZHKnELL+h5eRmKPXkQLQwEGViSNOtQ1tEgKHGqGEqmL9RjoIi53ovzw13qU4cVK9Adr2V/q4ZNIuAK8+eHRmRKomGIyjRVDb5g3b13e5XJL1bQQ526gwV1uSp1OcnxTQol5zUJSNxqFI4nUY4lpoI+6gpf28fXkhuvreBAtUEFzi42OyEY7ypMnV0yvI6cGqhEynp3C0o62+N7TBdwHvcO6818lDBXCiDse1AAAAABJRU5ErkJggg==) 260px center no-repeat;
    color: #ffbc01;
  }

  .contacts-item {
    height: 156px;
    border-bottom: 2px solid #f5f4f9;
    background-color: #fff;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;
  }

  .head-container {
    margin: 30px;
    overflow: hidden;
    border-radius: 50%;
    width: 96px;
    height: 96px;
  }

  .baby-head {
    width: 96px;
    height: 96px;
    background-position: center;
  }

  .message-container {
    -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1; /* OLD - Firefox 19- */
    /*width: 20%; !* For old syntax, otherwise collapses. *! */
    -webkit-flex: 1; /* Chrome */
    -ms-flex: 1; /* IE 10 */
    flex: 1;

    -webkit-box-pack: center;
    -moz-justify-content: space-around;
    -webkit-justify-content: space-around;
    justify-content: space-around;

    margin-top: 30px;
    margin-bottom: 30px;
  }

  .name-container {
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;
  }

  .name {
    font-size: 40px;
    line-height: 40px;
  }

  .sex-image {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-left: 30px;
    background-position: center;
  }

  .age {
    color: #6d6d6d;
    font-size: 28px;
  }

  .go-detail {
    height: 156px;
    width: 30px;
    margin-right: 20px;
  }

  .go-detail-btn {
    height: 156px;
    width: 20px;
    background-position: center;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        token: "",
        contactsList: [],
        sexSrc: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAATlBMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD///7/xB3/+OX/9+D/6Kf/12f/vw3/zDz/45X/7Lf/+en/8s//5Zz/23X/0VH/zDv/yTP/8s2G33IqAAAAB3RSTlMAvk2E8/L0nCRdegAAAKBJREFUKM+V09kKxCAMBdBol7hWu3f+/0entIMtXAzMfRE8iCZEItKqZUyrNJ1puJaGSHM9mpSgijpBO2IpoOZOUYydBT3cWtdt2hg0BWdcSLy6g0Gzj5Zt9J/ZMugyDtc6jAuD7v7Em/0O9YZYdmIAnexTrAM1727JZ/+8N73enEA5l3rzg9irH9b6DFqNOFetPJPyPMt/4fpHPWN6pYm+q4YYhjqKlV4AAAAASUVORK5CYII=",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAAV1BMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vgX/+eb/vwv/9+D/6Kf/12f/7bj/6q3/zDz/45X//vv/5p3/xB7/xB3/wA7/8MX/67H/4o//2XD/zDv/3oG1BpFxAAAAB3RSTlMA875NhExOK39ouAAAALRJREFUKM+Vk+sKwyAMhaO2M95t7XXd+z/npAxZsWbs/PHAR0jMBQAEZ7IW4z1kdbKlDqCXbQngBOXACMpAUrrSaNWobLylOBg34eTMgDc0eX2+2qeaHmb5OG2OilpXrLMVVXOxk6roiMXiSMf+mTcaXWqO3xSfOeeiyn8HeaFhQ73uuVczznWvMASf2n3WSun2jJIPAVt0XzVuARv0tZyF15QSvVc/dlIQVNC3kPVo3FGOfAMT2Rlv1DwUlwAAAABJRU5ErkJggg=="],
      };
    },

    methods: {
      goPage(params = {}) {
        this.$router.push({
          name: "editBaby",
          query: params,
        });
      },
      getContactsList(repo, callback) {
        return stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/${repo}`,
          headers: {
            "token": this.userToken,
          },
        }, callback);
      },
    },

    mounted() {
      this.userToken = __userToken;
      this.getContactsList('findAllBaby', res => {
        if (res.ok && res.data.code === "1") {
          this.contactsList = res.data.result;
        } else {
          modal.toast({
            message: res.data.mes,
            duration: 1,
          });
        }
      });
    },
  };
</script>