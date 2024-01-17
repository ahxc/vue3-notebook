<script setup>
import { getCurrentInstance, inject, onMounted, reactive, ref, useAttrs } from 'vue';

// 使用keepAlive后，预挂载和挂载钩子只会执行一次，卸载钩子失效，
// 所以相关的挂载逻辑或则卸载逻辑需要卸载activated和deactivated中
// 首次进入
// setup
// beforeCreate
// created
// onBeforeMount
// beforeMount
// onMounted
// mounted
// onActivated
// activated

// 离开
// onDeactivated
// deactivated

// 再次进入
// onBeforeUpdate
// beforeUpdate
// onUpdate
// update
// onActivated
// activated

// 定义父组件传过来的信息，proxy对象，{name}
const props = defineProps({
    name: String,
});

const instance = getCurrentInstance();

// 如果没有用到defineprops则会传递class style 等以外的数据，包括事件，数据，方法等。用到了props怎会分流，只包含事件。
const attrs = useAttrs();
const man = reactive({ name: 'ahxc', age: '18' });
const woman = reactive({ name: 'xxx', age: '18' });

const alertInfo = () => {
    alert('我是子组件defineExpose暴露给父组件的方法');
};
// 暴露属性或方法给父组件使用 pname ref名字
// 父组件可以直接通过 pname.name 或者 this.$refs.pname.name调用
defineExpose({
    man,
    woman,
    alertInfo,
});

const _inject = inject('hello');
console.log('_inject', _inject);

// api内注册发布事件
// 写法1
const emit = defineEmits(['emit1', 'emit2']);
// 写法2
function emittest(params) {
    emit('emit2', 666);
}

const ahxc = ref(null)

</script>

<template>
    <div
        @click="emit('emit1', 666)"
        ref="ahxc"
        :props="props"
    >
        我只是名字叫keepalive记录vue3相关知识点
    </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
