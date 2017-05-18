<template>
  <div class="wrapper" id="canvas_container">
    <resultCanvas :result="result"></resultCanvas>
    <div class="result_container">
      <div class="result_item" v-for="item in result" :key="item.name">
        <div class="result_icon" :style="setIconBg(item.icon)"></div>
        <div class="result_detail_container">
          <div>
            <text class="result_name">{{item.name}}</text>
          </div>
          <div class="histogram_container">
            <div class="histogram" :style="{'background-color': item.color}" ref="histogram"></div>
            <text class="reuslt_value">{{item.value}}分</text>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_container">
      <text class="bottom_btn">查看详情</text>
      <text class="bottom_btn">最近变化</text>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    background-color: #a0d5ee;
  }

  .result_container {
    background-color: #a0d5ee;
    padding-top: 140px;
  }

  .result_item {
    padding-left: 80px;
    height: 100px;

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

    -webkit-box-align: stretch;
    -moz-align-items: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }

  .result_icon {
    margin-right: 50px;
    width: 50px;
    height: 100px;
    -webkit-background-size: 50px auto;
    background-size: 50px auto;
    background-position: center bottom;
    background-repeat: no-repeat;
  }

  .result_detail_container {
    flex: 1;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-box-pack: end;
    -moz-justify-content: flex-end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }

  .result_name {
    color: #FFF;
    font-size: 24px;
  }

  .histogram_container {
    width: 500px;
    height: 40px;
    border: 2px solid #FFF;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;

    position: relative;
  }

  .histogram {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;

    height: 36px;
    width: 0;
  }

  .reuslt_value {
    color: #FFF;
    font-size: 24px;
    margin-right: 40px;
    height: 40px;
    line-height: 40px;

    position: absolute;
    top: 0;
    right: 0;
  }

  .bottom_container {
    margin: 130px;
    margin-top: 150px;
    margin-bottom: 160px;

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
  }

  .bottom_btn {
    width: 180px;
    height: 80px;
    border: 2px solid #5ba9ec;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    background-color: #fff;

    color: #333;
    font-size: 32px;
    text-align: center;
    line-height: 80px;
  }
