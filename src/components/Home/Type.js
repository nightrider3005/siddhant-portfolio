import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Growth Strategist",
          "Campaign Architect",
          "D2C Brand Builder",
          "Founder at Heart",
          "The Guy Who Ships",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
        delay: 55,
      }}
    />
  );
}

export default Type;
