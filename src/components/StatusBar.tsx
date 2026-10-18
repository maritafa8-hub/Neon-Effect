/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProcessedImageInfo } from '../types/neon';
import { NeonLogo } from './NeonLogo';

interface StatusBarProps {
  imageInfo: ProcessedImageInfo | null;
  zoom: number;
  renderTimeMs: number;
  isRendering: boolean;
  error: string | null;
  svgLayerCount?: number;
  selectedCount?: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  imageInfo,
  zoom,
  renderTimeMs,
  isRendering,
  error,
  svgLayerCount,
  selectedCount,
}) => {
  return (
    <footer className="h-7 bg-slate-950 border-t border-slate-800/80 px-3 flex items-center justify-between text-[11px] text-slate-400 font-mono z-30 select-none">
      {/* Left: File info & Layer count */}
      <div className="flex items-center gap-2.5 truncate">
        <div className="flex items-center gap-1.5 shrink-0 px-1.5 py-0.5 rounded bg-black/50 border border-slate-800">
          <NeonLogo size={14} withGlow={false} />
          <span className="text-[10px] text-pink-400 font-semibold tracking-wider font-sans">NEON GLOW</span>
        </div>
        <span className="text-slate-700">|</span>
        {error ? (
          <div className="flex items-center gap-1.5 text-red-400 font-sans">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        ) : (
          <>
            <span className="text-slate-300 truncate max-w-[200px]">
              {imageInfo?.fileName || 'No file loaded'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="tabular-nums">
              {imageInfo ? `${imageInfo.width} × ${imageInfo.height} px` : '—'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="uppercase text-slate-400">
              {imageInfo
                ? imageInfo.type === 'svg'
                  ? `SVG Vector (${svgLayerCount || 0} Paths)`
                  : imageInfo.hasAlpha
                  ? 'Alpha PNG Mask'
                  : 'Raster Outline'
                : 'Artboard Empty'}
            </span>
            {selectedCount !== undefined && selectedCount > 0 && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400 font-semibold">
                  📌 {selectedCount} Selected
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* Right: Performance & State Metrics */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span className="tabular-nums">
            {isRendering ? 'Processing...' : `${renderTimeMs} ms`}
          </span>
        </div>

        <span className="text-slate-600">·</span>

        <span className="tabular-nums text-slate-300">
          Zoom: {Math.round(zoom * 100)}%
        </span>

        <span className="text-slate-600">·</span>

        <div className="flex items-center gap-1 text-slate-400">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Local Engine</span>
        </div>
      </div>
    </footer>
  );
};
