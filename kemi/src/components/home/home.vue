<template>
  <div class="wrapper">
    <div class="fixed-head" :style="fixedBGC">
      <image @click="wxScanQRCode" class="scanQRCode"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEUAAAD///////////////////////////////////////////////+uPUo5AAAADHRSTlMA875uTRL5hBF2TE6qfbSpAAAAYUlEQVQoz2PABCyKZ86cATGAlNACIF1zBiFw5jgDA9cxU4Tq5hwHBqbDyPrnKDAwHkUWiBFg4DmAxAfyaCNABuA5gwIOYAqQDujjW4xAxowGlmMWKBGFGZUM3MiR7YDpFQA0Rk7/jk5ubwAAAABJRU5ErkJggg=="></image>
    </div>
    <Slider v-if="sliderList.length" :slider-list="sliderList"></Slider>
    <animationer></animationer>
    <recommend></recommend>
    <activityList :bg-change="barChangeColor"></activityList>
    <footer status="0"></footer>
  </div>
</template>
<style scoped>
  .wrapper {
    /*background: #f5f4f9;*/
    padding-bottom: 100px;
    background-color: #fff;
  }

  .fixed-head {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 750px;
    height: 100px;
  }

  .scanQRCode {
    width: 40px;
    height: 40px;
    margin-left: 30px;
    margin-top: 30px;
  }
</style>
<script>
  import Slider from './slider.vue';
  import animationer from './animationer.vue';
  import recommend from './recommend.vue';
  import activityList from './activity-list.vue';
  import footer from '../common/footer.vue';

  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  export default {
    components: {
      Slider,
      animationer,
      recommend,
      activityList,
      footer,
    },

    data() {
      return {
        fixedBGC: "background-color: rgba(255,188,0,0)",
        sliderList: [],
      };
    },

    methods: {
      wxScanQRCode() {
        if (!__userToken && !__weiSurfaceId) {
          return false;
        } else if (__userToken) {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: wxRes => {
              const result = wxRes.resultStr.replace("activityid=", "");
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
        } else {
          this.$router.push({
            name: "bindMobile",
            query: {
              redirect: {
                name: "home",
              },
            },
          });
        }
      },

      barChangeColor(scollY) {
        if (scrollY < 300) {
          this.fixedBGC = `background-color: rgba(255,188,0,${scollY / 300})`;
        } else {
          this.fixedBGC = `background-color: rgba(255,188,0,1)`;
        }
      },

      getSliderGroup() {
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/carousels`,
        }, res => {
          if (res.ok && res.data.code === "1") {
            this.sliderList = res.data.result;
          } else {
            modal.toast({
              message: res.msg,
              duration: 1,
            });
          }
        });
      },
    },

    created() {
      this.getSliderGroup();
    },
  };
  /*
  * 添加联系人模块与我的宝宝模块是否能合并，从参加活动选择参加人却是添加联系人，总感觉有些别扭，并且，添加的联系人都是孩子~；
  * 活动适用年龄，应该对参加人的年龄进行判断，毕竟适合12岁的肯定不能带2岁的孩子；
  *
  *
  *
  * */

</script>