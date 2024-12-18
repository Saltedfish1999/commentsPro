<template>
  <div class="main-content">
    <div class="top-container">
      <h2>本地文件</h2>
      <div>
        <yk-text style="margin-right: 16px" type="third">
          图片、视频、音频大小不超过20M
        </yk-text>
        <yk-button type="primary">上传</yk-button>
      </div>
    </div>
    <div class="mid-container">
      <TagBar />
    </div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import TagBar from '../../components/TagBar.vue'
</script>
<style lang="less" scoped>
.main-content {
  padding: 18px 27px;
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
  .top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mid-container {
    margin-top: 24px;
  }
}
</style>
