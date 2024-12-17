<template>
  <div ref="chart" :style="{ height: chartHeight }" class="chart"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref, markRaw, watch, onBeforeMount } from 'vue'

const chart = ref<HTMLDivElement>()
const myChart = ref()
const chartProps = defineProps(['data', 'chartHeight', 'title', 'type'])

const xAxisD = ref<string[]>([])
const seriesD = ref<number[]>([])
const option = ref() // 线性图属性
const pieOption = ref() // 饼状图属性
/**
 * 线性图数据
 */
const visit = (e: any) => {
  xAxisD.value = []
  seriesD.value = []

  for (let i = 0; i < e.length; i++) {
    xAxisD.value.push(e[i].date)
    seriesD.value.push(e[i].count)
  }
  option.value = {
    color: ['#2b5AED'],
    grid: {
      top: '4%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisD.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: seriesD.value,
        type: chartProps.type,
        smooth: true,
      },
    ],
  }
}
/**
 * 饼状图数据
 */
const check = (e: any) => {
  let total: number = 0
  for (let i = 0; i < e.length; i++) {
    total += e[i].value
  }
  console.log(e)

  pieOption.value = {
    color: ['#91cc75', '#fac858', '#5470c6', '#ee6666', '#9a60b4'],
    title: {
      text: total,
      subtext: chartProps.title,
      left: 'center',
      top: '34%',
      textStyle: {
        fontSize: 38,
        color: '#686b73',
        align: 'center',
      },
      subTextStyle: {
        fontSize: 14,
        color: '#686b73',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
      bottom: 0,
      icon: 'circle',
    },
    series: [
      {
        type: chartProps.type,
        radius: ['60%', '70%'],
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: false,
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: e,
      },
    ],
  }
}

onMounted(() => {
  if (chartProps.type === 'line') {
    visit(chartProps.data)

    myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
    myChart.value.setOption(option.value)
  } else if (chartProps.type === 'pie') {
    check(chartProps.data)

    myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
    myChart.value.setOption(pieOption.value)
  }
  //监听图标的高度变化
  window.addEventListener('resize', () => {
    myChart.value.resize()
  })
})

watch(
  () => chartProps.data,
  (e) => {
    if (chartProps.type === 'line') {
      visit(e)

      myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
      myChart.value.setOption(option.value)
    } else if (chartProps.type === 'pie') {
      check(e)

      myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
      myChart.value.setOption(pieOption.value)
    }
  },
)
onBeforeMount(() => {
  window.addEventListener('resize', () => {
    myChart.value.resize()
  })
})
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>
