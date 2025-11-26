import { Search, LayoutGrid, List, PenTool } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { JdCard } from './JdCard';
import { mockJobDescriptions } from '../data/mockData';

interface JdListScreenProps {
  onOpenPreview: (jdId: string) => void;
  onOpenDetail: (jdId: string) => void;
}

export function JdListScreen({ onOpenPreview, onOpenDetail }: JdListScreenProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = mockJobDescriptions.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20">
      {/* Premium Header */}
      <header className="z-10 border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3 min-w-fit">
              <div className="size-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center ring-1 ring-white/10">
                <PenTool className="size-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold tracking-tight text-foreground">ResumeCraft</h1>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">Viewer & Analyzer</span>
              </div>
            </div>

            {/* Search Bar - Centered & Premium */}
            <div className="flex-1 max-w-md relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="size-4 text-muted-foreground/70 group-focus-within:text-primary transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search roles, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 h-10 text-sm bg-muted/50 border border-border/50 rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/10 focus:border-primary/30 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 placeholder:text-muted-foreground/60"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="text-[10px] font-medium text-muted-foreground/50 border border-border/50 rounded px-1.5 py-0.5 bg-background/50">⌘K</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 min-w-fit">
              <div className="h-8 w-px bg-border/50 mx-1" />
              
              <div className="flex bg-muted/50 p-0.5 rounded-lg border border-border/40">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-background text-primary shadow-sm ring-1 ring-black/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-background text-primary shadow-sm ring-1 ring-black/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Section Header */}
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Active Job Descriptions
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/50">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'File' : 'Files'}
            </span>
          </div>

          {/* Grid/List Layout */}
          <motion.div 
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-3 max-w-5xl mx-auto'
            }
          >
            {filteredJobs.map((job) => (
              <JdCard
                key={job.id}
                job={job}
                viewMode={viewMode}
                onOpenPreview={() => onOpenPreview(job.id)}
                onOpenDetail={() => onOpenDetail(job.id)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in zoom-in duration-300">
              <div className="size-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4 border border-border/50">
                <Search className="size-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-base font-medium mb-1">No jobs found</h3>
              <p className="text-sm text-muted-foreground">
                Adjust your search to find what you're looking for
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}