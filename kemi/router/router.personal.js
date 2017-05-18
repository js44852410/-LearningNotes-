import personalCenter from '../src/components/personal/personal-center.vue'; //个人中心
import editPersonal from '../src/components/personal/edit-personal.vue'; //个人信息详情
import changePersonalMessage from '../src/components/personal/change-personal-message.vue'; //修改个人信息

export const PERSONAL = [
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: personalCenter,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/editPersonal',
    name: 'editPersonal',
    component: editPersonal,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/changePersonalMessage',
    name: 'changePersonalMessage',
    component: changePersonalMessage,
    meta: {
      title: "科米熊",
    },
  },
];