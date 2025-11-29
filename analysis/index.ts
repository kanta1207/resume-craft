import type { AtsAnalysis } from "./types";

export function analyzeResume(
	resumeContent: string,
	jdContent: string,
): AtsAnalysis {
	const jdKeywords = extractKeywords(jdContent);
	const resumeText = resumeContent.toLowerCase();

	const keywordMatches = jdKeywords.filter((k) =>
		resumeText.includes(k.toLowerCase()),
	);
	const missingKeywords = jdKeywords.filter(
		(k) => !resumeText.includes(k.toLowerCase()),
	);

	// Standard sections to look for
	const requiredSections = ["Experience", "Education", "Skills", "Projects"];

	// Simple regex to find headers like "# Experience" or "## Experience"
	// OR LaTeX sections like "\section{Experience}" or "\section*{Experience}"
	const sectionsPresent = requiredSections.filter((s) => {
		const escapedSection = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const mdRegex = new RegExp(`^#+\\s*${escapedSection}`, "mi");
		const texRegex = new RegExp(`\\\\section\\*?\\{${escapedSection}\\}`, "mi");
		return mdRegex.test(resumeContent) || texRegex.test(resumeContent);
	});
	const missingSections = requiredSections.filter(
		(s) => !sectionsPresent.includes(s),
	);

	const score = calculateScore(
		keywordMatches.length,
		jdKeywords.length,
		sectionsPresent.length,
		requiredSections.length,
	);

	return {
		score,
		keywordMatches,
		missingKeywords,
		sectionsPresent,
		missingSections,
	};
}

function extractKeywords(content: string): string[] {
	// Look for "## Keywords" section and capture content until next header or end of file
	const match = content.match(/## Keywords\n([\s\S]+?)(?=\n#|$)/);
	if (match && match[1]) {
		return match[1]
			.split(",")
			.map((s) => s.trim())
			.filter((s) => s.length > 0);
	}
	return [];
}

function calculateScore(
	matches: number,
	totalKeywords: number,
	sections: number,
	totalSections: number,
): number {
	const keywordWeight = 0.6;
	const sectionWeight = 0.4;

	const keywordScore = totalKeywords > 0 ? (matches / totalKeywords) * 100 : 0;
	const sectionScore = totalSections > 0 ? (sections / totalSections) * 100 : 0;

	return Math.round(
		keywordScore * keywordWeight + sectionScore * sectionWeight,
	);
}
