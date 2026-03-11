import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ── PROJECT CARD ── */
  .pg-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(198,120,221,0.15);
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.4s ease,
                border-color 0.4s ease;
    animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) both;
    height: 100%;
  }

  .pg-card:nth-child(1){animation-delay:0.1s}
  .pg-card:nth-child(2){animation-delay:0.25s}
  .pg-card:nth-child(3){animation-delay:0.4s}

  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pg-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(198,120,221,0.5);
    box-shadow:
      0 20px 60px rgba(198,120,221,0.15),
      0 8px 20px rgba(0,0,0,0.4),
      inset 0 0 30px rgba(198,120,221,0.03);
  }

  /* Image container */
  .pg-card-img-wrap {
    position: relative;
    overflow: hidden;
    height: 200px;
  }

  .pg-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    filter: brightness(0.85) saturate(1.1);
  }
  .pg-card:hover .pg-card-img-wrap img {
    transform: scale(1.08);
    filter: brightness(0.6) saturate(1.2);
  }

  /* Overlay on hover */
  .pg-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(198,120,221,0.25) 0%,
      rgba(10,10,30,0.6) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pg-card:hover .pg-img-overlay { opacity: 1; }

  .pg-overlay-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85em;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.5);
    padding: 8px 20px;
    border-radius: 30px;
    backdrop-filter: blur(4px);
    transform: translateY(8px);
    transition: transform 0.35s ease;
  }
  .pg-card:hover .pg-overlay-text { transform: translateY(0); }

  /* Bottom gradient fade */
  .pg-card-img-wrap::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60px;
    background: linear-gradient(transparent, rgba(10,10,25,0.95));
    pointer-events: none;
  }

  /* Number badge */
  .pg-badge {
    position: absolute;
    top: 14px; left: 14px;
    font-family: 'Outfit', monospace;
    font-size: 0.68em;
    font-weight: 800;
    letter-spacing: 1px;
    color: #c678dd;
    background: rgba(198,120,221,0.12);
    border: 1px solid rgba(198,120,221,0.3);
    padding: 3px 10px;
    border-radius: 20px;
    z-index: 2;
    backdrop-filter: blur(4px);
  }

  /* Card body */
  .pg-card-body {
    padding: 20px 22px 24px;
    position: relative;
  }

  /* Shimmer line */
  .pg-card-body::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.5), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .pg-card:hover .pg-card-body::before { opacity: 1; }

  .pg-card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.18em;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
  }

  .pg-card-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 0.88em;
    line-height: 1.7;
    color: rgba(255,255,255,0.62);
    text-align: center;
    margin: 0;
    transition: color 0.3s ease;
  }
  .pg-card:hover .pg-card-desc { color: rgba(255,255,255,0.82); }

  /* Tags row */
  .pg-tags {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 14px;
    flex-wrap: wrap;
  }
  .pg-tag {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #c678dd;
    background: rgba(198,120,221,0.1);
    border: 1px solid rgba(198,120,221,0.25);
    padding: 2px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  .pg-card:hover .pg-tag {
    background: rgba(198,120,221,0.18);
    border-color: rgba(198,120,221,0.45);
  }

  /* ── MODAL ── */
  .pg-modal .modal-content {
    background: #0b0b1e !important;
    border: 1px solid rgba(198,120,221,0.25) !important;
    border-radius: 20px !important;
    box-shadow: 0 30px 80px rgba(198,120,221,0.15), 0 0 0 1px rgba(198,120,221,0.1) !important;
    overflow: hidden;
  }

  .pg-modal .modal-header {
    background: linear-gradient(135deg, rgba(198,120,221,0.1), rgba(198,120,221,0.03));
    border-bottom: 1px solid rgba(198,120,221,0.15) !important;
    padding: 22px 28px;
  }

  .pg-modal .modal-title {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1.4em !important;
    font-weight: 700 !important;
    color: #fff !important;
    letter-spacing: -0.3px;
  }

  .pg-modal .modal-header .btn-close {
    filter: invert(1) !important;
    opacity: 0.6 !important;
    transition: opacity 0.2s ease !important;
  }
  .pg-modal .modal-header .btn-close:hover { opacity: 1 !important; }

  .pg-modal .modal-body {
    padding: 28px 32px !important;
    color: rgba(255,255,255,0.8) !important;
    font-family: 'Outfit', sans-serif !important;
    line-height: 1.75 !important;
  }

  .pg-modal .modal-body h5 {
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.8em !important;
    font-weight: 700 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    color: #c678dd !important;
    margin-top: 22px !important;
    margin-bottom: 8px !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pg-modal .modal-body h5::before {
    content: '';
    display: inline-block;
    width: 16px; height: 1px;
    background: #c678dd;
    box-shadow: 0 0 6px rgba(198,120,221,0.6);
  }

  .pg-modal .modal-body p {
    font-size: 0.93em !important;
    color: rgba(255,255,255,0.72) !important;
    margin-bottom: 4px !important;
  }

  .pg-modal .modal-footer {
    border-top: 1px solid rgba(198,120,221,0.15) !important;
    padding: 16px 28px !important;
    background: rgba(198,120,221,0.03);
  }

  .pg-demo-btn {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 600 !important;
    font-size: 0.9em !important;
    letter-spacing: 0.5px !important;
    padding: 9px 26px !important;
    border-radius: 30px !important;
    background: linear-gradient(135deg, #c678dd, #9a4db5) !important;
    border: none !important;
    color: #fff !important;
    box-shadow: 0 4px 20px rgba(198,120,221,0.35) !important;
    transition: all 0.3s ease !important;
  }
  .pg-demo-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 28px rgba(198,120,221,0.5) !important;
  }

  .pg-modal-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 1px solid rgba(198,120,221,0.2);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
`;

function ProjectCard({
  imgPath,
  title,
  shortDescription,
  fullDescription,
  demoLink,
  tags,
  badge,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <style>{cardStyles}</style>

      <div className="pg-card" onClick={() => setShow(true)}>
        <div className="pg-card-img-wrap">
          {badge && <span className="pg-badge">{badge}</span>}
          <img src={imgPath} alt={title} />
          <div className="pg-img-overlay">
            <span className="pg-overlay-text">View Details</span>
          </div>
        </div>
        <div className="pg-card-body">
          <div className="pg-card-title">{title}</div>
          <p className="pg-card-desc">{shortDescription}</p>
          {tags && (
            <div className="pg-tags">
              {tags.map((t, i) => (
                <span key={i} className="pg-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        className="pg-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imgPath} alt={title} className="pg-modal-img" />
          {fullDescription}
        </Modal.Body>
        {demoLink && (
          <Modal.Footer>
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn pg-demo-btn"
            >
              🔗 Live Demo
            </a>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default ProjectCard;
