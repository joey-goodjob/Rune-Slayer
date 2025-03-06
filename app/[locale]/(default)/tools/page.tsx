import React from "react";
import ToolList from "@/components/new-component/tools/toollist";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools`;
  }

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function ToolPage() {
  return <ToolList />;
}
