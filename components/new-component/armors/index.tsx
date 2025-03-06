"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

// 稀有度类型
type Rarity = "common" | "uncommon" | "rare" | "legendary" | "mythical";

// 装备材料类型
type Material = {
  name: string;
  quantity: number;
};

// 装备类型
type ArmorType =
  | "ring"
  | "bag"
  | "chestplate"
  | "back"
  | "helmet"
  | "boot"
  | "sash";

// 装备属性类型
type ArmorStat = {
  name: string;
  value: number | string;
};

// 装备数据类型
type Armor = {
  id: string;
  name: string;
  description: string;
  type: ArmorType;
  rarity: Rarity;
  level?: number;
  armor?: number;
  stats: ArmorStat[];
  materials: Material[];
  effect?: string;
  imageLabel: string;
};

// 稀有度颜色映射
const rarityColors: Record<Rarity, string> = {
  common: "text-gray-400",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  legendary: "text-purple-500",
  mythical: "text-orange-500",
};

const rarityBgColors: Record<Rarity, string> = {
  common: "border-gray-400",
  uncommon: "border-green-500",
  rare: "border-blue-500",
  legendary: "border-purple-500",
  mythical: "border-orange-500",
};

// 装备类型映射
const armorTypeLabels: Record<ArmorType, string> = {
  ring: "Ring",
  bag: "Bag",
  chestplate: "Chestplate",
  back: "Back",
  helmet: "Helmet",
  boot: "Boot",
  sash: "Sash",
};

// Mock 数据
const armorsData: Armor[] = [
  // Ring 类型装备
  {
    id: "primordial-ring",
    name: "Primordial Ring",
    description:
      "One of the seven Dragon Rings. This one specifically was once in the possession of the Primordial Dragon Lord.",
    type: "ring",
    rarity: "legendary",
    level: 30,
    stats: [],
    materials: [],
    effect: "The more hungry you are the bigger the physical damage buff.",
    imageLabel: "Primordial Ring",
  },
  {
    id: "demon-circlet",
    name: "Demon Circlet",
    description: "Ring given to demon lords.",
    type: "ring",
    rarity: "rare",
    armor: 100,
    stats: [
      { name: "Strength", value: 10 },
      { name: "Agility", value: 10 },
      { name: "Stamina", value: 10 },
    ],
    materials: [],
    imageLabel: "Demon Circlet",
  },
  {
    id: "lucky-ring",
    name: "Lucky Ring",
    description: "You'll be lucky when you picked it.",
    type: "ring",
    rarity: "uncommon",
    stats: [{ name: "Luck", value: 1 }],
    materials: [
      { name: "Gold Bar", quantity: 2 },
      { name: "Platinum Bar", quantity: 4 },
    ],
    imageLabel: "Lucky Ring",
  },

  // Bag 类型装备
  {
    id: "lilyleaf-bag",
    name: "Lilyleaf Bag",
    description: "A bag used for carrying",
    type: "bag",
    rarity: "uncommon",
    stats: [{ name: "Weight", value: 20 }],
    materials: [
      { name: "Lilylef", quantity: 6 },
      { name: "Spider Silk", quantity: 4 },
    ],
    imageLabel: "Lilyleaf Bag",
  },
  {
    id: "slime-bag",
    name: "Slime Bag",
    description:
      "A bag saturated by the clinging embrace of slime over an extended duration",
    type: "bag",
    rarity: "uncommon",
    stats: [{ name: "Weight", value: 35 }],
    materials: [],
    imageLabel: "Slime Bag",
  },
  {
    id: "cotton-bag",
    name: "Cotton Bag",
    description: "A bag used for carrying",
    type: "bag",
    rarity: "common",
    stats: [{ name: "Weight", value: 10 }],
    materials: [
      { name: "Flax", quantity: 6 },
      { name: "Cotton", quantity: 4 },
    ],
    imageLabel: "Cotton Bag",
  },

  // Chestplate 类型装备
  {
    id: "turtle-shell",
    name: "Turtle Shell",
    description: "The personal armor of Buser, made from a shell of a turtle.",
    type: "chestplate",
    rarity: "legendary",
    level: 40,
    stats: [],
    materials: [],
    imageLabel: "Turtle Shell",
  },
  {
    id: "dire-bear-garbs",
    name: "Dire Bear Garbs",
    description: "Garbs made out of the parts of a Dire Bear.",
    type: "chestplate",
    rarity: "legendary",
    level: 40,
    stats: [],
    materials: [],
    imageLabel: "Dire Bear Garbs",
  },
  {
    id: "arachnids-robes",
    name: "Arachnids Robes",
    description: "Clothes woven from the carapace of a Spider Mother.",
    type: "chestplate",
    rarity: "legendary",
    level: 40,
    stats: [],
    materials: [],
    imageLabel: "Arachnids Robes",
  },
];

