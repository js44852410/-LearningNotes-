import Vuex from 'vuex';
import user from './modules/userInfo';
import order from './modules/order';
import activity from './modules/activity';
import preActivity from './modules/pre_activity';
import contacts from './modules/contacts';
import foods from './modules/foods';

export default new Vuex.Store({
  modules: {
    user,
    order,
    activity,
    preActivity,
    contacts,
    foods,
  },
});