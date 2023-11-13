// 引入不再是构造函数 vue，而是工厂函数createApp
import { createApp, } from 'vue'; // vue 引入也发生了变化，需要解构
import './style.css';
import App from './App.vue';
import router from "./router/index";
import { createPinia } from 'pinia';

createApp(App).use(router).use(createPinia()).mount('#app');

// vue3 依赖新一代脚手架 vite 构建。之前vue-cli，react-cli都是webpack

// vue2
// import Vue from 'vue';
// **runtime-only：**
// render --> vDom(虚拟Dom) --> 真实的Dom --> 页面

// runtime-only将template在打包的时候，就已经编译为render函数，代码体积更轻运行速度更快。但模板文件只允许在.vue里，或者说只能作为vue实例导入。

// ```
// new Vue({
//   el: '#app',
//    template在打包时就编译成render
//   render: h => h(App)
//    方法1.h函数可比作：createdElemnet("标签", {标签的属性：值,}, ["dom"])
// }).$mount('#app')
// ```

// **runtime-compiler：**
// template --> ast(抽象语法树) --> render --> vDom(虚拟Dom) --> 真实的Dom --> 页面

// new Vue({
//     el: '#app',
//     components: { App },
//      组件里使用template的都是runtime-compiler模式
//     template: '<App/>'// 节点没有元素时可以只写尾部</>
//      方法2.直接传入一个组件
//   })