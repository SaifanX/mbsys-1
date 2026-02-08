import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocationSection from './components/LocationSection';
import QuickActionHub from './components/QuickActionHub';
import MeteorShower from './components/MeteorShower';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { 
  Server, Shield, Wifi, Video, Home as HomeIcon, PenTool, ArrowUp
} from 'lucide-react';
import { Service, TimelineItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    };
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [darkMode]);

  const handleToggleTheme = (e: React.MouseEvent) => {
    setDarkMode(!darkMode);
  };

  const services: Service[] = [
    { 
      id: 'infra-amc', 
      title: 'IT Infrastructure & Support', 
      description: 'Design, implementation, and maintenance of mission-critical IT environments in Bengaluru.', 
      longDescription: 'We design, implement, and maintain complete IT infrastructure for businesses. Our Annual Maintenance Contracts (AMC) cover system monitoring, troubleshooting, and scheduled upgrades.',
      features: ['Infrastructure Design', 'Maintenance Contracts (AMC)', 'Proactive System Monitoring', 'System Troubleshooting'],
      icon: Server, 
      image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=2000' 
    },
    { 
      id: 'cctv-surveillance', 
      title: 'CCTV & Security Solutions', 
      description: 'Professional IP camera installations for reliable business surveillance.', 
      longDescription: 'End-to-end security solutions including site assessment, camera selection, installation, and configuration to ensure reliable office surveillance.',
      features: ['Site Security Assessment', 'High-Definition Installation', 'Network Configuration', 'Routine Maintenance'],
      icon: Video, 
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000' 
    },
    { 
      id: 'networking-wifi', 
      title: 'Networking & Connectivity', 
      description: 'High-performance cabling and scalable wireless solutions for business continuity.', 
      longDescription: 'We deploy structured cabling and high-performance wireless networks that deliver stable and secure connectivity for modern office environments.',
      features: ['Structured Cabling', 'Wireless Network Design', 'Secure Connectivity', 'Commercial Installations'],
      icon: Wifi, 
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000' 
    },
    { 
      id: 'security-firewall', 
      title: 'Data Security & Firewalls', 
      description: 'Advanced network security to protect critical business data.', 
      longDescription: 'Advanced firewall deployment and network security solutions to protect your systems from cyber threats and unauthorized access.',
      features: ['Firewall Deployment', 'Network Hardening', 'Security Audits', 'Access Control Systems'],
      icon: Shield, 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000' 
    },
    { 
      id: 'home-automation', 
      title: 'Smart Office Solutions', 
      description: 'Integration of lighting, security, and smart access control systems.', 
      longDescription: 'Our smart office solutions integrate lighting, security, and access control into a single manageable system for efficiency and comfort.',
      features: ['System Integration', 'Automated Lighting Control', 'Access Management', 'Energy Efficiency'],
      icon: HomeIcon, 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000' 
    },
    { 
      id: 'interiors-renovation', 
      title: 'Office Interiors & Renovation', 
      description: 'Modern workspace design with integrated technical infrastructure.', 
      longDescription: 'We deliver functional office interiors and renovation solutions, seamlessly integrating IT, networking, and security infrastructure for a clean workspace.',
      features: ['Office Space Planning', 'Turnkey Renovations', 'Infrastructure Integration', 'Modern Design Standards'],
      icon: PenTool, 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000' 
    }
  ];

  const timeline: TimelineItem[] = [
    { year: '2016', title: 'Company Established', description: 'MBSYS launches as a technical infrastructure consultancy in Bengaluru.' },
    { year: '2018', title: 'Service Expansion', description: 'Major expansion into industrial security and surveillance systems.' },
    { year: '2021', title: 'System Integration', description: 'Integrated facility controls added to core service offerings.' },
    { year: '2024', title: 'Division Growth', description: 'Interiors and Office Renovation division fully operational.' },
  ];

  const renderContent = () => {
    switch (currentPath) {
      case '#services': return <Services services={services} onNavigate={navigate} />;
      case '#about': return <About timeline={timeline} onNavigate={navigate} />;
      case '#contact': return <Contact onNavigate={navigate} />;
      default: return <Home services={services} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-background-light dark:bg-background-dark transition-colors duration-500 selection:bg-secondary/30">
      <title>MBSYS | Professional IT Infrastructure & Security Bengaluru</title>
      <meta name="description" content="MBSYS provides high-performance IT infrastructure, expert CCTV installation, and office renovation in Bengaluru." />
      
      <MeteorShower darkMode={darkMode} />

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

      <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} onNavigate={navigate} currentPath={currentPath} />

      <main className="relative min-h-screen z-10">
        {renderContent()}
      </main>

      <div className="relative z-10">
        <LocationSection />
        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}

export default App;