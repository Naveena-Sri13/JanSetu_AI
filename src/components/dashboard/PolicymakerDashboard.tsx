import React, { useState } from 'react';
import { CitizenRequest, Hotspot } from '../../types';
import { OverviewTab } from './OverviewTab';
import { DemandMapTab } from './DemandMapTab';
import { HotspotsTab } from './HotspotsTab';
import { MethodologyTab } from './MethodologyTab';
import { HotspotDetailModal } from './HotspotDetailModal';

interface PolicymakerDashboardProps {
  requests: CitizenRequest[];
  hotspots: Hotspot[];
  dashboardTab: 'overview' | 'map' | 'hotspots' | 'methodology';
  setDashboardTab: (tab: 'overview' | 'map' | 'hotspots' | 'methodology') => void;
}

export const PolicymakerDashboard: React.FC<PolicymakerDashboardProps> = ({
  requests,
  hotspots,
  dashboardTab,
  setDashboardTab,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {dashboardTab === 'overview' && (
        <OverviewTab
          requests={requests}
          hotspots={hotspots}
          onNavigateToMap={() => setDashboardTab('map')}
          onNavigateToHotspots={() => setDashboardTab('hotspots')}
          onSelectHotspot={(h) => setSelectedHotspot(h)}
        />
      )}

      {dashboardTab === 'map' && (
        <DemandMapTab
          requests={requests}
          hotspots={hotspots}
          onSelectHotspot={(h) => setSelectedHotspot(h)}
        />
      )}

      {dashboardTab === 'hotspots' && (
        <HotspotsTab
          hotspots={hotspots}
          onSelectHotspot={(h) => setSelectedHotspot(h)}
        />
      )}

      {dashboardTab === 'methodology' && <MethodologyTab />}

      {/* Hotspot Detailed Dossier Modal */}
      {selectedHotspot && (
        <HotspotDetailModal
          hotspot={selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
        />
      )}
    </div>
  );
};
