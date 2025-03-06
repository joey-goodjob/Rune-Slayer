// components/new-component/races/index.tsx
"use client";
import Image from "next/image";
import { Race } from "@/types/races";
import { useTranslations } from "next-intl";
// // mock数据，基于图片内容
// const races: Race[] = [
//   {
//     id: "human",
//     name: "Human",
//     avatar: "/images/races/human.jpg",
//     rollChance: 25.3,
//     description: {
//       en: "Humans are highly adaptable, with an exceptional ability to sustain their resources,making them well-suited for any scenario.",
//       zh: "人类具有很强的适应性，拥有卓越的资源维持能力，能够适应任何场景。",
//     },
//     passive: [
//       {
//         name: "Tenacity",
//         description:
//           "When below 50% hp gain 15% dmg buff and 15% dmg reduction",
//       },
//       {
//         name: "Ghoul Slayer",
//         description: "You deal more dmg to the undead",
//       },
//       {
//         name: "Hunger efficiency",
//         description: "+1 Focus efficiency, +2 Mana efficiency",
//       },
//     ],
//     active: {
//       name: "Surge",
//       description: "Harness your hunger to fuel a powerful burst of stamina.",
//       requirement: "50 Hunger",
//     },
//   },
//   {
//     id: "elf",
//     name: "Elf",
//     avatar: "/images/races/elf.jpg",
//     rollChance: 25.3,
//     description: {
//       en: "Elves are expert hunters, boasting a superior capacity for precision and endurance compared to other races. Masters of stealth,they excel at remaining unseen.",
//       zh: "精灵是专业的猎手，相比其他种族具有更强的精确性和耐力。作为潜行大师，他们擅长保持隐身。",
//     },
//     passive: [
//       {
//         name: "Strider",
//         description: "+3% speed, +10% CD reduction, +10% Stealth",
//       },
//       {
//         name: "Mana affinity",
//         description: "10% more mana",
//       },
//       {
//         name: "Focus affinity",
//         description: "5% more focus",
//       },
//     ],
//     active: {
//       name: "Duskwalk",
//       description: "Become invisible temporarily",
//       requirement: "Lv.15 Skill",
//     },
//   },
// ];

export default function RaceList() {
  const t = useTranslations("races");
  const races = t.raw("list") as Race[];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          All Rune Slayer Races
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ready to start playing Rune Slayer, here are all the Races in the game
          and their unique passives!
        </p>

        <div className="space-y-6">
          {races.map((race) => (
            <div
              key={race.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex p-6">
                {/* 左侧头像 */}
                <div className="relative w-48 h-48 flex-shrink-0">
                  <Image
                    src={race.avatar}
                    alt={race.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* 右侧内容 */}
                <div className="ml-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{race.name}</h2>
                      <p className="text-gray-500">
                        {race.rollChance}% Roll Chance
                      </p>
                    </div>
                    <a href="#" className="text-blue-500 hover:underline">
                      Jump to Tier List
                    </a>
                  </div>

                  <p className="mt-4 text-gray-700">{race.description.en}</p>
                  <p className="mt-2 text-gray-700">{race.description.zh}</p>

                  {/* 被动技能 */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Passive</h3>
                    <div className="space-y-2">
                      {race.passive.map((skill, index) => (
                        <div key={index}>
                          <span className="font-medium">{skill.name}: </span>
                          <span className="text-gray-600">
                            {skill.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 主动技能 */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Active</h3>
                    <div>
                      <div className="flex justify-between">
                        <span className="font-medium">{race.active.name}</span>
                        {race.active.requirement && (
                          <span className="text-gray-500">
                            Requirement: {race.active.requirement}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{race.active.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
