"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

// 符文稀有度类型
type RuneRarity = "common" | "uncommon" | "rare" | "legendary" | "mythical";

// 符文类型
type RuneCategory = "regular" | "lesser" | "greater" | "utility";

// 符文属性类型
type RuneStat = {
  name: string;
  value: number | string;
  isPercentage?: boolean;
  isNegative?: boolean;
};

// 符文装备槽位类型
type RuneSlot = "weapon" | "chest" | "boots" | "helmet" | "any";

// 符文数据类型
type Rune = {
  id: string;
  name: string;
  description: string;
  category: RuneCategory;
  rarity: RuneRarity;
  stats: RuneStat[];
  slot?: RuneSlot;
  imageLabel: string;
  specialEffect?: string; // 添加特殊效果属性
  utilityEffect?: string; // 添加工具效果属性
};

// 稀有度颜色映射
const rarityColors: Record<RuneRarity, string> = {
  common: "text-gray-400",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  legendary: "text-purple-500",
  mythical: "text-orange-500",
};

const rarityBgColors: Record<RuneRarity, string> = {
  common: "border-gray-400",
  uncommon: "border-green-500",
  rare: "border-blue-500",
  legendary: "border-purple-500",
  mythical: "border-orange-500",
};

// 符文类型标签映射
const runeCategoryLabels: Record<RuneCategory, string> = {
  regular: "Runes",
  lesser: "Lesser Runes",
  greater: "Greater Runes",
  utility: "Utility Runes",
};

// 符文槽位名称映射
const slotLabels: Record<RuneSlot, string> = {
  weapon: "Weapon",
  chest: "Chest",
  boots: "Boots",
  helmet: "Helmet",
  any: "Any",
};

