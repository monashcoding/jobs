import {fileURLToPath} from 'node:url';
import express from 'express';
import apiRouter from './api.js';

const app = express();

app.use(
	express.static(
		fileURLToPath(new URL('../../frontend/dist/', import.meta.url)),
	),
);

app.use('/api', apiRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
