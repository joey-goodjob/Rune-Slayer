"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

// 武器稀有度类型
type WeaponRarity = "common" | "uncommon" | "rare" | "legendary" | "mythical";

// 武器类型
type WeaponType =
  | "staff"
  | "shield"
  | "gauntlet"
  | "bow"
  | "sword"
  | "dagger"
  | "greatsword"
  | "greataxe"
  | "spear";

// 武器材料类型
type WeaponMaterial = {
  name: string;
  quantity: number;
};

// 武器属性类型
type WeaponStat = {
  name: string;
  value: number;
  isPercentage?: boolean;
};

// 武器数据类型
type Weapon = {
  id: string;
  name: string;
  description: string;
  type: WeaponType;
  rarity: WeaponRarity;
  level?: number;
  physicalDamage?: number;
  armor?: number;
  stats: WeaponStat[];
  effect?: string;
  materials: WeaponMaterial[];
  imageLabel: string;
};

// 稀有度颜色映射
const rarityColors: Record<WeaponRarity, string> = {
  common: "text-gray-400",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  legendary: "text-purple-500",
  mythical: "text-orange-500",
};

const rarityBgColors: Record<WeaponRarity, string> = {
  common: "border-gray-400",
  uncommon: "border-green-500",
  rare: "border-blue-500",
  legendary: "border-purple-500",
  mythical: "border-orange-500",
};

// 武器类型标签映射
const weaponTypeLabels: Record<WeaponType, string> = {
  staff: "Staff",
  shield: "Shield",
  gauntlet: "Gauntlet",
  bow: "Bow",
  sword: "Sword",
  dagger: "Dagger",
  greatsword: "Greatsword",
  greataxe: "Greataxe",
  spear: "Spear",
};

