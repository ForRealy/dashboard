// Mock data for technical metrics
export const technicalData = {
  errorRate: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [2.1, 1.8, 1.5, 1.2, 0.9, 0.7]
  },
  responseTime: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [120, 115, 118, 122, 110, 105, 108]
  },
  serverLoad: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    data: [45, 35, 65, 85, 75, 55]
  },
  apiPerformance: {
    labels: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    data: [98, 95, 97, 96, 94]
  },
  systemUptime: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [99.9, 99.8, 99.95, 99.85]
  }
};

// Mock data for business metrics
export const businessData = {
  dailyActiveUsers: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1200, 1350, 1500, 1400, 1600, 1800, 1700]
  },
  conversionRate: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [2.5, 3.1, 3.8, 4.2]
  },
  revenueGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [100, 115, 130, 145, 160, 175]
  },
  userEngagement: {
    labels: ['Social', 'Email', 'Push', 'In-app', 'SMS'],
    data: [35, 25, 20, 15, 5]
  },
  customerSatisfaction: {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    data: [5, 10, 20, 35, 30]
  }
};

// Real-time data generator
export const generateRealTimeData = () => {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    value: Math.random() * 100
  };
};

// Data service class
export class DataService {
  static getTechnicalData() {
    return technicalData;
  }

  static getBusinessData() {
    return businessData;
  }

  static getRealTimeData() {
    return generateRealTimeData();
  }
} 