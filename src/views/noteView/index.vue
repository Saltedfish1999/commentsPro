<template>
  <div class="main-content">
    <div class="top-container">
      <TopTitle name="随笔随记" :isSearch="true" style="width: 100%"></TopTitle>
    </div>
    <div class="mid-container">
      <TagBar />
    </div>
    <div class="bottom-container">
      <div class="container-left">
        <div v-for="item in diaryInfo" key="item.id">
          <DiaryCard :diary-data="item" />
        </div>
        <div class="comment_pagination">
          <yk-pagination
            v-model:current="request.nowPage"
            v-model:page-size="request.pageSize"
            fix-width
            :total="count"
            style="margin-top: 12px"
            @change="handleSizeChange"
          />
        </div>
      </div>
      <div>
        <DiaryEditor />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TopTitle from '../../components/TopTitle.vue'
import TagBar from '../../components/TagBar.vue'
import DiaryEditor from '../../components/DiaryEditor.vue'
import DiaryCard from '../../components/DiaryCard.vue'
import { imageInfo, diaryInfo } from '../../utils/menu'
import { ref } from 'vue'

type Request = {
  token?: string
  pageSize: number
  nowPage: number
}
const request: Request = {
  pageSize: 3,
  nowPage: 1,
}
const count = ref<number>(0)
const imageData = ref([])

/**
 * 获取文章数据
 */
const getData = (e: boolean) => {
  if (e) {
    count.value = imageInfo.length
  }
  const arr = imageInfo.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize,
  )
  // imageData.value = [...arr]
}
/**
 * 分页跳转
 */
const handleSizeChange = (val: number) => {
  request.nowPage = val
  getData(true)
}
</script>
<style lang="less" scoped>
.main-content {
  padding: 18px 27px;

  .top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mid-container {
    margin-top: 24px;
  }
  .bottom-container {
    padding: 32px 0;
    display: flex;
    gap: 24px;
    .container-left {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .comment_pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
