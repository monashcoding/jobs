import fs from 'node:fs/promises';
import {type Opportunity} from 'mac-jobs-shared';

const opportunitiesFile = new URL('../opportunities.json', import.meta.url);

export const getOpportunities = async (): Promise<Opportunity[]> => {
	const data = await fs.readFile(opportunitiesFile, 'utf-8');
	return JSON.parse(data) as Opportunity[];
};
