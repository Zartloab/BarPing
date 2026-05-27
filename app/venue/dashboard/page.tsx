import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { VenueNightDashboard } from "@/components/venue-night-dashboard";
import {
  demoAnnouncements,
  demoEvent,
  demoEventAssets,
  demoEventTemplates,
  demoFeedback,
  demoGuests,
  demoPilotMetrics,
  demoRecommendation,
  demoReports,
  demoSocialWindows,
  demoTables,
  demoVenue,
  isDemoMode,
  selectedDemoTemplate
} from "@/lib/demo-data";

export default function VenueDashboardPage() {
  return (
    <AppShell wide>
      <MotionShell className="py-2">
        {isDemoMode() ? (
          <div className="mb-4 rounded-[14px] border border-venue-amber/20 bg-venue-amber/10 px-3 py-2 text-sm text-venue-amberSoft">
            Demo mode is active. Supabase env vars are missing, so this dashboard uses local demo data.
          </div>
        ) : null}
        <VenueNightDashboard
          venue={demoVenue}
          event={demoEvent}
          templates={demoEventTemplates}
          selectedTemplate={selectedDemoTemplate}
          assets={demoEventAssets}
          tables={demoTables}
          guests={demoGuests}
          announcements={demoAnnouncements}
          windows={demoSocialWindows}
          reports={demoReports}
          metrics={demoPilotMetrics}
          feedback={demoFeedback}
          recommendation={demoRecommendation}
        />
      </MotionShell>
    </AppShell>
  );
}
