<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

  export default {
    mounted () {
      this.$store.dispatch('getShopInfo');
    },
    components: {
      ShopHeader
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../common/sass/mixins";
  .tab{
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: 10px;
    line-height: 40px;
    height: 40px;
    background: #fff;
    @include bottom-border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      font-size: 14px;
      a {
        display: block;
        position: relative;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: #02a774;
          &::after{
            content: '';
            position: absolute;
            left :50%;
            bottom: 1px;
            width :35px;
            height: 2px;
            transform: translateX(-50%);
            background: #02a774;
          }
        }
      }
    }
  }

</style>
