import { useId } from "react";

export function KeywordMatch({ percentage }: { percentage: number }) {
	const gradientId = useId();
	// Calculate the circumference for a circle with radius 40
	const radius = 40;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="flex items-center justify-center py-2">
			<div className="relative size-28">
				{/* Background circle */}
				<svg className="size-full -rotate-90" viewBox="0 0 100 100">
					<title>Keyword Match Score</title>
					<circle
						cx="50"
						cy="50"
						r={radius}
						stroke="currentColor"
						strokeWidth="6"
						fill="none"
						className="text-muted/20"
					/>
					{/* Progress circle */}
					<circle
						cx="50"
						cy="50"
						r={radius}
						stroke={`url(#${gradientId})`}
						strokeWidth="6"
						fill="none"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						className="transition-all duration-1000 ease-out"
					/>
					<defs>
						<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="var(--color-primary)" />
							<stop offset="100%" stopColor="#6366f1" />
						</linearGradient>
					</defs>
				</svg>

				{/* Percentage text */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<div className="text-2xl font-bold text-foreground tracking-tight">
						{percentage}%
					</div>
					<div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
						Match
					</div>
				</div>
			</div>
		</div>
	);
}
