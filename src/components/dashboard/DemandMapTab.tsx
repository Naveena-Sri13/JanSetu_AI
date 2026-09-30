import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Filter,
  Layers,
  Flame,
  Search,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { CitizenRequest, DevelopmentSectorId, Hotspot } from '../../types';
import { DEVELOPMENT_SECTORS } from '../../data/sectors';
import { getDNILevel } from '../../lib/dniEngine';

interface DemandMapTabProps {
  requests: CitizenRequest[];
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
}

// Geo projection coordinates helper for key Indian districts onto 800x800 SVG canvas
// Standard India bounding box approx: Longitude 68 to 97 E, Latitude 8 to 36 N
function projectCoordinates(lat: number, lng: number): { x: number; y: number } {
  const minLng = 68.0;
  const maxLng = 96.0;
  const minLat = 8.0;
  const maxLat = 35.0;

  const width = 800;
  const height = 800;

  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  // Invert Y because latitude goes North up, SVG Y goes down
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;

  return { x: Math.max(40, Math.min(760, x)), y: Math.max(40, Math.min(760, y)) };
}

export const DemandMapTab: React.FC<DemandMapTabProps> = ({
  requests,
  hotspots,
  onSelectHotspot,
}) => {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDistrictId, setActiveDistrictId] = useState<string | null>(null);

  // Filtered hotspots
  const filteredHotspots = useMemo(() => {
    return hotspots.filter((h) => {
      const matchState = selectedState === 'all' || h.state.toLowerCase() === selectedState.toLowerCase();
      const matchSector = selectedSector === 'all' || h.sector === selectedSector;
      const matchSearch =
        !searchQuery ||
        h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchSector && matchSearch;
    });
  }, [hotspots, selectedState, selectedSector, searchQuery]);

  // Unique states
  const states = useMemo(() => {
    return Array.from(new Set(hotspots.map((h) => h.state))).sort();
  }, [hotspots]);

  // Active inspected hotspot
  const activeHotspot = useMemo(() => {
    if (!activeDistrictId && filteredHotspots.length > 0) return filteredHotspots[0];
    return filteredHotspots.find((h) => h.id === activeDistrictId) || filteredHotspots[0];
  }, [activeDistrictId, filteredHotspots]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              India Demand & Hotspot Map
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Geographic aggregation of citizen demand signals correlated with infrastructure deficits
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 py-1.5 px-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All States (6)</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Sector Filter */}
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

          {/* Search */}
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

      {/* Main Map + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Interactive Geospatial Canvas */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-900 p-4 sm:p-6 text-white shadow-md relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Click any marker to inspect district dossier</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> High Need (DNI &gt; 80)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Significant (65-80)
              </span>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[620px] flex items-center justify-center">
            {/* SVG Background India Outline Contour */}
            <svg
              viewBox="0 0 800 800"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
            >
              <defs>
                <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Simplified India Territorial Boundary Paths */}
              <g fill="#1e293b" stroke="#334155" strokeWidth="1.5">
                {/* Simplified India mainland path */}
                <path d="M 280 120 L 340 70 L 400 90 L 440 140 L 480 160 L 530 200 L 610 220 L 680 230 L 720 280 L 690 320 L 620 300 L 560 330 L 530 380 L 550 440 L 500 520 L 440 640 L 390 730 L 370 760 L 360 740 L 340 640 L 290 540 L 250 460 L 220 380 L 200 320 L 230 250 L 250 200 Z" />
                {/* State outline partitions */}
                <line x1="280" y1="380" x2="530" y2="380" stroke="#475569" strokeDasharray="3 3" />
                <line x1="340" y1="520" x2="500" y2="520" stroke="#475569" strokeDasharray="3 3" />
                <line x1="370" y1="630" x2="440" y2="640" stroke="#475569" strokeDasharray="3 3" />
              </g>

              {/* State Labels on Map */}
              <text x="350" y="280" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                UTTAR PRADESH
              </text>
              <text x="300" y="440" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                MAHARASHTRA
              </text>
              <text x="590" y="380" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                WEST BENGAL
              </text>
              <text x="420" y="500" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                TELANGANA
              </text>
              <text x="330" y="580" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                KARNATAKA
              </text>
              <text x="400" y="690" fill="#64748b" fontSize="13" fontWeight="600" textAnchor="middle">
                TAMIL NADU
              </text>

              {/* Hotspot Markers and Density Rings */}
              {filteredHotspots.map((h) => {
                const { x, y } = projectCoordinates(h.latitude, h.longitude);
                const isSelected = activeHotspot?.id === h.id;
                const isHigh = h.developmentNeedIndex >= 80;

                return (
                  <g
                    key={h.id}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setActiveDistrictId(h.id)}
                  >
                    {/* Pulsing Radius Ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 32 : isHigh ? 24 : 18}
                      fill={isHigh ? 'url(#hotspotGlow)' : 'none'}
                      stroke={isHigh ? '#f43f5e' : '#f59e0b'}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeOpacity={0.6}
                      className={isHigh ? 'animate-pulse' : ''}
                    />

                    {/* Central Marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 8 : 6}
                      fill={isHigh ? '#f43f5e' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />

                    {/* District Label */}
                    <text
                      x={x}
                      y={y + 18}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {h.district}
                    </text>

                    {/* DNI Badge */}
                    <rect
                      x={x - 14}
                      y={y - 20}
                      width={28}
                      height={13}
                      rx={3}
                      fill="#0f172a"
                      stroke={isHigh ? '#f43f5e' : '#f59e0b'}
                      strokeWidth={1}
                    />
                    <text
                      x={x}
                      y={y - 10}
                      fill={isHigh ? '#f43f5e' : '#f59e0b'}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {h.developmentNeedIndex}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
            <span>Projection: EPSG Geocentric Equirectangular Approximation</span>
            <span>Source: Open Government Data & Spatial Aggregation</span>
          </div>
        </div>

        {/* Selected Hotspot Inspector Panel */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          {activeHotspot ? (
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    District Dossier Inspector
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                    {activeHotspot.district}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {activeHotspot.state} • {activeHotspot.sector}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    DNI Score
                  </span>
                  <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                    {activeHotspot.developmentNeedIndex}
                  </span>
                </div>
              </div>

              {/* Factor Breakdown Mini */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Citizen Demand</span>
                  <span className="font-bold">{activeHotspot.factors.demand} / 100</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Infrastructure Gap</span>
                  <span className="font-bold">{activeHotspot.factors.infrastructureGap}%</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Service Coverage</span>
                  <span className="font-bold">{activeHotspot.serviceCoverage}%</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Population Exposure</span>
                  <span className="font-bold">
                    {activeHotspot.population.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Key Signal Quote */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Representative Citizen Voice
                </span>
                <p className="text-slate-800 dark:text-slate-200 italic line-clamp-3">
                  &ldquo;{activeHotspot.sampleRequests[0]?.originalText || 'Demand concentrated near medical centers.'}&rdquo;
                </p>
                <span className="mt-1 block text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                  {activeHotspot.sampleRequests[0]?.normalizedText}
                </span>
              </div>

              {/* Existing Investment Context Note */}
              <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 text-xs dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex justify-between font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  <span>Existing Public Outlay</span>
                  <span>₹{activeHotspot.investment?.committedCrores || 14.5} Cr</span>
                </div>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-300/90 line-clamp-2">
                  {activeHotspot.investment?.note || 'Allocated under state sector scheme.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select any marker on the map to inspect district signals.
            </div>
          )}

          {activeHotspot && (
            <button
              onClick={() => onSelectHotspot(activeHotspot)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              <span>Open Detailed Evidence Dossier</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
