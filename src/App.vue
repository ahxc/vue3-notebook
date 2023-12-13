<script setup>
import CompositionAPI from './components/CompositionAPI/index.vue';

function testHello(params) {
  console.log('test');
}
</script>

<template>
  <router-link to="/">composition api</router-link>
  <router-link :to="{ path: '/CompositionAPI', name: 'CompositionAPI' }"></router-link>


  <!-- vue2 -->
  <!-- <keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" /> -->

  <!-- vue3 -->
  <!-- 缓存name名称为aaa和bbb的组件 -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="['CompositionAPI',]">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        v-if="$route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
    />
  </router-view>

  <composition-a-p-i @hello="testHello"></composition-a-p-i>
</template>

<style scoped></style>
