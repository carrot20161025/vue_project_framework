<template>
  <div id="app">
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back"><!-- 返回 --></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <router-view/>
  
    <!-- 底部tabBar -->
    <Footer v-show="isShowTabbar" :footerList="footerList" :currentTab="currentTab" />
  </div>
</template>

<script>
import './assets/styles/App.less'
import Footer from '@/components/Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    
  },
  computed: {
    ...mapGetters([
      'isShowTabbar',
      'currentTab'
    ])
  },
  data() {
    return {
      footerList: [
        {
          id: 0,
          title: "在线微店",
          defaultIcon: "/static/images/tabBarIcons/zaixianweidianh@2x.png",
          activeIcon: "/static/images/tabBarIcons/zaixianweidianl@2x.png",
          path: '/'
        }, {
          id: 1,
          title: "动态发布",
          defaultIcon: "/static/images/tabBarIcons/dongtaih@2x.png",
          activeIcon: "/static/images/tabBarIcons/dongtail@2x.png",
          path: '/dynamic'
        }, {
          id: 2,
          title: "购物车",
          defaultIcon: "/static/images/tabBarIcons/gouwucheh@2x.png",
          activeIcon: "/static/images/tabBarIcons/gouwuchel@2x.png",
          path: '/shoppingCart'
        }, {
          id: 3,
          title: "个人中心",
          defaultIcon: "/static/images/tabBarIcons/gerenzhongxinh@2x.png",
          activeIcon: "/static/images/tabBarIcons/gerenzhongxinl@2x.png",
          path: '/myCenter'
        }
      ],
    }
  },
  methods: {
    
  },
  created() {
    //第一次加载或者每次刷新，均会进入，且只进入一次
    if(false) {
      //如果有token,表示当前是已登录
      //需要请求登录用户信息
      this.$store.dispatch('getUserInfo');

    }
  },
  mounted() {
    let _this = this
    // setInterval(function() {
    //   _this.currentTab = Math.floor(Math.random() * 4);
    // }, 1000)
  }
}
</script>

<style>

</style>
