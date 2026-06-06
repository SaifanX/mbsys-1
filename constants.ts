import { Server, Shield, Wifi, Video, Home as HomeIcon, PenTool } from 'lucide-react';
import { Service, TimelineItem } from './types';

export const SERVICES: Service[] = [
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

export const TIMELINE: TimelineItem[] = [
  { year: '2016', title: 'Company Established', description: 'MBSYS launches as a technical infrastructure consultancy in Bengaluru.' },
  { year: '2018', title: 'Service Expansion', description: 'Major expansion into industrial security and surveillance systems.' },
  { year: '2021', title: 'System Integration', description: 'Integrated facility controls added to core service offerings.' },
  { year: '2024', title: 'Division Growth', description: 'Interiors and Office Renovation division fully operational.' },
];
