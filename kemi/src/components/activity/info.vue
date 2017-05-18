<template>
  <scroller class="wrapper">
    <div class="image-wrapper">
      <div v-if="activityInfo.activityImages">
        <Slider :slider-list="activityInfo.activityImages" height="430"></Slider>
        <div class="right-bottom-box">
          <text class="people-number">{{activityInfo.partNumber}}人报名</text>
        </div>
      </div>
    </div>
    <div class="info-main-wrapper">
      <div class="info-main-content">
        <div class="info-main-top">
          <div class="info-title">
            <text class="site-type-word">{{activityInfo.siteType}}</text>
            <text class="title-word" lines="2">{{activityInfo.activityName}}</text>
          </div>
          <div class="price-label-box">
            <div class="two-price-box">
              <text class="now-price-word">￥{{activityInfo.nowPrice|formatPrice}}</text>
              <text class="old-price-word">￥{{activityInfo.oldPrice|formatPrice}}</text>
            </div>
          </div>
        </div>
        <text class="collection-btn" :class="{collected: activityInfo.isCollection == 1}" @click="changeCollection">{{collectionMes[activityInfo.isCollection||0]}}</text>
      </div>
    </div>
    <div class="mes_container">
      <div class="mes_item">
        <text class="item_title">报名截止：</text>
        <text class="item_detail">{{activityInfo.registrationDeadline}}</text>
      </div>
      <div class="mes_item">
        <text class="item_title">活动时间：</text>
        <text class="item_detail">{{activityInfo.activityBeginTime}}</text>
      </div>
      <div class="mes_item">
        <text class="item_title">适合人群：</text>
        <text class="item_detail">{{activityInfo.suitPeople}}</text>
      </div>
      <div class="mes_item">
        <text class="item_title">地址：</text>
        <text class="item_detail address_icon item-flex" @click="openMap" lines="1"><text  lines="1" class="item">{{activityInfo.activityArea}}</text></text>
      </div>
      <div class="mes_item">
        <text class="item_title">执行机构：</text>
        <text class="item_detail clickAble item-flex" lines="1" @click="openDetail('business', activityInfo.businessId, activityInfo.businessName)"><text  lines="1" class="item">{{activityInfo.businessName}}</text></text>
      </div>
      <div class="mes_item">
        <text class="item_title">执行教练：</text>
        <text class="item_detail clickAble" @click="openDetail('teacher', activityInfo.executiveCoachId, activityInfo.executiveCoachName)">{{activityInfo.executiveCoachName}}</text>
      </div>
      <div class="mes_item">
        <text class="item_title">联系电话：</text>
        <a :href="'tel:'+activityInfo.hotline" class="item_detail tel_icon" v-if="UA!=='KM_APP'">{{activityInfo.hotline}}</a>
        <a class="item_detail tel_icon" @click="bridgeAPP(activityInfo.hotline)" v-else>{{activityInfo.hotline}}</a>
      </div>
    </div>
    <div class="occupy" ref="occupy">
      <div class="nav_container" ref="navContainer">
        <a class="nav_item" @click="reduction(0)">
          <text class="nav_text" :class="{active:showFlag == 0}">活动详情</text>
        </a>
        <a class="nav_item" @click="reduction(1)">
          <text class="nav_text" :class="{active:showFlag == 1}">活动须知</text>
        </a>
        <a class="nav_item" @click="reduction(2)" v-if="activityInfo.isCommented == '1'">
          <text class="nav_text" :class="{active:showFlag == 2}">用户评价</text>
        </a>
      </div>
    </div>
    <div class="nav_detail_container" v-show="showFlag == 0" ref="detailContainer"
        :style="{minHeight: detailMinHeight+ 'px'}">
      <div class="flow-content-box" v-for="(item, $index) in activityInfo.activityProcesss">
        <text class="flow-title-item">{{$index+1}}.{{item.name}}</text>
        <text class="flow-content-item">{{item.describe1}}</text>
      </div>
      <div v-for="imgItem in activityInfo.activityHistoryImages">
        <image resize="contain" class="historyImage" :src="imgItem.imageList[0]|dirImage"
            :style="{width: imgItem.imageList[1]+ 'px', height: imgItem.imageList[2]+'px'}"></image>
      </div>
    </div>

    <div class="nav_detail_container html-text" :style="{minHeight: detailMinHeight+ 'px'}"
        v-html="activityInfo.seeDetails" v-show="showFlag == 1" ref="noticeContainer"></div>

    <div class="nav_detail_container comment-container" :style="{minHeight: detailMinHeight+ 'px'}"
        v-show="showFlag == 2" v-if="activityInfo.isCommented == '1'" ref="commentContainer">
      <commentCount :id="activityInfo.activityID" keyword="commentModelId"></commentCount>
    </div>
    <div class="submit-wrapper">
      <div class="box">
        <div class="price-box">
          <text class="now-price">￥{{activityInfo.nowPrice|formatPrice}}</text>
          <text class="old-price">￥{{activityInfo.oldPrice|formatPrice}}</text>
          <text class="surplus">剩余名额 {{activityInfo.surplusNumber||0}}</text>
        </div>
        <div>
          <a class="submit-btn" :class="{disabled: activityInfo.isExpire !== 'ok'}" @click="submitInfo">{{submitMes[activityInfo.isFinished||0]}}</a>
        </div>
      </div>
    </div>
  </scroller>
