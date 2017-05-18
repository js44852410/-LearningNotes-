<template>
  <div class="slider-container" :style="{height: height+'px'}">
    <div class="slider" ref="slider">
      <div class="slider-item" v-for="(item, $index) in sliderList" :style="{transform: item.translate}" :key="$index">
        <a @click="goPage(item.contentUrl)">
          <image class="img" resize="cover" :src="item.imageUrl|dirImage" :style="{height: height+'px'}"></image>
        </a>
      </div>
    </div>
    <div class="indicator" v-if="initLength > 1">
      <text v-for="(item, $index) in initLength" class="indicator-icon"
          :class="{active: ((index % initLength) + initLength) % initLength === $index}" :key="$index"></text>
    </div>
  </div>
</template>

<style scoped>
  .slider-container {
    width: 750px;
    overflow: hidden;
    position: relative;
  }

  .slider {
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

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    position: relative;
  }

  .slider-item {
    width: 750px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .img {
    width: 750px;
    background-position: center;
  }

  .indicator {
    position: absolute;
    bottom: 24px;
    left: 0;
    width: 750px;
    z-index: 99;
    transform: translateZ(100px);

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
  }

  .indicator-icon {
    width: 16px;
    height: 16px;
    background-color: #AAA;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    margin-right: 10px;
  }

  .active {
    background-color: #FFF;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  module.exports = {
    props: {
      sliderList: {
        type: Array,
        default: [],
      },

      autoPlay: {
        type: Boolean,
        default: true,
      },

      height: {
        type: String,
        default: "340",
      },
    },
    data() {
      return {
        index: 0,
        sliderTimeout: null,
        animateFlag: false,
        initLeft: 0,
        changeX: 0,
        initX: 0,
        initY: 0,
        moved: false,
        length: 0,
        initLength: 0,
        //                contentId: '',
        //                index: 0
      };
    },

    methods: {
      initEvents() {
        let ele = this.$refs.slider.$el;

        ele.addEventListener("touchstart", this.touchstartFunc);
      },
      touchstartFunc(event) {
        if (this.animateFlag || event.touches.length > 1) {
          return false;
        }

        clearTimeout(this.sliderTimeout);
        let touch = event.touches[0];
        this.initLeft = -750 * this.index;
        this.initX = touch.pageX;
        this.initY = touch.pageY;

        document.addEventListener("touchmove", this.touchmoveFunc);
        document.addEventListener("touchend", this.touchendFunc);
      },

      touchmoveFunc(event) {
        if (event.touches.length <= 1) {
          let touch = event.touches[0];

          this.changeX = touch.pageX - this.initX;
          let changeY = touch.pageY - this.initY;
          if (Math.abs(this.changeX) > Math.abs(changeY) && Math.abs(changeY) <= 50) {
            let ele = this.$refs.slider.$el;

            ele.style.transform = `translateX(${this.initLeft + this.changeX}px)`;
            this.moved = true;
          } else {
            this.touchendFunc();
          }
        }
      },

      touchendFunc(event) {
        document.removeEventListener("touchmove", this.touchmoveFunc);
        document.removeEventListener("touchend", this.touchendFunc);

        if (this.moved) {
          this.moved = false;
          let ele = this.$refs.slider;

          if (Math.abs(this.changeX) >= 100) {
            if (this.changeX < 0) {
              this.animateFlag = true;
              animation.transition(ele, {
                styles: {
                  transform: `translateX(${-750 * (++this.index)}px)`,
                },
                duration: 300, //ms
                timingFunction: 'linear',
                delay: 0, //ms
              }, () => {
                this.animateFlag = false;

                this.sliderList[(((this.index - 2) % this.length) + this.length) % this.length].translate = `translate3d(${750 * ((this.index - 2) + this.length)}px, 0, 0)`;
                this.animate();
              });
            } else {
              this.animateFlag = true;
              animation.transition(ele, {
                styles: {
                  transform: `translateX(${-750 * (--this.index)}px)`,
                },
                duration: 300, //ms
                timingFunction: 'linear',
                delay: 0, //ms
              }, () => {
                this.animateFlag = false;

                this.sliderList[(((this.index - 1) % this.length) + this.length) % this.length].translate = `translate3d(${750 * (this.index - 1)}px, 0, 0)`;
                this.animate();
              });
            }
          } else {
            this.animateFlag = true;
            animation.transition(ele, {
              styles: {
                transform: `translateX(${-750 * this.index}px)`,
              },
              duration: 300, //ms
              timingFunction: 'linear',
              delay: 0, //ms
            }, () => {
              this.animateFlag = false;
              this.animate();
            });
          }

          return false;
        }

        this.animate();
      },

      goPage(url = "") {
        if (url) {
          window.location.href = url;
        }
      },

      animate() {
        if (this.autoPlay) {
          this.sliderTimeout = setTimeout(() => {
            let ele = this.$refs.slider;
            this.animateFlag = true;
            animation.transition(ele, {
              styles: {
                transform: `translateX(${-750 * (++this.index)}px)`,
              },
              duration: 300, //ms
              timingFunction: 'linear',
              delay: 0, //ms
            }, () => {
              this.animateFlag = false;

              this.sliderList[(((this.index - 2) % this.length) + this.length) % this.length].translate = `translate3d(${750 * ((this.index - 2) + this.length)}px, 0, 0)`;
              this.animate();
            });
          }, 3000);
        }
      },
    },

    created() {
      if (this.sliderList.length > 1) {
        this.initLength = this.sliderList.length;

        if (this.initLength === 2) {
          this.sliderList[2] = {};
          for (let key in this.sliderList[0]) {
            this.sliderList[2][key] = this.sliderList[0][key];
          }
          this.length = 3;
        } else {
          this.length = this.initLength;
        }

        for (let i = 0; i < this.length; i++) {
          if (i === this.length - 1 && i !== 0) {
            this.sliderList[i].translate = `translate3d(${750 * (i - this.length)}px, 0, 0)`;
          } else {
            this.sliderList[i].translate = `translate3d(${750 * i}px, 0, 0)`;
          }
        }
      }
    },

    mounted() {
      if (this.sliderList.length > 1) {
        this.animate();
        this.initEvents();
      }
    },

    beforeDestroy() {
      clearTimeout(this.sliderTimeout);
    },
  };
</script>