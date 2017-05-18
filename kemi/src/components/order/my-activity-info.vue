<template>
  <div class="wrapper">
    <div class="item">
      <div class="item-top">
        <image :src="orderInfo.activityImageUrl|dirImage" class="item-image"></image>
        <div class="item-infos">
          <text class="item-title">{{orderInfo.activityName}}</text>
          <text class="item-time">活动时间：{{orderInfo.activityTime}}</text>
          <!--<text v-show="orderInfo.orderStatus=='not_sign'" class="item-btn" @click="wxScanQRCode">立即签到</text>-->
          <text v-show="orderInfo.orderStatus=='assess_to'" class="item-btn" @click="checkComment(orderInfo)">评价</text>
          <payBtn v-show="orderInfo.orderStatus=='to_pay'" class="item-btn" pay-message="去支付"
                  :order-number="orderInfo.orderNumber"></payBtn>
        </div>
      </div>
    </div>
    <div class="item-content item-title-container">
      <text class="item-name item-order-title">订单信息</text>
    </div>
    <div class="item-content">
      <text class="item-name">活动时间：</text>
      <text class="item-info">{{orderInfo.activityTime}}</text>
    </div>
    <div class="item-content">
      <text class="item-name">活动人数：</text>
      <text class="item-info">{{orderInfo.accompanyingNumber}}</text>
    </div>
    <div class="item-content">
      <text class="item-name">下单时间：</text>
      <text class="item-info">{{orderInfo.orderTime}}</text>
    </div>
    <div class="item-content">
      <text class="item-name">订单编号：</text>
      <text class="item-info">{{orderInfo.orderNumber}}</text>
    </div>
    <div class="item-content">
      <text class="item-name">订单金额：</text>
      <text class="item-info">{{orderInfo.orderAmount}}</text>
    </div>
    <div class="item-content item-border-no">
      <text class="item-name">实付金额：</text>
      <text class="item-info">{{orderInfo.payPrice}}</text>
    </div>
    <div class="item-division"></div>
    <div class="item-content-two">
      <text class="item-name-two item-order-title">联系人：</text>
      <text class="item-name-two">{{orderInfo.contactsName+" "+orderInfo.contactsMobile}}</text>
    </div>
    <div class="item-division"></div>
    <div class="item-content-two">
      <text class="item-name-two item-order-title">退款条款：</text>
      <text class="item-name-two">1、活动前三天以上申请退款，全额退款。</text>
      <text class="item-name-two">2、活动前两天内申请退款，不予退款。</text>
    </div>
    <div v-if="orderInfo.orderStatus=='not_sign'" class="item-content-tree" @click="changeRefund">
      <text class="reback-btn">申请退款</text>
    </div>
    <div v-if="orderInfo.orderStatus=='to_pay'" class="item-content-tree" @click="cancelOrder">
      <text class="reback-btn">取消订单</text>
    </div>
    <div v-if="orderInfo.orderStatus=='assess_to' || orderInfo.orderStatus=='assess_off' || orderInfo.orderStatus=='canceled'" class="item-content-tree" @click="deleteOrder(orderInfo)">
      <text class="reback-btn">删除订单</text>
    </div>
    <refundDialog v-if="refundApply" :change-refund="changeRefund"></refundDialog>
  </div>
</template>

