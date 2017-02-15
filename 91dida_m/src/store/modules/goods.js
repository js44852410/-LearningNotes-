import * as types from '../mutation-types';
import * as apis from '../apis';

const state = {
  collection: {
    goodsCollectionList: [],
    goodsCollectionToastToggle: false,
    activeGoodsCollection: {},
    activeIndex: -1,
  },
  filter: {
    category: [],
    brand: {},
    attributes: {},
    currentId: 0,
    brandId: 0,
    attr: {}
  }
};
const getters = {
  goodsCollectionList: state => state.collection.goodsCollectionList,
  goodsCollectionToastToggle: state => state.collection.goodsCollectionToastToggle,
  activeGoodsCollection: state => state.collection.activeGoodsCollection,
  filterCategory: state => state.filter.category,
  filterBrand: state => state.filter.brand,
  filterAttributes: state => state.filter.attributes,
  filterCurrentId: state => state.filter.currentId,
  filterBrandId: state => state.filter.brandId,
  filterAttr: state => state.filter.attr,
};

const actions = {
  /**
   * 商品筛选
   */
  getFilterGoods({ commit, state }) {
    const body = { ...apis.GET_FILTER_GOODS };
    self.DD.loading();
    self.DD.get(body, data => {
      if (data.result === 'success') {
        const payload = {
          category: [],
          brand: {},
          attributes: {},
          currentId: {},
        }
        data.info.map(items => {
          let brand = []
          payload.category.push({
            category_label: items.category_label,
            entity_id: items.entity_id
          });
          items.brand.map(item => {
            item.checked = false;
          });
          items.attributes.map(item => {
            item.values.map(attr => {
              attr.checked = false;
            });
          });
          payload.brand[items.entity_id] = items.brand;
          payload.attributes[items.entity_id] = items.attributes;
        });

        payload.currentId = payload.category[0].entity_id;
        commit(types.GET_FILTER_GOODS, payload);
      } else {
        self.toast(data.info.errmsg);
      }
    })
  },
  /**
   * 设置当前分类的ID
   */
  toggleFilterCategory({ commit, state }, id) {
    commit(types.TOGGLE_FILTER_CATEGORY, id);
  },
  toggleFilterBrand({ commit, state }, index) {
    commit(types.TOGGLE_FILTER_BRAND, index);
  },
  toggleFilterAttr({ commit, state }, { parentId = 0, activeIndex = -1 } = {}) {
    commit(types.TOGGLE_FILTER_ATTR, {
      parentId,
      activeIndex
    });
  },
  /**
   * 商品收藏与取消收藏
   * @param {Number} id - 商品ID.
   * @param {Number} status - 1=>已收藏，0=>未收藏
   * @param {Number} type - 1=>商品详情页，2=>个人商品收藏列表页.
   */
  toggleCollectionGoods({ commit, state }, { id, status = 1, type = 2, callback } = {}) {
    const body = {...apis.TOGGLE_COLLECTION_GOODS};
    const index = state.collection.activeIndex;
    body.store_product_id = id;
    if (type === 1) {
      body.method = status? 'remove_wisth_store_product': 'add_wish_store_product';
    }

    self.DD.post(body, (data) => {
      if (data.result === 'success') {
        let tips = '商品取消收藏成功~';
        if (type === 1) {
          callback();
          if (status === 0) {
            tips = '商品收藏成功~';
          }
        } else {
          // type === 2时为个人收藏的商品列表页
          // 只要触发这个方法，就一定有 activeIndex 值，并且遮罩一定是显示的
          // 所以这里要隐藏遮罩，并且从收藏列表中移除当前的
          commit(types.REMOVE_COLLECTION_GOODS, index);
          commit(types.ACTIVE_COLLECTION_GOODS);
        }
        self.toast(tips);
      } else {
        self.toast(data.info.errmsg);
      }
    });
  },

  /**
   * 获取收藏的商品列表
   */
  getCollctionGoods({ commit }, vm) {
    const body = {...apis.GET_COLLECTION_GOODS};
    body.page = vm.page + 1;
    self.DD.loading();
    self.DD.get(body, data => {
      vm.scrollToggle = true;
      if (data.result === 'success') {
        if (vm.loadingEl) {
          vm.loadingEl.style.display = 'none';
        }
        // 如果为第一页，是清空数据，大于1则是追加数据
        let append = false;
        if (vm.page > 0) {
          append = true;
        }
        commit(types.GET_COLLECTION_GOODS, {
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

  /**
   * 当前收藏的商品
   */
   activeCollectionGoods({ commit }, { vm = {}, index = -1 } = {}) {
     commit(types.ACTIVE_COLLECTION_GOODS, {
       vm,
       index
     });
   },

   /**
    * 获取商品列表
    * @param {Object} options - 各种筛选条件
    * @param {Object} options.attribute - 属性条件，在商品分类页用得到
    * @param {Number} options.brand_id - 品牌id
    * @param {Number} options.category_id - 分类id
    * @param {Boolean} [options.is_list = 0] - 默认0 此值用于sql优化，当列表页使用时请传1,否则keywords和attribute将失效
    * @param {Number} options.is_top - 是否置顶（用于首页显示，当传此值后，配合type条件首页使用）
    * @param {String} options.keywords - 关键字搜索
    * @param {Number} options.max_price - 价格区间搜索 最大价格
    * @param {Number} options.min_price - 价格区间搜索 最小价格
    * @param {Array} options.not_store_product_id - 排除的店铺商品id;
    * @param {String} [options.order = 'updated_at'] - 排序字段，取值: 更新时间 -> 'updated_at' OR 价格 -> 'final_price' OR 销量 -> 'sell_num'
    * @param {String} [options.order_type = 'desc'] - 排序类型，'desc' OR 'asc'
    * @param {Number} [options.page = 1] - 显示的页码
    * @param {Number} [options.pagesize = 10] - 每页显示的条数
    * @param {String} options.sku - 提供给app条码扫描使用
    * @param {Number} options.store_id - 卖家id 非必填（用于指定店铺显示）
    * @param {String} options.type - 定值，特价 -> 'special_offer' OR 推荐 -> 'hot' 新品 -> 'new'
    * @param {Function} callback - 成功执行的回调.
    */
   getGoodsList({ commit }, {
     attribute = [],
     brand_id = '',
     category_id = '',
     is_list = 1,
     is_top = '',
     keywords = '',
     max_price = '',
     min_price = '',
     not_store_product_id = '',
     order = '',
     order_type = '',
     page = 1,
     pagesize = 10,
     sku = '',
     store_id = '',
     type = '',
     callback = ''
   } = {}) {
     const body = {
       api: 'store_product',
       method: 'get_product',
       attribute,
       brand_id,
       category_id,
       is_list,
       is_top,
       keywords,
       max_price,
       min_price,
       not_store_product_id,
       order,
       order_type,
       page,
       pagesize,
       sku,
       store_id,
       type
     };

     self.DD.loading();
     self.DD.get(body, (data) => {
       if (data.result === 'success' && typeof callback === 'function') {
         callback(data.info);
       } else {
         self.toast(data.info.errmsg);
       }
     })
   }
};

const mutations = {
  [types.GET_FILTER_GOODS](state, payload) {
    state.filter.category = payload.category;
    state.filter.brand = payload.brand;
    state.filter.attributes = payload.attributes;
    state.filter.currentId = payload.currentId;
  },
  [types.TOGGLE_FILTER_CATEGORY](state, id) {
    state.filter.currentId = id;
    state.filter.brandId = 0;
    state.filter.attr = {};
  },
  [types.TOGGLE_FILTER_BRAND](state, activeIndex) {
    const brand = state.filter.brand;
    const categoryId = state.filter.currentId;
    brand[categoryId].map((item, index) => {
      if (activeIndex === index) {
        if (item.checked) {
          item.checked = false;
          state.filter.brandId = 0;
        } else {
          item.checked = true;
          state.filter.brandId = item.brand_id;
        }
      } else {
        item.checked = false;
      }
    });
  },
  [types.TOGGLE_FILTER_ATTR](state, { parentId = 0, activeIndex = -1 } = {}) {
    const attributes = state.filter.attributes;
    const categoryId = state.filter.currentId;
    const attr = state.filter.attr;
    attributes[categoryId].map(items => {
      if (items.attribute_id === parentId) {
        items.values.map((item, index) => {
          if (activeIndex === index) {
            if (item.checked) {
              item.checked = false;
              delete state.filter.attr[parentId];
            } else {
              item.checked = true;
              state.filter.attr[parentId] = item.k;
            }
          } else {
            item.checked = false;
          }
        });
      }
    });
  },
  [types.ACTIVE_COLLECTION_GOODS](state, { vm = {}, index = -1 } = {}) {
    state.collection.activeGoodsCollection = vm;
    state.collection.activeIndex = index;
    state.collection.goodsCollectionToastToggle = !state.collection.goodsCollectionToastToggle;
  },
  [types.GET_COLLECTION_GOODS](state, { append = false, items = [] } = {}) {
    if (append) {
      state.collection.goodsCollectionList.push(...items);
    } else {
      state.collection.goodsCollectionList = items;
    }
  },
  [types.REMOVE_COLLECTION_GOODS](state, index) {
    state.collection.goodsCollectionList.splice(index, 1);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
