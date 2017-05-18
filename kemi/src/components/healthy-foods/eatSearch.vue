<template>
  <list class="wrapper" @loadmore="getFoodsList" :loadmoreoffset="loadmoreoffset"
        style="max-height: 100%;-webkit-overflow-scrolling:touch;">
    <cell class="search-wrapper">
      <div class="search-input-wrapper">
        <form class="search-input-box" @submit.prevent="searchFoodsList">
          <input ref="input" class="search-input" type="text" placeholder="搜搜你想吃的东西" v-model="keywords"
                 @input="changeKeywords"/>
          <div class="image-box" @click="searchFoodsList">
            <image class="search-icon" resize="contain" :src="searchIcon[searchFlag]"></image>
          </div>
        </form>
      </div>
    </cell>
    <cell class="foods-item" v-for="item in foodsList" @click="goItemInfo(item.id,item.eatingTitle)" :key="item.id">
      <div class="item-left">
        <div class="img-box">
          <image class="item-img" :src="item.iconImgUrl|dirImage"></image>
        </div>
        <div class="item-name-info">
          <div class="item-name">
            <text class="name-word">{{item.eatingTitle}}</text>
          </div>
          <div class="item-info">
            <text class="info-word">{{item.yesOrNo}}</text>
          </div>
        </div>
      </div>
      <div class="item-right">
        <text class="btn-word">查看详情</text>
      </div>
    </cell>
    <cell class="shownoAct" v-show="foodsList.length == 0">
      <image class="noActiveList"
             src="data:image/png;base64,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"></image>
      <text class="noActiveTxt">未能匹配到您想要的食物</text>
    </cell>
  </list>
</template>

<style scoped>
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999;
    font-size: 24px;
  }

  input:-ms-input-placeholder {
    color: #999;
    font-size: 24px;
  }

  input::-webkit-input-placeholder {
    color: #999;
    font-size: 24px;
  }

  .search-wrapper {
    margin-bottom: 70px;
  }

  .search-input-wrapper {
    width: 750px;
    height: 300px;
    background: url('http://image.kmbear.com/group1/M00/00/0D/rB8ACljTmFmAf6VmAABIMNdpgvA711.png?width=750&height=300') center no-repeat;
    background-size: cover;

  }

  .search-input-box {
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

    position: relative;
    top: 260px;
    width: 600px;
    height: 80px;
    border: 4px solid #ffe393;
    background-color: #fff;
    border-radius: 40px;
    box-sizing: content-box;
    margin: 0 auto;
    overflow: hidden;
  }

  .search-input {
    -webkit-flex: auto; /* Chrome */
    -ms-flex: auto; /* IE 10 */
    flex: auto;
    padding: 25px 0;
    border: none;
    font-size: 24px;
    padding-left: 30px;
  }

  .image-box {
    background: #fff;
    padding-left: 4px;
    margin-left: -4px;
    position: absolute;
    right: 30px;
    top: 0;
    z-index: 1;
  }

  .search-icon {
    height: 72px;
    width: 44px;
    background-position: center;
  }

  .foods-item {
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

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    height: 140px;
    border-top: 2px solid #f5f5f5;
    box-sizing: border-box;
    margin-left: 30px;
    padding-right: 30px;
  }

  .item-left {
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
  }

  .img-box {
    height: 90px;
    width: 90px;
    border: 1px solid #fec900;
    border-radius: 10px;
    box-sizing: border-box;
    margin-right: 30px;
    overflow: hidden;
  }

  .item-img {
    height: 90px;
    width: 90px;
  }

  .name-word {
    font-size: 30px;
    line-height: 55px;
    color: #333;
  }

  .info-word {
    color: #999;
    font-size: 24px;
    line-height: 55px;
  }

  .item-right {
    height: 50px;
    width: 138px;
    background: #ffbc01;
    border-radius: 8px;
    margin-right: 30px;
  }

  .btn-word {
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 24px;
  }

  .loading-more {
    text-align: center;
    font-size: 30px;
    color: #333;
    line-height: 80px;
  }

  .noActiveList {
    width: 400px;
    height: 400px;
  }

  .shownoAct {

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: inherit;
    -moz-box-orient: inherit;
    -webkit-box-orient: inherit;
    box-orient: inherit;
    -webkit-flex-direction: inherit;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    margin-top: 80px;
  }

  .noActiveTxt {
    color: #a5a5a5;
  }
