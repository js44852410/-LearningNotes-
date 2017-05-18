<template>
  <div class="wrapper" :style="{height: contentHeight[coordinate]}"
       v-if="this.recommendList.length >= 2 && this.recommendList.length <= 4">
    <div class="recommend_container" :style="{height: contentHeight[coordinate]}">
      <a v-for="item in recommendList" :key="item.id" @click="goPage(item.destinationUrl)">
        <image :src="item.imageUrl|dirImage" class="recommend_img" :style="imgStyle[coordinate]"></image>
      </a>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    padding-left: 30px;
    padding-right: 30px;
    border-bottom: 1px solid #ddd;
    width: 750px;
  }

  .recommend_container {
    width: 690px;

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

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .recommend_2_img {
    width: 330px;
    height: 200px;
  }
</style>
<script>
  const stream = weex.requireModule('stream');

  export default {
    data() {
      return {
        contentHeight: ["260px", "230px", "216px"],
        imgStyle: [{
          width: "330px",
          height: "200px",
        }, {
          width: "216px",
          height: "170px",
        }, {
          width: "156px",
          height: "156px",
        }],
        recommendList: [],
        coordinate: 0,
      };
    },

    methods: {
      goPage(url = "") {
        window.location = url;
      },

      getRecommendList() {
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/V1.3/selectAdvertises`,
        }, res => {
          if (res.ok && res.data.code === "1") {
            this.recommendList = res.data.result;
            this.coordinate = this.recommendList.length - 2;
          }
        });
      },
    },

    mounted() {
      this.getRecommendList();
    },
  };
</script>