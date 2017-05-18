<template>
  <text @click="gopay">{{payMessage}}</text>
</template>
<style scoped>

</style>
<script>
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        payChannel: '03',
        useRedPackageId: '',
        orderPayIP: '192.168.1.12',
      };
    },

    props: ["payMessage", "orderNumber"],

    methods: {
      gopay() {
        let _me = this;
        // this.activityID = this.activityList[index].activityID
        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/wxPay/payOrder`,
          headers: {
            "token": __userToken,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: `{"orderPayID":"${this.orderNumber}", "payChannel":"${this.payChannel}","useRedPackageId":"${this.useRedPackageId}","orderPayIP":"${this.orderPayIP}"}`,
        }, res => {
          if (res.ok && res.data.code === "1") {
            let wxPayJson = res.data.result;

            var onBridgeReady = function() {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": wxPayJson.appid,     //公众号名称，由商户传入
                  "timeStamp": wxPayJson.timestamp,         //时间戳，自1970年以来的秒数
                  "nonceStr": wxPayJson.noncestr, //随机串
                  "package": wxPayJson.wxpackage,
                  "signType": "MD5",         //微信签名方式：
                  "paySign": wxPayJson.sign, //微信签名
                }, function(res) {
                  if (res.err_msg === "get_brand_wcpay_request:ok") {
                    _me.$router.replace({
                      name: 'paySuccess',
                      params: {
                        orderNumber: _me.orderNumber,
                      },
                    });
                  } else {
                    modal.toast({
                      message: res.err_msg,
                      duration: 1,
                    });
                  }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                });
            };

            if (typeof WeixinJSBridge === "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
          } else if (res.ok && res.data.code === "2") {
            this.$router.replace({
              name: 'paySuccess',
              params: {
                orderNumber: _me.orderNumber,
              },
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
  };
</script>