// 稀有度说明组件
const RaritySection: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Rarity for Rune Slayer</h1>
      <p className="mb-2">
        In the Rune Slayer, the items & skills are divided into 5 different
        rarities, which use different colors to differentiate them, namely:
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-gray-400">Common</span>
        <span>-</span>
        <span className="text-green-500">Uncommon</span>
        <span>-</span>
        <span className="text-blue-500">Rare</span>
        <span>-</span>
        <span className="text-purple-500">Legendary</span>
        <span>-</span>
        <span className="text-orange-500">Mythical</span>
      </div>
    </div>
  );
};

// 装备类型导航组件
const ArmorTypeNav: React.FC<{
  selectedType: ArmorType | null;
  onSelectType: (type: ArmorType) => void;
}> = ({ selectedType, onSelectType }) => {
  const armorTypes: ArmorType[] = [
    "ring",
    "bag",
    "chestplate",
    "back",
    "helmet",
    "boot",
    "sash",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {armorTypes.map((type) => (
        <button
          key={type}
          className={`py-2 px-6 ${
            selectedType === type
              ? "bg-amber-700 text-white"
              : "bg-amber-600/80 text-white hover:bg-amber-700"
          } rounded transition-colors`}
          onClick={() => onSelectType(type)}
        >
          {armorTypeLabels[type]}
        </button>
      ))}
    </div>
  );
};

// 单个装备卡片组件
const ArmorCard: React.FC<{ armor: Armor }> = ({ armor }) => {
  return (
    <Card className="bg-gray-800 text-gray-200 h-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* 装备图标 */}
          <div className="p-4">
            <div
              className={`w-14 h-14 border ${
                rarityBgColors[armor.rarity]
              } bg-gray-700 flex items-center justify-center text-xs`}
            >
              <div className="text-center">
                {armor.imageLabel.split(" ").map((word, index) => (
                  <div key={index}>{word}</div>
                ))}
              </div>
            </div>
          </div>

          {/* 装备信息 */}
          <div className="py-4 pr-4">
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-medium ${rarityColors[armor.rarity]}`}
              >
                {armor.name}
              </h3>
              {armor.level && (
                <span className="text-yellow-400 text-sm">
                  Level: {armor.level}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{armor.description}</p>
            <div className="text-gray-300 mt-1">
              {armorTypeLabels[armor.type]}
            </div>
          </div>
        </div>

        {/* 装备属性 */}
        {(armor.armor || armor.stats.length > 0) && (
          <div className="border-t border-gray-700 px-4 py-3">
            {armor.armor && (
              <div className="text-gray-300 mb-1">Armor: {armor.armor}</div>
            )}
            {armor.stats.map((stat, index) => (
              <div key={index} className="text-gray-300">
                +{stat.value} {stat.name}
              </div>
            ))}
          </div>
        )}

        {/* 装备效果 */}
        {armor.effect && (
          <div className="border-t border-gray-700 px-4 py-3 text-gray-300">
            {armor.effect}
          </div>
        )}

        {/* 制作材料 */}
        {armor.materials.length > 0 && (
          <div className="border-t border-gray-700 px-4 py-3">
            <div className="text-gray-400 text-sm">Craft Receipt</div>
            {armor.materials.map((material, index) => (
              <div key={index} className="text-gray-300">
                {material.name} x {material.quantity}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 特定类型装备列表组件
const ArmorTypeSection: React.FC<{
  title: string;
  armors: Armor[];
  type: ArmorType;
  description?: string;
}> = ({ title, armors, type, description }) => {
  const filteredArmors = armors.filter((armor) => armor.type === type);

  if (filteredArmors.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-2 text-orange-500">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArmors.map((armor) => (
          <ArmorCard key={armor.id} armor={armor} />
        ))}
      </div>
    </div>
  );
};

// 装备描述映射
const armorTypeDescriptions: Partial<Record<ArmorType, string>> = {
  ring: "Ring is a unique enhancement accessory that enhances your stats, grow your damage or gives unique effect like a life steal, enhances the efficiency of potions.",
  bag: "Equipping a Bag will increase your weight, and there are currently 3 bags you can use, 2 of which allow crafting and one of which you need to obtain through quest.",
  chestplate:
    "There are 3 different types of Chestplates in the Rune Slayer, Chest: Light, Chest: Medium and Chest: Heavy, for a combined total of 23 different chestplate",
};

// 主装备列表组件
const ArmorsList: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ArmorType | null>(null);
  const t = useTranslations("armors");

  // 根据所选类型筛选要显示的装备类型
  const filteredTypes: ArmorType[] = selectedType
    ? [selectedType]
    : ["ring", "bag", "chestplate", "back", "helmet", "boot", "sash"];

  return (
    <div className="container mx-auto px-4 py-8">
      <RaritySection />

      <h1 className="text-3xl font-bold mb-2">Rune Slayer Armor List</h1>
      <p className="text-gray-600 mb-4">
        There are 7 types of armors in Rune Slayer, check out the list of armors
        and crafting recipes!
      </p>

      <ArmorTypeNav
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {filteredTypes.map((type) => (
        <ArmorTypeSection
          key={type}
          title={`${armorTypeLabels[type]} Armor List`}
          armors={armorsData}
          type={type}
          description={armorTypeDescriptions[type]}
        />
      ))}
    </div>
  );
};

export default ArmorsList;
