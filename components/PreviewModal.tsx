import React, { useState } from 'react';
import { X, Sun, Moon, Grid } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgCode: string | null;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, svgCode }) => {
  const [bg, setBg] = useState<'grid' | 'white' | 'black'>('grid');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col border border-slate-700 overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800 z-10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>SVG Preview</span>
          </h2>
          <div className="flex items-center gap-4">
            {/* Background Toggles */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button 
                onClick={() => setBg('grid')}
                className={`p-2 rounded-md transition-colors ${bg === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid Background"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setBg('white')}
                className={`p-2 rounded-md transition-colors ${bg === 'white' ? 'bg-slate-200 text-black' : 'text-slate-400 hover:text-white'}`}
                title="White Background"
              >
                <Sun size={18} />
              </button>
              <button 
                onClick={() => setBg('black')}
                className={`p-2 rounded-md transition-colors ${bg === 'black' ? 'bg-black text-white border border-slate-600' : 'text-slate-400 hover:text-white'}`}
                title="Black Background"
              >
                <Moon size={18} />
              </button>
            </div>
            
            <div className="h-6 w-px bg-slate-700"></div>

            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className={`flex-1 w-full h-full overflow-auto flex items-center justify-center relative p-8 ${
          bg === 'white' ? 'bg-white' : bg === 'black' ? 'bg-black' : 'bg-slate-800'
        }`}>
           {bg === 'grid' && (
             <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
                 backgroundSize: '24px 24px' 
               }} 
             />
           )}
           
           {svgCode ? (
             <div 
               className="w-full h-full flex items-center justify-center max-w-[90%] max-h-[90%]"
               dangerouslySetInnerHTML={{ __html: svgCode }} 
             />
           ) : (
             <div className="text-slate-500 flex flex-col items-center justify-center">
               <p>No SVG content available to preview.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};