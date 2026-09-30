import React from 'react';
import { X, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { DEMO_SCENARIOS } from '../../data/demoScenarios';
import { DemoScenario } from '../../types';

interface DemoScenarioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: DemoScenario) => void;
}

export const DemoScenarioDrawer: React.FC<DemoScenarioDrawerProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white p-6 shadow-2xl overflow-y-auto dark:bg-slate-900 dark:border-l dark:border-slate-800 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Preloaded Demo Scenarios
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reliable deterministic evaluation scenarios
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-3 rounded-lg bg-indigo-50/70 p-3 text-xs text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
            Select any scenario below to automatically populate the citizen portal and inspect the full end-to-end Gemini extraction pipeline.
          </div>

          {/* Scenarios List */}
          <div className="mt-4 space-y-3">
            {DEMO_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                onClick={() => {
                  onSelectScenario(sc);
                  onClose();
                }}
                className="group cursor-pointer rounded-xl border border-slate-200 p-3.5 transition hover:border-indigo-500 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:border-indigo-500 dark:hover:bg-slate-800/60"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                    {sc.title.split('—')[0]}
                  </span>
                  <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-300">
                    {sc.languageLabel.split(' ')[0]}
                  </span>
                </div>

                <div className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {sc.district}, {sc.state} • {sc.sector}
                </div>

                <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 italic line-clamp-2">
                  &ldquo;{sc.originalText}&rdquo;
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {sc.structuredExtraction.subcategory}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-300">
                    <span>Load Scenario</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 dark:border-slate-800">
          JanSetu AI • Code for Communities Prototype
        </div>
      </div>
    </div>
  );
};
