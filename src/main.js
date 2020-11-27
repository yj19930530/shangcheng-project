import Vue from 'vue';
import App from './App';
import api from './api/index';
import ClassItem from './components/classItem/class.vue';
import Nav from './components/navbar/nav.vue';
import Buy from './components/buyUserShow/buy.vue';
import Atc from './components/artItem/atc.vue';
import Uparse from './components/gaoyia-parse/parse.vue';
import uniSection from './components/uni-section/uni-section.vue';
import uniSwipeAction from './components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from './components/uni-swipe-action-item/uni-swipe-action-item.vue'
import uniSteps from './components/uni-steps/uni-steps.vue';
import Water from './components/waterItem/water.vue';
Vue.component('Nav', Nav); // 导航组件
Vue.component('ClassItem', ClassItem); // 分类组件
Vue.component('Buy', Buy); // 买家秀组件
Vue.component('Atc', Atc); // 相关文章组件
Vue.component('Uparse', Uparse); // 富文本显示组件
Vue.component('uniSection', uniSection);
Vue.component('uniSwipeAction', uniSwipeAction);
Vue.component('uniSwipeActionItem', uniSwipeActionItem);
Vue.component('uniSteps', uniSteps); // 步骤组件
Vue.component('Water', Water); // 商品筛选组件

Vue.config.productionTip = false;
Vue.prototype.$api = api;
App.mpType = 'app';
const app = new Vue({
  ...App
})
app.$mount()
