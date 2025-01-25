<template>
  <div class="diary">
    <div>
      <div>
        <div class="diary-title">
          <div>
            <span style="font-size: 20px; color: #1e2025; font-weight: 500">
              {{ DiaryData.title }}
            </span>
            <IconSunFill style="margin-left: 8px; color: #ffcd00" />
          </div>
          <div>
            <IconDeleteOutline />
          </div>
        </div>
        <yk-text style="color: rgba(30, 32, 37, 0.48)">
          {{ DiaryData.date }}
        </yk-text>
        <div style="color: rgba(30, 32, 37, 1); margin-top: 24px">
          <yk-text>
            {{ DiaryData.content }}
          </yk-text>
        </div>
      </div>
    </div>
    <div class="diary-image">
      <div class="image" v-for="item in DiaryData.imageInfo">
        <yk-image :src="item" width="80" height="80" fit="cover"></yk-image>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  diaryData: {
    type: Object,
    required: true,
  },
})
const DiaryData = props.diaryData
</script>

<style lang="less" scoped>
.diary {
  background-color: @bg-color-l;
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  .diary-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .diary-image {
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 8px;
  }
}
</style>
