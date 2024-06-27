import * as z from 'zod';

export const message = 'mac job board 🔥';

export const OpportunityType = z.union([
	z.literal('Internship'),
	z.literal('Grad Program'),
	z.literal('Other Program'), // `Program` in the Notion database
]);
export type OpportunityType = z.TypeOf<typeof OpportunityType>;

export const CourseProgression = z.union([
	z.literal('Pre-Penultimate'),
	z.literal('Penultimate'),
	z.literal('Grad'),
]);
export type CourseProgression = z.TypeOf<typeof CourseProgression>;

export const WorkingRights = z.union([
	z.literal('Australian Citizen'),
	z.literal('Australian Permanent Resident'),
	z.literal('Australian Student Visa'),
	z.literal('Australian Temporary Work Visa'),
	z.literal('New Zealand Citizen'),
	z.literal('New Zealand Permanent Resident'),
	z.literal('New Zealand Student Visa'),
	z.literal('New Zealand Temporary Work Visa'),
	z.literal('Full Working Rights'),
	z.literal('International'),
	z.literal('Subclass 46'),
]);
export type WorkingRights = z.TypeOf<typeof WorkingRights>;

export const Month = z.number().int().positive().max(12);
export type Month = z.TypeOf<typeof Month>;

export interface Opportunity {
	company: string;
	name: string;
	type: OpportunityType;
	// Missing properties indicate unknown information
	courseProgressions?: CourseProgression[];
	open: boolean;
	roles?: string[];
	locations?: string[];
	duration?: string | undefined;
	time?: string | undefined;
	openMonth?: Month | undefined;
	closeMonth?: Month | undefined;
	industries?: string[];
	workingRights?: WorkingRights[];
	url?: string | undefined;
	description?: string | undefined;
	notes?: string | undefined;
}

export const GetOpportunitiesQuery = z.object({
	open: z.boolean().optional(),
	role: z.string().optional(),
	types: z.array(OpportunityType).optional(),
	courseProgressions: z.array(CourseProgression).optional(),
	workingRights: z.array(WorkingRights).optional(),
	locations: z.array(z.string()).optional(),
	industries: z.array(z.string()).optional(),
});
export type GetOpportunitiesQuery = z.TypeOf<typeof GetOpportunitiesQuery>;
