<template>
  <div class="blog-container">
    <div class="image-container">
      <yk-image
        width="160"
        height="120"
        fit="cover"
        src="../../public/backiee-18629.jpg"
      />
      <p class="shadow-unpublish" v-if="cardData.state === 1">未发布</p>
    </div>
    <div class="blog-content">
      <yk-title :level="4" style="margin-top: 0; font-size: 20px">
        {{ cardData.title }}
      </yk-title>
      <yk-text style="font-size: 16px">
        {{ cardData.content }}
      </yk-text>
      <div class="article-info">
        <div>
          <ul>
            <li>
              <yk-text style="color: #747678">所见/旅游 西北</yk-text>
            </li>
            <li>
              <yk-text>{{ cardData.date }}</yk-text>
            </li>
            <li>
              <IconEyeOutline />
              <yk-text>{{ cardData.view }}</yk-text>
            </li>
            <li>
              <IconLikeOutline />
              <yk-text>{{ cardData.like }}</yk-text>
            </li>
            <li>
              <IconCommentOutline />
              <yk-text>{{ cardData.comments }}</yk-text>
            </li>
          </ul>
        </div>
        <div class="operate-icon">
          <yk-tooltip placement="top" title="发布">
            <IconSendOutline @click="deleteArticle(cardData.id)" />
          </yk-tooltip>
          <yk-tooltip placement="top" title="编辑">
            <IconModifyOutline />
          </yk-tooltip>
          <yk-tooltip placement="top" title="删除">
            <IconDeleteOutline />
          </yk-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const emits = defineEmits(['delete', 'state'])
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
})

const cardData = props.cardData

/**
 * 删除文章
 */
const deleteArticle = (id: number) => {
  emits('delete', id)
}
onMounted(() => {})
</script>

<style lang="less" scoped>
.blog-container {
  padding: 24px;
  background-color: #fff;
  display: flex;
  gap: 24px;
  .image-container {
    position: relative;
    .shadow-unpublish {
      position: absolute;
      width: 160px;
      font-size: 14px;
      line-height: 24px;
      color: #fff;
      font-weight: 600;
      background-color: rgba(43, 90, 237, 0.8);
      text-align: center;
      border-radius: 8px;
      top: 96px;
    }
  }
  .blog-content {
    ul {
      list-style: none;
      display: flex;
      gap: 24px;
    }
    .article-info {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      .yk-text {
        color: #c2c3c4;
      }
      .yk-icon {
        color: #c2c3c4;
      }
      .operate-icon {
        display: flex;
        gap: 24px;
        .yk-icon {
          cursor: pointer;
          width: 18px;
          height: 18px;
        }
        .yk-icon:hover {
          color: #2b5aed;
        }
      }
    }
  }
}
</style>
