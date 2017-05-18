<template>
  <div>
    <div class="comment-btn-container" v-if="commentList.length">
      <text class="comment-btn" v-for="item in commentList"
            :key="item.id">{{item.commentTag}} {{item.commentTagNumber}}</text>
    </div>
    <commentList v-if="keyword == 'commentModelId' && commentList.length" style="margin-top:30px;" url="appapi/getAllCommentOfAct" :keyword="keyword" :id="id"></commentList>
    <text  v-if="commentList.length == 0" class="no-comment">暂无评价</text>
  </div>
</template>
<style scoped>
  .comment-btn-container {
    background-color: #fff;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 30px;

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

    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .comment-btn {
    width: 260px;
    height: 60px;
    border: 1px solid #E2E2E2;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-bottom: 30px;

    line-height: 60px;
    text-align: center;
    font-size: 26px;
    color: #999;
  }

  .no-comment {
    height: 200px;
    text-align: center;
    line-height: 200px;
  }
</style>
<script>
  import commentList from '../comment/commentList.vue';
  const stream = weex.requireModule('stream');
  export default {
    props: ["id", "keyword"],
    data() {
      return {
        commentList: [],
      };
    },

    components: {
      commentList,
    },

    methods: {
      getCommentList() {
        if (this.id) {
          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/getCommentTagNumber`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: `{"${this.keyword}": "${this.id}"}`,
          }, res => {
            if (res.ok && res.data.code === "1") {
              this.commentList = res.data.result;
            }
          });
        }
      },
    },

    mounted() {
      this.getCommentList();
    },
  };
</script>