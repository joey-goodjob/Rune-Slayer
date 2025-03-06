"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define rune data types
interface Rune {
  name: string;
  chineseName: string;
  effects?: string[];
  effect?: string;
  slot?: string;
  specialEffect?: string;
}

interface RuneCategory {
  name: string;
  chineseName: string;
  description: string;
  rarity?: string;
  runes: Rune[];
}

interface RuneData {
  title: string;
  description: string;
  raritySystem: string[];
  runeCategories: RuneCategory[];
}

// Hardcoded rune data
const RUNE_DATA: RuneData = {
  title: "Rune Slayer符文系统全解",
  description:
    "符文系统是Rune Slayer游戏中的核心强化机制，玩家可通过将不同符文镶嵌至武器或防具上，获得各种属性提升与特殊效果。",
  raritySystem: [
    "普通(Common)",
    "非凡(Uncommon)",
    "稀有(Rare)",
    "传说(Legendary)",
    "神话(Mythical)",
  ],
  runeCategories: [
    {
      name: "基础符文",
      chineseName: "基础符文",
      rarity: "Rare",
      description:
        "基础符文多为稀有级别，可通过击杀一般怪物获取，适用于任何装备类型。",
      runes: [
        {
          name: "Spirit Rune",
          chineseName: "精神符文",
          effects: ["+6精神"],
        },
        {
          name: "Agility Rune",
          chineseName: "敏捷符文",
          effects: ["+6敏捷"],
        },
        {
          name: "Strength Rune",
          chineseName: "力量符文",
          effects: ["+6力量"],
        },
        {
          name: "Intellect Rune",
          chineseName: "智力符文",
          effects: ["+6智力"],
        },
        {
          name: "Stamina Rune",
          chineseName: "耐力符文",
          effects: ["+2耐力"],
        },
      ],
    },
    {
      name: "Lesser Runes",
      chineseName: "初级符文",
      rarity: "Uncommon",
      description:
        "初级符文通常为非凡级别，同样可通过击杀普通怪物获得，但提供的属性加成较为有限。",
      runes: [
        {
          name: "Lesser Stamina Rune",
          chineseName: "初级耐力符文",
          effects: ["+1耐力"],
        },
        {
          name: "Lesser Strength Rune",
          chineseName: "初级力量符文",
          effects: ["+3力量"],
        },
        {
          name: "Lesser Intellect Rune",
          chineseName: "初级智力符文",
          effects: ["+3智力"],
        },
        {
          name: "Lesser Agility Rune",
          chineseName: "初级敏捷符文",
          effects: ["+3敏捷"],
        },
      ],
    },
    {
      name: "Greater Runes",
      chineseName: "高级符文",
      rarity: "Various",
      description:
        "作为游戏中最珍贵的符文类型，高级符文需要通过击杀特定强敌或首领才能获得。这类符文不仅提供更丰厚的属性提升，部分还拥有独特的战斗效果。",
      runes: [
        {
          name: "Gralthar",
          chineseName: "格拉萨尔符文",
          slot: "胸甲",
          effects: ["敏捷+5", "耐力+3", "物理攻击力+2%"],
        },
        {
          name: "Slime",
          chineseName: "史莱姆符文",
          slot: "武器",
          effects: ["智力+5", "耐力+1"],
        },
        {
          name: "Deer",
          chineseName: "鹿灵符文",
          slot: "靴子",
          effects: ["精神+3", "耐力+1"],
        },
        {
          name: "Wolf",
          chineseName: "狼魂符文",
          slot: "靴子",
          effects: ["精神+1", "敏捷+6", "耐力+2"],
        },
        {
          name: "Spider Queen",
          chineseName: "蛛后符文",
          slot: "武器",
          effects: ["智力+5", "精神+5", "施法速度+20"],
        },
        {
          name: "Bear",
          chineseName: "熊怒符文",
          slot: "靴子",
          effects: ["力量+8", "耐力+2", "魔法抗性+2%"],
        },
        {
          name: "Goblin",
          chineseName: "哥布林符文",
          slot: "武器",
          effects: ["敏捷+6", "物理穿透+3%"],
        },
        {
          name: "Panther",
          chineseName: "黑豹符文",
          slot: "靴子",
          effects: ["敏捷+8", "耐力+1", "物理穿透+2%"],
        },
        {
          name: "Rat",
          chineseName: "鼠符符文",
          slot: "胸甲",
          effects: ["智力+4", "精神+2", "移动速度+1%"],
        },
        {
          name: "Black Ooze Slime",
          chineseName: "黑液符文",
          slot: "武器",
          effects: ["智力+5", "魔法穿透+2%"],
        },
        {
          name: "Banshee",
          chineseName: "哀嚎符文",
          slot: "靴子",
          effects: ["智力+5", "精神+4"],
        },
        {
          name: "Mud Crab",
          chineseName: "泥蟹符文",
          slot: "胸甲",
          effects: ["护甲值+100", "耐力+2", "移动速度-1%", "魔法抗性+3%"],
        },
        {
          name: "Storm Caller",
          chineseName: "风暴使者符文",
          slot: "头盔",
          effects: ["精神+5", "魔法攻击+5%"],
          specialEffect: "雨天时，闪电类技能有几率触发额外的闪电打击",
        },
        {
          name: "Basilisk",
          chineseName: "蜥蜴王符文",
          slot: "武器",
          effects: ["力量+5", "精神+5", "耐力+2"],
        },
        {
          name: "Contractor",
          chineseName: "契约者符文",
          slot: "武器",
          effects: ["敏捷+5", "潜行效果+35%"],
        },
        {
          name: "Braelor",
          chineseName: "布雷洛尔符文",
          slot: "胸甲",
          effects: ["力量+5", "耐力+3", "物理攻击+2%"],
        },
        {
          name: "Boar",
          chineseName: "野猪符文",
          slot: "头盔",
          effects: ["力量+4", "耐力+2"],
        },
        {
          name: "Hill Troll",
          chineseName: "山岭巨魔符文",
          slot: "靴子",
          effects: ["力量+8", "耐力+3", "魔法抗性+2%", "神圣抗性+2%"],
        },
        {
          name: "Serpent",
          chineseName: "蛇灵符文",
          slot: "胸甲",
          effects: ["精神+2", "敏捷+8", "耐力+1"],
        },
        {
          name: "Rat King",
          chineseName: "鼠王符文",
          slot: "武器",
          effects: ["智力+5", "魔法攻击+5%"],
        },
        {
          name: "Spider",
          chineseName: "蜘蛛符文",
          slot: "武器",
          effects: ["敏捷+5", "物理攻击+2%"],
        },
        {
          name: "Rune Golem",
          chineseName: "符文守卫符文",
          slot: "头盔",
          effects: ["耐力+3", "神圣抗性+2%", "技能冷却减少+15%"],
        },
        {
          name: "Purity",
          chineseName: "纯净符文",
          slot: "靴子",
          effects: ["精神+3", "神圣攻击+2%"],
          specialEffect: "治疗技能同时清除目标身上的所有负面状态",
        },
        {
          name: "Lycanthar",
          chineseName: "狼人符文",
          slot: "胸甲",
          effects: ["力量+8", "智力-3", "耐力+3", "魔法抗性+5%"],
        },
        {
          name: "Elder Treant",
          chineseName: "古树符文",
          slot: "武器",
          effects: ["敏捷+12", "移动速度+1%"],
        },
        {
          name: "Razor Fang",
          chineseName: "锋牙符文",
          slot: "靴子",
          effects: ["耐力+5", "魔法抗性+5%"],
        },
        {
          name: "King Mandrake",
          chineseName: "曼德拉草王符文",
          slot: "胸甲",
          effects: ["智力+3", "精神+5", "专注度+10%"],
        },
        {
          name: "Fiend",
          chineseName: "魔灵符文",
          slot: "胸甲",
          effects: ["耐力+4", "火焰抗性+6%"],
        },
        {
          name: "Ancient Demon",
          chineseName: "远古恶魔符文",
          slot: "胸甲",
          effects: ["耐力+5", "物理攻击+5%", "火焰抗性+6%"],
        },
        {
          name: "Goblin Champion",
          chineseName: "哥布林勇士符文",
          slot: "武器",
          effects: ["力量+8", "物理攻击+3%"],
        },
        {
          name: "Dire Bear",
          chineseName: "巨熊符文",
          slot: "头盔",
          effects: ["耐力+2", "物理穿透+6%"],
        },
        {
          name: "Amphithere",
          chineseName: "双翼龙符文",
          slot: "胸甲",
          effects: ["敏捷+5", "移动速度+1%"],
        },
        {
          name: "Imp",
          chineseName: "小恶魔符文",
          slot: "武器",
          effects: ["智力+5", "火焰攻击+5%"],
        },
        {
          name: "Crocodile",
          chineseName: "鳄鱼符文",
          slot: "武器",
          effects: ["力量+2", "耐力+2", "物理穿透+3%"],
        },
        {
          name: "Drogar",
          chineseName: "德罗加尔符文",
          slot: "武器",
          effects: ["力量+5", "敏捷+5", "物理穿透+5%"],
        },
      ],
    },
    {
      name: "Utility Runes",
      chineseName: "工具性符文",
      description: "除了提供属性加成的符文外，游戏还提供几种特殊功能符文",
      runes: [
        {
          name: "Satanic Rune",
          chineseName: "撒旦符文",
          effect: "重构装备符文插槽，但有一定几率摧毁该装备。",
        },
        {
          name: "Angelic Rune",
          chineseName: "天使符文",
          effect: "安全移除装备上的符文(被移除的符文将消失)。",
        },
        {
          name: "Eidolon Rune",
          chineseName: "幻影符文",
          effect: "使一件装备继承另一件装备的外观，不改变属性。",
        },
      ],
    },
  ],
};

