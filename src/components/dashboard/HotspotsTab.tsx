import React, { useState, useMemo } from 'react';
import {
  Flame,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Info,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Hotspot } from '../../types';
import { DEVELOPMENT_SECTORS } from '../../data/sectors';
import { getDNILevel } from '../../lib/dniEngine';

interface HotspotsTabProps {
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const HotspotsTab: React.FC<HotspotsTabProps> = ({
  hotspots,
  onSelectHotspot,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'dni' | 'signals' | 'gap' | 'pop'>('dni');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const states = useMemo(() => {
    return Array.from(new Set(hotspots.map((h) => h.state))).sort();
  }, [hotspots]);

  const filteredHotspots = useMemo(() => {
    return hotspots
      .filter((h) => {
        const matchSector = selectedSector === 'all' || h.sector === selectedSector;
        const matchState = selectedState === 'all' || h.state.toLowerCase() === selectedState.toLowerCase();
        const matchSearch =
          !searchQuery ||
          h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.state.toLowerCase().includes(searchQuery.toLowerCase());
        return matchSector && matchState && matchSearch;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortField === 'dni') diff = b.developmentNeedIndex - a.developmentNeedIndex;
        else if (sortField === 'signals') diff = b.requestCount - a.requestCount;
        else if (sortField === 'gap') diff = b.infrastructureGap - a.infrastructureGap;
        else if (sortField === 'pop') diff = b.population - a.population;
        return sortOrder === 'desc' ? diff : -diff;
      });
  }, [hotspots, selectedSector, selectedState, searchQuery, sortField, sortOrder]);

  const toggleSort = (field: 'dni' | 'signals' | 'gap' | 'pop') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Framing Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Emerging Development Hotspots
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Surfaced for human policy review — not an automated funding competition or &ldquo;winner ranking&rdquo;.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All States</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Sectors</option>
            {DEVELOPMENT_SECTORS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 sm:w-44 rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-700 placeholder-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">District & State</th>
                <th className="py-3.5 px-4">Development Sector</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => toggleSort('signals')}
                >
                  <div className="flex items-center gap-1">
                    <span>Citizen Signals</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => toggleSort('pop')}
                >
                  <div className="flex items-center gap-1">
                    <span>Population Exposure</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => toggleSort('gap')}
                >
                  <div className="flex items-center gap-1">
                    <span>Infra Gap</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white text-right"
                  onClick={() => toggleSort('dni')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Development Need Index</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredHotspots.map((hotspot) => {
                const dniLevel = getDNILevel(hotspot.developmentNeedIndex);
                return (
                  <tr
                    key={hotspot.id}
                    onClick={() => onSelectHotspot(hotspot)}
                    className="hover:bg-indigo-50/40 cursor-pointer transition dark:hover:bg-slate-800/50"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {hotspot.district}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {hotspot.state}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700 capitalize dark:bg-slate-800 dark:text-slate-300">
                        {hotspot.sector}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {hotspot.requestCount}
                      </div>
                      <span className="text-[11px] text-slate-400">verified signals</span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      <div>{hotspot.population.toLocaleString('en-IN')}</div>
                      <span className="text-[11px] text-slate-400">
                        {hotspot.demographics?.ruralPopulationPct || 80}% rural
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-rose-600 dark:text-rose-400">
                        {hotspot.infrastructureGap}%
                      </div>
                      <span className="text-[11px] text-slate-400">
                        cov: {hotspot.serviceCoverage}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                          {hotspot.developmentNeedIndex}
                        </span>
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold hidden md:inline ${dniLevel.badgeClass}`}
                        >
                          {dniLevel.label.split(' ')[0]}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHotspot(hotspot);
                        }}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800"
                        title="View Full Dossier"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
