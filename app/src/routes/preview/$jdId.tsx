import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	ChevronDown,
	Download,
	Maximize2,
	Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AtsPanel } from "@/components/AtsPanel";
import { PdfViewer } from "@/components/PdfViewer";
import { Button } from "@/components/ui/button";
import { mockAtsAnalysis, mockJobDescriptions } from "@/data/mockData";

export const Route = createFileRoute("/preview/$jdId")({
	component: ResumePreviewScreen,
});

function ResumePreviewScreen() {
	const { jdId } = Route.useParams();
	const navigate = useNavigate();
	const job = mockJobDescriptions.find((j) => j.id === jdId);
	const [selectedVersion, setSelectedVersion] = useState(
		job?.resumeVersions || 1,
	);
	const [showPanel, setShowPanel] = useState(true);

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

	const handleOpenJdDetail = () => {
		navigate({ to: "/detail/$jdId", params: { jdId: job.id } });
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex flex-col h-screen bg-background overflow-hidden"
		>
			{/* Header */}
			<header className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 z-10">
				<div className="flex items-center gap-4">
					<Link to="/">
						<Button
							variant="ghost"
							size="sm"
							className="text-muted-foreground hover:text-foreground -ml-2 h-8"
						>
							<ArrowLeft className="size-4 mr-2" />
							Back
						</Button>
					</Link>

					<div className="h-4 w-px bg-border/50" />

					<button
						onClick={handleOpenJdDetail}
						className="flex items-center gap-2 text-sm group/title hover:bg-muted/50 px-2 py-1 rounded transition-colors text-left"
					>
						<span className="font-semibold text-foreground group-hover/title:text-primary transition-colors">
							{job.title}
						</span>
						<span className="text-muted-foreground opacity-50">•</span>
						<span className="text-muted-foreground group-hover/title:text-foreground/80 transition-colors">
							{job.company}
						</span>
						<ChevronDown className="size-3 text-muted-foreground opacity-0 group-hover/title:opacity-100 -rotate-90" />
					</button>
				</div>

				<div className="flex items-center gap-2">
					{/* Version Selector */}
					{job.resumeVersions && job.resumeVersions > 1 && (
						<div className="relative mr-2">
							<select
								value={selectedVersion}
								onChange={(e) => setSelectedVersion(Number(e.target.value))}
								className="appearance-none bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-md pl-3 pr-8 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer min-w-[120px]"
							>
								{Array.from(
									{ length: job.resumeVersions },
									(_, i) => i + 1,
								).map((v) => (
									<option key={v} value={v}>
										Version {v} {v === job.resumeVersions ? "(Latest)" : ""}
									</option>
								))}
							</select>
							<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground pointer-events-none" />
						</div>
					)}

					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-muted-foreground"
					>
						<Share2 className="size-4" />
					</Button>

					<Button variant="outline" size="sm" className="h-8 text-xs gap-2">
						<Download className="size-3.5" />
						Download PDF
					</Button>

					<Button
						variant={showPanel ? "secondary" : "ghost"}
						size="icon"
						onClick={() => setShowPanel(!showPanel)}
						className="h-8 w-8 ml-2"
						title="Toggle Analysis Panel"
					>
						<Maximize2 className="size-4" />
					</Button>
				</div>
			</header>

			{/* Split View */}
			<div className="flex-1 flex overflow-hidden relative">
				{/* Left: PDF Viewer */}
				<div className="flex-1 flex flex-col bg-muted/10 relative">
					<div className="absolute inset-0 overflow-hidden">
						<PdfViewer />
					</div>
				</div>

				{/* Right: ATS Analysis */}
				<motion.div
					initial={{ width: 380, opacity: 1 }}
					animate={{
						width: showPanel ? 400 : 0,
						opacity: showPanel ? 1 : 0,
					}}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="border-l border-border/50 bg-background/80 backdrop-blur-xl overflow-hidden flex flex-col"
				>
					<div className="flex-1 overflow-y-auto w-[400px]">
						<AtsPanel analysis={mockAtsAnalysis} />
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
