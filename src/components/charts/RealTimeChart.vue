<template>
  <div class="chart-container">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useRealTimeData } from '@/services/realTimeService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  name: 'RealTimeChart',
  components: {
    Line
  },
  props: {
    title: {
      type: String,
      default: 'Real-time Data'
    },
    maxDataPoints: {
      type: Number,
      default: 20
    }
  },
  setup(props) {
    const { realTimeData } = useRealTimeData(1000);
    const timestamps = ref<string[]>([]);
    const values = ref<number[]>([]);

    const chartData = computed(() => ({
      labels: timestamps.value,
      datasets: [
        {
          label: props.title,
          data: values.value,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false
        }
      ]
    }));

    const updateChartData = () => {
      if (realTimeData.value) {
        const newTimestamp = new Date(realTimeData.value.timestamp).toLocaleTimeString();
        const newValue = Number(realTimeData.value.value) || 0;

        // Create new arrays instead of mutating existing ones
        const newTimestamps = [...timestamps.value, newTimestamp];
        const newValues = [...values.value, newValue];

        // Trim arrays if they exceed maxDataPoints
        if (newTimestamps.length > props.maxDataPoints) {
          newTimestamps.shift();
          newValues.shift();
        }

        // Update refs with new arrays
        timestamps.value = newTimestamps;
        values.value = newValues;
      }
    };

    let updateInterval: number;

    onMounted(() => {
      // Initialize with empty data
      timestamps.value = [];
      values.value = [];

      // Start updates after a short delay
      setTimeout(() => {
        updateInterval = window.setInterval(updateChartData, 1000);
      }, 100);
    });

    onUnmounted(() => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    });

    return {
      chartData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top' as const
          },
          title: {
            display: true,
            text: props.title
          }
        }
      }
    };
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  min-height: 300px;
}
</style> 