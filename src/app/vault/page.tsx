import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Book, FileText, ChevronRight, Search, Shield, Activity, Lock, Zap, Camera, Play, Layout } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SplitChars, SplitWords } from "@/components/ui/text-effects";
import { TextShimmer } from "@/components/ui/text-shimmer";

export const metadata: Metadata = {
  title: "The Skills Vault | Builder Resources",
  description: "Advanced technical resources, regulatory frameworks, and growth playbooks for the modern builder.",
};

const RESOURCES = [
  {
    title: "Senior Regulatory Affairs Manager",
    category: "Regulatory",
    icon: Shield,
    path: "/vault/regulatory-affairs-head",
    description: "Global regulatory pathways, submission strategies, and risk assessment."
  },
  {
    title: "MDR 2017/745 Specialist",
    category: "Compliance",
    icon: Lock,
    path: "/vault/mdr-745-specialist",
    description: "Classification decisions, technical documentation, and EU compliance."
  },
  {
    title: "Risk Management Specialist",
    category: "Quality",
    icon: Activity,
    path: "/vault/risk-management-specialist",
    description: "ISO 14971 implementation and product lifecycle risk analysis."
  },
  {
    title: "Growth Execution Plan",
    category: "Marketing",
    icon: Book,
    path: "/vault/marketing-execution-plan",
    description: "Advanced strategies for scaling digital protocols and community loops."
  },
  {
    title: "Kubernetes Architecture",
    category: "DevOps",
    icon: Shield,
    path: "/vault/kubernetes-architecture",
    description: "Core architectural blueprints for the Kubernetes control plane."
  },
  {
    title: "Pod Orchestration",
    category: "DevOps",
    icon: Activity,
    path: "/vault/kubernetes-pods",
    description: "Deep dive into pod lifecycle, configuration, and scheduling."
  },
  {
    title: "Service Networking",
    category: "DevOps",
    icon: Lock,
    path: "/vault/kubernetes-services",
    description: "Framework for internal cluster communication and service discovery."
  },
  {
    title: "Frontend HTML5 Protocol",
    category: "Frontend",
    icon: FileText,
    path: "/vault/frontend-html",
    description: "Battle-tested HTML5 templates and semantic best practices."
  },
  {
    title: "Resilient CSS Architecture",
    category: "Frontend",
    icon: Book,
    path: "/vault/frontend-css",
    description: "System for maintainable, performant, and cross-browser CSS."
  },
  {
    title: "Modern JS Best Practices",
    category: "Frontend",
    icon: Activity,
    path: "/vault/frontend-js",
    description: "Optimizing JavaScript for performance, security, and stability."
  },
  {
    title: "Imaging Snapshot Protocol",
    category: "Imaging",
    icon: Camera,
    path: "/vault/imaging-snapshot",
    description: "Advanced DOM-to-Canvas rendering and snapshot techniques."
  },
  {
    title: "Visual Rendering Engine",
    category: "Imaging",
    icon: Zap,
    path: "/vault/imaging-features",
    description: "Deep dive into the rendering logic and feature set of the canvas engine."
  },
  {
    title: "Engine Configuration",
    category: "Imaging",
    icon: Shield,
    path: "/vault/imaging-config",
    description: "Optimizing the rendering engine for cross-browser stability and proxying."
  },
  {
    title: "Web Platform Standards",
    category: "Web Standards",
    icon: Shield,
    path: "/vault/web-standards",
    description: "Deep dive into the Living Standard philosophy and the WHATWG web runtime."
  },
  {
    title: "HTML Semantics Protocol",
    category: "Web Standards",
    icon: FileText,
    path: "/vault/html-semantics",
    description: "Battle-tested semantic structure rules for building accessible, interoperable pages."
  },
  {
    title: "Custom Elements Blueprint",
    category: "Web Standards",
    icon: Zap,
    path: "/vault/custom-elements",
    description: "Blueprints for extending the HTML vocabulary with autonomous custom components."
  },
  {
    title: "Cinematic Sequencing",
    category: "Cinematic",
    icon: Play,
    path: "/vault/cinematic-sequencing",
    description: "Structuring information in non-linear, high-impact 2D grids with fragment delivery."
  },
  {
    title: "Auto-Animate Logic",
    category: "Cinematic",
    icon: Zap,
    path: "/vault/auto-animate",
    description: "State-transition engine for matching elements and interpolating properties across views."
  },
  {
    title: "Presentation Architecture",
    category: "Cinematic",
    icon: Layout,
    path: "/vault/presentation-architecture",
    description: "Core pillars of HTML-based slide frameworks: Controllers, View Engines, and Plugins."
  }
];

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4ebd0] pt-32 pb-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[0.65rem] font-bold uppercase tracking-widest text-[#f4ebd0]/40">
            <Lock className="w-3 h-3" />
            Restricted Access Library
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#f4ebd0] leading-[1.1]">
            <SplitChars text="The " />
            <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-5xl md:text-7xl font-black">Skills Vault.</TextShimmer>
          </h1>
          <p className="text-xl text-[#f4ebd0]/60 leading-relaxed font-medium">
            <SplitWords text="A curated collection of technical frameworks, regulatory blueprints, and growth playbooks derived from top-tier industry protocols." delay={0.4} />
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          {RESOURCES.map((resource, i) => (
            <Link 
              key={i}
              href={resource.path}
              className="group relative bg-white/[0.03] rounded-3xl p-8 border border-white/5 hover:border-[#0369a1]/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-[#0369a1] group-hover:text-[#0a0a0a] transition-colors duration-300">
                  <resource.icon className="w-6 h-6" />
                </div>
                <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#f4ebd0]/30">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#f4ebd0] mb-3 group-hover:text-[#0369a1] transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-[#f4ebd0]/50 leading-relaxed">
                {resource.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#0369a1] opacity-0 group-hover:opacity-100 transition-opacity">
                <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-[0.65rem] font-bold uppercase tracking-widest">
                  Access Documentation
                </TextShimmer> 
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-20 border-t border-white/5 text-center">
          <p className="text-sm text-[#f4ebd0]/30 font-medium">
            New protocols added weekly. Documentation governed by open-source standards.
          </p>
        </div>
      </div>
    </div>
  );
}
