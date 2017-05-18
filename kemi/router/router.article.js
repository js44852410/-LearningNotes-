/**
 * Created by liulipeng on 2017/5/18.
 */
import articleInfo from '../src/components/article/articleInfo.vue'; //文章详情

export const ARTICLE = [
  {
    path: '/articleInfo/:id',
    name: 'articleInfo',
    component: articleInfo,
    meta: {
      title: "科米熊",
    },
  },
];