</template>

<style scoped>
  .wrapper {
    padding-bottom: 100px;
    background-color: #f5f5f7;
  }

  .image-wrapper {
    position: relative;
    width: 750px;
    height: 430px;
  }

  .right-bottom-box {
    position: absolute;
    right: 20px;
    bottom: 20px;
    height: 30px;
    padding: 5px;
    background: rgba(0, 0, 0, .5);
    transform: translateZ(100px);
  }

  .people-number {
    line-height: 0;
    font-size: 20px;
    color: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .info-main-wrapper {
    margin-bottom: 20px;
  }

  .info-main-content {
    padding: 40px 50px 30px 40px;
    background: #fff;
    position: relative;
  }

  .collection-btn {
    position: absolute;
    right: 30px;
    bottom: 20px;
    font-size: 22px;
    color: #ffbc01;
    line-height: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    width: 88px;
    height: 40px;
    border: 1px solid #ffbc01;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .collected{
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
  }

  .info-title {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: start;
    -moz-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .title-word {
    width: 610px;
    font-size: 40px;
    color: #333;
  }

  .price-label-box {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

  }

  .two-price-box {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;

  }

  .now-price-word {
    line-height: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-right: 12px;
    font-size: 30px;
    color: #ff4713;
  }

  .old-price-word {
    line-height: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 26px;
    color: #999;
    text-decoration: line-through;
  }

  .site-type-word {
    height: 31px;
    width: 64px;
    border-radius: 5px;
    margin-right: 12px;
    line-height: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #fff;
    font-size: 22px;
    background: #ffbc01;
    text-align: center;
  }

  .mes_container {
    background-color: #FFF;
    margin-bottom: 20px;
  }

  .mes_item {
    width: 720px;
    height: 88px;
    margin-left: 30px;
    border-bottom: 1px solid #ddd;

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
  }

  .item_title {
    font-size: 24px;
    color: #666;

    width: 120px;
    height: 88px;
    line-height: 0;
    padding-top: 44px;
    padding-bottom: 44px;
  }

  .item_detail {
    flex: 1;
    margin-left: 20px;
    font-size: 24px;
    color: #666;
    height: 88px;
    line-height: 0;
    padding-top: 44px;
    padding-bottom: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-flex{
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

  .item{
    font-size: 24px;
    color: #666;
  }

  .clickAble {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: right center;
    margin-right: 30px;
  }

  .address_icon {
    padding-right: 50px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAnCAYAAAAYRfjHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkM2NUYwRkUxOTIwMTFFN0JBMzNDMzk5MUEzQ0MxNTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkM2NUYwRkYxOTIwMTFFN0JBMzNDMzk5MUEzQ0MxNTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzY1RjBGQzE5MjAxMUU3QkEzM0MzOTkxQTNDQzE1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzY1RjBGRDE5MjAxMUU3QkEzM0MzOTkxQTNDQzE1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtbCey0AAAWESURBVHjarJd/aJVlFMff+947dTLDbGiz1AVmpal1J5WL0Mps6WaxIi0pCWqRBFIE9Uf/JQRBUe0fNyn/KYi0DIuWRk5LZTnmj7XB2qoVubbmlrUftp/39j3yeeHh7f4a9cCHe+97n+ec55znnPOcN1JTU+NlGNNEsbhZ3CaWi6vE5SLGnAlxQXSJ70SDOC1+rqqqGksnOJJB8dXiDrhGFIqkMGHjIsE8X+SxyYjoE53iG0PKz6USHkvxLF8sFveJSr73izYsaRe/iVHmTxfzxbUiLq4Xt/B9YW1t7ef6/EEb+Dub4pvE06JcXBQfiK9EsxhwLE4GXnMsvkysFOvE/eJFcYPYxRGkVBxjl8+Ke8WP4lPxGdaOpHKZLHF/npeFXbj6d1GBAXl6bv83af64e8a242XiObHBAkO8Kg4QPO6wuTNCwTUSCAyGFE3D6heIkTrxpmixuT7zithZJUp3iq9TKLWxSNwtHhWPiLt4FvaEHUm9eEX8JB4QG9F1yWILpgfFDnEl5/GGcIMhSjqtJ4iKsDjJ5npEhzhkZymlk47lFnzPi2dEr3hL7ItWVFQs1ZctYrV4X7yHoGDMFqXiKfEwaTZG2lhkX8ExWSTPEX82NTVdKCkpuRQT+pzU7/Nky52s6YgRxYvYzWHc4lpqAfeysA02clZNpsDZWAnpdw8b2ylLjziWdyLbXL3QdPpYapWoRbRiTTBM4GNYdFJUm5tIDYv0Nglv4Fk1c2yDj4tVofNupbKZrtVm8QrO6hR5GuRmlHxcT+Go5gxTpZSlzkFZmaCg2JoO/TbPTOr/JLJPEeHLfQJqHHdMOC6eR/LHcG+zl32YRV9QRq9DdtRJu050Ffmckbmi21FsObgE5RZEZ0IB56WxvIe5fShdggcCxd3omu2zu0SoDOaxMIaQYS/3McSawGtBoUk6l4sfKI2yswiTEpTIZKhK5TJiyEoiI+HEzXR0JXxuHnuwwDmPMW6hIdKjmA1kHAqmGQTPAta2O1kS5bnp6vdJixiXfYGjuIOF5va13DqRDEojzFmL8HZkBIoL0GG62nyCIUGhmBM6jwYElEN+BoPzKRAbUWg5PU4qeeRvHF1nTPsxqtcqyl4XVckWnCBAdnAhzBRHETyEpQXU7zXcRkOU3uOBUs2xzLmVKLfqd8wUnyWxrZCUiV8obx7h/zGe2Cq20WE0E7keLdEKBPdR6/eRWsGIU1LHKEZnYwRXI9aWUgTqndQyYe+Q/Js4x7jTGFhA/UWXcoBN94XOvpTS3IKu/hiJ3Ug5LCU4DuKFSSfxrRs5h9JipzCMcofb/NOydMBRGlwyJnMWOk5qzkSQn71YWUZzt4VK9avjrgHO9yiBNIvng+FGzhnzkVVMoB7W3N6gNQ2GWbOXBsB6pRszFI4Rjqg/XS+GtcuQZU3jh+jwwor/ENaKHudy34qbUo0kxzDppEt4xGmPCsmOOnT8q8tMcpYf4aJ1uNoKzKATbNmqV4RjqKQxMBfv1wa73Xl+irUncHmSFCjjtsp1TGPNBsrkXmR62RQPE0Bm+VyxHbdFcrDWZ+521pqMelk7mItij1eUWsqetT8P0dJkq9VLmRsnRXe5AZXtFcYjcL6nl5rHefWHin4qF29ibisutp4sVW+e1uIkheFLSqDdUJvJyfwU1s7kv83MtTWHpHQ0nYesr850bMO4qpBavBhP9ARtknpm28jt4iXenc1Lu0O1OmeL3WEu3k1kWp1+khf08NvlSubUsiZrm5JtjHFx7CE/yykEFwm2baSOXa97ZGlLrv1RrqMORa/xKpLg9xoKzdvM8f5vxXam34rXxRPWzaLYbqV37b90EfxfFXu8bO/nbXGu44lPpLRvKoKmqjhoDOqd+/jIVJXa+EeAAQCoddmgqeyekQAAAABJRU5ErkJggg==');
    background-position: right;
    background-repeat: no-repeat;
    margin-right: 30px;
  }

  .tel_icon {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkM2NUYwRjYxOTIwMTFFN0JBMzNDMzk5MUEzQ0MxNTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkM2NUYwRjcxOTIwMTFFN0JBMzNDMzk5MUEzQ0MxNTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQzI2MjgwOTE5MjAxMUU3QkEzM0MzOTkxQTNDQzE1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQzI2MjgwQTE5MjAxMUU3QkEzM0MzOTkxQTNDQzE1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoK3+Y4AAARZSURBVHjavJhpbExhFIZnpqWLWEpRIdZEJVoaDa1aI7HG2HeCKLXH0oj1F35YEyJCJ7aKWNK0hB9EhigtCUqpFLWF0KK2tphOteU9yXtlcs3cuVd75yRPjLv1vd93vvec71rT0tIsPiIIhIFw8B38tJgQKSkp/xwL9nFtCJgM5oKW4Ak4DLKB22JyeBMlo7MJzALV4BMYBGLBUeAAZWaKsqn+Hwq2gA3gFZgAEjhqj8EasBdEBmqkGoAlYCW4BhaA5zx3gyO2DczhaC4GX8wUZQWTwApwGaR6CFJCRmoVr50I8sEe4DJLVDewDrwDuynAW7ykYBEyDzwCF8zIKVnyG/n7BKdOK54B8ZEI5l5rM0R1B334xkdAjY77xBoOgA6gqxmiIvnwYlCp8z4RXgBagV5miCrm8g8zcF8EraKYWOtb1Bv+24W24C96gO1gKXhBu/hd36LcfPg0P1PRkC5/CgwBx1mG3psxfS7+gQa0Bm9hpUdJmWlME10GXptVZmTocyjOznxRRxuO0j2WnkOgyuzaJ+XiLEgCcV6uk2LcHmSAu2Z3CYqoHzROiWGgheo6WQxfabSWQImysGfK5hSqc0typwQkgwGBFPWRK6sZGA+ae5yTrnMHfyeb3bp4ipKEvwOugLEgWnWtkznVnzUvLBCiLJyiTPALLGcZUaIC7GR+reKIGXHycI5+M38mbfNyTPqpS2AEGKM694GNoPRS+yhMT0Sxa80CZ/iMTr5eKshut6uPSV9eSj+KY/KXepyXDvQm6CubEfAW3NcQJGa7mRVD+rdGvFcWTHBeXt7j+Pj4Gn+ilGl08eZOFFapWhSKsAWc2oecdnVI+zyTwqUxTOfzE7igRFg+hFX5E6U0c9FM7GC6vkUl7BboB2Yz8QtBucc1MWwIa5mHhXyBfHa3HVnYoyDsMoRV+xPl5s0j2L+/YQ+lzrFc0I7iYnifmHFnCukN1oOLqntl2m9T2EhZCBCWK1Np1dghK5HIjWgrbixOerlGKsAiMJ8eVsrtWjiL+EaNHXZ7rupE5l661kh5vlERGAdGg2/gAadECRc9Tqb4M1fVa77MAa3NK7btZRihV2zLpfZm6BGl7GIkUQdzexXCsvRdtWplN3SdXpfJ6fmh9WBMl1ACYU2YAg1tBszvKpjC3JgO9oOebP7U/bubrU2tgecX0c9ibAYrQAGNL4tWIc3hWtC2LmXF4XA0oW2IB2bpnT6LKn+cbIOTuDoH8HiJ0R0zpq0pPxWsBufArv8RpcRTcJ4ihpIE+leFzu9ZMsJbwUKOfioS/2ddRCnNYQ4dP5QrdDgT1sXO47OG1ciuaAZr7UoI+uDPPI3Ee4pzMrkHs9YNZK2LoE2U8/xU5qKM7EExWQj6W1/1mKfRCOFWXnJtFOuj8vHtE39H08fkq81pCKrU83mxLuHmKpUvMsdoG71YbmLZT8lHlF1SOyGoVu83z/qI3yw3TnpcCMtOI+aZT1P9I8AAgB444d5FnUoAAAAASUVORK5CYII=');
    background-position: right;
    background-repeat: no-repeat;
    margin-right: 30px;
  }

  .occupy {
    width: 750px;
    height: 91px;
    background-color: #fff;
  }

  .nav_container {
    width: 750px;
    height: 90px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .nav_item {
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

  .nav_text {
    font-size: 32px;
    text-align: center;
    height: 86px;
    line-height: 0;
    padding-top: 43px;
    padding-bottom: 43px;
    color: #333;
  }

  .flow-content-box {
    margin-top: 30px;
  }

  .flow-title-item {
    font-size: 26px;
    color: #666;
    line-height: 0;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .flow-content-item {
    font-size: 26px;
    color: #666;
    line-height: 40px;
  }

  .historyImage {
    max-width: 670px;
    margin-top: 30px;
  }

  .active {
    color: #febd01;
    border-bottom: 4px solid #febd01;
  }

  .nav_detail_container {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
    background-color: #fff;
    font-size: 26px;
    color: #666;
  }

  .comment-container {
    padding-left: 0;
    padding-right: 0;
    background-color: #f5f5f7;
  }

  .submit-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .box {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;

    width: 750px;
    height: 100px;
    border-top: 1px solid #e2e2e2;
    background: #fff;
  }

  .price-box {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    flex-direction: row;
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;

    -webkit-box-align: end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .now-price {
    margin-left: 60px;
    font-size: 40px;
    color: #ff4614;
    line-height: 0;
    padding-top: 20px;
    padding-bottom: 16px;

    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
  }

  .old-price {
    color: #999;
    font-size: 24px;
    margin-left: 10px;
    line-height: 0;
    padding-top: 12px;
    padding-bottom: 12px;
    text-decoration: line-through;
  }

  .surplus {
    margin-left: 20px;
    font-size: 24px;
    color: #999;
    line-height: 0;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .submit-btn {
    width: 262px;
    background: #ffbc01;
    color: #fff;
    text-align: center;
    line-height: 0;
    padding-top: 50px;
    padding-bottom: 50px;
    font-size: 32px;
  }

  .disabled {
    background-color: #999;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import { __KMBirdge } from '../../js/bridge';
  import Slider from '../home/slider.vue';
  import commentCount from '../comment/commentCount.vue';

  const modal = weex.requireModule('modal');
  const stream = weex.requireModule('stream');
  const dom = weex.requireModule('dom');

  module.exports = {
    data: function() {
      return {
        UA: '',
        showFlag: 2,
        detailMinHeight: 0,
        submitMes: ['立即参加', '活动结束'],
        collectionMes: ['收藏', '已收藏'],
      };
    },

    components: {
      Slider,
      commentCount,
    },

    computed: {
      ...mapGetters([
        'activityInfo',
      ]),
    },

    methods: {
      changeCollection() {
        if (this.UA === "KM_APP") {
          if (!__userToken) {
            __KMBirdge("appNeedLogin", {
              "tologin": true,
            });
            return false;
          } else {
            __KMBirdge("changeCollection", {
              "isCollect": this.activityInfo.isCollection === "0" ? "1" : "0",
            });
          }
        } else {
          if (!__userToken) {
            this.$router.push({
              name: "bindMobile",
              query: {
                redirect: {
                  name: "activityInfo",
                  params: {
                    activityID: this.activityInfo.activityID,
                  },
                },
              },
            });

            return false;
          }
        }/* else {
         return false;
         }*/

        if (this.activityInfo.isCollection === "1") {
          this.$set(this.activityInfo, "isCollection", "0");
        } else {
          this.$set(this.activityInfo, "isCollection", "1");
        }

        stream.fetch({
          method: 'POST',
          type: 'json',
          url: `${__APIDIR}appapi/toCollection`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": __userToken,
          },
          body: `{"collectionType": "1-1", "commentModelId": ${this.activityInfo.activityID}, "operationStatus": "${this.activityInfo.isCollection}"}`,
        });
      },

      reduction(flag) {
        this.showFlag = flag;
      },

      openMap() {
        if (this.UA === "KM_APP") {
          __KMBirdge("openLocation", {
            "latitude": `${this.activityInfo.latitude}`,
            "longitude": `${this.activityInfo.longitude}`,
            "address": `${this.activityInfo.activityArea}`,
          });
        } else if (this.UA === "KM_WX_accounts") {
          wx.openLocation({
            latitude: this.activityInfo.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: this.activityInfo.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: this.activityInfo.activityArea, // 位置名
            address: '', // 地址详情说明
            scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
          });
        }
      },

      openDetail(type, id, name) {
        if (this.UA === "KM_APP") {
          __KMBirdge("openDetail", {
            type,
            name,
            "id": `${id}`,
          });
        } else {
          this.$router.push({
            name: type === "business" ? "organizationInfo" : "teacherDetails",
            params: {
              id,
            },
          });
        }
      },

      bridgeAPP(hotline) {
        __KMBirdge("giveCall", {
          "hotline": `${hotline}`,
        });
      },

      submitInfo() {
        if (this.UA === "other") {
          let ua = window.navigator.userAgent;

          if (ua.match(/(iPhone|iPod|iPad);?/i)) {
            window.location.href = "http://itunes.apple.com/app/id1217313559";
          } else {
            window.location.href = "kmbear://activity/openwith";

            setTimeout(function() {
              if (ua.match(/android/i) && ua.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.kemi.kemiBear";
              } else {
                window.location.href = "http://www.kmbear.com/publicity.html";
              }
            }, 1000);
          }
        } else if (this.UA === "KM_APP") {
          __KMBirdge("getActivityDetails", {
            "activityID": `${this.activityInfo.activityID}`,
            "activtyName": `${this.activityInfo.activityName}`,
            "activityImageUrl": `${this.activityInfo.activityImages[0].activityBigImageUrl}`,
            "activityStartTime": `${this.activityInfo.activityBeginTime}`,
            "nowPrice": `${this.activityInfo.nowPrice}`,
            "isContainTask": `${this.activityInfo.isContainTask || 0}`,
            "isExpire": `${this.activityInfo.isExpire}`,
          });
        } else {
          if (this.activityInfo.isExpire === "ok") {
            if (__userToken) {
              this.$router.push({
                name: "confirmOrder",
                query: {
                  activityID: this.activityInfo.activityID,
                },
              });
            } else if (__weiSurfaceId) {
              this.$router.push({
                name: 'bindMobile',
                query: {
                  redirect: {
                    name: "activityInfo",
                    params: {
                      activityID: this.activityInfo.activityID,
                    },
                  },
                },
              });
            }
          } else {
            modal.toast({
              message: this.activityInfo.isExpire,
              duration: 1,
            });
          }
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

      setDetailMinHeight() {
        let detailEle = this.$refs.detailContainer;
        let noticeEle = this.$refs.noticeContainer;
        let commentEle = this.$refs.commentContainer;
        let wHeight = document.body.clientHeight || document.documentElement.clientHeight;
        if (commentEle) {
          this.detailMinHeight = Math.min(wHeight - 180, Math.max(noticeEle.$el.offsetHeight, detailEle.$el.offsetHeight, commentEle.$el.offsetHeight));
        } else {
          this.detailMinHeight = Math.min(wHeight - 180, Math.max(noticeEle.$el.offsetHeight, detailEle.$el.offsetHeight));
        }
      },
    },

    created() {
      __userToken = this.$route.query.token || __userToken;
    },

    mounted() {
      this.checkUA();
      this.$store.dispatch('getActivityInfo', this.$route.params.activityID);

      /*清空之前已选择的联系人*/
      this.$store.dispatch('changeSelectedList');

      window.addEventListener("scroll", this.fixedFunc);
      this.setDetailMinHeight();
      this.showFlag = this.$route.query.showFlag || 0;
      if (this.showFlag === 2) {
        let ele = this.$refs.occupy;
        dom.scrollToElement(ele, {animated: false});
      }
    },

    updated() {
      if (this.activityInfo.activityID === this.$route.params.activityID) {
        let detail = `活动场地: ${this.activityInfo.activityArea};执行机构: ${this.activityInfo.businessName};执行教练: ${this.activityInfo.executiveCoachName};活动专员: ${this.activityInfo.eventExecutiveName}`;

        if (this.UA === "KM_APP") {
          __KMBirdge("getShareInfo", {
            "id": `${this.activityInfo.activityID}`,
            "title": this.activityInfo.activityName,
            "icon": this.activityInfo.activityImages[0].activityBigImageUrl,
            "detail": detail.trim().slice(0, 50),
            "url": window.location.href,
          });
        } else if (this.UA === "KM_WX_accounts") {
          setShare({
            "title": this.activityInfo.activityName,
            "imgUrl": `${__IMGURL}${this.activityInfo.activityImages[0].activityBigImageUrl}`,
            "desc": detail.trim().slice(0, 50),
            "link": `${__DIRPATH}activityInfo/${this.activityInfo.activityID}`,
          });
        }
      }
    },

    beforeDestroy() {
      window.removeEventListener("scroll", this.fixedFunc);
    },
  };
</script>