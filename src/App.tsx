import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageToggle';
import { NotificationProvider } from './components/NotificationSystem';
import NavbarWorking from './components/NavbarWorking';
import HomeWorking from './pages/HomeWorking';
import SimpleDemoWorking from './pages/SimpleDemoWorking';
import SimpleMatchesWorking from './pages/SimpleMatchesWorking';
import SimplePlaceholderWorking from './pages/SimplePlaceholderWorking';
import ClaimProcess from './pages/ClaimProcess';
import PartnerPortalWorking from './pages/PartnerPortalWorking';

const system = createSystem(defaultConfig);

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <ChakraProvider value={system}>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', width: '100%' }}>
          <NavbarWorking />
          <div style={{ paddingTop: '2rem', paddingBottom: '2rem', width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomeWorking />} />
              <Route path="/report" element={<SimpleDemoWorking />} />
              <Route path="/matches/:itemId" element={<SimpleMatchesWorking />} />
              <Route path="/claim/:matchId" element={<ClaimProcess />} />
              <Route path="/partner" element={<PartnerPortalWorking />} />
              <Route path="/partner-info" element={
                <SimplePlaceholderWorking 
                  title="Partner Portal"
                  description="Advanced dashboard for hotels, airports, malls, and transport partners to submit found items and track performance."
                  icon="🏢"
                  features={[
                    "Smart item submission with AI categorization",
                    "Bulk upload capabilities for multiple items",
                    "Real-time matching notifications",
                    "SLA performance tracking and analytics",
                    "Integration with existing partner systems"
                  ]}
                />
              } />
              <Route path="/government" element={
                <SimplePlaceholderWorking 
                  title="Government Operations Center"
                  description="Comprehensive oversight dashboard for city-wide lost & found operations with real-time analytics and compliance monitoring."
                  icon="🏛️"
                  features={[
                    "City-wide operational KPIs and metrics",
                    "Partner performance scorecards",
                    "Geographic heatmaps and trend analysis",
                    "Compliance monitoring and audit trails",
                    "Predictive analytics for resource planning"
                  ]}
                />
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
      </NotificationProvider>
    </LanguageProvider>
  )
}

export default App
