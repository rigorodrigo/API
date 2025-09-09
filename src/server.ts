import 'reflect-metadata';
import app from './app';
import { appDataSource} from '@config/data_source';

(async () => {
await process.loadEnvFile('.env');
})();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
  try {
    await appDataSource.initialize();
    app.listen(PORT, () => console.log(`Servidor bombando em http://localhost:${PORT}`));
  } catch (err) {
    console.error('Falha ao iniciar a aplicação:', err);
    process.exit(1);
  }
}

start();