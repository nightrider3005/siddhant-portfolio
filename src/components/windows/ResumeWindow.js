import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineDownload } from "react-icons/ai";
import pdf from "../../Assets/Siddhant_Garg_Resume.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const styles = `
  .rw-root {
    padding: 32px 36px 48px;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rw-header {
    text-align: center;
    margin-bottom: 24px;
    width: 100%;
  }
  .rw-title {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: 2em;
    font-weight: 800;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: -0.5px;
  }
  .rw-title span { color: #c084fc; }
  .rw-subtitle {
    font-family: 'Outfit',sans-serif;
    font-size: 0.85em;
    color: rgba(255,255,255,0.45);
    margin: 0;
  }
  .rw-divider {
    height: 1px;
    background: linear-gradient(90deg,transparent,rgba(147,51,234,0.4),transparent);
    margin: 0 0 28px;
    width: 100%;
  }
  .rw-pdf-wrap {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(147,51,234,0.25);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    max-width: 600px;
    width: 100%;
  }
  .rw-pdf-wrap .react-pdf__Document,
  .rw-pdf-wrap .react-pdf__Page {
    display: block;
    width: 100% !important;
  }
  .rw-pdf-wrap .react-pdf__Page canvas {
    display: block !important;
    width: 100% !important;
    height: auto !important;
  }
  .rw-btn-row {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 24px;
    flex-wrap: wrap;
    align-items: center;
  }
  .rw-dl-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: linear-gradient(135deg, #9333ea, #7c3aed);
    color: #fff;
    border-radius: 12px;
    font-family: 'Outfit',sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(147,51,234,0.4);
  }
  .rw-dl-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(147,51,234,0.55);
    color: #fff;
    text-decoration: none;
  }
  .rw-sig {
    font-family: 'Outfit',sans-serif;
    font-size: 0.9em;
    color: rgba(255,255,255,0.35);
    margin-top: 20px;
    text-align: center;
  }
  @media (max-width:600px) {
    .rw-root { padding: 20px 12px 36px; }
  }
`;

let injected = false;
function inject() {
  if (injected || document.getElementById("rw-styles")) return;
  const el = document.createElement("style");
  el.id = "rw-styles";
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

function ResumeWindow() {
  inject();

  return (
    <div className="rw-root">
      <div className="rw-header">
        <h2 className="rw-title">My <span>Resume</span></h2>
        <p className="rw-subtitle">Growth Strategist • AI Architect • Product Builder</p>
      </div>
      <div className="rw-divider" />

      <div className="rw-pdf-wrap">
        <Document file={pdf}>
          <Page pageNumber={1} width={600} renderTextLayer={false} />
        </Document>
      </div>

      <div className="rw-btn-row">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="rw-dl-btn"
        >
          <AiOutlineDownload style={{ fontSize: "1.1em" }} />
          Download CV
        </a>
      </div>

      <p className="rw-sig">Built with AI tools + a lot of manual taste</p>
    </div>
  );
}

export default ResumeWindow;
