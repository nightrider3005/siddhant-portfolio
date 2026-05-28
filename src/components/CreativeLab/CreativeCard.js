import React, { useState, useEffect } from "react";

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

  /* ═══════════════════════════════════
     SPOTLIGHT CARD — Horizontal Magazine Layout
  ═══════════════════════════════════ */
  .creative-card.spotlight-card {
    display: grid;
    grid-template-columns: 55% 45%;
    grid-template-rows: 1fr;
    height: 380px;
    min-height: 380px;
    flex-direction: unset;
  }

  .creative-card.spotlight-card:hover {
    transform: translateY(-4px) scale(1.008);
  }

  @media (max-width: 767px) {
    .creative-card.spotlight-card {
      grid-template-columns: 1fr;
      grid-template-rows: 220px auto;
      height: auto;
      min-height: unset;
    }
  }

  /* ─── IMAGE WRAPPER — REGULAR CARDS (4:3) ─── */
  .creative-image-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 4 / 3;
    max-height: 240px;
    background: rgba(255,255,255,0.01);
    flex-shrink: 0;
  }

  /* ─── IMAGE WRAPPER — SPOTLIGHT CARDS ─── */
  .creative-image-wrapper.spotlight-img {
    aspect-ratio: unset;
    height: 100%;
    min-height: 380px;
    max-height: 380px;
    width: 100%;
  }

  @media (max-width: 767px) {
    .creative-image-wrapper.spotlight-img {
      height: 220px;
      min-height: 220px;
      max-height: 220px;
    }
  }

  .creative-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease;
    filter: brightness(0.85) saturate(1.05);
  }

  .creative-card:hover .creative-image {
    transform: scale(1.05);
    filter: brightness(0.68) saturate(1.1);
  }

  /* Bottom fade — only on regular cards (not spotlight which has side-by-side layout) */
  .creative-image-wrapper:not(.spotlight-img)::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40px;
    background: linear-gradient(transparent, rgba(6,6,17,0.96));
    pointer-events: none;
  }

  /* ─── HOVER OVERLAY ─── */
  .cc-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.12), rgba(255, 0, 127, 0.12));
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .creative-card:hover .cc-overlay { opacity: 1; }

  .cc-overlay-pill {
    font-family: 'Outfit', sans-serif;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.45);
    padding: 8px 18px;
    border-radius: 30px;
    backdrop-filter: blur(4px);
    transform: translateY(8px) scale(0.95);
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cc-overlay-pill::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #ff007f;
    box-shadow: 0 0 8px rgba(255, 0, 127, 0.9);
    display: inline-block;
  }

  .creative-card:hover .cc-overlay-pill {
    transform: translateY(0) scale(1);
  }

  /* ─── ACCENT GLOW NUMBER BADGE ─── */
  .cc-num {
    position: absolute;
    top: 14px; right: 14px;
    font-family: 'Outfit', monospace;
    font-size: 0.65em;
    font-weight: 800;
    letter-spacing: 1px;
    color: #ff007f;
    background: rgba(255, 0, 127, 0.12);
    border: 1px solid rgba(255, 0, 127, 0.3);
    padding: 3px 10px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    z-index: 3;
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .creative-card:hover .cc-num {
    background: rgba(255, 0, 127, 0.22);
    border-color: rgba(255, 0, 127, 0.8);
    box-shadow:
      0 0 14px rgba(255, 0, 127, 0.65),
      0 0 4px rgba(255, 0, 127, 0.4);
    color: #fff;
    text-shadow: 0 0 4px rgba(255,255,255,0.6);
  }

  /* ─── SHIMMER SWEEP ─── */
  .cc-shimmer {
    position: absolute;
    top: -100%; left: -100%;
    width: 50%; height: 300%;
    background: linear-gradient(105deg, transparent, rgba(0, 243, 255, 0.06), transparent);
    transform: rotate(18deg);
    pointer-events: none;
    z-index: 1;
    transition: left 0.75s cubic-bezier(0.25, 1, 0.5, 1), top 0.75s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .creative-card:hover .cc-shimmer { left: 160%; top: 60%; }

  /* ═══════════════════════════════════
     CARD BODY — REGULAR
  ═══════════════════════════════════ */
  .creative-content {
    padding: 20px 22px 22px;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 160px;
  }

  /* Top shine line */
  .creative-content::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .creative-card:hover .creative-content::before { opacity: 1; }

  /* ═══════════════════════════════════
     CARD BODY — SPOTLIGHT VARIANT
  ═══════════════════════════════════ */
  .creative-content.spotlight-content {
    padding: 36px;
    background: linear-gradient(135deg, rgba(0,243,255,0.04), rgba(255,0,127,0.02));
    border-left: 1px solid rgba(0, 243, 255, 0.12);
    justify-content: center;
    min-height: unset;
  }

  .creative-content.spotlight-content::before {
    display: none;
  }

  .creative-content.spotlight-content .creative-title {
    font-size: 1.8em !important;
    margin-bottom: 10px !important;
    line-height: 1.2 !important;
  }

  .creative-content.spotlight-content .creative-description {
    -webkit-line-clamp: unset !important;
    overflow: visible !important;
    display: block !important;
    font-size: 0.88em !important;
    line-height: 1.65 !important;
    color: rgba(255,255,255,0.55) !important;
  }

  /* ─── TITLE ─── */
  .creative-title {
    font-family: 'Syne', sans-serif !important;
    font-size: 1.1em !important;
    font-weight: 700 !important;
    color: #fff !important;
    margin: 0 !important;
    letter-spacing: -0.2px;
    transition: color 0.3s ease;
  }

  .creative-card:hover .creative-title { color: #00f3ff !important; }

  /* ─── DESCRIPTION — Regular: clamp to 3 lines ─── */
  .creative-description {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.84em !important;
    line-height: 1.55 !important;
    color: rgba(255,255,255,0.45) !important;
    margin: 0 !important;
    transition: color 0.3s ease;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;
  }

  .creative-card:hover .creative-description { color: rgba(255,255,255,0.7) !important; }

  /* ─── READ MORE CTA ─── */
  .cc-read-more {
    font-family: 'Outfit', sans-serif;
    font-size: 0.7em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255, 0, 127, 0.5);
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 10px;
    flex-shrink: 0;
    transition: all 0.3s ease;
    align-self: flex-start;
  }

  .cc-read-more::after {
    content: '→';
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .creative-card:hover .cc-read-more {
    color: #ff007f;
  }

  .creative-card:hover .cc-read-more::after {
    transform: translateX(4px);
  }

  /* ─── TAGS ─── */
  .cc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: auto;
    padding-top: 10px;
    flex-shrink: 0;
  }

  .cc-tag-pill {
    font-family: 'Outfit', sans-serif;
    font-size: 0.58em;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.38);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 3px 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .creative-card:hover .cc-tag-pill {
    color: rgba(0, 243, 255, 0.85);
    border-color: rgba(0, 243, 255, 0.2);
    background: rgba(0, 243, 255, 0.04);
  }

  /* ═══════════════════════════════════
     MODAL LIGHTBOX
  ═══════════════════════════════════ */
  .cc-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(4,4,14,0.93);
    backdrop-filter: blur(18px);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: backdropIn 0.3s ease both;
  }

  @keyframes backdropIn {
    from{opacity:0} to{opacity:1}
  }

  .cc-modal {
    position: relative;
    background: #070714;
    border: 1px solid rgba(0, 243, 255, 0.25);
    border-radius: 24px;
    max-width: 820px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow:
      0 40px 100px rgba(0, 243, 255, 0.15),
      0 0 0 1px rgba(0, 243, 255, 0.06);
    animation: modalIn 0.4s cubic-bezier(0.25, 1, 0.3, 1) both;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 243, 255, 0.3) transparent;
  }

  @keyframes modalIn {
    from{opacity:0; transform:scale(0.94) translateY(18px)}
    to{opacity:1; transform:scale(1) translateY(0)}
  }

  .cc-modal-img-container {
    width: 100%;
    max-height: 420px;
    overflow: hidden;
    background: #04040c;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px 24px 0 0;
  }

  .cc-modal-img {
    width: 100%;
    max-height: 420px;
    object-fit: contain;
    object-position: center;
    display: block;
    background: #04040c;
  }

  .cc-modal-body {
    padding: 32px 36px 36px;
  }

  .cc-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .cc-modal-title {
    font-family: 'Syne', sans-serif !important;
    font-size: 1.65em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -0.5px;
    margin: 0 !important;
    line-height: 1.25 !important;
  }

  .cc-modal-close {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255, 0, 127, 0.15);
    color: rgba(255,255,255,0.6);
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .cc-modal-close:hover {
    background: rgba(255, 0, 127, 0.12);
    border-color: rgba(255, 0, 127, 0.45);
    color: #fff;
    transform: rotate(90deg);
  }

  .cc-modal-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 243, 255, 0.4), rgba(255, 0, 127, 0.1), transparent);
    margin-bottom: 20px;
  }

  .cc-modal-desc {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.96em !important;
    line-height: 1.7 !important;
    color: rgba(255,255,255,0.68) !important;
    margin: 0 0 24px 0 !important;
  }

  .cc-modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .cc-modal-tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #ff007f;
    background: rgba(255, 0, 127, 0.06);
    border: 1px solid rgba(255, 0, 127, 0.18);
    padding: 5px 12px;
    border-radius: 20px;
  }

  .cc-modal-tag-pill::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #ff007f;
    box-shadow: 0 0 6px rgba(255, 0, 127, 0.8);
  }

  .cc-modal-index-badge {
    display: inline-flex;
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 5px 12px;
    border-radius: 20px;
  }

  /* ─── MOBILE MODAL FIXES ─── */
  @media (max-width: 767px) {
    .cc-modal-backdrop {
      padding: 0 !important;
    }
    .cc-modal {
      width: 100% !important;
      max-width: 100% !important;
      height: 100% !important;
      max-height: 100vh !important;
      border-radius: 0 !important;
      border: none !important;
      display: flex;
      flex-direction: column;
    }
    .cc-modal-img-container {
      max-height: 280px !important;
      border-radius: 0 !important;
      flex-shrink: 0;
    }
    .cc-modal-img {
      max-height: 280px !important;
    }
    .cc-modal-body {
      padding: 24px 20px 48px !important;
      flex: 1;
      overflow-y: auto;
    }
    .cc-modal-close {
      position: absolute !important;
      top: 16px !important;
      right: 16px !important;
      background: rgba(7,7,18,0.85) !important;
      border-color: rgba(255,255,255,0.15) !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6) !important;
      z-index: 100;
    }
  }
`;

function CreativeCard({ title, cardDesc, modalDesc, images, index, tags, wide }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  // Disable scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Handle ESC key press
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

          <span className="cc-read-more">View Insight</span>
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {open && (
        <div className="cc-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cc-modal-img-container">
              <img
                src={images[0]}
                alt={title}
                className="cc-modal-img"
                loading="lazy"
              />
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-header">
                <h2 className="cc-modal-title">{title}</h2>
                <button
                  className="cc-modal-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close Lightbox"
                >
                  ✕
                </button>
              </div>

              <div className="cc-modal-divider" />

              <p className="cc-modal-desc">{modalDesc}</p>

              <div className="cc-modal-tags">
                <span className="cc-modal-index-badge">Frame {num}</span>
                {tags && tags.map((t, idx) => (
                  <span key={idx} className="cc-modal-tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreativeCard;
