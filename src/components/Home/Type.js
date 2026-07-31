import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Growth Strategist.",
          "AI-Orchestration Architect.",
          "Product Builder.",
          "Campaign Engineer.",
          "The Guy Who Ships.",
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

