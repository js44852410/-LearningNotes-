import home from '../src/components/home/home.vue'; //首页
import information from '../src/components/common/information.vue';//资讯详情页
import pre_information from '../src/components/common/pre_information.vue';//预览资讯详情页
import serviceAgreement from '../src/components/common/service-agreement.vue';//协议详情页
import feedback from '../src/components/common/feedback.vue';//意见反馈
import aboutUs from '../src/components/common/about-us.vue'; //关于我们
import comingSoon from '../src/components/common/comingSoon.vue';//敬请期待
import notFound from '../src/components/common/404.vue';//404

export const OTHERS = [
  {
    path: '/comingSoon',
    name: 'comingSoon',
    component: comingSoon,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/information/:getInfomationId',
    name: 'information',
    component: information,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/pre_information/:getInfomationId',
    name: 'pre_information',
    component: pre_information,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/serviceAgreement',
    name: 'serviceAgreement',
    component: serviceAgreement,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: aboutUs,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '*',
    name: '404',
    component: notFound,
    meta: {
      title: "404",
    },
  },
];