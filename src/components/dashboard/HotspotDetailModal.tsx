import React from 'react';
import { X, MapPin, Tag, BarChart2, Info, CheckCircle2 } from 'lucide-react';
import { Hotspot } from '../../types';
import { getDNILevel, DNI_WEIGHTS } from '../../lib/dniEngine';
import { EvidencePanel } from './EvidencePanel';
import { AISynthesisCard } from './AISynthesisCard';
import { InterventionCard } from './InterventionCard';

interface HotspotDetailModalProps {
  hotspot: Hotspot;
  onClose: () => void;
}

export const HotspotDetailModal: React.FC<HotspotDetailModalProps> = ({
  hotspot,
  onClose,
}) => {
  const dniLevel = getDNILevel(hotspot.developmentNeedIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${dniLevel.badgeClass}`}
              >
                {dniLevel.label}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>{hotspot.district}, {hotspot.state}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white capitalize">
              {hotspot.district} — {hotspot.sector}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive Civic Evidence & Intelligence Dossier
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 20: DNI Headline & Factor Breakdown */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                  Analytical Priority Index
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {hotspot.developmentNeedIndex}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    / 100
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-sm">
                  Deterministic multi-factor score synthesized from citizen demand, infrastructure gap, and demographic exposure.
                </p>
              </div>

              {/* Factor Breakdown Bars */}
              <div className="w-full sm:max-w-md space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>Citizen Demand (35%)</span>
                    <span className="font-mono font-bold">{hotspot.factors.demand}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${hotspot.factors.demand}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>Infrastructure Gap (25%)</span>
                    <span className="font-mono font-bold">{hotspot.factors.infrastructureGap}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${hotspot.factors.infrastructureGap}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>Population Impact (20%)</span>
                    <span className="font-mono font-bold">{hotspot.factors.populationImpact}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${hotspot.factors.populationImpact}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>Service Criticality (10%)</span>
                    <span className="font-mono font-bold">{hotspot.factors.criticality}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${hotspot.factors.criticality}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>Geographic Concentration (10%)</span>
                    <span className="font-mono font-bold">{hotspot.factors.geographicConcentration}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${hotspot.factors.geographicConcentration}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-200/50 dark:border-indigo-900/40 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              <span>
                <strong>Methodology:</strong> Calculated via deterministic weighting. This is an analytical index and not a government funding decision.
              </span>
            </div>
          </div>

          {/* AI Evidence Synthesis Card */}
          <AISynthesisCard hotspot={hotspot} />

          {/* Candidate Intervention Card */}
          <InterventionCard hotspot={hotspot} />

          {/* Full Evidence Panel */}
          <EvidencePanel hotspot={hotspot} />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Dossier ID: {hotspot.id} • Open for human review
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
