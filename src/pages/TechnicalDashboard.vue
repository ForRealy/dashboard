<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Technical Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Error Rate</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <chartjs-area
                  :labels="technicalData.errorRate.labels"
                  :data="technicalData.errorRate.data"
                  title="Error Rate (%)"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Response Time</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <apex-radar
                  :labels="technicalData.responseTime.labels"
                  :data="technicalData.responseTime.data"
                  title="Response Time (ms)"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Server Load</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <echarts-heatmap
                  :data="heatmapData"
                  title="Server Load Heatmap"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>API Performance</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <real-time-chart
                  title="API Response Time"
                  :maxDataPoints="30"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent 
} from '@ionic/vue';
import { DataService } from '@/services/dataService';
import ChartjsArea from '@/components/charts/ChartjsArea.vue';
import ApexRadar from '@/components/charts/ApexRadar.vue';
import EchartsHeatmap from '@/components/charts/EchartsHeatmap.vue';
import RealTimeChart from '@/components/charts/RealTimeChart.vue';

export default defineComponent({
  name: 'TechnicalDashboard',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    ChartjsArea,
    ApexRadar,
    EchartsHeatmap,
    RealTimeChart
  },
  setup() {
    const technicalData = DataService.getTechnicalData();

    // Generate heatmap data
    const heatmapData = computed(() => {
      const data = [];
      const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      for (let i = 0; i < times.length; i++) {
        for (let j = 0; j < days.length; j++) {
          data.push([
            j,
            i,
            Math.floor(Math.random() * 100)
          ]);
        }
      }

      return data;
    });

    onMounted(() => {
      // Ensure charts are properly initialized after component mount
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });

    return {
      technicalData,
      heatmapData
    };
  }
});
</script>

<style scoped>
ion-card {
  margin: 16px;
  height: 100%;
}

ion-card-content {
  height: 300px;
}
</style> 