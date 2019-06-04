// 包含多个state的getter计算属性的对象

export default {
  totalPrice (state) {   // 购物车总价格
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  totalCount (state) {   // 购物车总数量
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  positiveSize (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1:0) , 0)
  }
}
