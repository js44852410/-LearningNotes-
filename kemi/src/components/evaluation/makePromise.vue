<template>
  <div class="wrapper">
    <div class="close_container">
      <closeBtn></closeBtn>
    </div>
    <div class="pro_head_container">
      <text class="pro_introduce">为保证测试结果准确，需要承诺，家长和宝宝一定要亲自答题，选择最适合自己的答案哦~</text>
    </div>
    <div class="make_pro_container">
      <div class="pro_container">
        <image src="/src/img/parent.png" class="head_img"></image>
        <a class="make_pro_btn" @click="makePro('parent_maded')">
          <image class="make_pro_img"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABECAYAAADJGMg/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI4ODU5QjQxNzREMTFFNzhBQTU4QUZFODUwODlBODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4ODU5QjUxNzREMTFFNzhBQTU4QUZFODUwODlBODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMjg4NTlCMjE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMjg4NTlCMzE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqaUfiMAAAVhSURBVHja7JvLcxRVFMZP9zyYGYIMBA0URCUiJaKCoFWChVhaJS5chg0LFv4T/Au6dOvSjQstC0tduKAkVWqV+EBRqQASUHygMCYhBEgmmfZ86a+llXlA0vf29HBP1VeQmaQfv77n3HPOve0999o7koKVVBtVT1CbVYOq+1TLVZ5qRvW36lfVT6oT1GnVVdV8Ehcycmj4tn83bxGQTxCAtEX1mGpItUHVr1rJ74v8/WWqAsGuVj2g2qoaVf2gGlNdtPmEbcHCTd9DUM+rXlBtI4RSm7/D3wzEfq6pzqqOUl+pJlV1VdArsHDDT6r2q7bT5SqLOD9G36McjY+ojqgOc4TNZh1WkXEIo+ll1W7VWlV5CdfbRz3N4zRUn9I1502OsLzhGLVCtUP1ClXm50nYOrpphYD+4IRQzyKs5QzgB1TPMDb5CZ+jxNn0MmfIDxnXMgcLwXwvAzliVs7AOXIcvQB2RXVKNcegb8RVkjaPsepx1T7V+g4zXhJ2v2oXXX6tybhiIqgPEtb2JQTzO70PpCF7VA8bui8jBy0xedykWmXI/ZqN5grdcRMDf67bYUUXvY2ukeNnNqzICWWI6Uqh22HlmAMNsYSxaT6BDXByKXY7LNRzVV7wihQK9Ch2bcgCrBJhVS3MgJ3qyXy3w8oT0jLLHY3/x66KicnLN3C8HP/1UoLlm5pYkobViClICZax8ycNC0XsNdV1lh1p2A3VlCTUSTUJa4Z12SQvOg0DqL9MPCzfwFMdV11STacACq43ofpNDDQDTcQsQDrDp2s7Vl0lqHNZgBUwZn2v+kUs9cZpgPOz6rzqzyy4oTC4fyvh8tUUn7gN95vmQzrDmDmfBVhzjFlY4/vCUuyapduP8CEZS+BMxA6Mrh8lXH25QNc0aYhTX6qOi8G1RJMlyWmC28mietBAVh3Q3fBgPqILXsnSyIq7BlZc3lZ9Yij3wex3lKA+48+SxZHVYKA9xpGFc2Gtb90S2zcBj40Z76TqfdXndEXJKqwo2OOmPmYqgQz/WQlbv9Go9hbhdoiJX0u4Gv2BhEthknVY8RIEGzreVH0n4co0FjSw8rPyNiEhZ/tdwuWuYwzoJxijgl6ChfhVo1tOMJaNcYQ9KGEbGE27Yot6c5xBHMIy/TdMPmti0Ww26KLRcYq50BGCwlrfqxJu9Ci2GJWA9AZd76KlRDdVWM3quDFeA9wLq0GrWhTnNZYy45Jenyw1WAFdc5YTwHSbtGKewCYZ2FMzX9I3L6bFfH9XwcqMOVgOVu/CCmJazPepzoYF5jtFS0G12uFc0X6vKnOuRG3v6+82S2uQD86OHBqud4KF7Y1rmPPYSC0GWPK02ptQ5PfI8iuWEucJ1pv/2UHo8Q0LLLnfy67AVmbWVUuwysze+1vAuMakdNRCnhXIzW2W59jVQA16SUfZDcDCk3tI9ZSE2xrx5kO0Tz0XO4jJPCvXJpcKYt0G09cR72pcYB2KjgleTjibZwGLjbIHJXxNpC8GKfVEMAbR1mQU0NPABa/AYK/ZWxhdgPWShJtXNxNUXu5u82LxvI9c0FKawgcvsrfUL86aZQv95DMXtXoHHJe2hiZl3ie5suPRccZe7fM/BcejozuW/W4pJbrcFhi5Qtp1HRwsB8vB6mFYXbEYkIESyHOpwx0AA6y6GNhS2GMGPnXAQldwxvFoawv7LZDGo1W6hjWic8fm8Qqd2hpgvSdhjxtqOGC3gIL3Lbw1AlijcvNNKnGwboEVxawGYA3HYDlQzYH9Cwt7owpsQzhYzWFhxacOQDsk3Zcps2BBNLLm3MjqOLKQiy704BHp0S0tSUrbDzNQEmIz3fV/BBgAu6NAFPvfMzoAAAAASUVORK5CYII="></image>
        </a>
        <text class="prompt_mes">妈妈点击盖章</text>
        <image v-if="parent_maded" class="maded_pro_img" src="/src/img/parent_maded.png"></image>
      </div>
      <div class="pro_container">
        <image src="/src/img/baby.png" class="head_img"></image>
        <a class="make_pro_btn" @click="makePro('baby_maded')">
          <image class="make_pro_img"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABECAYAAADJGMg/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI4ODU5QjQxNzREMTFFNzhBQTU4QUZFODUwODlBODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI4ODU5QjUxNzREMTFFNzhBQTU4QUZFODUwODlBODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMjg4NTlCMjE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMjg4NTlCMzE3NEQxMUU3OEFBNThBRkU4NTA4OUE4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqaUfiMAAAVhSURBVHja7JvLcxRVFMZP9zyYGYIMBA0URCUiJaKCoFWChVhaJS5chg0LFv4T/Au6dOvSjQstC0tduKAkVWqV+EBRqQASUHygMCYhBEgmmfZ86a+llXlA0vf29HBP1VeQmaQfv77n3HPOve0999o7koKVVBtVT1CbVYOq+1TLVZ5qRvW36lfVT6oT1GnVVdV8Ehcycmj4tn83bxGQTxCAtEX1mGpItUHVr1rJ74v8/WWqAsGuVj2g2qoaVf2gGlNdtPmEbcHCTd9DUM+rXlBtI4RSm7/D3wzEfq6pzqqOUl+pJlV1VdArsHDDT6r2q7bT5SqLOD9G36McjY+ojqgOc4TNZh1WkXEIo+ll1W7VWlV5CdfbRz3N4zRUn9I1502OsLzhGLVCtUP1ClXm50nYOrpphYD+4IRQzyKs5QzgB1TPMDb5CZ+jxNn0MmfIDxnXMgcLwXwvAzliVs7AOXIcvQB2RXVKNcegb8RVkjaPsepx1T7V+g4zXhJ2v2oXXX6tybhiIqgPEtb2JQTzO70PpCF7VA8bui8jBy0xedykWmXI/ZqN5grdcRMDf67bYUUXvY2ukeNnNqzICWWI6Uqh22HlmAMNsYSxaT6BDXByKXY7LNRzVV7wihQK9Ch2bcgCrBJhVS3MgJ3qyXy3w8oT0jLLHY3/x66KicnLN3C8HP/1UoLlm5pYkobViClICZax8ycNC0XsNdV1lh1p2A3VlCTUSTUJa4Z12SQvOg0DqL9MPCzfwFMdV11STacACq43ofpNDDQDTcQsQDrDp2s7Vl0lqHNZgBUwZn2v+kUs9cZpgPOz6rzqzyy4oTC4fyvh8tUUn7gN95vmQzrDmDmfBVhzjFlY4/vCUuyapduP8CEZS+BMxA6Mrh8lXH25QNc0aYhTX6qOi8G1RJMlyWmC28mietBAVh3Q3fBgPqILXsnSyIq7BlZc3lZ9Yij3wex3lKA+48+SxZHVYKA9xpGFc2Gtb90S2zcBj40Z76TqfdXndEXJKqwo2OOmPmYqgQz/WQlbv9Go9hbhdoiJX0u4Gv2BhEthknVY8RIEGzreVH0n4co0FjSw8rPyNiEhZ/tdwuWuYwzoJxijgl6ChfhVo1tOMJaNcYQ9KGEbGE27Yot6c5xBHMIy/TdMPmti0Ww26KLRcYq50BGCwlrfqxJu9Ci2GJWA9AZd76KlRDdVWM3quDFeA9wLq0GrWhTnNZYy45Jenyw1WAFdc5YTwHSbtGKewCYZ2FMzX9I3L6bFfH9XwcqMOVgOVu/CCmJazPepzoYF5jtFS0G12uFc0X6vKnOuRG3v6+82S2uQD86OHBqud4KF7Y1rmPPYSC0GWPK02ptQ5PfI8iuWEucJ1pv/2UHo8Q0LLLnfy67AVmbWVUuwysze+1vAuMakdNRCnhXIzW2W59jVQA16SUfZDcDCk3tI9ZSE2xrx5kO0Tz0XO4jJPCvXJpcKYt0G09cR72pcYB2KjgleTjibZwGLjbIHJXxNpC8GKfVEMAbR1mQU0NPABa/AYK/ZWxhdgPWShJtXNxNUXu5u82LxvI9c0FKawgcvsrfUL86aZQv95DMXtXoHHJe2hiZl3ie5suPRccZe7fM/BcejozuW/W4pJbrcFhi5Qtp1HRwsB8vB6mFYXbEYkIESyHOpwx0AA6y6GNhS2GMGPnXAQldwxvFoawv7LZDGo1W6hjWic8fm8Qqd2hpgvSdhjxtqOGC3gIL3Lbw1AlijcvNNKnGwboEVxawGYA3HYDlQzYH9Cwt7owpsQzhYzWFhxacOQDsk3Zcps2BBNLLm3MjqOLKQiy704BHp0S0tSUrbDzNQEmIz3fV/BBgAu6NAFPvfMzoAAAAASUVORK5CYII="></image>
        </a>
        <text class="prompt_mes">宝宝点击盖章</text>
        <image v-if="baby_maded" class="maded_pro_img" src="/src/img/baby_maded.png"></image>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #a0d5ee;
  }

  .close_container {
    height: 66px;
  }

  .pro_head_container {
    background-image: url("/src/img/makeProHead.png");
    background-position: center bottom;
    background-repeat: no-repeat;

    width: 750px;
    height: 410px;
    padding-bottom: 60px;
    padding-right: 60px;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .pro_introduce {
    font-size: 30px;
    color: #333;
    width: 480px;
  }

  .make_pro_container {
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
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;

    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 80px;
    flex: 1;
  }

  .pro_container {
    width: 310px;
    height: 488px;
    background-color: #fff;
    position: relative;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;

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
  }

  .head_img {
    width: 176px;
    height: 176px;
    margin-top: 60px;
    margin-right: 4px;
  }

  .make_pro_btn {
    width: 105px;
    height: 68px;
    margin-top: 88px;
    border: 2px solid #5ba9ce;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;

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

  .make_pro_img {
    width: 50px;
    height: 50px;
  }

  .prompt_mes {
    font-size: 24px;
    color: #333;
    margin-top: 30px;
  }

  .maded_pro_img {
    position: absolute;
    right: -10px;
    top: -40px;
    width: 203px;
    height: 163px;
  }

</style>
<script>
  import closeBtn from './close.vue';
  export default {
    data() {
      return {
        parent_maded: false,
        baby_maded: false,
      };
    },

    components: {
      closeBtn,
    },

    methods: {
      makePro(type) {
        this[type] = true;

        if (this.parent_maded && this.baby_maded) {
          setTimeout(() => {
            this.$router.replace({
              name: "beginEvaluation",
            });
          }, 1000);
        }
      },
    },
  };
</script>