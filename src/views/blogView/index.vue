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
        <div v-for="(item, index) in card" :key="item.id">
          <BlogCard :cardData="item" />
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
import { ref } from 'vue'

const card = ref(cardInfo)
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
