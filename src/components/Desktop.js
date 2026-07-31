import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SGWindow from "./Window";
import Dock from "./Dock";

import HomeWindow     from "./windows/HomeWindow";
import AboutWindow    from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import CreativeWindow from "./windows/CreativeWindow";
import ResumeWindow   from "./windows/ResumeWindow";

/* ─── App registry ─── */
const APPS = {
  home:     { title: "home.exe",       label: "Home",         shortLabel: "Home",     icon: "🏠" },
  about:    { title: "about.profile",  label: "About",        shortLabel: "About",    icon: "👤" },
  projects: { title: "projects.dir",   label: "Projects",     shortLabel: "Projects", icon: "📁" },
  creative: { title: "creative.lab",   label: "Creative Lab", shortLabel: "Creative", icon: "🎨" },
  resume:   { title: "resume.pdf",     label: "Resume",       shortLabel: "Resume",   icon: "📄" },
};

/* Window body content — keyed by app id */
const WINDOW_CONTENT = {
  home:     <HomeWindow />,
  about:    <AboutWindow />,
  projects: <ProjectsWindow />,
  creative: <CreativeWindow />,
  resume:   <ResumeWindow />,
};

/* Cascade offset for stacked windows (px) */
const CASCADE_OFFSET = 28;

const desktopStyles = `
  /* ══════════════════════════════════
     DESKTOP ROOT — full-screen canvas
  ══════════════════════════════════ */
  .sgdesk {
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: 0;
  }

  /* ── Liquid Cosmic Gradient Background ── */
  .sgdesk-bg {
    position: absolute;
    inset: 0;
    background: #04010a;
    background-image: 
      radial-gradient(at 20% 20%, rgba(147, 51, 234, 0.28) 0px, transparent 50%),
      radial-gradient(at 80% 20%, rgba(0, 243, 255, 0.2) 0px, transparent 50%),
      radial-gradient(at 50% 80%, rgba(224, 72, 200, 0.22) 0px, transparent 50%),
      radial-gradient(at 80% 80%, rgba(124, 58, 237, 0.25) 0px, transparent 50%);
    z-index: 0;
  }
  /* Cyber Grid & Ambient Orbs */
  .sgdesk-rays {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
    z-index: 0;
    pointer-events: none;
  }
  .sgdesk-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(2, 0, 8, 0.6) 100%);
    z-index: 0;
    pointer-events: none;
  }

  @keyframes deskFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Desktop tap-hint ── */
  .sgdesk-hint {
    position: absolute;
    bottom: 88px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'JetBrains Mono','Fira Code','Courier New',monospace;
    font-size: clamp(0.55em,1.4vw,0.68em);
    color: rgba(255,255,255,0.3);
    letter-spacing: 2.5px;
    text-transform: uppercase;
    pointer-events: none;
    z-index: 2;
    white-space: nowrap;
    opacity: 0;
    animation: deskFadeIn 0.6s 1.5s ease both;
  }

  /* ── Windows layer ── */
  .sgdesk-windows {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }
  .sgdesk-windows > * {
    pointer-events: all;
  }

  /* ── Menu bar ── */
  .sgdesk-menubar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    z-index: 9500;
    pointer-events: none;
  }
  .sgdesk-menubar-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sgdesk-menubar-logo {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: 0.75em;
    font-weight: 800;
    color: rgba(255,255,255,0.85);
    letter-spacing: 1px;
    pointer-events: all;
  }
  .sgdesk-menubar-right {
    font-family: 'JetBrains Mono','Courier New',monospace;
    font-size: 0.68em;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.5px;
  }

  /* ── Fade in for entire desktop ── */
  .sgdesk-visible {
    opacity: 1;
    transition: opacity 0.6s ease;
  }
  .sgdesk-hidden {
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: 767px) {
    .sgdesk-menubar { height: 24px; }
  }
`;

let stylesInjected = false;
function injectDesktopStyles() {
  if (stylesInjected || document.getElementById("sgdesk-styles")) return;
  const el = document.createElement("style");
  el.id = "sgdesk-styles";
  el.textContent = desktopStyles;
  document.head.appendChild(el);
  stylesInjected = true;
}

/* ─── Live clock ─── */
function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 10000);
    return () => clearInterval(t);
  }, []);
  return <>{time}</>;
}

/* ─── Desktop ─── */
function Desktop({ visible }) {
  injectDesktopStyles();

  const [openWindows, setOpenWindows]   = useState(["home"]);
  const [activeWindow, setActiveWindow] = useState("home");
  const [windowOrder, setWindowOrder]   = useState(["home"]);
  const [mountCount, setMountCount]     = useState({ home: 1 });

  const openApp = useCallback((id) => {
    setOpenWindows(prev => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
    setMountCount(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setActiveWindow(id);
    setWindowOrder(prev => [...prev.filter(w => w !== id), id]);
  }, []);

  const closeApp = useCallback((id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setWindowOrder(prev => {
      const next = prev.filter(w => w !== id);
      setActiveWindow(next[next.length - 1] || null);
      return next;
    });
  }, []);

  const focusApp = useCallback((id) => {
    if (activeWindow === id) return;
    setActiveWindow(id);
    setWindowOrder(prev => [...prev.filter(w => w !== id), id]);
  }, [activeWindow]);

  const getWindowOffset = (id) => {
    const idx = windowOrder.indexOf(id);
    const offset = (idx % 5) * CASCADE_OFFSET;
    return { x: offset, y: offset };
  };

  return (
    <div className={`sgdesk ${visible ? "sgdesk-visible" : "sgdesk-hidden"}`}>
      {/* Background */}
      <div className="sgdesk-bg" />
      <div className="sgdesk-rays" />
      <div className="sgdesk-vignette" />

      {/* macOS-style menu bar */}
      <div className="sgdesk-menubar">
        <div className="sgdesk-menubar-left">
          <span className="sgdesk-menubar-logo">✦ SG.OS</span>
        </div>
        <div className="sgdesk-menubar-right">
          <Clock />
        </div>
      </div>

      {/* Hint text */}
      {openWindows.length === 0 && (
        <p className="sgdesk-hint">tap a section from the dock below ↓</p>
      )}

      {/* Windows layer */}
      <div className="sgdesk-windows">
        <AnimatePresence>
          {windowOrder.map((id) =>
            openWindows.includes(id) ? (
              <SGWindow
                key={`${id}-${mountCount[id] || 1}`}
                id={id}
                title={APPS[id].title}
                isActive={activeWindow === id}
                zIndex={windowOrder.indexOf(id) * 10 + 100}
                onClose={() => closeApp(id)}
                onFocus={() => focusApp(id)}
                initialOffset={getWindowOffset(id)}
              >
                {WINDOW_CONTENT[id]}
              </SGWindow>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock
        apps={APPS}
        openWindows={openWindows}
        activeWindow={activeWindow}
        onOpen={openApp}
      />
    </div>
  );
}

export default Desktop;
