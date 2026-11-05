"use client";

import { useState, type CSSProperties } from "react";

const tools = [
  { id: "after-effects", name: "After Effects", category: "Editing & motion", icon: "after-effects.svg", x: 28, y: 25, size: 21, color: "#6666d9", full: true, description: "My primary editing and motion graphics environment, where I build most of my videos." },
  { id: "premiere-pro", name: "Premiere Pro", category: "Editing", icon: "premiere-pro.svg", x: 53, y: 44, size: 17, color: "#6666d9", full: true, description: "The first Adobe editing platform I learned. I still use it for straightforward edits and projects that require less complex animation." },
  { id: "resolve", name: "DaVinci Resolve", category: "Editing & colour", icon: "davinci-resolve.png", x: 6, y: 39, size: 17, color: "#456e7c", description: "Video editing, colour correction, visual effects and audio post-production in one application." },
  { id: "capcut", name: "CapCut", category: "Editing", icon: "capcut.svg", x: 75, y: 26, size: 14, color: "#888888", full: true, description: "Where I started learning video editing." },
  { id: "audition", name: "Adobe Audition", category: "Audio", icon: "audition.svg", x: 10, y: 5, size: 12, color: "#228e85", full: true, description: "Audio editing, cleanup and mixing for voice, music and sound effects." },
  { id: "blender", name: "Blender", category: "3D", icon: "blender.svg", x: 53, y: 5, size: 13, color: "#a76b34", description: "3D modelling, animation, lighting and rendering." },
  { id: "higgsfield", name: "Higgsfield", category: "AI video", icon: "higgsfield.png", x: 84, y: 60, size: 12, color: "#809b3e", full: true, description: "AI image and video generation with camera and motion controls." },
  { id: "kling", name: "Kling AI", category: "AI video", icon: "kling-wordmark.png", x: 80, y: 0, size: 12, color: "#666666", description: "AI video generation from text prompts and still images." },
  { id: "elevenlabs", name: "ElevenLabs", category: "AI audio", icon: "elevenlabs.svg", x: 66, y: 78, size: 11, color: "#888888", light: true, description: "AI voice generation, voiceovers and speech tools." },
  { id: "topaz", name: "Topaz Video AI", category: "Enhancement", icon: "topaz-video.svg", x: 30, y: 78, size: 12, color: "#648b38", full: true, description: "Video enhancement, upscaling, denoising and frame interpolation." },
];

export function SoftwareTiles() {
  const [selected, setSelected] = useState(tools[0]);
  return (
    <div className="software-showcase" aria-label="Creative software">
      <div className="software-stage" role="group" aria-label="Select a tool to read more">
        {tools.map((tool, index) => (
          <div className="software-position" key={tool.id} style={{ "--x": `${tool.x}%`, "--y": `${tool.y}%`, "--size": `${tool.size}cqw`, "--tint": tool.color, "--delay": `${-index * 1.9}s`, "--duration": `${8 + index % 4}s` } as CSSProperties}>
            <div className="software-float">
              <button type="button" className={`software-tile ${tool.full ? "software-tile-full" : ""} ${tool.light ? "software-tile-light" : ""}`} aria-label={tool.name} aria-pressed={selected.id === tool.id} aria-controls="software-description" onClick={() => setSelected(tool)}>
                {/* Existing brand artwork, shared with the original software display. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/hero/icons/${tool.icon}`} alt="" draggable={false} />
                <span className="software-tooltip" aria-hidden="true">{tool.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="software-description" id="software-description" role="region" aria-label="Selected tool" aria-live="polite" aria-atomic="true">
        <p className="software-eyebrow">The tools I use <span aria-hidden="true">/</span> <span>{selected.category}</span></p>
        <h2>{selected.name}</h2>
        <p className="software-copy">{selected.description}</p>
        <span className="software-hint">Select a tile to explore</span>
      </div>
    </div>
  );
}
