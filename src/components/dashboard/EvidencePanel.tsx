import React from 'react';
import {
  Users,
  Activity,
  Layers,
  MapPin,
  TrendingDown,
  Building2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Coins,
} from 'lucide-react';
import { Hotspot } from '../../types';

interface EvidencePanelProps {
  hotspot: Hotspot;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ hotspot }) => {
  return (
    <div className="space-y-6">
      {/* Empirical Evidence Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Citizen Demand */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-medium">Citizen Demand</span>
            <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />
          </div>
          <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {hotspot.requestCount}
          </div>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
            Verified Citizen Signals
          </span>
        </div>

        {/* District Population */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-medium">District Population</span>
            <Users className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {hotspot.population.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {hotspot.demographics?.ruralPopulationPct || 82}% Rural Population
          </span>
        </div>

        {/* Existing Service Coverage */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-medium">Service Coverage</span>
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {hotspot.serviceCoverage}%
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Baseline public transit
          </span>
        </div>

        {/* Infrastructure Gap */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-medium">Infrastructure Gap</span>
            <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
          </div>
          <div className="mt-1 text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400">
            {hotspot.infrastructureGap}%
          </div>
          <span className="text-[10px] text-rose-500 dark:text-rose-400">
            Unmet service deficit
          </span>
        </div>
      </div>

      {/* Regional Infrastructure Access Relationship */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Critical Infrastructure Indicator
          </span>
          <span className="text-[10px] rounded-md bg-blue-100/70 px-2 py-0.5 font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Reference Data
          </span>
        </div>
        <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-xs">
              {hotspot.infrastructure?.keyIndicatorLabel || 'Average Transit Distance to Tertiary Hospital'}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              {hotspot.infrastructure?.keyIndicatorValue || `${hotspot.infrastructure?.nearestFacilityKm || 14.8} km to nearest facility`}
            </span>
          </div>
          <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
            Source: {hotspot.infrastructure?.sourceLabel || 'State Transport Dept & data.gov.in'}
          </div>
        </div>
      </div>

      {/* Section 24: Existing Public Investment Context */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-amber-950 dark:text-amber-200">
            <Coins className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Existing Investment Context</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 uppercase dark:text-amber-300">
            Status: {hotspot.investment?.status || 'Ongoing'}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Current Active Projects</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {hotspot.investment?.activeProjectsCount || 2} Active Projects
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Committed Public Capital</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              ₹{hotspot.investment?.committedCrores || 14.5} Crore
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Key Schemes</span>
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate block">
              {hotspot.investment?.schemes?.join(', ') || 'Rural Feeder Scheme'}
            </span>
          </div>
        </div>

        {/* Critical Differentiator Notice */}
        <p className="mt-3 text-[11px] text-amber-900/90 dark:text-amber-300/90 italic leading-relaxed border-t border-amber-200/50 pt-2 dark:border-amber-900/30">
          &ldquo;The platform does not assume that additional investment is automatically required. It surfaces demand and infrastructure gaps alongside existing investment context for further review.&rdquo;
        </p>
      </div>

      {/* Section 21: What Citizens Are Saying (Anonymized Representative Requests) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              What citizens are saying
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Anonymized representative requests demonstrating multilingual capability
            </span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Prototype Synthetic Data
          </span>
        </div>

        <div className="mt-3.5 space-y-3">
          {hotspot.sampleRequests.map((req, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200/80 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                  {req.language === 'ta'
                    ? 'Tamil (தமிழ்)'
                    : req.language === 'hi'
                    ? 'Hindi (हिन्दी)'
                    : req.language === 'te'
                    ? 'Telugu (తెలుగు)'
                    : req.language === 'kn'
                    ? 'Kannada (ಕನ್ನಡ)'
                    : req.language === 'bn'
                    ? 'Bengali (বাংলা)'
                    : 'English'}
                </span>
                <span className="text-slate-400 font-mono text-[10px]">{req.id}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-medium italic">
                &ldquo;{req.originalText}&rdquo;
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-300">English Interpretation:</strong> {req.normalizedText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
