import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

// 工具类型定义
type ToolMaterial = {
  name: string;
  quantity: number;
};

type Tool = {
  id: string;
  name: string;
  description: string;
  level: number;
  damage: number;
  type: "axe" | "sickle" | "pickaxe" | "lantern" | "fishing-rod";
  materials: ToolMaterial[];
  color: string;
  stats?: string; // 为灯笼和钓鱼竿添加可选的 stats 属性
};

// Mock 数据
const toolsData: Tool[] = [
  // Axe tools
  {
    id: "copper-axe",
    name: "Copper Axe",
    description: "Used for cutting through tough tree trunks.",
    level: 1,
    damage: 5,
    type: "axe",
    materials: [
      { name: "Copper Bar", quantity: 2 },
      { name: "Oak Log", quantity: 1 },
    ],
    color: "bg-amber-700",
  },
  {
    id: "iron-axe",
    name: "Iron Axe",
    description: "Used for cutting through tough tree trunks.",
    level: 8,
    damage: 10,
    type: "axe",
    materials: [
      { name: "Iron Bar", quantity: 2 },
      { name: "Pine Log", quantity: 1 },
    ],
    color: "bg-gray-500",
  },
  {
    id: "silver-axe",
    name: "Silver Axe",
    description: "Used for cutting through tough tree trunks.",
    level: 17,
    damage: 15,
    type: "axe",
    materials: [
      { name: "Silver Bar", quantity: 2 },
      { name: "Elderwood Log", quantity: 1 },
    ],
    color: "bg-slate-300",
  },
  {
    id: "platinum-axe",
    name: "Platinum Axe",
    description: "Used for cutting through tough tree trunks.",
    level: 27,
    damage: 20,
    type: "axe",
    materials: [
      { name: "Platinum Bar", quantity: 2 },
      { name: "Lakewood Log", quantity: 1 },
    ],
    color: "bg-sky-200",
  },

  // Sickle tools
  {
    id: "copper-sickle",
    name: "Copper Sickle",
    description: "A tool specialized in harvesting fibers.",
    level: 1,
    damage: 5,
    type: "sickle",
    materials: [
      { name: "Copper Bar", quantity: 2 },
      { name: "Oak Log", quantity: 1 },
    ],
    color: "bg-amber-700",
  },
  {
    id: "iron-sickle",
    name: "Iron Sickle",
    description: "A tool specialized in harvesting fibers.",
    level: 8,
    damage: 10,
    type: "sickle",
    materials: [
      { name: "Iron Bar", quantity: 2 },
      { name: "Pine Log", quantity: 1 },
    ],
    color: "bg-gray-500",
  },
  {
    id: "silver-sickle",
    name: "Silver Sickle",
    description: "A tool specialized in harvesting fibers.",
    level: 17,
    damage: 15,
    type: "sickle",
    materials: [
      { name: "Silver Bar", quantity: 2 },
      { name: "Elderwood Log", quantity: 1 },
    ],
    color: "bg-slate-300",
  },
  {
    id: "platinum-sickle",
    name: "Platinum Sickle",
    description: "A tool specialized in harvesting fibers.",
    level: 27,
    damage: 20,
    type: "sickle",
    materials: [
      { name: "Platinum Bar", quantity: 2 },
      { name: "Lakewood Log", quantity: 1 },
    ],
    color: "bg-sky-200",
  },

  // Pickaxe tools
  {
    id: "copper-pickaxe",
    name: "Copper Pickaxe",
    description: "A sturdy tool used to mine ores.",
    level: 1,
    damage: 5,
    type: "pickaxe",
    materials: [
      { name: "Copper Bar", quantity: 2 },
      { name: "Oak Log", quantity: 1 },
    ],
    color: "bg-amber-700",
  },
  {
    id: "iron-pickaxe",
    name: "Iron Pickaxe",
    description: "A sturdy tool used to mine ores.",
    level: 8,
    damage: 10,
    type: "pickaxe",
    materials: [
      { name: "Iron Bar", quantity: 2 },
      { name: "Pine Log", quantity: 1 },
    ],
    color: "bg-gray-500",
  },
  {
    id: "silver-pickaxe",
    name: "Silver Pickaxe",
    description: "A sturdy tool used to mine ores.",
    level: 17,
    damage: 15,
    type: "pickaxe",
    materials: [
      { name: "Silver Bar", quantity: 2 },
      { name: "Elderwood Log", quantity: 1 },
    ],
    color: "bg-slate-300",
  },
  {
    id: "platinum-pickaxe",
    name: "Platinum Pickaxe",
    description: "A sturdy tool used to mine ores.",
    level: 27,
    damage: 20,
    type: "pickaxe",
    materials: [
      { name: "Platinum Bar", quantity: 2 },
      { name: "Lakewood Log", quantity: 1 },
    ],
    color: "bg-sky-200",
  },

  // Lantern tools (adding these based on the website data)
  {
    id: "amber-lantern",
    name: "Amber Lantern",
    description: "An amber lantern, used to light the way.",
    level: 1,
    damage: 0,
    type: "lantern",
    stats: "+5 Spirit",
    materials: [
      { name: "Copper Ore", quantity: 4 },
      { name: "Amber", quantity: 1 },
    ],
    color: "bg-amber-400",
  },
  {
    id: "amethyst-lantern",
    name: "Amethyst Lantern",
    description: "An amethyst lantern, used to light the way.",
    level: 8,
    damage: 0,
    type: "lantern",
    stats: "+4 Stamina",
    materials: [
      { name: "Iron Bar", quantity: 4 },
      { name: "Amethyst", quantity: 1 },
    ],
    color: "bg-purple-400",
  },
  {
    id: "ruby-lantern",
    name: "Ruby Lantern",
    description: "A ruby lantern, used to light the way.",
    level: 17,
    damage: 0,
    type: "lantern",
    stats: "+3% Attack Power Buff",
    materials: [
      { name: "Platinum Bar", quantity: 4 },
      { name: "Ruby", quantity: 1 },
    ],
    color: "bg-red-500",
  },
  {
    id: "sapphire-lantern",
    name: "Sapphire Lantern",
    description: "A sapphire lantern, used to light the way.",
    level: 27,
    damage: 0,
    type: "lantern",
    stats: "+3% Magic Power Buff",
    materials: [
      { name: "Silver Bar", quantity: 4 },
      { name: "Sapphire", quantity: 1 },
    ],
    color: "bg-blue-500",
  },

  // Fishing Rod (adding based on the website data)
  {
    id: "wood-fishing-rod",
    name: "Wood Fishing Rod",
    description: "A wood fishing rod, used to fish the water.",
    level: 1,
    damage: 0,
    type: "fishing-rod",
    stats: "+5% Fishing Power",
    materials: [], // Materials not specified on the website
    color: "bg-yellow-800",
  },
];

