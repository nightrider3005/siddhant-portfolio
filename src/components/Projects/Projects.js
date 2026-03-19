import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import ourioutImg from "../../Assets/Projects/ouriout.png";
import arogyamImg from "../../Assets/Projects/arogyam.png";
import vendorImg from "../../Assets/Projects/vendor.png";
import pathfinderImg from "../../Assets/Projects/pathfinder.png";
import coachfinderImg from "../../Assets/Projects/coachfinder.png";
import collabxImg from "../../Assets/Projects/collabx.png";

const sectionStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');

  /* ══════════════════════════════
     VARIABLES
  ══════════════════════════════ */
  :root {
    --clr-purple: #c678dd;
    --clr-purple-glow: rgba(198,120,221,0.55);
    --clr-purple-dim: rgba(198,120,221,0.12);
  }

  /* ══════════════════════════════
     SECTION
  ══════════════════════════════ */
  .project-section {
    position: relative;
    padding: 90px 0 80px !important;
    min-height: 100vh;
    overflow: hidden;
    background: #090914;
  }

  /* Animated grid */
  .project-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(198,120,221,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(198,120,221,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
    animation: gridShift 28s linear infinite;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
  }
  @keyframes gridShift {
    0%   { background-position: 0 0, 0 0; }
    100% { background-position: 60px 60px, 60px 60px; }
  }

  /* Ambient orbs */
  .proj-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
  }
  .proj-orb-1 {
    width: 600px; height: 600px;
    top: -180px; left: -180px;
    background: radial-gradient(circle, rgba(198,120,221,0.09) 0%, transparent 70%);
    animation: orbDrift1 18s ease-in-out infinite;
  }
  .proj-orb-2 {
    width: 500px; height: 500px;
    bottom: -120px; right: -120px;
    background: radial-gradient(circle, rgba(120,100,221,0.07) 0%, transparent 70%);
    animation: orbDrift2 22s ease-in-out infinite;
  }
  .proj-orb-3 {
    width: 320px; height: 320px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(198,120,221,0.04) 0%, transparent 70%);
    animation: orbPulse 7s ease-in-out infinite;
  }
  @keyframes orbDrift1 {
    0%,100%{transform:translate(0,0) scale(1)}
    50%{transform:translate(60px,40px) scale(1.1)}
  }
  @keyframes orbDrift2 {
    0%,100%{transform:translate(0,0) scale(1)}
    50%{transform:translate(-40px,-50px) scale(1.08)}
  }
  @keyframes orbPulse {
    0%,100%{opacity:0.5; transform:translate(-50%,-50%) scale(1)}
    50%{opacity:1; transform:translate(-50%,-50%) scale(1.35)}
  }

  .project-section .container { position: relative; z-index: 1; }

  /* ══════════════════════════════
     GLITCH HEADING
  ══════════════════════════════ */
  .project-heading-wrap {
    text-align: center;
    margin-bottom: 12px;
    animation: headDrop 1s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes headDrop {
    from { opacity:0; transform:translateY(-32px) skewX(-4deg); }
    to   { opacity:1; transform:translateY(0) skewX(0deg); }
  }

  .project-heading {
    font-family: 'Syne', sans-serif !important;
    font-size: 3.2em !important;
    font-weight: 800 !important;
    color: #fff !important;
    letter-spacing: -1px;
    margin-bottom: 0 !important;
    display: inline-block;
    position: relative;
  }
  .project-heading::before,
  .project-heading::after {
    content: attr(data-text);
    position: absolute;
    top:0; left:0;
    width:100%; height:100%;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    pointer-events: none;
  }
  .project-heading::before {
    color: rgba(198,120,221,0.65);
    animation: glitchTop 5.5s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }
  .project-heading::after {
    color: rgba(100,180,255,0.45);
    animation: glitchBot 5.5s infinite;
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }
  @keyframes glitchTop {
    0%,89%,100%{transform:translate(0,0);opacity:0}
    90%{transform:translate(-3px,-1px);opacity:1}
    92%{transform:translate(3px,0);opacity:1}
    94%{transform:translate(-1px,1px);opacity:1}
    96%{transform:translate(0,0);opacity:0}
  }
  @keyframes glitchBot {
    0%,89%,100%{transform:translate(0,0);opacity:0}
    91%{transform:translate(3px,1px);opacity:1}
    93%{transform:translate(-2px,-1px);opacity:1}
    95%{transform:translate(1px,0);opacity:1}
    97%{transform:translate(0,0);opacity:0}
  }

  .project-subtitle {
    font-family: 'Outfit', sans-serif;
    font-size: 1em;
    color: rgba(255,255,255,0.44);
    text-align: center;
    margin-bottom: 0;
    animation: fadeUp 0.9s ease 0.25s both;
  }

  /* ══════════════════════════════
     ANIMATED DIVIDER
  ══════════════════════════════ */
  .project-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0 44px;
    animation: fadeUp 0.8s ease 0.35s both;
  }
  .div-line {
    height: 1px; width: 80px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.7));
    position: relative;
    overflow: hidden;
  }
  .div-line:last-child {
    background: linear-gradient(90deg, rgba(198,120,221,0.7), transparent);
  }
  .div-line::after {
    content: '';
    position: absolute;
    top:0; left:-100%;
    width:100%; height:100%;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    animation: scanLine 3s ease-in-out infinite;
  }
  .div-line:last-child::after { animation-delay: 1.5s; }
  @keyframes scanLine {
    0%{left:-100%} 100%{left:200%}
  }
  .div-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--clr-purple);
    position: relative;
    animation: dotPulse 2s ease-in-out infinite;
  }
  .div-dot::before, .div-dot::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid var(--clr-purple);
    animation: ringExpand 2s ease-out infinite;
  }
  .div-dot::after { animation-delay: 1s; }
  @keyframes dotPulse {
    0%,100%{box-shadow:0 0 10px var(--clr-purple-glow),0 0 24px rgba(198,120,221,0.3)}
    50%{box-shadow:0 0 20px var(--clr-purple),0 0 44px var(--clr-purple-glow)}
  }
  @keyframes ringExpand {
    0%{transform:scale(1);opacity:0.8}
    100%{transform:scale(2.8);opacity:0}
  }

  /* ══════════════════════════════
     MARQUEE TICKER
  ══════════════════════════════ */
  .proj-marquee-wrap {
    overflow: hidden;
    margin-bottom: 36px;
    mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
    animation: fadeUp 0.8s ease 0.4s both;
  }
  .proj-marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeScroll 20s linear infinite;
  }
  .proj-marquee-item {
    font-family: 'Outfit', monospace;
    font-size: 0.64em;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.48);
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
  }
  .proj-marquee-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--clr-purple);
    opacity: 0.5;
    flex-shrink: 0;
  }
  @keyframes marqueeScroll {
    0%{transform:translateX(0)}
    100%{transform:translateX(-50%)}
  }

  /* ══════════════════════════════
     ROW LABEL
  ══════════════════════════════ */
  .project-row-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.67em;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(198,120,221,0.45);
    text-align: center;
    margin: 62px 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }
  .rl-line {
    height: 1px; flex: 1; max-width: 120px;
    background: linear-gradient(90deg, transparent, rgba(198,120,221,0.28));
  }
  .rl-line:last-child {
    background: linear-gradient(90deg, rgba(198,120,221,0.28), transparent);
  }

  /* ══════════════════════════════
     CARD COLUMNS
  ══════════════════════════════ */
  .project-cards-row { row-gap: 28px; }

  .project-card-col {
    display: flex;
    flex-direction: column;
    perspective: 1100px;
  }
  .project-card-col:nth-child(1){animation:cardReveal 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both}
  .project-card-col:nth-child(2){animation:cardReveal 0.85s cubic-bezier(0.22,1,0.36,1) 0.27s both}
  .project-card-col:nth-child(3){animation:cardReveal 0.85s cubic-bezier(0.22,1,0.36,1) 0.44s both}
  @keyframes cardReveal {
    from{opacity:0;transform:translateY(52px) rotateX(14deg) scale(0.95)}
    to{opacity:1;transform:translateY(0) rotateX(0deg) scale(1)}
  }

  /* 3-D tilt wrapper */
  .tilt-wrapper {
    transform-style: preserve-3d;
    transition: transform 0.1s linear;
    height: 100%;
    border-radius: 20px;
  }

  /* ══════════════════════════════
     FEATURED CARD EXTRAS
  ══════════════════════════════ */
  .featured-row .pg-card {
    border-color: rgba(198,120,221,0.3) !important;
    background: rgba(198,120,221,0.025) !important;
  }

  /* Inner glow layer */
  .featured-row .pg-card > .feat-glow-layer {
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(198,120,221,0.12), transparent 55%, rgba(198,120,221,0.06));
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .featured-row .pg-card:hover > .feat-glow-layer { opacity: 1; }

  /* Shimmer sweep */
  .featured-row .pg-card::after {
    content: '';
    position: absolute;
    top: -60%; left: -60%;
    width: 40%; height: 220%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
    transform: rotate(15deg);
    pointer-events: none;
    z-index: 1;
    animation: shimmerSweep 5.5s ease-in-out infinite;
  }
  .featured-row .project-card-col:nth-child(1) .pg-card::after{animation-delay:0s}
  .featured-row .project-card-col:nth-child(2) .pg-card::after{animation-delay:1.8s}
  .featured-row .project-card-col:nth-child(3) .pg-card::after{animation-delay:3.6s}
  @keyframes shimmerSweep {
    0%,68%,100%{left:-60%}
    34%{left:145%}
  }

  /* Badge extra glow on featured */
  .featured-row .pg-badge {
    box-shadow: 0 0 14px rgba(198,120,221,0.3) !important;
    border-color: rgba(198,120,221,0.55) !important;
    animation: badgePop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.6s both !important;
  }
  @keyframes badgePop {
    from{transform:scale(0.5) rotate(-8deg);opacity:0}
    to{transform:scale(1) rotate(0deg);opacity:1}
  }

  /* ══════════════════════════════
     FOOTER NOTE
  ══════════════════════════════ */
  .project-footer-note {
    font-family: 'Outfit', sans-serif;
    text-align: center;
    color: rgba(255,255,255,0.27);
    font-size: 0.82em;
    margin-top: 50px;
    letter-spacing: 0.5px;
    animation: fadeUp 0.8s ease 0.7s both;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .star-spin {
    color: var(--clr-purple);
    display: inline-block;
    animation: starSpin 4s linear infinite;
  }
  @keyframes starSpin {
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }

  /* shared util */
  @keyframes fadeUp {
    from{opacity:0;transform:translateY(18px)}
    to{opacity:1;transform:translateY(0)}
  }
`;

const MARQUEE_ITEMS = [
  "Latest Builds",
  "Full-Stack",
  "AI Powered",
  "Live & Deployed",
  "React",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Vercel",
  "JWT Auth",
  "Latest Builds",
  "Full-Stack",
  "AI Powered",
  "Live & Deployed",
  "React",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Vercel",
  "JWT Auth",
];

function useTilt(rowRef) {
  useEffect(() => {
    const cols = rowRef.current?.querySelectorAll(".tilt-wrapper");
    if (!cols) return;
    const handlers = Array.from(cols).map((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `rotateY(${dx * 9}deg) rotateX(${-dy * 7}deg) scale(1.02)`;
      };
      const onLeave = () => {
        el.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return { el, onMove, onLeave };
    });
    return () =>
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
  }, [rowRef]);
}

function Projects() {
  const featuredRef = useRef(null);
  const classicRef = useRef(null);
  useTilt(featuredRef);
  useTilt(classicRef);

  useEffect(() => {
    if (!document.getElementById("projects-v3-styles")) {
      const tag = document.createElement("style");
      tag.id = "projects-v3-styles";
      tag.innerHTML = sectionStyles;
      document.head.appendChild(tag);
    }
    return () => document.getElementById("projects-v3-styles")?.remove();
  }, []);

  return (
    <Container fluid className="project-section">
      <div className="proj-orb proj-orb-1" />
      <div className="proj-orb proj-orb-2" />
      <div className="proj-orb proj-orb-3" />
      <Particle />

      <Container>
        {/* ── HEADING ── */}
        <div className="project-heading-wrap">
          <h1 className="project-heading" data-text="Strategic Projects">
            Strategic <strong className="purple">Projects</strong>
          </h1>
        </div>

        <p className="project-subtitle">
          A curated portfolio of problem-solving initiatives focused on growth,
          clarity and measurable business impact.
        </p>

        {/* ── DIVIDER ── */}
        <div className="project-divider">
          <div className="div-line" />
          <div className="div-dot" />
          <div className="div-line" />
        </div>

        {/* ── MARQUEE ── */}
        <div className="proj-marquee-wrap">
          <div className="proj-marquee-track">
            {MARQUEE_ITEMS.map((item, i) => (
              <span className="proj-marquee-item" key={i}>
                <span className="proj-marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════
            ROW 1 — FEATURED NEW
        ════════════════════════ */}
        <Row
          ref={featuredRef}
          className="project-cards-row featured-row"
          style={{ justifyContent: "center" }}
        >
          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={pathfinderImg}
                badge="NEW · AI · React"
                title="Pathfinder"
                tags={["AI", "React", "Firebase"]}
                shortDescription="Psychometric career guidance platform for Class 10 students — 35-question quiz maps personality traits to 20 career paths with India-specific roadmaps."
                demoLink="https://www.sidpathfinder.online/"
                fullDescription={
                  <>
                    <h5>The Problem</h5>
                    <p>
                      Indian Class 10 students face one of the most
                      consequential stream choices of their lives with almost
                      zero structured guidance — relying on peer pressure or
                      parental bias rather than self-awareness.
                    </p>
                    <h5>The Solution</h5>
                    <p>
                      Pathfinder is a psychometric career discovery platform
                      that measures five core personality traits through 35
                      scenario-based questions and maps them to the most
                      suitable career paths using a cosine similarity algorithm.
                    </p>
                    <h5>What I Built</h5>
                    <p>
                      • 35-question scenario quiz measuring 5 personality
                      dimensions
                    </p>
                    <p>
                      • Cosine similarity engine matching profiles to 20 career
                      datasets
                    </p>
                    <p>
                      • India-specific data: salary ranges, top colleges, and
                      roadmaps
                    </p>
                    <p>
                      • Firebase Authentication and Firestore for result
                      persistence
                    </p>
                    <p>• Responsive glassmorphism UI deployed on Vercel</p>
                    <h5>Tech Stack</h5>
                    <p>React · Firebase · JavaScript · Vercel</p>
                    <h5>Impact</h5>
                    <p>
                      Turns a high-anxiety life decision into a structured,
                      data-informed discovery — making career clarity accessible
                      to every student.
                    </p>
                  </>
                }
              />
            </div>
          </Col>

          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={coachfinderImg}
                badge="NEW · Product · React"
                title="CoachFinder"
                tags={["React", "Firebase", "EdTech"]}
                shortDescription="Recommendation engine helping students choose the right coaching institute for JEE, NEET, UPSC, CA and more — ranked across 7 weighted dimensions."
                demoLink="https://coachfinder-xi.vercel.app/"
                fullDescription={
                  <>
                    <h5>The Problem</h5>
                    <p>
                      Students and parents spend weeks researching coaching
                      institutes with no systematic way to compare them.
                      Decisions are driven by brand name and word-of-mouth
                      rather than personal fit.
                    </p>
                    <h5>The Solution</h5>
                    <p>
                      CoachFinder ranks 30+ institutes across JEE, NEET, UPSC,
                      CLAT, CA and SSC using a 7-dimension weighted scoring
                      engine tailored to each student's city, budget and
                      learning style.
                    </p>
                    <h5>What I Built</h5>
                    <p>
                      • 7-dimension weighted scoring engine for personalised
                      ranking
                    </p>
                    <p>
                      • 30+ institutes including Allen, FIITJEE, Physics Wallah
                      and regional names
                    </p>
                    <p>• Side-by-side comparison tool with winner indicators</p>
                    <p>
                      • Filterable institute library with detailed institute
                      profiles
                    </p>
                    <p>• Firebase-backed student dashboard for saved results</p>
                    <h5>Tech Stack</h5>
                    <p>React · Firebase · JavaScript · Vercel</p>
                    <h5>Impact</h5>
                    <p>
                      Brings structure and objectivity to one of the biggest
                      financial decisions families make for their children's
                      education.
                    </p>
                  </>
                }
              />
            </div>
          </Col>

          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={collabxImg}
                badge="NEW · Full-Stack"
                title="CollabX"
                tags={["React", "Node.js", "MongoDB"]}
                shortDescription="Full-stack creator × brand matching platform with bidirectional swipe-to-match — contact info revealed only on mutual interest, protecting both sides."
                demoLink="https://collabx-mauve.vercel.app/"
                fullDescription={
                  <>
                    <h5>The Problem</h5>
                    <p>
                      Instagram creators waste hours cold-DMing brands that
                      never respond. Brands receive hundreds of irrelevant
                      pitches with no neutral space to signal genuine interest
                      first.
                    </p>
                    <h5>The Solution</h5>
                    <p>
                      CollabX is a Tinder-style creator-brand matching platform
                      where contact details are only revealed when both parties
                      swipe right — eliminating spam and cold outreach entirely.
                    </p>
                    <h5>What I Built</h5>
                    <p>
                      • Bidirectional swipe-to-match system with mutual interest
                      logic
                    </p>
                    <p>
                      • REST API backend with JWT authentication and bcrypt
                      password hashing
                    </p>
                    <p>• MongoDB schemas for users, swipes and matches</p>
                    <p>• 35+ seeded demo creator and brand profiles</p>
                    <p>
                      • Frontend on Vercel · Backend on Koyeb · Database on
                      MongoDB Atlas
                    </p>
                    <h5>Tech Stack</h5>
                    <p>
                      React · Node.js · Express · MongoDB Atlas · JWT · Vercel ·
                      Koyeb
                    </p>
                    <h5>Impact</h5>
                    <p>
                      Trust-first collaboration infrastructure that makes
                      influencer-brand partnerships more intentional, efficient
                      and spam-free.
                    </p>
                  </>
                }
              />
            </div>
          </Col>
        </Row>

        {/* ── SEPARATOR ── */}
        <div className="project-row-label">
          <div className="rl-line" />
          Earlier Work
          <div className="rl-line" />
        </div>

        {/* ════════════════════════
            ROW 2 — CLASSIC
        ════════════════════════ */}
        <Row
          ref={classicRef}
          className="project-cards-row"
          style={{ justifyContent: "center" }}
        >
          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={ourioutImg}
                badge="01 · Founder"
                title="OURi.OUT"
                tags={["Branding", "Growth", "Strategy"]}
                shortDescription="Founded OURi.OUT to build identity driven branding that earns trust and long term attention in a fast swiping digital culture."
                demoLink="https://www.ouriout.com"
                fullDescription={
                  <>
                    <h5>The Core Problem</h5>
                    <p>
                      In today's digital world, brands are judged within
                      seconds. The culture of constant swiping reduces authentic
                      positioning. Talented individuals struggle to stand out
                      because their identity is not strategically structured.
                    </p>
                    <h5>The Vision</h5>
                    <p>
                      OURi.OUT was created to solve this perception gap by
                      building strong, clear and authority driven brand
                      positioning that captures attention beyond the first
                      glance.
                    </p>
                    <h5>My Role as Founder</h5>
                    <p>
                      • Conceptualized and built the complete brand identity
                      from scratch
                    </p>
                    <p>
                      • Designed positioning framework and communication
                      strategy
                    </p>
                    <p>
                      • Executed LinkedIn outreach generating 40+ qualified
                      leads
                    </p>
                    <p>
                      • Scaled social media visibility by over 200% during early
                      growth phase
                    </p>
                    <p>
                      • Built digital infrastructure and optimized user
                      communication flow
                    </p>
                    <h5>Growth and Impact</h5>
                    <p>
                      Rapid early stage traction, measurable inbound interest,
                      strong trust building and credible authority positioning
                      within a short time frame.
                    </p>
                  </>
                }
              />
            </div>
          </Col>

          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={arogyamImg}
                badge="02 · Product"
                title="Arogyam"
                tags={["AI", "Healthcare", "React"]}
                shortDescription="AI enabled healthcare platform designed to simplify early symptom understanding through intelligent conversational support."
                fullDescription={
                  <>
                    <h5>The Problem</h5>
                    <p>
                      Many individuals ignore early symptoms due to confusion,
                      scattered information and lack of structured guidance —
                      delaying decisions and creating anxiety.
                    </p>
                    <h5>The Idea</h5>
                    <p>
                      Arogyam provides instant, structured and easy to
                      understand symptom support through an AI powered
                      conversational interface.
                    </p>
                    <h5>My Contribution</h5>
                    <p>
                      • Conceptualized the product vision with focus on
                      accessibility
                    </p>
                    <p>• Designed complete user experience flow</p>
                    <p>• Built frontend architecture using React and Next.js</p>
                    <p>• Integrated conversational AI workflows</p>
                    <p>
                      • Ensured smooth performance and intuitive interaction
                      design
                    </p>
                    <h5>Impact</h5>
                    <p>
                      Transformed complex symptom queries into structured
                      guidance and demonstrated ability to combine product
                      thinking with execution.
                    </p>
                  </>
                }
              />
            </div>
          </Col>

          <Col md={4} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard
                imgPath={vendorImg}
                badge="03 · Analytics"
                title="Vendor Performance Analysis"
                tags={["Data", "Analytics", "Business"]}
                shortDescription="Business focused analytics project designed to improve vendor evaluation through structured performance insights."
                fullDescription={
                  <>
                    <h5>The Problem</h5>
                    <p>
                      Organizations often continue vendor partnerships without
                      structured evaluation. Decisions are influenced by habit
                      rather than measurable insight.
                    </p>
                    <h5>The Objective</h5>
                    <p>
                      To create a clear vendor performance evaluation framework
                      that supports smarter business decisions.
                    </p>
                    <h5>My Contribution</h5>
                    <p>• Analyzed 10,000+ vendor transaction records</p>
                    <p>
                      • Identified cost inconsistencies and delivery
                      inefficiencies
                    </p>
                    <p>
                      • Segmented vendors based on reliability and contribution
                    </p>
                    <p>• Designed visual dashboards for management clarity</p>
                    <p>• Converted raw data into actionable recommendations</p>
                    <h5>Impact</h5>
                    <p>
                      Enabled structured vendor comparison and improved decision
                      making clarity aligned with business outcomes.
                    </p>
                  </>
                }
              />
            </div>
          </Col>
        </Row>

        {/* ── FOOTER NOTE ── */}
        <p className="project-footer-note">
          Click any card to explore the full case study
          <span className="star-spin">✦</span>
        </p>
      </Container>
    </Container>
  );
}

export default Projects;
