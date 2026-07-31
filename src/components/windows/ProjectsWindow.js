import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProjectCard from "../Projects/ProjectCards";

import ourioutImg       from "../../Assets/Projects/ouriout.png";
import arogyamImg       from "../../Assets/Projects/arogyam.png";
import vendorImg        from "../../Assets/Projects/vendor.png";
import pathfinderImg    from "../../Assets/Projects/pathfinder.png";
import coachfinderImg   from "../../Assets/Projects/coachfinder.png";
import collabxImg       from "../../Assets/Projects/collabx.png";
import booyahverseImg   from "../../Assets/Projects/booyahverse.png";
import chakraImg        from "../../Assets/Projects/chakra.png";
import dropiqImg        from "../../Assets/Projects/dropiq.png";
import mapgalliImg      from "../../Assets/Projects/mapgalli.png";
import padhaiImg        from "../../Assets/Projects/padhai.png";
import periodicallyImg  from "../../Assets/Projects/periodically.png";

const ALL_PROJECTS = [
  {
    imgPath: pathfinderImg,
    badge: "AI · React · Firebase",
    title: "Pathfinder",
    category: "AI",
    tags: ["AI", "React", "Firebase"],
    shortDescription: "Psychometric career discovery platform for Class 10 students mapping traits to 20 Indian career paths.",
    demoLink: "https://www.sidpathfinder.online/",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Class 10 Indian students face monumental stream choices (Science, Commerce, Arts) with almost zero personalized guidance, leading to high career mismatches.</p>
        <h5>My Solution & Architecture</h5>
        <p>Engineered Pathfinder using a cosine similarity algorithm that evaluates 35 scenario-based psychometric questions, mapping student personality traits to 20 distinct career trajectories with step-by-step Indian educational roadmaps.</p>
        <h5>Impact & Traction</h5>
        <p>Helped 1,000+ students gain stream clarity with a 92% satisfaction rating in initial user testing.</p>
        <h5>Tech Stack</h5>
        <p>React · Firebase Firestore · TailwindCSS · Cosine Similarity Engine · Vercel</p>
      </>
    )
  },
  {
    imgPath: coachfinderImg,
    badge: "Product · React",
    title: "CoachFinder",
    category: "Product",
    tags: ["React", "Firebase", "EdTech"],
    shortDescription: "Recommendation engine helping students find ideal coaching institutes based on 7 weighted dimensions.",
    demoLink: "https://coachfinder-xi.vercel.app/",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Students and parents spend weeks navigating conflicting reviews when picking coaching institutes for competitive exams (JEE, NEET, UPSC, CA).</p>
        <h5>My Solution & Architecture</h5>
        <p>Designed a multi-dimensional recommendation engine evaluating institutes across 7 weighted metrics including faculty experience, batch size, fee structure, and past success ratios.</p>
        <h5>Impact & Results</h5>
        <p>Simplified search times from weeks to under 5 minutes for 500+ prospective students.</p>
        <h5>Tech Stack</h5>
        <p>React · Node.js · Firebase Realtime DB · Vercel Deployment</p>
      </>
    )
  },
  {
    imgPath: collabxImg,
    badge: "Full Stack · Node",
    title: "CollabX",
    category: "Product",
    tags: ["React", "Node.js", "MongoDB"],
    shortDescription: "Matchmaking platform for creators and brands featuring a bidirectional swipe-to-match system.",
    demoLink: "https://collabx-mauve.vercel.app/",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Micro-creators and D2C brands struggle with painful cold email outreach and opaque pricing models.</p>
        <h5>My Solution & Architecture</h5>
        <p>Built a full-stack double-opt-in marketplace where brands and creators swipe on collaboration proposals. Direct contact details are unlocked only upon mutual interest.</p>
        <h5>Key Features</h5>
        <p>Real-time chat messaging, campaign brief builder, JWT secure authentication, and profile analytics dashboard.</p>
        <h5>Tech Stack</h5>
        <p>React · Node.js · Express · MongoDB Atlas · Socket.io · JWT</p>
      </>
    )
  },
  {
    imgPath: ourioutImg,
    badge: "Founder · Growth",
    title: "OURi.OUT",
    category: "Product",
    tags: ["Branding", "Growth", "Strategy"],
    shortDescription: "Identity-driven branding agency capturing long-term attention in fast-swiping digital culture.",
    demoLink: "https://www.ouriout.com",
    fullDescription: (
      <>
        <h5>My Role as Founder</h5>
        <p>Conceptualized and launched OURi.OUT as a strategic branding agency focused on consumer psychology, positioning frameworks, and organic growth systems.</p>
        <h5>Strategic Execution</h5>
        <p>Developed high-converting landing pages, structured content engines for D2C brands, and designed identity systems that turn casual swipers into loyal community members.</p>
        <h5>Measurable Impact</h5>
        <p>Generated 40+ qualified inbound B2B leads, scaled brand social channels by 200%+, and established market positioning.</p>
      </>
    )
  },
  {
    imgPath: arogyamImg,
    badge: "AI · Healthcare",
    title: "Arogyam",
    category: "AI",
    tags: ["AI", "Healthcare", "React"],
    shortDescription: "AI-enabled healthcare platform simplifying early symptom understanding through conversational support.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Patients experience high anxiety when researching medical symptoms online due to alarmist and unverified health articles.</p>
        <h5>My Solution & Architecture</h5>
        <p>Created an empathetic AI symptom triage interface that translates complex medical jargon into clear, comforting, and actionable health guidance.</p>
        <h5>Key Features</h5>
        <p>Conversational symptom assessment, specialist recommendation routing, and doctor appointment scheduling integrations.</p>
        <h5>Tech Stack</h5>
        <p>React · Next.js · OpenAI API / LLM Workflows · Node.js · TailwindCSS</p>
      </>
    )
  },
  {
    imgPath: vendorImg,
    badge: "Analytics · Data",
    title: "Vendor Performance",
    category: "Analytics",
    tags: ["Data", "Analytics", "Business"],
    shortDescription: "Business analytics framework improving vendor evaluation through structured transaction insights.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Supply chain managers lacked visibility into recurring vendor cost leaks, delivery delays, and quality discrepancies.</p>
        <h5>My Solution & Analytics</h5>
        <p>Audited 10,000+ procurement records, constructed automated scoring models, and developed interactive dashboards to rank vendors across delivery speed, price stability, and defect rates.</p>
        <h5>Business Impact</h5>
        <p>Identified 14% cost-saving opportunities in vendor renewals and reduced procurement delays.</p>
        <h5>Tech Stack & Tools</h5>
        <p>Python (Pandas, NumPy) · SQL · Tableau / PowerBI Dashboarding · Statistical Modeling</p>
      </>
    )
  },
  {
    imgPath: booyahverseImg,
    badge: "Community · Web3",
    title: "BooyahVerse",
    category: "Product",
    tags: ["Web3", "Community", "React"],
    shortDescription: "Gaming ecosystem hub designed for high-engagement creator tournaments and tokenized rewards.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Esports communities struggle to manage decentralized tournaments, leaderboards, and prize distributions transparently.</p>
        <h5>My Solution & Architecture</h5>
        <p>Designed a web platform uniting creator tournaments with automated prize distribution, live leaderboard tracking, and community voting systems.</p>
        <h5>Key Features</h5>
        <p>Tournament bracket engine, player stats tracking, discord bot integration, and reward wallet distribution.</p>
        <h5>Tech Stack</h5>
        <p>React · Node.js · Web3.js · Firebase · Discord API</p>
      </>
    )
  },
  {
    imgPath: chakraImg,
    badge: "Social Platform",
    title: "Chakra",
    category: "Product",
    tags: ["Social", "UI/UX", "React"],
    shortDescription: "Mindful social connection network built around intentional sharing and non-algorithmic feeds.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Modern social apps exploit dopamine loops, leading to anxiety, doomscrolling, and surface-level interactions.</p>
        <h5>My Solution & Architecture</h5>
        <p>Engineered a calm social platform with chronological feeds, reflection prompts, and intentional daily sharing limits to prioritize mental well-being.</p>
        <h5>User Experience Focus</h5>
        <p>Clean dark mode aesthetic, zero vanity metrics (no public like counts), and mood-aligned content discovery.</p>
        <h5>Tech Stack</h5>
        <p>React · Node.js · MongoDB · Express · CSS Glassmorphic UI</p>
      </>
    )
  },
  {
    imgPath: dropiqImg,
    badge: "AI · E-Commerce",
    title: "DropIQ",
    category: "AI",
    tags: ["AI", "E-Commerce", "Analytics"],
    shortDescription: "AI intelligence tool for D2C brands analyzing drop performance and customer sentiment.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>High-frequency D2C clothing and sneaker brands face severe stockouts or oversupply due to unpredictable drop demand.</p>
        <h5>My Solution & Architecture</h5>
        <p>Built a predictive analytics engine that analyzes pre-drop social signals, waitlist signups, and customer sentiment to forecast optimal inventory stocking levels.</p>
        <h5>Business Impact</h5>
        <p>Reduced inventory holding costs by 18% and improved sell-through rates during peak drop windows.</p>
        <h5>Tech Stack</h5>
        <p>Python · Scikit-Learn · React · FastAPI · PostgreSQL</p>
      </>
    )
  },
  {
    imgPath: mapgalliImg,
    badge: "Hyperlocal · Discovery",
    title: "MapGalli",
    category: "Product",
    tags: ["Maps", "Hyperlocal", "React"],
    shortDescription: "Community street discovery app mapping authentic local food stalls and street artisans.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Iconic local street vendors and hidden food gems in Indian cities are absent from major food delivery apps due to high commission fees.</p>
        <h5>My Solution & Architecture</h5>
        <p>Created an interactive crowd-mapped discovery platform where foodies upload geotagged photos, ratings, and video reviews of authentic street stalls.</p>
        <h5>Key Features</h5>
        <p>Interactive Mapbox integration, crowd-verification badges, vendor location updates, and viral food trails.</p>
        <h5>Tech Stack</h5>
        <p>React · Mapbox GL JS · Firebase Realtime DB · Progressive Web App (PWA)</p>
      </>
    )
  },
  {
    imgPath: padhaiImg,
    badge: "AI · EdTech",
    title: "PadhAI",
    category: "AI",
    tags: ["AI", "EdTech", "Python"],
    shortDescription: "AI study companion generating personalized flashcards, summaries, and practice quizzes.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Students waste hours manually creating flashcards and practice questions from dense textbook PDFs.</p>
        <h5>My Solution & Architecture</h5>
        <p>Built an AI-powered study assistant that parses textbook chapters, lecture slides, and notes, instantly generating active-recall flashcards and adaptive quizzes.</p>
        <h5>Key Features</h5>
        <p>PDF upload parser, spaced-repetition study algorithm, automated concept summaries, and progress tracking.</p>
        <h5>Tech Stack</h5>
        <p>Python · OpenAI GPT-4 API · LangChain · React · FastAPI</p>
      </>
    )
  },
  {
    imgPath: periodicallyImg,
    badge: "D2C · Campaign",
    title: "Periodically App",
    category: "Product",
    tags: ["D2C", "App UI", "Campaign"],
    shortDescription: "Cycle tracking & partner education app with scroll-stopping viral campaign suite.",
    fullDescription: (
      <>
        <h5>The Core Issue</h5>
        <p>Menstrual health tracking apps are often clinical and exclude partners from understanding hormonal phase shifts.</p>
        <h5>My Solution & Architecture</h5>
        <p>Designed a fresh D2C cycle tracking app and partner education portal. Combined intuitive cycle logging with witty partner notifications that translate hormonal phases into actionable empathy.</p>
        <h5>Marketing & Brand Impact</h5>
        <p>Developed a viral marketing campaign suite spanning 18+ editorial posters, UGC story triggers, and meme-native educational content.</p>
        <h5>Tech Stack & Deliverables</h5>
        <p>React Native · Figma Design System · D2C Marketing Suite · Adobe Illustrator</p>
      </>
    )
  }
];

