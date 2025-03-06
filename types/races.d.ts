// types/races.d.ts
export interface Skill {
  name: string; // 技能名称
  description: string; // 技能描述
  requirement?: string; // 技能要求，可选
}

export interface Race {
  id: string; // 种族ID
  name: string; // 种族名称
  avatar: string; // 种族头像
  rollChance: number; // 抽取概率
  description: {
    // 种族描述
    en: string;
    zh: string;
  };
  passive: Skill[]; // 被动技能列表
  active: Skill; // 主动技能
}
