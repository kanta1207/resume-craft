import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Target,
  Zap,
} from 'lucide-react';
import { KeywordMatch } from './KeywordMatch';
import { MissingKeywords } from './MissingKeywords';
import { Badge } from './ui/badge';
import type { AtsAnalysis } from '@/data/mockData';

interface AtsPanelProps {
  analysis: AtsAnalysis;
}

export function AtsPanel({ analysis }: AtsPanelProps) {
  return (
    <div className="p-6 space-y-8 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Analysis Report</h3>
          <p className="text-xs text-muted-foreground">
            ATS Optimization Score
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {analysis.overallScore}%
          </div>
          <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-wide">
            Excellent
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="relative group overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-black/5">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Match Potential</span>
            </div>
            <Badge
              variant="secondary"
              className="bg-background/50 backdrop-blur-sm text-primary shadow-none"
            >
              High Priority
            </Badge>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/50">
            <div
              className="h-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-1000 ease-out"
              style={{ width: `${analysis.overallScore}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Your resume demonstrates strong alignment with the job requirements.
            Focus on adding quantifiable metrics to increase impact.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3 rounded-xl border border-border/50 bg-card p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span className="text-xs font-medium">Keywords</span>
          </div>
          <div>
            <div className="text-xl font-semibold text-foreground">
              {analysis.matchedKeywords}/{analysis.totalKeywords}
            </div>
            <div className="text-xs text-muted-foreground">Terms Matched</div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border/50 bg-card p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-medium">Impact</span>
          </div>
          <div>
            <div className="text-xl font-semibold text-foreground">8.2</div>
            <div className="text-xs text-muted-foreground">Verb Strength</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Sections */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Keyword Analysis
          </h4>

          <div className="rounded-xl border border-border/50 bg-card p-4 space-y-4">
            <div>
              <span className="text-xs font-medium text-muted-foreground mb-2 block">
                Found in Resume
              </span>
              <KeywordMatch percentage={analysis.keywordMatch} />
            </div>

            <div className="pt-4 border-t border-border/40">
              <span className="text-xs font-medium text-amber-600/90 mb-2 flex items-center gap-1.5">
                <AlertCircle className="size-3" />
                Missing Critical Terms
              </span>
              <MissingKeywords keywords={analysis.missingKeywords} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Structure Analysis
          </h4>
          <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/40">
            {[
              { label: 'Contact Information', status: true },
              { label: 'Professional Summary', status: true },
              { label: 'Work Experience', status: true },
              { label: 'Skills Section', status: true },
              { label: 'Education', status: true },
              { label: 'Quantifiable Achievements', status: false },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 text-sm"
              >
                <span className="text-muted-foreground">{item.label}</span>
                {item.status ? (
                  <CheckCircle2 className="size-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="size-4 text-amber-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4">
          <h4 className="text-sm font-medium text-amber-700 mb-3 flex items-center gap-2">
            <Zap className="size-3.5" />
            Optimization Tips
          </h4>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-xs text-muted-foreground">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>
                Add more quantifiable achievements with specific metrics (e.g.,
                "Increased revenue by 20%")
              </span>
            </li>
            <li className="flex gap-2.5 text-xs text-muted-foreground">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>
                Include "cloud architecture" and "microservices" to match JD
                requirements
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

