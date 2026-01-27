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
      id: 'infra-amc', 
      title: 'IT Infrastructure & AMC', 
      description: 'Design, implementation, and maintenance of mission-critical IT ecosystems.', 
      longDescription: 'We design, implement, and maintain complete IT infrastructure for offices and businesses. Our AMC services cover system monitoring, troubleshooting, upgrades, and on-call support to ensure uninterrupted operations.',
      features: ['Full Stack Infrastructure Design', 'Annual Maintenance Contracts (AMC)', 'Proactive System Monitoring', 'Strategic Troubleshooting & Upgrades'],
      icon: Server, 
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'cctv-surveillance', 
      title: 'CCTV Installation & Maintenance', 
      description: 'End-to-end IP vision solutions for reliable surveillance and security.', 
      longDescription: 'End-to-end CCTV solutions including site assessment, camera selection, installation, configuration, and regular maintenance to ensure reliable surveillance and security.',
      features: ['Expert Site Assessment', 'Custom Camera Selection', 'Precision Configuration', 'Dedicated Maintenance Support'],
      icon: Video, 
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'networking-wifi', 
      title: 'Networking & Wi-Fi Solutions', 
      description: 'High-performance structured cabling and scalable wireless connectivity.', 
      longDescription: 'We design and deploy structured cabling, LAN, and high-performance Wi-Fi networks that deliver stable, secure, and scalable connectivity for offices, commercial spaces, and homes.',
      features: ['Structured Cabling & LAN', 'High-Performance Wi-Fi Networks', 'Secure Scalable Connectivity', 'Commercial & Residential Solutions'],
      icon: Wifi, 
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'security-firewall', 
      title: 'Firewall & Security Systems', 
      description: 'Advanced perimeter defense to protect data from unauthorized access.', 
      longDescription: 'Advanced firewall deployment and network security solutions to protect your data, systems, and users from cyber threats and unauthorized access.',
      features: ['Next-Gen Firewall Deployment', 'Network Security Hardening', 'Cyber Threat Mitigation', 'User Access Control'],
      icon: Shield, 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'home-automation', 
      title: 'Home Automation Solutions', 
      description: 'Intelligent integration of lighting, security, and smart access control.', 
      longDescription: 'Our home automation solutions integrate lighting, security, access control, and smart devices into a single intelligent system, providing enhanced comfort, safety, and energy efficiency.',
      features: ['Unified Smart System Integration', 'Automated Lighting & Access', 'Enhanced Safety Protocols', 'Energy Efficient Ecosystems'],
      icon: HomeIcon, 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 'interiors-renovation', 
      title: 'Interiors & Office Renovation', 
      description: 'Future-ready workspaces with integrated technical infrastructure.', 
      longDescription: 'We deliver functional office interiors and renovation solutions aligned with modern workspaces, seamlessly integrating IT, networking, and security infrastructure for a clean and future-ready environment.',
      features: ['Functional Office Space Planning', 'Modern Turnkey Renovation', 'Integrated Tech Pathways', 'Seamless Infrastructure Merging'],
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
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[200] pointer-events-none">
        <div 
          className="h-full bg-primary shadow-[0_0_10px_#EF4444] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Tactical Comms Hub */}
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