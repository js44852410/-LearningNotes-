// 登录
export const LOGIN = {
  api: 'customer',
  method: 'set_customer_login',
  is_remember: 0,
  mobile: '',
  password: '',
}

// 退出登录
export const LOGOUT = {
  api: 'customer',
  method: 'set_buyer_logout'
}

// 添加商品到购物车中
export const ADD_TO_CART = {
  api: 'checkout_cart',
  method: 'add_to_cart',
  qty: 1,
  store_product_id: 0,
}

// 获取购物车列表
export const GET_CART_LIST = {
  api: 'checkout_cart',
  method: 'get_cart_items',
}

// 商品筛选
export const GET_FILTER_GOODS = {
  api: 'catalog_category',
  method: 'get_category_item_by_parentid',
  attributes: 1,
  brand: 1,
}

// 获取购物车商品数量
export const GET_CART_COUNT = {
  'api': 'checkout_cart',
  'method': 'get_cart_num'
}

// 购物车列表页操作(添加、减少、删除、选择、全选等)
export const OPTIONS_CART = {
  api: 'checkout_cart',
  method: 'toggle_cart',
  store_product_ids: [],
}

// 商品详情
export const GET_PRODUCT_INFO = {
  api: 'store_product',
  method: 'get_store_product_info',
  store_id: 0,
  store_product_id: 0
}

// 商品收藏与取消收藏
export const TOGGLE_COLLECTION_GOODS = {
  api: 'store_product',
  method: 'remove_wisth_store_product',
  // remove_wisth_store_product 取消收藏
  // add_wish_store_product 收藏
  store_product_id: 0,
}

// 获取收藏的商品列表
export const GET_COLLECTION_GOODS = {
  api: 'store_product',
  method: 'get_wish_store_product'
}

// 获取店铺信息
export const GET_SHOP_INFO = {
  api: 'store',
  method: 'home',
  store_id: 0,
}

// 店铺收藏与取消收藏
export const TOGGLE_COLLECTION_SHOP = {
  api: 'favorites',
  method: 'remove_store_wish',
  // 'remove_store_wish': 'add_store_wish'
  store_id: 0
}

// 获取收藏的店铺列表
export const GET_COLLECTION_SHOP = {
  api: 'favorites',
  method: 'get_store_wish',
}

// 商品结算
export const SETTLEMENT = {
  api: 'checkout_cart',
  address_id: 0,
  pay_method: '',
  is_clear_coupon: 0,
  is_use_pocket: 0,
  method: 'goods_settlement',
  type: ''
}

// 创建订单
export const CREATED_NEW_ORDER = {
  api: 'sales_order',
  method: 'add_order_item',
  address_id: 0,
  goods: {},
  type: 1,
  pay_method: '',
  comments: {},
  coupon_detail_ids: {},
  use_pocket_money: 0,
}

// 获取订单列表
export const GET_ORDER_LIST = {
  api: 'sales_order',
  method: 'get_buyer_order_items',
  max_grand_total: '',
  min_grand_total: '',
  ordered_end: '',
  ordered_start: '',
  page: 0,
  pagesize: '',
  store_name: '',
  status: 0,
}

// 获取在线支付的订单列表
export const  GET_ON_LINE_ORDER ={
  api: 'sales_order',
  method: 'get_online_checkout_items',
  order_ids: 0
}

// 确认收货
export const CONFIRM_RECEIPT = {
  api: 'sales_order',
  method: 'set_order_cfm_receiving',
  id: 0
}

// 获取退货原因列表
export const GET_REFUND_REASON = {
  api: 'sales_order',
  method: 'get_refund_reason_items'
}

// 提交退货申请
export const SUBMIT_REFUND = {
  api: 'sales_order',
  method: 'application_refund_order',
  id: 0,
  comment: '',
  reason_id: 0
}

// 假货先赔
export const APPLY_COMPENSATION = {
  api: 'sales_order',
  method: 'set_order_fake',
  id: 0
}

// 取消订单
export const CANCEL_ORDER = {
  api: 'sales_order',
  method: 'set_order_canceled',
  id: 0,
}

// 选择优惠券
export const CHOOSE_COUPON = {
  api: 'coupon',
  method: 'choose_coupon',
  pay_method: '',
  product_info: {}
}

// 占领优惠券
export const OCCUPY_CHOOSE_COUPON = {
  api: 'coupon',
  method: 'order_occupy_coupon',
  coupon_detail_id: 0
}

// 我的优惠券
export const GET_MY_COUPON_LIST = {
  api: 'coupon',
  method: 'get_coupon_items_buyer',
  type: 0,
}

// 添加优惠券
export const ADD_COUPON = {
  api: 'coupon',
  method: 'user_bind_coupon',
  coupon_sn: '',
}

// 获取地址列表
export const GET_ADDRESS_LIST = {
  api: 'customer_address',
  method: 'get_address_items',
}

// 删除一条收货地址
export const DELETE_ITEM_ADDRESS = {
  api: 'customer_address',
  method: 'remove_address_item',
  id: 0,
}

// 设为默认地址
export const SET_DEFAULT_ADDRESS = {
  api: 'customer_address',
  method: 'set_default_address',
  id: 0,
}

// 获取省市区
export const GET_REGION_LIST = {
  api: 'system',
  method: 'get_region_list',
  parent_id: 0
}

// 添加收货地址
export const ADD_ADDRESS = {
  api: 'customer_address',
  method: 'add_address_item',
}

// 编辑收货地址
export const EDIT_ADDRESS = {
  api: 'customer_address',
  method: 'edit_address_item',
  id: 0,
}

// 获取用户的详细资料
export const GET_USER_INFO = {
  api: 'customer',
  method: 'get_buyer_info',
}

// 设置用户头像
export const SET_USER_HEAD_IMG = {
  api: 'customer',
  method: 'set_buyer_avatar',
  avatar: '',
}
