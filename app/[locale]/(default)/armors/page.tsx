import React from "react";
import ArmorsList from "@/components/new-component/armors";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/armors`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/armors`;
  }

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
export default function ArmorsPage() {
  return <ArmorsList />;
}
