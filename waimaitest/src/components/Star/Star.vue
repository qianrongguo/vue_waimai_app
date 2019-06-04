<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
  // 类名常量
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
        starClasses(){
          const {score} = this;
          const scs = [];
          //向css中添加n个CLASS_ON
          const scoreInteger = Math.floor(score);
          for (let i=0;i < scoreInteger;i++){
            scs.push(CLASS_ON)
          }

          //向scs中添加0/1个CLASS_HALF
          if (score*10-scoreInteger*10>=5){
            scs.push(CLASS_HALF);
          }

          while(scs.length < 5){   //当scs小于5的时候，往scs添加CLASS_OFF类
            scs.push(CLASS_OFF)
          }
          return scs
        }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../common/sass/mixins";
  .star {
    float: left;
    font-size: 0;

    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    };

    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;

        &:last-child {
          margin-right: 0
        };

        &.on {
          @include bg-image('./images/star48_on@2x.png');
        };

        &.half {
          @include bg-image('./images/star48_half@2x.png');
        };

        &.off {
          @include bg-image('./images/star48_off@2x.png');
        }
      }
    };

    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;

        &:last-child {
          margin-right: 0;
        };

        &.on {
          @include bg-image('./images/star36_on@2x.png');
        };

        &.half {
          @include bg-image('./images/star36_half@2x.png');
        };

        &.off {
          @include bg-image('./images/star36_off@2x.png');
        }

      }
    };

    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;

        &:last-child {
          margin-right: 0;
        };

        &.on {
          @include bg-image('./images/star24_on@2x.png');
        };

        &.half {
          @include bg-image('./images/star24_half@2x.png');
        };

        &.off {
          @include bg-image('./images/star24_off@2x.png');
        }
      }
    };

  };
</style>
