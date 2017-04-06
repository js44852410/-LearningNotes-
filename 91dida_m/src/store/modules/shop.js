import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  shopInfo: {
    banner: '',
    logo: '',
  },
  shopCollectionList: [],
};
const getters = {
  shopBanner: state => state.shopInfo.banner,
  shopLogo: state => state.shopInfo.logo,
  shopName: state => state.shopInfo.store_name,
  shopPriceTips: state => state.shopInfo.starting_price_tips,
  shopCollection: state => state.shopInfo.is_collection,
  shopGoodsCategory: state => state.shopInfo.operation_category,
  shopIntroUrl: state => state.shopInfo.intro_url,
  shopTel: state => state.shopInfo.company_phone,

  shopCollectionList: state => state.shopCollectionList,
};

const actions = {
  /**
   * 获取店铺详细信息
   * @param {Number} id - 店铺ID.
   */
   getShopInfo({ commit, state }, id) {
     const body = { ...apis.GET_SHOP_INFO };
     body.store_id = id;
     self.DD.get(body, data => {
       if (data.result === 'success') {
         commit(types.GET_SHOP_INFO, data.info);
        //  this.setActiveShopInfo(data.info)
         self.DD.setTitle(data.info.store_name);
       } else {
         self.toast(data.info.errmsg);
       }
     });
   },

   /**
    * 店铺收藏与取消收藏
    * @param {Number} id - 店铺ID.
    * @param {Number} status - 1=>已收藏，0=>未收藏
    * @param {Number} type - 1=>店铺详情页，2=>个人店铺收藏列表页.
    * @param {Number} index - 在店铺收藏列表中, 操作的当前店铺在整个数组中的索引
    */
   toggleCollectionShop({ commit, state }, { id, status = 1, type = 2, index = 0 } = {}) {
     const body = { ...apis.TOGGLE_COLLECTION_SHOP };
     body.store_id = id;
     if (type === 1) {
       body.method = status? 'remove_store_wish': 'add_store_wish';
     }
     self.DD.post(body, data => {
       if (data.result === 'success') {
         let tips = '店铺取消收藏成功~';
         if (type === 1) {
           commit(types.TOGGLE_COLLECTION_SHOP);
           if (status === 0) {
             tips = '店铺收藏成功~';
           }
         } else {
           commit(types.REMOVE_COLLECTION_SHOP, index);
         }
         self.toast(tips);
       } else {
         self.toast(data.info.errmsg);
       }
     })
   },

   /**
    * 获取收藏的店铺列表
    */
   getCollectionShop({ commit, state }, vm) {
     const body = { ...apis.GET_COLLECTION_SHOP };
     body.page = vm.page + 1;
     self.DD.loading();
     self.DD.get(body, data => {
       vm.scrollToggle = true;
       if (data.result === 'success') {
        //  commit(types.GET_COLLECTION_SHOP, data.info.items);
         if (vm.loadingEl) {
           vm.loadingEl.style.display = 'none';
         }
         // 如果为第一页，是清空数据，大于1则是追加数据
         let append = false;
         if (vm.page > 0) {
           append = true;
         }
         commit(types.GET_COLLECTION_SHOP, {
           append,
           items: data.info.items
         });

         vm.page = data.info.page;
         vm.pageCount = data.info.pageCount;

         vm.loadingEl = self.document.createElement('div');
         vm.loadingEl.className = 'next-loading';
         vm.loadingEl.innerHTML = '努力加载中...';

         if (vm.page != vm.pageCount) {
           self.document.addEventListener('scroll', vm.next);
         } else {
           self.document.removeEventListener('scroll', vm.next);
         }
       } else {
         self.toast(data.info.errmsg);
       }
     });
   },
};

const mutations = {
  [types.GET_SHOP_INFO](state, payload) {
    state.shopInfo = {...payload};
  },
  [types.TOGGLE_COLLECTION_SHOP](state) {
    state.shopInfo.is_collection = +!state.shopInfo.is_collection;
  },
  [types.GET_COLLECTION_SHOP](state, { append = false, items = [] } = {}) {
    if (append) {
      state.shopCollectionList.push(...items);
    } else {
      state.shopCollectionList = items;
    }
  },
  [types.REMOVE_COLLECTION_SHOP](state, index) {
    state.shopCollectionList.splice(index, 1);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