// Mock 数据
const runesData: Rune[] = [
  // 普通符文
  {
    id: "spirit-rune",
    name: "Spirit Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "regular",
    rarity: "rare",
    stats: [{ name: "Spirit", value: 6 }],
    imageLabel: "Spirit Rune",
  },
  {
    id: "agility-rune",
    name: "Agility Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "regular",
    rarity: "rare",
    stats: [{ name: "Agility", value: 6 }],
    imageLabel: "Agility Rune",
  },
  {
    id: "strength-rune",
    name: "Strength Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "regular",
    rarity: "rare",
    stats: [{ name: "Strength", value: 6 }],
    imageLabel: "Strength Rune",
  },
  {
    id: "intellect-rune",
    name: "Intellect Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "regular",
    rarity: "rare",
    stats: [{ name: "Intellect", value: 6 }],
    imageLabel: "Intellect Rune",
  },
  {
    id: "stamina-rune",
    name: "Stamina Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "regular",
    rarity: "rare",
    stats: [{ name: "Stamina", value: 2 }],
    imageLabel: "Stamina Rune",
  },

  // 次级符文
  {
    id: "lesser-stamina-rune",
    name: "Lesser Stamina Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "lesser",
    rarity: "uncommon",
    stats: [{ name: "Stamina", value: 1 }],
    imageLabel: "Lesser Stamina Rune",
  },
  {
    id: "lesser-strength-rune",
    name: "Lesser Strength Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "lesser",
    rarity: "uncommon",
    stats: [{ name: "Strength", value: 3 }],
    imageLabel: "Lesser Strength Rune",
  },
  {
    id: "lesser-intellect-rune",
    name: "Lesser Intellect Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "lesser",
    rarity: "uncommon",
    stats: [{ name: "Intellect", value: 3 }],
    imageLabel: "Lesser Intellect Rune",
  },
  {
    id: "lesser-agility-rune",
    name: "Lesser Agility Rune",
    description: "A lesser rune that can be infused onto gear at a blacksmith.",
    category: "lesser",
    rarity: "uncommon",
    stats: [{ name: "Agility", value: 3 }],
    imageLabel: "Lesser Agility Rune",
  },

  // 高级符文
  {
    id: "gralthar",
    name: "Gralthar",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 5 },
      { name: "Stamina", value: 3 },
      { name: "Physical Attack", value: 2, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Gralthar",
  },
  {
    id: "slime",
    name: "Slime",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Stamina", value: 1 },
    ],
    slot: "weapon",
    imageLabel: "Slime",
  },
  {
    id: "deer",
    name: "Deer",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Spirit", value: 3 },
      { name: "Stamina", value: 1 },
    ],
    slot: "boots",
    imageLabel: "Deer",
  },
  {
    id: "wolf",
    name: "Wolf",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Spirit", value: 1 },
      { name: "Agility", value: 6 },
      { name: "Stamina", value: 2 },
    ],
    slot: "boots",
    imageLabel: "Wolf",
  },
  {
    id: "spider-queen",
    name: "Spider Queen",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Spirit", value: 5 },
      { name: "Cast Time", value: 20 },
    ],
    slot: "weapon",
    imageLabel: "Spider Queen",
  },
  {
    id: "bear",
    name: "Bear",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 8 },
      { name: "Stamina", value: 2 },
      { name: "Magic Resistance", value: 2, isPercentage: true },
    ],
    slot: "boots",
    imageLabel: "Bear",
  },
  {
    id: "goblin",
    name: "Goblin",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 6 },
      { name: "Physical Pierce", value: 3, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Goblin",
  },
  {
    id: "panther",
    name: "Panther",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 8 },
      { name: "Stamina", value: 1 },
      { name: "Physical Pierce", value: 2, isPercentage: true },
    ],
    slot: "boots",
    imageLabel: "Panther",
  },
  {
    id: "rat",
    name: "Rat",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 4 },
      { name: "Spirit", value: 2 },
      { name: "Speed Boost", value: 1, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Rat",
  },
  {
    id: "black-ooze-slime",
    name: "Black Ooze Slime",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Magic Pierce", value: 2, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Black Ooze Slime",
  },
  {
    id: "banshee",
    name: "Banshee",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Spirit", value: 4 },
    ],
    slot: "boots",
    imageLabel: "Banshee",
  },
  {
    id: "mud-crab",
    name: "Mud Crab",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Armor", value: 100 },
      { name: "Stamina", value: 2 },
      { name: "Speed Boost", value: 1, isPercentage: true, isNegative: true },
      { name: "Magic Resistance", value: 3, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Mud Crab",
  },

  // 添加缺失的符文 - 从paste-2.txt中获取
  {
    id: "storm-caller",
    name: "Storm Caller",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Spirit", value: 5 },
      { name: "Magic Attack", value: 5, isPercentage: true },
    ],
    slot: "helmet",
    imageLabel: "Storm Caller",
    specialEffect:
      "Lightning skills have a chance to trigger additional lightning strikes during rainy weather",
  },
  {
    id: "basilisk",
    name: "Basilisk",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 5 },
      { name: "Spirit", value: 5 },
      { name: "Stamina", value: 2 },
    ],
    slot: "weapon",
    imageLabel: "Basilisk",
  },
  {
    id: "contractor",
    name: "Contractor",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 5 },
      { name: "Stealth", value: 35, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Contractor",
  },
  {
    id: "braelor",
    name: "Braelor",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 5 },
      { name: "Stamina", value: 3 },
      { name: "Physical Attack", value: 2, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Braelor",
  },
  {
    id: "boar",
    name: "Boar",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 4 },
      { name: "Stamina", value: 2 },
    ],
    slot: "helmet",
    imageLabel: "Boar",
  },
  {
    id: "hill-troll",
    name: "Hill Troll",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 8 },
      { name: "Stamina", value: 3 },
      { name: "Magic Resistance", value: 2, isPercentage: true },
      { name: "Holy Resistance", value: 2, isPercentage: true },
    ],
    slot: "boots",
    imageLabel: "Hill Troll",
  },
  {
    id: "serpent",
    name: "Serpent",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Spirit", value: 2 },
      { name: "Agility", value: 8 },
      { name: "Stamina", value: 1 },
    ],
    slot: "chest",
    imageLabel: "Serpent",
  },
  {
    id: "rat-king",
    name: "Rat King",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Magic Attack", value: 5, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Rat King",
  },
  {
    id: "spider",
    name: "Spider",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 5 },
      { name: "Physical Attack", value: 2, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Spider",
  },
  {
    id: "rune-golem",
    name: "Rune Golem",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Stamina", value: 3 },
      { name: "Holy Resistance", value: 2, isPercentage: true },
      { name: "Cooldown Reduction", value: 15, isPercentage: true },
    ],
    slot: "helmet",
    imageLabel: "Rune Golem",
  },
  {
    id: "purity",
    name: "Purity",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Spirit", value: 3 },
      { name: "Holy Attack", value: 2, isPercentage: true },
    ],
    slot: "boots",
    imageLabel: "Purity",
    specialEffect:
      "Healing skills also remove all negative status effects from the target",
  },
  {
    id: "lycanthar",
    name: "Lycanthar",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 8 },
      { name: "Intellect", value: -3 },
      { name: "Stamina", value: 3 },
      { name: "Magic Resistance", value: 5, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Lycanthar",
  },
  {
    id: "elder-treant",
    name: "Elder Treant",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 12 },
      { name: "Speed Boost", value: 1, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Elder Treant",
  },
  {
    id: "razor-fang",
    name: "Razor Fang",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Stamina", value: 5 },
      { name: "Magic Resistance", value: 5, isPercentage: true },
    ],
    slot: "boots",
    imageLabel: "Razor Fang",
  },
  {
    id: "king-mandrake",
    name: "King Mandrake",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 3 },
      { name: "Spirit", value: 5 },
      { name: "Focus", value: 10, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "King Mandrake",
  },
  {
    id: "fiend",
    name: "Fiend",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Stamina", value: 4 },
      { name: "Fire Resistance", value: 6, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Fiend",
  },
  {
    id: "ancient-demon",
    name: "Ancient Demon",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Stamina", value: 5 },
      { name: "Physical Attack", value: 5, isPercentage: true },
      { name: "Fire Resistance", value: 6, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Ancient Demon",
  },
  {
    id: "goblin-champion",
    name: "Goblin Champion",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 8 },
      { name: "Physical Attack", value: 3, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Goblin Champion",
  },
  {
    id: "dire-bear",
    name: "Dire Bear",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Stamina", value: 2 },
      { name: "Physical Pierce", value: 6, isPercentage: true },
    ],
    slot: "helmet",
    imageLabel: "Dire Bear",
  },
  {
    id: "amphithere",
    name: "Amphithere",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Agility", value: 5 },
      { name: "Speed Boost", value: 1, isPercentage: true },
    ],
    slot: "chest",
    imageLabel: "Amphithere",
  },
  {
    id: "imp",
    name: "Imp",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Intellect", value: 5 },
      { name: "Fire Attack", value: 5, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Imp",
  },
  {
    id: "crocodile",
    name: "Crocodile",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 2 },
      { name: "Stamina", value: 2 },
      { name: "Physical Pierce", value: 3, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Crocodile",
  },
  {
    id: "drogar",
    name: "Drogar",
    description:
      "A greater rune that can be infused onto gear at a blacksmith.",
    category: "greater",
    rarity: "legendary",
    stats: [
      { name: "Strength", value: 5 },
      { name: "Agility", value: 5 },
      { name: "Physical Pierce", value: 5, isPercentage: true },
    ],
    slot: "weapon",
    imageLabel: "Drogar",
  },

  // 添加工具类符文
  {
    id: "satanic-rune",
    name: "Satanic Rune",
    description:
      "Reforges equipment rune slots, but has a chance to destroy the equipment.",
    category: "utility",
    rarity: "legendary",
    stats: [],
    imageLabel: "Satanic Rune",
    utilityEffect:
      "Reconstruct equipment rune slots with a risk of destroying the item.",
  },
  {
    id: "angelic-rune",
    name: "Angelic Rune",
    description:
      "Safely removes runes from equipment (removed runes will be destroyed).",
    category: "utility",
    rarity: "legendary",
    stats: [],
    imageLabel: "Angelic Rune",
    utilityEffect:
      "Safely remove runes from equipment (removed runes will be destroyed).",
  },
  {
    id: "eidolon-rune",
    name: "Eidolon Rune",
    description:
      "Makes one piece of equipment inherit the appearance of another without changing its attributes.",
    category: "utility",
    rarity: "legendary",
    stats: [],
    imageLabel: "Eidolon Rune",
    utilityEffect:
      "Makes one piece of equipment inherit the appearance of another without changing its attributes.",
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

// 符文类型导航组件
const RuneTypeNav: React.FC<{
  selectedCategory: RuneCategory | null;
  onSelectCategory: (category: RuneCategory) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  const runeCategories: RuneCategory[] = ["regular", "lesser", "greater"];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {runeCategories.map((category) => (
        <button
          key={category}
          className={`py-2 px-6 ${
            selectedCategory === category
              ? "bg-amber-700 text-white"
              : "bg-amber-600/80 text-white hover:bg-amber-700"
          } rounded transition-colors`}
          onClick={() => onSelectCategory(category)}
        >
          {runeCategoryLabels[category]}
        </button>
      ))}
    </div>
  );
};

// 单个符文卡片组件
const RuneCard: React.FC<{ rune: Rune }> = ({ rune }) => {
  const labelParts = rune.imageLabel.split(" ");

  return (
    <Card className="bg-gray-800 text-gray-200 h-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* 符文图标 */}
          <div className="p-4">
            <div
              className={`w-14 h-14 border ${
                rarityBgColors[rune.rarity]
              }bg-white flex items-center justify-center text-xs`}
            >
              <div className="text-center">
                {labelParts.map((part, index) => (
                  <div key={index}>{part}</div>
                ))}
              </div>
            </div>
          </div>

          {/* 符文信息 */}
          <div className="py-4 pr-4">
            <h3 className={`text-lg font-medium ${rarityColors[rune.rarity]}`}>
              {rune.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{rune.description}</p>
            {rune.slot && (
              <div className="text-gray-300 mt-1">
                Rune Slot: {slotLabels[rune.slot]}
              </div>
            )}
          </div>
        </div>

        {/* 符文属性 */}
        <div className="border-t border-gray-700 px-4 py-3">
          {rune.stats.map((stat, index) => (
            <div key={index} className="text-gray-300">
              {stat.isNegative ? "-" : "+"}
              {stat.value}
              {stat.isPercentage ? "%" : ""} {stat.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 符文类型部分组件
const RuneTypeSection: React.FC<{
  title: string;
  runes: Rune[];
  category: RuneCategory;
  description?: string;
}> = ({ title, runes, category, description }) => {
  const filteredRunes = runes.filter((rune) => rune.category === category);

  if (filteredRunes.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRunes.map((rune) => (
          <RuneCard key={rune.id} rune={rune} />
        ))}
      </div>
    </div>
  );
};

// 符文描述映射
const runeCategoryDescriptions: Record<RuneCategory, string> = {
  regular:
    "Runes are mostly Rare level runes that can be set on any type of Weapon / Armor and are dropped by killing any Mobs.",
  lesser:
    "Runes are mostly Uncommon level runes that can be set on any type of Weapon / Armor and are dropped by killing any Mobs, providing only limited bonuses.",
  greater:
    "Greater Runes are the best runes in the game and they need to be dropped by killing specific Mobs or Bosses. In addition to boosting your Stats, some Greater Runes offer additional effects!",
  utility:
    "Utility Runes provide special functions rather than stat bonuses. They can be used to modify or enhance your equipment in unique ways.",
};

// 主符文列表组件
const RunesList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RuneCategory | null>(
    null
  );
  const t = useTranslations("runes");

  // 根据所选类型筛选要显示的符文类型
  const filteredCategories: RuneCategory[] = selectedCategory
    ? [selectedCategory]
    : ["regular", "lesser", "greater"];

  return (
    <div className="container mx-auto px-4 py-8">
      <RaritySection />

      <h1 className="text-3xl font-bold mb-2">Rune Slayer Rune List</h1>
      <p className="text-gray-600 mb-4">
        There are 3 types of armors in Rune Slayer, check out the list of armors
        and crafting recipes!
      </p>

      <RuneTypeNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredCategories.map((category) => (
        <RuneTypeSection
          key={category}
          title={runeCategoryLabels[category]}
          runes={runesData}
          category={category}
          description={runeCategoryDescriptions[category]}
        />
      ))}
    </div>
  );
};

export default RunesList;
