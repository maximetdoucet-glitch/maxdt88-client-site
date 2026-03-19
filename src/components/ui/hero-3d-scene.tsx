"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // ─── Scene Setup ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ─── Colors ───
    const ORANGE = new THREE.Color(0xe8622c);
    const CREAM = new THREE.Color(0xf5f0e8);
    const DARK_ORANGE = new THREE.Color(0x8a3a18);

    // ─── Main Wireframe Icosahedron ───
    const icoGeom = new THREE.IcosahedronGeometry(1.8, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: ORANGE,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icosahedron = new THREE.Mesh(icoGeom, wireframeMat);
    scene.add(icosahedron);

    // ─── Inner Glow Sphere ───
    const glowGeom = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.04,
    });
    const glowSphere = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glowSphere);

    // ─── Second Wireframe (outer, larger, subtle) ───
    const outerGeom = new THREE.IcosahedronGeometry(2.8, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: CREAM,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const outerIco = new THREE.Mesh(outerGeom, outerMat);
    scene.add(outerIco);

    // ─── Floating Particles ───
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 3 + 1;

      // Mix between orange and cream
      const mix = Math.random();
      const col = mix > 0.7 ? CREAM : mix > 0.3 ? ORANGE : DARK_ORANGE;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ─── Connecting Lines (random edges between nearby particles) ───
    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.5 && Math.random() > 0.7) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // ─── Orbital Ring ───
    const ringGeom = new THREE.TorusGeometry(2.2, 0.005, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Second ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.003, 8, 80),
      new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.05 })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // ─── Mouse tracking ───
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ─── Resize handler ───
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ─── Morph vertices for organic feel ───
    const originalPositions = icoGeom.attributes.position.array.slice();

    // ─── Animation Loop ───
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.005;

      // Rotate main icosahedron
      icosahedron.rotation.x += 0.002;
      icosahedron.rotation.y += 0.003;

      // Morph vertices for breathing effect
      const posArr = icoGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const scale = 1 + Math.sin(t * 2 + dist * 3) * 0.06;
        posArr[i] = ox * scale;
        posArr[i + 1] = oy * scale;
        posArr[i + 2] = oz * scale;
      }
      icoGeom.attributes.position.needsUpdate = true;

      // Pulse inner glow
      glowSphere.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
      (glowMat as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(t * 1.5) * 0.015;

      // Counter-rotate outer
      outerIco.rotation.x -= 0.001;
      outerIco.rotation.z += 0.0008;

      // Rotate particles cloud slowly
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0003;
      lines.rotation.y += 0.001;
      lines.rotation.x += 0.0003;

      // Rotate rings
      ring.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      // Mouse parallax on camera
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      icoGeom.dispose();
      wireframeMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      outerGeom.dispose();
      outerMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