// 工具卡片组件
const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const t = useTranslations("tools");

  return (
    <Card className="bg-gray-800 text-gray-200 h-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* 工具图标 */}
          <div className="p-4">
            <div
              className={`w-12 h-12 ${tool.color} border border-gray-600 flex items-center justify-center text-xs`}
            >
              <div className="text-center">
                <div>{tool.name.split(" ")[0]}</div>
                <div>{tool.type}</div>
              </div>
            </div>
          </div>

          {/* 工具信息 */}
          <div className="py-4 pr-4">
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-medium ${
                  tool.name.includes("Copper")
                    ? "text-amber-600"
                    : tool.name.includes("Iron")
                    ? "text-gray-400"
                    : tool.name.includes("Silver")
                    ? "text-green-400"
                    : tool.name.includes("Platinum")
                    ? "text-blue-400"
                    : "text-white"
                }`}
              >
                {tool.name}
              </h3>
              {tool.level > 0 && (
                <span className="text-yellow-400 text-sm">
                  Level: {tool.level}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
            <div className="text-gray-300 mt-1">Tool</div>
          </div>
        </div>

        {/* 工具属性 */}
        <div className="border-t border-gray-700 px-4 py-3">
          {tool.damage > 0 && (
            <div className="text-gray-300">Damage: {tool.damage}</div>
          )}
          {tool.stats && <div className="text-gray-300">{tool.stats}</div>}
        </div>

        {/* 制作材料 */}
        <div className="border-t border-gray-700 px-4 py-3">
          <div className="text-gray-400 text-sm">Craft Receipt</div>
          {tool.materials.map((material, index) => (
            <div key={index} className="text-gray-300">
              {material.name} x {material.quantity}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 工具类型部分组件
const ToolTypeSection: React.FC<{
  title: string;
  tools: Tool[];
  type: "axe" | "sickle" | "pickaxe" | "lantern" | "fishing-rod";
}> = ({ title, tools, type }) => {
  const filteredTools = tools.filter((tool) => tool.type === type);

  if (filteredTools.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

// 主工具列表组件
const ToolList: React.FC = () => {
  const t = useTranslations("tools");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Rune Slayer Tools</h1>
      <p className="text-gray-600 mb-8">
        These tools include Pickaxe, Sickle and Axe, which are commonly used for
        Mine Ores, Harvesting Fibers and Cutting Tree Trunks.
      </p>

      <ToolTypeSection title="Axe List" tools={toolsData} type="axe" />

      <ToolTypeSection title="Sickle List" tools={toolsData} type="sickle" />

      <ToolTypeSection title="Pickaxe List" tools={toolsData} type="pickaxe" />

      <ToolTypeSection title="Lantern List" tools={toolsData} type="lantern" />

      <ToolTypeSection
        title="Fishing Rod List"
        tools={toolsData}
        type="fishing-rod"
      />
    </div>
  );
};

export default ToolList;
