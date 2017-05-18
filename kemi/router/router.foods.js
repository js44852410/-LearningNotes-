import foodsList from '../src/components/healthy-foods/eatSearch.vue'; //能不能吃食物列表
import foodsDetail from '../src/components/healthy-foods/eatItemInfo.vue'; //食物详情
import pre_foodsDetail from '../src/components/healthy-foods/pre_eatItemInfo.vue'; //食物详情

export const FOODS = [
  {
    path: '/foodsList',
    name: 'foodsList',
    component: foodsList,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/foodsDetail',
    name: 'foodsDetail',
    component: foodsDetail,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/pre_foodsDetail',
    name: 'pre_foodsDetail',
    component: pre_foodsDetail,
    meta: {
      title: "科米熊",
    },
  },
];