<style scoped>
  .item {
    background: #fff;
  }

  .item-top {
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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #f5f4f9;
  }

  .item-image {
    height: 145px;
    width: 145px;
    border-radius: 10px;
    margin: 30px 30px 30px 40px;
  }

  .item-infos {
    width: 500px;
    padding-left: 30px;
  }

  .item-title {
    margin: 25px 0px 25px;
    font-size: 30px;
  }

  .item-time {
    font-size: 20px;
    color: #999;
  }

  .item-btn {
    width: 138px;
    height: 49px;
    font-size: 24px;
    color: #fff;
    background-color: #ffbc01;
    line-height: 49px;
    text-align: center;
    margin-right: 30px;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 320px;
    margin-bottom: 30px;
  }
  
  .commented{
    background-color: #999;
  }

  .item-content {
    margin-left: 30px;
    height: 83px;
    border-top: 1px solid #dddddd;
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

  .item-title-container {
    margin-left: 0;
    padding-left: 30px;
  }

  .item-border-no {
    border-bottom: none;
  }

  .item-content-two {
    padding-top: 30px;
    padding-bottom: 30px;
    margin-left: 30px;
  }

  .item-content-tree {
    height: 100px;
    border-top: 2px solid #f5f5f5;
    justify-content: center;
    align-items: flex-end;
    padding-right: 30px;
  }

  .item-name {
    font-size: 24px;
    line-height: 88px;
    color: #666666;
    margin-right: 30px;
  }

  .item-name-two {
    font-size: 24px;
    color: #666666;
    margin-right: 30px;
    line-height: 45px;
  }

  .item-order-title {
    font-size: 28px;
    color: #333333;
  }

  .item-info {
    font-size: 28px;
    color: #666666;
  }

  .item-division {
    height: 20px;
    background-color: #f5f5f5;
  }

  .reback-btn {
    width: 138px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #666666;
    font-size: 24px;
    color: #666666;
    border-radius: 10px;
    text-align: center;
  }

  .warning-bgcover {
    width: 750px;
    height: 1344px;
    background-color: #000;
    width: 750px;
    height: 1344px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  .warning-del {
    width: 520px;
    height: 320px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 18px;
    margin: 200px auto;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -260px;
  }

  .warning-title-txt {
    font-size: 30px;
    color: #666666;
  }

  .warning-ok-btn {
    width: 200px;
    height: 80px;
    background-color: #ffbc01;
    border: 1px solid #ffbc01;
    border-radius: 15px;
    position: relative;
    top: 70px;
  }

  .ok-word {
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
</style>
<script>
  import {mapGetters} from 'vuex';
  import refundDialog from "./refundApply.vue";
  import payBtn from "./pay-btn.vue";

  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        refundApply: false,
      };
    },

    components: {
      refundDialog,
      payBtn,
    },

    computed: {
      ...mapGetters([
        'orderInfo',
      ]),
    },

    methods: {
      checkComment(item) {
        if (item.orderStatus === 'assess_to') {
          this.$router.push({
            name: "publishComment",
            query: {
              orderId: item.orderId,
            },
          });
        } else {
          this.$router.push({
            name: "activityInfo",
            params: {
              activityID: item.activityId,
            },
          });
        }
      },
      //微信二维码签到功能
      wxScanQRCode() {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: res => {
            const result = res.resultStr.split("=")[1];
            stream.fetch({
              method: 'POST',
              type: 'json',
              url: `${__APIDIR}appapi/userActivity/sign`,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "token": __userToken,
              },
              body: `{"activityId": ${result}}`, // 当needResult 为 1 时，扫码返回的结果
            }, res => {
              if (res.data.code === "1") {
                modal.toast({
                  message: "签到成功",
                  duration: 1,
                });
              } else {
                modal.toast({
                  message: res.data.mes,
                  duration: 1,
                });
              }
            });
          },
        });
      },

      cancelOrder() {
        modal.confirm({
          message: "是否要取消订单？",
          okTitle: "取消",
          cancelTitle: "确定",
        }, result => {
          if (result === "确定") {
            stream.fetch({
              method: 'POST',
              type: 'json',
              url: `${__APIDIR}appapi/userActivity/cancelMyActivity`,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "token": __userToken,
              },
              body: `{"orderId": "${this.orderInfo.orderId}"}`,
            }, res => {
              if (res.ok && res.data.code === "1") {
                this.activityList.splice(index, 1);

                if (this.activityList.length < this.size) {
                  this.getMyActivityList();
                }
              }

              modal.toast({
                message: res.data.mes,
                duration: 1,
              });
            });
          }
        });
      },

      deleteOrder(orderInfo) {
        modal.confirm({
          message: "是否要删除订单？",
          okTitle: "取消",
          cancelTitle: "确定",
        }, result => {
          if (result === "确定") {
            stream.fetch({
              method: 'POST',
              type: 'json',
              url: `${__APIDIR}appapi/userActivity/deleteMyActivity`,
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                "token": __userToken,
              },
              body: `{"orderId": "${orderInfo.orderId}"}`,
            }, res => {
              if (res.ok && res.data.code === "1") {
                this.$router.replace({
                  name: "myActivityList",
                  params: {
                    status: orderInfo.orderStatus,
                  },
                });
              }

              modal.toast({
                message: res.data.mes,
                duration: 1,
              });
            });
          }
        });
      },

      changeRefund() {
        this.refundApply = !this.refundApply;
      },
    },
    mounted() {
      this.$store.dispatch('getOrderInfo', {
        orderNumber: this.$route.params.orderNumber,
      });
    },
  };
</script>