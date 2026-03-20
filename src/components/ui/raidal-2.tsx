"use client";
import React, { useEffect, useRef } from "react";

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds
uniform int   iFrame;        // frame counter
uniform vec4  iMouse;        // (x, y, L, R)

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    vec2 p = FC.xy - r * 0.5;

    for (float i, a; i++ < 9.0; )
    {
        a = (i * i) / 80.0 - length(p) / r.y;
        float denom = max(a, -a * 3.0) + 2.0 / r.y;

        a = cos(i - t);
        float edge0 = a;
        float edge1 = 3.0; // Increased contrast for the radial effect
        a = atan(p.y, p.x) + a + i * i;
        float sm = smoothstep(edge0, edge1, cos(a));

        // Shifted color towards the accent #1d4ed8
        o += 0.05 / denom * sm * (1.2 + sin(a + i + vec4(0.0, 1.5, 3.0, 0.0))); 
    }

    o = tanh(o);
    // Mix with very dark background or off-white. Using dark dominant here.
    fragColor = vec4(o.rgb * vec3(0.86, 0.15, 0.15), 0.4); 
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}

`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(sh) || "";
  return { shader: ok ? sh : null, log };
}
function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(prog) || "";
  return { program: ok ? prog : null, log };
}

export default function RadialShaderEffect({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, l: 0, r: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2", { alpha: true });
    if (!gl) return;

    let disposed = false;

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { shader: vs } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const { shader: fs } = safeCompile(gl, gl.FRAGMENT_SHADER, SHADER_SRC);
    if (!vs || !fs) return;
    const { program } = safeLink(gl, vs, fs);
    if (!program) return;

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");
    const uMouse = gl.getUniformLocation(program, "iMouse");

    const getDpr = () => Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function applySize() {
      if (disposed) return;
      const dpr = getDpr();
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        if (gl) gl.viewport(0, 0, w, h);
      }
    }

    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);
    applySize();

    startRef.current = performance.now();
    frameRef.current = 0;

    function tick(now: number) {
      if (disposed || !gl) return;
      
      const t = (now - startRef.current) / 1000;
      frameRef.current += 1;

      gl.useProgram(program!);
      const dpr = getDpr();
      const w = canvas.width, h = canvas.height;

      if (uResolution) gl.uniform3f(uResolution, w, h, dpr);
      if (uTime) gl.uniform1f(uTime, t);
      if (uFrame) gl.uniform1i(uFrame, frameRef.current);
      if (uMouse) {
        const m = mouseRef.current;
        gl.uniform4f(uMouse, m.x * dpr, m.y * dpr, m.l, m.r);
      }

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
