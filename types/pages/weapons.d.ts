export interface Weapon {
  name: string;
  chineseName?: string;
  level: number;
  damage?: {
    physical?: number;
    fire?: number;
  };
  armor?: number;
  attributes?: string[];
  special?: string;
  description?: string;
  crafting?: string[];
}

export interface WeaponType {
  name: string;
  chineseName: string;
  description: string;
  weapons: Weapon[];
}

type WeaponData = {
  title: string;
  description: string;
  raritySystem: string[];
  weaponTypes: WeaponType[];
};
