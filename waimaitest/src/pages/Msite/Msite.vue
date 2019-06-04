<template>
  <section class="msite">
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont iconsoushuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? 'userInfo.name':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont iconuser-copy"></i>
        </span>
      </router-link>
    </HeaderTop>
    <div class="msite-content-wrapper">
      <div class="msite-content">
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
      </div>
    </div>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop';
  import ShopList from '../../components/ShopList/ShopList';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex';


  export default {
    data() {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {HeaderTop, ShopList},

    computed: {
      ...mapState(['address', 'categorys','userInfo']),
      /*
      根据categorys一维数组生成一个2维数组
      小数组中的元素个数最大是8
      //  */
      categorysArr() {
        let {categorys} = this;
        // console.log(categorys.length,'8888888');
        // 准备空的2维数组
        const arr = [];
        // 准备一个小数组(最大长度为8)
        let minArr = [];
        // 遍历categorys
        categorys.forEach(c => {

          // 如果当前小数组已经满了, 创建一个新的
          if (minArr.length === 8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        });

        return arr
      }

    },
    methods: {},
    watch: {
      categorys(value) { // categorys数组中有数据了, 在异步更新界面之前执行
        // 使用setTimeout可以实现效果, 但不是太好
        /*setTimeout(() => {
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        }, 100)*/

        // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
          // new BScroll('.miste-content-wrapper', {
          //   click: true
          // })
        })
      }
    },
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../common/sass/mixins";

  .msite {
    width: 100%;

    .msite_header {
      background-color: #02a774;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 45px;

      .header_search {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10%;
        /*height: 50%;*/
        .icon-sousuo {
          font-size: 25px;
          color: #fff;
        }

      }
    ;

      .header_title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;

        .header_title_text {
          font-size: 20px;
          color: #fff;
          display: block;
        }
      ;
      }
    ;

      .header_login {
        font-size: 14px;
        color: #fff;
        position: absolute;;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);

        .header_login_text {
          color: #fff;
        }
      }
    }
  ;

    .msite_nav {
      @include bottom-border-1px(#e4e4e4);
      margin-top: 45px;
      height: 200px;
      background: #fff;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-wrapper {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;

            .link_to_food {
              width: 25%;

              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;

                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }
            ;

              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }
      ;

        .swiper-pagination {
          > span.swiper-pagination-bullet-active {
            background: #02a774;
          }
        }
      }
    }

    .msite_shop_list {
      @include top-border-1px(#e4e4e4);
      margin-top: 10px;
      background: #fff;

      .shop_header {
        padding: 10px 10px 0;

        .shop_icon {
          margin-left: 5px;
          color: #999;
        }
      ;

        .shop_header_title {
          color: #999;
          font-size: 14px;
          line-height: 20px;
        }
      ;
      }
    ;

      .shop_container {
        margin-bottom: 50px;

        .shop_list {
          .shop_li {
            @include bottom-border-1px(#f1f1f1);
            width: 100%;

            > a {
              @include clearFix();
              display: block;
              box-sizing: border-box;
              padding: 15px 8px;
              width: 100%;

              .shop_left {
                float: left;
                box-sizing: border-box;
                width: 23%;
                height: 75px;
                padding-right: 10px;

                .shop_img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            ;

              .shop_right {
                float: right;
                width: 77%;

                .shop_detail_header {
                  @include clearFix();
                  width: 100%;

                  .shop_title {
                    float: left;
                    width: 200px;
                    color: #333;
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 700;

                    &::before {
                      content: '品牌';
                      display: inline-block;
                      font-size: 11px;
                      line-height: 11px;
                      color: #333;
                      background-color: #ffd930;
                      padding: 2px 2px;
                      border-radius: 2px;
                      margin-right: 5px;
                    }
                  }
                ;

                  .shop_detail_ul {
                    float: right;
                    margin-top: 3px;

                    .supports {
                      float: left;
                      font-size: 10px;
                      color: #999;
                      border: 1px solid #f1f1f1;
                      padding: 0 2px;
                      border-radius: 2px;
                    }
                  }
                }
              ;

                .shop_rating_order {
                  @include clearFix();
                  width: 100%;
                  margin-top: 18px;
                  margin-bottom: 8px;

                  .shop_rating_order_left {
                    float: left;
                    color: #ff9a0d;

                    .rating_section {
                      float: left;
                      font-size: 10px;
                      color: #ff6000;
                      margin-left: 4px;
                    }
                  ;

                    .order_section {
                      float: left;
                      font-size: 10px;
                      color: #666;
                      transform: scale(.8);
                    }
                  }
                ;

                  .shop_rating_order_right {
                    float: right;
                    font-size: 0;

                    .delivery_style {
                      transform-origin: 35px 0;
                      transform: scale(.7);
                      display: inline-block;
                      font-size: 12px;
                      padding: 1px;
                      border-radius: 2px;
                    }
                  ;

                    .delivery_left {
                      color: #fff;
                      margin-right: -10px;
                      background-color: #02a774;
                      border: 1px solid #02a774;
                    }
                  ;

                    .delivery_right {
                      color: #02a774;
                      border: 1px solid #02a774;
                    }
                  }
                }
              ;

                .shop_distance {
                  @include clearFix();
                  width: 100%;
                  font-size: 12px;

                  .shop_delivery_msg {
                    float: left;
                    transform-origin: 0;
                    transform: scale(.9);
                    color: #666;
                  }
                ;

                  .segmentation {
                    color: #ccc;
                  }
                }
              }
            }
          ;

          }
        }
      }
    }
  ;

  }
</style>
