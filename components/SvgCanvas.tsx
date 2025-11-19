import React, { useRef, useEffect } from 'react';
import { SvgSettings, GenerationMode } from '../types';

interface SvgCanvasProps {
  settings: SvgSettings;
  aiSvgCode: string | null;
  mode: GenerationMode;
  svgRef: React.RefObject<HTMLDivElement>;
}

export const SvgCanvas: React.FC<SvgCanvasProps> = ({ settings, aiSvgCode, mode, svgRef }) => {

  // Calculate viewbox centering
  const viewBoxWidth = 800;
  const viewBoxHeight = 600;
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;

  return (
    <div className="flex-1 h-full bg-slate-900 flex items-center justify-center p-8 overflow-hidden relative">

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
             backgroundSize: '24px 24px'
           }}
      />

      <div className="relative w-full max-w-4xl aspect-[4/3] bg-slate-800/50 rounded-xl border-2 border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
        {/* This div is what we will convert/download */}
        <div ref={svgRef} className="w-full h-full flex items-center justify-center p-4">

          {mode === GenerationMode.STANDARD ? (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              xmlns="http://www.w3.org/2000/svg"
              style={{ backgroundColor: settings.backgroundColor }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="3" dy="3" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily={settings.fontFamily}
                fontSize={settings.fontSize}
                fill={settings.fillColor}
                stroke={settings.strokeColor}
                strokeWidth={settings.strokeWidth}
                transform={`rotate(${settings.rotation}, ${centerX}, ${centerY})`}
                filter={settings.shadow ? "url(#dropShadow)" : undefined}
              >
                {settings.text}
              </text>
            </svg>
          ) : (
            // AI Mode Render
            <div
              className="w-full h-full flex items-center justify-center p-4"
              dangerouslySetInnerHTML={{
                __html: aiSvgCode || `
                  <div class="text-slate-500 flex flex-col items-center justify-center h-full">
                    <p>Waiting for AI generation...</p>
                  </div>
                `
              }}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-6 right-8 bg-slate-800/80 px-4 py-2 rounded-full text-xs text-slate-400 backdrop-blur border border-slate-700">
        {mode === GenerationMode.STANDARD ? 'Vector Editable Mode' : 'AI Generated Mode'}
      </div>
    </div>
  );
};