import path from 'node:path';
import express from 'express';
import apiRouter from './api.js';

const app = express();

app.use(express.static(path.join(import.meta.dirname, '../../frontend/dist')));

app.use('/api', apiRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