// Get rune icon/placeholder image
const getRuneIcon = (categoryName: string, runeName: string): string => {
  return `/runes/${categoryName.toLowerCase()}/${runeName
    .toLowerCase()
    .replace(" ", "-")}.png`;
};

// Handle rarity badge variant
const getRarityVariant = (
  rarity: string
): "default" | "destructive" | "outline" | "secondary" => {
  switch (rarity) {
    case "Mythical":
      return "destructive";
    case "Legendary":
      return "default";
    case "Rare":
      return "secondary";
    default:
      return "outline";
  }
};

// Page component
export default function RunesPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Monitor scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll handlers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(
      `category-${categoryName.toLowerCase()}`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedCategory(categoryName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{RUNE_DATA.title}</h1>
          <p className="text-lg text-muted-foreground">
            {RUNE_DATA.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {RUNE_DATA.runeCategories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategory === category.name ? "default" : "outline"
              }
              onClick={() => scrollToCategory(category.name)}
            >
              {category.chineseName}
            </Button>
          ))}
        </div>

        {/* Rarity System */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>符文品质系统</CardTitle>
            <CardDescription>
              Rune Slayer中的符文按照品质划分为以下几个等级
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {RUNE_DATA.raritySystem.map((rarity, index) => (
                <Badge
                  key={rarity}
                  variant={
                    index === 4
                      ? "destructive"
                      : index === 3
                      ? "default"
                      : "outline"
                  }
                >
                  {rarity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rune Categories */}
        <div className="space-y-12">
          {RUNE_DATA.runeCategories.map((category) => (
            <section
              key={category.name}
              id={`category-${category.name.toLowerCase()}`}
              className="scroll-mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {category.chineseName} ({category.name})
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                  {category.rarity && (
                    <Badge variant={getRarityVariant(category.rarity)}>
                      {category.rarity} 品质
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.runes.map((rune: Rune) => (
                      <Card key={rune.name} className="overflow-hidden">
                        <CardHeader className="bg-secondary">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-card rounded-full overflow-hidden border-2 border-background">
                              <img
                                src={getRuneIcon(category.name, rune.name)}
                                alt={rune.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/api/placeholder/64/64";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-bold">{rune.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {rune.chineseName}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Slot badge */}
                            {rune.slot && (
                              <Badge variant="outline">
                                适用部位: {rune.slot}
                              </Badge>
                            )}

                            {/* Effects */}
                            {rune.effects && (
                              <div>
                                <h4 className="font-semibold mb-2">属性效果</h4>
                                <ul className="space-y-1">
                                  {rune.effects.map(
                                    (effect: string, index: number) => (
                                      <li
                                        key={index}
                                        className="text-sm flex items-center"
                                      >
                                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                        {effect}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Single effect (for utility runes) */}
                            {rune.effect && (
                              <div>
                                <h4 className="font-semibold mb-2">特殊效果</h4>
                                <p className="text-sm">{rune.effect}</p>
                              </div>
                            )}

                            {/* Special effect */}
                            {rune.specialEffect && (
                              <div>
                                <h4 className="font-semibold mb-2">额外效果</h4>
                                <p className="text-sm">{rune.specialEffect}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card text-card-foreground py-8 border-t mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>© 2025 Rune Slayer Unofficial Rune Guide</p>
            <p className="mt-2 text-muted-foreground">
              This website is not affiliated with Rune Slayer game developers
              and is for reference only.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollButton && (
        <Button
          className="fixed bottom-8 right-8 rounded-full p-3"
          size="icon"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
}
