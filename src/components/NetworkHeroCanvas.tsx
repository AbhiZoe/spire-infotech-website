"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  converge: boolean;
  formLogo: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX?: number;
  targetY?: number;
}

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 140;

const NetworkHeroCanvas: React.FC<Props> = ({ converge, formLogo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame: number;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    /* CREATE RANDOM NODES */

    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    /* CREATE LOGO TARGET POSITIONS */

    const logoTargets: { x: number; y: number }[] = [];

    const text = "SPIRE";
    const fontSize = 180;

    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d")!;

    offCanvas.width = width;
    offCanvas.height = height;

    offCtx.fillStyle = "white";
    offCtx.font = `bold ${fontSize}px Arial`;
    offCtx.textAlign = "center";
    offCtx.fillText(text, width / 2, height / 2);

    const imageData = offCtx.getImageData(0, 0, width, height);

    for (let y = 0; y < height; y += 6) {
      for (let x = 0; x < width; x += 6) {
        const index = (y * width + x) * 4;
        if (imageData.data[index + 3] > 150) {
          logoTargets.push({ x, y });
        }
      }
    }

    /* MOUSE INTERACTION */

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      nodes.forEach((node, i) => {
        if (formLogo && logoTargets[i]) {
          node.targetX = logoTargets[i].x;
          node.targetY = logoTargets[i].y;

          node.x += (node.targetX - node.x) * 0.05;
          node.y += (node.targetY - node.y) * 0.05;
        } else {
          node.x += node.vx;
          node.y += node.vy;
        }

        /* SCREEN WRAP */

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;

        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        /* MOUSE PUSH */

        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          node.x += dx * 0.02;
          node.y += dy * 0.02;
        }

        /* DRAW NODE */

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(31,199,199,0.9)";
        ctx.fill();
      });

      /* CONNECTION LINES */

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            ctx.strokeStyle =
              "rgba(31,199,199," +
              (1 - dist / CONNECTION_DISTANCE) * 0.5 +
              ")";

            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [converge, formLogo]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
    />
  );
};

export default NetworkHeroCanvas;