import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const WIN_W = "min(920px, 92vw)";
const WIN_H = "min(680px, 84vh)";

const windowStyles = `
  /* ── Window base ── */
  .sgwin {
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${WIN_W};
    height: ${WIN_H};
    display: flex;
    flex-direction: column;
    background: rgba(5, 0, 18, 0.94);
    border: 1px solid rgba(160, 50, 210, 0.38);
    border-radius: 14px;
    overflow: hidden;
    box-shadow:
      0 30px 90px rgba(0,0,0,0.8),
      0 0 0 1px rgba(160,50,210,0.15),
      0 0 60px rgba(130,25,190,0.14);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    touch-action: pan-y;
  }
  .sgwin.active {
    border-color: rgba(200, 80, 245, 0.6);
    box-shadow:
      0 40px 100px rgba(0,0,0,0.85),
      0 0 0 1px rgba(200,80,245,0.25),
      0 0 80px rgba(160,40,220,0.25);
  }

  /* ── Traffic-light header ── */
  .sgwin-header {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
    cursor: grab;
    user-select: none;
  }
  .sgwin-header:active { cursor: grabbing; }

  .sgwin-tl {
    width: 12px; height: 12px;
    border-radius: 50%;
    cursor: pointer;
    flex-shrink: 0;
    transition: filter 0.15s;
  }
  .sgwin-tl:hover { filter: brightness(1.3); }
  .sgwin-tl.red    { background: #ff5f57; box-shadow: 0 0 6px rgba(255,95,87,0.55); }
  .sgwin-tl.yellow { background: #febc2e; box-shadow: 0 0 6px rgba(254,188,46,0.55); }
  .sgwin-tl.green  { background: #28c840; box-shadow: 0 0 6px rgba(40,200,64,0.55); }

  .sgwin-title {
    font-family: 'JetBrains Mono','Fira Code','Courier New',monospace;
    font-size: 0.72em;
    color: rgba(255,255,255,0.4);
    margin-left: 8px;
    letter-spacing: 0.5px;
    pointer-events: none;
    flex: 1;
  }

  /* ── Scrollable body ── */
  .sgwin-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(180,60,230,0.3) transparent;
    -webkit-overflow-scrolling: touch;
  }
  .sgwin-body::-webkit-scrollbar { width: 5px; }
  .sgwin-body::-webkit-scrollbar-track { background: transparent; }
  .sgwin-body::-webkit-scrollbar-thumb {
    background: rgba(180,60,230,0.3);
    border-radius: 4px;
  }

  .sgwin-body .home-section,
  .sgwin-body .home-section-2,
  .sgwin-body .about-section,
  .sgwin-body .project-section,
  .sgwin-body .creative-section,
  .sgwin-body .resume-section {
    background: transparent !important;
    min-height: auto !important;
  }
  .sgwin-body canvas { display: none !important; }

  /* ── Mobile Layout Polish ── */
  @media (max-width: 767px) {
    .sgwin {
      width: 95vw !important;
      height: 78vh !important;
      top: 45% !important;
      left: 50% !important;
      border-radius: 16px !important;
    }
    .sgwin-header {
      padding: 10px 14px;
    }
    .sgwin-title {
      font-size: 0.68em;
    }
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || document.getElementById("sgwin-styles")) return;
  const el = document.createElement("style");
  el.id = "sgwin-styles";
  el.textContent = windowStyles;
  document.head.appendChild(el);
  stylesInjected = true;
}

function SGWindow({ id, title, isActive, zIndex, onClose, onFocus, initialOffset, children }) {
  injectStyles();

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offsetX = isMobile ? 0 : (initialOffset?.x ?? 0);
  const offsetY = isMobile ? 0 : (initialOffset?.y ?? 0);

  const mx = useMotionValue(offsetX);
  const my = useMotionValue(offsetY);

  useEffect(() => {
    mx.set(offsetX);
    my.set(offsetY);
  }, [offsetX, offsetY, mx, my]);

  const headerRef = useRef(null);

  return (
    <motion.div
      className={`sgwin${isActive ? " active" : ""}`}
      style={{
        zIndex,
        x: mx,
        y: my,
        translateX: "-50%",
        translateY: "-50%",
      }}
      drag={!isMobile}
      dragMomentum={false}
      dragElastic={0}
      dragListener={!isMobile}
      dragConstraints={{
        top: -window.innerHeight * 0.4,
        bottom: window.innerHeight * 0.4,
        left: -window.innerWidth * 0.4,
        right: window.innerWidth * 0.4,
      }}
      onDragStart={(e, info) => {
        const headerEl = headerRef.current;
        if (!headerEl) return;
        const rect = headerEl.getBoundingClientRect();
        const isInHeader = (
          info.point.x >= rect.left && info.point.x <= rect.right &&
          info.point.y >= rect.top  && info.point.y <= rect.bottom
        );
        if (!isInHeader) {
          mx.stop();
          my.stop();
        }
      }}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Draggable header */}
      <div
        ref={headerRef}
        className="sgwin-header"
        onPointerDown={onFocus}
      >
        <div
          className="sgwin-tl red"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          title="Close"
        />
        <div className="sgwin-tl yellow" title="Minimise" />
        <div className="sgwin-tl green"  title="Full size" />
        <span className="sgwin-title">{title}</span>
      </div>

      {/* Content */}
      <div className="sgwin-body" onPointerDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}

export default SGWindow;
