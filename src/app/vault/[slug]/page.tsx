import React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ChevronLeft, Share2, Printer, Download, Zap, Camera } from "lucide-react";
import { DownloadProtocol } from "@/components/ui/download-protocol";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { notFound } from "next/navigation";

interface VaultItemPageProps {
  params: Promise<{ slug: string }>;
}

const SLUG_MAP: Record<string, string> = {
  "regulatory-affairs-head": "regulatory-affairs-head/SKILL.md",
  "mdr-745-specialist": "mdr-745-specialist/SKILL.md",
  "risk-management-specialist": "risk-management-specialist/SKILL.md",
  "marketing-execution-plan": "MARKETING-EXECUTION-PLAN.md",
  "copilot-system": "refly/copilot-system.md",
  "node-agent-system": "refly/node-agent-system.md",
  "ai-native-architecture": "refly/ai-native-architecture.md",
  "kubernetes-architecture": "kubernetes/architecture.md",
  "kubernetes-pods": "kubernetes/pods.md",
  "kubernetes-services": "kubernetes/services.md",
  "kubernetes-basics": "kubernetes/basics.md",
  "frontend-html": "h5bp/frontend-html.md",
  "frontend-css": "h5bp/frontend-css.md",
  "frontend-js": "h5bp/frontend-js.md",
  "frontend-extend": "h5bp/frontend-extend.md",
  "imaging-snapshot": "html2canvas/imaging-docs.md",
  "imaging-features": "html2canvas/imaging-features.md",
  "imaging-config": "html2canvas/imaging-config.md",
  "web-standards": "whatwg/web-platform-standards.md",
  "html-semantics": "whatwg/html-semantics-protocol.md",
  "custom-elements": "whatwg/custom-elements-blueprint.md",
  "cinematic-sequencing": "revealjs/cinematic-sequencing.md",
  "auto-animate": "revealjs/auto-animate-logic.md",
  "presentation-architecture": "revealjs/presentation-architecture.md",
};

export async function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({
    slug,
  }));
}

export default async function VaultItemPage({ params }: VaultItemPageProps) {
  const { slug } = await params;
  const filePath = SLUG_MAP[slug];

  if (!filePath) {
    notFound();
  }

  const fullPath = path.join(process.cwd(), "src/data/vault", filePath);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  // Simple frontmatter stripping
  const processedContent = content.replace(/^---[\s\S]*?---/, "");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4ebd0] pt-32 pb-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/vault"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f4ebd0]/40 hover:text-[#0369a1] transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-xs font-bold uppercase tracking-widest">
            Back to Vault
          </TextShimmer>
        </Link>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0369a1] rounded-xl flex items-center justify-center text-[#0a0a0a]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#f4ebd0]/30">Resource Protocol</p>
              <p className="text-sm font-bold text-[#f4ebd0]">{slug.replace(/-/g, ' ')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <DownloadProtocol elementId="vault-content" fileName={slug} />
            <button aria-label="Print Document" className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Printer className="w-4 h-4 text-[#f4ebd0]/40" />
            </button>
            <button aria-label="Share Document" className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4 text-[#f4ebd0]/40" />
            </button>
          </div>
        </div>

        {/* Content */}
        <article id="vault-content" className="prose prose-invert max-w-none 
          bg-white/[0.03] rounded-[2rem] border border-white/5 p-8 md:p-12
          prose-headings:text-[#f4ebd0] prose-headings:font-black prose-headings:tracking-tight 
          prose-p:text-[#f4ebd0]/70 prose-p:leading-relaxed
          prose-strong:text-[#f4ebd0] prose-strong:font-bold
          prose-li:text-[#f4ebd0]/70
          prose-code:text-[#0369a1] prose-code:bg-[#0369a1]/10 prose-code:px-1 prose-code:rounded
          prose-pre:bg-white/[0.03] prose-pre:text-[#f4ebd0] prose-pre:rounded-3xl prose-pre:p-8
        ">
          <ReactMarkdown>{processedContent}</ReactMarkdown>
        </article>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-xs text-[#f4ebd0]/30 font-bold uppercase tracking-widest">
            End of Protocol Documentation
          </p>
        </div>
      </div>
    </div>
  );
}
