<template>
  <div class="chart-container">
    <apexchart
      type="radar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'ApexRadar',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Radar Chart'
    }
  },
  setup(props) {
    const series = computed(() => [{
      name: props.title,
      data: props.data.map(value => Number(value) || 0) // Ensure numeric values
    }]);

    const chartOptions = computed(() => ({
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false
        }
      },
      title: {
        text: props.title,
        align: 'center'
      },
      xaxis: {
        categories: props.labels
      },
      yaxis: {
        show: false
      },
      fill: {
        opacity: 0.4
      },
      stroke: {
        width: 2
      },
      markers: {
        size: 0
      },
      colors: ['#FF4560']
    }));

    onMounted(() => {
      // Ensure chart is properly initialized after component mount
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });

    return {
      series,
      chartOptions
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: 350px;
}
</style> 