</style>
<script>
  import resultCanvas from './canvas.vue';
  const animation = weex.requireModule('animation');

  export default {
    data() {
      return {
        range: 0,
      };
    },

    computed: {
      result() {
        return [
          {
            name: "语言交流",
            value: 40,
            color: "#FF4343",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjU5RTBFODYxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjU5RTBFODcxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRjRENTBGRjFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRjRENTEwMDFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgMT8JIAAAUUSURBVHja5JprbIxZGMen0+lUXaZUq1TdiirrGhLEfa2sy4f1TYjrF3GJbLIi8cn9CyoqGnyoIBESH9Cs7i7ZYLMukWxD3Fu3Ioq4hUW1yvg/k/+R483MnHfeGa9pPMkvmfedc/mfc573zHOed1KCwaAnDvOBPNAdDAL9QC/QEbQEftAAXoMHoApcAufBLVALGp12nuJQfBswFIwFU0BfB21cBhXgJDgHXnxt8TKbk8BM8COvdZNZfAZegnpey+qkg0zQlte6yaocB3vBn7xOuHiZ6aVgMmih3W/g7F0D18Ft8AjUaeIzQHtQAIpAb66aX2vnDfgDbOJKmE3EG5ABLgJ3g1/aE1AMJoAcG+3o5LBeMdvR7S77SzG1Y+okC2wDdVrjz0EJ6A1SYxRtJZXtlLBdZXXsN8up+FxwwDIrp8B4kBanaCtpbPeUpb8D1BGT+EyL8PegzIF7eBy4Uxn70weQaVe8zEKpVrkBrLXjgwnCx/4aNA2l4VY7XOUFWsWPbEh9l+7SAIR17F9N4AKT+CGgVhtxGUcsy7kDrAEZLon3s39ltdQXVrzVz0+DdvxuOe+t4LK6Nfu51BHW//WC08A7FnoFxmjfjQazQSsXhSvGUE+Q+qZZxct+Wq6NsCQBe3giH+ASTVu52v9VgZ/BS375FBTxfjPgTYIBFFFXkDpFr8fL2GM8CDBi2A1ugmFgPcj3fHuTeGkPPweo1yej6gKucFT/g3Ec7e8cbdckcZ+fqC9IvV1k5ruBPhyVRHOVoCsYCfaBe1FmxOvi7F/Qok3R2006H6wVuAheMWZP42HhY5iGJCTeBYpBc4di5ABzBMy2Wf4p9Skb7OPRTcXlV/l5IqixFP58BgCrwVwOTPyxNEbh2WADJ2k0j4N/26hXRZ3+kG74zhn60WP6u8QwV8GhCL73K6gH+1nmLZgUg+9K+5tAI9hM/5UYvp+NuhOoU+yM3KjhRRW3JAkF7rFha+WpjLX/4u9AD3AbVINCm+Lnsb/tvB7BjaESdDLUHUCdYjUebf+8CPLBIJ5ullkq9mFZEVpg2QXegOMg29D5OA5e4vaO2v0Z4AM4aAj+Cqkz9HskPt+M/vSB/hSgX1sPwvIAHwZl9HNl4qurwBrQkw9WpJ3pF/AQLGYqRJnsallMmaRG8flG6vSEdFtmPo9xzDOwMAY/lkhzeKRDg+brPUFfQxlPLDP/mimJdG57Lzi6QAy7h2QKzprO+uCGjTLRLIM6QykTL7cpsdagA5ezPknCAqu1o06xWhFfrWXBCsFz8JgFk80KNPHVPuYO1QP5Az+vpSskm/XSElWXfIxllPXnr195EgrPpj5lleI2d7SwQFJ6A200lMXco5s2kPo81HvHywe0wpJI9Rsakjh/iyVn6cRywHzQyVDOT10qsVsR0m04SUViNcsuizNG38g4aZSTk1S0M2y0LIEcxCsYlM1xkJCSuOg3hgQ7QfN4zrCm7EE4OoN/mRBaaSOuUeRpYg7ZSCEasweR8ja5hobzGRqL/ceIUbK+bbTsg8xcWwZ2S8A1hsM7WC4heZtIGTO/jdTEQopXKfBjzC9uYOh7UnumJKKcleiMWaRc5Tqb7tCeiSnJq5/gIeMWuAz+AVvBdFPOPZ5cZbQssd00n8Tjc/nWYzPrDnArSxxvfl789CjDatne7oMpbuXn430z4uNpbDLPtmNBwM03I03+nVTSvw1s0u9hv5s34E3+vwdJ9a+PTwIMAPpKofUDDpq6AAAAAElFTkSuQmCC',
          },
          {
            name: "身体发展",
            value: 75,
            color: "#FFA415",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA2CAYAAACFrsqnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjU5RTBFOEUxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjU5RTBFOEYxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNTlFMEU4QzFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNTlFMEU4RDFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpmkEPkAAAdSSURBVHja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',
          },
          {
            name: "认知与推理",
            value: 78,
            color: "#FFF21B",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAxCAYAAACYq/ofAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzYwN0NFQjUxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzYwN0NFQjYxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjA3Q0VCMzFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjA3Q0VCNDFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsyxEWoAAAWmSURBVHjazJprbBVFFMe3hbb0jRQr1oaXtaiFVhQQDD4wBIQgMbHwQSNRSUzEhOgHAlpChA9IkFQjomh9JGrEB6IENVQj0fBQVJBqwVcBQaStYKH0AX3d6/+Y/ybHyd5yd+/dvfckv7Dd3Tuz/5kzM2fOkBIOhy0XNgAUgFFgIpgCrgZXgCyQAs6DZvA7+BZ8Aw6DJtBj+WQpUQoZCErBHWAuuNVlPQfAh2A7+IliAxcyDNwL7gdjjWe9oA1c4HWYojNADv/VdhK8DWrAb0EKmQ6qwG3G/aPgD7AX1PEDRVCIAi4D19L9rgJjQKr6fT1YDT4A3XFRIkIcSAULQVP4//YzWAOmRPidE9eA5WCvUVYnWAFyXZQVkUgiHgHtqtI28AKYEENlo8BKcMIQ9AzI90OI9MQ5VdERsAAMcHh3BFgHngUlUVY6E3xtiJFeHhRPITNAs6qgHkxXzwvBErCWFVeAOrAf3OCi4jGgVtXTAR6Il5Aio6UOg9vV85vBLj7bAQZSTDkY66FFxdV2q/oa2TAxCUkDVarQs+A+9eIcuth5sIwuZcWBqSzXtjdBRixCpEWPqQI3UJw8uwUcBSfB7AhjxSsy/S9WE0s3mOZViHzw48a4KOcLQ8FXoBfMiqMAjcxYn6r6t4F0L0JkbHzHQkJgtWqtR3n/iTj3hMk9oEW5dbnbMmS1LQETuD7Kar2V14Xgbt57F/RZ/tku0MDrPMZzrkyE3KT+bmDEajHEGE8Rxyx/7TjYw8aSCHqyFyGTVAC4j4Gf2GiQDQ7xmd92iMGnWDG3C66ElPK6ncGcbSX8t9UKxhoYeIoNZkO6EjKM19IajeqZbIzeB0cCEtKsGi2HYqI22TsM4nWfseF5B3wEzgYkRBqyi9fpINOtkJDRQ7Z1kqAshVj8prBb17L9Mg3kW4mzfE4uFnum3a2Q47yWrhyeQCHFqiFbOWZcCflFDbDrEiikRPVIi9u1S4TsVD4qQnITIELSTBVq4pGpuMOtkH3qRzJ3z0iAkHHgRrUwf+FlZZeMSC3/vhTM42wWpM1V4/ME2OZFiMxaW1RQOA3cGaAIyVTOV271HjjtRYjM1zvAbhX1LmJuym+TBN5joMy4nx1LXms+uKA2ONWxZjaiYBFTTaY9BbK8Jh8ywUuqMNmfL2Weyw8R84yMTadDiijTazqoGOwx0jTLfeiZBUai7iB4iNkZbU9Hu+11ujmeuSrbesBroDQOAgqZbfxHlf83qORzqWOnIaY6GjeL9GCS2sfbVsdWK/IgYAjHoCQy+lSZDbxv5rs+Ue9IHmH9xcT0V3kZ2GqIaWUSr4pZycJ+fp/HvNViZhVPG2WJa90V4bdvGO+KVzwHsiPVd7FjBVkgHwTLjI1OF+MhOYn6E5xRUXQOg7/LeZwwhKdZTvuPlWCd2krLtPs8F2VZT4aqNU1OuzbyWzqjPVbQSN5rHHiFqRon62Or9Riuo+0cB/N+YzJZxQGdrnqihq4001gSupk8zHPjWiYZFLSG46eRHx5y+OgQBZ0CB8BGulkW87t6ZuwCT7Kh5PplvlfGcXkG/KDe76XQAjeuFclkE3Y9KAcjwCUMMVLpduJqf4GD4HvldrbJEd6LYKpxfz1YwrBlE6OMhxmhvwpmqV3k62ApOBWta/lFmcru27aKPfcrJwedSB9upFbDXBYK3LqWH8ix3JeGS7bxyK/S4f2RxtQcZjSSnWghthhzRf+4n9BIoo8txtisTAYh9gnWZ0bcVd3PQWkR37fFbE8WIcKV4HMXB6VzVKjTkkxChNHG2WKIU/dgh3cnqsCzI9mE2AO61uiZGgcxa9Vi+WMyCrEDx1ojctjMY7kKbrxa1fMVXhfEIGwk2ABmq3tN/C8fRSpBUv9fPJakPaKn2k3hyCahy+RYQpQgLZcR8EKGRWlM4G0Gb/Fo0PpXgAEAdI4HY1RxDTkAAAAASUVORK5CYII=',
          },
          {
            name: "情绪与社交",
            value: 60,
            color: "#5ADA41",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAuCAYAAACF6SFvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTM1N0ZCMkMxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTM1N0ZCMkQxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzU3RkIyQTFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MzU3RkIyQjFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgdjyuoAAAevSURBVHja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',
          },
          {
            name: "科学与逻辑",
            value: 80,
            color: "#58BAFF",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAuCAYAAACBHPFSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTM1N0ZCMzQxQzBDMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjAwRDUwMUMxQzBEMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzU3RkIzMjFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MzU3RkIzMzFDMEMxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiuL6lIAAAaQSURBVHja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',
          },
          {
            name: "创新与艺术",
            value: 66,
            color: "#4765FF",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA3CAYAAACVSbMgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjAwRDUwMjMxQzBEMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjAwRDUwMjQxQzBEMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDBENTAyMTFDMEQxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDBENTAyMjFDMEQxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqBypTEAAAeKSURBVHja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',
          },
          {
            name: "社会文化适应",
            value: 100,
            color: "#824BFF",
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAA2CAYAAABTCxDCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjk2NzdCRTYxQzBEMTFFN0I5MjVGMDg0OTk4M0Q4QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjk2NzdCRTcxQzBEMTFFN0I5MjVGMDg0OTk4M0Q4QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOTY3N0JFNDFDMEQxMUU3QjkyNUYwODQ5OTgzRDhDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCOTY3N0JFNTFDMEQxMUU3QjkyNUYwODQ5OTgzRDhDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhgDbngAAAR2SURBVHja7JlpbExRFMfnTaeblqpailZDUJWgKqU+WFKxExE0QiKRCkFiSUQ/VEJIfBC+kRBCqFSI5YOdIoRoI7aIXSkqErGWGm1Nn/9tzqTHzds686bvfZiT/DL3vXPnvvPuve+ec+/xqKrqMWEUeAJqwSwNfRLYC/6AnSBG0iugCHwHd0GOhWcaYqXSAbVVLmnox4FmVqe/pPeBKqYvCddor8dc4lk5RkMfCxQqN4GOkl7oOrDrBE+YYsVoVaesd69Zo06zSRu2G+06iRodNTpqdNToyBmt6JT17ikhtGG70TGS9zMySOj/mrTRLkZfYF6sQkP/Ajyk8l3wVtIHwGkqN4DKcI1WWqIm854eSzHDDVCvUWcAGArugTca+mRQCL6DW/Qithjt1Rm6gMFQB2OJZpOgKiBND70RtvQyPvotAptBL4cXhqugFDw26+np+D3johXtKZgGaow+xFKXLcM5YJnZ9BjOrg+DmyCxnQ0Vq0oxGEHX2bR8NukZzT++U+CkQz2cz4xWzHpadYlbT2blqeC9xi7nG1jhk26KYclzyOhsaV/aQ6NOOigRq4ffjs1mO8oTuafFfL7jwEs0gvlgCF0/I1v8dD0GTKJyF3GO4GdnErPDPZMIg/3MjmOSbjHT1Xs1zjCcEjmaTNCJDGPk6ZFJwY8T0tkg5OUxiSobvZ1wm8QbOZcKio1j7QjW2yDC881ko6xIz49jZb+PXGjwTQ6SK3dC+NRsZC5cofU5KJ/Eh/iV3ejn4BTgz65jRotRz2K6GmH0K8krJbKvOVUnqLdbUkBXdv2BlfuC8ez6gTD6EbtR4Gk9qh0G7oMF7TC/89nqIaZrNegOZoAykMHqXvHSboEPUQ7bRolhWSR/vRGQidTbHvKCU8Bx2hDns3pij1olvE0m+Mg8Thl5oThQDOZE2BNmUXrETCpBdjB9IXIku7ibBINZoxNAOegTIaPXSukPWb6ATaC3nHMReZMGVvEEa3QV3bsG0mw2OJOSR1xEwukbuAiWgAy9RFE89Sb/41LSiZE4RPevg0E2Gr1DMvgIGANSrGa3RtIbBuU9KCBdItjHhmsFGBCmwUskgx+AhFBScuukhp6DPJYPFMa+I1012A3WgAVgNKXfrBi8CPxmz/lBUzSkPGIcmwpBqZHibPGRloKnUr3PtBKYPXS9ZLCQ1eEmPzuDc1KjdWA7SGX1uoFc6uUNNArJBg8T0+kkCEhtb9PI8oaUsU2j3YOq0esrQTrwWniAeImB9MJfpLYawVaL7fyH0alpIp3vLQdJkk4EWWfBdfAS/KTITKEdRwrt94Snm6wRv4jYYgvYE5L/tPBmc8FNE2/1k7zqJ2m915LjtFJFNKEv6AGWg9tq6HIKzGvDChPS9NCSnjTsk+mQfJhBBOhvCW4QlYHLdBpaZ0d01Vaj+c45iY6ysuhcuxMF7mJ+vwO1ZPgvu0PCUI12VHzUS+M87sopfqVp1ajX0+cp6HabLATlepmAQpfOglyj6bGRUhixLjL4NTiqp/wnwACnm6FxlxmqfAAAAABJRU5ErkJggg==',
          },
        ];
      },
    },

    components: {
      resultCanvas,
    },

    methods: {
      setIconBg(icon) {
        return {
          "background-image": `url("${icon}")`,
        };
      },

      computeHistogram() {
        let refs = this.$refs.histogram;
        for (let i = 0, l = refs.length; i < l; i++) {
          animation.transition(refs[i], {
            styles: {
              width: `${this.result[i].value * 500 / 100 - 4}px`,
            },
            duration: 1000, //ms
            timingFunction: 'ease-in-out',
          });
        }
      },
    },

    mounted() {
      this.computeHistogram();
    },
  };
</script>