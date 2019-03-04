<template>
  <div>
    首页 <br>
    vuex中的count： {{count}}<br>
    <p style="margin-top: 1rem">
    	<button @click="add">点击+1</button>
    	<button @click="random">点击增加一个随机数</button>
    </p>

    <p style="margin-top: 1rem">
      <button @click="showTabBar">显示tabBar（vuex控制显示/隐藏状态）</button>
    </p>

    <p style="margin-top: 1rem">
      <button @click="hideTabBar">隐藏tabBar（vuex控制显示/隐藏状态）</button>
    </p>

    <p style="margin-top: 1rem">
      <button @click="goPath">测试goTo方法，去登录页面</button>
    </p>

    <p style="margin-top: 1rem">
      <button @click="getArtDetail">测试获取文章详情接口</button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticleDetail } from '@/assets/api/testAPI'
// import utils  from '@/utils'
// let { goTo } = utils;

export default {
  data () {
    return {
      aaa: {name: "llloop"}
    }
  },

  computed: {
    ...mapGetters([
      'count'
    ])
  },

  async created() {
    // let data = await getArticleDetail(78);
  },

	methods: {
    goPath() {
      this.goTo('/login', this.aaa);
    },
    async getArtDetail() {
      let data = await getArticleDetail(78);
      console.log(data);
    },
    // 显示底部tab
    showTabBar() {
      this.$store.dispatch("toggleTabBar", true);
    },
    // 隐藏底部tab
    hideTabBar() {
      // 触发actions的toggleTabBar
      this.$store.dispatch("toggleTabBar", false);
    },
    // goTo() {
    //   console.log(this);
    //   goTo('/login', this.aaa);
    // },
		add() {
			//触发actions中的add，触发的函数叫 dispatch
			this.$store.dispatch('add' , 1);

			this.texta = 'world'
		},

		random() {
			//传参
		  let random = parseInt(Math.random() * 5 + 5);
			this.$store.dispatch('add',random);
		}
	},
  mounted() {
  	// console.log(this.$store);
   //  console.log(this.count);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
