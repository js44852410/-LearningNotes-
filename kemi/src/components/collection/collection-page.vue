<template>
  <div class="collectionWrap">
    <div class="collectionNav">
      <div class="collectionListnav">
        <div class="listnav" v-for="(item,$index) in collectionNav" :key="item.type">
          <text class="collertionfont" @click="goPage(item.urlname,$index)" :class='{ on :item.urlname==qwerqwre}'>{{item.name}}</text>
        </div>
      </div>
    </div>
    <router-view class="collection"></router-view>
  </div>
</template>
<style scoped>
  .collectionWrap {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    flex-direction: column;
    -webkit-flex-direction: column;
  }

  .collectionNav {
    width: 750px;
    height: 90px;
  }

  .collectionListnav {
    width: 750px;
    height: 90px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #fff;
    border-bottom: 1px solid #E2E2E2;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    justify-content: center;
  }

  .listnav {
    color: #333;
    font-size: 32px;
    height: 90px;
    display: inline-block;
    padding: 0 20px;
  }

  .collertionfont {
    height: 90px;
    display: inline-block;
    padding: 0 25px;
    line-height: 90px;
  }

  .collection {
    flex: 1;
  }

  .collectionWrap .on {
    color: #FFBC01;
    border-bottom: 6px solid #FFBC01;
  }
</style>
<script>
  module.exports = {
    name: "collection-page",
    data() {
      return {
        collectionNav: [
          {
            name: "内容",
            urlname: "content",
            type: 1,
          },
          {
            name: "老师",
            urlname: "teacher",
            type: 2,
          },
          {
            name: "机构",
            urlname: "mechanism",
            type: 3,
          },
        ],
        qwerqwre: "",
      };
    },
    methods: {
      goPage(name, index) {
        this.qwerqwre = name;
        this.$router.replace({
          name,
        });
      },
    },

    mounted() {
      this.qwerqwre = this.$route.name;
    },
  };
</script>