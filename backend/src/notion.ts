import fs from 'node:fs/promises';
import path from 'node:path';
import * as csv from 'csv-parse/sync';
import {
	OpportunityType,
	type CourseProgression,
	type Month,
	type Opportunity,
	type OpportunityStatus,
	type WorkingRights,
} from 'mac-jobs-shared';

const opportunitiesFile = path.join(
	import.meta.dirname,
	'../opportunities.csv',
);

const convertOpportunityType = (type: string): OpportunityType =>
	type === 'Program'
		? OpportunityType.OtherProgram
		: type.endsWith('Internship')
			? OpportunityType.Internship
			: OpportunityType.GradProgram;

export const getOpportunities = async (): Promise<Opportunity[]> => {
	const data = await fs.readFile(opportunitiesFile, 'utf-8');
	const opportunitiesRaw = csv.parse(data, {columns: true}) as readonly {
		Company: string;
		'Name of program/role': string;
		Type: string;
		// | 'Program'
		// | 'Winter Internship'
		// | 'Summer Internship'
		// | '6/12 Month Internship'
		// | '1 Year+ Internship'
		// | 'Grad Program';
		'Course Progression': string;
		Roles: string;
		Status: string;
		Location: string;
		Duration: string;
		Open: string;
		Close: string;
		Industry: string;
		'Work rights required': string;
		URL: string;
		Description: string;
		Notes: string;
		'Last updated': string;
	}[];
	return opportunitiesRaw.map(
		(o): Opportunity => ({
			company: o.Company,
			name: o['Name of program/role'],
			type: convertOpportunityType(o.Type),
			courseProgressions: o['Course Progression']
				? (o['Course Progression'].split(', ') as CourseProgression[])
				: [],
			roles: o.Roles ? o.Roles.split(', ') : [],
			status: o.Status as OpportunityStatus,
			locations: o.Location ? o.Location.split(', ') : [],
			duration: o.Duration ? o.Duration : undefined,
			openMonth: o.Open ? (o.Open as Month) : undefined,
			closeMonth: o.Close ? (o.Close as Month) : undefined,
			industries: o.Industry ? o.Industry.split(', ') : [],
			workingRights: o['Work rights required']
				? (o['Work rights required'].split(', ') as WorkingRights[])
				: [],
			url: o.URL ? o.URL : undefined,
			description: o.Description ? o.Description : undefined,
			notes: o.Notes ? o.Notes : undefined,
		}),
	);
};
