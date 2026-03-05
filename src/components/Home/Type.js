import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Growth Strategist",
          "Brand Architect",
          "Partnership Closer",
          "Systems and Execution Specialist",
          "B.Tech CSE Graduate",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
