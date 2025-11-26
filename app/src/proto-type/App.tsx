import { useState } from 'react';
import { JdListScreen } from './components/JdListScreen';
import { ResumePreviewScreen } from './components/ResumePreviewScreen';
import { JdDetailScreen } from './components/JdDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'list' | 'preview' | 'detail'
  >('list');
  const [selectedJd, setSelectedJd] = useState<string | null>(null);

  const navigateToPreview = (jdId: string) => {
    setSelectedJd(jdId);
    setCurrentScreen('preview');
  };

  const navigateToDetail = (jdId: string) => {
    setSelectedJd(jdId);
    setCurrentScreen('detail');
  };

  const navigateToList = () => {
    setCurrentScreen('list');
    setSelectedJd(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary/20">
      {currentScreen === 'list' && (
        <JdListScreen
          onOpenPreview={navigateToPreview}
          onOpenDetail={navigateToDetail}
        />
      )}
      {currentScreen === 'preview' && selectedJd && (
        <ResumePreviewScreen
          jdId={selectedJd}
          onBack={navigateToList}
          onOpenJdDetail={() => navigateToDetail(selectedJd)}
        />
      )}
      {currentScreen === 'detail' && selectedJd && (
        <JdDetailScreen
          jdId={selectedJd}
          onBack={navigateToList}
          onGenerateResume={() => navigateToPreview(selectedJd)}
        />
      )}
    </div>
  );
}
