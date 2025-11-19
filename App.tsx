import React, { useState, useRef, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { SvgCanvas } from './components/SvgCanvas';
import { PreviewModal } from './components/PreviewModal';
import { SvgSettings, GenerationMode } from './types';
import { generateArtisticSvg } from './services/geminiService';

export default function App() {
  const [settings, setSettings] = useState<SvgSettings>({
    text: 'Jason',
    fontSize: 120,
    fillColor: '#6366f1', // Indigo-500
    strokeColor: '#ffffff',
    strokeWidth: 2,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: 'transparent',
    rotation: 0,
    shadow: true,
  });

  const [mode, setMode] = useState<GenerationMode>(GenerationMode.STANDARD);
  const [aiSvgCode, setAiSvgCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSvgCode, setPreviewSvgCode] = useState<string | null>(null);

  const svgContainerRef = useRef<HTMLDivElement>(null);

  const handleSettingsUpdate = useCallback((newSettings: Partial<SvgSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleAiGenerate = async (stylePrompt: string) => {
    setIsGenerating(true);
    try {
      const code = await generateArtisticSvg(settings.text, stylePrompt);
      setAiSvgCode(code);
    } catch (error) {
      console.error("Failed to generate", error);
      alert("Failed to generate SVG. See console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = useCallback(() => {
    if (!svgContainerRef.current) return;
    
    // Extract the inner SVG element logic (shared concept with download)
    const svgElement = svgContainerRef.current.querySelector('svg');
    
    if (!svgElement) {
      alert("No SVG generated yet to preview.");
      return;
    }

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    
    setPreviewSvgCode(source);
    setIsPreviewOpen(true);
  }, []);

  const handleDownload = useCallback((format: 'svg' | 'png') => {
    if (!svgContainerRef.current) return;

    // Extract the inner SVG element
    const svgElement = svgContainerRef.current.querySelector('svg');
    
    if (!svgElement) {
      alert("No SVG found to download.");
      return;
    }

    // Serialize the SVG
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Add name spaces if missing
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+xmlns:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    // Add XML declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const filename = `jason-${mode === GenerationMode.STANDARD ? 'standard' : 'artistic'}`;

    if (format === 'svg') {
        // Create a Blob for SVG
        const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } else {
        // PNG Conversion logic
        const canvas = document.createElement('canvas');
        // Get dimensions from SVG or default to 800x600 if undefined (standard viewbox)
        const viewBox = svgElement.getAttribute('viewBox')?.split(' ').map(Number);
        const svgWidth = viewBox && viewBox.length === 4 ? viewBox[2] : 800;
        const svgHeight = viewBox && viewBox.length === 4 ? viewBox[3] : 600;

        // Render at 2x resolution for better quality
        const scale = 2;
        canvas.width = svgWidth * scale;
        canvas.height = svgHeight * scale;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const pngUrl = canvas.toDataURL('image/png');
            
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `${filename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };

        img.onerror = () => {
            alert("Failed to convert SVG to PNG.");
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }
  }, [mode]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 text-white font-sans">
      <ControlPanel 
        settings={settings} 
        onUpdate={handleSettingsUpdate} 
        onGenerateAi={handleAiGenerate}
        isGenerating={isGenerating}
        mode={mode}
        setMode={setMode}
        onDownload={handleDownload}
        onPreview={handlePreview}
      />
      <SvgCanvas 
        settings={settings}
        aiSvgCode={aiSvgCode}
        mode={mode}
        svgRef={svgContainerRef}
      />
      <PreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        svgCode={previewSvgCode}
      />
    </div>
  );
}