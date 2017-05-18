import collection from "../src/components/collection/collection-page.vue";  //我的收藏页
import content from "../src/components/collection/content.vue";             //收藏内容页
import teacher from "../src/components/collection/teacher.vue";            //收藏老师页
import mechanism from "../src/components/collection/mechanism.vue";       //收藏机构页

export const COLLECTION = [
  {
    path: '/collection',
    name: 'collection',
    component: collection,
    redirect: {name: "content"},
    meta: {
      title: "科米熊",
    },
    children: [
      {
        path: 'content',
        name: 'content',
        component: content,
        meta: {
          title: "科米熊",
        },
      },
      {
        path: 'teacher/',
        name: 'teacher',
        component: teacher,
        meta: {
          title: "科米熊",
        },
      },
      {
        path: 'mechanism/',
        name: 'mechanism',
        component: mechanism,
        meta: {
          title: "科米熊",
        },
      },
    ],
  },
];