<template>
  <div class="wrapper">
    <div class="close_container">
      <closeBtn></closeBtn>
    </div>
    <div class="container">
      <div class="join_num_container">
        <div class="mes_container">
          <div class="mes_head">
            <text class="mes_text">当前已有</text>
          </div>
          <div class="mes_num_container">
            <div class="num_img_container" v-for="(item, $index) in numList" :style="{ height: 44*item + 'px' }"
                 ref="numCon">
              <image v-for="n in item" :src="getNumImg(n)" class="num_img" resize="contain"></image>
            </div>
          </div>
          <div class="mes_bottom">
            <text class="mes_text">个家庭参加了测评</text>
          </div>
        </div>
      </div>
      <div class="bottom_container">
        <text class="start_btn" @click="beginEvaluation">开始测评</text>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #a0d5ee;
  }

  .close_container {
    height: 240px;
  }

  .container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    flex: 1;
  }

  .join_num_container {
    margin-left: 30px;
    margin-right: 30px;
    height: 300px;
    background-image: url("/src/img/join_num_bg.png");
    background-position: center;
    background-repeat: no-repeat;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .mes_container {
    width: 530px;
    height: 200px;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }

  .mes_num_container {
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

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;

    height: 44px;
    overflow: hidden;
  }

  .num_img_container {
    width: 45px;
    height: 440px;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .num_img {
    width: 30px;
    height: 44px;
    flex: 1;
  }

  .mes_bottom {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .mes_text {
    color: #333;
    font-size: 28px;
  }

  .bottom_container {
    margin-bottom: 170px;
    width: 750px;
    background-image: url("/src/img/start_bottom.png");
    background-position: center;
    background-repeat: no-repeat;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .start_btn {
    width: 208px;
    height: 208px;
    line-height: 208px;
    text-align: center;
    font-size: 34px;
    color: #ffbc01;
  }
</style>
<script>
  import closeBtn from './close.vue';
  const animation = weex.requireModule('animation');

  export default {
    data() {
      return {
        total: 1234567,
        numList: [0, 0, 0, 0, 0, 0, 0],
        imgList: ['/src/img/num_0.png',
          '/src/img/num_1.png',
          '/src/img/num_2.png',
          '/src/img/num_3.png',
          '/src/img/num_4.png',
          '/src/img/num_5.png',
          '/src/img/num_6.png',
          '/src/img/num_7.png',
          '/src/img/num_8.png',
          '/src/img/num_9.png',
        ],
      };
    },

    components: {
      closeBtn,
    },

    methods: {
      splitTotalNum() {
        let arr = String(this.total).split("");

        for (let i = 0, l = arr.length; i < l; i++) {
          let rn = Math.floor(Math.random() * 3 + 2) * 10;

          this.$set(this.numList, i, arr[i] * 1 + rn);
        }
      },

      getNumImg(num) {
        return this.imgList[num % 10];
      },

      beginEvaluation() {
        this.$router.replace({
          name: "answer",
        });
      },
    },

    mounted() {
      this.splitTotalNum();

      for (let i = 0, l = this.numList.length; i < l; i++) {
        let ele = this.$refs.numCon[i];
        animation.transition(ele, {
          styles: {
            transform: `translateY(${-44 * (this.numList[i] - 1)}px)`,
          },
          duration: 2000, //ms
          timingFunction: 'ease-in-out',
          delay: 200 * i,
        }, res => {
          console.log(this.numList[i]);
        });
      }
    },
  };
</script>