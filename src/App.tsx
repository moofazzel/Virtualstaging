import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { BeforeAfter } from './components/BeforeAfter';
import { Benefits } from './components/Benefits';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { StagingEditor } from './components/StagingEditor';

export default function App() {
  const [showEditor, setShowEditor] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Mock staged image - in real app, this would come from your AI API
  const stagedImage = 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
  
  // Mock original image
  const originalImage = 'https://images.unsplash.com/photo-1610873521448-4c25dd48c28f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGxpdmluZyUyMHJvb20lMjBzdGFnaW5nfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  const handleRegenerate = (room: string, style: string) => {
    console.log('Regenerating with:', room, style);
    // Here you would call your AI API to regenerate the image
  };
  
  const handleTryDemo = () => {
    setUploadedImage(originalImage);
    setShowEditor(true);
    window.scrollTo(0, 0);
  };

  if (showEditor && uploadedImage) {
    return (
      <>
        <Navigation onTryDemo={() => {
          setShowEditor(false);
          setUploadedImage(null);
        }} />
        <div className="pt-16">
          <StagingEditor
            originalImage={uploadedImage}
            stagedImage={stagedImage}
            onRegenerate={handleRegenerate}
            onBack={() => {
              setShowEditor(false);
              setUploadedImage(null);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation onTryDemo={handleTryDemo} />
      <Hero />
      <Features />
      <BeforeAfter />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}