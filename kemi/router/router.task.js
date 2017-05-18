import taskCenter from '../src/components/myTask/task-center.vue'; //任务中心
import taskList from '../src/components/myTask/task-list.vue'; //活动对应任务列表
import taskInfo from '../src/components/myTask/task-info.vue'; //任务详情

export const MYTASK = [
  {
    path: '/taskCenter',
    name: 'taskCenter',
    component: taskCenter,
    meta: {
      title: "科米熊",
    },
    beforeEnter: (to, from, next) => {
      if (!__userToken) {
        if (!__weiSurfaceId) {
          next(false);
        } else {
          next("/bindMobile");
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: taskList,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/taskInfo/:id',
    name: 'taskInfo',
    component: taskInfo,
    meta: {
      title: "科米熊",
    },
  },
];