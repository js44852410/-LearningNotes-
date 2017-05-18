<template>
  <div class="evaluation_wrapper">
    <div class="evaluation_close_container">
      <closeBtn></closeBtn>
    </div>
    <div class="evaluation_mes_container">
      <text class="evaluation_h1_text">为保证测评结果准确性</text>
    </div>
    <div class="evaluation_mes_container">
      <text class="evaluation_h2_text">请提前设置宝宝生日哦</text>
    </div>
    <div class="evaluation_logo_container">
      <image class="evaluation_logo" src="/src/img/birthTitle.png"></image>
    </div>
    <div id="calendar_container"></div>
  </div>
</template>
<style>
  .evaluation_wrapper {
    background-color: #a0d5ee;
  }

  .evaluation_close_container {
    height: 160px;
    background-color: #a0d5ee;
  }

  .evaluation_mes_container {
    height: 94px;
    align-items: center;
    background-color: #a0d5ee;
  }

  .evaluation_h1_text {
    font-size: 44px;
    height: 44px;
    line-height: 44px;
    color: #FFF;
  }

  .evaluation_h2_text {
    font-size: 32px;
    height: 32px;
    line-height: 32px;
    color: #FFF;
  }

  .evaluation_logo_container {
    align-items: center;
    background-color: #a0d5ee;
  }

  .evaluation_logo {
    width: 314px;
    height: 314px;
  }

  * {
    font-size: 30px;
  }

  .gearDate {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 10px;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 99;
    overflow: hidden;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .date_ctrl {
    vertical-align: middle;
    background-color: #d5d8df;
    color: #000;
    margin: 0;
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9901;
    overflow: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  .slideInUp {
    -webkit-animation: slideInUp .3s;
    animation: slideInUp .3s;
  }

  @-webkit-keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  @keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  .date_roll {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: transparent;
    -webkit-mask: -webkit-gradient(linear, 0% 50%, 0% 100%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0))
  }

  .date_roll > div {
    font-size: 2.3em;
    height: 5em;
    float: left;
    background-color: transparent;
    position: relative;
    overflow: hidden;
    -webkit-box-flex: 4;
    -webkit-flex: 4;
    -ms-flex: 4;
    flex: 4
  }

  .date_roll > div .gear {
    width: 100%;
    float: left;
    position: absolute;
    z-index: 9902;
    margin-top: -4em
  }

  .date_roll_mask {
    -webkit-mask: -webkit-gradient(linear, 0% 40%, 0% 0%, from(#debb47), to(rgba(36, 142, 36, 0)));
    -webkit-mask: -webkit-linear-gradient(bottom, #debb47 50%, rgba(36, 142, 36, 0));
    padding: 0
  }

  .date_roll > div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1
  }

  .date_grid {
    position: relative;
    top: 4em;
    width: 100%;
    height: 2em;
    margin: 0;
    box-sizing: border-box;
    z-index: 0;
    border-top: 1px solid #abaeb5;
    border-bottom: 1px solid #abaeb5
  }

  .date_grid > div {
    color: #000;
    position: absolute;
    right: 40px;
    top: 0;
    font-size: .8em;
    line-height: 2.5em
  }

  .date_btn {
    color: #0575f2;
    font-size: 1.2em;
    line-height: 1em;
    text-align: center;
    padding: 0.5em;
  }

  .date_btn_box:before,
  .date_btn_box:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    display: block;
    background-color: #96979b;
    z-index: 15;
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33)
  }

  .date_btn_box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: justify;
    justify-content: flex-end;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    background-color: #f1f2f4;
    position: relative
  }

  .date_btn_box:before {
    left: 0;
    top: 0;
    -webkit-transform-origin: 50% 20%;
    transform-origin: 50% 20%
  }

  .date_btn_box:after {
    left: 0;
    bottom: 0;
    -webkit-transform-origin: 50% 70%;
    transform-origin: 50% 70%
  }

  .tooth {
    height: 2em;
    line-height: 2em;
    text-align: center
  }
</style>
<script>
  import initCalendar from '../../js/calendar';
  import closeBtn from './close.vue';
  export default {
    data() {
      return {};
    },

    components: {
      closeBtn,
    },

    methods: {
      setBirth(date) {
        this.$router.replace({
          name: "makePromise",
        });
      },
    },

    mounted() {
      let date = new Date();
      initCalendar({
        "container": "calendar_container",
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        'minDate': (date.getFullYear() - 16) + '-' + 1 + '-' + 1, //最小日期
        'maxDate': (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate(), //最大日期
        'callback': this.setBirth,
      });
    },
  };
</script>