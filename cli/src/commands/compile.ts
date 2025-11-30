import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export const compile = async (jd: string) => {
	const cwd = process.cwd();
	const texFile = resolve(cwd, `resume/generated/${jd}/v1.tex`);
	const outDir = resolve(cwd, `resume/generated/${jd}`);

	if (!existsSync(texFile)) {
		console.error(`Error: LaTeX file not found at ${texFile}`);
		process.exit(1);
	}

	console.log(`Compiling ${texFile}...`);

	// Tectonic automatically handles output directory if we don't specify,
	// but usually it outputs next to the input file.
	// We'll just run it on the file.

	const child = spawn("tectonic", [texFile], {
		stdio: "inherit",
		cwd: cwd,
	});

	child.on("error", (err) => {
		if ((err as any).code === "ENOENT") {
			console.error(
				"Error: tectonic command not found. Please install tectonic.",
			);
		} else {
			console.error("Failed to start tectonic:", err);
		}
		process.exit(1);
	});

	child.on("close", (code) => {
		if (code === 0) {
			console.log(`\nSuccess! PDF generated at ${resolve(outDir, "v1.pdf")}`);
		} else {
			console.error(`\nCompilation failed with code ${code}`);
			process.exit(code || 1);
		}
	});
};
