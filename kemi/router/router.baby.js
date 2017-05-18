import babyList from '../src/components/baby/baby-list.vue'; //宝宝列表
import editBaby from '../src/components/baby/edit-baby.vue'; //增加、修改、删除宝宝
import changeBabyMessage from '../src/components/baby/change-baby-message.vue'; //修改宝宝信息

export const BABY = [
  {
    path: '/babyList',
    name: 'babyList',
    component: babyList,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/editBaby',
    name: 'editBaby',
    component: editBaby,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/changeBabyMessage',
    name: 'changeBabyMessage',
    component: changeBabyMessage,
    meta: {
      title: "科米熊",
    },
  },
];