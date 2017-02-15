<style lang='sass'>
  @import '../../scss/variable';
  .register-info {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    min-height: 100%;
    background-color: $bgColor;
    .choice-city {
      line-height: $inputHeight;
    }
    & + .urgent {
      z-index: 2;
    }
    .submit {
      p.title {
        margin: $margin;
      }
    }
    .business {
      position: relative;
      padding-top: 50%;
      margin: 10px $margin*3;
      background: url(/src/images/business.jpg) 50% 50% no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .ids {
      overflow: hidden;
      margin: 10px $margin;
      [class^='ids-'] {
        position: relative;
        padding-top: 30%;
        width: 49%;
        background: url(/src/images/idcard.jpg) 50% 50% no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
    }
    .ids-front {
      float: left;
    }
    .ids-back {
      float: right;
    }
  }
  .reset-info {
    .pass-wrapper {
      text-align: center;
      padding: 10px;
    }
    .icon-pass-outer {
      border: 1px solid $mainColor;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 100px;
      text-align: center;
      display: inline-block;
      margin-right: 5px;
    }
    .i {
      display: none;
    }
  }
</style>

<template lang='jade'>
  .wrapper.user-form-wrapper.register-info(
    :class='{"reset-info": modify}'
  )
    p.pass-wrapper(v-if='modify')
      span.icon-pass-outer
        em.icon-pass
      span 注册成功
    top-tips
    form(
      v-if='submitToggle',
      @submit.prevent='next'
    )
      .items
        span.title 买家名称
        input.input(
          v-model='body.company_name',
          type="text",
          placeholder="请输入买家名称"
        )
      .items
        span.title 买家简称
        input.input(
          v-model='body.company_short_name',
          type="text",
          placeholder="请输入买家简称"
        )
      div.separate
        .items
          span.title 联系人
          input.input(
            v-model='body.linkman',
            type="text",
            placeholder="请输入联系人姓名"
          )
        .items
          span.title 联系电话
          input.input(
            v-model='body.linkman_phone',
            type="tel",
            maxlength='11',
            placeholder="请输入联系电话"
          )
      div.separate
        .items
          span.title 城市/地区
          .con.choice-city
            get-region(
              :region-id='body.region_id',
              :province-id='provinceId',
              :city-id='cityId',
              :county-id='countyId',
              @region-event='setRegionId'
            )
        .items
          span.title 详情地址
          input.input(
            v-model='body.street',
            type="text",
            placeholder="例：复兴镇中心小区6号楼618"
          )
      button.btn-submit(
        :disabled='disabled'
      ) 下一步
      p.options
        a.forget(@click='logout') 切换账号
    form.submit(
      v-else,
      @submit.prevent='submit'
    )
      p.title 营业执照
      .business
        upload-file(
          :text='"点击添加营业执照"',
          :url='body.business_license',
          :image='business_license_image',
          @upload-event='setLicense'
        )
      p.title 法人身份证
      .ids
        .ids-front
          upload-file(
            :text='"点击添加身份证正面"',
            :url='body.identity_card_1',
            :image='identity_card_1_image',
            @upload-event='setCardFront'
          )
        .ids-back
          upload-file(
            :text='"点击添加身份证反面"',
            :url='body.identity_card_2',
            :image='identity_card_2_image',
            @upload-event='setCartBack'
          )
      button.btn-submit(
        :disabled='submitDisabled'
      ) 提交
    tips
</template>

<script lang='babel'>
  import Tips from './tips.vue';
  import TopTips from './topTips.vue';
  import GetRegion from '../common/getRegion.vue';
  import UploadFile from '../common/uploadFile.vue';
  export default {
    components: {
      Tips,
      TopTips,
      GetRegion,
      UploadFile
    },
    data() {
      return {
        body: {
          api: 'customer',
          method: 'set_buyer_info',
          company_name: '',
          company_short_name: '',
          linkman: '',
          linkman_phone: '',
          region_id: '',
          street: '',

          business_license: '',
          identity_card_1: '',
          identity_card_2: '',
          legal_person: '', // 此参数不用提交
        },
        business_license_image: '',
        identity_card_1_image: '',
        identity_card_2_image: '',
        modify: 0,
        provinceId: 0,
        cityId: 0,
        countyId: 0,
        disabled: true,

        submitToggle: true,
        submitDisabled: true
      }
    },
    watch: {
      body: {
        handler: 'verification',
        deep: true
      }
    },
    methods: {
      setRegionId(regionId) {
        this.body.region_id = regionId;
      },
      setLicense(url, imageSrc) {
        this.body.business_license = url;
        this.business_license_image = imageSrc;
      },
      setCardFront(url, imageSrc) {
        this.body.identity_card_1 = url;
        this.identity_card_1_image = imageSrc;
      },
      setCartBack(url, imageSrc) {
        this.body.identity_card_2 = url;
        this.identity_card_2_image = imageSrc;
      },
      verification() {
        const b = this.body;
        if (/^1[345678]{1}\d{9}$/.test(b.linkman_phone) && b.company_name && b.company_short_name && b.linkman && b.region_id && b.street) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }

        if (b.business_license) {
          this.submitDisabled = false;
        } else {
          this.submitDisabled = true;
        }
      },
      next() {
        const $children = this.$children[1].$refs;
        if (($children.district && !+$children.district.value) ||$children.city && !+$children.city.value) {
          self.toast('要填写完整的区域信息哟~');
        } else {
          this.submitToggle = false;
        }
      },
      submit() {
        this.submitDisabled = true;
        self.DD.post(this.body, (data) => {
          if (data.result === 'success') {
            // 使用location而不用vmRouter，需要刷新首页的数据~
            self.location.href = '/#/user/pending';
          } else {
            self.toast(data.info.errmsg);
          }
        })
      },
      getUserInfo() {
        const body = {
          api: 'customer',
          method: 'get_buyer_info'
        };
        self.DD.loading();
        self.DD.get(body, data => {
          if (data.result === 'success') {
            this.body.company_name = data.info.company_name;
            this.body.company_short_name = data.info.company_short_name;
            this.body.linkman = data.info.linkman;
            this.body.linkman_phone = data.info.linkman_phone;
            this.body.street = data.info.operation_address_street;
            this.body.region_id = data.info.region_id;
            this.body.business_license = data.info.business_license;
            this.business_license_image = data.info.business_license_image;
            this.body.identity_card_1 = data.info.identity_card_1;
            this.identity_card_1_image = data.info.identity_card_1_image;
            this.body.identity_card_2 = data.info.identity_card_2;
            this.identity_card_2_image = data.info.identity_card_2_image;
            this.provinceId = data.info.province_id;
            this.cityId = data.info.city_id;
            this.countyId = data.info.county_id;
            this.$nextTick(() => {
              self.DD.bus.$emit('address-edit');
            });
          }
        })
      },
      logout() {
        this.$store.dispatch('logout', {
          callback: function() {
            self.home.reviewStatus = '';
            this.$router.replace({
              name: 'login',
            });
          }.bind(this)
        })
      }
    },
    created() {
      this.modify = this.$route.query.modify;
      if (this.modify) {
        this.getUserInfo();
      }
    }
  }
</script>
