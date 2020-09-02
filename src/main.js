import Vue from 'vue';
import App from './App';
import api from './api/index';
import ClassItem from './components/classItem/class.vue';
import Nav from './components/navbar/nav.vue';
import Buy from './components/buyUserShow/buy.vue';
import Atc from './components/artItem/atc.vue';
import Uparse from './components/gaoyia-parse/parse.vue';
Vue.component('Nav', Nav); // 导航组件
Vue.component('ClassItem', ClassItem); // 分类组件
Vue.component('Buy', Buy); // 买家秀组件
Vue.component('Atc', Atc); // 相关文章组件
Vue.component('Uparse', Uparse); // 富文本显示组件

Vue.config.productionTip = false;
Vue.prototype.$api = api;
App.mpType = 'app';
const app = new Vue({
  ...App
})
app.$mount()
