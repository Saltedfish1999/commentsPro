<template>
  <div class="main-content">
    <div class="top-container">
      <TopTitle name="摄影图库" :isSearch="true" style="width: 100%"></TopTitle>
    </div>
    <div class="mid-container">
      <TagBar />
    </div>
    <div class="bottom-container">
      <div class="image-info">
        <div class="blog-img" v-for="item in imageInfo" :key="item.id">
          <div class="img-top">
            <yk-image width="240" height="160" fit="cover" :src="item.imgSrc" />
          </div>
          <div class="img-mid">
            <yk-image
              width="78"
              height="78"
              fit="cover"
              :src="item.imageSrc1"
            />
            <yk-image
              width="80"
              height="78"
              fit="cover"
              :src="item.imageSrc2"
            />
            <yk-image
              width="78"
              height="78"
              fit="cover"
              :src="item.imageSrc3"
            />
          </div>
          <div style="margin-top: 8px">
            <yk-title style="margin: 0; font-weight: 500" :level="4">
              {{ item.title }}
            </yk-title>
          </div>
          <div class="data-info">
            <div class="works-info">
              <yk-text>{{ '查看' + item.view }}</yk-text>
              <yk-text>{{ '喜欢' + item.like }}</yk-text>
            </div>
            <div class="date-info">
              <yk-text>2023-05-12</yk-text>
            </div>
          </div>
          <div class="operate-info">
            <IconModifyOutline />
            <IconDeleteOutline />
          </div>
        </div>
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
  </div>
</template>
<script lang="ts" setup>
import TopTitle from '../../components/TopTitle.vue'
import TagBar from '../../components/TagBar.vue'
import { imageInfo } from '../../utils/menu'
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
    padding: 32px 108px;
    background-color: #fff;
    .comment_pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
  .image-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    align-items: center;
    gap: 24px;
    .blog-img {
      position: relative;
      padding: 0 8px;
      .operate-info {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.72);
        width: 60px;
        height: 32px;
        right: 16px;
        top: 16px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        visibility: hidden;
        .yk-icon {
          width: 20px;
          height: 20px;
        }
        .yk-icon:hover {
          color: #2b5aed;
        }
      }
    }
    .blog-img:hover {
      .operate-info {
        visibility: visible;
      }
    }
    .data-info {
      display: flex;
      justify-content: space-between;
      .works-info {
        .yk-text {
          color: rgba(30, 32, 37, 0.72);
          margin-right: 16px;
        }
      }
      .date-info {
        .yk-text {
          color: rgba(30, 32, 37, 0.48);
        }
      }
    }
    .img-top {
      margin-bottom: 2px;
      .yk-image {
        border-radius: 12px 12px 0 0;
      }
    }
    .img-mid {
      display: flex;
      gap: 2px;
      .yk-image {
        border-radius: 0 0 12px 12px;
      }
    }
  }
}
</style>
