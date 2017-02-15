import User from '../components/user/index.vue';
import Login from '../components/user/login.vue';
import Register from '../components/user/register.vue';
import RegisterInfo from '../components/user/registerInfo.vue';
import Agreement from '../components/user/agreement.vue';
import Pending from '../components/user/pending.vue';
import Unpass from '../components/user/unpass.vue';
import FindPassWord from '../components/user/findPassWord.vue';
import UserInfo from '../components/user/info.vue';
import UserInfoEdit from '../components/user/edit.vue';
import Set from '../components/user/set.vue';
import Message from '../components/user/message.vue';
import MyCollection from '../components/user/collection.vue';
import CollectionGoods from '../components/user/collectionGoods.vue';
import CollectionShop from '../components/user/collectionShop.vue';
import MyAmount from '../components/user/myAmount.vue';

export const USER = [
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '个人中心',
    }
  }, {
    path: '/user/info',
    name: 'userInfo',
    component: UserInfo,
    meta: {
      title: '个人资料',
    },
    children: [
      {
        path: 'name',
        name: 'userInfoName',
        component: UserInfoEdit,
        meta: {
          title: '买家名称',
          field: 'company_name',
          placeholder: '请输入买家名称',
        }
      }, {
        path: 'shorthand',
        name: 'userInfoShorthand',
        component: UserInfoEdit,
        meta: {
          title: '买家简称',
          field: 'company_short_name',
          placeholder: '请输入买家简称',
        }
      }, {
        path: 'mobile',
        name: 'userInfoMobile',
        component: UserInfoEdit,
        meta: {
          title: '联系电话',
          field: 'linkman_phone',
          placeholder: '请输入联系电话',
        }
      }, {
        path: 'street',
        name: 'userInfoStreet',
        component: UserInfoEdit,
        meta: {
          title: '运营地址',
          field: 'operation_address_street',
          review: true,
          placeholder: '请输入运营地址',
        }
      }, {
        path: 'linkman',
        name: 'userInfoLinkman',
        component: UserInfoEdit,
        meta: {
          title: '公司联系人',
          field: 'linkman',
          placeholder: '请输入公司联系人',
        }
      }, {
        path: 'license',
        name: 'userInfoLicense',
        component: UserInfoEdit,
        meta: {
          title: '营业执照',
          field: 'business_license',
          review: true,
        }
      }, {
        path: 'person',
        name: 'userInfoPerson',
        component: UserInfoEdit,
        meta: {
          title: '企业法人',
          field: 'legal_person',
          review: true,
          placeholder: '请输入企业法人',
        }
      }, {
        path: 'ids',
        name: 'userInfoIds',
        component: UserInfoEdit,
        meta: {
          title: '法人身份证',
          field: 'identity_card_1',
        }
      }
    ]
  }, {
    path: '/user/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    }
  }, {
    path: '/user/set',
    name: 'set',
    component: Set,
    meta: {
      title: '设置',
    }
  }, {
    path: '/user/message',
    name: 'message',
    component: Message,
    meta: {
      title: '意见反馈',
    }
  }, {
    path: '/user/register',
    name: 'register',
    component: Register,
    meta: {
      title: '买家注册',
    },
    children: [
      {
        path: 'info',
        name: 'registerInfo',
        component: RegisterInfo,
        meta: {
          title: '完善信息',
        }
      }, {
        path: 'agreement',
        name: 'agreement',
        component: Agreement,
        meta: {
          title: '买家用户协议',
        }
      }
    ]
  }, {
    path: '/user/pending',
    name: 'pending',
    component: Pending,
    meta: {
      title: '待审核',
    }
  }, {
    path: '/user/unpass',
    name: 'unpass',
    component: Unpass,
    meta: {
      title: '未通过审核',
    }
  }, {
    path: '/user/find',
    name: 'findPassWord',
    component: FindPassWord,
    meta: {
      title: '找回密码',
    }
  }, {
    path: '/user/collection',
    name: 'myCollection',
    component: MyCollection,
    meta: {
      title: '我的收藏',
    },
    children: [
      {
        path: 'goods',
        name: 'myCollectionGoods',
        component: CollectionGoods,
      }, {
        path: 'shop',
        name: 'myCollectionShop',
        component: CollectionShop,
      }
    ]
  }, {
    path: '/user/amount',
    name: 'myAmount',
    component: MyAmount,
    meta: {
      title: '我的零钱',
    }
  }
];
