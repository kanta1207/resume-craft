import { describe, expect, it } from "vitest";
import { analyzeResume } from "./index";

describe("analyzeResume", () => {
	const mockJd = `
# Senior Engineer
## Keywords
React, TypeScript, Node.js
`;

	it("should calculate a perfect score for a perfect match", () => {
		const mockResume = `
\\section{Experience}
I use \\textbf{React}, TypeScript, and Node.js.
\\section{Education}
\\section{Skills}
\\section{Projects}
`;
		const result = analyzeResume(mockResume, mockJd);
		expect(result.score).toBe(100);
		expect(result.missingKeywords).toHaveLength(0);
		expect(result.missingSections).toHaveLength(0);
	});

	it("should identify missing keywords", () => {
		const mockResume = `
\\section{Experience}
I use React.
\\section{Education}
\\section{Skills}
\\section{Projects}
`;
		const result = analyzeResume(mockResume, mockJd);
		expect(result.missingKeywords).toContain("TypeScript");
		expect(result.missingKeywords).toContain("Node.js");
		expect(result.score).toBeLessThan(100);
	});

	it("should identify missing sections", () => {
		const mockResume = `
\\section{Experience}
I use React, TypeScript, and Node.js.
`;
		const result = analyzeResume(mockResume, mockJd);
		expect(result.missingSections).toContain("Education");
		expect(result.missingSections).toContain("Skills");
		expect(result.missingSections).toContain("Projects");
		expect(result.score).toBeLessThan(100);
	});

	it("should handle case-insensitive matching", () => {
		const mockResume = `
\\section{Experience}
I use react, typescript, and node.js.
\\section{Education}
\\section{Skills}
\\section{Projects}
`;
		const result = analyzeResume(mockResume, mockJd);
		expect(result.missingKeywords).toHaveLength(0);
	});
});
