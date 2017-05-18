<template>
  <div class="wrapper">
    <div class="head-container">
      <div class="head-image" :style="getLogoUrl(organizationInfo.logoUrl)"></div>
      <div class="head-detail-container">
        <div class="title-container">
          <text class="title-text" lines="1">{{organizationInfo.businessName}}</text>
          <text :class="{'collection-on':organizationInfo.isCollection === '1','collection-btn':organizationInfo.isCollection === '0'}"
                @click="changeCollection(organizationInfo.isCollection)">{{collectionText[organizationInfo.isCollection]}}</text>
        </div>
        <div>
          <text class="collection-count">收藏 {{organizationInfo.collectionNumber}}</text>
        </div>
        <div class="introduce-container">
          <text class="introduce-text" lines="1">{{organizationInfo.serviceItems}}</text>
        </div>
      </div>
    </div>
    <div class="contact-container">
      <div class="address-container" @click="openMap">
        <image class="address-icon"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjBGNzA2NDYyQkNFMTFFNzhDREI4NkQ5QUFDNDI5MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjcxNEU4MEUyQkNFMTFFNzhDREI4NkQ5QUFDNDI5MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMEY3MDY0NDJCQ0UxMUU3OENEQjg2RDlBQUM0MjkxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMEY3MDY0NTJCQ0UxMUU3OENEQjg2RDlBQUM0MjkxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PstMg/oAAAPYSURBVHjapJZ9bM1nFMd//d0rnbZMSzMa8bJaVOI9bSTESoQ/WEsM9Q+Jsg7bMpbOS/hLmsYQqdekFZt4CaEskQg60sWmf3hpWei6l2TMbBO0Om3VSOt7ks+VZ3e/exEn+eTe3/Oc55zzPOc85/dLKC8v9wIkQQwQ48QEMVS8Jd5gvl3cEdfEt+K8uFFUVNT5P0MBDhLFFFEoBosn4pb4W7Shk4TDfqKLaBBfiSo5eRzPQbpYgHFbeI4IzcBt8Qi9riJDDBETRa74V+wWX8rJvSAHaeJj8ZH4Q+wUX4tGL770FDNZ20dsFzvk5L5N+iglE7UZrxcfsuXGqKNLg8TIIIYs8iJxXSw1WxUVFcmug/FisfhLrBJ1osMxnClmi2XiUzGLsUScmO5lsYKjNGfvRo6ov343ihxRKnY5UfcgJ3NFKjnoJMlN4pDtVA4eRBYo8oX6WSsuiWLbwVgxUpwRRxzjvcRKorYIDxLIJv53sJuVMprurKvE1giz7VPnVlrV4oFTJXPEfHKygt3th1LG6tEpkJOuHFczlWc2c308/U4pRmQgSb8h1onvWBCRx4ytQ6eQNRH5EZsjfC6MXaK7TNrYMMZPiKtxSvQHdOyIhmkXIcbvYrO3T8JsWy1MdhdZPNc7tzdI2tBpYU13xluwmeRTFSH6j8f/sHjqlGo86aCdhJ2yT8BOp4+ndMrQ4/kXLtQgFGNJCJ2erGlmPBWbzT7JHYiiR+S1wvrJNDEqjgObe48bX6cKesp4JjYbzEENCc12or1JPQ8XS8Q7tJMQJDO2hII4yhqPRGdjsybMpcgTk8Q34oJ4SH/J4D68LY6J35wynkmJH7bbr+j/YW60mEzbORPmiKrEIjEdByZ/ii94seSLz5xKS6FVbBV7ZPy2c2wzOG4LsMEctBLdVKik2Xlcoi3kJIfe5HHjL9plk/Empw+NwoY5rNRca5i5egx/wq1c7URrBo5DMmOt0dmW8RTWWvVtw+bzuu3AQS3HlOvMudIaw7hPy59O2z5CC/+PETuOPSR4OaX2spJJjsz5Xhm/6Tl9x5XT9PgxYh5tJK4o+iR0x1JRVe58tIN2en01VZUf46jc9fno2poDir4tngOTX6mcFi5SdhwHOejY0ZTJ+M9BEQTJeWo8y/laiJYMPhIGo/t9rC0GiR3VPu5HHoZSnPluOM5DxxLb/ioOIl21TFwR9iJ/35krEB8wV8ZrMlDCLyiSn0SJ2Cw+p21Yry+m15QEnfurODA5y9eEveTX48A+Ezcw572ug8inyJvsxmRN1CfOazuwBJ4UfXk+FfWVEVOeCTAANDonbgizWWgAAAAASUVORK5CYII="
               resize="contain"></image>
        <text class="address-text" lines="1">{{organizationInfo.address}}</text>
      </div>
      <div class="mobile-container">
        <a :href="'tel:'+organizationInfo.mobile">
          <image class="mobile-icon"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAkCAYAAAAD3IPhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjBGNzA2M0UyQkNFMTFFNzhDREI4NkQ5QUFDNDI5MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjBGNzA2M0YyQkNFMTFFNzhDREI4NkQ5QUFDNDI5MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMEY3MDYzQzJCQ0UxMUU3OENEQjg2RDlBQUM0MjkxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMEY3MDYzRDJCQ0UxMUU3OENEQjg2RDlBQUM0MjkxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgSRHMcAAAPISURBVHjavJgJSBQBFIbXTI0us6zoxrUisigr0CKyco3IyCQqTYruLCrKTIoiyjC6yW4zOqQDO8wu7bCIDqKILksKOiyMEosOskvd7X/yryzD7uy4zvjgQ3Fm1n/evPe/N+tlu2pyFU1BALCBz+CPyYiw2Gp+bejilB5gARhBEefBQfCK4gyJBk7+NhDsB7HgJSgFU8B2MBx415eYARTSF6wFoyWRYBkwgywwXiWjuokJBmmgA1gM9jgcOwKW8xFlgpHAyygx/vxnvfkz08m5OWA++AZSQIgRYqQGJoBocAwcVTk/FySxwBex23QVEwRmgutgL/jh5hrprHwwFvTSW0wIBV1k67oLafV9oAqE61nMIqYC/OVPreHLYm7hwh48FvMa/AStNV4zCKSy1m6BSj3FfAVWmpxaQTYDySADdAHrKMaqpxgp2DwaXZCL8zrSdzZxTk0FO0C53gUsBXkBNAHDXJwXy+4R/5nBzqs0yvSkbh6CGNBWcY4YYhQoYmbeGD2bSml4XcFQhdX/outKkf82GRh2MdLWd0AxmKjoLDn2FITRqX3qY2rLunAO9OMe4xinwW0wCfSvDzFSyJfBexCvqJ23YDfdNpWzyfB9Ror0DOgJpimOn+UqITW1ykmhq7l1J9ANtFEbH0oxMhZOghccnmGK41vBZtbOeg2u7cMF7QBn3y5aRKDWtbMEHOadz+P8sYeVWdlC49uokiHpyEiwBrQDT5gZ2SC30WTdirGvCekgghlyTK2Y3QoKEUE7+ViVEczxIdcu4bqaAI6DIXT0KC1iypnaR9zuYhTHRdBKPrJYPj5x70Y83pg3IZk5xMawZz2Nm6K5+o2jwCuiJpUq700m7ivZ3F2mgxuK435gFphMAQXgGXekeA7S2TRNZyNmA/gC5oBCd2JMLMAsTvdE4OyKSH7gYL78ifhrrK8ilc8Wg10N7sn1WsRIxHFKixsvBSecLGP+NMTO4Du4Dz5o6LYUfn6SVjESo7jDNGempE3LdPC6UPrX49qsjHlM6012UTofYV3XzmDWW3FtMmMP8YxxbFdvFrh0zHMPhPQBp7iwxXkixm7x4Vy0YlikuXx8n7R+/+Dg4okmiy3fUzH2aMlaSuDMusv2zubArXBxIwn0G9/q1rfYcrT4jJbw4nOXOx3DjEl2rvCVuIR7koySVmAuWMiFLrlavMVWpZcYe0j9tOerTDQ9J5DC3rHzzFz6L9G9Cx2/LNJTjOOIEePrzqkfSsw0zgyOmjKt31zVJax8/XnA2ebHd64A7tAfwT9nF/4XYABF8O4uSTzXDQAAAABJRU5ErkJggg=="
                 resize="contain"></image>
        </a>
      </div>
    </div>
    <div class="activity-title-container">
      <text class="activity-title">活动</text>
    </div>
    <activityList size="2" url="appapi/getOnlineActPage" keyword="businessId" :id="id"></activityList>
    <div class="activity-total-container" v-if="organizationInfo.actNumber > 2">
      <text class="activity-total"
            @click="goPage({name:'organizationActivityList', params:{id:id}})">全部活动 {{organizationInfo.actNumber}}
      </text>
    </div>
    <div class="occupy" ref="occupy">
      <div class="nav-container" ref="navContainer">
        <a class="nav-btn" @click="changeNavType(0)">
          <text class="nav-text" :class="{active: navType === 0}">简介</text>
        </a>
        <a class="nav-btn" @click="changeNavType(1)">
          <text class="nav-text" :class="{active: navType === 1}">文章</text>
        </a>
        <a class="nav-btn" @click="changeNavType(2)">
          <text class="nav-text" :class="{active: navType === 2}">评价</text>
        </a>
      </div>
    </div>
    <div v-show="navType === 0">
      <div class="abstract-container">
        <div ref="abstract" :class="{abstract: hasMoreFlag == 1}" v-html="organizationInfo.businessDetails"></div>
        <div class="lookMore" v-show="hasMoreFlag == 1" @click="lookMoreMes">
          <text class="lookMore-text">了解更多</text>
          <image class="lookMore-icon"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAOCAYAAAAxDQxDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzA2OUEzNjgyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzA2OUEzNjkyQkJBMTFFNzhDREI4NkQ5QUFDNDI5MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQUYyMzE3RjJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQUYyMzE4MDJCQkExMUU3OENEQjg2RDlBQUM0MjkxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuYCeU4AAAFlSURBVHjarJTNK0RRGIev07CwRr4/JpEs/B8SkUgRKTdKg2JhIaIslFJW98aCsZCPYuGzhLLx59hM08jwnPqpaZqPe5m3nnPqnPeep/Oec26Z53lrjuOkYRu+nZDhum7eOd/36+huIRmhmQM7UAVLTokCSQPdE3TCg6EZhA9Y1K5KIWmie5HEyoas6B36IAGrsP5PSYsk7fAI/ZQ3YTT/Zgck24CVP0raJInCPQxYiZ0zGXl2i8OQgh2IhZREJWmFG0mSv/MmK/8ORiXbg5mAkg66V2iGa3smSFKZOSbHd1cwoSvvwWQRiT3wZ2iESxjJluQT2TiDackOtctc0aVy1cM5jOWSFBLZOIZZ5cT1DDKjW5JaOJXkM99ipkj5D2AByrVYr8Z7VK4aOIFxJF+FFjIBznoflqECLmBeN7QajmCqmMRGJODt3YVK2JTY0dnhcNNBFoiEeCpbyo+pnPEwP+EfAQYAsRVjANQKuSYAAAAASUVORK5CYII="
                 resize="contain"></image>
        </div>
      </div>
      <div class="teacher-title-container">
        <text class="teacher-title">教练团队</text>
      </div>
      <div class="teacher-container" v-if="organizationInfo.teacherList">
        <div class="teacher-list" :style="{width: 164*organizationInfo.teacherList.length+ 'px'}">
          <div class="teacher-item" v-for="item in organizationInfo.teacherList" :key="item.id"
               @click="goPage({name:'teacherDetails', params:{id:item.id}})">
            <image class="teacher-image" :src="item.headImageUrl|defaultHead" resize="cover"></image>
            <text class="teacher-text" lines="1">{{item.userName}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="article-container" v-show="navType === 1">
      <div class="no-article-container">
        <image class="noArticleList"
               src="data:image/png;base64,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"
               resize="contain"></image>
        <text class="noArticleTxt">还没有文章~</text>
      </div>
    </div>
    <commentCount v-show="navType === 2" keyword="busibessId" :id="id"></commentCount>
  </div>
</template>
<style scoped>
  .teacher-container {
    width: 750px;
    overflow-x: auto;
    background-color: #fff;
    margin-bottom: -20px;
  }

  .teacher-list {
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

    padding-left: 5px;
    padding-right: 5px;
    min-width: 750px;
  }

  .teacher-item {
    padding-left: 30px;
    padding-right: 10px;
    padding-top: 30px;
    padding-bottom: 70px;
  }

  .teacher-image {
    width: 122px;
    height: 122px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-position: center;
  }

  .teacher-text {
    margin-top: 20px;
    color: #666;
    font-size: 26px;
    line-height: 26px;
    height: 26px;
    width: 114px;
    text-align: center;
  }

  .wrapper {
    background-color: #f5f5f7;
  }

  .head-container {
    width: 750px;
    height: 300px;
    background-image: url('/src/img/infoHead.png');
    -webkit-background-size: cover;
    background-size: cover;

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

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .head-image {
    width: 122px;
    height: 122px;
    -webkit-border-radius: 61px;
    -moz-border-radius: 61px;
    border-radius: 61px;
    border: 2px solid #FFF;
    margin-bottom: 50px;
    margin-left: 30px;
    background-image: url('/src/img/defaultHead.png');
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
  }

  .head-detail-container {
    flex: 1;

    margin-bottom: 40px;
    margin-left: 30px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }

  .title-container {
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

    margin-bottom: 20px;
    padding-right: 30px;
  }

  .title-text {
    color: #FFF;
    font-size: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 80px;
    max-width: 400px;
  }

  .collection-btn {
    width: 88px;
    height: 40px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    color: #FFBC01;
    font-size: 22px;
    border: 1px solid #FFBC01;
    line-height: 40px;
    text-align: center;
  }

  .collection-on{
    width: 88px;
    height: 40px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    color: #bdbdbd;
    font-size: 22px;
    border: 1px solid #bdbdbd;
    line-height: 40px;
    text-align: center;
  }

  .collection-count {
    font-size: 22px;
    color: #FFF;
    line-height: 22px;
    height: 22px;
    margin-bottom: 20px;
  }

  .introduce-container {
    height: 44px;
    position: relative;
    margin-right: 30px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .introduce-container:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 18px;

    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-right: 8px solid rgba(0, 0, 0, 0.4);
    border-bottom: 4px solid transparent;
  }

  .introduce-text {
    display: inline-block;
    color: #FFF;
    font-size: 22px;
    line-height: 44px;
    height: 44px;
    width: auto;
    padding-left: 30px;
    padding-right: 30px;

    background-color: rgba(0, 0, 0, 0.4);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .contact-container {
    padding-right: 60px;
    padding-left: 30px;
    height: 88px;
    background-color: #fff;

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

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .address-container {
    flex: 1;

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

  .address-icon {
    width: 24px;
    height: 32px;
  }

  .address-text {
    flex: 1;
    font-size: 26px;
    color: #333;
    height: 88px;
    line-height: 88px;
    margin-left: 20px;
    margin-right: 60px;
  }

  .mobile-container {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .mobile-icon {
    width: 65px;
    height: 36px;
    background-position: right center;
    border-left: 1px solid #E2E2E2;
  }

  .activity-title-container {
    margin-top: 20px;
    height: 90px;
    padding-left: 30px;
    background-color: #fff;
    border-bottom: 1px solid #E2E2E2;
  }

  .activity-title {
    font-size: 32px;
    color: #333;
    height: 90px;
    line-height: 90px;
  }

  .activity-total-container {
    height: 88px;
    border-bottom: 1px solid #E2E2E2;
    background-color: #fff;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: centerend;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .activity-total {
    width: 260px;
    height: 50px;
    border: 1px solid #E2E2E2;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    color: #999;
    font-size: 26px;
    text-align: center;
    line-height: 50px;
  }

  .occupy {
    width: 750px;
    height: 91px;
    margin-top: 20px;
    background-color: #fff;
  }

  .nav-container {
    width: 750px;
    height: 90px;
    background-color: #fff;
    border-bottom: 1px solid #E2E2E2;

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

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .nav-btn {
    flex: 1;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .nav-text {
    width: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 32px;
    color: #333;
  }

  .active {
    color: #ffbc01;
    border-bottom: 4px solid #ffbc01;
  }

  .abstract-container {
    padding: 30px;
    background-color: #fff;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .abstract{
    height: 480px;
    overflow: hidden;
  }

  .lookMore {
    margin-top: 30px;

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
  }

  .lookMore-text {
    color: #999;
    font-size: 24px;
    height: 26px;
    line-height: 26px;
  }

  .lookMore-icon {
    margin-left: 20px;
    width: 26px;
    height: 26px;
    background-position: center;
  }

  .teacher-title-container {
    margin-top: 20px;
    padding-left: 30px;
    background-color: #fff;
    height: 90px;
    border-bottom: 1px solid #E2E2E2;
  }

  .teacher-title {
    font-size: 32px;
    color: #333;
    height: 90px;
    line-height: 90px;
  }

  .no-article-container {
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
    min-height: 1000px;
  }

  .noArticleList {
    width: 400px;
    height: 400px;
    background-position: center;
  }

  .noArticleTxt {
    color: #a5a5a5;
  }

</style>
<script>
  import activityList from '../home/activity-list.vue';
  import commentCount from '../comment/commentCount.vue';

  const stream = weex.requireModule('stream');
  export default {
    data() {
      return {
        id: "",
        navType: 0,
        organizationInfo: {},
        collectionText: ["收藏", "已收藏"],
        UA: "",
        hasMoreFlag: 0, //是否需要显示更多
      };
    },

    components: {
      activityList,
      commentCount,
    },

    methods: {
      /*收藏*/
      changeCollection(type) {
        if (!__userToken) {
          this.$router.push({
            name: "bindMobile",
            query: {
              redirect: {
                name: "organizationInfo",
                params: {
                  id: this.id,
                },
              },
            },
          });
        } else {
          if (this.organizationInfo.isCollection === "1") {
            this.$set(this.organizationInfo, "isCollection", "0");
            this.organizationInfo.collectionNumber--;
          } else {
            this.$set(this.organizationInfo, "isCollection", "1");
            this.organizationInfo.collectionNumber++;
          }

          stream.fetch({
            method: 'POST',
            type: 'json',
            url: `${__APIDIR}appapi/toCollection`,
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "token": __userToken,
            },
            body: `{"collectionType":"3", "commentModelId": ${this.id}, "operationStatus": "${this.organizationInfo.isCollection}"}`,
          });
        }
      },

      getLogoUrl(url) {
        return `background-image: url('${Vue.filter("defaultHead")(url)}')`;
      },

      openMap() {
        if (this.UA === "KM_WX_accounts") {
          wx.openLocation({
            latitude: this.organizationInfo.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: this.organizationInfo.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: this.organizationInfo.address, // 位置名
            address: '', // 地址详情说明
            scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
          });
        }
      },

      lookMoreMes() {
        this.hasMoreFlag = 2;
      },

      goPage({name, params = {}, query = {}} = {}) {
        this.$router.push({
          name,
          params,
          query,
        });
      },

      changeNavType(type) {
        this.navType = type;
      },

      getOrganizationInfo() {
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/getBusinessById/?id=${this.id}`,
          headers: {
            "token": __userToken,
          },
        }, res => {
          if (res.data.code === "1") {
            this.organizationInfo = res.data.result;
          }
        });
      },

      fixedFunc() {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const ele = this.$refs.navContainer.$el;
        const top = this.$refs.occupy.$el.offsetTop;

        if (scrollTop >= top && !ele.style.position) {
          ele.style.position = "fixed";
          ele.style.left = 0;
          ele.style.top = 0;
        } else if (scrollTop < top && ele.style.position === 'fixed') {
          ele.style.position = "";
          ele.style.left = "";
          ele.style.top = "";
        }
      },

      checkUA() {
        let ua = window.navigator.userAgent;

        if (ua.indexOf("__kemiBear_iOS") !== -1 || ua.indexOf("__kemiBear_Android") !== -1) {
          this.UA = "KM_APP";
        } else if (ua.toLowerCase().match(/MicroMessenger/i) && ua.toLowerCase().match(/MicroMessenger/i).toString() === 'micromessenger' && (__userToken || __weiSurfaceId)) {
          this.UA = "KM_WX_accounts";
        } else {
          this.UA = "other";
        }
      },
    },

    created() {
      this.id = this.$route.params.id;
      this.checkUA();
      this.getOrganizationInfo();
    },

    mounted() {
      window.addEventListener("scroll", this.fixedFunc);
    },

    updated() {
      if (this.hasMoreFlag === 0) {
        let ele = this.$refs.abstract.$el;
        let height = ele.offsetHeight;

        if (height > 480) {
          this.hasMoreFlag = 1;
        }
      }
    },

    beforeDestroy() {
      window.removeEventListener("scroll", this.fixedFunc);
    },

  };
</script>