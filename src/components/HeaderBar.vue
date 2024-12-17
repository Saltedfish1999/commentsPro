<template>
  <div class="header-bar">
    <div class="header-content">
      <div class="header-left" @click="backHome">
        <yk-image
          src="https://www.huohuo90.com:3005/logo/yike.png"
          width="24"
          height="24"
          :is-lazy="true"
        ></yk-image>
        <span>博客后台管理</span>
      </div>
      <div class="header-right">
        <IconEmailFill size="15" />
        <yk-avatar style="background-color: rgb(245 61 61)">
          <icon-alarm-fill />
        </yk-avatar>
        <div><yk-theme /></div>
        <yk-button>退出</yk-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const route = useRouter()

const backHome = () => {
  route.push('/')
}
</script>
<style lang="less" scoped>
.header-bar {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  height: 64px;
  background-color: #fff;
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 24px;
    .header-left {
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      color: #000000;
      display: flex;
      gap: 12px;
    }
    .header-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
}
</style>
