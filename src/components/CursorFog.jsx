import React, { useEffect, useRef } from "react";

/**
 * CursorFog.jsx — FINAL VERSION
 *
 * Realistic, non-geometric fog / smog interaction.
 *
 * Key properties:
 * - Fog is INVISIBLE by default
 * - Fog appears ONLY on hover / touch
 * - Fog dissolves completely after idle
 * - NO persistent strokes, bars, blobs, or geometry
 * - NO background animation when idle
 * - Low GPU usage (density field, not shapes)
 *
 * Technique:
 * - Density-based fog (many soft overlapping samples)
 * - Global fade (destination-out) to guarantee cleanup
 * - Short-lived RAF loop
 * - Visibility-gated canvas
 */

export default function CursorFog({
  zIndex = 20,
  idleTimeout = 420,
  maxDisturbances = 5,
  enableOnMobile = true,
  lowPowerMode = false,
} = {}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const disturbances = useRef([]);
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const lastActivity = useRef(0);
  const running = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ---------- SAFETY: MOBILE / LOW POWER ---------- */
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!enableOnMobile && isTouch) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    /* ---------- SIZE / DPR ---------- */
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;

    function resize() {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);
    }

    resize();
    window.addEventListener("resize", resize);

    /* ---------- COLOR PALETTE ---------- */
    const fogColor = (a) =>
      `rgba(180,150,255,${a})`; // lavender-purple mist
    const deepFog = (a) =>
      `rgba(60,40,100,${a})`; // deep indigo base

    /* ---------- VISIBILITY CONTROL ---------- */
    function showFog() {
      if (!visible.current) {
        visible.current = true;
        canvas.style.opacity = "1";
      }
    }

    function hideFog() {
      visible.current = false;
      canvas.style.opacity = "0";
    }

    /* ---------- DISTURBANCE SPAWN ---------- */
    function spawn(x, y, vx, vy) {
      if (disturbances.current.length >= maxDisturbances) {
        disturbances.current.shift();
      }

      disturbances.current.push({
        x,
        y,
        vx,
        vy,
        life: 1,
        strength: Math.min(1.6, Math.hypot(vx, vy) / 12 + 0.4),
      });

      lastActivity.current = performance.now();
      showFog();
      if (!running.current) start();
    }

    /* ---------- POINTER HANDLERS ---------- */
    const THROTTLE = 50;
    let lastSpawn = 0;

    function onMove(e) {
      const now = performance.now();
      if (now - lastSpawn < THROTTLE) return;
      lastSpawn = now;

      const px = e.clientX;
      const py = e.clientY;
      const dt = Math.max(16, now - lastPointer.current.t);
      const dx = px - lastPointer.current.x;
      const dy = py - lastPointer.current.y;

      spawn(px, py, dx / dt * 22, dy / dt * 22);

      lastPointer.current = { x: px, y: py, t: now };
    }

    function onDown(e) {
      spawn(e.clientX, e.clientY, 0.8, 0.8);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    /* ---------- RENDER LOOP ---------- */
    function frame() {
      rafRef.current = null;

      // Global fade (guarantees nothing sticks)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.14)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // Draw disturbances as density (NO SHAPES)
      for (const d of disturbances.current) {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.life *= 0.88;

        if (d.life < 0.04) continue;

        const samples = lowPowerMode ? 3 : 6;
        for (let i = 0; i < samples; i++) {
          const jitterX = (Math.random() - 0.5) * 120;
          const jitterY = (Math.random() - 0.5) * 120;
          const r = 120 + Math.random() * 220;

          const gx = d.x + jitterX;
          const gy = d.y + jitterY;

          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
          g.addColorStop(0, fogColor(0.04 * d.life));
          g.addColorStop(0.55, deepFog(0.025 * d.life));
          g.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = g;
          ctx.fillRect(gx - r, gy - r, r * 2, r * 2);
        }
      }

      disturbances.current = disturbances.current.filter(
        (d) => d.life > 0.05
      );

      const now = performance.now();
      if (
        disturbances.current.length === 0 &&
        now - lastActivity.current > idleTimeout
      ) {
        stop();
        hideFog();
        ctx.clearRect(0, 0, w, h);
        return;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function start() {
      running.current = true;
      rafRef.current = requestAnimationFrame(frame);
    }

    function stop() {
      running.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    /* ---------- INIT ---------- */
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 260ms ease";

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [idleTimeout, maxDisturbances, enableOnMobile, lowPowerMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
        mixBlendMode: "screen",
      }}
    />
  );
}
