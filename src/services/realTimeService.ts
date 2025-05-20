import { ref, onMounted, onUnmounted } from 'vue';
import { DataService } from './dataService';

export class RealTimeService {
  private static instance: RealTimeService;
  private updateInterval: number | null = null;
  private subscribers: Set<(data: any) => void> = new Set();
  private lastData: any = null;

  private constructor() {}

  static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }
    return RealTimeService.instance;
  }

  startUpdates(interval: number = 2000) {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = window.setInterval(() => {
      const newData = DataService.getRealTimeData();
      
      // Only notify if data has changed
      if (JSON.stringify(newData) !== JSON.stringify(this.lastData)) {
        this.lastData = newData;
        this.notifySubscribers(newData);
      }
    }, interval);
  }

  stopUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(data: any) {
    this.subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }
}

// Vue composable for real-time data
export function useRealTimeData(interval: number = 2000) {
  const realTimeData = ref<any>(null);
  const service = RealTimeService.getInstance();

  onMounted(() => {
    const unsubscribe = service.subscribe((data) => {
      realTimeData.value = { ...data }; // Create a new object to trigger reactivity
    });
    service.startUpdates(interval);

    onUnmounted(() => {
      unsubscribe();
      service.stopUpdates();
    });
  });

  return {
    realTimeData
  };
} 