"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 2000;
const MAX_DISTANCE = 4.5;

const NeuralBrainHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    /* SCENE */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#000000", 0.035);

    /* CAMERA */
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 20;

    /* RENDERER */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    /* PARTICLE NODES */
    const nodePositions: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 30;

      nodePositions.push(x, y, z);
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodePositions, 3)
    );

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: "#00ffff",
      transparent: true,
      opacity: 0.9
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    /* CONNECTION LINES */
    const positions = nodeGeometry.attributes.position.array as Float32Array;
    const lines: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          lines.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lines, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
  color: "#00ffff",
  transparent: true,
  opacity: 0.18
});

    const connections = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(connections);

    /* ENERGY PULSES */
    const pulseGeometry = new THREE.SphereGeometry(0.25, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: "#00ffff" });

    const pulses: THREE.Mesh[] = [];

    for (let i = 0; i < 25; i++) {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);

      pulse.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 25
      );

      scene.add(pulse);
      pulses.push(pulse);
    }

    /* ANIMATION */
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      nodes.rotation.y += 0.0006;
      connections.rotation.y += 0.0006;

      pulses.forEach(p => {
        p.position.x += (Math.random() - 0.5) * 0.12;
        p.position.y += (Math.random() - 0.5) * 0.12;
        p.position.z += (Math.random() - 0.5) * 0.12;
      });

      renderer.render(scene, camera);
    };

    animate();

    /* MOUSE PARALLAX */
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;

      camera.position.x = mouse.x * 8;
      camera.position.y = -mouse.y * 6;
      camera.lookAt(scene.position);
    };

    window.addEventListener("mousemove", handleMouseMove);

    /* RESIZE */
    const handleResize = () => {
      const w = mountRef.current?.clientWidth || width;
      const h = mountRef.current?.clientHeight || height;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    /* CLEANUP */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default NeuralBrainHero;