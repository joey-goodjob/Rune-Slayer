"use client";

// 技能类型
interface Skill {
  name: string;
  description: string;
  drain?: string;
}

// 子职业类型
interface SubClass {
  id: string;
  name: string;
  parentClass: string;
  description: string;
  passiveSkills: Skill[];
  activeSkills: Skill[];
}

// 主职业类型
interface ClassInfo {
  id: string;
  name: string;
  icon: string;
  subClasses: {
    list: string[];
    data: Record<string, SubClass>;
  };
}

export default function SubClassesPage() {
  // Mock数据 - 所有职业和子职业信息
  const classesData: Record<string, ClassInfo> = {
    archer: {
      id: "archer",
      name: "Archer",
      icon: "/icons/archer.png",
      subClasses: {
        list: ["beastTamer", "sharpshooter"],
        data: {
          beastTamer: {
            id: "beastTamer",
            name: "Beast Tamer",
            parentClass: "Archer",
            description: "Beast Tamer is an sub-class for Archer",
            passiveSkills: [
              {
                name: "Alpha Predator",
                description: "Allows you to tame beasts.",
              },
              {
                name: "Bestial Swiftness",
                description: "Increased movement speed while riding a mount.",
              },
            ],
            activeSkills: [
              {
                name: "Feral Strikes",
                description:
                  "Induces your pet to heal in proportion to the damage inflicted.",
                drain: "30 Focus",
              },
            ],
          },
          sharpshooter: {
            id: "sharpshooter",
            name: "Sharpshooter",
            parentClass: "Archer",
            description: "Sharpshooter is an sub-class for Archer",
            passiveSkills: [
              {
                name: "Double Tap",
                description:
                  "Your Ballistic Shot has chance to fire two arrows.",
              },
            ],
            activeSkills: [
              {
                name: "Dragon Piercer",
                description:
                  "A powerful supercharged shot capable of piercing even the tough scales of a dragon.",
                drain: "35 Focus",
              },
              {
                name: "Ballistic Shot",
                description:
                  "A powerful supercharged shot capable of piercing even the tough scales of a dragon.",
                drain: "15 Focus",
              },
            ],
          },
        },
      },
    },
    warrior: {
      id: "warrior",
      name: "Warrior",
      icon: "/icons/warrior.png",
      subClasses: {
        list: ["berserker", "knight", "swordMaster"],
        data: {
          berserker: {
            id: "berserker",
            name: "Berserker",
            parentClass: "Warrior",
            description: "Berserker is an sub-class for Warrior",
            passiveSkills: [
              {
                name: "Blood Craze",
                description:
                  "After killing an enemy you gain 25 rage and 30% movement speed for 8 seconds.",
              },
              {
                name: "Rage",
                description:
                  "A resource harnessed by Berserker skills, generated through the heat of battle.",
              },
              {
                name: "Bloodlust",
                description:
                  "Gain physical damage and lifesteal based on your miss health.",
              },
            ],
            activeSkills: [
              {
                name: "Blood Thirst",
                description:
                  "Channel your rage into a devastating two-strike attack, each blow restoring a portion of your health.",
                drain: "20 Focus, 50 Rage",
              },
              {
                name: "Enrage",
                description:
                  "Enter a frenzied state, harnessing your rage to fuel relentless power.",
                drain: "40 Rage",
              },
            ],
          },
          knight: {
            id: "knight",
            name: "Knight",
            parentClass: "Warrior",
            description: "Knight is an sub-class for Warrior",
            passiveSkills: [
              {
                name: "Exhaust",
                description:
                  "Exhaust your posture to acquire temporary damage reduction.",
              },
              {
                name: "Fortress",
                description:
                  "When using a shield skill tha causes you to block, you can be guardbroken.",
              },
            ],
            activeSkills: [
              {
                name: "Iron Will",
                description:
                  "While active, you absorb a portion of the damage taken by nearby party members within a certain range.",
                drain: "20 Focus",
              },
              {
                name: "Shield Slam",
                description:
                  "Slam the area around you with your shield,generating high threat.",
                drain: "25 Focus",
              },
              {
                name: "Shield Crash",
                description:
                  "Charge forward with your shield, hitting and blocking anything in your way.",
                drain: "30 Focus",
              },
            ],
          },
          swordMaster: {
            id: "swordMaster",
            name: "Sword Master",
            parentClass: "Warrior",
            description: "Sword Master is an sub-class for Warrior",
            passiveSkills: [
              {
                name: "Flux",
                description:
                  "When you land a attack within your field, you have a chance to gain a stack. Each stack causes your Flicker Strike to hit your primary target an additional time.",
              },
            ],
            activeSkills: [
              {
                name: "Flicker Strike",
                description:
                  "A piercing strike that,when used within the field,allows you to flicker to your target and chain through all enemies inside.",
                drain: "25 Focus",
              },
              {
                name: "Field",
                description:
                  "Place a field that allows Flicker Strike to teleport directly to your enemies.",
                drain: "30 Focus",
              },
            ],
          },
        },
      },
    },
    magician: {
      id: "magician",
      name: "Magician",
      icon: "/icons/magician.png",
      subClasses: {
        list: ["sorcerer", "warlock"],
        data: {
          sorcerer: {
            id: "sorcerer",
            name: "Sorcerer",
            parentClass: "Magician",
            description: "Sorcerer is an sub-class for Magician",
            passiveSkills: [],
            activeSkills: [],
          },
          warlock: {
            id: "warlock",
            name: "Warlock",
            parentClass: "Magician",
            description: "Warlock is an sub-class for Magician",
            passiveSkills: [],
            activeSkills: [],
          },
        },
      },
    },
    striker: {
      id: "striker",
      name: "Striker",
      icon: "/icons/striker.png",
      subClasses: {
        list: ["ashura", "monk"],
        data: {
          ashura: {
            id: "ashura",
            name: "Ashura",
            parentClass: "Striker",
            description: "Ashura is an sub-class for Striker",
            passiveSkills: [
              {
                name: "Wrath",
                description: "Landing Asura's Crash will give you Wrath.",
              },
            ],
            activeSkills: [
              {
                name: "Asura's Wrath",
                description: "Uses your built up wrath to power up.",
              },
              {
                name: "Asura's Crash",
                description:
                  "Teleport behind them to slam them back to the ground with devastating force.Can only be used after knocking an opponent into the air.",
                drain: "20 Focus",
              },
            ],
          },
          monk: {
            id: "monk",
            name: "Monk",
            parentClass: "Striker",
            description: "Monk is an sub-class for Striker",
            passiveSkills: [
              {
                name: "Spirit Finisher",
                description:
                  "Activating Spirit Shift after landing a Spirit Burst finisher teleports you behind the enemy.",
              },
              {
                name: "Spirit Cleanse",
                description:
                  "Chance to reset the cooldown of Spirit Burst after landing a Spirit Burst finisher.",
              },
            ],
            activeSkills: [
              {
                name: "Spirit Shift",
                description:
                  "Transform your stance, ots embracing a new spirit form.",
              },
              {
                name: "Spirit Burst",
                description:
                  "Unleash a burst of energy,its effect shifting with your current stance.",
                drain: "25 Focus",
              },
            ],
          },
        },
      },
    },
    priest: {
      id: "priest",
      name: "Priest",
      icon: "/icons/priest.png",
      subClasses: {
        list: ["cleric"],
        data: {
          cleric: {
            id: "cleric",
            name: "Cleric",
            parentClass: "Priest",
            description: "Cleric is an sub-class for Priest",
            passiveSkills: [
              {
                name: "Angelic Wings",
                description:
                  "Chance to Grant Angelic Wings after casting Holy Light or Flash Heal.",
              },
            ],
            activeSkills: [
              {
                name: "Clarity",
                description:
                  "Focus your mind in a moment of divine clarity, making your spells cost no resources and increasing critical strike chance for a short duration.",
              },
              {
                name: "Divine Healing",
                description:
                  "Your healing spells restore a portion of their healing to effect you.",
              },
              {
                name: "Angelic Guardian",
                description:
                  "Bless an ally with divine grace, increasing their healing received and reviving them upon death.",
                drain: "100 Mana",
              },
            ],
          },
        },
      },
    },
  };

  // 渲染单个子职业卡片
  const renderSubClassCard = (subClass: SubClass) => (
    // 创建一个 div 包裹每个子职业的信息，设置背景色、内边距和圆角
    <div key={subClass.id} className="bg-gray-200 p-4 rounded-md">
      {/* 显示子职业的名称，设置字体加粗、字号和颜色 */}
      <h3 className="font-bold text-lg text-amber-800">{subClass.name}</h3>
      {/* 显示子职业的描述信息，设置字体大小和下边距 */}
      <p className="text-sm mb-2">{subClass.description}</p>

      {/* 判断是否存在被动技能列表，若存在则渲染 */}
      {subClass.passiveSkills.length > 0 && (
        <div className="mb-3">
          {/* 被动技能的标题 */}
          <h4 className="font-semibold text-gray-700">Passive:</h4>
          {/* 遍历被动技能列表，显示每个技能的名称和描述 */}
          {subClass.passiveSkills.map((skill, idx) => (
            // 为每个被动技能创建一个 div，设置左边距和下边距
            <div key={`passive-${subClass.id}-${idx}`} className="ml-1 mb-1">
              {/* 显示技能名称，设置字体中等和颜色 */}
              <span className="font-medium text-amber-700">{skill.name}</span>
              {/* 显示技能描述，设置字体大小 */}
              <p className="text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 判断是否存在主动技能列表，若存在则渲染 */}
      {subClass.activeSkills.length > 0 && (
        <div>
          {/* 主动技能的标题 */}
          <h4 className="font-semibold text-gray-700">Active:</h4>
          {/* 遍历主动技能列表，显示每个技能的名称、消耗和描述 */}
          {subClass.activeSkills.map((skill, idx) => (
            // 为每个主动技能创建一个 div，设置左边距和下边距
            <div key={`active-${subClass.id}-${idx}`} className="ml-1 mb-2">
              {/* 显示技能名称和可能的消耗，使用 flex 布局进行对齐 */}
              <div className="flex justify-between">
                <span className="font-medium text-amber-700">{skill.name}</span>
                {/* 如果技能有消耗值，则显示 */}
                {skill.drain && (
                  <span className="text-sm text-blue-700">
                    Drain: {skill.drain}
                  </span>
                )}
              </div>
              {/* 显示技能描述，设置字体大小 */}
              <p className="text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 渲染职业及其子职业
  const renderClassSection = (classInfo: ClassInfo) => (
    // 创建一个 div 来包裹职业及其所有子职业信息，带有背景色、圆角和溢出隐藏
    <div
      key={classInfo.id}
      className="mb-8 bg-gray-100 rounded-lg overflow-hidden"
    >
      {/* 显示职业头部信息，包括名字和子职业数量 */}
      <div className="flex items-center bg-gray-200 p-3">
        {/* 显示职业名称的首字母，放置在一个小方框内 */}
        <div className="w-10 h-10 bg-gray-900 rounded-md flex items-center justify-center mr-3">
          <span className="text-white">{classInfo.name.charAt(0)}</span>
        </div>
        {/* 职业名称和子职业信息 */}
        <div>
          <h2 className="font-bold">{classInfo.name} Sub-Classes</h2>
          {/* 显示子职业数量和名称 */}
          <p className="text-sm">
            {classInfo.name} has {classInfo.subClasses.list.length} sub-classes,
            which are:{" "}
            {classInfo.subClasses.list
              .map((id) => classInfo.subClasses.data[id].name)
              .join(", ")}
            .
          </p>
        </div>
      </div>

      {/* 使用网格布局显示每个子职业卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* 遍历子职业列表，调用 renderSubClassCard 来渲染每个子职业 */}
        {classInfo.subClasses.list.map((subClassId) =>
          renderSubClassCard(classInfo.subClasses.data[subClassId])
        )}
      </div>
    </div>
  );

  return (
    // 页面内容的主容器，设置最大宽度、内边距和居中对齐
    <div className="container mx-auto py-8 px-4">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Sub-Classes of Rune Slayer</h1>
        {/* 简介说明 */}
        <p className="max-w-3xl mx-auto">
          There are 6 different classes in Rune Slayer, which can be derived
          from 18 sub-classes. Below is a breakdown of the abilities of all the
          these.
        </p>
      </div>

      {/* 渲染所有职业信息的容器，设置最大宽度和居中对齐 */}
      <div className="max-w-5xl mx-auto">
        {/* 遍历 classesData 中的每个职业信息，调用 renderClassSection 来渲染 */}
        {Object.values(classesData).map((classInfo) =>
          renderClassSection(classInfo)
        )}
      </div>
    </div>
  );
}
