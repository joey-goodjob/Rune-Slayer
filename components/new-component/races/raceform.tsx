// components/new-component/races/index.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

type Tier = "S" | "A" | "B" | "C";

interface Race {
  id: string;
  name: string;
  tier: Tier;
  avatar: string;
}

const races: Race[] = [
  {
    id: "dullahan",
    name: "Dullahan",
    tier: "S",
    avatar: "/images/races/dullahan.png",
  },
  { id: "elf", name: "Elf", tier: "A", avatar: "/images/races/elf.png" },
  {
    id: "ailuran",
    name: "Ailuran",
    tier: "A",
    avatar: "/images/races/ailuran.png",
  },
  { id: "slime", name: "Slime", tier: "A", avatar: "/images/races/slime.png" },
  { id: "human", name: "Human", tier: "B", avatar: "/images/races/human.png" },
  {
    id: "half-golem",
    name: "Half Golem",
    tier: "B",
    avatar: "/images/races/half-golem.png",
  },
  { id: "orc", name: "Orc", tier: "C", avatar: "/images/races/orc.png" },
];

const tiers: Tier[] = ["S", "A", "B", "C"];

const tierColors: Record<Tier, string> = {
  S: "bg-red-500",
  A: "bg-orange-500",
  B: "bg-amber-500",
  C: "bg-yellow-500",
};

export default function RaceTierList() {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Rune Slayer Races Tier List
        </h1>
        <p className="text-1xl font-bold text-center mb-8">
          You will to get a random race when you begin your journey in Rune
          Slayer, and if you're not lucky enough, then you need to check this
          Tier List to make sure your roll race better than yet.
        </p>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier}
              className="flex items-center gap-4 p-2 min-h-[120px]"
            >
              {/* Tier Badge */}
              <div
                className={`w-24 h-24 ${tierColors[tier]} flex items-center justify-center text-4xl font-bold text-white rounded-md`}
              >
                {tier}
              </div>

              {/* Race Cards */}
              <div className="flex flex-wrap gap-4">
                {races
                  .filter((race) => race.tier === tier)
                  .map((race) => (
                    <div
                      key={race.id}
                      className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                      onClick={() => setSelectedRace(race)}
                    >
                      <Image
                        src={race.avatar}
                        alt={race.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <p className="text-white text-xs text-center truncate">
                          {race.name}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
