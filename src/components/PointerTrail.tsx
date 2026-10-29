import { useEffect, useRef } from "react";
import { A11Y_EVENT, motionReduced } from "@/lib/a11y";

export default function PointerTrail() {
  const dot = useRef<HTMLDivElement>(null),
    ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let active = false,
      shown = false,
      raf = 0,
      last = 0;
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0,
      vx = 0,
      vy = 0;
    const hide = () => {
      shown = false;
      root.classList.remove("pointer-visible");
    };
    const tick = (time: number) => {
      if (!active || !shown) {
        raf = 0;
        return;
      }
      const dt = last ? Math.min((time - last) / 1000, 0.032) : 0.016;
      last = time;
      const steps = Math.max(1, Math.ceil(dt / 0.008));
      for (let i = 0; i < steps; i++) {
        const h = dt / steps;
        vx += ((x - rx) * 230 - vx * 25) * h;
        vy += ((y - ry) * 230 - vy * 25) * h;
        rx += vx * h;
        ry += vy * h;
      }
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (
        Math.abs(x - rx) + Math.abs(y - ry) + Math.abs(vx) + Math.abs(vy) <
        0.15
      ) {
        rx = x;
        ry = y;
        vx = vy = 0;
        if (ring.current)
          ring.current.style.transform = `translate3d(${x}px,${y}px,0)`;
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (!active || e.pointerType !== "mouse") return;
      if (
        (e.target as Element | null)?.closest(
          "input, textarea, [contenteditable='true'], select",
        )
      ) {
        hide();
        return;
      }
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        rx = x;
        ry = y;
        vx = vy = 0;
        shown = true;
        root.classList.add("pointer-visible");
      }
      if (dot.current)
        dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      active = fine.matches && !reduced.matches && !motionReduced();
      if (!active) {
        hide();
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
      }
    };
    const leave = (e: PointerEvent) => {
      if (!e.relatedTarget) hide();
    };
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    window.addEventListener(A11Y_EVENT, sync);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    return () => {
      hide();
      cancelAnimationFrame(raf);
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener(A11Y_EVENT, sync);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
    };
  }, []);
  return (
    <div className="pointer-trail" aria-hidden="true">
      <div ref={ring} className="pointer-trail__ring">
        <span />
      </div>
      <div ref={dot} className="pointer-trail__dot">
        <span />
      </div>
    </div>
  );
}
