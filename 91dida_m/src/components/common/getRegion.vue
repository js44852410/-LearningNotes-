<style lang='sass'>
  .select-wrapper {
    select {
      width: 32%;
      margin-right: 1%;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>

<template lang='jade'>
  .select-wrapper
    select(
      ref='province',
      @change='getCity(0, $event)'
    )
      option(value='0') 请选择
      option(
        v-for='(item, index) in addressRegions',
        v-text='item.region_label',
        :key='item.region_id',
        :value='item.region_id',
      )
    select(
      ref='city',
      v-if='cities.length > 0',
      @change='getDistrict(0, $event)'
    )
      option(value='0') 请选择
      option(
        v-for='(item, index) in cities',
        v-text='item.region_label',
        :key='item.region_id',
        :value='item.region_id',
      )
    select(
      ref='district',
      v-if='districts.length > 0',
      @change='setRegion(0, $event)'
    )
      option(value='0') 请选择
      option(
        v-for='(item, index) in districts',
        v-text='item.region_label',
        :key='item.region_id',
        :value='item.region_id',
      )
</template>
<script lang='babel'>
  export default {
    props: ['provinceId', 'cityId', 'countyId'],
    data() {
      return {
        cities: [],
        districts: [],

        pId: 0,
        cId: 0,
        dId: 0,
      }
    },
    computed: {
      ...Vuex.mapGetters(['addressRegions']),
    },
    methods: {
      setRegionId(id) {
        const regionId = this.dId || this.cId || this.pId;
        this.$emit('region-event', regionId);
      },
      getCity(id, $el) {
        this.pId = id || +$el.target.value;
        this.dId = 0;
        this.cId = 0;
        this.districts = [];
        if (this.pId) {
          this.addressRegions.map(item => {
            if (this.pId === +item.region_id) {
              this.cities = item.child || [];
            }
          });
        } else {
          this.cities = [];
        }
        this.setRegionId();
      },
      getDistrict(id, $el) {
        this.cId = id || +$el.target.value;
        this.dId = 0;
        if (this.cId) {
          this.cities.map(item => {
            if (this.cId === +item.region_id) {
              this.districts = item.child || [];
            }
          });
        } else {
          this.districts = [];
        }
        this.setRegionId();
      },
      setRegion(id, $el) {
        this.dId = id || +$el.target.value;
        this.setRegionId();
      },
      editProvince() {
        if (!this.$refs.province) return;
        const provinceId = +this.provinceId;
        if (provinceId) {
          this.getCity(provinceId);
          this.addressRegions.map((item, index) => {
            if (item.region_id == provinceId) {
              this.$refs.province.selectedIndex = index + 1;
              this.$nextTick(() => {
                this.editCity();
              })
            }
          });
        }
      },
      editCity() {
        if (!this.$refs.city) return;
        const cityId = +this.cityId;
        if (cityId) {
          this.getDistrict(cityId);
          this.cities.map((item, index) => {
            if (item.region_id == cityId) {
              this.$refs.city.selectedIndex = index + 1;
              this.$nextTick(() => {
                this.editCounty();
              })
            }
          });
        }
      },
      editCounty() {
        const countyId = +this.countyId;
        if (countyId) {
          this.setRegion(countyId);
          this.districts.map((item, index) => {
            if (item.region_id == countyId) {
              this.$refs.district.selectedIndex = index + 1;
            }
          });
        }
      }
    },
    mounted() {
      this.$store.dispatch('getRegionList');
      self.DD.bus.$on('address-edit', this.editProvince);
    }
  }
</script>
