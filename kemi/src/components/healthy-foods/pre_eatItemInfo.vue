<template>
  <div class="wrapper">
    <div class="image-box">
      <image resize="cover" class="top-image" :src="foodinfo.eatingImgUrl|dirImage"></image>
    </div>
    <div class="content-box">
      <div class="content-wrapper">
        <div class="title-content">
          <image class="logo-icon"
                 src="data:image/png;base64,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"></image>
          <text class="content-title-word">{{foodinfo.eatingTitle}}</text>
        </div>
        <div class="info-content html-text" v-html="foodinfo.effciency">
        </div>
        <div class="prompt-content">
          <div class="yes-prompt-title" v-show="canEatYes">
            <text class="title-word">能吃</text>
          </div>
          <div class="no-prompt-title" v-show="canEatNo">
            <text class="title-word">不能</text>
          </div>
          <div class="care-prompt-title" v-show="canEatPrudent">
            <text class="title-word">慎吃</text>
          </div>
          <div class="html-text" v-html="foodinfo.eatingDetial"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .top-image {
    width: 750px;
    height: 300px;
    margin-bottom: 30px;
  }

  .content-box {
    position: relative;
    top: 0;
    left: 0;
    height: 965px;
    width: 690px;
    padding: 30px 40px 0px 30px;
    border: 5px solid #ffbc01;
    border-radius: 10px;
    margin: 0 auto 30px;
    overflow-y: scroll;
    background: url('http://image.kmbear.com/group1/M00/00/0F/rB8ACljY3WCAUTfBAAErZyYjmAk879.png') no-repeat;
    background-position: right bottom;
    background-size: 60%;
  }

  .title-content {
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

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    margin-bottom: 30px;
  }

  .logo-icon {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-right: 30px;
  }

  .right-bottom-bear {
    position: absolute;
    right: 0;
    bottom: 0px;
    height: 540px;
    width: 450px;
    opacity: .2;
    /*z-index: -1;*/
    background-color: red;
  }

  .content-wrapper {
    height: 900px;
    overflow-y: scroll;
    /*-webkit-overflow-scrolling : touch;*/
  }

  .content-wrapper::-webkit-scrollbar-track {
    background-color: #b46868;
  }

  /* 滚动条的滑轨背景颜色 */
  .content-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* 滑块颜色 */
  .content-wrapper::-webkit-scrollbar-button {
    background-color: #7c2929;
  }

  /* 滑轨两头的监听按钮颜色 */
  .content-wrapper::-webkit-scrollbar-corner {
    background-color: black;
  }

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
  .content-title-word {
    font-size: 28px;
    color: #333;
  }

  .info-content {
    text-indent: 48px;
    line-height: 35px;
    font-size: 24px;
    color: #666;
  }

  .yes-prompt-title {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA6CAMAAAD4DFnNAAABOFBMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD///8irDj/vgX/5Zr/2Wz/+OL/78P/+/Axskb/9dr/5p3/zD4lrTv/xSH9//7/+er/7bz/01j/0lI7tk/6/fr//PP/9t3/1mMrr0D2/Pfy+vP/+uzn9unX8Nv/56KX2KH/34f/yjP/yC3//vrt+O/d8uHJ686+58Sm3q+h3KuJ05WF0ZH/4Ihpx3hhxHBYwWhSv2NIu1pBuFTh9OTP7dS047uw4bh7zolwyn7/0lT/4Ip9zop3zIT/12UwDQS7AAAAKXRSTlMA/fYGue6fIcZ8+qqlZdl38lMrEQvw4t3NmJNqPjAfX1clvbCDPSQaFt5H3eAAAAMMSURBVGje1drXVttAEAbglVwAg6mhBgJJIMk/I3DBDTdwoffee8r7v0GEAcs6lo18s5a+O93N0dndmd0ZYckz1+fvHOkH+kc6e/rmPMKphoJeFSaqNzgkHGjQrwLYXoiFQ8tEy6FwbGEbgOofFA7T0a0A8fklMlmajwNKd4dwEE+XCq2wSBYWCxoUVYUEAV+vd2L6i2jq6xiQCVEDoQyk6u1qEu7AMJJpaiKdhFRK95Sw9llBNkJNRbKQS/H/Eha6gDP60Bkk8w1Y/FVoG2TDhgbJxj3CbEDBPNkyD9m8n0StH8PYIpu2IFtnbbCeMWTJtixk++ap3VfJCNkWSUK2cSOxqkhTC9KQbka86UGGWpKBbL6fb6lV0ULUkpAG2XpEhR8L1KIFyKZMCd2nfixSixYh3Xehm0acbDkuntC7OGRTXqpnr82MdcQcbWP2wqwQHhVLZMN9gvnUuClAul4hJrFDNhzqoZ6nqGoH0nWIPlunwEGR+SLf1pMAQdGDGH1oPcp8VaIaMUg3IToRpqr8PlnZ10O9LlOtMKTzihGsUNUlP6aozlqO+WaPTFYg3ajoxzJVFY29bti7Yc6tkdkqpPMJgAybzLxJZuVr5mjd2tiFdAFzrHSiB3tMtUpXeqjr5IhYTWuAUo96sA9kyF8wFw+IyAlrwLS39GCfmBOHxud59dMBe8s4syx+ZOqvHuo9vWr/mVWXC0qXzNE7qjhl5iN61/ZcUJ9jy5XdVD0WnFJtI2hVu+xdM+duiY71UE/IpK21i6kmNCWqtQc91D9k0t6a0LrWvo0y5xLMTynHvBRhVo81iLhlYaU7z5NZu+8wQ6rV3fAuwXxZctrdsMGd+yiRKzvuzi0GXfSWIbrd80bkqrc3N71puuqt2E1v8K7qbbiqZ2S3F/cbkvlmGvQ4nz/qcT5DLr3H2bh3HKYmwo7pHb/25AuNe/IFyGT05FufdfinQVEDkMCYdbA1Q7JKJqsOnCGpzuZob7M5u5GVl9kczZGzOe6aearwTOqzZKO+QMA3qs+STTpkluw/UmM+ih8Y4lIAAAAASUVORK5CYII=) left top no-repeat;
    background-size: 170px 60px;
    margin-bottom: 30px;
  }

  .no-prompt-title {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA6CAMAAAD4DFnNAAABF1BMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/////AAD/CQn/Dw//5pz/yMj/v7//vgX/xcX/2Wz/wcH/FRX/+uv/78P/+/D/DQ3/9tv/4Ij/0lP/yTD/xSH/zD7/JCT/4+P/9+D/7bz/01j//PP/5Jn/Gxv/6ur/9+L/1tb/zs7/ra3/56L/n5//1mL/LCz//vr/+OP/9t7/tLT/kJD/NDT/7+//ubn/i4v/12T/Kir/mJj/lZX/eHj/cHD/zD1nQCZdAAAAJXRSTlMA/fYGIHirLsa5VPrupaBlJNl/PRQO8vDi3c26mJPsnGlfG71tC5GvZgAAAwhJREFUaN7Vmltb2kAQhjdBEOQkIojnavsNGo3IQeSggOCxKFbb2uP//x19QmgSyCalN8vy3vBw9z4wO7M7M4xLIB3cDeeyQDYXjgfTASYrmWRExRhqJLnKJGQxYYjWC1q5dUV01Sprhbqhm1hkkrEQUoBmt0RjlLpNQAktMIkIBFXo/SpxqPZ1KKoKAUR3UpHtvX3my/IG0GmRBzcdCCW14vM/Lq2h0SYf2g0IRQl5nZF3CmoV8qVSg1iUBDf/rADn9E/OIZjYEudXhf5AU/CgQzBbgclYVdClqehCNJHMeAZY+xsAEoYBwk7ZwAZqNDU1iOa9IwyCaFRoaioNiGbLLqwq2vQftCEcKxvE0bE87osXp8Th6KJ4b33pQDSx/dHBUvQbS6OXzx+cclQP8/meXW51iCZuuu6iQBaPeUOWp5p/JIsCRKMMy20mi6rD6owje2eonh2RRRXCCRmue/hNDk5MWbfqCTloQjSKceuKoEu+sndFlz1pEM4KYwEVJeLLOlWPaYwShJNiLI06kY/sra3qpA7hLLMgCuQha6t+oUkKEE6SxaGRW/bQlHWpzjJgt1kYZfKSPb7tGR+fyE0ZwtlkObTIU7bopUrPEM46y+KKPGWdqjNPBDsMIBPOATO4Jy5PEE7U2/Wylx/GrESuXjFweTGKgWN5YiCHlrfqwVBWmrMVRtlT9eModcmSs+LQPFWtPCtJLeDV2OtvI1WiI1NWjhqbRt1T1ZSV5+7ivhNePxqq3+33izR3QhaBxlH9QTQpO/u7NkuiSQ4+vxqqL0QuWQneMKsqqhxVjuzs34Ys4cwEPw3Vr9w3d2/2b262qOgDy+KXqcqTLUrQy2AhdOwq8Fp8kbhHNFe9t3nqac5Vr3ieevDD2YZGHGS4YEUy8zszmqtZHGMf5mfGac6Oy+RDWZrZsTmT7w/Ig0EfwrBn8v67Dm/8XYc3HYoahQCisdTm9t7ClDsk2uQOiSbfDom1m6OPdnOeKs/Gbo4u5W6Owap752lTzp0ne5dsPRaNxtYl2iX7A+2Kv5HIed8+AAAAAElFTkSuQmCC) top left no-repeat;
    background-size: 170px 60px;
    margin-bottom: 30px;
  }

  .care-prompt-title {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA6CAMAAAD4DFnNAAAA21BMVEUAAAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD/vAD///86OTn/5Zuurq7/+OHZ2dn/2Wz/9tt9fX3/+er/78P/++7/4Ij/zD7/xSH/vgf/vQL/0lP/7bz/12P/01j//PL9/Pn/56H/yjP/yC3j4+PPz8/ExMRvbm7s7OyXl5f/0VHHJM0KAAAAJ3RSTlMA9roG++54IfKqpaBm2H/FUysRC+LczZiTPjAfGMicaWBXJbA9JG1ZasekAAACaklEQVRo3t3a+VIaQRAG8N6TG7yvqNGo+XoPF0G5BG9zvP8TZRWsgnJmAvljqje/J/iKmu0ZupuUvPPwuLVVBspbrWp47pFUG3XXwQLHrW+QQOs1Bxg+ZnE3vWO+S7tx9jgEnNo6CVOqAOjFHV7QiXsAKiUSxAsdDMZtVmiPB4DjwAI/aLh7J1/I6NsOMElZI53AqkbTEHetjP4tG9z2YVflgNS++vh9zUbXI1hWOySFJnDDf3UDy4I1xa+K4QMv4WEIy3Y9WrTmI+alxLDN3aR5F8HHARB4DNCaD+vtYMRLG8E2d+4YhOirKsBrkiQ/FdWgD9t26UPJgbKuXkVRdKmqs7DulGaqmLDKL01WnsC24HB2tfqDlFWSPOszK6QD2Fald8fIWJuVlTJYd0C5zTLaq2Ztw7ozyp2gx6tm5R6sK+VZXcSGrGJuLzSJPAed1bN2YF2DaB9PvHpWfoJ1JQqRmbOKqQR1qiJmjZc8q5znFvboCF3WuIyiK9bowjqXtpCas4qpsNtUxp0xq5xCEBDA/5L1Htb5hcpapDNQpG+rSDXLcBdwFCWi7oIQmSmrqDvW8HbhJLkU9XYxvAlzgspA4/NbW2qnCM08ax09Xb1/TZ5l/YfZcNBmpR9RFL1Iqa5n9KaGTFNec1dSqsDBdEqEQarPKquXQRVM9GdAVo9I23vjt29LWO9t2tPUENbTLFSvmC7KhenBF2q2UaiZkdxZ3CkpfAdGBZlxTmfHXTboipkdT2fyY/1MfgwLdDP51XcdfFgw23X4j3ZIPu3m3F+35e7mFGvn6Z23Hx63tgPfD7aPquG+kF2yP+CB8rnS+sB8AAAAAElFTkSuQmCC) top left no-repeat;
    background-size: 170px 60px;
    margin-bottom: 30px;
  }

  .title-word {
    line-height: 60px;
    text-indent: 80px;
    color: #fff;
    font-size: 28px;
  }

  .prompt-content {
    margin-top: 30px;
    color: #999;
    font-size: 24px;
  }
