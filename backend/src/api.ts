import {Router} from 'express';
import {GetOpportunitiesQuery} from 'mac-jobs-shared';
import {getOpportunities} from './database.js';
import {parseQuery} from './utils.js';

const router: Router = Router();

const toSet = <T>(xs: readonly T[] | undefined): Set<T> | undefined =>
	xs ? new Set(xs) : undefined;

const matchesArray = <T>(
	values: readonly T[] | undefined,
	filter: ReadonlySet<T> | undefined,
): boolean => !filter || !values || values.some(x => filter.has(x));

router.get(
	'/opportunities',
	parseQuery(GetOpportunitiesQuery, async (query, _, res) => {
		const opportunities = await getOpportunities();

		const role = query.role?.toLowerCase();
		const types = toSet(query.types);
		const courseProgressions = toSet(query.courseProgressions);
		const workingRights = toSet(query.workingRights);
		const locations = toSet(query.locations);
		const industries = toSet(query.industries);
		res.json(
			opportunities.filter(
				o =>
					(query.open === undefined || o.open === query.open) &&
					(!role ||
						!o.roles ||
						o.roles.some(r => r.toLowerCase().includes(role))) &&
					(!types || types.has(o.type)) &&
					matchesArray(o.courseProgressions, courseProgressions) &&
					matchesArray(o.workingRights, workingRights) &&
					matchesArray(o.locations, locations) &&
					matchesArray(o.industries, industries),
			),
		);
	}),
);

export default router;
