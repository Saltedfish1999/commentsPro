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
    <div class="bottom-container">
      <div class="choose-info">
        <div class="choose-left">
          <ul>
            <li>
              <div class="choose-all">
                <IconMinusOutline :size="8" />
              </div>
            </li>
            <li>
              <yk-text>全选</yk-text>
            </li>
            <li>
              <yk-text>已经选择5项内容</yk-text>
            </li>
            <li>
              <yk-text type="primary">取消选择</yk-text>
            </li>
          </ul>
        </div>
        <div class="choose-right">
          <IconDeleteOutline />
          <IconSwitchOutline />
        </div>
      </div>
      <div class="img-container">
        <div class="img-item" v-for="(item, index) in imgInfo" :key="item.id">
          <yk-image
            :src="item.src"
            width="200"
            height="200"
            fit="cover"
          ></yk-image>
          <yk-text>{{ item.name }}</yk-text>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TagBar from '../../components/TagBar.vue'
import { imgInfo } from '../../utils/menu'

const imgName = {}
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
  .bottom-container {
    padding: 24px;
    border-radius: 8px;
    background-color: #fff;
    margin-top: 16px;
    .choose-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f6f6f8;
      padding: 16px;
      border-radius: 4px;
      .choose-left ul {
        list-style: none;
        display: flex;
        gap: 16px;
        align-items: center;
        font-weight: 400;
        color: #000000;
        .choose-all {
          width: 16px;
          height: 16px;
          background-color: #2b5aed;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          cursor: pointer;
        }
      }
      .choose-right .yk-icon {
        margin-left: 16px;
        color: #1e2025;
      }
    }
    .img-container {
      margin: 24px 52px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 24px;
      .img-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .yk-text {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
