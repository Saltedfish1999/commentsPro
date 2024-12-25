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
              <yk-checkbox
                :checked="checkedAll"
                :indeterminate="indeterminate"
                @change="handleChangeAll"
              >
                全选
              </yk-checkbox>
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

          <yk-popconfirm title="选择分组" trigger="click">
            <IconSwitchOutline />
            <template #content>
              <yk-scrollbar class="subset" ref="scrollbar" height="150px">
                <div
                  v-for="(item, index) in subsetStore.data"
                  :key="item.id"
                  class="type-item"
                >
                  {{ item.name + item.value }}
                </div>
              </yk-scrollbar>
            </template>
          </yk-popconfirm>
        </div>
      </div>
      <div class="img-container">
        <div
          class="img-item"
          v-for="(item, index) in imgInfo"
          :key="item.id"
          :class="{ 'selected': item.selected }"
        >
          <yk-image
            :src="item.src"
            width="200"
            height="200"
            fit="contain"
          ></yk-image>
          <yk-text>{{ item.name }}</yk-text>
          <div
            class="file_item-check"
            @click="handleSelect(item.selected)"
            style="color: #fff; font-size: 24px"
          >
            <IconTickMinOutline />
          </div>
          <div class="file_item-event">
            <IconDeleteOutline />
            <IconSwitchOutline />
          </div>
        </div>
      </div>
      <div class="comment_pagination">
        <yk-pagination fix-width :total="value" style="margin-top: 12px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TagBar from '../../components/TagBar.vue'
import { imgInfo } from '../../utils/menu'
import { useSubsetStore } from '../../store'

const imgName = {}
const checkedAll = ref(false) // 是否全选
const indeterminate = ref(false) // 是否半选
const data = ref([])
const value = ref(30) // 分页数据
const subsetStore = useSubsetStore()
/**
 * 监听全选事件变化
 */
const handleChangeAll = (value: boolean) => {
  indeterminate.value = false
  if (value) {
    checkedAll.value = true
  } else {
    checkedAll.value = false
  }
}
// const handleChangeAll = (value) => {
//   indeterminate.value = false
//   if (value) {
//     checkedAll.value = true
//     data.value = ['1', '2', '3']
//   } else {
//     checkedAll.value = false
//     data.value = []
//   }
// }
/**
 * 选择图片
 */
const handleSelect = (value: boolean) => {
  value = true
}
onMounted(() => {
  console.log(subsetStore.data)
})
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
        align-items: center;
        gap: 16px;
        font-weight: 400;
        color: #000000;
        .yk-checkbox {
          display: flex;
        }
      }
      .choose-right {
        display: flex;
        align-items: center;
        .yk-icon {
          margin-left: 16px;
          color: #1e2025;
          cursor: pointer;
          &:hover {
            color: @pcolor;
            background-color: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(2px);
          }
        }
        .type-item {
          background-color: @bg-color-m;
          border-radius: 8px;
          padding: 0 8px;
          margin: 8px 0;
          cursor: pointer;
          transition: all @animatb;
          user-select: none;
          &:hover {
            background-color: @bg-color-s;
          }
        }
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
        position: relative;
        background: @pcolor-1;
        .file_item-check {
          width: 24px;
          height: 24px;
          position: absolute;
          background: @gray-4;
          border-radius: 4px;
          top: @space-s;
          left: @space-s;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.56);
          text-align: center;
          line-height: 24px;
          opacity: 0;
        }
        .file_item-event {
          position: absolute;
          bottom: 24px;
          right: 8px;
          opacity: 0;
          .yk-icon {
            width: 32px;
            height: 32px;
            padding: 8px;
            background-color: rgba(255, 255, 255, 0.56);
            border-radius: 8px;
            margin-left: 8px;
            transition: all @animatb;
            &:hover {
              color: @pcolor;
              background-color: rgba(255, 255, 255, 0.72);
              backdrop-filter: blur(2px);
            }
          }
        }
        &:hover {
          background-color: @pcolor-1;
          .file_item-check {
            opacity: 1;
          }
          .file_item-event {
            opacity: 1;
          }
        }
      }
      .selected {
        .file_item-check {
          background-color: @pcolor;
          opacity: 1;
        }
        .file_item-event {
          opacity: 0;
        }
      }
    }
  }
}
</style>