// Mock 数据
const weaponsData: Weapon[] = [
  // Staff 类型武器
  {
    id: "oak-staff",
    name: "Oak Staff",
    description: "A staff made from Oak planks.",
    type: "staff",
    rarity: "common",
    physicalDamage: 4,
    stats: [{ name: "Intellect", value: 4 }],
    materials: [{ name: "Oak Log", quantity: 4 }],
    imageLabel: "Oak Staff",
  },
  {
    id: "root-staff",
    name: "Root Staff",
    description:
      "A root taken from the Mandrake king, imbued with magical properties.",
    type: "staff",
    rarity: "uncommon",
    level: 10,
    physicalDamage: 8,
    stats: [{ name: "Intellect", value: 10 }],
    materials: [],
    imageLabel: "Root Staff",
  },
  {
    id: "slime-staff",
    name: "Slime Staff",
    description: "A wooden stick soaked in slime.",
    type: "staff",
    rarity: "uncommon",
    level: 16,
    physicalDamage: 8,
    stats: [{ name: "Intellect", value: 12 }],
    effect:
      "Your melee attacks on poisoned enemies restore a portion of your health.",
    materials: [
      { name: "Slime Core", quantity: 1 },
      { name: "Slime Chunk", quantity: 4 },
      { name: "Pine Log", quantity: 2 },
    ],
    imageLabel: "Slime Staff",
  },
  {
    id: "lakewood-staff",
    name: "Lakewood Staff",
    description: "A staff made from lakewood.",
    type: "staff",
    rarity: "uncommon",
    level: 27,
    physicalDamage: 10,
    stats: [{ name: "Intellect", value: 16 }],
    materials: [
      { name: "Lakewood Log", quantity: 4 },
      { name: "Platinum Bar", quantity: 2 },
    ],
    imageLabel: "Lakewood Staff",
  },
  {
    id: "spectre-staff",
    name: "Spectre Staff",
    description: "A staff imbued with ectoplasm.",
    type: "staff",
    rarity: "legendary",
    level: 31,
    physicalDamage: 10,
    stats: [
      { name: "Intellect", value: 14 },
      { name: "Spirit", value: 8 },
    ],
    effect: "Chance on hit to fire a spectre bolt at your enemy.",
    materials: [
      { name: "Ectoplasm", quantity: 4 },
      { name: "Pine Log", quantity: 4 },
    ],
    imageLabel: "Spectre Staff",
  },
  {
    id: "imp-staff",
    name: "Imp Staff",
    description: "A staff made from the parts of demons.",
    type: "staff",
    rarity: "legendary",
    level: 35,
    physicalDamage: 10,
    stats: [
      { name: "Intellect", value: 16 },
      { name: "Spirit", value: 8 },
      { name: "Fire Attack", value: 10, isPercentage: true },
    ],
    materials: [
      { name: "Imp Tail", quantity: 1 },
      { name: "Demon Claw", quantity: 2 },
      { name: "Elderwood Log", quantity: 4 },
    ],
    imageLabel: "Imp Staff",
  },
  {
    id: "king-slime-staff",
    name: "King Slime Staff",
    description: "A royal staff soaked in slime.",
    type: "staff",
    rarity: "legendary",
    level: 35,
    physicalDamage: 11,
    stats: [
      { name: "Intellect", value: 23 },
      { name: "Spirit", value: 2 },
    ],
    effect:
      "Your melee attacks on poisoned enemies restore a portion of your health.",
    materials: [
      { name: "Gold Bar", quantity: 1 },
      { name: "Slime Core", quantity: 10 },
      { name: "Slime Staff", quantity: 1 },
    ],
    imageLabel: "King Slime Staff",
  },
  {
    id: "arachnids-staff",
    name: "Arachnids Staff",
    description: "A weapon made from numerous spider parts.",
    type: "staff",
    rarity: "legendary",
    level: 40,
    physicalDamage: 11,
    stats: [
      { name: "Intellect", value: 26 },
      { name: "Spirit", value: 4 },
      { name: "MagicCritChance", value: 1, isPercentage: true },
    ],
    effect: "Chance on magic hit to summon a pool of venom beneath the target.",
    materials: [
      { name: "Spider Staff", quantity: 1 },
      { name: "Spider Gem", quantity: 1 },
      { name: "Ashwood Log", quantity: 2 },
    ],
    imageLabel: "Arachnids Staff",
  },

  // Shield 类型武器
  {
    id: "splinted-shield",
    name: "Splinted Shield",
    description: "A shield taken from a goblin.",
    type: "shield",
    rarity: "uncommon",
    level: 10,
    armor: 46,
    stats: [{ name: "Posture", value: 8 }],
    materials: [
      { name: "Splint", quantity: 2 },
      { name: "Pine Log", quantity: 2 },
      { name: "Iron Bar", quantity: 4 },
    ],
    imageLabel: "Splinted Shield",
  },
  {
    id: "slime-shield",
    name: "Slime Shield",
    description: "A chunk of slime shaped into a shield.",
    type: "shield",
    rarity: "uncommon",
    level: 16,
    armor: 67,
    stats: [{ name: "Posture", value: 10 }],
    effect: "On block, the attacker accumulates poison buildup.",
    materials: [
      { name: "Slime Core", quantity: 1 },
      { name: "Slime Chunk", quantity: 4 },
    ],
    imageLabel: "Slime Shield",
  },
  {
    id: "silver-shield",
    name: "Silver Shield",
    description: "A silver shield.",
    type: "shield",
    rarity: "rare",
    level: 17,
    armor: 35,
    stats: [{ name: "Posture", value: 15 }],
    materials: [
      { name: "Silver Bar", quantity: 4 },
      { name: "Elderwood Log", quantity: 2 },
    ],
    imageLabel: "Silver Shield",
  },
  {
    id: "platinum-shield",
    name: "Platinum Shield",
    description: "A platinum shield.",
    type: "shield",
    rarity: "legendary",
    level: 27,
    armor: 50,
    stats: [{ name: "Posture", value: 20 }],
    materials: [
      { name: "Platinum Bar", quantity: 4 },
      { name: "Lakewood Log", quantity: 2 },
    ],
    imageLabel: "Platinum Shield",
  },
  {
    id: "elder-shield",
    name: "Elder Shield",
    description: "An old wooden shield, made from the finest wood.",
    type: "shield",
    rarity: "legendary",
    level: 35,
    armor: 100,
    stats: [
      { name: "Spirit", value: 5 },
      { name: "Stamina", value: 5 },
      { name: "Posture", value: 20 },
    ],
    materials: [
      { name: "Elder Vine", quantity: 1 },
      { name: "Elder Greatwood", quantity: 2 },
      { name: "Ashwood Log", quantity: 2 },
    ],
    imageLabel: "Elder Shield",
  },
  {
    id: "lanzas-merit",
    name: "Lanza's Merit",
    description: "A massive stone shield socketed with a sapphire.",
    type: "shield",
    rarity: "mythical",
    level: 40,
    armor: 235,
    stats: [
      { name: "Magic Resistance", value: 8, isPercentage: true },
      { name: "Posture", value: 20 },
    ],
    materials: [],
    imageLabel: "Lanza's Merit",
  },

  // Gauntlet 类型武器
  {
    id: "light-leather-gloves",
    name: "Light Leather Gloves",
    description: "Gloves made from leather.",
    type: "gauntlet",
    rarity: "common",
    physicalDamage: 4,
    stats: [],
    materials: [],
    imageLabel: "Light Leather Gloves",
  },
  {
    id: "medium-leather-gloves",
    name: "Medium Leather Gloves",
    description: "Gloves made from leather.",
    type: "gauntlet",
    rarity: "common",
    level: 8,
    physicalDamage: 6,
    stats: [],
    materials: [{ name: "Medium Leather", quantity: 4 }],
    imageLabel: "Medium Leather Gloves",
  },
  {
    id: "bear-claws",
    name: "Bear Claws",
    description: "Claws from a bear.",
    type: "gauntlet",
    rarity: "uncommon",
    level: 14,
    physicalDamage: 9,
    stats: [
      { name: "Strength", value: 4 },
      { name: "Spirit", value: 4 },
    ],
    materials: [
      { name: "Bear Claw", quantity: 2 },
      { name: "Pine Log", quantity: 2 },
      { name: "Medium Leather", quantity: 2 },
    ],
    imageLabel: "Bear Claws",
  },
  {
    id: "heavy-leather-gloves",
    name: "Heavy Leather Gloves",
    description: "Gloves made from leather.",
    type: "gauntlet",
    rarity: "uncommon",
    level: 17,
    physicalDamage: 8,
    stats: [],
    materials: [{ name: "Heavy Leather", quantity: 4 }],
    imageLabel: "Heavy Leather Gloves",
  },
  {
    id: "panther-claws",
    name: "Panther Claws",
    description: "Claws from a panther.",
    type: "gauntlet",
    rarity: "rare",
    level: 23,
    physicalDamage: 11,
    stats: [
      { name: "Strength", value: 7 },
      { name: "Spirit", value: 4 },
    ],
    materials: [
      { name: "Panther Claw", quantity: 4 },
      { name: "Heavy Leather", quantity: 4 },
    ],
    imageLabel: "Panther Claws",
  },
  {
    id: "thick-leather-gloves",
    name: "Thick Leather Gloves",
    description: "Gloves made from leather.",
    type: "gauntlet",
    rarity: "rare",
    level: 27,
    physicalDamage: 10,
    stats: [],
    materials: [{ name: "Thick Leather", quantity: 4 }],
    imageLabel: "Thick Leather Gloves",
  },
  {
    id: "demon-gauntlets",
    name: "Demon Gauntlets",
    description: "Gauntlets made from demon parts.",
    type: "gauntlet",
    rarity: "legendary",
    level: 35,
    physicalDamage: 9,
    stats: [
      { name: "Fire Damage", value: 2 },
      { name: "Strength", value: 10 },
    ],
    materials: [
      { name: "Demon Hide", quantity: 4 },
      { name: "Demon Claw", quantity: 2 },
      { name: "Thick Leather", quantity: 4 },
    ],
    imageLabel: "Demon Gauntlets",
  },
  {
    id: "elder-gauntlets",
    name: "Elder Gauntlets",
    description: "Old wooden gauntlets, made from the finest wood.",
    type: "gauntlet",
    rarity: "legendary",
    level: 35,
    physicalDamage: 13,
    stats: [
      { name: "Strength", value: 19 },
      { name: "Spirit", value: 10 },
    ],
    materials: [
      { name: "Elder Vine", quantity: 1 },
      { name: "Elder Greatwood", quantity: 2 },
      { name: "Demon Hide", quantity: 2 },
    ],
    imageLabel: "Elder Gauntlets",
  },
  {
    id: "dire-bear-gloves",
    name: "Dire Bear Gloves",
    description: "Gloves made out of the parts of a Dire Bear.",
    type: "gauntlet",
    rarity: "legendary",
    level: 40,
    physicalDamage: 12,
    stats: [
      { name: "Strength", value: 15 },
      { name: "Stamina", value: 2 },
    ],
    effect: "The more hungry you are the bigger the physical damage buff.",
    materials: [
      { name: "Dire Bear Claw", quantity: 2 },
      { name: "Dire Bear Hide", quantity: 4 },
    ],
    imageLabel: "Dire Bear Gloves",
  },
];

