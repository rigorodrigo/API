import express from 'express';
import cors  from 'cors';
import { errorHandler } from '@middlewares/errorHandler';
import routes from '@routes/index';

(async () => {
await process.loadEnvFile('.env');
})();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (req,res) => res.json({status: 'ok', uptime: process.uptime()}));


app.use(errorHandler);
app.use(routes);

export default app;