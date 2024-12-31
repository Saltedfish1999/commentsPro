<template>
  <div class="top-title">
    <yk-title :level="3">{{ props.name }}</yk-title>
    <slot name="custom"></slot>
    <div v-if="isSearch">
      <yk-button
        style="margin-right: 8px"
        type="secondary"
        v-show="searchData"
        @click="cancelSearch"
      >
        取消搜索
      </yk-button>
      <yk-input-search v-model="searchData" style="width: 320px">
        <template #prefix>
          <IconSearchOutline />
        </template>
        <template #suffix>
          <yk-button type="secondary" placeholder="请输入" @click="search">
            搜索
          </yk-button>
        </template>
      </yk-input-search>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
type titleProps = {
  name: string
  isSearch: boolean
}
//组件选项
const props = withDefaults(defineProps<titleProps>(), {
  name: '总览',
  isSearch: true,
})
const searchData = ref()
const emit = defineEmits(['search'])
/**
 * 搜索
 */
const search = () => {
  emit('search', searchData.value)
}
/**
 * 取消搜索
 */
const cancelSearch = () => {
  emit('search', '')
  searchData.value = ''
}
</script>

<style lang="less" scoped>
.top-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
