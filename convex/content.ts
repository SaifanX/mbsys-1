import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get page content by name
export const get = query({
  args: { pageName: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_pageName", (q) => q.eq("pageName", args.pageName))
      .unique();
    return page ? page.data : null;
  },
});

// Update or insert page content by name
export const update = mutation({
  args: { pageName: v.string(), data: v.any() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pages")
      .withIndex("by_pageName", (q) => q.eq("pageName", args.pageName))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { data: args.data });
    } else {
      await ctx.db.insert("pages", { pageName: args.pageName, data: args.data });
    }
    return { success: true };
  },
});

// Seed default content
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const pages = [
      {
        pageName: "home",
        data: {
          badge: "Service Status: Online",
          heroTitle: "Integrated Infrastructure.",
          heroSubtitle: "Professional engineering for enterprise environments. We align architectural design with technical performance.",
          stats: {
            experience: "10+",
            successfulProjects: "100+",
            managedSystems: "500+",
            support: "24/7",
          },
          partnerTitle: "Professional Partner",
          partnerDesc: "Authorized Infrastructure Authority in Bengaluru",
          overviewTitle: "Implementation Overview",
          overviewDesc: "Explore the technical infrastructure integrated within our finished interior projects.",
        },
      },
      {
        pageName: "about",
        data: {
          title: "Infrastructure Excellence.",
          description: "Headquartered in Bengaluru, MBSYS delivers professional technical solutions by integrating advanced infrastructure with functional design.",
          stats: {
            clientFocus: "100%",
            completedProjects: "500+",
          },
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=60&w=1200&auto=format",
          imageTitle: "Professional Technical Operations",
          imageSubtitle: "Bengaluru Headquarters",
          coreValues: [
            { title: "Precision", desc: "Expert engineering and installation standards for all infrastructure components." },
            { title: "Reliability", desc: "Durable and secure systems designed for continuous operation." },
            { title: "Compliance", desc: "Alignment with international industry standards and local regulations." },
            { title: "Monitoring", desc: "Proactive maintenance and support systems for peak performance." }
          ],
          timeline: [
            { year: "2016", title: "Company Established", description: "MBSYS launches as a technical infrastructure consultancy in Bengaluru." },
            { year: "2018", title: "Service Expansion", description: "Major expansion into industrial security and surveillance systems." },
            { year: "2021", title: "System Integration", description: "Integrated facility controls added to core service offerings." },
            { year: "2024", title: "Division Growth", description: "Interiors and Office Renovation division fully operational." }
          ],
          ctaTitle: "Discuss Your Project",
          ctaDesc: "Partner with our technical team to design and deploy robust infrastructure for your facility."
        }
      },
      {
        pageName: "services",
        data: {
          title: "Technical Infrastructure Services",
          description: "Design, deployment, and optimization of critical commercial systems in Bengaluru.",
          list: [
            { 
              id: "infra-amc", 
              title: "IT Infrastructure & Support", 
              slug: "it-infrastructure-support",
              description: "Design, implementation, and maintenance of mission-critical IT environments in Bengaluru.", 
              longDescription: "We design, implement, and maintain complete IT infrastructure for businesses. Our Annual Maintenance Contracts (AMC) cover system monitoring, troubleshooting, and scheduled upgrades.",
              features: ["Infrastructure Design", "Maintenance Contracts (AMC)", "Proactive System Monitoring", "System Troubleshooting"],
              image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=60&w=1200&auto=format" 
            },
            { 
              id: "cctv-surveillance", 
              title: "CCTV & Security Solutions", 
              slug: "cctv-security-solutions",
              description: "Professional IP camera installations for reliable business surveillance.", 
              longDescription: "End-to-end security solutions including site assessment, camera selection, installation, and configuration to ensure reliable office surveillance.",
              features: ["Site Security Assessment", "High-Definition Installation", "Network Configuration", "Routine Maintenance"],
              image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=60&w=1200&auto=format" 
            },
            { 
              id: "networking-wifi", 
              title: "Networking & Connectivity", 
              slug: "networking-connectivity",
              description: "High-performance cabling and scalable wireless solutions for business continuity.", 
              longDescription: "We deploy structured cabling and high-performance wireless networks that deliver stable and secure connectivity for modern office environments.",
              features: ["Structured Cabling", "Wireless Network Design", "Secure Connectivity", "Commercial Installations"],
              image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=60&w=1200&auto=format" 
            },
            { 
              id: "security-firewall", 
              title: "Data Security & Firewalls", 
              slug: "data-security-firewalls",
              description: "Advanced network security to protect critical business data.", 
              longDescription: "Advanced firewall deployment and network security solutions to protect your systems from cyber threats and unauthorized access.",
              features: ["Firewall Deployment", "Network Hardening", "Security Audits", "Access Control Systems"],
              image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=60&w=1200&auto=format" 
            },
            { 
              id: "home-automation", 
              title: "Smart Office Solutions", 
              slug: "smart-office-solutions",
              description: "Integration of lighting, security, and smart access control systems.", 
              longDescription: "Our smart office solutions integrate lighting, security, and access control into a single manageable system for efficiency and comfort.",
              features: ["System Integration", "Automated Lighting Control", "Access Management", "Energy Efficiency"],
              image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=60&w=1200&auto=format" 
            },
            { 
              id: "interiors-renovation", 
              title: "Office Interiors & Renovation", 
              slug: "office-renovation-interiors",
              description: "Modern workspace design with integrated technical infrastructure.", 
              longDescription: "We deliver functional office interiors and renovation solutions, seamlessly integrating IT, networking, and security infrastructure for a clean workspace.",
              features: ["Office Space Planning", "Turnkey Renovations", "Infrastructure Integration", "Modern Design Standards"],
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=60&w=1200&auto=format" 
            }
          ]
        }
      },
      {
        pageName: "contact",
        data: {
          address: "MBSYS Tech Solutions, Bengaluru, Karnataka, India",
          email: "support@mbsys.in",
          phone: "+91 98765 43210",
          whatsapp: "+919876543210"
        }
      }
    ];

    for (const page of pages) {
      const existing = await ctx.db
        .query("pages")
        .withIndex("by_pageName", (q) => q.eq("pageName", page.pageName))
        .unique();
      if (!existing) {
        await ctx.db.insert("pages", { pageName: page.pageName, data: page.data });
      }
    }

    return { seeded: true };
  },
});