</style>

<script>
  import { __KMBirdge } from '../../js/bridge';
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');

  module.exports = {
    data() {
      return {
        canEatYes: false,
        canEatNo: false,
        canEatPrudent: false,
        foodinfo: '',
        yesOrNo: '',
      };
    },
    methods: {
      getFoodInfo(repo, callback) {
        return stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__PREAPIDIR}api/preview/selectFoodEat/${repo}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }, callback);
      },

      getYesOrNo() {
        if (this.yesOrNo === '慎吃') {
          this.canEatPrudent = true;
        } else if (this.yesOrNo === '能吃') {
          this.canEatYes = true;
        } else if (this.yesOrNo === '不能吃') {
          this.canEatNo = true;
        }
      },
    },
    mounted() {
      var foodid = this.$route.query.id;
      this.getFoodInfo('selectFoodEat/' + foodid, res => {
        if (res.ok) {
          let data = res.data;

          if (typeof data === "string") {
            data = eval("(" + data + ")");
          }

          if (data.code === "1") {
            this.foodinfo = data.result;
            this.yesOrNo = data.result.yesOrNo;
            this.getYesOrNo();

            __KMBirdge("getShareInfo", {
              "id": `${foodid}`,
              "title": `${this.foodinfo.eatingTitle} : ${this.foodinfo.yesOrNo}`,
              "icon": this.foodinfo.iconImgUrl,
              "detail": this.foodinfo.effciency.replace(/<[^>]*>/g, "").trim().slice(0, 50),
              "url": window.location.href,
            });

            setShare({
              "title": `${this.foodinfo.eatingTitle} : ${this.foodinfo.yesOrNo}`,
              "imgUrl": `${__IMGURL}${this.foodinfo.eatingImgUrl}`,
              "desc": this.foodinfo.effciency.replace(/<[^>]*>/g, "").trim().slice(0, 50),
              "link": `${__DIRPATH}foodsDetail?id=${foodid}`,
            });
          } else {
            modal.toast({
              message: "请求数据失败",
              duration: 1,
            });
          }
        }
      });
    },
  };
</script>