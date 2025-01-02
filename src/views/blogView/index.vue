<template>
  <div class="main-content">
    <div class="top-container">
      <TopTitle name="博客文章" isSearch />
    </div>
    <div class="mid-container">
      <TagBar />
    </div>
    <div class="bottom-container">
      <div class="card-info">
        <div v-for="item in card" :key="item.id">
          <BlogCard
            :cardData="item"
            @delete="deleteCard(item.id)"
            @state="updateCardState"
          />
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
        <div class="card-manage">
          <TagManage />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TagBar from '../../components/TagBar.vue'
import TopTitle from '../../components/TopTitle.vue'
import BlogCard from '../../components/BlogCard.vue'
import TagManage from '../../components/TagManage.vue'
import { cardInfo } from '../../utils/menu'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { LabelData } from '../../utils/interface'

const proxy: any = getCurrentInstance()?.proxy
const card = ref<LabelData[]>([])
const count = ref<number>(0)

type Request = {
  token?: string
  pageSize: number
  nowPage: number
}
const request: Request = {
  pageSize: 3,
  nowPage: 1,
}
/**
 * 获取文章数据
 */
const getData = (e: boolean) => {
  if (e) {
    count.value = cardInfo.length
  }
  const arr = cardInfo.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize,
  )
  card.value = [...arr]
}
/**
 * 分页跳转
 */
const handleSizeChange = (val: number) => {
  request.nowPage = val
  getData(true)
}
/**
 * 删除文章
 */
const deleteCard = (id: number) => {
  card.value = card.value.filter((obj: any) => obj.id !== id)
}
/**
 * 更新文章状态
 */
const updateCardState = (e: any) => {
  card.value.filter((i: { id: number; state: number }) => {
    if (i.id === e.id) {
      i.state = e.state
      if (e.state === 1) {
        proxy.$message({ type: 'primary', message: '发布成功' })
      } else {
        proxy.$message({ type: 'primary', message: '撤回成功' })
      }
    }
  })
}

onMounted(() => {
  getData(true)
})
</script>
<style lang="less" scoped>
.main-content {
  padding: 18px 27px;
  .mid-container {
    margin-top: 24px;
  }
  .bottom-container {
    display: flex;
    padding: 24px 0px;
    gap: 24px;
    border-radius: 8px;
    margin-top: 16px;
    .card-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: center;
    }
    .card-manage {
      width: 278px;
      border-radius: 8px;
      padding: 24px;
      background-color: #fff;
    }
  }
}
</style>
