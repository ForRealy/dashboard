<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Business Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Daily Active Users</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <chartjs-area
                  :labels="businessData.dailyActiveUsers.labels"
                  :data="businessData.dailyActiveUsers.data"
                  title="Daily Active Users"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Conversion Rate</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <apex-radar
                  :labels="businessData.conversionRate.labels"
                  :data="businessData.conversionRate.data"
                  title="Conversion Rate (%)"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>User Engagement</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <echarts-heatmap
                  :data="engagementHeatmapData"
                  title="User Engagement by Channel"
                />
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Revenue Growth</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <real-time-chart
                  title="Revenue Growth"
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
  name: 'BusinessDashboard',
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
    const businessData = DataService.getBusinessData();

    // Generate engagement heatmap data
    const engagementHeatmapData = computed(() => {
      const data = [];
      const channels = ['Social', 'Email', 'Push', 'In-app', 'SMS'];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      for (let i = 0; i < channels.length; i++) {
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
      businessData,
      engagementHeatmapData
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