import React, { useState } from "react";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ═══════════════════════════════════
     CARD
  ═══════════════════════════════════ */
  .creative-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(198,120,221,0.12);
    transition:
      transform 0.45s cubic-bezier(0.22,1,0.36,1),
      border-color 0.35s ease,
      box-shadow 0.45s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    animation: ccReveal 0.75s cubic-bezier(0.22,1,0.36,1) both;
  }
  .creative-card:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: rgba(198,120,221,0.45);
    box-shadow:
      0 24px 64px rgba(198,120,221,0.15),
      0 8px 24px rgba(0,0,0,0.5),
      inset 0 0 40px rgba(198,120,221,0.03);
  }
  @keyframes ccReveal {
    from { opacity:0; transform:translateY(40px) scale(0.96); }
    to   { opacity:1; transform:translateY(0)    scale(1); }
  }

  /* ─── IMAGE WRAPPER ─── */
  .creative-image-wrapper {
    position: relative;
    overflow: hidden;
    height: 240px;
    flex-shrink: 0;
  }
  .creative-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    filter: brightness(0.88) saturate(1.1);
  }
  .creative-card:hover .creative-image {
    transform: scale(1.08);
    filter: brightness(0.6) saturate(1.2);
  }

  /* Bottom fade */
  .creative-image-wrapper::after {
    content: '';
    position: absolute;
    bottom:0; left:0; right:0;
    height: 70px;
    background: linear-gradient(transparent, rgba(7,7,17,0.97));
    pointer-events: none;
  }

  /* ─── HOVER OVERLAY ─── */
  .cc-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(198,120,221,0.2), rgba(7,7,17,0.7));
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
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.55);
    padding: 9px 22px;
    border-radius: 30px;
    backdrop-filter: blur(6px);
    transform: translateY(10px) scale(0.95);
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .cc-overlay-pill::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 8px rgba(198,120,221,0.9);
    display: inline-block;
  }
  .creative-card:hover .cc-overlay-pill {
    transform: translateY(0) scale(1);
  }

  /* ─── NUMBER BADGE ─── */
  .cc-num {
    position: absolute;
    top: 14px; right: 14px;
    font-family: 'Outfit', monospace;
    font-size: 0.65em;
    font-weight: 800;
    letter-spacing: 1px;
    color: #c678dd;
    background: rgba(198,120,221,0.1);
    border: 1px solid rgba(198,120,221,0.3);
    padding: 3px 10px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    z-index: 3;
    transition: all 0.3s ease;
  }
  .creative-card:hover .cc-num {
    background: rgba(198,120,221,0.2);
    border-color: rgba(198,120,221,0.6);
    box-shadow: 0 0 12px rgba(198,120,221,0.3);
  }

  /* ─── SHIMMER SWEEP ─── */
  .cc-shimmer {
    position: absolute;
    top: -80%; left: -80%;
    width: 40%; height: 260%;
    background: linear-gradient(105deg, transparent, rgba(198,120,221,0.05), transparent);
    transform: rotate(15deg);
    pointer-events: none;
    z-index: 1;
    transition: left 0.65s ease, top 0.65s ease;
  }
  .creative-card:hover .cc-shimmer { left: 150%; }

  /* ─── CARD BODY ─── */
  .creative-content {
    padding: 20px 22px 24px;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Top shine line */
  .creative-content::before {
    content: '';
    position: absolute;
    top: 0; left: 18%; right: 18%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.5), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .creative-card:hover .creative-content::before { opacity: 1; }

  .creative-title {
    font-family: 'Syne', sans-serif !important;
    font-size: 1.05em !important;
    font-weight: 700 !important;
    color: #fff !important;
    margin: 0 !important;
    letter-spacing: -0.2px;
    transition: color 0.3s ease;
  }
  .creative-card:hover .creative-title { color: rgba(255,255,255,0.95) !important; }

  .creative-description {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.84em !important;
    line-height: 1.7 !important;
    color: rgba(255,255,255,0.52) !important;
    margin: 0 !important;
    flex: 1;
    transition: color 0.3s ease;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .creative-card:hover .creative-description { color: rgba(255,255,255,0.75) !important; }

  /* Read more CTA */
  .cc-read-more {
    font-family: 'Outfit', sans-serif;
    font-size: 0.7em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.55);
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 4px;
    transition: all 0.3s ease;
  }
  .cc-read-more::after {
    content: '→';
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .creative-card:hover .cc-read-more {
    color: #c678dd;
  }
  .creative-card:hover .cc-read-more::after {
    transform: translateX(5px);
  }

  /* ═══════════════════════════════════
     MODAL LIGHTBOX
  ═══════════════════════════════════ */
  .cc-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(4,4,14,0.92);
    backdrop-filter: blur(16px);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: backdropIn 0.35s ease both;
  }
  @keyframes backdropIn {
    from{opacity:0} to{opacity:1}
  }

  .cc-modal {
    position: relative;
    background: #0d0d22;
    border: 1px solid rgba(198,120,221,0.25);
    border-radius: 24px;
    max-width: 780px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow:
      0 40px 100px rgba(198,120,221,0.15),
      0 0 0 1px rgba(198,120,221,0.08);
    animation: modalIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
    scrollbar-width: thin;
    scrollbar-color: rgba(198,120,221,0.3) transparent;
  }
  @keyframes modalIn {
    from{opacity:0; transform:scale(0.9) translateY(30px)}
    to{opacity:1; transform:scale(1) translateY(0)}
  }

  .cc-modal-img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    display: block;
  }

  .cc-modal-body {
    padding: 28px 32px 36px;
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
    font-size: 1.6em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -0.5px;
    margin: 0 !important;
    line-height: 1.2 !important;
  }

  .cc-modal-close {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(198,120,221,0.2);
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
    background: rgba(198,120,221,0.15);
    border-color: rgba(198,120,221,0.5);
    color: #fff;
    transform: rotate(90deg);
  }

  .cc-modal-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(198,120,221,0.4), transparent);
    margin-bottom: 20px;
    border-radius: 1px;
  }

  .cc-modal-desc {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1em !important;
    line-height: 1.8 !important;
    color: rgba(255,255,255,0.68) !important;
    margin: 0 !important;
  }

  .cc-modal-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c678dd;
    background: rgba(198,120,221,0.08);
    border: 1px solid rgba(198,120,221,0.25);
    padding: 4px 12px;
    border-radius: 20px;
    margin-top: 22px;
  }
  .cc-modal-tag::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 6px rgba(198,120,221,0.8);
  }
`;

function CreativeCard({ title, description, images, index }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <style>{cardStyles}</style>

      {/* ── CARD ── */}
      <div className="creative-card" onClick={() => setOpen(true)}>
        <div className="cc-shimmer" />
        <div className="creative-image-wrapper">
          <span className="cc-num">{num}</span>
          <img src={images[0]} alt={title} className="creative-image" />
          <div className="cc-overlay">
            <span className="cc-overlay-pill">View Work</span>
          </div>
        </div>
        <div className="creative-content">
          <h3 className="creative-title">{title}</h3>
          <p className="creative-description">{description}</p>
          <span className="cc-read-more">Explore</span>
        </div>
      </div>

      {/* ── MODAL ── */}
      {open && (
        <div className="cc-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <img src={images[0]} alt={title} className="cc-modal-img" />
            <div className="cc-modal-body">
              <div className="cc-modal-header">
                <h2 className="cc-modal-title">{title}</h2>
                <button
                  className="cc-modal-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="cc-modal-divider" />
              <p className="cc-modal-desc">{description}</p>
              <span className="cc-modal-tag">Visual Experiment · {num}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreativeCard;
