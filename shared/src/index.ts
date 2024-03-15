export const message = 'mac job board 🔥';

export const enum OpportunityType {
	Program = 'Program',
	WinterInternship = 'Winter Internship',
	SummerInternship = 'Summer Internship',
	SixTwelveMonthInternship = '6/12 Month Internship',
	OneYearPlusInternship = '1 Year+ Internship',
	GradProgram = 'Grad Program',
}

export const enum CourseProgression {
	PrePenultimate = 'Pre-Penultimate',
	Penultimate = 'Penultimate',
	Grad = 'Ultimate/Grad',
}

export const enum OpportunityStatus {
	Open = 'Open',
	Closed = 'Closed',
}

export const enum WorkingRights {
	AustralianCitizen = 'Australian Citizen',
	NewZealandCitizen = 'New Zealand Citizen',
	AustralianPermanentResident = 'Australian Permanent Resident',
	FullWorkingRights = 'Full Working Rights',
	International = 'International',
	Subclass462 = 'Subclass 462',
	AustralianTemporaryWorkVisa = 'Australian Temporary Work Visa',
	NewZealandPermanentResident = 'New Zealand Permanent Resident',
	AustralianStudentVisa = 'Australian Student Visa',
}

export const enum Month {
	January = 'January',
	February = 'February',
	March = 'March',
	April = 'April',
	May = 'May',
	June = 'June',
	July = 'July',
	August = 'August',
	September = 'September',
	October = 'October',
	November = 'November',
	December = 'December',
}

export interface Opportunity {
	company: string;
	name: string;
	type: OpportunityType;
	courseProgressions: CourseProgression[];
	status: OpportunityStatus;
	roles: string[];
	locations: string[];
	duration?: string | undefined;
	openMonth?: Month | undefined;
	closeMonth?: Month | undefined;
	industries: string[];
	workingRights: WorkingRights[];
	url?: string | undefined;
	description?: string | undefined;
	notes?: string | undefined;
}
