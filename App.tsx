import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import QuickActionHub from './components/QuickActionHub';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { 
  Server, Shield, Wifi, Video, Home as HomeIcon, PenTool, ArrowUp
} from 'lucide-react';
import { Service, TimelineItem } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(true);
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
      id: 'infra', 
      title: 'High-Scale Infrastructure', 
      description: 'Tier-3 data center design and resilient hardware ecosystems.', 
      longDescription: 'Our infrastructure designs are optimized for maximum uptime and heat management. We architect high-density server environments that scale with your data requirements.',
      features: ['Precision Server Rack Cooling', 'UPS Redundancy Systems', 'Active/Active Virtualization', 'SAN Storage Architecture'],
      icon: Server, 
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'cctv', 
      title: 'Advanced Surveillance', 
      description: 'Unified IP vision grids with high-retention secure archival.', 
      longDescription: 'Professional grade CCTV solutions with edge analytics for perimeter integrity and motion-triggered secure recording.',
      features: ['LPR (License Plate) Recognition', 'Motion Boundary Triggers', 'Ultra Low-Light Sensors', 'Remote Viewing Gateway'],
      icon: Video, 
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'network', 
      title: 'Unified Networking', 
      description: 'Zero-latency Wi-Fi 7 and fiber-optic backbone deployments.', 
      longDescription: 'We deploy robust local area networks that eliminate bottlenecks and provide secure, seamless roaming across your entire facility.',
      features: ['Fiber Optic Splicing', 'Managed Switching Grids', 'High-Density Wi-Fi 7', 'VLAN Segmenting'],
      icon: Wifi, 
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'firewall', 
      title: 'Network Perimeter Defense', 
      description: 'Next-generation firewalls and deep packet inspection grids.', 
      longDescription: 'Protecting your internal nodes with hardware-level security that filters malicious traffic before it hits your servers.',
      features: ['Next-Gen UTM Firewalls', 'Intrusion Detection (IDS)', 'VPN Tunneling Protocols', 'Bandwidth Management'],
      icon: Shield, 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'automation', 
      title: 'IoT Facility Control', 
      description: 'Occupancy-based environmentals and smart access integration.', 
      longDescription: 'Integrating facility management into a single dashboard. Control lighting, HVAC, and access points based on real-time sensor data.',
      features: ['Biometric Access Points', 'Smart DALI Lighting', 'HVAC Integration', 'Energy Efficiency Grid'],
      icon: HomeIcon, 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'interiors', 
      title: 'Technical Interior Integration', 
      description: 'Architectural space planning with embedded hidden tech grids.', 
      longDescription: 'We bridge the gap between aesthetics and function. Invisible cabling and technical furniture that fits modern architectural standards.',
      features: ['Hidden Cable Pathways', 'Custom Technical Rack Furniture', 'Acoustic Panel Tech Integration', 'Modular Workspaces'],
      icon: PenTool, 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop' 
    }
  ];

  const timeline: TimelineItem[] = [
    { year: '2016', title: 'Operations Active', description: 'MBSYS launches technical infrastructure consultancy in Bengaluru.' },
    { year: '2018', title: 'Security Expansion', description: 'Deployment of large-scale industrial vision grids.' },
    { year: '2021', title: 'IoT Implementation', description: 'Facility control protocols integrated into core offerings.' },
    { year: '2024', title: 'Architecture Sync', description: 'Interiors and Architecture division fully operational.' },
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
      <CursorTrail darkMode={darkMode} />
      
      {/* Scroll Progress Bar (Micro-interaction) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[200] pointer-events-none">
        <div 
          className="h-full bg-primary shadow-[0_0_10px_#EF4444] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Tactical Comms Hub (Functional Feature) */}
      <QuickActionHub />

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-6 sm:bottom-12 sm:right-8 z-[90] p-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/10 ${showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} onNavigate={navigate} currentPath={currentPath} />

      <main className="relative z-10 min-h-screen">
        {renderContent()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;