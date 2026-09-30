import React from 'react';
import { ArrowDown, Layers, Sparkles, Bus } from 'lucide-react';

export const SemanticConvergence: React.FC = () => {
  return (
    <div className="rounded-xl border border-indigo-100 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/40 p-5 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100/60 dark:border-indigo-950/40">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Different voices. One development signal.
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Multilingual semantic normalization powered by Google Gemini
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-100/80 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
          <Sparkles className="h-3 w-3 text-indigo-500" />
          Cross-Lingual Convergence
        </span>
      </div>

      {/* 3 Diverse Language Inputs */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Tamil Card */}
        <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">தமிழ் (Tamil)</span>
            <span className="text-slate-400">Dharmapuri, TN</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-200 italic">
            &ldquo;எங்கள் ஊரில் மருத்துவமனைக்கு செல்ல பேருந்து வசதி சரியாக இல்லை.&rdquo;
          </p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            &ldquo;There are no regular buses connecting our village to the hospital.&rdquo;
          </p>
        </div>

        {/* Hindi Card */}
        <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">हिन्दी (Hindi)</span>
            <span className="text-slate-400">Mirzapur, UP</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-200 italic">
            &ldquo;हमारे गांव में अस्पताल जाने के लिए बस की सुविधा बहुत कम है।&rdquo;
          </p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            &ldquo;Bus facilities to reach the hospital are severely insufficient.&rdquo;
          </p>
        </div>

        {/* English Card */}
        <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">English</span>
            <span className="text-slate-400">Kalaburagi, KA</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-200 italic">
            &ldquo;There are no regular buses connecting our village to the district hospital.&rdquo;
          </p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            &ldquo;Critical rural healthcare transit deficit.&rdquo;
          </p>
        </div>
      </div>

      {/* Downward Convergence Arrow */}
      <div className="my-2.5 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span>Semantic Normalization Layer</span>
        </div>
      </div>

      {/* Unified Output Signal */}
      <div className="rounded-lg border border-indigo-300 bg-indigo-600 p-3 text-white shadow-sm dark:border-indigo-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-white">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-indigo-200">
                Unified Development Signal
              </span>
              <h4 className="font-bold text-sm sm:text-base leading-tight">
                Public Transportation Connectivity: Rural Healthcare Feeder Deficit
              </h4>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 font-medium text-[11px]">
              Sector: Transportation • Category: Feeder Transit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
