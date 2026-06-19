import type { Metadata } from "next";
import {
  BackupDisclaimer,
  BackupExportButton,
  BackupImportForm,
} from "@/components/backup";
import { PageContainer, PageHero } from "@/components/common";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("데이터 백업/복원"),
  description:
    "브라우저에 저장된 관심종목, 알림 규칙, 포트폴리오 데이터를 JSON 파일로 백업하고 복원하세요.",
};

export default function BackupSettingsPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Settings"
        title="데이터 백업/복원"
        description="브라우저에 저장된 관심종목, 알림 규칙, 포트폴리오 데이터를 JSON 파일로 백업하거나 복원할 수 있습니다."
      />
      <BackupExportButton />
      <BackupImportForm />
      <BackupDisclaimer />
      <InternalLinkSection />
    </PageContainer>
  );
}
