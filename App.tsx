import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationSection from './components/LocationSection';
import QuickActionHub from './components/QuickActionHub';
import MeteorShower from './components/MeteorShower';
import CursorTrail from './components/CursorTrail';
import TransitionOverlay from './components/TransitionOverlay';
import { 
  Server, Shield, Wifi, Video, Home as HomeIcon, PenTool, ArrowUp, Loader2
} from 'lucide-react';
import { Service, TimelineItem } from './types';

// Speed Demon: Lazy loading for sub-pages
const Home = React.lazy(() => import('./pages/Home'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const darkMode = true; // Hardcoded dark mode
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [overlayColor, setOverlayColor] = useState("#020617"); // Default MBSYS Deep Slate
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    document.documentElement.classList.add('dark');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSwitchBrand = () => {
    setOverlayColor("#171512"); // Hunar Charcoal
    setIsExiting(true);
    // Wait for the animation to cover the screen before redirecting
    setTimeout(() => {
      window.location.href = 'http://localhost:5174?from=mbsys';
    }, 1100);
  };

  const services: Service[] = [
    { 
      id: 'infra-amc', 
      title: 'IT Infrastructure & Support', 
      slug: 'it-infrastructure-support',
      description: 'Design, implementation, and maintenance of mission-critical IT environments in Bengaluru.', 
      longDescription: 'We design, implement, and maintain complete IT infrastructure for businesses. Our Annual Maintenance Contracts (AMC) cover system monitoring, troubleshooting, and scheduled upgrades.',
      features: ['Infrastructure Design', 'Maintenance Contracts (AMC)', 'Proactive System Monitoring', 'System Troubleshooting'],
      icon: Server, 
      image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=60&w=1200&auto=format' 
    },
    { 
      id: 'cctv-surveillance', 
      title: 'CCTV & Security Solutions', 
      slug: 'cctv-security-solutions',
      description: 'Professional IP camera installations for reliable business surveillance.', 
      longDescription: 'End-to-end security solutions including site assessment, camera selection, installation, and configuration to ensure reliable office surveillance.',
      features: ['Site Security Assessment', 'High-Definition Installation', 'Network Configuration', 'Routine Maintenance'],
      icon: Video, 
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=60&w=1200&auto=format' 
    },
    { 
      id: 'networking-wifi', 
      title: 'Networking & Connectivity', 
      slug: 'networking-connectivity',
      description: 'High-performance cabling and scalable wireless solutions for business continuity.', 
      longDescription: 'We deploy structured cabling and high-performance wireless networks that deliver stable and secure connectivity for modern office environments.',
      features: ['Structured Cabling', 'Wireless Network Design', 'Secure Connectivity', 'Commercial Installations'],
      icon: Wifi, 
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=60&w=1200&auto=format' 
    },
    { 
      id: 'security-firewall', 
      title: 'Data Security & Firewalls', 
      slug: 'data-security-firewalls',
      description: 'Advanced network security to protect critical business data.', 
      longDescription: 'Advanced firewall deployment and network security solutions to protect your systems from cyber threats and unauthorized access.',
      features: ['Firewall Deployment', 'Network Hardening', 'Security Audits', 'Access Control Systems'],
      icon: Shield, 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=60&w=1200&auto=format' 
    },
    { 
      id: 'home-automation', 
      title: 'Smart Office Solutions', 
      slug: 'smart-office-solutions',
      description: 'Integration of lighting, security, and smart access control systems.', 
      longDescription: 'Our smart office solutions integrate lighting, security, and access control into a single manageable system for efficiency and comfort.',
      features: ['System Integration', 'Automated Lighting Control', 'Access Management', 'Energy Efficiency'],
      icon: HomeIcon, 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=60&w=1200&auto=format' 
    },
    { 
      id: 'interiors-renovation', 
      title: 'Office Interiors & Renovation', 
      slug: 'office-renovation-interiors',
      description: 'Modern workspace design with integrated technical infrastructure.', 
      longDescription: 'We deliver functional office interiors and renovation solutions, seamlessly integrating IT, networking, and security infrastructure for a clean workspace.',
      features: ['Office Space Planning', 'Turnkey Renovations', 'Infrastructure Integration', 'Modern Design Standards'],
      icon: PenTool, 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=60&w=1200&auto=format' 
    }
  ];

  const timeline: TimelineItem[] = [
    { year: '2016', title: 'Company Established', description: 'MBSYS launches as a technical infrastructure consultancy in Bengaluru.' },
    { year: '2018', title: 'Service Expansion', description: 'Major expansion into industrial security and surveillance systems.' },
    { year: '2021', title: 'System Integration', description: 'Integrated facility controls added to core service offerings.' },
    { year: '2024', title: 'Division Growth', description: 'Interiors and Office Renovation division fully operational.' },
  ];

  return (
    <div className="min-h-screen relative bg-slate-950 transition-colors duration-500 selection:bg-secondary/30 overflow-x-hidden">
      <TransitionOverlay isExiting={isExiting} brandColor={overlayColor} />
      <ScrollToTop />
      <MeteorShower darkMode={darkMode} />
      <CursorTrail darkMode={darkMode} />

      <div className="fixed top-0 left-0 w-full h-1 z-[200] pointer-events-none">
        <div 
          className="h-full bg-primary shadow-[0_0_10px_#EF4444] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <QuickActionHub />

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-24 z-[90] p-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/10 ${showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <Navbar 
        onNavigate={(path) => navigate(path)} 
        currentPath={location.pathname} 
        onSwitchBrand={handleSwitchBrand}
      />

      <main className="relative min-h-screen z-10">
        <React.Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950 z-[1000]">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home services={services} onNavigate={(path) => navigate(path)} />} />
            <Route path="/services" element={<ServicesPage services={services} onNavigate={(path) => navigate(path)} />} />
            <Route path="/services/:slug" element={<ServiceDetail services={services} onNavigate={(path) => navigate(path)} />} />
            <Route path="/about" element={<About timeline={timeline} onNavigate={(path) => navigate(path)} />} />
            <Route path="/contact" element={<Contact onNavigate={(path) => navigate(path)} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </main>

      <div className="relative z-10">
        <LocationSection />
        <Footer onNavigate={(path) => navigate(path)} />
      </div>
    </div>
  );
}

export default App;
