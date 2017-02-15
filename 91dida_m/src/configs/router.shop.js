import Shop from '../components/shop/index.vue';
import ShopGoods from '../components/shop/indexGoods.vue';
// import ShopIndex from '../components/shop/indexHome.vue';
import ShopInfo from '../components/shop/info.vue';
import ShopList from '../components/shop/list.vue';
import ShopActivity from '../components/shop/activity.vue';

export const SHOP = [
  {
    path: '/shop/:shopId',
    name: 'shop',
    component: Shop,
    redirect: '/shop/:shopId/home',
    meta: {
      title: '店铺',
    },
    children: [
      {
        path: 'home',
        name: 'shopHome',
        component: ShopGoods,
        meta: {
          type: 'hot',
        },
      }, {
        path: 'all',
        name: 'shopAll',
        component: ShopGoods,
        meta: {
          type: '',
        }
      }, {
        path: 'new',
        name: 'shopNew',
        component: ShopGoods,
        meta: {
          type: 'new',
        }
      }, {
        path: 'hot',
        name: 'shopSpecial',
        component: ShopGoods,
        meta: {
          type: 'special_offer',
        }
      }
    ],
  }, {
    path: '/shop/info/:shopId',
    name: 'shopInfo',
    component: ShopInfo,
    meta: {},
  }, {
    path: '/shop',
    name: 'shopList',
    component: ShopList,
    meta: {
      title: '商家推荐',
    },
  }, {
    path: '/shop/activity/:id',
    name: 'shopActivity',
    component: ShopActivity,
    meta: {
      title: "活动简介",
    },
  }
];
