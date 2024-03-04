import express from 'express';

const app = express();

app.use(
	express.static(new URL('../../frontend/dist', import.meta.url).pathname),
);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
