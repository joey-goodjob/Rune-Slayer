import React from "react";
import { CharacterData } from "../../../types/blocks/team2";
import { useTranslations } from "next-intl";

// TierBadge component integrated within the same file
const TierBadge = ({ tier }: { tier: "S" | "A" | "B" }) => {
  const tierStyles = {
    S: "text-purple-800",
    A: "text-blue-700",
    B: "text-gray-700",
  };

  return (
    <p className={`mb-1 font-semibold ${tierStyles[tier]}`}>{tier}-Tier</p>
  );
};

interface CharacterProps {
  character: CharacterData;
}

export const Character = ({ character }: CharacterProps) => {
  const { id, imageSrc, tier, role } = character;
  const t = useTranslations("team2");

  return (
    <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
      <img
        src={imageSrc}
        alt={`${t(`characters.${id}.name`)} class icon`}
        className="inline-block h-48 w-48 object-cover"
      />
      <div>
        <p className="text-xl font-semibold">{t(`characters.${id}.name`)}</p>
        <TierBadge tier={tier} />
        <p className="mb-2 font-semibold text-gray-500">{role}</p>
        <p className="text-sm text-gray-500">
          {t(`characters.${id}.description`)}
        </p>
      </div>
    </div>
  );
};

export default Character;
