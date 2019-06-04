<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
  import {mapActions, getCategorys} from 'vuex';
  import reqFoodCategorys from './api'

  import FooterGuide from './components/FooterGuide/FooterGuide'

  export default {
    name: 'App',
    components: {FooterGuide},

    methods: {
      ...mapActions(['getAddress','getCategorys','getShops','getUserInfo'])
    },
    mounted() {
      this.getAddress();
      this.getCategorys();
      this.getShops();
      this.getUserInfo()
    }

  }
</script>

<style lang="scss" type="text/scss">
  @import "../static/css/reset.css";

</style>
