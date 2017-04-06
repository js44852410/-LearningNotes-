import List from '../components/address/list.vue';
import Add from '../components/address/add.vue';

export const ADDRESS = [
  {
    path: '/address',
    name: 'addressList',
    component: List,
    meta: {
      title: "收货地址管理",
    },
  }, {
    path: '/address/add',
    name: 'addressAdd',
    component: Add,
    meta: {
      title: "新增收货地址",
    },
  }, {
    path: '/address/edit/:addressId',
    name: 'addressEdit',
    component: Add,
    meta: {
      title: "编辑收货地址",
    },
  }
];
