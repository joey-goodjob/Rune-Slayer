"use client";

import { useState } from "react";

// 职业卡片组件
const ClassCard = ({
  icon,
  name,
  description,
  stats,
  features,
}: {
  icon: string;
  name: string;
  description: string;
  stats: { stat: string; value: string }[];
  features: { name: string; type: string }[];
}) => {
  return (
    <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-6">
      <div className="w-36 p-2 flex flex-col items-center">
        <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center mb-2">
          {/* 这里放图标，使用实际图片替换 */}
          <div className="text-white text-4xl">{name.charAt(0)}</div>
        </div>
        <div className="text-center font-bold text-red-600">{name}</div>
      </div>

      <div className="flex-1 p-3">
        <p className="mb-2">{description}</p>

        <div className="mb-2">
          <h3 className="text-sm text-gray-600">Increase Stats Per Level</h3>
          <div className="flex flex-wrap gap-x-4">
            {stats.map((stat, index) => (
              <div key={index} className="font-medium">
                {stat.value} {stat.stat}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-600">Features</h3>
          <div className="flex flex-wrap gap-x-4">
            {features.map((feature, index) => (
              <div key={index} className="font-medium">
                {feature.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Classesfeature() {
  // 职业数据
  const classesData = [
    {
      name: "Archer",
      icon: "/icons/archer.png",
      description: "This class specializes in long range attacks with a bow.",
      stats: [
        { stat: "Agility", value: "+3" },
        { stat: "Stamina", value: "+1" },
        { stat: "Spirit", value: "+1" },
      ],
      features: [
        { name: "Bow Training", type: "skill" },
        { name: "Medium Armor", type: "armor" },
      ],
    },
    {
      name: "Warrior",
      icon: "/icons/warrior.png",
      description:
        "This class excels in melee combat wielding a sword as their primary weapon.",
      stats: [
        { stat: "Strength", value: "+3" },
        { stat: "Stamina", value: "+2" },
      ],
      features: [
        { name: "Sword Training", type: "skill" },
        { name: "Medium Armor", type: "armor" },
      ],
    },
    {
      name: "Magician",
      icon: "/icons/magician.png",
      description:
        "This class excels in using Magic along with a staff as their primary weapon.",
      stats: [
        { stat: "Intellect", value: "+3" },
        { stat: "Spirit", value: "+2" },
      ],
      features: [
        { name: "Staff Training", type: "skill" },
        { name: "Light Armor", type: "armor" },
      ],
    },
    {
      name: "Thief",
      icon: "/icons/thief.png",
      description:
        "This class excels at being quick and attacking at a fast rate wielding daggers.",
      stats: [
        { stat: "Agility", value: "+3" },
        { stat: "Stamina", value: "+1" },
        { stat: "Strength", value: "+1" },
      ],
      features: [
        { name: "Dagger Training", type: "skill" },
        { name: "Medium Armor", type: "armor" },
      ],
    },
    {
      name: "Striker",
      icon: "/imgs/1.png",
      description:
        "This class excels at close-ranged combat using their fists.",
      stats: [
        { stat: "Stamina", value: "+3" },
        { stat: "Strength", value: "+2" },
      ],
      features: [
        { name: "Gauntlet Training", type: "skill" },
        { name: "Light Armor", type: "armor" },
      ],
    },
    {
      name: "Priest",
      icon: "/icons/priest.png",
      description:
        "This class excels in using Magic along with a staff as their primary weapon.",
      stats: [
        { stat: "Spirit", value: "+3" },
        { stat: "Intellect", value: "+2" },
      ],
      features: [
        { name: "Staff Training", type: "skill" },
        { name: "Light Armor", type: "armor" },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Rune Slayer Classes, Stats & Features
        </h1>
        <p className="text-lg">
          Ready to choose your Class in Rune Slayer? Here's the Stats
          informations for each class.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classesData.map((classInfo) => (
            <ClassCard
              key={classInfo.name}
              icon={classInfo.icon}
              name={classInfo.name}
              description={classInfo.description}
              stats={classInfo.stats}
              features={classInfo.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
