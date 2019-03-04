// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入axios
import axios from './http'
Vue.prototype.$http = axios;

// 按需引入mint-ui
import 'mint-ui/lib/style.css'
import { 
  Tabbar,
  TabItem,
  Header,
  Button,
} from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

// 完整按需引入mint-ui
// import Mint from 'mint-ui';
// Vue.use(Mint);

//引入工具库
import './utils.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
