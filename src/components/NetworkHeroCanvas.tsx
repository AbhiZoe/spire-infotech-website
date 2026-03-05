"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  layer: number;
}

interface Pulse {
  x: number;
  y: number;
  progress: number;
}

interface Props {
  converge?: boolean;
  formLogo?: boolean;
}

const NetworkHeroCanvas: React.FC<Props> = ({ converge = false, formLogo = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const NODE_COUNT = 120;
    const COLOR = "31,199,199";

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = canvas.width = canvas.parentElement!.clientWidth;
height = canvas.height = canvas.parentElement!.clientHeight;
    };

    const createNodes = () => {
      nodes.length = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          layer: Math.random() * 2 + 1
        });
      }
    };

    const drawConnections = () => {
      const maxDist = 130;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${COLOR},${0.18 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            if (Math.random() < 0.0008) {
              pulses.push({ x: nodes[i].x, y: nodes[i].y, progress: 0 });
            }
          }
        }
      }
    };

    const drawPulses = () => {
      for (const p of pulses) {
        p.progress += 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + p.progress * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${COLOR},${0.6 - p.progress})`;
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        if (pulses[i].progress > 1) pulses.splice(i, 1);
      }
    };

    const updateNodes = () => {
      for (const n of nodes) {

        if (converge) {
          const cx = width / 2;
          const cy = height / 2;

          n.x += (cx - n.x) * 0.002;
          n.y += (cy - n.y) * 0.002;
        }

        if (formLogo) {
          const targetX = width / 2 + (Math.sin(n.layer * 5) * 60);
          const targetY = height / 2 + (Math.cos(n.layer * 5) * 30);

          n.x += (targetX - n.x) * 0.002;
          n.y += (targetY - n.y) * 0.002;
        }

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          n.x += dx * 0.01;
          n.y += dy * 0.01;
        }

        n.x += n.vx / n.layer;
        n.y += n.vy / n.layer;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }
    };

    const drawNodes = () => {
      for (const n of nodes) {

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2 / n.layer, 0, Math.PI * 2);

        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(31,199,199,0.6)";
        ctx.fillStyle = `rgba(${COLOR},0.9)`;

        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      updateNodes();
      drawConnections();
      drawNodes();
      drawPulses();

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    createNodes();
    animate();

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
    };

  }, [converge, formLogo]);

  return (
    <canvas
  ref={canvasRef}
  className="absolute top-0 left-0 w-full h-full block"
/>
  );
};
console.log("Network Canvas Loaded");

export default NetworkHeroCanvas;