import commentList from '../src/components/comment/commentList.vue'; //我的评价列表
import publishComment from '../src/components/comment/publishComment.vue'; //发表评论

export const COMMENT = [
  {
    path: '/commentList',
    name: 'commentList',
    component: commentList,
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
    path: '/publishComment',
    name: 'publishComment',
    component: publishComment,
    meta: {
      title: "科米熊",
    },
  },
];