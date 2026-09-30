import React, { useState, useEffect, useMemo } from 'react';
import { CitizenRequest, DemoScenario, Hotspot } from './types';
import { INITIAL_PROTOTYPE_REQUESTS } from './data/prototypeRequests';
import { aggregateHotspots } from './lib/aggregation';
import { Header } from './components/navbar/Header';
import { CitizenPortal } from './components/citizen/CitizenPortal';
import { PolicymakerDashboard } from './components/dashboard/PolicymakerDashboard';
import { DemoScenarioDrawer } from './components/common/DemoScenarioDrawer';
import { ShieldCheck, Heart, Radio, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'jansetu_citizen_requests_v1';

export default function App() {
  const [activeView, setActiveView] = useState<'citizen' | 'dashboard'>('citizen');
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'map' | 'hotspots' | 'methodology'>('overview');
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const [isAiLive, setIsAiLive] = useState(false);

  // Initialize requests with localStorage additions + prototype requests
  const [requests, setRequests] = useState<CitizenRequest[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const userAdded: CitizenRequest[] = JSON.parse(stored);
        return [...userAdded, ...INITIAL_PROTOTYPE_REQUESTS];
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_PROTOTYPE_REQUESTS;
  });

  // Calculate live hotspots deterministically whenever requests change
  const hotspots = useMemo(() => {
    return aggregateHotspots(requests);
  }, [requests]);

  // Check server health and Gemini availability on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && data.geminiConfigured) {
          setIsAiLive(true);
        }
      })
      .catch(() => {
        setIsAiLive(false);
      });
  }, []);

  // Handle adding new citizen request
  const handleNewRequestAdded = (newReq: CitizenRequest) => {
    setRequests((prev) => {
      const updated = [newReq, ...prev];
      try {
        const existingStored = localStorage.getItem(STORAGE_KEY);
        const userList: CitizenRequest[] = existingStored ? JSON.parse(existingStored) : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newReq, ...userList]));
      } catch (e) {
        console.warn('Could not persist to localStorage:', e);
      }
      return updated;
    });
  };

  // Handle demo scenario selection
  const handleSelectScenario = (_scenario: DemoScenario) => {
    setActiveView('citizen');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          dashboardTab={dashboardTab}
          setDashboardTab={setDashboardTab}
          onOpenDemoDrawer={() => setIsDemoDrawerOpen(true)}
          isAiLive={isAiLive}
        />

        {/* Main View Display */}
        <main className="transition-all duration-300">
          {activeView === 'citizen' ? (
            <CitizenPortal
              onNewRequestAdded={handleNewRequestAdded}
              onNavigateToDashboard={() => {
                setActiveView('dashboard');
                setDashboardTab('overview');
              }}
            />
          ) : (
            <PolicymakerDashboard
              requests={requests}
              hotspots={hotspots}
              dashboardTab={dashboardTab}
              setDashboardTab={setDashboardTab}
            />
          )}
        </main>
      </div>

      {/* Demo Scenario Drawer */}
      <DemoScenarioDrawer
        isOpen={isDemoDrawerOpen}
        onClose={() => setIsDemoDrawerOpen(false)}
        onSelectScenario={handleSelectScenario}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">JanSetu AI</span>
            <span>•</span>
            <span>Build with AI: Code for Communities Hackathon (India)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Digital Public Good Architecture</span>
            </span>
            <span>•</span>
            <span>Zero-PII Planning Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
