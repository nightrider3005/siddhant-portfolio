import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Siddhant_Garg_Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .resume-section {
    position: relative;
    padding: 80px 0 60px !important;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Ambient glows */
  .resume-section::before {
    content: '';
    position: absolute;
    top: -120px; left: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(198,120,221,0.08) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: rDrift1 14s ease-in-out infinite;
  }
  .resume-section::after {
    content: '';
    position: absolute;
    bottom: -100px; right: -80px;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(198,120,221,0.06) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    animation: rDrift2 18s ease-in-out infinite;
  }
  @keyframes rDrift1 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)}
  }
  @keyframes rDrift2 {
    0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-30px)}
  }

  /* Page heading */
  .resume-page-title {
    font-family: 'Outfit', sans-serif;
    font-size: 2.8em;
    font-weight: 800;
    color: #fff;
    text-align: center;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
    animation: titleIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes titleIn {
    from { opacity: 0; transform: translateY(-22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .resume-page-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 0.95em;
    color: rgba(255,255,255,0.45);
    text-align: center;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.8s ease 0.2s both;
  }

  /* Decorative divider */
  .resume-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.8s ease 0.3s both;
  }
  .resume-divider span:nth-child(1),
  .resume-divider span:nth-child(3) {
    display: block;
    height: 1px;
    width: 60px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.6));
  }
  .resume-divider span:nth-child(3) {
    background: linear-gradient(90deg, rgba(198,120,221,0.6), transparent);
  }
  .resume-divider span:nth-child(2) {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 24px rgba(198,120,221,0.4);
    animation: dotPulse 2s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%,100% { box-shadow: 0 0 12px rgba(198,120,221,0.9), 0 0 24px rgba(198,120,221,0.4); }
    50%     { box-shadow: 0 0 20px rgba(198,120,221,1),   0 0 40px rgba(198,120,221,0.6); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Download button */
  .resume-dl-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif !important;
    font-size: 0.92em !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px;
    padding: 11px 30px !important;
    border-radius: 40px !important;
    background: linear-gradient(135deg, #c678dd, #9a4db5) !important;
    border: none !important;
    color: #fff !important;
    box-shadow: 0 4px 22px rgba(198,120,221,0.35) !important;
    text-decoration: none !important;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1) !important;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
  .resume-dl-btn:hover {
    transform: translateY(-3px) scale(1.04) !important;
    box-shadow: 0 10px 36px rgba(198,120,221,0.55) !important;
    color: #fff !important;
  }
  .resume-dl-btn:active {
    transform: translateY(0) scale(0.98) !important;
  }
  .resume-dl-btn svg {
    font-size: 1.15em;
  }

  /* PDF wrapper */
  .resume-pdf-outer {
    position: relative;
    z-index: 1;
    margin: 36px 0 36px;
    animation: pdfReveal 1s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }
  @keyframes pdfReveal {
    from { opacity: 0; transform: translateY(30px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Glow frame around PDF */
  .resume-pdf-frame {
    position: relative;
    border-radius: 18px;
    padding: 6px;
    background: linear-gradient(135deg,
      rgba(198,120,221,0.35),
      rgba(198,120,221,0.08) 40%,
      rgba(198,120,221,0.25) 80%,
      rgba(198,120,221,0.35)
    );
    box-shadow:
      0 0 0 1px rgba(198,120,221,0.2),
      0 20px 60px rgba(198,120,221,0.15),
      0 8px 20px rgba(0,0,0,0.5);
    animation: framePulse 4s ease-in-out infinite;
  }
  @keyframes framePulse {
    0%,100% { box-shadow: 0 0 0 1px rgba(198,120,221,0.2), 0 20px 60px rgba(198,120,221,0.15), 0 8px 20px rgba(0,0,0,0.5); }
    50%     { box-shadow: 0 0 0 1px rgba(198,120,221,0.35), 0 24px 70px rgba(198,120,221,0.25), 0 8px 20px rgba(0,0,0,0.5); }
  }

  /* Corner brackets */
  .resume-pdf-frame::before,
  .resume-pdf-frame::after {
    content: '';
    position: absolute;
    width: 22px; height: 22px;
    border-color: #c678dd;
    border-style: solid;
    z-index: 2;
    opacity: 0.8;
  }
  .resume-pdf-frame::before {
    top: -1px; left: -1px;
    border-width: 2px 0 0 2px;
    border-radius: 6px 0 0 0;
  }
  .resume-pdf-frame::after {
    bottom: -1px; right: -1px;
    border-width: 0 2px 2px 0;
    border-radius: 0 0 6px 0;
  }

  .resume-pdf-inner {
    border-radius: 13px;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: center;
  }

  /* Corner brackets extra 2 */
  .corner-tr, .corner-bl {
    position: absolute;
    width: 22px; height: 22px;
    border-color: #c678dd;
    border-style: solid;
    z-index: 2;
    opacity: 0.8;
  }
  .corner-tr {
    top: -1px; right: -1px;
    border-width: 2px 2px 0 0;
    border-radius: 0 6px 0 0;
  }
  .corner-bl {
    bottom: -1px; left: -1px;
    border-width: 0 0 2px 2px;
    border-radius: 0 0 0 6px;
  }

  /* Status bar above PDF */
  .resume-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    margin-bottom: 10px;
    font-family: 'Outfit', monospace;
    font-size: 0.72em;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.5px;
  }
  .resume-status-bar .status-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c678dd;
    box-shadow: 0 0 8px rgba(198,120,221,0.8);
    margin-right: 6px;
    animation: dotPulse 2s ease-in-out infinite;
  }

  /* Buttons row */
  .resume-btn-row {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.8s ease 0.15s both;
  }
`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);

    if (!document.getElementById("resume-v2-styles")) {
      const tag = document.createElement("style");
      tag.id = "resume-v2-styles";
      tag.innerHTML = styles;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById("resume-v2-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        {/* Heading */}
        <h1 className="resume-page-title">
          My <span className="purple">Resume</span>
        </h1>
        <p className="resume-page-sub">Strategy · Growth · Execution</p>
        <div className="resume-divider">
          <span />
          <span />
          <span />
        </div>

        {/* Top Download Button */}
        <div className="resume-btn-row" style={{ marginBottom: "0" }}>
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-dl-btn"
          >
            <AiOutlineDownload />
            Download Resume
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="resume-pdf-outer">
          <div className="resume-status-bar">
            <span>
              <span className="status-dot" />
              Siddhant_Garg_Resume.pdf
            </span>
            <span>Page 1</span>
          </div>
          <div className="resume-pdf-frame">
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="resume-pdf-inner">
              <Document file={pdf} className="d-flex justify-content-center">
                <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
              </Document>
            </div>
          </div>
        </div>

        {/* Bottom Download Button */}
        <div className="resume-btn-row">
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-dl-btn"
          >
            <AiOutlineDownload />
            Download CV
          </a>
        </div>
      </Container>
    </div>
  );
}

export default ResumeNew;
