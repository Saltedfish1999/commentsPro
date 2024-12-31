<template>
  <div class="main-content">
    <div class="top-container">
      <TopTitle name="本地文件" :is-search="false" style="width: 100%">
        <template #custom>
          <div>
            <yk-text style="margin-right: 16px" type="third">
              图片、视频、音频大小不超过20M
            </yk-text>
            <yk-button type="primary">上传</yk-button>
          </div>
        </template>
      </TopTitle>
    </div>
    <div class="mid-container">
      <TagBar />
    </div>
    <div class="bottom-container">
      <div class="choose-info" v-show="selectIds.length > 0">
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
              <yk-text>已经选择{{ selectIds.length }}项内容</yk-text>
            </li>
            <li>
              <yk-text type="primary">取消选择</yk-text>
            </li>
          </ul>
        </div>
        <div class="choose-right">
          <IconDeleteOutline @click="deleteAll" />

          <yk-popconfirm title="选择分组" trigger="click">
            <IconSwitchOutline />
            <template #content>
              <yk-scrollbar class="subset" ref="scrollbar" height="150px">
                <div
                  v-for="(item, index) in subsetStore.data"
                  :key="item.id"
                  class="type-item"
                  @click="changeOption(item.id)"
                  :class="{ 'Subselected': item.id === subsetSelect }"
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
          v-for="(item, index) in files"
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
            @click="selectFile(item.id, index)"
            style="color: #fff; font-size: 24px"
          >
            <IconTickMinOutline />
          </div>
          <div class="file_item-event">
            <IconDeleteOutline @click="deleteFile(item.id)" />
            <yk-popconfirm title="选择分组" trigger="click">
              <IconSwitchOutline />
              <template #content>
                <yk-scrollbar class="subset" ref="scrollbar" height="150px">
                  <div
                    v-for="(item, index) in subsetStore.data"
                    :key="item.id"
                    class="type-item"
                    @click="changeOption(item.id)"
                    :class="{ 'Subselected': item.id === subsetSelect }"
                  >
                    {{ item.name + item.value }}
                  </div>
                </yk-scrollbar>
              </template>
            </yk-popconfirm>
          </div>
        </div>
      </div>
      <div class="comment_pagination">
        <yk-pagination
          v-model:current="request.nowPage"
          v-model:page-size="request.pageSize"
          fix-width
          :total="value"
          style="margin-top: 12px"
          @change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import TagBar from '../../components/TagBar.vue'
import TopTitle from '../../components/TopTitle.vue'
import { imgInfo } from '../../utils/menu'
import { useSubsetStore } from '../../store'

const files = ref()
const count = ref(123)
const checkedAll = ref(false) // 是否全选
const indeterminate = ref(false) // 是否半选
const selectIds = ref<number[]>([]) // 选择图片的id
const data = ref([])
const value = ref(30) // 分页数据
const subsetSelect = ref<number>() //分类选择
const subsetStore = useSubsetStore()

type Request = {
  token?: string
  pageSize: number
  nowPage: number
}
const request: Request = {
  pageSize: 10,
  nowPage: 1,
}
/**
 * 获取数据
 */
const getData = () => {
  const data = imgInfo
  files.value = data.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize,
  )
  for (let i = 0; i < files.value.length; i++) {
    files.value[i].selected = false
  }
  console.log(files.value)
}
/**
 * 分页跳转
 */
/**
 * 分页跳转
 */
const handleSizeChange = (val: number) => {
  request.nowPage = val
  console.log('当前页数是' + val)
  getData()
}
/**
 * 监听全选事件变化
 */
const handleChangeAll = (value: boolean) => {
  indeterminate.value = false
  selectIds.value = []
  if (value) {
    checkedAll.value = true
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = true
      selectIds.value.push(files.value[i].id)
    }
  } else {
    checkedAll.value = false
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = false
    }
  }
}
/**
 * 选择图片
 */
const selectFile = (e: number, index: number) => {
  for (let i = 0; i < files.value.length; i++) {
    if (files.value[i].id === e) {
      files.value[i].selected = !files.value[i].selected
    }
  }
  if (files.value[index].selected) {
    selectIds.value.push(files.value[index].id)
  } else {
    selectIds.value = selectIds.value.filter((number) => number !== e)
  }
  console.log(selectIds.value)
}
/**
 * 删除图片
 */
const deleteFile = (e: number) => {
  files.value = files.value.filter((number: any) => number.id !== e)
}
/**
 * 全部删除
 */
const deleteAll = () => {
  if (selectIds.value.length > 0) {
    for (let i = 0; i < selectIds.value.length; i++) {
      files.value = files.value.filter(
        (number: any) => number.id !== selectIds.value[i],
      )
    }
  }
}
/**
 * 切换图片分组
 */
const changeFileType = () => {}
/**
 * 改变分组
 */
const changeOption = (e: number) => {
  subsetSelect.value = e
}
onMounted(() => {
  getData()
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
        .Subselected {
          background-color: @pcolor-1;
          &:hover {
            background-color: @pcolor-1;
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
          display: flex;
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
