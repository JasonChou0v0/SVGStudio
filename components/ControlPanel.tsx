import React from 'react';
import { SvgSettings, GenerationMode } from '../types';
import { Settings, Palette, Type, Box, Wand2, Download, RefreshCw, Eye, Image as ImageIcon, FileCode } from 'lucide-react';

interface ControlPanelProps {
  settings: SvgSettings;
  onUpdate: (newSettings: Partial<SvgSettings>) => void;
  onGenerateAi: (style: string) => void;
  isGenerating: boolean;
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
  onDownload: (format: 'svg' | 'png') => void;
  onPreview: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onUpdate,
  onGenerateAi,
  isGenerating,
  mode,
  setMode,
  onDownload,
  onPreview
}) => {
  const [aiPrompt, setAiPrompt] = React.useState('Cyberpunk neon style with glowing borders');

  return (
    <div className="bg-slate-800 border-r border-slate-700 w-full lg:w-80 flex-shrink-0 flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Box className="text-indigo-400" />
          <span>SVG Studio</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Created for Jason</p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        
        {/* Mode Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-lg">
          <button
            onClick={() => setMode(GenerationMode.STANDARD)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === GenerationMode.STANDARD 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMode(GenerationMode.AI_ARTISTIC)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === GenerationMode.AI_ARTISTIC 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Artist
          </button>
        </div>

        {/* Standard Controls */}
        {mode === GenerationMode.STANDARD && (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold pb-2 border-b border-slate-700/50">
                <Type size={16} />
                <h2>Typography</h2>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Text Content</label>
                <input
                  type="text"
                  value={settings.text}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Font Family</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Inter, sans-serif">Inter (Sans)</option>
                  <option value="'Playfair Display', serif">Playfair (Serif)</option>
                  <option value="'Roboto Mono', monospace">Roboto Mono</option>
                  <option value="cursive">Cursive</option>
                  <option value="fantasy">Fantasy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Font Size ({settings.fontSize}px)</label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={settings.fontSize}
                  onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold pb-2 border-b border-slate-700/50">
                <Palette size={16} />
                <h2>Colors & Effects</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Fill</label>
                  <input
                    type="color"
                    value={settings.fillColor}
                    onChange={(e) => onUpdate({ fillColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Stroke</label>
                  <input
                    type="color"
                    value={settings.strokeColor}
                    onChange={(e) => onUpdate({ strokeColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>
               
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Stroke Width ({settings.strokeWidth}px)</label>
                 <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={settings.strokeWidth}
                  onChange={(e) => onUpdate({ strokeWidth: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.shadow}
                    onChange={(e) => onUpdate({ shadow: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                  />
                  <span className="text-sm text-slate-300">Enable Drop Shadow</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* AI Controls */}
        {mode === GenerationMode.AI_ARTISTIC && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-300 font-semibold pb-2 border-b border-slate-700/50">
              <Wand2 size={16} />
              <h2>AI Generator</h2>
            </div>

            <p className="text-sm text-slate-400">
              Use Gemini to generate artistic, code-based SVGs that go beyond standard fonts.
            </p>

            {!import.meta.env.VITE_GEMINI_API_KEY && (
              <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-3">
                <p className="text-amber-200 text-sm">
                  <strong>API Key Missing:</strong> AI features are disabled. To enable AI generation, please set the <code className="bg-amber-800/50 px-1 rounded">VITE_GEMINI_API_KEY</code> environment variable.
                </p>
                <p className="text-amber-200 text-sm mt-2">
                  Deploy this app to Vercel and add your Gemini API key in the project settings to enable AI features.
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Style Prompt</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                placeholder="Describe the style (e.g., graffiti, calligraphy, fire effects)..."
              />
            </div>

            <button
              onClick={() => onGenerateAi(aiPrompt)}
              disabled={isGenerating || !import.meta.env.VITE_GEMINI_API_KEY}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={18} /> Generating...
                </>
              ) : (
                <>
                  <Wand2 size={18} /> Generate with Gemini
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800 grid grid-cols-4 gap-2">
        <button
          onClick={onPreview}
          title="Preview"
          className="col-span-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={() => onDownload('svg')}
          className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50"
        >
          <FileCode size={18} /> SVG
        </button>
        <button
          onClick={() => onDownload('png')}
          title="Download PNG"
          className="col-span-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50"
        >
          <ImageIcon size={20} />
        </button>
      </div>
    </div>
  );
};