// 稀有度说明组件
const RaritySection: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Weapon Rarity for Rune Slayer</h1>
      <p className="mb-2">
        In the game, weapons are divided into 5 different rarities, which are
        defined by the color of their names, which are:
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-gray-400">Common</span>
        <span>,</span>
        <span className="text-green-500">Uncommon</span>
        <span>,</span>
        <span className="text-blue-500">Rare</span>
        <span>,</span>
        <span className="text-purple-500">Legendary</span>
        <span>,</span>
        <span className="text-orange-500">Mythical</span>
      </div>
    </div>
  );
};

// 武器类型导航组件
const WeaponTypeNav: React.FC<{ weaponTypes: WeaponType[] }> = ({
  weaponTypes,
}) => {
  const scrollToSection = (type: string) => {
    const element = document.getElementById(`${type}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {weaponTypes.map((type) => (
        <button
          key={type}
          onClick={() => scrollToSection(type)}
          className="py-2 px-6 bg-amber-600/80 text-white hover:bg-amber-700 rounded transition-colors"
        >
          {weaponTypeLabels[type]}
        </button>
      ))}
    </div>
  );
};

// 单个武器卡片组件
const WeaponCard: React.FC<{ weapon: Weapon }> = ({ weapon }) => {
  const labelParts = weapon.imageLabel.split(" ");

  return (
    <Card className="bg-gray-800 text-gray-200 h-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* 武器图标 */}
          <div className="p-4">
            <div
              className={`w-14 h-14 border ${
                rarityBgColors[weapon.rarity]
              } bg-gray-700 flex items-center justify-center text-xs`}
            >
              <div className="text-center">
                {labelParts.map((part, index) => (
                  <div key={index}>{part}</div>
                ))}
              </div>
            </div>
          </div>

          {/* 武器信息 */}
          <div className="py-4 pr-4">
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-medium ${rarityColors[weapon.rarity]}`}
              >
                {weapon.name}
              </h3>
              {weapon.level && (
                <span className="text-yellow-400 text-sm">
                  Level: {weapon.level}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{weapon.description}</p>
          </div>
        </div>

        {/* 武器属性 */}
        <div className="border-t border-gray-700 px-4 py-3">
          {weapon.physicalDamage && (
            <div className="text-gray-300 mb-1">
              Physical Damage: {weapon.physicalDamage}
            </div>
          )}
          {weapon.armor && (
            <div className="text-gray-300 mb-1">Armor: {weapon.armor}</div>
          )}
          {weapon.stats.map((stat, index) => (
            <div key={index} className="text-gray-300">
              +{stat.value}
              {stat.isPercentage ? "%" : ""} {stat.name}
            </div>
          ))}
        </div>

        {/* 武器效果 */}
        {weapon.effect && (
          <div className="border-t border-gray-700 px-4 py-3 text-gray-300">
            {weapon.effect}
          </div>
        )}

        {/* 制作材料 */}
        {weapon.materials.length > 0 && (
          <div className="border-t border-gray-700 px-4 py-3">
            <div className="text-gray-400 text-sm">Craft Receipt</div>
            {weapon.materials.map((material, index) => (
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

// 武器类型部分组件
const WeaponTypeSection: React.FC<{
  title: string;
  weapons: Weapon[];
  type: WeaponType;
  description?: string;
}> = ({ title, weapons, type, description }) => {
  const filteredWeapons = weapons.filter((weapon) => weapon.type === type);

  if (filteredWeapons.length === 0) {
    return null;
  }

  return (
    <div id={`${type}-section`} className="my-8 scroll-mt-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWeapons.map((weapon) => (
          <WeaponCard key={weapon.id} weapon={weapon} />
        ))}
      </div>
      <div className="text-center mt-4">
        <a
          href="#top"
          className="text-blue-500 hover:text-blue-600 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to Top
        </a>
      </div>
    </div>
  );
};

// 武器类型描述映射
const weaponTypeDescriptions: Partial<Record<WeaponType, string>> = {
  staff: "There are currently 8 different Staff weapons in Rune Slayer.",
  shield: "There are currently 6 different Shield weapons in Rune Slayer.",
  gauntlet: "There are currently 9 different Staff weapons in Rune Slayer.",
};

// 主武器列表组件
const WeaponsList: React.FC = () => {
  const t = useTranslations("weapons");
  const topRef = useRef<HTMLDivElement>(null);

  // 可用的武器类型
  const weaponTypes: WeaponType[] = [
    "staff",
    "shield",
    "gauntlet",
    "bow",
    "sword",
    "dagger",
    "greatsword",
    "greataxe",
    "spear",
  ];

  // 过滤掉没有数据的武器类型
  const availableTypes = weaponTypes.filter((type) =>
    weaponsData.some((weapon) => weapon.type === type)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div id="top" ref={topRef}></div>
      <RaritySection />

      <h1 className="text-3xl font-bold mb-2">Rune Slayer Weapon List</h1>
      <p className="text-gray-600 mb-4">
        There are 9 types of weapons in Rune Slayer, check out the list of
        weapons and crafting recipes!
      </p>

      <WeaponTypeNav weaponTypes={availableTypes} />

      {availableTypes.map((type) => (
        <WeaponTypeSection
          key={type}
          title={`${weaponTypeLabels[type]} Weapon List`}
          weapons={weaponsData}
          type={type}
          description={weaponTypeDescriptions[type]}
        />
      ))}
    </div>
  );
};

export default WeaponsList;
