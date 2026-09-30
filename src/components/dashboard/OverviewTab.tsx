import React from 'react';
import {
  Users,
  MapPin,
  Globe2,
  Flame,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Radio,
  Bus,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { CitizenRequest, Hotspot } from '../../types';
import { DEVELOPMENT_SECTORS } from '../../data/sectors';
import { SemanticConvergence } from '../citizen/SemanticConvergence';

interface OverviewTabProps {
  requests: CitizenRequest[];
  hotspots: Hotspot[];
  onNavigateToMap: () => void;
  onNavigateToHotspots: () => void;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  requests,
  hotspots,
  onNavigateToMap,
  onNavigateToHotspots,
  onSelectHotspot,
}) => {
  // Live calculated metrics
  const totalSignals = requests.length;
  const uniqueStates = new Set(requests.map((r) => r.state)).size;
  const uniqueLanguages = new Set(requests.map((r) => r.language)).size;
  const totalHotspots = hotspots.length;
  const uniqueSectors = new Set(requests.map((r) => r.sector)).size;
  const avgDni =
    hotspots.length > 0
      ? (hotspots.reduce((sum, h) => sum + h.developmentNeedIndex, 0) / hotspots.length).toFixed(1)
      : '0.0';

  // Sector breakdown count
  const sectorCounts = DEVELOPMENT_SECTORS.map((sec) => {
    const count = requests.filter((r) => r.sector === sec.id).length;
    return {
      sector: sec,
      count,
      pct: totalSignals > 0 ? Math.round((count / totalSignals) * 100) : 0,
    };
  }).sort((a, b) => b.count - a.count);

  // Top 3 hotspots for quick spotlight
  const topHotspots = hotspots.slice(0, 3);

  // Recent 5 verified requests
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Tagline Banner */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-sm dark:border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-400/30">
            <Radio className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>Civic Development Intelligence System</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            JanSetu AI
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-300 font-light">
            From citizen voices to development intelligence.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Transforming fragmented citizen voices across 6 Indian languages into structured, geographically meaningful development signals, verified infrastructure gap correlations, and evidence-backed candidate interventions.
          </p>
        </div>
      </div>

      {/* Section 17: Executive Metric Strip (Calculated from Data) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Citizen Signals */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Citizen Signals</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalSignals.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Verified Aggregations</span>
        </div>

        {/* States Covered */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">States</span>
            <MapPin className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {uniqueStates}
          </div>
          <span className="text-[11px] text-slate-500">Cross-regional reach</span>
        </div>

        {/* Languages */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Languages</span>
            <Globe2 className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {uniqueLanguages}
          </div>
          <span className="text-[11px] text-slate-500">Indic Speech & Text</span>
        </div>

        {/* Development Hotspots */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Hotspots</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalHotspots}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">High Unmet Demand</span>
        </div>

        {/* Development Sectors */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Sectors</span>
            <Layers className="h-4 w-4 text-violet-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {uniqueSectors}
          </div>
          <span className="text-[11px] text-slate-500">Civic Taxonomy</span>
        </div>

        {/* Average DNI */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Mean DNI Score</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {avgDni}
          </div>
          <span className="text-[11px] text-slate-500">Out of 100 Index</span>
        </div>
      </div>

      {/* Semantic Convergence Card */}
      <SemanticConvergence />

      {/* Main Grid: Sector Breakdown & Emerging Hotspots Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Demand Distribution */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Demand by Development Sector
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Proportion of citizen voice and text signals
              </p>
            </div>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Flagship: Transit
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {sectorCounts.map(({ sector, count, pct }) => (
              <div key={sector.id} className="text-xs">
                <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                    <span>{sector.name}</span>
                    {sector.isFlagship && (
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        ★
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-slate-500 dark:text-slate-400">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: sector.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Public Transportation serves as the primary evaluation sector for benchmarking multi-language demand density against route fleet deficits.
          </div>
        </div>

        {/* Priority Hotspots Spotlight */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Emerging Priority Hotspots
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Surfaced by the multi-factor Development Need Index
                </p>
              </div>
              <button
                onClick={onNavigateToHotspots}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                <span>View All ({totalHotspots})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {topHotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  onClick={() => onSelectHotspot(hotspot)}
                  className="group cursor-pointer rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 transition hover:border-indigo-400 hover:bg-indigo-50/30 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-indigo-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                          {hotspot.district}, {hotspot.state}
                        </span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-2xs dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 capitalize">
                          {hotspot.sector}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {hotspot.sampleRequests[0]?.normalizedText || 'High concentration of unmet demand'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                          DNI Score
                        </span>
                        <span className="font-extrabold text-lg text-rose-600 dark:text-rose-400">
                          {hotspot.developmentNeedIndex}
                        </span>
                      </div>
                      <div className="rounded-full bg-white p-1 text-slate-400 group-hover:text-indigo-600 shadow-2xs dark:bg-slate-700">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onNavigateToMap}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              <MapPin className="h-4 w-4" />
              <span>Explore India Demand Map</span>
            </button>
            <button
              onClick={onNavigateToHotspots}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
            >
              <span>Inspect Full Hotspot Dossiers</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Verified Citizen Signals Stream */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Live Verified Citizen Signals Stream
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Incoming raw citizen voice & text inputs parsed into structured civic entities
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Live Sync
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {recentRequests.map((req) => (
            <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">{req.id}</span>
                  <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 uppercase dark:bg-slate-800 dark:text-slate-300">
                    {req.language}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {req.district}, {req.state}
                  </span>
                  <span className="capitalize text-indigo-600 dark:text-indigo-400 font-medium">
                    • {req.sector}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic line-clamp-1">
                  &ldquo;{req.originalText}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    req.severity === 'critical'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : req.severity === 'high'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {req.severity}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
