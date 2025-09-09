import { Cliente } from '@entities/Cliente';
import { Colaborador } from '@entities/Colaborador';
import { Cultura } from '@entities/Cultura';
import { Produto } from '@entities/Produto';
import { Saca } from '@entities/Saca';
import { Semente } from '@entities/Semente';
import { DataSource } from 'typeorm';

(async () => {
await process.loadEnvFile('.env');
})();

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port:  Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Cliente, Colaborador,Cultura, Produto, Saca, Semente],
    migrations: ['src/migrations/*.ts'],
});