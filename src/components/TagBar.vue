<template>
  <div class="tag-container">
    <div class="tag-left">
      <ul>
        <li>全部 536</li>
        <li>未分组 312</li>
        <li>已分组 224</li>
      </ul>
    </div>
    <div class="tag-right">
      <ul>
        <li>
          <IconCirclePlusOutline />
          <span>新建</span>
        </li>
        <li>
          <IconSettingsOutline />
          <span>管理分组</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-container {
  padding: 16px 24px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  .tag-left {
    ul {
      list-style: none;
      display: flex;
      gap: 16px;
    }
    li {
      padding: 5px 16px;
      background-color: #f6f6f6;
      border-radius: 10px;
    }
    li:hover {
      background-color: #eef2fe;
      color: #2b5aed;
    }
  }
  .tag-right ul {
    color: #2b5aed;
    list-style: none;
    height: 100%;
    align-items: center;
    display: flex;
    gap: 16px;
  }
  .tag-right li {
    cursor: pointer;
  }
}
</style>
