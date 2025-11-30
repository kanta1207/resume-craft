import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const RESUME_ROOT = join(process.cwd(), "resume");

export async function readJd(filename: string): Promise<string> {
	return readFile(join(RESUME_ROOT, "jd", filename), "utf-8");
}

export async function readGeneratedResume(filename: string): Promise<string> {
	return readFile(join(RESUME_ROOT, "generated", filename), "utf-8");
}

export async function listJds(): Promise<string[]> {
	return readdir(join(RESUME_ROOT, "jd"));
}
