import { cac } from "cac";
import { analyze } from "./commands/analyze";
import { compile } from "./commands/compile";

const cli = cac("resumecraft");

cli
	.command("compile <jd>", "Compile resume PDF for a specific JD")
	.action((jd) => {
		compile(jd);
	});

cli
	.command("analyze <jd>", "Analyze resume against JD keywords")
	.action((jd) => {
		analyze(jd);
	});

cli.command("hello", "Say hello").action(() => {
	console.log("Hello from ResumeCraft CLI!");
});

cli.help();
cli.version("0.0.1");

cli.parse();
