import { AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface MissingKeywordsProps {
	keywords: string[];
}

export function MissingKeywords({ keywords }: MissingKeywordsProps) {
	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-2">
				{keywords.map((keyword, index) => (
					<Badge
						key={index}
						variant="outline"
						className="border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 transition-colors font-normal"
					>
						{keyword}
					</Badge>
				))}
			</div>
			<p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
				<AlertCircle className="size-3 opacity-70" />
				Consider adding these terms to improve ATS ranking
			</p>
		</div>
	);
}
