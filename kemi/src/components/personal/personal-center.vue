<template>
  <div class="wrapper">
    <userInfo :user-info="userInfo"></userInfo>
    <userList></userList>
    <footer :status="2"></footer>
  </div>
</template>

<style scoped>
  .wrapper {
    background: #f5f4f9;
  }
</style>

<script>
  import userInfo from './user-info.vue';
  import userList from './user-list.vue';
  import footer from '../common/footer.vue';
  import {mapGetters} from 'vuex';
  const stream = weex.requireModule('stream');

  export default {
    components: {
      userInfo,
      userList,
      footer,
    },

    data() {
      return {};
    },

    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },

    methods: {
      getUserInfo() {
        return stream.fetch({
          method: 'GET',
          type: 'json',
          url: `${__APIDIR}appapi/userinfo`,
          headers: {
            "token": __userToken,
          },
        }, res => {
          if (res.data.code === "1") {
            let data = res.data.result;
            this.mobile = data.mobile;
            this.gender = data.gender || this.gender;
            this.myHome = data.myHome;
            this.fullName = data.fullName;
            this.headImageUrl = data.headImageUrl;
          }
        });
      },
    },

    mounted() {
      this.$store.dispatch('getUserInfo');
    },
  };
</script>