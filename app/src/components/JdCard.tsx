import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, FileCheck, MapPin } from "lucide-react";
import type { JobDescription } from "@/data/mockData";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface JdCardProps {
	job: JobDescription;
	viewMode: "grid" | "list";
	onOpenPreview?: () => void;
	onOpenDetail?: () => void;
}

export function JdCard({ job, viewMode }: JdCardProps) {
	const hasResume = job.hasResume;

	if (viewMode === "list") {
		return (
			<div className="group relative bg-card hover:bg-muted/50 border border-border/40 rounded-xl p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
				<div className="flex items-center gap-5">
					{/* Icon */}
					<div className="size-12 rounded-xl bg-gradient-to-br from-primary/5 to-violet-500/5 border border-border/50 flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
						{job.companyIcon}
					</div>

					{/* Content */}
					<div className="flex-1 min-w-0 grid grid-cols-12 gap-6 items-center">
						<div className="col-span-5">
							<h3 className="font-semibold text-foreground truncate pr-4 group-hover:text-primary transition-colors">
								{job.title}
							</h3>
							<p className="text-sm text-muted-foreground truncate">
								{job.company}
							</p>
						</div>

						<div className="col-span-4 flex items-center gap-4 text-sm text-muted-foreground/80">
							<div className="flex items-center gap-1.5">
								<MapPin className="size-3.5" />
								<span className="truncate">{job.location}</span>
							</div>
							<div className="w-px h-3 bg-border/60" />
							<div className="flex items-center gap-1.5">
								<Calendar className="size-3.5" />
								<span>{job.dateAdded}</span>
							</div>
						</div>

						<div className="col-span-3 flex items-center justify-end gap-3">
							{hasResume && (
								<div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
									<FileCheck className="size-3" />
									<span>v{job.resumeVersions}</span>
								</div>
							)}
							<Link to="/detail/$jdId" params={{ jdId: job.id }}>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
								>
									<ArrowRight className="size-4" />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="group relative flex flex-col bg-card hover:bg-muted/30 border border-border/40 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
			{/* Card Header */}
			<div className="p-5 pb-0 flex items-start justify-between gap-4">
				<div className="size-12 rounded-xl bg-gradient-to-br from-primary/5 to-violet-500/5 border border-border/50 flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300 ring-1 ring-inset ring-black/5">
					{job.companyIcon}
				</div>
				{hasResume && (
					<Badge
						variant="outline"
						className="bg-emerald-500/5 text-emerald-600 border-emerald-500/20 px-2 py-0.5 h-6 font-medium text-[10px] uppercase tracking-wider"
					>
						Ready
					</Badge>
				)}
			</div>

			{/* Card Body */}
			<div className="p-5 flex flex-col flex-1">
				<div className="mb-3">
					<h3 className="font-semibold text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
						{job.title}
					</h3>
					<p className="text-sm text-muted-foreground font-medium">
						{job.company}
					</p>
				</div>

				<div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
					<span className="flex items-center gap-1">
						<MapPin className="size-3" />
						{job.location}
					</span>
					<span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/50" />
					<span>{job.dateAdded}</span>
				</div>

				<p className="text-sm text-muted-foreground/80 line-clamp-2 mb-5 leading-relaxed">
					{job.description}
				</p>

				<div className="mt-auto pt-4 border-t border-border/40 flex items-center gap-2">
					<Link to="/detail/$jdId" params={{ jdId: job.id }} className="flex-1">
						<Button
							variant="outline"
							size="sm"
							className="w-full bg-transparent hover:bg-muted/50 border-border/50 hover:border-primary/30 text-xs font-medium h-8"
						>
							Details
						</Button>
					</Link>
					{hasResume ? (
						<Link
							to="/preview/$jdId"
							params={{ jdId: job.id }}
							className="flex-1"
						>
							<Button
								size="sm"
								className="w-full text-xs font-medium h-8 shadow-none transition-all bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
							>
								View Resume
							</Button>
						</Link>
					) : (
						<Button
							size="sm"
							disabled
							className="flex-1 text-xs font-medium h-8 shadow-none transition-all bg-muted text-muted-foreground hover:bg-muted opacity-50"
						>
							No Resume
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
