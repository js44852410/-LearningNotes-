<template>
  <div class="wrapper">
    <div class="close_container">
      <closeBtn></closeBtn>
    </div>
    <div class="question_container">
      <text class="question_mes">您的宝宝做算术题时，是否经常忘记计算过程中的进位或错位？</text>
    </div>
    <div class="bottom_container">
      <div class="answer_container">
        <a class="answer_btn" @click="answer(0)">
          <text class="anser_text">是</text>
        </a>
        <a class="answer_btn" @click="answer(1)">
          <text class="anser_text">否</text>
        </a>
        <a class="answer_btn" @click="answer(2)">
          <text class="anser_text">不知道</text>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #a0d5ee;
  }

  .close_container {
    height: 124px;
  }

  .question_container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    background-image: url("/src/img/question_bg.png");
    background-position: center;
    background-repeat: no-repeat;

    width: 750px;
    height: 378px;
  }

  .question_mes {
    width: 500px;
    font-size: 32px;
    color: #FFF;

    margin-top: 125px;
  }

  .bottom_container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    flex: 1;

    background-image: url("/src/img/answer_bg.png");
    background-position: center bottom;
    background-repeat: no-repeat;
  }

  .answer_container {
    margin-bottom: 220px;

    width: 750px;
    padding-left: 85px;
    padding-right: 85px;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    -webkit-box-pack: justify;
    -moz-justify-content: space-around;
    -webkit-justify-content: space-around;
    justify-content: space-around;

  }

  .answer_btn {
    width: 160px;
    height: 80px;
    border: 2px solid #5ba9ce;
    background-color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .anser_text {
    font-size: 32px;
    color: #333;
    text-align: center;
    height: 80px;
    line-height: 80px;
  }

  .answer_bg {
    width: 750px;
    height: 283px;
  }

</style>
<script>
  import closeBtn from './close.vue';
  export default {
    data() {
      return {};
    },

    components: {
      closeBtn,
    },

    methods: {
      answer(type) {
        alert(type);
      },
    },
  };
</script>