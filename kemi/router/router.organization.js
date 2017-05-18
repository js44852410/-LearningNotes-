import organizationInfo from '../src/components/organization/organizationInfo.vue'; //机构详情
import organizationActivityList from '../src/components/organization/organizationActivityList.vue'; //机构活动列表

export const ORGANIZATION = [
  {
    path: '/organizationInfo/:id',
    name: 'organizationInfo',
    component: organizationInfo,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/organizationActivityList/:id',
    name: 'organizationActivityList',
    component: organizationActivityList,
    meta: {
      title: "科米熊",
    },
  },
];