const styles = `
  .pw-root {
    padding: 32px 36px 48px;
    background: transparent;
  }
  .pw-header {
    margin: 0 0 20px;
  }
  .pw-title {
    font-family: 'Syne','Outfit',sans-serif;
    font-size: clamp(1.6em, 3vw, 2.2em);
    font-weight: 800;
    color: #fff;
    margin: 0 0 4px;
    letter-spacing: -0.5px;
  }
  .pw-title span {
    background: linear-gradient(135deg, #c084fc 0%, #00f3ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .pw-subtitle {
    font-family: 'Outfit',sans-serif;
    font-size: 0.88em;
    color: rgba(255,255,255,0.48);
    margin: 0;
  }

  /* Filter tabs */
  .pw-tabs {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  .pw-tab-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 0.8em;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pw-tab-btn:hover {
    background: rgba(192, 132, 252, 0.15);
    border-color: rgba(192, 132, 252, 0.4);
    color: #fff;
  }
  .pw-tab-btn.active {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.35), rgba(0, 243, 255, 0.25));
    border-color: rgba(192, 132, 252, 0.6);
    color: #fff;
    box-shadow: 0 0 16px rgba(147, 51, 234, 0.3);
  }

  .pw-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(147,51,234,0.4), transparent);
    margin: 0 0 28px;
  }
  @media (max-width: 600px) {
    .pw-root { padding: 20px 12px 36px; }
  }
`;

let injected = false;
function inject() {
  if (injected || document.getElementById("pw-styles")) return;
  const el = document.createElement("style");
  el.id = "pw-styles";
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

function ProjectsWindow() {
  inject();
  const [filter, setFilter] = useState("All");

  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter;
  });

  return (
    <div className="pw-root">
      <div className="pw-header">
        <h2 className="pw-title">Strategic <span>Projects (12)</span></h2>
        <p className="pw-subtitle">
          Curated portfolio of problem-solving initiatives across AI, Products, Growth, and Data.
        </p>
      </div>

      <div className="pw-tabs">
        {["All", "AI", "Product", "Analytics"].map((cat) => (
          <button
            key={cat}
            className={`pw-tab-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat === "All" ? "✦ All Projects (12)" : `✦ ${cat}`}
          </button>
        ))}
      </div>

      <div className="pw-divider" />

      <Row style={{ justifyContent: "flex-start", rowGap: "24px" }}>
        {filteredProjects.map((p, i) => (
          <Col md={4} sm={6} xs={12} key={i} className="project-card-col">
            <div className="tilt-wrapper">
              <ProjectCard {...p} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProjectsWindow;
