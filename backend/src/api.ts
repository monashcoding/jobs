import {Router} from 'express';
import {GetOpportunitiesQuery} from 'mac-jobs-shared';
import {getOpportunities} from './notion.js';
import {parseQueryAsync} from './utils.js';

const router: Router = Router();

router.get(
	'/opportunities',
	parseQueryAsync(GetOpportunitiesQuery, async (query, _, res) => {
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
