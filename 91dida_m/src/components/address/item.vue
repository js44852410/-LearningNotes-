<style lang='sass'>
  @import '../../scss/variable';
  @import '../../scss/line';
  .address-item {
    display: block;
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    @include borderTop;
    @include borderBottom;
    .address-info {
      padding: 10px;
      position: relative;
      display: block;
      @include borderBottom;
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .name {
      width: 65%;
    }
    .mobile {
      width: 34%;
    }
    .street {
      margin-top: 5px;
      color: $darkenGrayColor;
    }
    .options {
      position: relative;
      overflow: hidden;
      text-align: right;
      em {
        margin-right: 3px;
      }
      em, span {
        vertical-align: middle;
      }
      a {
        padding: 10px;
        display: inline-block;
        color: $darkenGrayColor;
      }
      .set-default {
        float: left;
        &.active {
          color: $mainColor;
        }
      }
    }
    .icon-confirm {
      width: 19px;
      height: 19px;
    }
  }
</style>

<template lang='jade'>
  li.address-item
    a.address-info(
      @click='jump(address.address_id)'
    )
      span.name(v-text='address.addressee')
      span.mobile(v-text='address.mobile_phone')
      p.street(v-text='street')
    .options
      a.set-default(
        :class='{active: address.is_default == 1}',
        @click='setDefaultAddress({ id: address.address_id, isDefault: address.is_default, index: dataIndex })'
      )
        em.icon-confirm.icon-36
        span 设为默认
      router-link.edit(
        :to='{name: "addressEdit", params: {addressId: address.address_id}, query: $route.query}'
      )
        em.icon-editing
        span 编辑
      a.del(
        @click='deleteItemAddress({ id: address.address_id, index: dataIndex, isDefault: address.is_default })'
      )
        em.icon-delete
        span 删除
</template>

<script lang='babel'>
  export default {
    props: ['address', 'dataIndex'],
    computed: {
      street() {
        return this.address.province + this.address.city + this.address.county + this.address.street
      }
    },
    methods: {
      ...Vuex.mapActions(['deleteItemAddress', 'setDefaultAddress']),
      jump(address_id) {
        const query = this.$route.query;
        if (query.from === "confirm") {
          delete query.from;
          query.address_id = address_id;
          this.$router.replace({
            name: 'confirm',
            query: query,
          })
        }
      },
    }
  }
</script>
