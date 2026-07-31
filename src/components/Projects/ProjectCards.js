import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  /* ── PROJECT CARD ── */
  .pg-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(160, 50, 210, 0.25);
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.35s ease,
                border-color 0.35s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .pg-card:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 243, 255, 0.55);
    box-shadow:
      0 20px 50px rgba(160, 40, 220, 0.25),
      0 6px 20px rgba(0,0,0,0.5);
  }

  .pg-card-img-wrap {
    position: relative;
    overflow: hidden;
    height: 190px;
    width: 100%;
  }

  .pg-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    filter: brightness(0.9) saturate(1.05);
  }
  .pg-card:hover .pg-card-img-wrap img {
    transform: scale(1.06);
    filter: brightness(0.65);
  }

  .pg-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(147, 51, 234, 0.35) 0%,
      rgba(5,0,15,0.7) 100%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pg-card:hover .pg-img-overlay { opacity: 1; }

  .pg-overlay-text {
    font-family: 'Outfit', sans-serif;
    font-size: 0.82em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.6);
    padding: 7px 18px;
    border-radius: 30px;
    backdrop-filter: blur(6px);
  }

  .pg-badge {
    position: absolute;
    top: 12px; left: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.68em;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #00f3ff;
    background: rgba(5, 0, 18, 0.85);
    border: 1px solid rgba(0, 243, 255, 0.4);
    padding: 3px 10px;
    border-radius: 20px;
    z-index: 2;
    backdrop-filter: blur(8px);
  }

  .pg-card-body {
    padding: 18px 20px 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .pg-card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.15em;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  .pg-card-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 0.86em;
    line-height: 1.6;
    color: rgba(255,255,255,0.65);
    margin-bottom: 14px;
    flex: 1;
  }

  .pg-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: auto;
  }
  .pg-tag {
    font-family: 'Outfit', sans-serif;
    font-size: 0.65em;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #c084fc;
    background: rgba(147, 51, 234, 0.15);
    border: 1px solid rgba(147, 51, 234, 0.35);
    padding: 2px 9px;
    border-radius: 12px;
    text-transform: uppercase;
  }

  /* ── MODAL TOP LAYER ── */
  .pg-modal {
    z-index: 999999 !important;
  }
  .modal-backdrop {
    z-index: 999998 !important;
    background-color: rgba(3, 0, 10, 0.88) !important;
    backdrop-filter: blur(14px) !important;
  }
  .pg-modal .modal-dialog {
    max-width: 820px;
    margin: 1.25rem auto 5rem auto;
  }
  @media (max-width: 767px) {
    .pg-modal .modal-dialog {
      margin: 10px auto 70px auto;
      max-width: 95vw;
    }
  }

  .pg-modal .modal-content {
    background: #080214 !important;
    border: 1px solid rgba(160, 50, 210, 0.45) !important;
    border-radius: 20px !important;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(147, 51, 234, 0.3) !important;
    overflow: hidden;
  }
  .pg-modal .modal-header {
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pg-modal-back-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85em;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.3), rgba(147, 51, 234, 0.4));
    border: 1px solid rgba(0, 243, 255, 0.6);
    padding: 7px 18px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 0 16px rgba(0, 243, 255, 0.25);
  }
  .pg-modal-back-btn:hover {
    background: linear-gradient(135deg, rgba(0, 243, 255, 0.5), rgba(147, 51, 234, 0.6));
    color: #fff;
  }
  .pg-modal .modal-title {
    font-family: 'Outfit', sans-serif !important;
    font-size: 1.35em !important;
    font-weight: 800 !important;
    color: #fff !important;
    margin: 0;
  }
  .pg-modal .modal-body {
    padding: 24px 30px !important;
    color: rgba(255,255,255,0.85) !important;
    font-family: 'Outfit', sans-serif !important;
    max-height: 72vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .pg-modal .modal-body h5 {
    color: #00f3ff !important;
    font-size: 0.82em !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 1.8px !important;
    margin-top: 20px !important;
    margin-bottom: 8px !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pg-modal .modal-body h5::before {
    content: '';
    display: inline-block;
    width: 12px; height: 2px;
    background: #00f3ff;
    border-radius: 2px;
  }
  .pg-modal .modal-body p {
    font-size: 0.94em !important;
    color: rgba(255,255,255,0.78) !important;
    line-height: 1.7 !important;
    margin-bottom: 12px !important;
  }
  .pg-modal .modal-footer {
    background: rgba(255, 255, 255, 0.02);
    border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding: 14px 24px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .pg-close-btn {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.85em !important;
    padding: 9px 22px !important;
    border-radius: 20px !important;
    background: rgba(255,255,255,0.08) !important;
    border: 1px solid rgba(255,255,255,0.2) !important;
    color: rgba(255,255,255,0.85) !important;
    cursor: pointer;
    transition: all 0.2s ease !important;
  }
  .pg-close-btn:hover {
    background: rgba(255,255,255,0.2) !important;
    color: #fff !important;
  }
  .pg-demo-btn {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.88em !important;
    padding: 9px 24px !important;
    border-radius: 20px !important;
    background: linear-gradient(135deg, #9333ea, #7c3aed) !important;
    border: none !important;
    color: #fff !important;
    text-decoration: none !important;
    box-shadow: 0 4px 18px rgba(147, 51, 234, 0.45) !important;
    transition: all 0.2s ease !important;
  }
  .pg-demo-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 26px rgba(147, 51, 234, 0.65) !important;
    color: #fff !important;
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

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShow(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    if (show) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show]);

  return (
    <>
      <style>{cardStyles}</style>

      <div className="pg-card" onClick={() => setShow(true)}>
        <div className="pg-card-img-wrap">
          {badge && <span className="pg-badge">{badge}</span>}
          <img src={imgPath} alt={title} loading="lazy" />
          <div className="pg-img-overlay">
            <span className="pg-overlay-text">View Case Study</span>
          </div>
        </div>

        <div className="pg-card-body">
          <h3 className="pg-card-title">{title}</h3>
          <p className="pg-card-desc">{shortDescription}</p>

          {tags && tags.length > 0 && (
            <div className="pg-tags">
              {tags.map((t, idx) => (
                <span key={idx} className="pg-tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Lightbox */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="pg-modal"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <button
            className="pg-modal-back-btn"
            onClick={handleClose}
            onPointerDown={handleClose}
          >
            ← Back to Projects
          </button>
        </Modal.Header>

        <Modal.Body>
          <img
            src={imgPath}
            alt={title}
            style={{
              width: "100%",
              maxHeight: "240px",
              objectFit: "cover",
              borderRadius: "14px",
              marginBottom: "20px",
              border: "1px solid rgba(160, 50, 210, 0.35)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          />

          <div>
            <h5>Overview</h5>
            <p>{shortDescription}</p>
          </div>

          {fullDescription && (
            <div style={{ marginTop: "16px" }}>
              {fullDescription}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            className="pg-close-btn"
            onClick={handleClose}
            onPointerDown={handleClose}
          >
            Close Preview
          </button>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pg-demo-btn"
            >
              Launch Live Project ↗
            </a>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;
