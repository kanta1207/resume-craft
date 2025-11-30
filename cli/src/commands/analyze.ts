import {
	analyzeResume,
	readGeneratedResume,
	readJd,
} from "@resume-craft/analysis";

export const analyze = async (jdName: string) => {
	try {
		// Try to read JD file (assume .md extension if not provided)
		const jdFilename = jdName.endsWith(".md") ? jdName : `${jdName}.md`;
		const jdContent = await readJd(jdFilename);

		// Try to read generated resume (assume v1.tex for now as per roadmap)
		// In future we might want to specify which version or file
		const resumeFilename = `${jdName}/v1.tex`;
		const resumeContent = await readGeneratedResume(resumeFilename);

		const analysis = analyzeResume(resumeContent, jdContent);

		console.log(JSON.stringify(analysis, null, 2));
	} catch (error) {
		console.error("Error during analysis:", error);
		process.exit(1);
	}
};
