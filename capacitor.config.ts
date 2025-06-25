
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.70a33514775f42cbb6ee02e7f83a91f4',
  appName: 'order-up-logistics',
  webDir: 'dist',
  server: {
    url: 'https://70a33514-775f-42cb-b6ee-02e7f83a91f4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
