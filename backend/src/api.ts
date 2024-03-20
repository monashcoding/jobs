import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {GetOpportunitiesQuery} from 'mac-jobs-shared';
import {getOpportunities} from './notion.js';

const router: Router = Router();

router.get(
	'/opportunities',
	asyncHandler(async (req, res) => {
		let query: GetOpportunitiesQuery;
		try {
			query = GetOpportunitiesQuery.parse(req.query);
		} catch (error: unknown) {
			res.status(400).send(`Invalid query: ${String(error)}`);
			return;
		}

		const opportunities = await getOpportunities();
		if (!query.roles) {
			res.json(opportunities);
			return;
		}

		const roles = new Set(query.roles);
		res.json(opportunities.filter(o => o.roles.some(r => roles.has(r))));
	}),
);

export default router;
