<style lang='sass'>
  @import "../../scss/variable";
  @import "../../scss/line";
  .message-wrapper {
    padding-top: 10px;
    .tta {
      position: relative;
      overflow: hidden;
      width: 100%;
      @include border($bdrz: 0);
    }
    textarea {
      padding: 10px;
      width: 100%;
      height: 200px;
      display: block;
    }
    .tips {
      position: absolute;
      right: 10px;
      bottom: 5px;
      color: $darkenGrayColor;
    }
  }
</style>

<template lang='jade'>
  .wrapper.message-wrapper
    form(@submit.prevent="submitMessage")
      .tta
        textarea(
          v-model='body.content',
          maxlength='300',
          @input='limitText'
          placeholder='请添加您的反馈意见'
        )
        .tips
          span 还可输入
          em(v-text='limit')
          span 字符
      button.btn-submit(
        :disabled='disabled'
      ) 确认提交
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        limit: 300,
        disabled: true,
        body: {
          api: 'system',
          method: 'feedback',
          content: '',
        },
      }
    },
    watch: {
      ['body.content'](val) {
        if (val.trim().length) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    },
    methods: {
      limitText() {
        this.limit = 300 - this.body.content.length;
      },
      submitMessage() {
        this.disabled = true;
        self.DD.post(this.body, (data) => {
          this.disabled = false;
          if (data.result === 'success') {
            self.toast('提交成功，谢谢您的反馈！', {
              callback: function() {
                this.$router.replace({name: 'set'});
              }.bind(this)
            });
          } else {
            self.toast('提交失败');
          }
        })
      }
    }
  }
</script>
