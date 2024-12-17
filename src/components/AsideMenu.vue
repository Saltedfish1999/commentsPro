<template>
  <yk-space dir="vertical" class="menu-bar">
    <router-link :to="item.path" v-for="item in navList" :key="item.path">
      <yk-space class="menu-bar-nav">
        <component :is="item.icon" />
        <yk-text>{{ item.name }}</yk-text>
      </yk-space>
    </router-link>
  </yk-space>
</template>

<script lang="ts" setup>
import { navList } from '../utils/menu'
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.menu-bar {
  width: 160px;
  padding: @space-l;
  .menu-bar-nav {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    padding: 0 16px;
    display: flex;
    align-items: center;

    .yk-icon {
      color: @font-color-ss;
      width: 16px;
      height: 16px;
    }
    &:hover {
      color: @font-color-l;
      .yk-text {
        font-weight: 600;
      }
    }
  }
  .router-link-active {
    width: 100%;
    background: linear-gradient(180deg, #2b5aede0 0%, #2b5aed 100%);
    border-radius: 8px;
    .yk-icon {
      color: #ffffff;
    }
    .yk-text {
      color: #ffffff;
    }
  }
}
</style>
