<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'EchartsHeatmap',
  props: {
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Heatmap'
    }
  },
  setup(props) {
    const chartContainer = ref<HTMLElement | null>(null);
    let chart: echarts.ECharts | null = null;

    const initChart = () => {
      if (chartContainer.value) {
        chart = echarts.init(chartContainer.value);
        updateChart();
      }
    };

    const updateChart = () => {
      if (!chart) return;

      const option = {
        title: {
          text: props.title,
          left: 'center'
        },
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['Morning', 'Afternoon', 'Evening', 'Night'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: props.title,
          type: 'heatmap',
          data: props.data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };

      chart.setOption(option);
    };

    const handleResize = () => {
      if (chart) {
        chart.resize();
      }
    };

    onMounted(() => {
      // Wait for the next tick to ensure the container is rendered
      setTimeout(() => {
        initChart();
        window.addEventListener('resize', handleResize);
      }, 0);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.dispose();
        chart = null;
      }
    });

    watch(() => props.data, () => {
      if (chart) {
        updateChart();
      }
    }, { deep: true });

    return {
      chartContainer
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  min-height: 300px;
}
</style> 