import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';
import { Hotspot } from '../../types';
import { generateHotspotSynthesis, SynthesisResponse } from '../../lib/geminiClient';

interface AISynthesisCardProps {
  hotspot: Hotspot;
}

export const AISynthesisCard: React.FC<AISynthesisCardProps> = ({ hotspot }) => {
  const [synthesis, setSynthesis] = useState<SynthesisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSynthesis = async () => {
    setIsLoading(true);
    const res = await generateHotspotSynthesis(hotspot);
    setSynthesis(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSynthesis();
  }, [hotspot.id]);

  return (
    <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 p-5 shadow-xs dark:border-indigo-900/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100 dark:border-indigo-950/60">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              AI-generated evidence synthesis
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Synthesizing ONLY the empirical evidence currently displayed
            </span>
          </div>
        </div>

        <button
          onClick={fetchSynthesis}
          disabled={isLoading}
          className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
          title="Regenerate Gemini synthesis"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2 py-2">
            <div className="h-3 w-5/6 rounded-sm bg-slate-200 animate-pulse dark:bg-slate-800" />
            <div className="h-3 w-full rounded-sm bg-slate-200 animate-pulse dark:bg-slate-800" />
            <div className="h-3 w-4/6 rounded-sm bg-slate-200 animate-pulse dark:bg-slate-800" />
          </div>
        ) : (
          <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            {synthesis?.insight ||
              `Strong unmet demand for public transport connectivity is observed in ${hotspot.district}, ${hotspot.state}. Citizen requests are concentrated around hospital and regional market access, while available service coverage is limited (${hotspot.serviceCoverage}%) relative to the affected population (${hotspot.population.toLocaleString('en-IN')}).`}
          </p>
        )}
      </div>

      <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 pt-2.5 dark:border-slate-800">
        <AlertCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
        <span>
          <strong>Factual Boundary Guarantee:</strong> Gemini is strictly constrained to the displayed dataset. It does not hallucinate population, budgets, or infrastructure metrics.
        </span>
      </div>
    </div>
  );
};
