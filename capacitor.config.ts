import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'e-anamnese',
  webDir: 'dist/e-anamnese',
  server: {
    androidScheme: 'https'
  }
};

export default config;
