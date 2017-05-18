<template>
  <div class="wrapper">
    <div class="info-wrapper">
      <div class="activity-wrapper">
        <image class="activity-image" :src="orderInfo.activityImageUrl|dirImage"></image>
        <div class="activity-info">
          <text class="activity-title">{{orderInfo.activityName}}</text>
          <div class="time-box">
            <text class="time-word">活动时间:</text>
            <text class="time-info">{{orderInfo.activityTime}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="about-wrapper">
      <div class="item-wrapper">
        <div class="order-item">
          <text class="order-item-name">单价</text>
          <text class="order-item-num">￥{{orderInfo.orderAmount/orderInfo.accompanyingNumber}}</text>
        </div>
        <div class="order-item">
          <text class="order-item-name">人数</text>
          <text class="order-item-num">{{orderInfo.accompanyingNumber}}</text>
        </div>
        <div class="order-item">
          <text class="order-item-name">金额</text>
          <text class="order-item-num">￥{{orderInfo.orderAmount}}</text>
        </div>
      </div>
    </div>
    <div>
      <div class="payment-wrapper">
        <div class="payment-title">
          <text class="title-word">选择支付方式</text>
        </div>
        <div class="item-group">
          <div class="item">
            <image class="item-image"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAMAAAArU9sbAAAA6lBMVEUAAAB2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzF2vzH////9/vz0+u3o9Nzc78rB4qCs2IGk1XaKyU/2+/Ht9+TD46WWz2GNylP6/fi23ZGo13ye0m2CxUR6wTf3+/Tr9uDZ7saz3I3X7MLP6bbM57K84JqTzV1+wz13wDLm89rh8dLU67/F5KiZz2WRzFmFx0eZ0GYXCdi7AAAAJnRSTlMA9u1I+nIK8trSzoYQJBfk25mD/b9LRAwUxJiRf3U8NzMtmqN4CFXiwrcAAAKvSURBVFjDrZjZeqowFEaDAo6t1Vpr7WjP6Y8DilMdakeHjue8/+tUoFUhGwTjuiCfF1mGJHvvBObNcUEp5eMRGXIkni8phWMWmnLuRIYT+SRXDqNIK0nQJJV0QMd+KgZvYqn9AI6bMwn+SGc3myTRA2zmIOrrULMIxrXqLdlLICiJPS/JRQTBiVzQkiMJYZCOKElBRjjkAi+5lBAW6ZKb2AjCE3FNsZrANiScC57FdmQdOxbbsrZQxxlsS2aVdXLYntwyFUgCFuk3UZxChFNbUoxBhFjRspyD4m6o12vtWl0f3sGfc8sSpxyTlvZLVZ/Bj7gpuQLPV01bp9qEH1f0Mn/eai4e4UNqYeGLhjE2O7YqPwOxWr/RJBe15xBuHux/H7XNtgHDHNn4Hzw5TBMh9KWZLHo9m+0IsGwdeBNlCtzolqXe7FfstmO/2Bye/GUl6oWc1Prdz8Hj/xG8+MPycPPqdFQHvZfqj20GkhNiz705JPdGp7L80RrQtZLxqeVlXdLq1R1Sncy/jA/F5nqvxnOA/SczIoaqqz7tofl87+nmtEwbi+etAR4mg2OwsnQe7J3XXTyfMTNn6IMaC1WHOqsXsiLq9ska3sO9NTxqXg7AM+8sLRpHhVqjPCh0zaZZ4Sxjar+UQLFY3lczT/XvOUud2rsKCEaVehdzozs0JpxlQMQRXRan3aWv5Q6qOyqmV/mFZuicmWqPzC8sCX+a4/Wo6tG5jqWwAeNpZel65d0rbKTXf6q1314a79qErAFcPfJn+kHWI7s2inFu12kJIkjFnZ0ZxM8vuzxLiZ/rxM+YOz7vip+9xe8B4neS3d+PxO9q4vdG8TssjXqNYFyru73b06gBvjOou/jmIfz9JaEUWQjKqeShu3glU2UWmnRUyebjmRhimXg+q0TTzJNvgfEv7hsDjn8AAAAASUVORK5CYII="></image>
            <text class="item-name">微信</text>
            <div class="choosed" @click=""></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <div class="submit-wrapper">
        <div class="box">
          <div class="price-box">
            <text class="name">实付金额</text>
            <text class="price">￥{{orderInfo.payPrice|formatPrice}}</text>
          </div>
          <payBtn class="submit-btn" pay-message="确认支付" :order-number="orderInfo.orderNumber"></payBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }

  .activity-wrapper {
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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    background: #fff;
    margin-bottom: 20px;
  }

  .activity-image {
    height: 150px;
    width: 150px;
    border-radius: 10px;
    margin: 30px 50px 30px 30px;
  }

  .activity-title {
    margin-top: 30px;
    font-size: 36px;
    color: #1b1c1d;
  }

  .time-box, .address-box {
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

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    margin-top: 20px;
  }

  .time-word, .address-word {
    color: #999;
    font-size: 24px;
    margin-right: 20px;
  }

  .time-info, .address-info {
    color: #666;
    font-size: 24px;
  }

  .item-wrapper {
    margin-bottom: 20px;
    background: #fff;
  }

  .order-item {
    height: 88px;
    margin: 0 30px;

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
    border-bottom: 1px solid #f5f5f7;
  }

  .order-item-name {
    white-space: nowrap;
    font-size: 30px;
    color: #666;
  }

  .order-item-num {
    font-size: 30px;
    color: #f00;
  }

  .payment-wrapper {
    background: #fff;
  }

  .payment-title {
    padding-left: 30px;
    box-shadow: 0px -2px 2px #f3f3f3 inset;
    border-bottom: 1px solid #f6f6f6;
  }

  .title-word {
    font-size: 30px;
    line-height: 90px;
    color: #333;
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
    height: 120px;
    padding-left: 30px;
    border-bottom: 1px solid #f6f6f6;
  }

  .item-image {
    height: 80px;
    width: 80px;
    margin-right: 30px;
  }

  .item-name {
    margin-right: 470px;
    font-size: 30px;
    color: #666;
  }

  .choosed {
    height: 44px;
    width: 44px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDFEMTREQUMyOTYyMTFFN0JFMkFCNURBOEJEQTgzRDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDFEMTREQUQyOTYyMTFFN0JFMkFCNURBOEJEQTgzRDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQTg5RjA4OTI5NjExMUU3QkUyQUI1REE4QkRBODNEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQTg5RjA4QTI5NjExMUU3QkUyQUI1REE4QkRBODNEOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pkim4KsAAAN+SURBVHjazJnLTxNRFMbPHSiCFJQImrg1kCj1wWOjIRJtUGPiBhcqK3Ghwcc/oNH4grA3huBGF74SWagsiMq4qIlLFIOiVrcmgjERqKIC43d6b3H67rQznfmS7yZD5/Hj5sy5554RhmFQ3tJFJcY2uB3eBDfA62C/OmMO/gp/hN/BIfgFBY2I6R6WHiksA+uCn7AX7oYPwBUW/81f8DB8E34CG84B66IT4wV4K9mjcfgi/NBeYF1swDgAd5Azegb3wJ8LB9bFIYw34GpyVjPwCfh+fsAyVq/A56i46oXPp4vt1MAS9hp8itzRoAqRJDgtzQV9LsKSCo2+3GZYF4cx3iNvqCuRJR5YZoOxIrxguWoWbjJnj8SQGPAQLKtKMaWIYbkodHiHFe+98JFi6owPCZkVXtm4gtkjXy3RwnfkiqU3ONrGWSM2w3tcha1qJgrg3VrZEP93hpVBsEXVL8sh0e0abHUrUbOOGg/JqWZX/G/GEoal2NFRGRKjxCXiN7jcFdgmlBGlq4mmhogmjgByITmW5foxD9dqqp71KCyZFztmbNNU8e1R2CS1M3Dg/9R7GpYVYOB6yZsBmN/eEr/bsKx6Bq6ToWKkh93+nqj1JVFZnZuwrDpNLX/pt1a/vxBFsH/0b8YDn+cHbQ9sNGNrWU9ZxMZ3bDeg3wI6YB06DvZBIbDLtcRs1pfuz1R+0FHYURNsV0GwzMrA0zmdahV6GXaVXbCsaQYOZ4zhfKCdgWWFGXjC0iXZoJ2DZU1oqn1EtkA7C8sKFVb8lK1FpQXYykbATxKtWO8krCp+ZGPuUV63iM30HKKqcqOTsKzHcCS249iHg5H8k2MFUeNtor9IOB9OOwHL2s+M5i3Sa1XZe1EJW6RgtJC4FF80e0qXY3k3sS/xNLpLFSX4edErsKPm3XxiLdETXaoZtrTGK42UnvS9taDBHZbjsuj5AWjXeyrcY/uUuRkYNLg/2x/dsS7MuhnP/al6fOnKy7PwdRnnhhuwg4qBcgOWWeMMyeZysdVLaXrDyVkilXTRVaQmIX8yOAnfyVbAZ1bQuIuxRaUXJ1NXSzbY3GY4frYPkvzsZdeKOI6cfxVpdCjXCwr5sHiM5IdFq1XePAltmLTyW7T4c4Qc/bCYDO9Xra6dqiHDPQ7Tp1sxhxmcAmCYhG+SRFmIfGtCtCM8Y7qHpUf+E2AArOtqotIHFOwAAAAASUVORK5CYII=) center no-repeat;
}

  .unchoosed {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAaVBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlWst2SAAAAInRSTlMA90dshxLsqfFTggbXyFlONS0L0bIjeR0FuuThu5hmHpR6fhTAaQAAAXZJREFUOMudlduWgyAMRQEBxUvrvWrb6fT8/0fOqrTGipfFnCfI2g9JOCRsoVLIOtWc67SWomR7EiHHTDwUm6ipAGTSFCpJVGFkBqA6r6JNDwzPxzz0eA5A37jsKYIOkmU0CTSi0zIaA6FiK1IhEH+HfoGAbSjguM/vEvzMNnXmkLN8AWLXaGDKu4koh41MEH160iNkBwrR24OBVkew0jDjobJJ7OsH1egHXLsd6pTdX37qrhBjOu1uabB9a1+FlRyXfdaWfwEvmUB2wPJ8PGcQTEIesNbTI1jDvA2Wqz2WGdQsRWE7mULnOywrkDIN9W4kEOXbLFPQjMM6XoDoNZYl4BPMYku7LMGfNIh2WEpjKpDoJUsFUuuIXrDUOnoUouUa+wLpuYl22Om5yUhEu6w1kmPReJ21FiXzEx25rDW/+60Kc1n9Vl4f1mMU3LyGjM/48hmMPiPXb5j7rwlScwOG9vHlh3YAbs3Bauu6abWZ/y5Nr3X8BwkdLJGfwvpyAAAAAElFTkSuQmCC) center no-repeat;
  }

  .submit-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
  }

  .box {
    width: 750px;

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

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    height: 100px;
    background: #fff;
  }

  .price-box {
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

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .name {
    padding-right: 50px;
    font-size: 32px;
    color: #333;
  }

  .price {
    padding-right: 30px;
    font-size: 30px;
    color: #fb6101;
  }

  .submit-btn {
    height: 100px;
    width: 200px;
    background: #ffbc01;
    color: #fff;
    text-align: center;
    line-height: 100px;
    font-size: 32px;
  }

</style>

<script>
  import {mapGetters} from 'vuex';
  import payBtn from "./pay-btn.vue";

  module.exports = {
    components: {
      payBtn,
    },

    computed: {
      ...mapGetters([
        'orderInfo',
      ]),
    },

    mounted() {
      this.$store.dispatch('getOrderInfo', {
        orderNumber: this.$route.query.orderNumber,
      });
    },
  };
</script>