<template>
  <div class="user-list-container">
    <div class="item-container">
      <div class="my-activity">
        <text class="my-activity-text">我的订单</text>
      </div>
      <div class="my-activity-nav">
        <div class="nav-item" v-for="item in orderNavList" :key="item.name"
             @click="goPage({'name':'myActivityList', 'params':{'status':item.status}})">
          <image class="nav-iocn" :src="item.icon" resize="contain"></image>
          <text class="nav-text">{{item.name}}</text>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="user-list-item" v-for="item in topNavList" :key="item.name" @click="goPage({'name':item.url})">
        <image class="item-icon" resize="contain" :src="item.icon"></image>
        <text class="item-text">{{item.name}}</text>
      </div>
    </div>
    <div class="item-container">
      <div class="user-list-item" @click="goPage({'name':'content', params:{type: 1}})">
        <image class="item-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTNEOEZDRTIyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTNEOEZDRTMyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBM0Q4RkNFMDI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBM0Q4RkNFMTI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmTr9NwAAATHSURBVHjazJgLTJNXFMf/X1ulvDIoheEcUFjmA6cOxqYTM18g4sRtKjMscYDLJuAEQgANrDLGQMDETPZgw0dm4jYeIlGzkM3hsocJJiybzhqdjIdBWkBlQHmW0p1bC1EofQGlJzn57ne/036/nnPPueeW8/V5HmYIT6fDoxMNTX9iJoVnji2Jmi/gq2i8HlYSzgwPLnl2wTPXk5PjkJh4AOph9QaauzRVAGMRMMeDKwMCliJ8cwiKivJBnqyxhifNAQwOCnrobWtCCsywXRX4wvKxGy0k8lm4ayjc4TTlQfok6TzdmF1vkxaTXtV9zIn0Hd3c0HQCilxcnljo6+vz2OQoZHlZVbWbWASx2A0eHmK4uYm018amO+s/yMhlpnGkmxzsNNXbVvfjdI2DM91/PJ2ALwcELgPHcRMeMEim+uTTomPsUkq6lMdDdcG73Vjio8K3lxxyRjTIo/mRqQKyNbqP1tonGzeuM+mX1Nc3YqB/ANf+lqG2tq6OplpIUzKjerBu+aDW5jmJCtca57xIwyuWAjJXJVDd+2xLRBgSk96Dn5/EJLi4XVshnPvw3t8HQcp+7vbmlwawc23/mN0ry4YY4KuWAu6hUH7JwpaUtAdU+0zOIrlcAU/RCEqS/zNotyFgEF9ccJSOjGDATxJwjGphh6mFOiR49YqLGZkpWLx4gUVlISE+FWGSswgNHDRop3jAR9kvQpz5zR6dPbxTLLMJ9IqxOnj9n1v1kMluQqPRWAQYHh6CwjIn9A1yBu08RWokvdGLmsL7yI3tjn7KTV1L3vQxBqjo6Li/Ij016+vI7TFaUHMlYusmcML5KPne0bSdgtOgqY0PRScfuoR6TPiuLp7j5+6SnpPL21rLSqsiCBiBVGKEQqHpa7G1DS0NfyEsyHCY/20VIKHIBT/UCYsoYOEU4r4Ja5CFklwrpXG8rvrbgsh1azIHlCTS2Oi9mra2Do2tCGNhTIyNAbbaEtyjkIyNBxsV3bbKMcDiA/uzwZLBVkShaMf+9A/ZsHg0SQ7qksTTRhjv6pIkd7KWXzPTh6HxQk5i7T83lY56VsTmAQWWflClUuHE8dM4W3kBzc0tkPh6Iz4+FmpqUUq+OoXGhmZIJF6IfPN1xO5+CwKBwLqALPMduypw5O0BeLmrIWtuR2mZDHyKSfaOfvh7q3CnvZ06lhvIpD6xoDBrWs/FRpPEf9FKXD7SArs5hrueQRWH4JSnceNmrUVJItAHwoyNibu7GPe6WjFfrDZod6+Lp7W1epLsiHwNFb/aG7Wr/F2Ibdu3WB8wJjYK5//wxs9X7Sa1uSybi8paL0THRFkf0NnZCQWHs5H4uQvkD/gTnvf0cYg76oq8fCnoTD07dXDNmlVIS9+H49UOGB63FI9WOSGOyk5o6NrZLdQMwt53N/JLnccg875zhtojCqlp789eoX5UpAfTkPMRCPIkePSTh0Q7ceiQVO8/EbOy1TEQBunqvxfcvF04VJAFPn96dtFp8eAoJFuP1moWupXKXqs1BH292sOc0hzAn85UnLcaYHn5OXb5Ue9D1lGPV9qfF5F2njzxjUapVM7YwYh9N3sHexd7pz4WbrK/OGg/XsgqBmkoq8sz5Lwe0oukGdQT3NJn8L8AAwCw9EMHSS84nQAAAABJRU5ErkJggg=="></image>
        <text class="item-text">收藏</text>
      </div>
      <div class="user-list-item" @click="goPage({'name':'commentList'})">
        <image class="item-icon" resize="contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI3QUM3NTkyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI3QUM3NUEyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBM0Q4RkNFODI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMjdBQzc1ODI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsobLVIAAANYSURBVHja7JhdSJNRGMf/W2lpTlehIo2IRWEQqHMmSNCFu0j8AGEaDtKcdiOOMsxIEpQ2Ai/WhVaQHxdh0y5zeaFoN4KY84MWZZi7qJGYboq2zczl23OGLjUXGrp3gn94OB97z8vvnPPuec5zBBzHgUmhUGRSUUaWRBYGfuUgM5Hpu7u7X3l6GGhqaqo2Pz+f6+3t5ZxOJ8e3GANjYUyMjTEKqJIhkUiM9fX1CAvjeyE3LKvDAY1GA6vVmiWk9q3i4uKAg2RiTEVFRaxaxkDlMpkMgaoVNjkDFYWGhgYs6Aqb6KCvB1QqFaampvwKFRUVBYPBsOlvPkF9DeBLQuwR7YPug+6D7pD2/eie3Hq32w29Xo+M9HSoCwsxODjo6TebzSgtLYVSqQQ7vbHneAVlu2Mfe4bWki5oLrbjgfYuTCYT7ldXQHX+BR6pOmB924yWlhZ+QTs7O1F0yQLRYTcSTs0gN+kTqqqqoEz8iJQzNkRH/ECJYgx0mucX1G634+Rxl7d9OW4CIUELSKNyVZJjLthsNn5BY2Ji8GEi3NuOCFlCZdZ7hFO5qndWMSjT8J972szFqNVq6PQWVGebce7EnKcvSWr3/j7y+Sh0L+Nwu/K67xdTzuSXhK2/v5/LUWZzDfdOc0tdAo7rBrfUKeTq75zlruTmciMjIz7HMka29d9dLteub39ycjKeNjTji0CFCoMMM45DqGhNwGRQLhoaGxEfH7/puIWFBU+ex0AHh4eH/eK0xWIxampqIE28hqtPUhAdm+Npi0Qin2OGhoZYYToglUpnLBZLnkKhQHBw8K7DCgQCyOVyOF2LnlRYKBT+M13W6XSYn5+/EdAXEAUFBX8uINZc6WRRcZPsAtkRX7NkoS42Nvav/sXFRZSXl2N0dHQnFt5JNkD2kIKA0Xuls1Wj2XWwf+9GUYzmKNKw2T/ezvu2Y9t1+FOzs7PrOthLamtr0dfX105NTaCcnmz0Ya/raGpqQk9Pzxuq5tE2/QoU0Mm1K2o0GtHW1jZO1UyC3FVnvF1Q++qK0lajrq7uK1XTCHI60A7Onm+Uwh20Wu3c8vIygxz3R7DwuqetiFxYUmRk5ACF3J/k6xjka96TOx+aJrGZqf0J+T9b/42skiCf+zu5+y3AAFZZcCXilZwXAAAAAElFTkSuQmCC"></image>
        <text class="item-text">评价</text>
      </div>
      <div class="user-list-item" @click="goPage({'name':'newsList'})">
        <image class="item-icon" resize="contain"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI3QUM3NjEyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI3QUM3NjIyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMjdBQzc1RjI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMjdBQzc2MDI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poz5KgwAAAJVSURBVHja7JhBaxpBFMefQSpYcyl48wOYHiXJF1APsY33XrREwZPQFHMpePNkSXpQAkoFLwXP3Wwuai6C2KQqPe0lh4AtpLWt1LiKxTp5b9E0aVhwi3EnsH947MzssPzmzex7M2NijAHJ4/Fs4mMbbQ3NBvqqh3aCtlcqlQ6UFgJ1u92JQCDAKpUKk2WZ6S1iIBZiIjZiNGHhqcPhENLpNNhsejvyH7f2ehCNRqHVavmXsP4yHA5zB0kiplAoRMVtAl11uVzAqyZsqwS6bLVauQWdsC0vwT2RAWqAGqBzklntxWg0gkwmA5hrp3sBiEQiYDabdemvCprNZuHzp7eQey4p9dfiGeTzFqAspkd/1akvFouw80SCR7ahYlQWRRH06j/7GjUxbYtqzv1VQb1eL+wersBP+QG0LyywKz4Gn88HevWnbR6bLmhefyZ6pwrKkwjUCPgG6H0Avej3+9wCDgYD5ZxHoB8bjQa3oPV6nR4nBPoml8spR1PeREzERoxcX0AEg8G/FxDXrnT8+HiBto72UG2UdFHhdDpvtQ+HQ4jFYiBJ0jycKaMdkycxGQlXVzqzGo5OrNVqtzyA6ZDF43Ea/b6W72kxreHpW6fTudFAH0kmk1CtVt9jNcpLHP3e7XZvNNBiL5fLH7D4DKfpDy+g59c9KggCFAqFUyxuImT/rgO+Fv2YehSnGlKp1BcsbiBkm7cUqqzRZrMJiUTi13g8JsjTRcTUq/A0475wzW63H2PK/Y2xjiCPdD8uq6iNopFtLRLyf6b+K9orhHy36HR6KcAAs8XtLSZfMmcAAAAASUVORK5CYII="></image>
        <a class="message-text-container">
          <text class="message-text">消息</text>
          <text class="have-message" v-if="contentCount"></text>
        </a>
      </div>
    </div>
    <div class="item-container">
      <div class="user-list-item" v-for="item in botNavList" :key="item.name" @click="goPage({'name':item.url})">
        <image class="item-icon" resize="contain" :src="item.icon"></image>
        <text class="item-text">{{item.name}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .user-list-container {
    margin-bottom: 112px;
  }

  .item-container {
    margin-bottom: 30px;
    background-color: #fff;
    width: 750px;
  }

  .my-activity {
    border-bottom: 2px solid #f5f5f8;
    height: 90px;
    padding-left: 35px;

    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: start;
    -moz-align-items: flex-start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .my-activity-text {
    color: #333;
    font-size: 30px;
  }

  .my-activity-nav {
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

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;

    padding-left: 35px;
    padding-right: 35px;
    height: 180px;
  }

  .nav-item {
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

    -webkit-box-pack: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    justify-content: center;

    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .nav-iocn {
    width: 80px;
    height: 80px;
    background-position: center;
  }

  .nav-text {
    color: #666;
    font-size: 24px;
  }

  .user-list-item {
    height: 88px;
    margin-left: 30px;

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

    border-bottom: 2px solid #f5f5f8;
    padding-right: 30px;
  }

  .item-icon {
    width: 70px;
    height: 50px;
  }

  .item-text {
    color: #333;
    font-size: 28px;
    line-height: 28px;
    height: 28px;
    flex: 1;

    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: right center;
  }

  .message-text-container {
    flex: 1;

    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAMAAACUTyX1AAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMw63dP0AAAAH3RSTlMAE9UZ0djMFw/cNPLGwp2DdWthIAf46eO0qI+BUEQojQ2LeQAAAHNJREFUGNOFzkkSgzAMRFFbHrAZAoHMAfr+t2SJWhu0e79UJbl2LE7PDb3XXiok6BAEddHBZ7x3HcqAV6vD44OOwxfdZs4+Vwo/YKbwB+4UJmCiMJuNkjBqZgi/XQMxacYLSnOyEcto6E+GZJkVXWS6oScedegGziDaqFUAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: right center;

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
  }

  .have-message {
    width: 14px;
    height: 14px;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    border-radius: 7px;
    background-color: #FF0000;
    margin-left: 10px;
  }

  .message-text {
    color: #333;
    font-size: 28px;
    line-height: 28px;
    height: 28px;
  }
</style>

<script>
  const stream = weex.requireModule('stream');
  module.exports = {
    data() {
      return {
        orderNavList: [
          {
            name: '待支付',
            status: "to_pay",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTUxQkI4QUUyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUQxRDlDQjYyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNTFCQjhBQzI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTFCQjhBRDI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnTI2tAAAAmRSURBVHja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",
          },
          {
            name: '待签到',
            status: "not_sign",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTUxQkI4QTYyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTUxQkI4QTcyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNTFCQjhBNDI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTFCQjhBNTI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnxDKy8AAAYMSURBVHja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",
          },
          {
            name: '待评价',
            status: "assess",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENBQzI4MjEyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENBQzI4MjIyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0FDMjgxRjI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0FDMjgyMDI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PscavOMAAAOFSURBVHja7J1NSBRhGMf/u+tXlolWkGYZVtcuBX0cOgUJXQwyukYdOhSlUNYh+jhIJUEXoVPdtdIg6BgVQZHRB0SHTEw0i0grW9sP17fnYWZx1dV2x9lp3f3/4c8OL+/MO/Obd+aZZ2b2HZ8xBklUJG6wvUNcbZflk36LB8WvxF3ie+LIzEq+JAD3ia+KN4JKVK+4RXw3sdCfMB0QX7ErEN5sKZM7NqNAvLAgoUKr+DQ5/VNxRi2Jh/B+cSfZpKVG8W0FqMHho7iGTNLSkLjOb5MkvPS1RnzAb1+qUM7UoIdwv0zUkoUjfVKAIZkoJgtHiihAQw7O5ScCAiRAAsxjFbi6tPBz4PspYKIvi7e4DljRJtcd21xZnLtReGgrEPuS/d0msFryiJ4sPIQXAzyX15PnQAIkQAIkQIoACZCZSAqquACUHfGmrWCHZEXNOQYw/Fr6fIdHbb3wpBl3U7mBRfRsat0gz4EMIgwiaWpJPVCy3bvz7Xh3jgFUeF5FYQ1WHgD0Noj4isUevWZoouJQxoOItz3QhC0ziFD/pwf6y8Vl3rQ1GRSP5hjA8iamcgvSn4fSK35501bkHVM5pnJM5ajsOgcuOyjp3G5v2go9BcZu5RjAgvVA8U5v2op9ZRBhEGEQobLsHFgLBKqczx9+lucAyw4tLJXLwnOstwCDXZ6lWLkJMPLGMoMIRYAESIAESBEgARIgARIgRYB5AdC3SObLNoBFm4GqR0DNe+t2VsprVgasbAfW9lm/6bwSou1oe9WPrfYz2S0y9kzEtxQobwaWH8a0mz76n+KRM0D0w9zLKW0AKs4DgVVTZbFvwOjF+d/5K9wEVF6e8V/gCWDsJvDjGmCCU8UuPRPJDMDSegFwSQBUJ69ndKNuAD+vT3+HT5/aVbYCJbvmbiP0RHbAWeHSn7AVJbKzTkrPOyrTc9yhi32WHSA7ZfyBqwBh3NTwHmOC91OvH+2XefYaM1BnzMg5YyZDqc2n9bS+zqfz63JSla6frqdL4rgxvIwhQALMd4BjxOBYEQU4TA6ONawA35KDY/UowG5ycKxuDkLrXDoI7QbtgTq8eTN5pK0mzezjlzE6hnQbmaSsNpvZtLH0dXhzye5xjHzmVbv4hN6emHkhrQXHYY1q3ktOs6RMGu0OFosX+ub5HIZW1i87bIE16HRhngGL2oHiJazPYXQiyecw/gowABWhKA6yJSE8AAAAAElFTkSuQmCC",
          },
          {
            name: '已取消',
            status: "canceled",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Y5NjI0RkEyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Y5NjI0RkIyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3Rjk2MjRGODI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3Rjk2MjRGOTI3MTgxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrWtCHsAAAiOSURBVHja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",
          },
          {
            name: '已退款',
            status: "refunded",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Y5NjI0RjIyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Y5NjI0RjMyNzE4MTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTc4MzVBRjI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTc4MzVCMDI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiMoOcgAAAlKSURBVHja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",
          },
        ],
        topNavList: [
          {
            name: "我的任务",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAmCAYAAABH/4KQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODFGQjA0NUUyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTY0MjM5NTAyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MUZCMDQ1QzI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MUZCMDQ1RDI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjW0drQAAAQiSURBVHja7JhLSFtpFMdPMjEqBkosoguJjgQLqRZaFR2fC0VwUeoDEaFZCI4NihSR8bFqZwRRR8SFsxifixFFES3Fx8pFRZuNpWA6qYqKERRFmlRSH4mP03MuKDN9yL03CWZg/vDB5eZ7/HK+75zvnKtARLhOiYmJl49qar9Te0wtFKTLQe0var9Qc/OLxcXFaweoJEzeFvADmv74edV8P/rTPYUCtGIH0v//+HZTs1TVE2s6PVcc06sGMeMUCQkJYtf48OeTVUtCjDMLZGph+darpwP6eHq8Laa/FMuFPvjReQ88UOqdAx4v2uJKKZNL2UpvjP8Kzmg0PszMzHwTGRnpUqvV7C2XzZsS5uT5aZ0TXo/X/e62VlRUaKxW6+upqan40tJSqKysBJ1OBzTBl17rsS691O12w+bmZuDc3NyD0dHRl6mpqda4uLiM7u5u+5XlGGxhYcFGIPHj4+NQVlYGer3+CsxX4vljY2OhvLwcJiYmICgoyDA/P7/GPFdwZDFzeHh4aGtrK2g0GrgJhYSEAK8fERGh5R0UzmhnZ+ej6enpF2wx7vCdAOwzfRmIDw8PoaioCPLy8vJVNpvtWXFx8VdgYiK4ryxYUlICFovlmXJjY+MueQv4kzIyMoC5lHt7e+ro6Gi/gouKigLmUp6envrcK6UqICAAmEsJfqz/4f5TcGNjY0BXlP/Bmc1maGtrg/39ff+CW1tbg8bGRuAEt66uzn/gHA4H1NbWglarhebmZiFceDMTli1OjWpqauDg4AD6+/sFQG+n6fKySqpumpqaOPMBSjIgJibG+97a09MDHR0dcHFxIQmut7cXZmZmBMtRMumbUKJSqWB4eBgaGhrA5XKJGsNQHDIKCwuBs2vJIs9BsZqcnMTk5GSkTBnpgF/bl1IeJEuhyWRCOnMoVcwlCY5FcQoppcGCggLc2tr6Zp+dnR3MycnB/Px8tNvtKEey4FjLy8uYm5uL2dnZuLS09K/fnE4nUrKIWVlZuL6+jnIlG461vb2NdJaErZudnRXenZ+fY3V1NSYlJSEVTOiJPIJjUdwSzh/DDA0NYUtLizApP3sqAS4lJQXJ+2RPcnJyghT5hcm4dXV1eQxGRQ6mp6dfqKgkdFNhq+b6UY4CAwOFi7y9vV0oTqqqqjwO3HRkICwszK2iiP03Vdz35cIJwVKpFHWRixUV1kB1zXulTqf7jfMrrhf9QcwxMjLCn0J+Fb7P0f5aqMiJ44pboVDcGBjfw/X19ZwovCPrxQvXl8Fg+IlKMTtfTUdHRzcCxusy2O7uroN5ru5Wuv8+paWlRZHXWiiqw8DAAFAAhbOzM58CHR8fw8rKCvT19QGvS55vpV3UM883P7sajcZHNpvtOcEZuLD1JWBwcDB7pYsPP5+xwcHBF//8/bMAAwD8NZ40NiHbDgAAAABJRU5ErkJggg==",
            url: "taskCenter",
          },
          {
            name: "常用联系人",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAmCAYAAABdw2IeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTY0MjM5NTcyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTY0MjM5NTgyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NjQyMzk1NTI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NjQyMzk1NjI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrzyKu4AAANvSURBVHja7JhrSJNRGMf/7zZ1TkvxtjQ1L2gWpJaWlSLRBEW8gKR2N9OwBUH30tI0l1EIgkRKEUIXocwoQoug+lAqhqLghyxymHfTqfOym5vrbFRQbNPVruADh3PgnPd9f/zf53nOcw6lVCqhySKjolWd5knjGtXW2qRxgrHYg7Ago8GKjBHgt1HjhAubZTY30AprTW6gE3ZiVORNuhAT8gyQP9qtFZZ/t1PjREBOuPcqT3Z/YKCfyUhHhkfR09MbSoZdmn02J1zbs8kcTixKeQUmg334oA6Fl8q4ZHjM6rOBdaUuHT5rVcoyrQk20UxMQXrBEhdIdXGUx5mDlOxCcWRXtdVHWW7SlkmzyLrWW6zqeEuCJaoWp0RNxgd5Sc0CGxYggo+b7CxRN00nLAGNdHZQXC7cPWi+9ERXoiyrHxSFegJM6VKWm58xCNeVcrNGffT6GaTHCFTDqxphiaontoXMHt4VPWERaaogYwhs5/l8om7CH7AE1MvOZqGCd1Atv0XYSpYCpQcG1H/7b2Uv5sSPwWWFHEIRXd3EMhpkMhmEwmnMzs4ZDUohV6i/oWpisQQyOfWbYXPwLBI2TaUQddXuQPmvCd/Pslu4b0PXfihQkKlT5/JxKHuPwUFDgiPgyFzQuU4yT0E6TwtUFd8Zqugj6Urr4p5hJo7WPDY47IemVsSQYKo5yde57ka9J6ob2UdUbjCz2Ev92FIMD/AhmhMZFLb70xeE+EiWuly4pBKRTlOCEyZEQ8Nrg8K+evkGCRFThq9nc0kAXjhfAm2XIvpabe0T2IhaEeYvMjzsBj8R9u4YB6+0/L9B29s6caWIh5J9A8Y7KRSRbbi75TaulVX8M2hz00dkpmfjenYf1vmIjQdrw1DiznE+hjsrceZ0ITo6uvT6WHVVDbi5ubjJ7UXqVv2rOoa+D5CcjMq8XjxtvoW8rGfgJKYjKSkeEZHhYDLtNB6v3757j7pHz+GkaEFjST9Wu8oMf8mhy9K2T6gj+UVrJarL7qH9qwM8PH3h5uoCe5Y9JBIp+r71gy4fwc7QaRQnC/QKJoPC/lI5M1agbnIFhSHBZ4zPMCCW0sC0XYCvuwzuTvOmuT7Stw719ZCq2/K9wTKsMY88pH0fn2agb8zWYiFnSG1LbEpVzwb/rMZTLFjUKn5vR/kPAQYAGr8oAAPzv84AAAAASUVORK5CYII=",
            url: "contactsList",
          },
        ],
        botNavList: [
          {
            name: "意见反馈",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0IzM0QyNzgyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0IzM0QyNzkyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjMzRDI3NjI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjMzRDI3NzI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoJbPAEAAAdxSURBVHja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",
            url: "feedback",
          },
          {
            name: "关于我们",
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAmCAYAAAC/H3lnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTU3ODM1QTkyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTU3ODM1QUEyNzBCMTFFNzlCMENBMTNFMDI0QURGODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTc4MzVBNzI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTc4MzVBODI3MEIxMUU3OUIwQ0ExM0UwMjRBREY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqXOCAAAAdiSURBVHja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",
            url: "aboutUs",
          },
        ],
        contentCount: 0,
      };
    },

    methods: {
      goPage({name = "", params = {}, query = {}} = {}) {
        this.$router.push({
          name,
          params,
          query,
        });
      },

      getContentCount() {
        if (__userToken) {
          stream.fetch({
            method: 'GET',
            type: 'json',
            url: `${__APIDIR}appapi/newNotiCount`,
            headers: {
              "token": __userToken,
            },
          }, res => {
            if (res.data.code === "1") {
              this.contentCount = res.data.result.contentCount;
            }
          });
        }
      },
    },

    mounted() {
      this.getContentCount();
    },
  };
</script>