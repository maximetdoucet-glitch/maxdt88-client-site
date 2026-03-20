"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import { Download, Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadProtocolProps {
  elementId: string;
  fileName: string;
}

export function DownloadProtocol({ elementId, fileName }: DownloadProtocolProps) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    setIsCapturing(true);
    try {
      // Capture the element using html2canvas
      const canvas = await html2canvas(element, {
        backgroundColor: "#f4ebd0", // Match the vault background
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
      });

      // Convert to image and download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${fileName}-protocol.png`;
      link.click();
    } catch (error) {
      console.error("Failed to capture protocol:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isCapturing}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] text-[#f4ebd0] rounded-xl text-[0.65rem] font-bold uppercase tracking-widest hover:bg-[#1d4ed8] transition-all duration-300 disabled:opacity-50",
        isCapturing && "cursor-wait"
      )}
    >
      {isCapturing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Capturing Snapshot...
        </>
      ) : (
        <>
          <Camera className="w-4 h-4" />
          Download Protocol Snapshot
        </>
      )}
    </button>
  );
}