</style>

<script>
  import {mapGetters, mapActions} from 'vuex';

  module.exports = {
    data() {
      return {
        size: 9,
        searchIcon: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAvCAYAAACYECivAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njk5QTNDNzkwQUJBMTFFNzhBOEE5RDczNjI4OUUxNjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njk5QTNDN0EwQUJBMTFFNzhBOEE5RDczNjI4OUUxNjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTlBM0M3NzBBQkExMUU3OEE4QTlENzM2Mjg5RTE2NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTlBM0M3ODBBQkExMUU3OEE4QTlENzM2Mjg5RTE2NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PscU7gUAAAQoSURBVHja1JlbSBVRFIbnaEqp9RKiBCVeIisKCcpbRaTZRewhye5QIKcgLfDFiiB8iFIQutjFY6XQDYuCkAizgkoTg8jCzECNCqIUejC1yMz+Rf/EdNBz9pyb04KP2c2Z2etvz9qXtbRVVlZqJi0WrASLwWwQAybzt6/gHXgNGkE9eOuqM7vdbsr5BMXngkEeKACpwDbGc1PJArAFjIBmUAGugWHNSwtSeCYTtIErIA0M0PkukAKiwEQSxXvyWy2fTeO7bezLK3M1wiLguHw1/rsblNJ5/xjv9JAWILEWATaC/SARNAAH2Au++3KEI8EjipWOixmvDhdiRzN59hzfLWZfdvYd6asRlo4eg1kc1VzQqtDXKdDLCfcQfDL89gOUgbvgBlhIH0v4jscjHAbqKFZiLl1RrMbnZTJuBe3gHljrNEFb2WcbfdQ5HI4wbwRLzCaDTpDhNEru7Aw4BHI4+SR8DoL7YKbhOelzOX0k06dHgmUG5zPO8jh5PLUhriQpvMqavMLwu4TBevrKxyhnmhUs1xNsl4Dnmm/sFzjLUa9hiBjDo4TtkxAdbEbwBs7kLlCu+d6egnWgisubbuX0mcivqix4N6+l/Jz+sBbG+Gmn0Clju0BVcCx3o35uCv40B88duYZ7l+k7FWERpyJ4FZee29xK/WkS04e50+mHnwH6tvFQ5VZwOtsPtMCYiLvltD7rvtNVdrq5bL8IkOChUSb2S17nqIzwdLa7tPGzTl5jVATrh+++cRSs+47wxXnYUhbEtEZsSgD9TjN8WaPvfhXBH9iOD6DgCi6nmpPv9yqC29meHyCxIWApaDLc032/UhHcyHZGgARn85D/0XBP992kIrie2e0aEO5nsbJZHADH/u7VDkc4fY9Qi1vBkgY94STY7GfBwTxP3DTc20Tfzdimu1WXtVO8FjPG/GU/mZSOGOJ5n2EiKh8vJSvo4GwtCuBqUUSfHdSgLFgqMoVsy5k1KQBik+hLbA/CYdiMYI1ZbjWYBK57WjdQtEj6EF8XILbB06y5gJlBArPdaD+IjebgJNBXoTdp/iATxjdgHtfFJB+HQSM3CvGRg9Ed9LZU1cud6BmQlKWZMznUC6GhXIGaOcl6Wfn54qvaWg/LSLJmSlHwCHenfJObSxjfke3/KPs6z/+A3K9WTe9VjpffwE6Qxc8XxzRdKjdXWdRbxAkUQiJ5z85nPvOdePaRRaHZPCVuMyvapliB1wvahazm2EwMil7QrtX+LWhL/naHu9xFsENlabN5+CeD1dqfPxlIAWSG4TzbxyNiByeXCHL1JwOj6EtguzvRngj2tZkSPe4pEsQ18YtJTEuptsZVTFsipzMj2jJJqKpoS2XNKqItl+a7E23JuoQr0ZYtpIwl2tKVn1FEV1m+VOUketl/UVujaDlDp/wWYABf/ipWcmgkeAAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAvCAYAAACYECivAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjQ1NjY1QTkwMjNEMTFFN0I1RUNDMTlCQTAwQjc2RTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjQ1NjY1QUEwMjNEMTFFN0I1RUNDMTlCQTAwQjc2RTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QkZBRkVDRTAyM0QxMUU3QjVFQ0MxOUJBMDBCNzZFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NDU2NjVBODAyM0QxMUU3QjVFQ0MxOUJBMDBCNzZFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrimDKcAAAQLSURBVHja1JlrSBRRFMdndJPSiiBECUosQSsICQIfFUVK76Ckdx8KNgvSAgmsvkQfohSEHhphL6EH2AvCQswsKrelILIwU1KjggiFCNOQrLb/pf/AZXF3787sjuOBH3Odxz1/Z86999yzuu+BFq6lgqVgPpgJUsAEXvsBPoJ3oBk0gA9he1jiC3jJpdhFLNgAikA20APcN5nMBVuB8OwFleA6+KNZtBiFe/JAK7gGcsAAne8GWSAJjCVJPCeu1fLeHD7byr4smR4kJISAk6CQf3eDMjrvV+x/PNgEDoLpPFcN9oFBMyER6A0ngicUKzouZbxWhyFW473n+Wwp+ypk34lm3rArgNinIJ1vtQC0KPRVBXo54B6Dr9K1X6Ac3Ae3wDz6WMBnTMdwPKijWBFzuYpiNd4vBuM20AZEsK3xG6At7LOVPuro03QMnwNu0MmOe0yOjTFgLdjPsNgF3vt9xWcgjSGz00wM51HsIKewHguDeYgzSRaPYk7Ol66LMFhPX+5wZo8Y6XiK7SPglRYZ+wvOgtWghiEih8cRtk9zrlcWvJEjuQtUaJG3F2AdQy5DOl9Bnxn8qsqC9/BYxs8ZDXsODoMzfqFTznaRquBUrkb9XBSiadXMOwqkc1fpO1taXIIKXsap5x6X0miaiOmjXOkMG6BvnUlVSMG5bD/U7DEh7o7f/Gz4zlVZ6Waz/domwUPDDOw3PM5SecNT2e7SRs46eUxREWwk330jKLhPyu4s58OOshhua4RNtNHvFOnLyr77VQR/ZnuGjYIrOZ1qfr4/qQhuY3uOTWJFJrcQeKRzhu+3KoKbjaTOJsErmeR/kRNKHj0qghu4u10BEqIsViwWh8AJ6VwCffuoJaTgbibTYhBsibLgWOYTt6Vzm+nbSy1K01oVj6WMsWjZb+4wfFI8H5AGonJ6KXYF7RytJTbOFiX02U4NyoJFRaaYbZGzZtogNpO+hO1VrQrJK53Yjl4C48ANs3UDRUukD+HrImg0u80v4s5A7GabQHIUxCbz5aTRV7HVUpXZQopqGNxk3HZEopBibMHFSvSSWxYvR3KcBaFxnIG8FNvLl/LNTPIznPXwvxdzpigKHuPq5A5zcYnnM2L5P86+LvAfcHPMxFoNCX/LZ90gXcqo7oJHDBVRsP7Oa5O4qRWffjFYJeW4HYzXRm6F6rlgXAY7VGcJXbECbxS0i1nN0cN4KUZBu9ZPlCnRusmfDJZr/38yEAWQaVI+28cUsZ1JVb0W/CcDWfQVsD2UaDOCI21hidZ9Pp990pp0y6KdsqfzMMzEdk3Ul2sCzR5O2oQqiXbarjmkaCdu84OKdmpdIqBoJxdShhXt0pxthuh6ih4aDaUq+U0vcmmjwzwstvz8J8AAAjYDo38YCWcAAAAASUVORK5CYII='],
        searchFlag: 0,
      };
    },

    computed: {
      ...mapGetters([
        'foodsList',
        'keywords',
        'page',
        'loadmoreoffset',
      ]),
    },

    methods: {
      ...mapActions(["getFoodsList", "resetPageInfo", "resetKeywords"]),
      searchFoodsList() {
        this.resetPageInfo();
        this.getFoodsList({
          "size": this.size,
        });
      },

      changeKeywords(event) {
        let val = event.value;

        if (val.length && !this.searchFlag) {
          this.searchFlag = 1;
        } else {
          this.searchFlag = 0;
        }

        this.resetKeywords(event.value);
      },

      goItemInfo(id, name) {
        this.$router.push({
          name: "foodsDetail",
          query: {
            id,
            name,
          },
        });
      },
    },

    mounted() {
      if (!this.foodsList.length) {
        this.getFoodsList({
          "size": this.size,
        });
      }
    },
  };
</script>