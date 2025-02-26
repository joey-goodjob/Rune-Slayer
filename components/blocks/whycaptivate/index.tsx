"use client";

import React from "react";

export default function WhyCaptivate() {
  const features = [
    {
      id: 1,
      text: "Immersive multiplayer online experience",
    },
    {
      id: 2,
      text: "Rich character backstories that add depth to gameplay",
    },
    {
      id: 3,
      text: "Realistic bar atmosphere simulation",
    },
    {
      id: 4,
      text: "Thrilling bar games centered on deception and bluffing",
    },
    {
      id: 5,
      text: "Continuous updates introducing new games and characters",
    },
    {
      id: 6,
      text: "Active community engagement and feedback loop",
    },
  ];

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Liar&apos;s Bar Will Captivate You
        </h2>

        <div className="flex flex-col items-center space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-lg">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
