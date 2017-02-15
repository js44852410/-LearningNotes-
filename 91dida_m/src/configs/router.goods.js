import Info from '../components/goods/info.vue';
import Spec from '../components/goods/spec.vue';
import List from '../components/goods/list.vue';
import Filter from '../components/goods/filter.vue';
import Category from '../components/goods/category.vue';

export const GOODS = [
  {
    path: '/goods/info/:shopId/:goodsId',
    name: 'goodsInfo',
    component: Info,
    meta: {
      title: '商品详情',
    },
    children: [
      {
        path: 'spec',
        name: 'goodsSpec',
        component: Spec,
        meta: {
          title: '规格参数',
        },
      }
    ]
  }, {
    path: '/goods/list',
    name: 'goodsList',
    component: List,
    meta: {
      title: '商品列表',
    },
  }, {
    path: '/goods/filter',
    name: 'goodsFilter',
    component: Filter,
    meta: {
      title: '商品筛选',
    },
  }, {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      title: '商品分类',
    },
  }
];
