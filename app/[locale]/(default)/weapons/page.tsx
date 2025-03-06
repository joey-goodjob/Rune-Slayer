import React from "react";
import WeaponsList from "@/components/new-component/weapons";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/weapons`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/weapons`;
  }

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
export default function WeaponsPage() {
  return <WeaponsList />;
}
