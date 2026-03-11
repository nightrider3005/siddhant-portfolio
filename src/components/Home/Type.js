import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Growth Strategist",
          "Brand Architect",
          "Influencer Network Builder",
          "AI Educator & Consultant",
          "Partnership Closer",
          "Systems & Execution Specialist",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 40,
        delay: 60,
      }}
    />
  );
}

export default Type;
