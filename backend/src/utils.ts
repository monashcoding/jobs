import type {NextFunction, Request, RequestHandler, Response} from 'express';
import asyncHandler from 'express-async-handler';
import type * as z from 'zod';

export const parseQuery =
	<T extends z.AnyZodObject>(
		T: T,
		handler: (
			data: z.TypeOf<T>,
			req: Request,
			res: Response,
			next: NextFunction,
		) => void,
	): RequestHandler =>
	(req, res, next) => {
		let data: z.TypeOf<T>;
		try {
			data = T.parse(req.query);
		} catch (error: unknown) {
			res.status(400).send(`Invalid query: ${String(error)}`);
			return;
		}

		handler(data, req, res, next);
	};

export const parseQueryAsync = <T extends z.AnyZodObject>(
	T: T,
	handler: (
		data: z.TypeOf<T>,
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void>,
): RequestHandler =>
	asyncHandler(async (req, res, next) => {
		let data: z.TypeOf<T>;
		try {
			data = T.parse(req.query);
		} catch (error: unknown) {
			res.status(400).send(`Invalid query: ${String(error)}`);
			return;
		}

		await handler(data, req, res, next);
	});
