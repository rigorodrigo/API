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
    synchronize: true,
    logging: false,
    entities: [],
    migrations: ['src/migrations/*.ts'],
});