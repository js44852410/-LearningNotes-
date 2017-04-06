<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .user-info-wrapper {
    margin-top: 10px;
    @include borderTop;
    .layout {
      background-color: #fff;
      margin-bottom: 10px;
      .item {
        display: block;
        padding: 10px $margin;
        position: relative;
        overflow: hidden;
        @include borderTop;
        &:last-child {
          @include borderBottom;
        }
        .title {
          float: left;
          em {
            margin-left: 3px;
          }
        }
        .con {
          padding-right: 15px;
          overflow: hidden;
          text-align: right;
          color: $darkenGrayColor;
        }
      }
    }
    .star {
      color: $mainColor;
    }
    .head-image {
      $size: 60px;
      width: $size;
      height: $size;
      border-radius: 3*$size;
      overflow: hidden;
      display: block;
      float: right;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .tips {
      margin: 0 $margin;
      .star {
        margin-right: 3px;
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
</style>

<template lang='jade'>
  div
    .wrapper.user-info-wrapper
      .layout
        a.item
          span.title(style='line-height: 60px') 买家头像
          .con
            span.head-image(
              v-if='userInfo.buyer_avatar',
              :style='{backgroundImage: "url(" + userInfo.buyer_avatar + ")"}'
            )
          input.file(
            @change='upload($event)',
            type="file"
          )
          em.icon-more
        router-link.item(
          :to='{name: "userInfoName"}'
        )
          span.title 买家名称
          .con(v-text='userInfo.company_name')
          em.icon-more
        router-link.item(
          :to='{name: "userInfoShorthand"}'
        )
          span.title 买家简称
          .con(v-text='userInfo.company_short_name')
          em.icon-more
      .layout
        router-link.item(
          :to='{name: "userInfoMobile"}'
        )
          span.title 联系电话
          .con {{userInfo.linkman_phone | mobile}}
          em.icon-more
        router-link.item(
          :to='{name: "userInfoStreet"}'
        )
          span.title
            label 运营地址
            em.star *
          .con(v-text='userInfo.operation_address_street')
          em.icon-more
        router-link.item(
          :to='{name: "userInfoLinkman"}'
        )
          span.title 公司联系人
          .con(v-text='userInfo.linkman')
          em.icon-more
      .layout
        router-link.item(
          :to='{name: "userInfoLicense"}'
        )
          span.title
            label 营业执照
            em.star *
          .con
            span(v-if='userInfo.business_license') 已上传
            span(v-else) 未上传
          em.icon-more
        router-link.item(
          :to='{name: "userInfoPerson"}'
        )
          span.title
            label 企业法人
            em.star *
          .con
            span(
              v-if='userInfo.legal_person',
              v-text='userInfo.legal_person'
            )
          em.icon-more
        router-link.item(
          :to='{name: "userInfoIds"}'
        )
          span.title
            label 法人身份证
          .con
            span(v-if='userInfo.identity_card_1 && userInfo.identity_card_2') 已上传
            span(v-else) 未上传
          em.icon-more
      p.tips
        em.star *
        span 项要通过运营后台审核通过后才能完成修改
    transition(name='slide')
      router-view
</template>

<script lang='babel'>
  export default {
    data() {
      return {
        body: {
          api: 'customer',
          method: 'set_buyer_avatar',
          avatar: '',
        }
      }
    },
    computed: {
      ...Vuex.mapGetters(['userInfo']),
    },
    methods: {
      upload($event) {
        self.DD.loading();
        self.DD.upload($event.target, (result) => {
          this.$store.dispatch('setUserHeadImg', {
            avatar: result.media,
            fullAvatar: result.image,
          });
        });
      }
    },
    created() {
      this.$store.dispatch('getUserInfo');
    },
  }
</script>
