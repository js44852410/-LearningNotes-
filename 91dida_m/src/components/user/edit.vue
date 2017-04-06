<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .user-info-edit-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    background-color: $bgColor;
    z-index: 4;
    @include borderTop;
    .input-wrapper {
      position: relative;
      overflow: hidden;
      background-color: #fff;
      @include border($bdrz: 0);
      .input {
        width: 100%;
        padding: 0 10px;
        margin: 10px 0;
        height: $inputHeight - 5px;
      }
    }
    .btn-submit {
      margin-top: 10px;
    }
    form {
      margin-top: 10px;
    }
    .upload-container {
      margin: 10px $margin;
      .tips {
        margin-bottom: 10px;
        overflow: hidden;
        p {
          overflow: hidden;
        }
      }
      .image-wrapper {
        position: relative;
        padding-top: 60%;
        background: url(/src/images/business.jpg) 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        & + .image-wrapper {
          margin-top: 10px;
        }
      }
      .file {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0.02;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.user-info-edit-wrapper
    .upload-container(
      v-if='module === "business_license" || module === "identity_card_1"'
    )
      .tips
        em.i !
        p 点击图片重新上传
      .ids-wrapper(v-if='module === "identity_card_1"')
        .image-wrapper(
          :style='{backgroundImage: "url(" + images + ")"}'
        )
          input.file(
            @change='upload("ids1", $event)',
            type="file"
          )
        .image-wrapper(
          :style='{backgroundImage: "url(" + images2 + ")"}'
        )
          input.file(
            @change='upload("ids2", $event)',
            type="file"
          )
      .image-wrapper(
        v-else,
        :style='{backgroundImage: "url(" + images + ")"}'
      )
        input.file(
          @change='upload("license", $event)',
          type="file"
        )
      button.btn-submit(
        :disabled='disabled',
        @click='submit',
        v-text='text'
      )
    form(
      v-else,
      @submit.prevent='submit'
    )
      .input-wrapper
        input.input(
          v-if='module === "linkman_phone"',
          type='tel',
          :placeholder='placeholder',
          v-model='value'
        )
        textarea.input(
          v-else,
          :placeholder='placeholder',
          v-model='value'
        )
      button.btn-submit(
        :disabled='disabled',
        v-text='text'
      )
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        body: {
          api: 'customer',
          method: 'change_buyer_info'
        },
        module: '',
        placeholder: '',
        text: '保存',
        review: false,
        disabled: true,

        images: '/src/images/business.jpg',
        images2: '/src/images/business.jpg',
      }
    },
    computed: {
      ...Vuex.mapGetters(['userInfo']),
      value: {
        get() {
          return this.userInfo[this.module];
        },
        set(value) {
          this.$store.dispatch('updateUserInfo', {
            key: this.module,
            value: value
          });
        }
      },
      images() {
        if (this.module === 'business_license') {
          return this.userInfo.business_license_image;
        } else if (this.module === 'identity_card_1') {
          return this.userInfo.identity_card_1_image;
        }
      },
      images2() {
        return this.userInfo.identity_card_2_image;
      }
    },
    watch: {
      value(val) {
        if (val !== '') {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    },
    methods: {
      submit() {
        if (this.module !== 'identity_card_1') {
          this.body[this.module] = this.value;
        }
        this.disabled = true;
        this.text = '正在保存...';
        if (this.value === self.DD.userInfo[this.module] && this.module !== 'identity_card_1') {
          this.$router.push({
            name: 'userInfo'
          })
          return false;
        }

        self.DD.post(this.body, (data) => {
          if (data.result === 'success') {
            if (this.review) {
              self.toast('信息修改成功, 请等待审核~');
            } else {
              self.DD.userInfo[this.module] = this.value;
              this.$store.dispatch('updateUserInfo', {
                key: this.module,
                value: this.value
              });
            }
            this.$router.push({
              name: 'userInfo'
            })
          } else {
            this.disabled = false;
            this.text = '保存',
            self.toast(data.info.errmsg);
          }
        });
      },

      upload(type, $event) {
        self.DD.loading();
        self.DD.upload($event.target, (result) => {
          if (type === 'ids1') {
            this.$store.dispatch('updateUserInfo', {
              key: 'identity_card_1_image',
              value: result.image
            });
            this.body.identity_card_1 = result.media;
          } else if (type === 'ids2') {
            this.$store.dispatch('updateUserInfo', {
              key: 'identity_card_2_image',
              value: result.image
            });
            this.body.identity_card_2 = result.media;
          } else {
            this.$store.dispatch('updateUserInfo', {
              key: 'business_license',
              value: result.media
            });
            this.$store.dispatch('updateUserInfo', {
              key: 'business_license_image',
              value: result.image
            });
          }
          self.DD.loading(false);
        });
      }
    },
    beforeMount() {
      this.module = this.$route.meta.field;
      this.review = this.$route.meta.review;
      this.placeholder = this.$route.meta.placeholder;
    },
  }
</script>
