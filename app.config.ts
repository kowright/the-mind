import { ExpoConfig } from '@expo/config';
import 'dotenv/config';

export default ({ config }: { config: ExpoConfig }) => ({
    ...config,
    extra: {
        WS_URL_WEB: process.env.WS_URL_WEB ?? 'ws://localhost:3000',
        WS_URL_MOBILE: process.env.WS_URL_MOBILE ?? 'ws://192.168.2.16:3000',
    },
});
