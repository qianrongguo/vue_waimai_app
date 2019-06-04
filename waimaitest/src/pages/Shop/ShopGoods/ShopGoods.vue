<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul >
        <li class="menu-item"  v-for="(good,index) in goods" :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper">
      <ul ref="foodsUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :Key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item"  v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart />
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'

  export default {
    data() {
      return {
        food: {}, // 需要显示的food，刚开始不确定类型写成对象
        scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
        tops:[]   // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      }
    },
    mounted() {
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick(()=>{    //等到数据更新后加载
          this._initScroll();
          this._initTops()
        })   //数据更新显示后回调
      })
    },
    computed: {
      ...mapState(['goods']),
      //计算得到当前分类的下标
      currentIndex(){  //初始和相关数据发生了变化=
        const {scrollY,tops} = this;
        //根据条件产生一个结果
        const index = tops.findIndex((top,index) => {
          //scrollY >= top && scrollY < tops[index+1]
          return scrollY >= top && scrollY < tops[ index + 1]   //返回符合条件的坐标
        });
        console.log(index,'9999999999');
        return index;
      }
    },
    methods:{
      //放事件回调的方法
      //初始化滚动条
      _initScroll(){
        new BScroll('.menu-wrapper',{   //分类
          click:true,
          scrollY: true,     //纵向滚动
          scrollbar: {fade:true,interactive:false}   //显示滚动条

        });
        this.foodScroll = new BScroll('.food-wrapper',{
          probeType: 2,  // 因为惯性滑动不会触发
          click: true,
        })   //实例化BScroll
        //绑定监听
        this.foodScroll.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y);   //手机坐标
          // console.log(this.scrollY,'========')
        });
        // 给右侧列表绑定scroll结束的监听   惯性滑动中间坐标不取值，只要结尾的值
        this.foodScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },
      _initTops(){
        const tops = [];   //初始化tops
        let top = 0;
        tops.push(top);
        //找到所有分类的li
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        //更新数据
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight;
          tops.push(top)
        });
        //更新数据
        this.tops = tops
        console.log(tops)
      },

      clickMenuItem(index){
        //先得到目标位置scrollY
        const scrollY = this.tops[index];
        console.log(scrollY,'++++++++');
        //立即更新scrollY(点击分类称为当前分类）
        this.scrollY = scrollY;    //为了让滚动反应快点
        this.foodScroll.scrollTo(0,-scrollY,300)
      },

      showFood(food){
        //设置food
        this.food = food;
        // 显示food组件 (在父组件中调用子组件对象的方法)
        this.$refs.food.toggleShow()
      }
    },
    components:{CartControl,Food,ShopCart}
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../../common/sass/mixins';
  .goods{
    display: flex;
    position: absolute;
    top: 195px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .menu-wrapper{
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item{
          display: table;
          height: 54px;
          width: 80px;
          padding: 0 12px;
          line-height: 14px;
          &.current{
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background-color: #fff;
            color: $green;
            font-weight: 700;
            .text{
              /*border-none()*/
            }
          };
          .text{
            display: table-cell;
            width: 56px;
            vertical-align: middle;
            @include bottom-border-1px(rgba(7,17,27,0.1));
            font-size: 12px;
            .icon{
              display: inline-block;
              vertical-align: top;
              width: 12px;
              height: 12px;
              margin-right: 2px;
              background-size: 12px 12px;
              background-repeat: no-repeat;
          };
          }
      }
    };
    .food-wrapper{
      flex: 1;
      .food-list-hook{
        .title{
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: rgb(147,153,159);
          background: #f3f5f7;
        }
        .food-item{
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          @include bottom-border-1px(rgba(7,17,27,0.1));
          &:last-child{
            margin-bottom: 0;
          };
          .content{
            flex: 1;
            .name{
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            };
            .desc,.extra{
              font-size: 10px;
              color: rgb(147,153,159);
            };
            .desc{
              line-height: 12px;
              margin-bottom: 8px;
            };
            .extra{
              line-height: 10px;
              .count{
                margin-right: 12px;
              }
            };
            .price{
              line-height: 24px;
              .now{
                font-weight: 700;
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240,20,20);
              };
              .old{
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147,153,159);
              }
            };
            .cartcontrol-wrapper{
              position: absolute;
              right: 0;
              bottom: 12px;
            }

          }
          .icon{
            flex: 0 0 57px;
            margin-right: 10px;
          }
        }
      }
    }
  }


</style>
