import contactsList from '../src/components/contacts/contacts-list.vue'; //联系人列表
import editContacts from '../src/components/contacts/edit-contacts.vue'; //增加、修改、删除联系人

export const CONTACTS = [
  {
    path: '/contactsList',
    name: 'contactsList',
    component: contactsList,
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
    path: '/editContacts',
    name: 'editContacts',
    component: editContacts,
    meta: {
      title: "科米熊",
    },
  },
];