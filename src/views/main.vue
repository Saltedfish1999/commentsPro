<template>
  <div class="common-layout">
    <div class="header">
      <header-bar></header-bar>
    </div>
    <div class="container">
      <aside-menu></aside-menu>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeaderBar from '../components/HeaderBar.vue'
import AsideMenu from '../components/AsideMenu.vue'
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
  .main {
    flex: 1;
  }
}
</style>
