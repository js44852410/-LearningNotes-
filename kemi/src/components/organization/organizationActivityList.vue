<template>
  <activityList url="appapi/getOnlineActPage" keyword="businessId" :id="id"></activityList>
</template>
<style>

</style>
<script>
  import activityList from '../home/activity-list.vue';

  export default {
    data() {
      return {
        id: "",
      };
    },

    components: {
      activityList,
    },

    created() {
      this.id = this.$route.params.id;
    },
  };
</script>