/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  // 根据经纬度获取位置详情
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  // 2、获取食品分类列表
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  // 3、根据经纬度获取商铺列
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  // 重置用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  // 接受商家信息
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  // 接收商家评价数组
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  // 接收商品数组
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  // 增加食物数量
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (!food.count) {
      // 对象，属性名，属性值
      Vue.set(food, 'count', 1);   // 让新增属性也有数据绑定
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减少food中的count
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--;
      if (food.count === 0) {
        state.cartFoods.slice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  // 清空购物车
  [CLEAR_CART](state) {
    // 清除food中的count
    state.cartFoods.forEach(food => food.count = 0)
    state.cartFoods = []
  },
  // 接收搜索的商家数组
  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  }
}
