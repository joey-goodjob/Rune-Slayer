// app/[locale]/(default)/races/page.tsx
// 从 "@/components/new-component/races" 模块中导入默认导出的 RaceTierList 组件
import ClassesPage from "@/components/new-component/classes/classform";
import Classesfeature from "@/components/new-component/classes/classfeature";
import SubClassesPage from "@/components/new-component/classes/classlist";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/classes`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/classes`;
  }

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// 导出一个默认函数组件 RacesPage
export default function RacesPage() {
  return (
    <>
      {/* <ClassesPage /> */}
      <Classesfeature />
      <SubClassesPage />
    </>
  );
}
