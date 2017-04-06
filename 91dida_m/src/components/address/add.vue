<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .add-address-wrapper {
    h4 {
      padding: 10px;
      position: relative;
      font-size: 16px;
      @include borderBottom;
    }
    .choice-city {
      line-height: 45px;
    }
    .set-default {
      display: inline-block;
      padding: 10px;
      &.active {
        color: $mainColor;
      }
      em {
        margin-right: 5px;
      }
      em, span {
        vertical-align: middle;
      }
    }
  }
</style>

<template lang='jade'>
  .wrapper.add-address-wrapper
    form.add-address(@submit.prevent='submit')
      h4 联系人
      .items
        span.title 姓名:
        input.input(v-model='addressee', placeholder='请输入买家名称')
      .items
        span.title 电话:
        input.input(v-model='mobile', type='tel', maxlength='11', placeholder='请填写收货手机号码')
      h4 收货地址
      .items
        span.title 城市/地区
        .con.choice-city
          get-region(
            :region-id='regionId',
            :province-id='provinceId',
            :city-id='cityId',
            :county-id='countyId',
            :address-id='addressId',
            @region-event='setRegionId'
          )
      .items
        span.title 详细地址:
        input.input(v-model='street', placeholder='例: 20号楼2012室')
      a.set-default(
        :class='{active: isDefault == 1}',
        @click='isDefault = isDefault? 0: 1'
      )
        em.icon-confirm.icon-36
        span 设为默认
      button.btn-submit(:disabled='disabled', v-text='btnText')
</template>

<script lang='babel'>
  import GetRegion from '../common/getRegion.vue';
  import * as apis from '../../store/apis';
  export default {
    components: {
      GetRegion,
    },
    data() {
      return {
        regionId: 0,
        addressee: '',
        isDefault: 0,
        mobile: '',
        street: '',

        addressId: 0,
        provinceId: 0,
        cityId: 0,
        countyId: 0,
        disabled: true,
        btnText: '保存',
      }
    },
    watch: {
      mobile: 'verification',
      addressee: 'verification',
      regionId: 'verification',
      street: 'verification',
    },
    methods: {
      setRegionId(regionId) {
        this.regionId = regionId;
      },
      verification() {
        if (/^1[345678]{1}\d{9}$/.test(this.mobile) && this.addressee && this.regionId && this.street) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      submit() {
        const $children = this.$children[0].$refs;
        if (($children.district && !+$children.district.value) ||$children.city && !+$children.city.value) {
          self.toast('要填写完整的区域信息哟~');
          return;
        }
        let body = { ...apis.ADD_ADDRESS };
        if (this.addressId) {
          body = { ...apis.EDIT_ADDRESS };
          body.id = this.addressId;
        }
        body.addressee = this.addressee;
        body.default = this.isDefault;
        body.region_id = this.regionId;
        body.mobile = this.mobile;
        body.street = this.street;
        this.disabled = true;
        this.btnText = '保存中...';
        self.DD.post(body, data => {
          const query = this.$route.query;
          this.disabled = false;
          this.btnText = '保存';
          if (data.result === 'success') {
            this.$router.replace({
              name: 'addressList',
              query: query
            })
          } else {
            self.toast(data.info.errmsg);
          }
        });
      },
      getAddressInfo(id) {
        const body = {
          api: 'customer_address',
          method: 'get_address_item',
          id
        }
        self.DD.loading();
        self.DD.get(body, data => {
          if (data.result === 'success') {
            this.regionId = data.info.region_id;
            this.addressee = data.info.addressee;
            this.isDefault = +data.info.is_default;
            this.mobile = data.info.mobilephone;
            this.street = data.info.street;

            this.provinceId = data.info.province_id;
            this.cityId = data.info.city_id;
            this.countyId = data.info.county_id;
            this.$nextTick(() => {
              self.DD.bus.$emit('address-edit');
            });
          } else {
            self.toast(data.info.errmsg);
          }
        });
      }
    },
    mounted() {
      this.addressId = this.$route.params.addressId;
      if (this.addressId) {
        this.getAddressInfo(this.addressId);
      }
    }
  }
</script>
