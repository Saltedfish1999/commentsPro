<template>
  <div class="tag-container">
    <div class="tag-right">
      <yk-text>标签</yk-text>
      <div style="display: flex; gap: 8px">
        <yk-popconfirm
          class="tag-item"
          title="我自定义的标题"
          @confirm="confirm"
          @cancel="cancel"
          trigger="click"
        >
          <yk-text type="primary">
            <IconCirclePlusOutline />
            <span>新建</span>
          </yk-text>
          <template #content>
            <div style="margin: 8px 4px 16px">
              <yk-input
                show-counter
                :limit="6"
                placeholde="请输入"
                style="width: 206px"
                v-model="inputValue"
              ></yk-input>
            </div>
          </template>
        </yk-popconfirm>
        <yk-text style="cursor: pointer" type="primary" @click="showModal">
          <IconSettingsOutline />
          <span>管理分组</span>
        </yk-text>
      </div>
    </div>
    <div class="tag-left">
      <div
        class="subset-menu"
        :class="{ 'selected': selectType == item.id + 'subset' }"
        v-for="item in tagData"
        :key="item.id"
        @click="changeOptions(item.id, 'subset')"
      >
        {{ item.name }}
      </div>
    </div>
    <yk-modal title="标签管理" v-model="modalVisible">
      <yk-table>
        <yk-table-column property="name" label="名称"></yk-table-column>
        <yk-table-column property="moment" label="创建日期"></yk-table-column>
        <yk-table-column property="desc" label="操作"></yk-table-column>
        <template #tbody>
          <tr class="yk-table__row" v-for="item in tagData" :key="item.id">
            <td class="yk-table__cell">
              <yk-input v-model="item.name" />
            </td>
            <td class="yk-table__cell">{{ item.moment }}</td>
            <td class="yk-table__cell text-right" @click="deleteTag(item.id)">
              <yk-text type="primary" style="cursor: pointer">删除</yk-text>
            </td>
          </tr>
        </template>
      </yk-table>
      <template #footer>
        <yk-button type="primart" @click="submit">确定</yk-button>
      </template>
    </yk-modal>
  </div>
</template>

<script lang="ts" setup>
import { tag, state } from '../mock/data'
import { LabelData } from '../utils/interface'
import { useSubsetStore } from '../store'
import { getCurrentInstance, onMounted, ref } from 'vue'

const emits = defineEmits(['numSubsets'])

const subsetStore = useSubsetStore()
const selectType = ref<string>('-1all')
const inputValue = ref<string>()
const proxy: any = getCurrentInstance()?.proxy
const modalVisible = ref(false)
const tagData = ref<LabelData[]>([])

/**
 * 删除标签
 */
const deleteTag = (id: number) => {
  for (let i = 0; i < subsetStore.data.length; i++) {
    if (subsetStore.data[i].id === id) {
      subsetStore.data.splice(i, 1)
    }
  }
}
/**
 * 点击弹窗的确按钮
 */
const submit = () => {
  modalVisible.value = false
}
/**打开管理标签的弹窗*/
const showModal = () => {
  modalVisible.value = true
}
/**
 * 弹框的取消按钮
 */
function cancel() {
  inputValue.value = ''
}
/**
 * 弹框的确定按钮
 */
function confirm() {
  if (inputValue.value) {
    let obj = {
      id: -2,
      name: inputValue.value,
      value: 0,
    }
    tagData.value.push(obj)
    console.log(tagData.value)
    proxy.$message({ type: 'primary', message: '插入成功' })
    inputValue.value = ''
  } else {
    proxy.$message({ type: 'erro', message: '插入失败' })
  }
}
/**
 * 选择分组标签
 */
const changeOptions = (id: number | string, type: string) => {
  if (id + type != selectType.value) {
    selectType.value = id + type
  }
  emits('numSubsets', { id, type })
}
/**
 * 获取分组标签
 */
const getSubset = () => {
  tagData.value = tag.data.list
}
onMounted(() => {
  getSubset()
})
</script>

<style lang="less" scoped>
.tag-container {
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  .tag-left {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    .subset-menu {
      background-color: #f6f6f6;
      border-radius: 4px;
      cursor: pointer;
      padding: 4px 8px;
    }
    .subset-menu:hover {
      background-color: #eef2fe;
      color: #2b5aed;
    }
    .selected {
      background-color: #eef2fe;
      color: #2b5aed;
    }
  }
  .tag-right {
    color: #2b5aed;
    list-style: none;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    gap: 16px;
  }
  .tag-item {
    cursor: pointer;
  }
}
</style>
