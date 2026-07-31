import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ═══════════════════════════════════
     CARD BASE
  ═══════════════════════════════════ */
  .creative-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.015);
    border: 1px solid rgba(0, 243, 255, 0.12);
    transition:
      transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      border-color 0.35s ease,
      box-shadow 0.4s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 380px;
  }

  .creative-card:hover {
    transform: translateY(-6px) scale(1.015);
    border-color: rgba(0, 243, 255, 0.4);
    box-shadow:
      0 16px 40px rgba(0, 243, 255, 0.14),
      0 6px 20px rgba(0,0,0,0.4),
      inset 0 0 28px rgba(0, 243, 255, 0.025);
  }

  .creative-image-wrapper {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background: #04040c;
  }

  .creative-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease;
  }

  .creative-card:hover .creative-image {
    transform: scale(1.06);
    filter: brightness(0.7);
  }

  .cc-num {
    position: absolute;
    top: 14px;
    left: 16px;
    font-family: 'Syne', sans-serif;
    font-size: 0.75em;
    font-weight: 800;
    color: rgba(255,255,255,0.5);
    background: rgba(0,0,0,0.6);
    padding: 2px 8px;
    border-radius: 6px;
    backdrop-filter: blur(8px);
    z-index: 2;
  }

  .cc-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0, 243, 255, 0.15) 0%, rgba(4, 4, 12, 0.6) 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  .creative-card:hover .cc-overlay { opacity: 1; }

  .cc-overlay-pill {
    font-family: 'Outfit', sans-serif;
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #fff;
    background: rgba(0, 243, 255, 0.2);
    border: 1px solid rgba(0, 243, 255, 0.5);
    padding: 8px 20px;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    transform: translateY(10px);
    transition: transform 0.35s ease;
  }
  .creative-card:hover .cc-overlay-pill { transform: translateY(0); }

  .creative-content {
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .creative-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.25em;
    font-weight: 800;
    color: #fff;
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .creative-description {
    font-family: 'Outfit', sans-serif;
    font-size: 0.88em;
    line-height: 1.6;
    color: rgba(255,255,255,0.6);
    margin: 0 0 16px;
    flex: 1;
  }

  .cc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }
  .cc-tag-pill {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #00f3ff;
    background: rgba(0, 243, 255, 0.08);
    border: 1px solid rgba(0, 243, 255, 0.22);
    padding: 3px 10px;
    border-radius: 12px;
  }

  .cc-read-more {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em;
    font-weight: 700;
    color: #00f3ff;
    margin-top: auto;
  }

  /* ═══════════════════════════════════
     FULL-VIEWPORT PORTAL LIGHTBOX MODAL
  ═══════════════════════════════════ */
  .cc-modal-backdrop {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999999 !important;
    background: rgba(2, 0, 8, 0.92) !important;
    backdrop-filter: blur(18px) !important;
    -webkit-backdrop-filter: blur(18px) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 16px 16px 80px 16px !important;
    animation: ccFadeIn 0.2s ease;
    box-sizing: border-box !important;
  }

  @keyframes ccFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .cc-modal {
    position: relative !important;
    width: min(740px, 94vw) !important;
    max-height: min(720px, 78vh) !important;
    background: #080214 !important;
    border: 1px solid rgba(0, 243, 255, 0.5) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    box-shadow: 0 30px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 243, 255, 0.3) !important;
    animation: ccModalIn 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes ccModalIn {
    from { opacity: 0; transform: scale(0.92) translateY(14px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .cc-modal-top-bar {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 12px 18px !important;
    background: rgba(12, 5, 30, 0.98) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    flex-shrink: 0 !important;
    z-index: 10 !important;
  }

  .cc-modal-back-btn {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.85em !important;
    font-weight: 700 !important;
    color: #fff !important;
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.35), rgba(147, 51, 234, 0.5)) !important;
    border: 1px solid rgba(0, 243, 255, 0.65) !important;
    padding: 8px 18px !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    box-shadow: 0 0 16px rgba(0, 243, 255, 0.3) !important;
    pointer-events: all !important;
    user-select: none !important;
  }
  .cc-modal-back-btn:hover, .cc-modal-back-btn:active {
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.55), rgba(147, 51, 234, 0.7)) !important;
    color: #fff !important;
  }

  .cc-modal-close-icon {
    width: 34px !important;
    height: 34px !important;
    border-radius: 50% !important;
    background: rgba(255,255,255,0.1) !important;
    border: 1px solid rgba(255,255,255,0.25) !important;
    color: #fff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    font-size: 0.95em !important;
    transition: all 0.2s ease !important;
  }
  .cc-modal-close-icon:hover, .cc-modal-close-icon:active {
    background: rgba(255,0,127,0.35) !important;
    border-color: #ff007f !important;
  }

  .cc-modal-scroll-area {
    flex: 1 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }

  .cc-modal-img-container {
    width: 100% !important;
    max-height: 360px !important;
    overflow: hidden !important;
    background: #04040c !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  }

  .cc-modal-img {
    width: 100% !important;
    max-height: 360px !important;
    object-fit: contain !important;
    display: block !important;
  }

  .cc-modal-body {
    padding: 22px 26px 26px !important;
  }

  .cc-modal-title {
    font-family: 'Syne', sans-serif !important;
    font-size: 1.45em !important;
    font-weight: 800 !important;
    color: #fff !important;
    margin: 0 0 10px 0 !important;
  }

  .cc-modal-desc {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.94em !important;
    line-height: 1.65 !important;
    color: rgba(255,255,255,0.76) !important;
    margin: 0 0 16px 0 !important;
  }

  .cc-modal-footer {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 12px 20px !important;
    background: rgba(12, 5, 30, 0.98) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
    flex-shrink: 0 !important;
    z-index: 10 !important;
  }

  .cc-modal-close-btn {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.85em !important;
    font-weight: 700 !important;
    color: rgba(255,255,255,0.95) !important;
    background: rgba(255,255,255,0.12) !important;
    border: 1px solid rgba(255,255,255,0.25) !important;
    padding: 8px 22px !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
  }
  .cc-modal-close-btn:hover, .cc-modal-close-btn:active {
    background: rgba(255,255,255,0.25) !important;
    color: #fff !important;
  }

  @media (max-width: 767px) {
    .cc-modal-backdrop { padding: 10px 10px 80px 10px !important; }
    .cc-modal { width: 94vw !important; max-height: 72vh !important; border-radius: 16px !important; }
    .cc-modal-body { padding: 16px 16px 20px !important; }
    .cc-modal-top-bar { padding: 10px 14px !important; }
    .cc-modal-back-btn { font-size: 0.78em !important; padding: 6px 14px !important; }
    .cc-modal-img-container { max-height: 260px !important; }
    .cc-modal-img { max-height: 260px !important; }
  }
`;

function CreativeCard({ title, cardDesc, modalDesc, images, index, tags, wide }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <style>{cardStyles}</style>

      {/* ── CARD ── */}
      <div
        className={`creative-card${wide ? " spotlight-card" : ""}`}
        onClick={() => setOpen(true)}
      >
        <div className="cc-shimmer" />

        {/* Image Section */}
        <div className={`creative-image-wrapper${wide ? " spotlight-img" : ""}`}>
          <span className="cc-num">{num}</span>
          <img
            src={images[0]}
            alt={title}
            className="creative-image"
            loading="lazy"
          />
          <div className="cc-overlay">
            <span className="cc-overlay-pill">Explore Creative</span>
          </div>
        </div>

        {/* Content Section */}
        <div className={`creative-content${wide ? " spotlight-content" : ""}`}>
          <h3 className="creative-title">{title}</h3>
          <p className="creative-description">{cardDesc}</p>

          {tags && tags.length > 0 && (
            <div className="cc-tags">
              {tags.map((t, idx) => (
                <span key={idx} className="cc-tag-pill">{t}</span>
              ))}
            </div>
          )}

          <span className="cc-read-more">View Insight ↗</span>
        </div>
      </div>

      {/* ── LIGHTBOX PORTAL MODAL ── */}
      {open &&
        ReactDOM.createPortal(
          <div className="cc-modal-backdrop" onClick={handleClose}>
            <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
              {/* Top Bar */}
              <div className="cc-modal-top-bar">
                <button
                  className="cc-modal-back-btn"
                  onClick={handleClose}
                  onPointerDown={handleClose}
                  onTouchEnd={handleClose}
                >
                  ← Back to Creative Lab
                </button>
                <button
                  className="cc-modal-close-icon"
                  onClick={handleClose}
                  onPointerDown={handleClose}
                  onTouchEnd={handleClose}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Area */}
              <div className="cc-modal-scroll-area">
                <div className="cc-modal-img-container">
                  <img
                    src={images[0]}
                    alt={title}
                    className="cc-modal-img"
                    loading="lazy"
                  />
                </div>

                <div className="cc-modal-body">
                  <h2 className="cc-modal-title">{title}</h2>
                  <p className="cc-modal-desc">{modalDesc}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="cc-modal-footer">
                <span style={{ fontSize: "0.78em", color: "rgba(255,255,255,0.45)", fontFamily: "Outfit", fontWeight: 700 }}>
                  FRAME {num}
                </span>
                <button
                  className="cc-modal-close-btn"
                  onClick={handleClose}
                  onPointerDown={handleClose}
                  onTouchEnd={handleClose}
                >
                  Close Insight
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default CreativeCard;
