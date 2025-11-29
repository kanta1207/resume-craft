export interface ResumeSection {
	title: string;
	content: string;
}

export interface AtsAnalysis {
	score: number;
	keywordMatches: string[];
	missingKeywords: string[];
	sectionsPresent: string[];
	missingSections: string[];
}

export interface LlmAtsReport {
	analysis: AtsAnalysis;
	suggestions: string[];
}
