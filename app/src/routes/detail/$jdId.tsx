import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	Briefcase,
	Building2,
	ChevronRight,
	Clock,
	DollarSign,
	Eye,
	FileCheck,
	MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockJobDescriptions } from "@/data/mockData";

export const Route = createFileRoute("/detail/$jdId")({
	component: JdDetailScreen,
});

function JdDetailScreen() {
	const { jdId } = Route.useParams();
	const navigate = useNavigate();
	const job = mockJobDescriptions.find((j) => j.id === jdId);

	if (!job) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h3 className="mb-2 font-medium">Job not found</h3>
					<Link to="/">
						<Button variant="outline">Go Back</Button>
					</Link>
				</div>
			</div>
		);
	}

	const handleGenerateResume = () => {
		navigate({ to: "/preview/$jdId", params: { jdId: job.id } });
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			className="flex flex-col h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20"
		>
			{/* Minimal Header */}
			<header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
				<div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Link to="/">
							<Button
								variant="ghost"
								size="sm"
								className="text-muted-foreground hover:text-foreground -ml-2 px-2"
							>
								<ArrowLeft className="size-4 mr-1" />
								Back
							</Button>
						</Link>
						<div className="h-4 w-px bg-border/50 mx-2" />
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="font-medium text-foreground">{job.company}</span>
							<ChevronRight className="size-3 opacity-50" />
							<span className="truncate max-w-[200px]">{job.title}</span>
						</div>
					</div>

					{job.hasResume && (
						<Button
							size="sm"
							onClick={handleGenerateResume}
							className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20 transition-all"
						>
							<Eye className="size-4 mr-2" />
							View Resume
						</Button>
					)}
				</div>
			</header>

			{/* Content */}
			<div className="flex-1 overflow-y-auto">
				<div className="max-w-5xl mx-auto p-6 md:p-10 pb-20">
					{/* Job Header Block */}
					<div className="flex flex-col md:flex-row md:items-start gap-8 mb-12 pb-8 border-b border-border/40">
						<div className="size-20 rounded-2xl bg-gradient-to-br from-primary/5 to-violet-500/5 border border-border/50 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
							{job.companyIcon}
						</div>

						<div className="flex-1">
							<h1 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
								{job.title}
							</h1>

							<div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-muted-foreground mb-6">
								<div className="flex items-center gap-2">
									<Building2 className="size-4 text-primary/70" />
									<span className="font-medium text-foreground">
										{job.company}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="size-4 text-muted-foreground/70" />
									{job.location}
								</div>
								<div className="flex items-center gap-2">
									<Briefcase className="size-4 text-muted-foreground/70" />
									Full-time
								</div>
								<div className="flex items-center gap-2">
									<DollarSign className="size-4 text-muted-foreground/70" />
									$150k - $200k
								</div>
								<div className="flex items-center gap-2">
									<Clock className="size-4 text-muted-foreground/70" />
									Posted {job.dateAdded}
								</div>
							</div>

							<div className="flex flex-wrap gap-2">
								{job.tags.map((tag, index) => (
									<Badge
										key={index}
										variant="secondary"
										className="px-2.5 py-1 text-xs font-medium bg-muted/50 hover:bg-muted text-muted-foreground border-transparent"
									>
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Left Column: Description */}
						<div className="lg:col-span-2 space-y-10">
							<section>
								<h3 className="text-lg font-semibold mb-4 text-foreground">
									About the Role
								</h3>
								<div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed text-sm">
									<p>{job.description}</p>
									<p className="mt-4">
										We're looking for an exceptional engineer to join our
										growing team and help shape the future of our product.
										You'll work on challenging problems at scale, collaborate
										with talented engineers, and have the opportunity to make a
										significant impact on our platform.
									</p>
								</div>
							</section>

							<section>
								<h3 className="text-lg font-semibold mb-4 text-foreground">
									Responsibilities
								</h3>
								<ul className="space-y-3">
									{[
										"Design and implement scalable frontend architecture using React and TypeScript",
										"Collaborate with designers, product managers, and backend engineers to deliver exceptional user experiences",
										"Optimize application performance and ensure cross-browser compatibility",
										"Mentor junior engineers and contribute to technical documentation",
										"Participate in code reviews and maintain high code quality standards",
										"Drive technical decisions and architecture improvements",
									].map((item, i) => (
										<li
											key={i}
											className="flex gap-3 text-sm text-muted-foreground"
										>
											<div className="mt-1.5 size-1.5 rounded-full bg-primary flex-shrink-0" />
											<span className="leading-relaxed">{item}</span>
										</li>
									))}
								</ul>
							</section>

							<section>
								<h3 className="text-lg font-semibold mb-4 text-foreground">
									Requirements
								</h3>
								<ul className="space-y-3">
									{[
										"5+ years of professional experience with React and modern JavaScript",
										"Strong proficiency in TypeScript, HTML5, and CSS3",
										"Experience with state management libraries (Redux, MobX, or similar)",
										"Deep understanding of web performance optimization techniques",
										"Experience with testing frameworks (Jest, React Testing Library)",
										"Strong communication skills and ability to work in a team environment",
									].map((item, i) => (
										<li
											key={i}
											className="flex gap-3 text-sm text-muted-foreground"
										>
											<div className="mt-1.5 size-1.5 rounded-full bg-primary flex-shrink-0" />
											<span className="leading-relaxed">{item}</span>
										</li>
									))}
								</ul>
							</section>
						</div>

						{/* Right Column: Sidebar/Meta */}
						<div className="space-y-6">
							<div className="rounded-xl border border-border/50 bg-card p-6 space-y-6">
								<div>
									<h4 className="text-sm font-medium text-foreground mb-4">
										Resume Status
									</h4>
									{job.hasResume ? (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
											<div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
												<FileCheck className="size-4 text-emerald-600" />
											</div>
											<div>
												<div className="text-sm font-medium text-emerald-700">
													Ready to view
												</div>
												<div className="text-xs text-emerald-600/80">
													{job.resumeVersions} versions available
												</div>
											</div>
										</div>
									) : (
										<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
											<div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
												<Clock className="size-4 text-muted-foreground" />
											</div>
											<div>
												<div className="text-sm font-medium text-muted-foreground">
													No resume yet
												</div>
												<div className="text-xs text-muted-foreground/70">
													Generate via CLI to analyze
												</div>
											</div>
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Button
										className="w-full bg-foreground text-background hover:bg-foreground/90"
										onClick={handleGenerateResume}
										disabled={!job.hasResume}
									>
										{job.hasResume ? "View Resume Analysis" : "Resume Missing"}
									</Button>
									{!job.hasResume && (
										<p className="text-xs text-center text-muted-foreground">
											Switch to your code editor or CLI to generate this resume
											with AI.
										</p>
									)}
								</div>
							</div>

							<div className="rounded-xl border border-border/50 bg-card p-6">
								<h4 className="text-sm font-medium text-foreground mb-4">
									Nice to Have
								</h4>
								<ul className="space-y-3">
									{[
										"Experience with Next.js",
										"Cloud platforms (AWS/GCP)",
										"CI/CD pipelines",
										"Design systems",
										"Open source contributions",
									].map((item, i) => (
										<li
											key={i}
											className="flex gap-2 text-sm text-muted-foreground"
										>
											<span className="text-primary flex-shrink-0">+</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
