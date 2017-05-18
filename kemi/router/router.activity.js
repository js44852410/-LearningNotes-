import activityInfo from '../src/components/activity/info.vue'; //活动详情页
import pre_activityInfo from '../src/components/activity/pre_info.vue'; //活动详情页
import reviewList from '../src/components/activity/review-list.vue'; //历史活动列表
import reviewInfo from '../src/components/activity/review-info.vue'; //历史活动详情页
import pre_reviewInfo from '../src/components/activity/pre_review-info.vue'; //历史活动详情页

export const ACTIVITY = [
  {
    path: '/activityInfo/:activityID',
    name: 'activityInfo',
    component: activityInfo,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/pre_activityInfo/:activityID',
    name: 'pre_activityInfo',
    component: pre_activityInfo,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/reviewList',
    name: 'reviewList',
    component: reviewList,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/reviewInfo/:id',
    name: 'reviewInfo',
    component: reviewInfo,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/pre_reviewInfo/:id',
    name: 'pre_reviewInfo',
    component: pre_reviewInfo,
    meta: {
      title: "科米熊",
    },
  },
];