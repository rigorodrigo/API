import express from 'express';

import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
app.use("/api/usuarios", usuarioRoutes);

export default app;