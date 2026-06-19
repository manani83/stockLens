import type { Metadata } from "next";
import {
  AlertDisclaimer,
  AlertRuleForm,
  AlertRuleList,
} from "@/components/alerts";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("가격/배당 알림 규칙"),
  description:
    "미국 배당 ETF의 목표 가격, 목표 배당률, 배당락일 알림 조건을 미리 정의하고 관리해보세요.",
};

export default function AlertsPage() {
  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-bold text-teal-700">Alerts</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
          가격/배당 알림 규칙
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          관심 ETF의 목표 가격, 목표 배당률, 배당락일 알림 조건을 미리
          정의해보세요.
        </p>
      </section>
      <AlertRuleForm />
      <AlertRuleList />
      <AlertDisclaimer />
      <InternalLinkSection />
    </main>
  );
}
