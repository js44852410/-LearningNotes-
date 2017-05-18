<template>
  <div class="wrapper">
    <div class="activity-wrapper">
      <div class="activity-box">
        <image class="activity-image" :src="activityInfo.activitySmallImageUrl1|dirImage"></image>
        <div class="activity-info">
          <text class="activity-name">{{activityInfo.activityName}}</text>
          <text class="activity-time">活动时间: {{activityInfo.activityBeginTime}}</text>
        </div>
      </div>
    </div>
    <div class="join-wrapper">
      <div class="join-title" @click="goContactsList('contactsList', true)">
        <image class="join-image"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAMAAAAynjhNAAAAbFBMVEUAAAD5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugf5ugcX2gZ1AAAAI3RSTlMAiAb54nhwrXct1WtUStnSkygZ8/JbQw8KyWdQNMC3pklgJ39XNosAAAD4SURBVCjPhZHZboMwEEWHsWPXZt8CBLK09///sYlUythK4LyYqyPdwWP6h7O7Vq2/Z0xvmAv8UcwUwwngTc1cGw8kcUECla7flxZJaDOo85bOCllQrZHKnELL+h5eRmKPXkQLQwEGViSNOtQ1tEgKHGqGEqmL9RjoIi53ovzw13qU4cVK9Adr2V/q4ZNIuAK8+eHRmRKomGIyjRVDb5g3b13e5XJL1bQQ526gwV1uSp1OcnxTQol5zUJSNxqFI4nUY4lpoI+6gpf28fXkhuvreBAtUEFzi42OyEY7ypMnV0yvI6cGqhEynp3C0o62+N7TBdwHvcO6818lDBXCiDse1AAAAABJRU5ErkJggg=="></image>
        <text class="join-people-text">添加参与人</text>
      </div>
      <div class="join-info" v-for="(joinItem, index) in contactsList" v-if="joinItem.isSelected">
        <div class="item">
          <div class="delete-btn" @click="deletePeople(index)">
            <image class="delete-icon"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAMAAACfvvDEAAAASFBMVEUAAAD9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv9PSv////HqVCLAAAAFnRSTlMAKY/v5dNoLgrDsa+M9c21ljvBQD8JRj6+HAAAAM5JREFUOMuV1VcWgyAQBVAcFRsBLHnZ/07TJDEo+HK/OQxliooU2rvJTs7rQmUUpsJXZVKLmwGxoVF7V8ERaXeBaxyroyOMJVLKUW0sF6Rdlk3oEjnl5wBtjbw6XEtwRtZ3xLn3uw44N7yuA8bzUgYM81hZgVGF4Ex4DY5WAo6oHpxedQhuh7DqlCVXWn7PP87pwfH8e/J/RP87n0t8ftI5z9cRX5t8vfM9JJizfWmmex3fPyMt0ZODpkesb1KzQ35mh+QHjRbX2c7Jbh7dARP1bWxI3KhvAAAAAElFTkSuQmCC"></image>
          </div>
          <div class="item-info">
            <div class="item-main-info">
              <text class="item-name">{{joinItem.fullName}}</text>
              <text class="item-relationship">{{joinItem.relation}}</text>
            </div>
            <div>
              <text class="id-text">身份证{{joinItem.certificateNumber}}</text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prompt">
      <text class="prompt-word">身份信息仅用于购买保险及酒店预订,信息保密</text>
    </div>

    <div class="user-info-wrapper">
      <div class="user-info-list">
        <div class="contacts-item">
          <text class="contacts-item-name">联系人</text>
          <input v-model="userInfo.fullName" class="item-input" placeholder="请填写联系人姓名"></input>
        </div>
        <div class="contacts-item">
          <text class="contacts-item-name">手机号</text>
          <input v-model="userInfo.mobile" class="item-input" placeholder="请输入联系人手机号" type="tel"></input>
        </div>
      </div>
    </div>

    <div class="leave-message-wrapper">
      <textarea class="message-content" v-model="remarks" placeholder="留言: 请告诉我们您的特殊需求"></textarea>
    </div>

    <div class="service-agreement-wrapper">
      <text class="service-agreesment-word">我已阅读并同意</text>
      <a class="service-agreesment-jump" @click="jumpService('serviceAgreement')">服务协议</a>
    </div>

    <div class="submit-wrapper">
      <div class="box">
        <div class="price-box">
          <text class="total">共计:</text>
          <text class="price">￥{{computePrice|formatPrice}}</text>
        </div>
        <a class="submit-btn" @click="goOrderInfo('orderPay')">提交报名</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
    padding-bottom: 100px;
  }

  .activity-wrapper {
    margin-bottom: 24px;
    background: #fff;
  }

  .activity-box {
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

    border-bottom: 1px solid #f5f4f9;
    margin-left: 30px;
  }

  .activity-image {
    margin: 30px 30px 30px 0;
    height: 143px;
    width: 143px;
    border-radius: 10px;
  }

  .activity-name {
    margin: 40px 0 24px;
    font-size: 24px;
  }

  .activity-time {
    color: #979797;
    font-size: 20px;
  }

  .info-text {
    margin-right: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=) right center no-repeat;
    line-height: 86px;
    font-size: 24px;
    text-indent: 35px;
  }

  .join-wrapper {
    padding-left: 30px;
    background: #fff;
  }

  .join-title {
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

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid #f5f4f9;
    padding-right:30px;
  }

  .join-people-text {
    line-height: 88px;
    height: 88px;
    font-size: 28px;
    color: #FFBC01;
    margin-left: 20px;
  }

  .join-image {
    height: 40px;
    width: 40px;
  }

  .item {
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

    height: 110px;
    border-bottom: 1px solid #f5f4f9;
  }

  .delete-icon {
    height: 40px;
    width: 40px;
    margin-right: 30px;
  }

  .item-name {
    margin-right: 30px;
    font-size: 28px;
  }

  .item-relationship {
    font-size: 24px;
    color: #666
  }

  .item-main-info {
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

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    margin-bottom: 18px;
  }

  .id-text {
    white-space: nowrap;
    font-size: 20px;
  }

  .prompt-word {
    font-size: 24px;
    color: #333;
    line-height: 70px;
    text-align: center;
  }

  .submit-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .box {
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
    width: 750px;
    height: 100px;
    background: #fff;
  }

  .price-box {
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

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    margin-right: 340px;
  }

  .total {
    text-indent: 50px;
    font-size: 20px;
    color: #999;
  }

  .price {
    font-size: 30px;
    color: #fb6101;
    margin-left: 20px;
  }

  .submit-btn {
    height: 98px;
    width: 262px;
    background: #ffbc01;
    color: #fff;
    text-align: center;
    line-height: 98px;
    font-size: 28px;
  }

  .user-info-wrapper {
    background: #fff;
  }

  .contacts-item {
    height: 84px;
    border-bottom: 1px solid #f5f4f9;
    margin-left: 35px;

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

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .contacts-item-name {
    font-size: 24px;
  }

  .item-input {
    border: 0;
    margin-left: 60px;
    font-size: 24px;
    color: #666;
  }

  .leave-message-wrapper {
    margin-bottom: 20px;
  }

  .service-agreement-wrapper {
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
    height: 84px;
    background: #fff;
  }

  .service-agreesment-word {
    margin-right: 20px;
    line-height: 84px;
    text-indent: 24px;
    color: #666;
    font-size: 24px;
  }

  .service-agreesment-jump {
    color: #ffbc01;
    font-size: 20px;
    text-decoration: underline;
    line-height: 84px;
  }

  .message-content {
    height: 200px;
    padding: 30px;
    border: 0;
    margin-top: 20px;
    font-size: 24px;
    color: #999;
  }
</style>

<script>
  import {mapGetters} from 'vuex';
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        remarks: '',
      };
    },

    computed: {
      ...mapGetters([
        'activityInfo',
        'userInfo',
        'contactsList',
        'selectedList',
      ]),

      computePrice() {
        return this.activityInfo.nowPrice * this.selectedList.length;
      },
    },

    methods: {
      goInfoPage(name, activityID) {
        this.$router.replace({
          name,
          params: {
            activityID,
          },
        });
      },

      goContactsList(name, check) {
        this.$router.push({
          name,
          query: {
            check,
            remarks: this.remarks,
            activityID: this.$route.query.activityID,
          },
        });
      },

      goOrderInfo(name) {
        if (!this.selectedList.length) {
          this.alertToast('请选择参加人');
        } else if (!this.userInfo.fullName) {
          this.alertToast('请填写联系人姓名');
        } else if (!this.userInfo.mobile) {
          this.alertToast('请填写联系人手机号');
        } else if (!this.userInfo.mobile.match(/^1\d{10}$/)) {
          this.alertToast('请输入格式正确的11位手机号');
        } else {
          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/order/sign_up`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "token": __userToken,
            },
            body: `{"activityId": ${this.activityInfo.activityID}, "followCount": "${this.selectedList.length}","orderAmount":"${this.computePrice}", "topContactsIds":[${this.selectedList}], "contactsName":"${this.userInfo.fullName}", "contactsMobile":"${this.userInfo.mobile}", "remarks":"${this.remarks}"}`,
          }, res => {
            if (res.ok && res.data.code === "1") {
              this.result = res.data.result;

              this.$router.push({
                name,
                query: {
                  orderNumber: this.result,
                },
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

      deletePeople(index) {
        this.selectedList.splice(index, 1);
        this.$store.dispatch('changeSelectedList', this.selectedList);
      },

      jumpService(name) {
        this.$router.push({
          name,
        });
      },

      alertToast(word) {
        modal.toast({
          message: word,
          duration: 1,
        });
      },
    },

    mounted() {
      this.remarks = this.$route.query.remarks || "";

      this.$store.dispatch('getUserInfo');
      this.$store.dispatch('getActivityInfo', this.$route.query.activityID);

      this.$store.dispatch('getContactsList', this.selectedList);
    },
  };
</script>