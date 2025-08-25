import 'reflect-metadata';
import app from './app';
import { appDataSource} from '@config/data_source';

(async () => {
await process.loadEnvFile('.env');
})();