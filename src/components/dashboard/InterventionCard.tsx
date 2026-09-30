import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Hotspot } from '../../types';
import { generateHotspotSynthesis, SynthesisResponse } from '../../lib/geminiClient';

interface InterventionCardProps {
  hotspot: Hotspot;
}

export const InterventionCard: React.FC<InterventionCardProps> = ({ hotspot }) => {
  const [synthesis, setSynthesis] = useState<SynthesisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    generateHotspotSynthesis(hotspot).then((res) => {
      if (isMounted) {
        setSynthesis(res);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [hotspot.id]);

  const defaultIntervention =
    hotspot.sector === 'transportation'
      ? 'Evaluate increased public transport route coverage and service frequency, with particular attention to connections serving critical healthcare facilities during morning and evening outpatient shifts.'
      : `Prioritize high-impact civic remediation for ${hotspot.sector} in ${hotspot.district}, coordinating with relevant line departments to expand coverage.`;

  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-xs dark:border-emerald-950 dark:bg-slate-900">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Candidate intervention
          </h4>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Formulated from multi-signal correlation for executive deliberation
          </span>
        </div>
      </div>

      {/* Intervention Text */}
      <div className="mt-3.5 rounded-lg bg-emerald-50/60 p-3.5 dark:bg-emerald-950/30">
        {isLoading ? (
          <div className="space-y-2 py-1">
            <div className="h-3 w-5/6 rounded-sm bg-slate-200 animate-pulse dark:bg-slate-800" />
            <div className="h-3 w-4/6 rounded-sm bg-slate-200 animate-pulse dark:bg-slate-800" />
          </div>
        ) : (
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {synthesis?.candidateIntervention || defaultIntervention}
          </p>
        )}
      </div>

      {/* Why This Appears */}
      <div className="mt-4">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 dark:text-slate-400">
          Why this appears in intelligence review
        </span>
        <ul className="space-y-2">
          {hotspot.whyThisAppears && hotspot.whyThisAppears.length > 0 ? (
            hotspot.whyThisAppears.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))
          ) : (
            <>
              <li className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>High citizen demand ({hotspot.requestCount} verified signals)</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>Limited service coverage ({hotspot.serviceCoverage}%)</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>Significant affected population ({hotspot.population.toLocaleString('en-IN')})</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>Healthcare access and economic connectivity dependency</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Explicit Disclaimer */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 text-[11px] font-medium text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
        <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>
          <strong>Decision-Support Notice:</strong> For policymaker review — not an autonomous policy or resource allocation decision.
        </span>
      </div>
    </div>
  );
};
