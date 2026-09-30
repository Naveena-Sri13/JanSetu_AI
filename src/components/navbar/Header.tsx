import React from 'react';
import { Sparkles, Users, BarChart3, Radio, Globe, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeView: 'citizen' | 'dashboard';
  setActiveView: (view: 'citizen' | 'dashboard') => void;
  dashboardTab: 'overview' | 'map' | 'hotspots' | 'methodology';
  setDashboardTab: (tab: 'overview' | 'map' | 'hotspots' | 'methodology') => void;
  onOpenDemoDrawer: () => void;
  isAiLive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  dashboardTab,
  setDashboardTab,
  onOpenDemoDrawer,
  isAiLive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500/30">
            <Radio className="h-5 w-5 animate-pulse text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 text-lg sm:text-xl dark:text-white">
                JanSetu AI
              </span>
              <span className="hidden items-center rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700 text-xs ring-1 ring-indigo-700/10 md:inline-flex dark:bg-indigo-950/60 dark:text-indigo-300">
                Digital Public Good
              </span>
            </div>
            <p className="hidden text-slate-500 text-xs sm:block dark:text-slate-400">
              From citizen voices to development intelligence
            </p>
          </div>
        </div>

        {/* Primary View Switcher */}
        <div className="flex items-center rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveView('citizen')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-xs sm:text-sm transition-all ${
              activeView === 'citizen'
                ? 'bg-white text-indigo-700 shadow-sm dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Citizen Portal</span>
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium text-xs sm:text-sm transition-all ${
              activeView === 'dashboard'
                ? 'bg-white text-indigo-700 shadow-sm dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Policymaker Dashboard</span>
          </button>
        </div>

        {/* Right Action: Demo Scenarios & AI Engine Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDemoDrawer}
            className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 font-medium text-slate-700 text-xs shadow-xs transition hover:bg-slate-50 sm:px-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Load Pre-configured Demonstration Scenarios"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden sm:inline">Demo Scenarios</span>
            <span className="sm:hidden">Demos</span>
          </button>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
              isAiLive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
            }`}
            title={isAiLive ? 'Connected to Gemini 3.8 Flash' : 'Deterministic Civic Engine Active'}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isAiLive ? 'bg-emerald-500 animate-ping' : 'bg-indigo-500'
              }`}
            />
            <span className="hidden md:inline">
              {isAiLive ? 'Gemini 3.8 Live' : 'Deterministic Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Sub-navigation bar when in Dashboard view */}
      {activeView === 'dashboard' && (
        <div className="border-t border-slate-200 bg-slate-50/70 px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="mx-auto flex max-w-7xl items-center gap-1 sm:gap-4 overflow-x-auto py-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'map', label: 'Demand Map' },
              { id: 'hotspots', label: 'Hotspots' },
              { id: 'methodology', label: 'Methodology & Ethics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id as any)}
                className={`whitespace-nowrap px-3 py-1 font-medium text-xs sm:text-sm rounded-md transition ${
                  dashboardTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
