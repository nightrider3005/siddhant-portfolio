import React from "react";

const dockStyles = `
  /* ── Out-Of-The-Box Cyber Glass Dock ── */
  .sgdock-wrap {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9900;
  }

  .sgdock-inner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(8, 2, 22, 0.82);
    border: 1px solid rgba(160, 50, 210, 0.35);
    border-radius: 28px;
    backdrop-filter: blur(28px) saturate(200%);
    -webkit-backdrop-filter: blur(28px) saturate(200%);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 0 30px rgba(147, 51, 234, 0.25);
    position: relative;
  }

  /* ── Each Dock Item ── */
  .sgdock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px 6px;
    position: relative;
    border-radius: 16px;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sgdock-item:hover {
    transform: translateY(-8px) scale(1.15);
  }
  .sgdock-item:active {
    transform: translateY(-4px) scale(1.05);
  }

  /* ── Icon Capsule ── */
  .sgdock-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.45em;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.25s ease;
    position: relative;
  }
  .sgdock-item:hover .sgdock-icon {
    background: rgba(147, 51, 234, 0.25);
    border-color: rgba(0, 243, 255, 0.5);
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.35);
  }
  .sgdock-item.open .sgdock-icon {
    background: rgba(147, 51, 234, 0.2);
    border-color: rgba(192, 132, 252, 0.45);
  }
  .sgdock-item.active .sgdock-icon {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.45), rgba(0, 243, 255, 0.3));
    border-color: #00f3ff;
    box-shadow:
      0 0 25px rgba(0, 243, 255, 0.5),
      inset 0 0 12px rgba(255, 255, 255, 0.2);
  }

  /* ── Label ── */
  .sgdock-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.62em;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0.3px;
    pointer-events: none;
    transition: color 0.25s;
  }
  .sgdock-item.active .sgdock-label {
    color: #00f3ff;
    font-weight: 700;
  }

  /* ── Glowing Active Indicator ── */
  .sgdock-dot {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00f3ff;
    box-shadow: 0 0 8px #00f3ff, 0 0 14px #00f3ff;
  }

  /* ── Divider Separator ── */
  .sgdock-sep {
    width: 1px;
    height: 36px;
    background: linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent);
    margin: 0 2px;
    flex-shrink: 0;
  }

  /* ── Tooltip ── */
  .sgdock-item:hover .sgdock-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-6px);
  }
  .sgdock-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(2px);
    background: rgba(5, 0, 18, 0.92);
    border: 1px solid rgba(0, 243, 255, 0.35);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    backdrop-filter: blur(10px);
    letter-spacing: 0.5px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
  }

  /* ── Mobile Layout Polish ── */
  @media (max-width: 600px) {
    .sgdock-wrap { bottom: 10px; }
    .sgdock-inner { gap: 4px; padding: 6px 8px; border-radius: 22px; }
    .sgdock-item { padding: 2px 4px; }
    .sgdock-icon  { width: 42px; height: 42px; border-radius: 12px; font-size: 1.25em; }
    .sgdock-label { display: none; }
    .sgdock-tooltip { display: none; }
    .sgdock-sep { height: 28px; margin: 0 1px; }
    .sgdock-dot { bottom: -5px; width: 4px; height: 4px; }
  }
`;

let dockStylesInjected = false;

function Dock({ apps, openWindows, activeWindow, onOpen }) {
  if (!dockStylesInjected) {
    if (!document.getElementById("sgdock-styles")) {
      const el = document.createElement("style");
      el.id = "sgdock-styles";
      el.textContent = dockStyles;
      document.head.appendChild(el);
      dockStylesInjected = true;
    }
  }

  return (
    <div className="sgdock-wrap">
      <div className="sgdock-inner">
        {Object.entries(apps).map(([id, app], idx) => {
          const isOpen   = openWindows.includes(id);
          const isActive = activeWindow === id;
          return (
            <React.Fragment key={id}>
              {idx === Object.keys(apps).length - 1 && (
                <div className="sgdock-sep" />
              )}
              <button
                className={`sgdock-item${isOpen ? " open" : ""}${isActive ? " active" : ""}`}
                onClick={() => onOpen(id)}
                aria-label={`Open ${app.label}`}
              >
                <div className="sgdock-tooltip">{app.label}</div>
                <div className="sgdock-icon">{app.icon}</div>
                <span className="sgdock-label">{app.shortLabel}</span>
                {isOpen && <div className="sgdock-dot" />}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Dock;
