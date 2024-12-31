<template>
  <div class="main-content">
    <TopTitle name="总览" :is-search="false" />
    <div class="mid-container">
      <div
        class="card-content"
        v-for="(item, index) in gathers"
        :key="item.name"
        :style="{ background: 'linear-gradient(' + item.bgColor + ')' }"
      >
        <div class="blog-data">
          <yk-text type="secondary">{{ item.name }}</yk-text>
          <p>{{ item.total }}</p>
        </div>
        <div class="blog-button">
          <yk-button v-if="index > 0" size="xl" type="secondary" shape="square">
            <IconPlusOutline />
          </yk-button>
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <div class="chart-content">
        <div class="line-chart">
          <div class="chart-top">
            <yk-title :level="3">访问量</yk-title>
            <yk-radio-group
              v-model="visitRadio"
              @change="getVist"
              type="button"
              :solid="true"
            >
              <yk-radio value="week">近一周</yk-radio>
              <yk-radio value="month">近一月</yk-radio>
            </yk-radio-group>
          </div>
          <div>
            <lineChart type="line" :data="visitData" chartHeight="208px" />
          </div>
        </div>
        <div class="pie-chart">
          <div class="chart-top">
            <yk-title :level="3">数据监测</yk-title>
            <yk-radio-group v-model="checkRadio" type="button" :solid="true">
              <yk-radio value="week">近一周</yk-radio>
              <yk-radio value="month">近一月</yk-radio>
            </yk-radio-group>
          </div>
          <div class="chart-bottom">
            <lineChart
              type="pie"
              :data="check.data.device"
              chartHeight="208px"
              title="设备总数"
            />
            <lineChart
              type="pie"
              :data="check.data.website"
              chartHeight="208px"
              title="访问总数"
            />
          </div>
        </div>
      </div>
      <div class="comment">
        <yk-title :level="3">{{ `评论 ` + commentsData.total }}</yk-title>
        <div class="comments-container">
          <div v-for="item in commentsData.list" :key="item.id">
            <div class="user-comments">
              <yk-avatar style="background-color: rgb(245 61 61)">
                <icon-alarm-fill />
              </yk-avatar>
              <div class="comments-item">
                <div class="user-info">
                  <div>
                    <yk-text strong>{{ item.user.name }}</yk-text>
                    <div style="font-size: 12px; color: #1e20257a">
                      {{ item.moment }}
                    </div>
                  </div>
                  <yk-text type="third">
                    {{ item.comment }}
                  </yk-text>
                  <div>
                    <yk-tag class="tag" type="primary">
                      {{ item.article.name }}
                    </yk-tag>
                    <yk-text
                      type="danger"
                      style="font-size: 12px; margin-left: 8px"
                      v-if="item.complaint > 0"
                    >
                      {{ `举报 ` + item.complaint }}
                    </yk-text>
                  </div>
                </div>
                <div class="deleteButton">
                  <IconDeleteOutline />
                </div>
              </div>
            </div>
            <yk-divider></yk-divider>
          </div>
        </div>
        <div>
          <yk-pagination
            fix-width
            v-model:current="request.nowPage"
            v-model:page-size="request.pageSize"
            :total="parseInt(commentsData.total) * 2"
            style="margin-top: 12px"
            @change="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { overLink } from '../../utils/menu'
import { overView, visit, check, comments } from '../../mock/data'
import { lineChart } from '../../components/Echarts/index'
import TopTitle from '../../components/TopTitle.vue'

const gathers = ref(overLink)

const visitRadio = ref('week') // 访问量类型
const visitData = ref([]) // 访问量数据
const checkRadio = ref('week') //检测量数据

const commentsData = reactive({
  total: '',
  list: comments.data.list,
})

type Request = {
  token?: string
  pageSize: number
  nowPage: number
  count?: boolean
}
const request: Request = {
  pageSize: 4,
  nowPage: 1,
  count: false,
}

/**
 * 分页数据的获取
 */
const getPage = () => {
  const { count, list } = comments.data
  commentsData.total = count
  commentsData.list = list.slice(
    (request.nowPage - 1) * request.pageSize,
    request.nowPage * request.pageSize,
  )
}
/**
 * 分页跳转
 */
const handleSizeChange = (val: number) => {
  request.nowPage = val
  console.log('当前页数是' + val)
  getPage()
}
/**
 * 获取图表中的数据
 */
const getVist = (e: string) => {
  let data = visit.data
  if (e === 'week') {
    data = data.slice(0, 7)
  }
  visitData.value = data
}

/**
 * 获取博客总数
 */
const getData = () => {
  let data = overView.data
  gathers.value[0].total = data.file
  gathers.value[1].total = data.article
  gathers.value[2].total = data.gallery
  gathers.value[3].total = data.diary
}

onMounted(() => {
  getPage()
  getVist(visitRadio.value)
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
  .mid-container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    .card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      padding: 24px;
      .blog-data {
        display: flex;
        flex-direction: column;
        font-size: 32px;
        line-height: 42px;
        font-weight: 500;
      }
      &:first-child {
        color: #ffffff;
        .yk-text {
          color: #ffffff;
        }
      }
    }
  }
  .bottom-container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    .chart-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .line-chart {
        flex: 1;
        border-radius: 8px;
        background-color: #ffffff;
        padding: 24px;
      }
      .pie-chart {
        flex: 1;
        border-radius: 8px;
        background-color: #ffffff;
        padding: 24px;
      }
      .chart-bottom {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .chart-top {
        display: flex;
        justify-content: space-between;
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      h3 {
        font-size: 24px;
        font-weight: 500;
        line-height: 26px;
      }
      .comments-container {
        margin-top: 16px;
        .user-comments {
          display: flex;
          gap: 9px;
          .comments-item {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .user-info {
              display: flex;
              flex-direction: column;
              gap: 8px;
              .tag {
                max-width: 100px;
              }
            }
            .deleteButton {
              visibility: hidden;
            }
          }
          .comments-item:hover .deleteButton {
            visibility: visible;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.yk-title {
  margin: 0;
}
.yk-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
