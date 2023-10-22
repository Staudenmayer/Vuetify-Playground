import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Dashboard',
  appName: 'Dashboard',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
