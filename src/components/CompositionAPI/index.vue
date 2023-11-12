<!-- setup api无组件名，可以添加一个标签 -->
<!-- <script>

export default {
    name: 'CompositionAPI',
};
</script> -->
<script>
// 组合式api各个阶段生命周期在选项api各个阶段之前。
// 不推荐混用！实例可访问setup内部，但setup不能访问实例。
import {
    onMounted,
    onUnmounted,
    onBeforeMount,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onActivated,
    ref,
    toRef,
    toRefs,
    reactive,
    defineEmits,
    computed,
    watch,
    watchEffect,
    readonly,
    shallowReadonly,
    toRaw,
    markRaw,
    provide,
    isRef,
    isReactive,
    isProxy,
    isReadonly,
    defineAsyncComponent,
    Suspense,
    // useContext, // 废弃
} from 'vue';
import keepalive from '../KeepAlive/index.vue';

export default {
    name: 'CompositionAPI',
    data: () => {
        return {
            name: 'ahxc---',
        };
    },
    props: [],
    emits: ['hello'], // 旧方法在这里注册
    components: {
        keepalive,
    },
    // ! 不能是async对象，因为return则变为promise，无法解析
    // context 上下文，包括：attrs属性、emit发布事件、slots插槽、scopedSlots、refs等
    setup(props, context) {
        console.log('setup');

        // 异步组件，网速慢或者十分耗性能时，异步加载组件，先静态，后动态，静态页面是一起渲染解析的。
        const AsyncKeepAlive = defineAsyncComponent(() => import('../KeepAlive/index.vue'));
        // 也可以使用   <Suspense></Suspense>包裹

        // 一些判断方法
        // isRef, isReactive, isProxy,isReadonly;

        // provide inject 给后代组件传递数据
        provide('hello', 666);

        // watcheffect，watch的批量版，初始化setup阶段会调用一次，内部依赖变量发生改变会调用一次，调用时机与位置相关
        watchEffect(() => {
            console.log('watchEffect');
        });

        // 侦听器
        const sum = ref(0);// 监听多个可以传递[sum,sum1,...]，
        const sumObj = ref({ a: 1, b: 2 }); // reactive同理，如果是reactive对象数据类型默认开启深度监听，且配置无效，ref且引用类型的话的话可以配置true到.value（reactive）
        watch(() => sumObj, (newValue, oldValue) => {
            // ! 版本3.3 引用数据类型 newValue 和 oldvalue 存在引用关联一致。
            console.log(`我监听到了 ref 基础数据和引用数据类型改变`, newValue, oldValue);
        }, {
            immediate: true,// 先执行一次
            deep: true// 对象要深度监听，ref的话也可以 sum.value
        });

        // 可以通过context发布事件
        // 1.子组件某些事件click(){context.emit('hello', 666)};// 不推荐
        // 2.const {emit}= useContext(); // 3.2就废弃了
        // 3.旧方法this.$emit('hello',666)
        // 新方法，在这里注册，报警，推荐 script setup 标签内使用
        const emit = defineEmits(['emit1', 'emit2']);
        function emit2test(params) {
            emit('emit2', 666);
        }

        // 响应式
        const age = ref(18);
        age.value = 29; // 响应式修改
        // ref 支持基础类型和引用类型
        const manref = ref({ name: 'ahxc', age: 18 }); // 引用数据类型基于reactive实现
        // shallowRef，shallowReactive 只处理直接属性发生变化时才会响应。
        // const a = readonly(manrea) shallowReadonly 只读和浅只读
        // toRaw markRaw 变为原生对象和标记一个对象永不能成为响应式。

        // reactive 仅支持响应式
        const manrea = reactive({ name: 'ahxc', age: 18 }); // proxy 对象
        // 调用方式不同
        manref.value.age = 29;
        manrea.age = 29;
        // manref 不会失去响应
        manrea.value = { name: 'ahxc', age: 18 };
        // manrea 重新赋值会失去响应，只能挨个赋值属性，或者object.assign，或者改用ref
        // manrea = reactive({ name: 'ahxc2', age: 29});
        Object.assign(manrea, { obj: {} });

        // 引用赋值普通赋值都无响应式
        const a = manrea.age;
        const o = manrea.obj;

        // 解构都会失去响应性
        // 可使用toRefs解构
        const { age: age1 } = manref.value;
        const { age: age2 } = manrea;
        // 会报警，期待reactive对象
        const { age: age4 } = toRefs(manref); // 会报警，期待reactive对象。
        const { age: age5 } = toRefs(manrea);
        // 也可以用toRef单个属性
        const age6 = toRef(manrea, 'age');
        const age7 = toRefs(age); // 也可以直接变成响应式数据。
        age7.value = 28;
        const age8 = { ...manref, ...toRef(manrea) };

        // ! setup不能访问外部this实例，
        console.log('this setup', this); //  undefined

        onBeforeMount(() => {
            console.log('onBeforeMount');
        });
        function listeners(event) {
            console.log(event.pageX, event.pageY);
        }
        onMounted(() => {
            // 执行事件监听，请求等功能，注意keepalive组件只会执行一次。同时离开页面后记得清除listeners
            // window.addEventListener('mousemove', listeners);
            console.log('onMounted');
        });
        onActivated(() => {
            console.log('onActivated');
        });
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate');
        });
        onUpdated(() => {
            console.log('onUpdated');
        });
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount');
        });
        // ! destroy被废弃
        onUnmounted(() => {
            console.log('onUnmounted');
        });

        computed(() => {
            return age + age1;
        });

        computed({
            get() {
                return age + age1;
            },
            set(value) { },
        });

        let name = '张三';
        function alertName(params) {
            alert(name);
            sumObj.b = 4;
            console.log(age7);
        }
        //  若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
        // 若返回一个渲染函数：则可以自定义渲染内容。（了解）
        return { name, alertName, age1, emit };
    },
    // 侦听器
    watch: {
        sum: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {

            }
        }
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        setTimeout(() => {
            console.log('宏任务');
        }, 0);
        this.$nextTick(() => {
            console.log('微任务');
        });
        Promise.all([console.log('微任务promise')]);
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeUnmount() {
        console.log('beforeUnmount');
    },
    unmounted() {
        console.log('unmounted');
    },
    activated() {
        console.log('activated');
    },
    deactivated() {
        window.removeEventListener('mousemove', listeners);
        console.log('deactivated');
    },
    provide() {
        return {};
    },
    methods: {
        childClick() {
            // 如果是 composition api内部，需定义 const keepalive = ref(null)，
            // 这点和hook类似。  const myRef = useRef(null); <Com ref={myRef} />
            console.log(this.$refs.keepalive.alertInfo());
        },
    },
};
</script>

<template>
    <!-- teleport组件，将包裹组件挂载到指定id或标签内部，利用插入children的原理，这能解决一些层级问题，比如模态，通知弹窗等绝对定位元素 -->
    <teleport to='#teleport-test'>
        测试
    </teleport>
    <div id="teleport-test"></div>
    <div ref="ahxc">{{ name }}</div>
    <div ref="ahxc">{{ age1 }}</div>
    <button @click="alertName">alertName</button>
    <button @click="emit('emit1', 666)">alertName</button>
    <!-- 子组件上直接定义原生事件，省去.native修饰符。 -->
    <keepalive
      ref="keepalive"
      class="test-class"
      @click="childClick"
      :name="this.name"
    ></keepalive>
</template>

<style scoped lang="less">
@import './index.less';
</style>
