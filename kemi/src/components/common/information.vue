<template>
  <div class="activity-info-wrapper">
    <div class="activity-info-content">
      <div class="activity-title">
        <text class="activity-title-text">{{content.articleTitle}}</text>
      </div>
      <div v-if="headImg" class="activity-image-box">
        <image resize="stretch" class="activity-image" :src="content.activitySmallImageUrl1|dirImage"></image>
      </div>
      <div class="activity-info-item html-text" v-html="content.articleDetails"></div>
    </div>
  </div>
</template>

<style scoped>
  .activity-info-wrapper {
    background: #fff;
    margin-bottom: 20px;
  }

  .activity-info-content {
    margin: 40px 30px 0;
  }

  .activity-title-text {
    font-size: 32px;
    line-height: 50px;
    color: #333;
    margin-bottom: 30px;
  }

  .activity-time-text {
    font-size: 22px;
    color: #333;
    text-align: right;
    margin-bottom: 30px;
  }

  .activity-image {
    height: 436px;
    width: 686px;
    border-radius: 10px;
    margin-bottom: 40px;
  }

  .activity-info-item {
    font-size: 24px;
    color: #333;
    line-height: 50px;
    margin: 0 0 70px;
  }

  .activity-number {
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    margin-bottom: 60px;
  }

  .reader-number, .praise-number {
    -moz-box-orient: horizontal;
    -webkit-box-orient: horizontal;
    box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;

    font-size: 24px;
    color: #999;
  }

  .image-icon {
    height: 30px;
    width: 30px;
  }

  .reader-number {
    margin-right: 40px;
  }

  .praise-icon {
    margin-right: 10px;
  }
</style>

<script>
  const stream = weex.requireModule('stream');

  module.exports = {
    data() {
      return {
        content: {},
        getInfomationId: '',
        headImg: false,
      };
    },
    methods: {
      getContent() {
        this.getInfomationId = this.$route.params.getInfomationId;
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/getContent/${this.getInfomationId}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }, res => {
          if (res.ok && res.data.code === "1") {
            this.content = res.data.result;
            if (this.content.activitySmallImageUrl1 !== '') {
              this.headImg = true;
            }
          }
        });
      },
    },

    mounted() {
      this.getContent();
    },
  };
</script>