import React from "react";
import Character from "./character";
import { CharacterData } from "../../../types/blocks/team2";
import { useTranslations } from "next-intl";

export default function Team2() {
  const t = useTranslations("team2");

  const characters: CharacterData[] = [
    {
      id: "archer",
      imageSrc: "/imgs/5.png",
      tier: "S",
      role: t("roles.archer"),
      description: "",
    },
    {
      id: "priest",
      imageSrc: "/imgs/3.png",
      tier: "S",
      role: t("roles.priest"),
      description: "",
    },
    {
      id: "thief",
      imageSrc: "/imgs/2.png",
      tier: "A",
      role: t("roles.thief"),
      description: "",
    },
    {
      id: "magician",
      imageSrc: "/imgs/6.png",
      tier: "A",
      role: t("roles.magician"),
      description: "",
    },
    {
      id: "warrior",
      imageSrc: "/imgs/4.png",
      tier: "A",
      role: t("roles.warrior"),
      description: "",
    },
    {
      id: "striker",
      imageSrc: "/imgs/1.png",
      tier: "B",
      role: t("roles.striker"),
      description: "",
    },
  ];

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-6 mt-3 text-center text-sm text-gray-500 sm:text-base md:mb-8">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 justify-center justify-items-center gap-4 sm:justify-items-stretch md:gap-6 md:grid-cols-2">
          {characters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </div>
      </div>
    </section>
  );
}
