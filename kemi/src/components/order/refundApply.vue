<template>
  <div class="warning-bgcover">
    <div class="warning-del">
      <div class="warning-title">
        <text class="warning-title-txt">申请退款请拨打客服电话<br>010-59481764</br></text>
      </div>
      <div class="btn-group">
        <a class="warning-btn warning-reback-yes" href="tel:010-59481764">
          <text class="warning-word">是</text>
        </a>
        <a class="warning-btn warning-reback-no" @click="changeRefund">
          <text class="no-word">否</text>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn-group {
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

    z-index: 100;
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -260px;
  }

  .warning-title {
    text-align: center;
    padding: 0px 20px;
  }

  .warning-title-txt {
    font-size: 30px;
    line-height: 50px;
    color: #666666;
    text-align: center;
  }

  .warning-btn {
    width: 180px;
    height: 80px;
    border: 1px solid #686868;
    border-radius: 15px;
  }

  .warning-reback-yes {
    background-color: #ffbc01;
    border-color: #ffbc01;
    margin-right: 25px;
    position: relative;
    top: 40px;
  }

  .warning-reback-no {
    margin-left: 25px;
    position: relative;
    top: 40px;
  }

  .warning-word {
    color: #fff;
  }

  .warning-word, .no-word {
    line-height: 80px;
    text-align: center;
  }

  .no-word {
    color: #666666;
  }
</style>
<script>
  module.exports = {
    props: ["changeRefund"],
  };
</script>