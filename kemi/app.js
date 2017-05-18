import home from './src/foo.vue';
import router from './router/router';
import filter from './filter/filter';
import store from './vuex/store';

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.

/*eslint no-new: 0*/
new Vue(Vue.util.extend({ el: '#root', router, filter, store }, home));