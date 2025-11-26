import { ZoomIn, ZoomOut, Maximize2, RotateCw, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function PdfViewer() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  return (
    <div className="flex flex-col h-full relative bg-muted/30 dark:bg-black/20">
      {/* Floating PDF Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1 rounded-full bg-background/90 backdrop-blur shadow-lg shadow-black/5 dark:shadow-black/20 border border-border/50 ring-1 ring-black/5 dark:ring-white/5">
        <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8 rounded-full hover:bg-muted">
          <ZoomOut className="size-4 text-muted-foreground" />
        </Button>
        
        <div className="px-2 min-w-[3rem] text-center">
          <span className="text-xs font-medium text-foreground">{zoom}%</span>
        </div>
        
        <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8 rounded-full hover:bg-muted">
          <ZoomIn className="size-4 text-muted-foreground" />
        </Button>
        
        <div className="w-px h-4 bg-border/50 mx-1" />
        
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
          <RotateCw className="size-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
          <Maximize2 className="size-4 text-muted-foreground" />
        </Button>
      </div>

      {/* PDF Preview Area */}
      <div className="flex-1 overflow-auto p-8 pt-20 flex items-start justify-center">
        <div 
          className="bg-white relative transition-transform duration-200 ease-out origin-top"
          style={{ 
            width: `${8.5 * 96}px`,
            minHeight: `${11 * 96}px`,
            transform: `scale(${zoom / 100})`,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 8px 40px -8px rgba(0,0,0,0.08), 0 20px 60px -12px rgba(0,0,0,0.08)'
          }}
        >
          {/* Mock Resume Content - Force Light Mode for "Paper" feel */}
          <div className="p-12 text-gray-900 h-full font-sans">
             {/* Header */}
             <div className="mb-8 pb-6 border-b-2 border-gray-900">
              <h1 className="text-3xl font-bold mb-2 tracking-tight">ALEX RIVERA</h1>
              <div className="text-sm text-gray-600 flex gap-3 font-medium">
                <span>alex.rivera@email.com</span>
                <span className="text-gray-300">•</span>
                <span>+1 (555) 123-4567</span>
                <span className="text-gray-300">•</span>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h2 className="text-xs font-bold mb-3 text-gray-500 tracking-widest uppercase">Professional Summary</h2>
              <p className="text-sm text-gray-800 leading-relaxed">
                Results-driven Senior Frontend Engineer with 7+ years of experience building scalable web applications
                using React, TypeScript, and modern JavaScript frameworks. Proven track record of optimizing performance,
                leading technical initiatives, and mentoring junior developers.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-xs font-bold mb-3 text-gray-500 tracking-widest uppercase">Technical Skills</h2>
              <div className="text-sm text-gray-800 grid grid-cols-1 gap-2">
                <div className="flex">
                  <span className="font-semibold w-32 flex-shrink-0">Languages</span>
                  <span className="text-gray-600">JavaScript, TypeScript, Python, HTML5, CSS3</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32 flex-shrink-0">Frameworks</span>
                  <span className="text-gray-600">React, Next.js, Node.js, Express, Tailwind CSS</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32 flex-shrink-0">Tools</span>
                  <span className="text-gray-600">Git, Docker, AWS, CI/CD, Jest, Webpack, Vite</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase">Experience</h2>
              
              <div className="mb-6 relative pl-4 border-l-2 border-gray-100">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">Senior Frontend Engineer</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">2021 - Present</span>
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-3">TechCorp Inc. • San Francisco, CA</p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside marker:text-gray-300">
                  <li>Architected and implemented responsive React components serving 2M+ users</li>
                  <li>Reduced bundle size by 40% through code-splitting and lazy loading strategies</li>
                  <li>Led migration from JavaScript to TypeScript, improving code maintainability</li>
                  <li>Mentored 5 junior developers and conducted regular code reviews</li>
                </ul>
              </div>

              <div className="mb-6 relative pl-4 border-l-2 border-gray-100">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">Frontend Engineer</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">2019 - 2021</span>
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-3">StartupXYZ • Remote</p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside marker:text-gray-300">
                  <li>Developed customer-facing dashboard using React and Redux</li>
                  <li>Improved Lighthouse performance score from 65 to 95</li>
                  <li>Implemented comprehensive unit and integration tests (90% coverage)</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase">Education</h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">Bachelor of Science in Computer Science</h3>
                  <p className="text-sm text-gray-600 mt-1">University of California, Berkeley</p>
                </div>
                <span className="text-sm text-gray-500">2015 - 2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
